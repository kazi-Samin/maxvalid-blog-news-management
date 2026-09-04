# MaxValid Frontend Development Internship Assignment

## Project Overview
This project is a responsive, modern React application built for the **MaxValid Frontend Development Internship Assignment**. It implements a complete **Blog & News Management** platform based on the provided Figma/PDF design specifications, featuring a public-facing news portal and an internal admin management dashboard.

The application is engineered with a clean architecture, reusable components, proper state management, client-side routing, and modular CSS without relying on heavy external styling frameworks.

---

## Features

### 🌐 Public Portal & News
- **Responsive Public Homepage**: Hero section with dark overlay, background image, and clear typography.
- **News & Articles Page**: Clean layout showcasing featured news and a 3x3 grid (9 cards per page).
- **Featured News Banner**: Styled card highlighting priority articles.
- **Debounced Search**: Functional search input with a `300ms` `useDebounce` hook filtering title and content.
- **Category Sidebar Filtering**: Filter articles across 17 categories; resets pagination slice to Page 1 upon selection.
- **Pagination**: Interactive page numbers, next/previous buttons, and active page highlighting.
- **Responsive Mobile Navigation**: Top header hamburger drawer toggle + sticky mobile bottom navigation bar with 5 items (`Home`, `Donate`, `Alerts`, `Partner`, `Articles`).
- **Footer**: Multi-column links for Company, Donate, and Others with exact copyright notice (`© 2026 Bandhan Paribar. All rights reserved.`).

### 🔐 Authentication & Admin Management
- **Sign In**: Split-panel layout with Bandhan Paribar primary blue (`#0084d4`) branding, password visibility toggle, error feedback, and a styled **← Back to Home** button.
- **Frontend Mock Authentication**: `AuthContext` provider and `useAuth()` custom hook with `localStorage` persistence.
- **Protected Admin Routes**: `ProtectedRoute` wrapper guarding `/admin/*` routes and redirecting unauthenticated users to `/signin`.
- **Admin Dashboard Layout**: Sidebar navigation displaying active states and Super Admin profile (`superadmin@kichukori.com`).
- **Blog & News Management Table**: Data table displaying content title, two-line published date & time (`Jun 29, 2026` / `10:30 AM`), source link, and three-dots action dropdown (`View`, `Edit`, `Delete`).
- **Admin Search**: Real-time content filtering in the admin table.

### 📝 Create New Content & Upload Modal
- **Create New Content Form**: Comprehensive form with breadcrumb navigation and field validation.
- **64-Character Title Limit**: Dynamic character counter (`0/64`) and hard length enforcement.
- **Rich Text Toolbar**: Formatting buttons (`Bold`, `Italic`, `Underline`, `Heading`, `List`, `Link`) appending markdown formatting tags to the textarea.
- **Tag Selection**: Interactive tag chips supporting addition, removal, and strict 3-tag limit enforcement.
- **Drag & Drop Image Upload Modal**: Dimmed backdrop modal supporting file selection and Drag & Drop file reading.
- **File Validation**: Accepts `PDF`, `JPG`, `JPEG`, and `PNG` file formats.
- **5MB File Size Limit**: Strict JavaScript validation rejecting files larger than 5MB with an error alert box.
- **Image Preview**: Displays uploaded file preview with a remove option.
- **Submission Loading State**: Form submit button displays `"Creating..."` and disables actions during submission.

---

## Tech Stack
- **Core Library**: React 19 (JavaScript ES6+)
- **Build Tool & Dev Server**: Vite 8
- **Routing**: React Router v6 (`react-router-dom`)
- **Styling**: Modern CSS Modules (`.module.css`) for scoped, zero-conflict styling
- **Icons**: Lucide React (`lucide-react`)
- **Linter**: Oxlint (`oxlint`)

---

## Project Structure
```text
c:/Projects/Intern Assignment/
├── dist/                    # Compiled production build output
├── public/                  # Public static assets
├── src/
│   ├── assets/              # Figma image assets & Bandhan Paribar logo
│   ├── components/
│   │   ├── layout/          # Shared layouts (AdminLayout, PublicLayout, ProtectedRoute)
│   │   └── ui/              # Reusable UI elements (NewsCard, Pagination)
│   ├── context/             # AuthContext provider & useAuth hook
│   ├── data/                # Central mock datasets (articles.js)
│   ├── hooks/               # Custom hooks (useDebounce.js)
│   ├── pages/               # Page components (PublicNews, SignIn, AdminDashboardList, AdminDashboardCreate, PlaceholderPage)
│   ├── App.css              # App styling resets
│   ├── App.jsx              # Client-side router configuration
│   ├── index.css            # Global CSS variables & font imports
│   └── main.jsx             # React entry point
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and npm scripts
├── README.md                # Project documentation
└── vite.config.js           # Vite configuration
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kazi-Samin/maxvalid-blog-news-management.git
   ```
2. Navigate into the project folder:
   ```bash
   cd maxvalid-blog-news-management
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Run Locally
To launch the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
To generate an optimized production bundle:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## Demo Credentials

Use the following demo credentials to sign in and access the admin dashboard:

- **Email**: `superadmin@kichukori.com`
- **Password**: `admin123`

*Note: This is frontend mock authentication designed specifically for assignment evaluation.*

---

## Implemented Routes

### Public Routes
- `/` or `/news` — Public News & Articles portal (Home)
- `/signin` — Sign In page
- `/donate`, `/events`, `/about`, `/gallery`, `/partnership`, `/our-work`, `/blood-donate`, `/blood-request`, `/terms`, `/privacy`, `/contact` — Functional placeholder routes with Bandhan Paribar branding and **"← Return to Home"** buttons.

### Protected Admin Routes
- `/admin` or `/admin/blog-news` — Blog & News Management content table
- `/admin/blog-news/create` — Create New Blog & News form and upload modal
- `/admin/dashboard`, `/admin/users`, `/admin/settings` — Functional admin sub-routes

---

## Validation & UX Summary
- **Title Field**: Required input, 64-character limit, `0/64` dynamic counter.
- **Tag Selection**: Required input, maximum 3 tags limit.
- **File Upload Modal**: Accept format check (`PDF`, `JPG`, `JPEG`, `PNG`), strict `5MB` size limit rejection with user error alert.
- **Form Submission**: Submitting state (`"Creating..."`), button disable to prevent duplicate submissions.
- **Search & Filter**: Real-time debounced search (`useDebounce`), zero-results empty state messages.

---

## Testing & Verification
- ✅ **Production Build**: Verified with `npm run build` (0 errors, compiled in 3.66s).
- ✅ **Linter**: Verified with `npx oxlint` (0 errors).
- ✅ **Browser Console**: Clean execution with zero console runtime errors.
- ✅ **Responsive Testing**: Verified across 1440px, 1024px, 768px, 390px, and 375px viewports.

---

## Design Reference
Implemented in accordance with the provided Figma design specs for the **MaxValid Frontend Development Internship Assignment**.

---

## Deployment Information
- **Live Deployment URL**: *Pending deployment (e.g. Vercel/Netlify)*
- **GitHub Repository**: [https://github.com/kazi-Samin/maxvalid-blog-news-management](https://github.com/kazi-Samin/maxvalid-blog-news-management)

---

## Notes
Mock data and local state management (`localStorage`) are utilized as no backend API endpoint was provided by the assignment guidelines.
