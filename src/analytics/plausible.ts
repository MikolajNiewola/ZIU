import Plausible from 'plausible-tracker';

/**
 * RODO / minimalizacja danych:
 * - Plausible nie ustawia cookies ani nie zbiera danych osobowych.
 * - Wysyłamy wyłącznie nazwy zdarzeń i ogólne props (bez treści pól formularza).
 * - IP nie jest przechowywane w sposób identyfikujący użytkownika (privacy-first).
 */
export const plausible = Plausible({
  domain: import.meta.env.VITE_PLAUSIBLE_DOMAIN ?? 'localhost',
  trackLocalhost: import.meta.env.DEV,
});

/** Pageview — ścieżka URL bez parametrów wyszukiwania (bez PII). */
export function trackPageview(path: string) {
  plausible.trackPageview({ url: path });
}

/** Zdarzenie niestandardowe — tylko dozwolone klucze w props. */
export function trackEvent(
  name: string,
  props?: Record<string, string>,
) {
  plausible.trackEvent(name, { props });
}

/** CTA Click — kliknięcia przycisków akcji (ulubione, modal). */
export function trackCtaClick(location: string) {
  trackEvent('CTA Click', { location });
}

/**
 * Form Abandon — porzucenie formularza bez ukończenia.
 * Nie wysyłamy wpisanej treści — tylko identyfikator pola.
 */
export function trackFormAbandon(field: string) {
  trackEvent('Form Abandon', { field });
}

/** Form Submit — ukończone wyszukiwanie lub dodanie ulubionego. */
export function trackFormSubmit(action: string) {
  trackEvent('Form Submit', { action });
}
