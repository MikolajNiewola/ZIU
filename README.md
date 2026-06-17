# To-Do App

Aplikacja To-Do stworzona na potrzeby laboratorium z przedmiotu **Zaawansowany interfejs użytkownika**.

Nowoczesna aplikacja webowa do zarządzania zadaniami z panelem dashboard, formularzem rejestracji wieloetapowej, mock API (MSW) oraz pełną obsługą stanów asynchronicznych.

**Demo:** _(wstaw link po wdrożeniu na Vercel/Netlify)_

## Funkcjonalności

- Dodawanie, edycja, usuwanie i oznaczanie zadań jako ukończone
- Filtrowanie listy (Wszystkie / Aktywne / Ukończone)
- Dashboard ze statystykami i podglądem ostatnich zadań
- Formularz rejestracji wieloetapowy z walidacją (RHF + Zod)
- Mock REST API (MSW): GET, POST, PUT, DELETE
- Obsługa stanów loading / success / error z widocznym feedbackiem w UI
- Animacje przejść (Framer Motion)
- Responsywny layout (MUI Drawer + Tailwind)
- Dostępność WCAG: skip-link, aria-labels, FocusTrap, kontrast AA

## Jak uruchomić?

Wymagane: [Node.js](https://nodejs.org/) 18+

```bash
npm install
npm run dev
```

Aplikacja uruchomi się pod adresem `http://localhost:5173`.

### Build produkcyjny

```bash
npm run build
npm run preview
```

## Wdrożenie (Vercel / Netlify)

1. Zbuduj projekt: `npm run build`
2. Folder do wdrożenia: `dist/`
3. **Vercel:** połącz repozytorium GitHub → framework: Vite → build: `npm run build` → output: `dist`
4. **Netlify:** przeciągnij folder `dist` na [app.netlify.com/drop](https://app.netlify.com/drop) lub skonfiguruj build command i publish directory
5. Upewnij się, że plik `mockServiceWorker.js` jest w katalogu publicznym (MSW działa także po buildzie)

Po wdrożeniu wklej link do demo w tym README.

## Technologie

| Technologia | Zastosowanie |
|---|---|
| React 18 + TypeScript | UI i typowanie |
| Vite 5 | Bundler i dev server |
| MUI 9 | Dashboard, layout, komponenty UI |
| Tailwind CSS 3 | Style kart zadań, formularzy |
| Context API + useReducer | Globalny stan aplikacji |
| React Hook Form + Zod | Walidacja formularzy |
| MSW 2 | Mock REST API |
| Framer Motion 11 | Animacje i mikrointerakcje |

## Struktura widoków

| Ścieżka | Widok |
|---|---|
| `/` | Dashboard |
| `/todos` | Lista zadań |
| `/register` | Rejestracja wieloetapowa |
| `/settings` | Ustawienia (symulacja błędu API, czyszczenie danych) |

## Notatka UX (persona)

**Persona:** Anna, 24 lata, studentka — korzysta z aplikacji na telefonie między zajęciami i na laptopie w domu.

**Kluczowe decyzje UI/UX:**
- **Widoczność statusu systemu** (heurystyka Nielsena #1) — spinner, snackbar sukcesu, baner błędu sieci
- **Spójność** (heurystyka #4) — jednolity układ dashboardu, te same kolory brand w MUI i Tailwind
- **Prewencja błędów** (heurystyka #5) — walidacja Zod przed wysłaniem formularza
- **Rozpoznawalność** (heurystyka #6) — ikony MUI, czytelne etykiety filtrów
- **Elastyczność** — responsywny drawer (mobile) / sidebar (desktop)

Szczegółowe omówienie narzędzi i implementacji: [PODSUMOWANIE.md](./PODSUMOWANIE.md)

## Autor

**Mikołaj Niewola**  
Numer indeksu: **36397**
