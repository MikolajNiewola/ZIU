# Dokumentacja napraw — 5 błędów

## 1. Język strony (`lang`)

**Kryterium:** 3.1.1 Language of Page (A)

### PRZED
```html
<html lang="en">
```

### PO
```html
<html lang="pl">
```

**Plik:** `index.html`

---

## 2. Etykieta pola wyszukiwania

**Kryterium:** 1.3.1 Info and Relationships, 4.1.2 Name, Role, Value (A)

### PRZED
```tsx
<input
  type="text"
  placeholder="Wyszukaj film (wpisz min. 2 znaki)..."
  className="search-input"
/>
```

### PO
```tsx
<label htmlFor="search-input" className="visually-hidden">
  Wyszukaj film
</label>
<input
  id="search-input"
  type="search"
  placeholder="Wyszukaj film (wpisz min. 2 znaki)..."
  className="search-input"
/>
```

**Plik:** `src/App.tsx`

---

## 3. Przycisk czyszczenia wyszukiwania

**Kryterium:** 4.1.2 Name, Role, Value (A)

### PRZED
```tsx
<button className="clear-search" onClick={() => setSearchQuery('')}>
  &times;
</button>
```

### PO
```tsx
<button
  type="button"
  className="clear-search"
  onClick={() => setSearchQuery('')}
  aria-label="Wyczyść wyszukiwanie"
>
  &times;
</button>
```

**Plik:** `src/App.tsx`

---

## 4. Modal — dialog ARIA i pułapka fokusu

**Kryterium:** 2.1.2 No Keyboard Trap, 4.1.2 Name, Role, Value (A)

### PRZED
```tsx
<div className="modal-overlay" onClick={onClose}>
  <div className="modal-container" onClick={(e) => e.stopPropagation()}>
    <button className="modal-close" onClick={onClose} aria-label="Zamknij">
```

### PO
```tsx
<div
  ref={modalRef}
  className="modal-container"
  role="dialog"
  aria-modal="true"
  aria-label={dialogLabel}
  onClick={(e) => e.stopPropagation()}
>
  <button ref={closeBtnRef} type="button" className="modal-close" ...>
```

**Plik:** `src/components/MovieModal.tsx`

---

## 5. Widoczny fokus klawiatury

**Kryterium:** 2.4.7 Focus Visible (AA)

### PRZED
Brak reguł `:focus-visible` w arkuszach stylów.

### PO
```css
:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

**Plik:** `src/index.css`

---