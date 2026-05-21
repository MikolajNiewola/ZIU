import { http, HttpResponse, delay } from 'msw';


const TMDB_BASE = 'https://api.themoviedb.org/3';

export const handlers = [
  // Mock listy popularnych filmów
  http.get(`${TMDB_BASE}/movie/popular`, async ({ request }) => {
    const url = new URL(request.url);

    // Tylko do ręcznego testu ErrorBanner: /movie/popular?testAuthError=1
    if (url.searchParams.get('testAuthError') === '1') {
      return HttpResponse.json(
        { status_message: 'Invalid API key.' },
        { status: 401 },
      );
    }

    await delay(800); // symuluj opóźnienie sieci
    const page = Number(url.searchParams.get('page') ?? 1);

    return HttpResponse.json({
      page,
      total_pages: 10,
      total_results: 200,
      results: Array.from({ length: 20 }, (_, i) => ({
        id: page * 100 + i,
        title: `Film testowy ${page}-${i + 1}`,
        overview: 'Opis testowego filmu.',
        poster_path: null,
        release_date: '2024-01-01',
        vote_average: 7.5,
        genre_ids: [28, 12],
      })),
    });
  }),

  http.get(`${TMDB_BASE}/discover/movie`, async ({ request }) => {
    await delay(600);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    const genreId = url.searchParams.get('with_genres') ?? '';

    return HttpResponse.json({
      page,
      total_pages: 5,
      total_results: 100,
      results: Array.from({ length: 20 }, (_, i) => ({
        id: page * 200 + Number(genreId) + i,
        title: `Film gatunku ${genreId} — ${i + 1}`,
        overview: 'Opis z discover.',
        poster_path: null,
        release_date: '2024-01-01',
        vote_average: 7.0,
        genre_ids: [Number(genreId)],
      })),
    });
  }),

  http.get(`${TMDB_BASE}/search/movie`, async ({ request }) => {
    await delay(400);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    const query = url.searchParams.get('query') ?? '';
    return HttpResponse.json({
      page,
      total_pages: 3,
      total_results: 40,
      results: Array.from({ length: 10 }, (_, i) => ({
        id: 9000 + page * 10 + i,
        title: `${query} — wynik ${i + 1}`,
        overview: 'Opis z wyszukiwania.',
        poster_path: null,
        release_date: '2023-06-01',
        vote_average: 6.8,
        genre_ids: [18],
      })),
    });
  }),

  http.get(`${TMDB_BASE}/genre/movie/list`, () =>
    HttpResponse.json({
      genres: [
        { id: 28, name: 'Akcja' },
        { id: 18, name: 'Dramat' },
        { id: 35, name: 'Komedia' },
      ],
    })
  ),

  http.get(`${TMDB_BASE}/movie/:id`, async ({ params }) => {
    await delay(500);
    const id = Number(params.id);
    return HttpResponse.json({
      id,
      title: `Szczegóły filmu #${id}`,
      tagline: 'Opis testowy w modalu',
      overview: 'Pełny opis testowego filmu wyświetlany w modalu.',
      poster_path: null,
      release_date: '2024-01-01',
      runtime: 120,
      vote_average: 8.1,
      vote_count: 1500,
      genres: [{ id: 28, name: 'Akcja' }],
      budget: 50_000_000,
      revenue: 200_000_000,
    });
  }),
];