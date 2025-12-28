# FinBoard

A **production-grade, customizable finance dashboard** built with Next.js, React, Tailwind CSS, Zustand, Chart.js, and dnd-kit.

---

## ⭐ Key Features
- Add, remove, configure, and rearrange finance widgets
- Finance Card, Table, and Chart Widgets (simulated real-time data)
- Real-time data simulation with mock stocks (no API keys needed)
- Drag & drop dashboard builder ([dnd-kit/core](https://docs.dndkit.com/))
- Responsive layout & sticky FinBoard navbar
- Elegant dark/light mode toggle
- Smooth skeleton loaders, error/empty states, and animations
- LocalStorage persistence with Zustand (dashboard state saved/restored)
- Lazy loading & code splitting for widget performance
- Well-documented, readable, and maintainable codebase

## 🏗️ Folder Structure
```sh
/app          # Next.js App Router pages/layout
/components
  /widgets    # All widget UIs (Card, Table, Chart, Container, Settings)
  /layout     # Layout-level components (Navbar, Dashboard, Theme)
/store        # Zustand state management
/utils        # Data generators (mockStocks, nanoid, helpers)
/styles       # Tailwind CSS and custom global styles
```

## ⚡ Performance & Best Practices
- **Lazy loading** for widgets/components to reduce initial JS bundle
- **Automatic code splitting** with [Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- Uses **Client (=CSR)** rendering for drag & drop interactivity; can extend with server components for SSR/SSG in the future
- All code is typed (TypeScript) and follows best practices (comments, naming, separation of concerns)
- Visual polish: Skeleton loaders, error handling, modern UI/UX

## 🚀 Getting Started
1. **Install:**
    ```bash
    npm install
    ```
2. **Run locally:**
    ```bash
    npm run dev
    ```
3. **Build for production:**
    ```bash
    npm run build && npm run start
    ```

## 🛠️ Deployment
- Deploy instantly to **Vercel** — no special config or ENV keys needed
- Clean repo (no build/env files, only source code)

## 📝 Documentation

### Widget Types
- **Finance Card:** Symbol, price, change %, volume—all animated, real-time
- **Table:** Searchable, paginated, sortable, realistic stocks
- **Chart:** Line chart with Daily/Weekly/Monthly ranges (Chart.js)

### Widget Controls
- Add, remove, refresh, rename, and reorder all in UI
- All state and layout saved automatically (Zustand + LocalStorage)

### Mock Data
- True-to-life randomness, "market feel" using `/utils/mockStocks.ts`

### Dark/Light Mode & UX
- Toggle in Navbar. App bar is sticky. Mobile-ready, fluid, recruiter-grade polish.

### Performance
- Widget modules are lazy-loaded and memoized to prevent extra rerenders
- Code-split entry points; only load UI as needed

---

Made with ❤️ by @dheeerajj001 — for demo, learning, and modern frontend showcases!
