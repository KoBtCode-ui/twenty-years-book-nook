<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Book catalogue lives in `src/lib/books.ts` (plain data + `filterBooks`); UI components under `src/components/library/` only render it — keeps content edits in one place.
- 3D effects (book, flip book, ring) are pure CSS 3D + small rAF loops, no 3D/animation libraries — keeps the bundle light and SSR-safe.
- Featured selection comes from the central catalogue and keeps the diary's uploaded-page preview distinct from other book introductions — prevents showing invented preview pages.
- Online discovery uses Open Library's public browser API on explicit searches with TanStack Query cancellation and caching; parse external records in `src/lib/book-search.ts` — no private API key or backend is needed for public catalogue searches.
- Book-page photos and real published book covers are JPG files committed in `src/assets/` (covers in `src/assets/real-covers/`, pages in `src/assets/pages/`, imported as modules; covers set via `Book.cover`) — the user wants book images in the source code, not CDN pointers; generated art in `src/assets/covers/` is the fallback when a book has no real cover.
