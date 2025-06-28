# Creating New Pages in Next.js (App Router)

This guide explains how to add new pages to the BaltGoWebsite project using the Next.js App Router structure.

---

## 1. Folder & File Structure
- All route segments live under `src/app/`.
- The root `layout.tsx` and `page.tsx` files define the global layout and home page, respectively.
- Each additional page is a `page.tsx` file inside its route folder.
- You can nest folders for nested routes (e.g., for `/blog/[slug]`).
- Utility files like `utils.ts` can be used to share logic between pages.

> **Note:** The rendering mode (SSR, SSG, ISR) is determined by your code and data fetching, not by the folder name.

### Example
```
src/app/
  layout.tsx      // Global layout
  page.tsx        // Home page
  about/
    page.tsx      // /about
  contact/
    page.tsx      // /contact
  blog/
    page.tsx      // /blog
    [slug]/
      page.tsx    // /blog/:slug (dynamic route)
  pirkt-davanu-karti/
    page.tsx      // /pirkt-davanu-karti
  utils.ts        // Shared utility functions
  ...
```

---

## 2. Creating a New Page
1. **Decide if your page should use a specific rendering strategy:**
    - For a standard page, add a folder directly under `src/app/` (e.g., `about`).
    - For the home page, update the `page.tsx` file at the root of `src/app/`.
    - For a demo of SSR, SSG, or ISR, add your page inside the respective `ssr/`, `ssg/`, or `isr/` folder.
2. **Add a `page.tsx` file** inside your chosen folder.
3. **Export a React component** (default export) from `page.tsx`:

```tsx
// src/app/ssr/my-server-page/page.tsx
export default async function MyServerPage() {
  // Fetch data here for SSR
  return <main>SSR content here.</main>;
}
```

```tsx
// src/app/isr/my-isr-page/page.tsx
export default function MyISRPage() {
  // Use revalidate or fetch for ISR
  return <main>ISR content here.</main>;
}
```

---

## 3. Layouts in Next.js App Router

- `layout.tsx`: Shared layout for all pages in a route segment.
- The **global layout** (`src/app/layout.tsx`) wraps your entire app and is always applied to all pages and nested layouts.
- You can add a `layout.tsx` inside any route folder (e.g., `about/layout.tsx`) to create a **nested layout** for just that section. These layouts are composed: the global layout wraps the section layout, which wraps the page.

### Example (nested layouts)
```
src/app/
  layout.tsx         // Global layout (applies everywhere)
  page.tsx           // Home page
  about/
    layout.tsx       // About section layout (applies to /about/*)
    page.tsx         // /about
    team/
      page.tsx       // /about/team
```

Visiting `/about/team` renders: global layout → about layout → team page.

- **You cannot skip or prevent the global layout for a specific route.**
- If you want a page to look different (e.g., no header/footer), you can use conditional rendering inside your global layout:

```tsx
// src/app/layout.tsx
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLanding = pathname === "/landing";
  return (
    <html>
      <body>
        {isLanding ? (
          <>{children}</> // minimal
        ) : (
          <>
            <Header />
            {children}
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
```

> **Note:** The global layout component is always present, but you can control what is rendered inside it.

- `loading.tsx`: Loading UI for suspense/data fetching.
- `error.tsx`: Error UI for error boundaries.

---

## 4. Dynamic Routes
- Use square brackets for dynamic segments (e.g., `[id]`).
- Example: `src/app/blog/[slug]/page.tsx` → `/blog/my-post`

---

## 6. Best Practices
- Use the design system components from `components/` for consistency.
- Keep each page focused and minimal; move reusable UI to components.
- Document any special data fetching or routing logic in the page file.

---

For more details, see the [Next.js App Router docs](https://nextjs.org/docs/app/building-your-application/routing).
