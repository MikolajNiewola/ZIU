import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = join(__dirname, '..', 'sessions_lab12.csv');

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const row = {};
    headers.forEach((header, i) => {
      let value = values[i] ?? '';
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (value === '') value = null;
      else if (header === 'duration_sec' || header === 'form_step_reached') {
        const num = Number(value);
        value = Number.isNaN(num) ? null : num;
      }
      row[header] = value;
    });
    return row;
  });
}

function bounceRateByPage(data) {
  const stats = {};
  for (const row of data) {
    if (!stats[row.page]) stats[row.page] = { total: 0, bounced: 0 };
    stats[row.page].total++;
    if (row.bounce === true || row.bounce === 'true') stats[row.page].bounced++;
  }
  return Object.entries(stats)
    .map(([page, s]) => ({
      page,
      bounceRate: `${((s.bounced / s.total) * 100).toFixed(1)}%`,
      bounceRateNum: (s.bounced / s.total) * 100,
      total: s.total,
      bounced: s.bounced,
    }))
    .sort((a, b) => b.bounceRateNum - a.bounceRateNum);
}

function formDropOff(data) {
  const formRows = data.filter((r) => r.page === 'form' && r.form_step_reached);
  const total = formRows.length;
  const result = {};
  const steps = [];
  for (let step = 1; step <= 4; step++) {
    const reached = formRows.filter((r) => Number(r.form_step_reached) >= step).length;
    const pct = total ? (reached / total) * 100 : 0;
    const label = `Krok ${step}`;
    result[label] = `${pct.toFixed(1)}% (${reached}/${total})`;
    steps.push({ step, reached, total, percentage: pct });
  }
  return { result, steps, total };
}

function topClicks(data, n = 10) {
  const freq = {};
  for (const row of data) {
    if (row.element_clicked) {
      freq[row.element_clicked] = (freq[row.element_clicked] || 0) + 1;
    }
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([element, count]) => ({ element, count }));
}

function largestDropOff(steps) {
  let maxDrop = { from: null, to: null, dropPp: 0 };
  for (let i = 0; i < steps.length - 1; i++) {
    const drop = steps[i].percentage - steps[i + 1].percentage;
    if (drop > maxDrop.dropPp) {
      maxDrop = {
        from: steps[i].step,
        to: steps[i + 1].step,
        dropPp: drop,
      };
    }
  }
  return maxDrop;
}

const raw = readFileSync(csvPath, 'utf8');
const data = parseCSV(raw);

const bounceRates = bounceRateByPage(data);
const formDrop = formDropOff(data);
const top5Clicks = topClicks(data, 5);
const biggestDrop = largestDropOff(formDrop.steps);

const output = {
  rowCount: data.length,
  bounceRateByPage: bounceRates,
  highestBouncePage: bounceRates[0]?.page ?? null,
  formDropOff: formDrop.result,
  formDropOffSteps: formDrop.steps,
  largestFormDropOff: biggestDrop,
  topClicks: top5Clicks,
  generatedAt: new Date().toISOString(),
};

const outPath = join(__dirname, 'wyniki-analizy.json');
writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');

console.log('=== Bounce rate per strona ===');
console.table(
  bounceRates.map(({ page, bounceRate, total, bounced }) => ({
    page,
    bounceRate,
    total,
    bounced,
  })),
);

console.log('\n=== Drop-off formularza ===');
console.table(formDrop.result);

console.log('\n=== Top 5 kliknięć ===');
console.table(top5Clicks);

console.log(`\nNajwyższy bounce: ${output.highestBouncePage}`);
console.log(
  `Największy spadek formularza: Krok ${biggestDrop.from} → Krok ${biggestDrop.to} (−${biggestDrop.dropPp.toFixed(1)} pp)`,
);
console.log(`\nZapisano: ${outPath}`);
