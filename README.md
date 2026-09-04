# maxvalid-blog-news-management

A responsive React application built for the MaxValid Frontend Development Internship assignment.

## Short Description
This project implements a fully responsive "Blog & News Management" platform based on a provided Figma design. It features a public-facing news article portal and an internal admin dashboard for managing content. The implementation focuses on clean architecture, reusable components, and modern CSS practices without relying on heavy external styling frameworks.

## Technologies Used
- **React.js** (JavaScript ES6+)
- **Vite** (Build tool and dev server)
- **React Router v6** (Client-side routing)
- **Vanilla CSS & CSS Modules** (Scoped, maintainable styling without Tailwind)
- **Lucide React** (Lightweight SVG icons)

## Main Features
- **Public News Portal**: A responsive grid layout featuring a hero section, search bar, side navigation filters, and article cards.
- **Admin Dashboard Layout**: A persistent sidebar navigation with active state tracking.
- **Content Management Table**: A data table displaying mock content with pagination UI.
- **Content Creation Form**: A detailed form featuring character counts, a mock rich-text toolbar, tag inputs, and a custom image upload modal.
- **Fully Responsive**: Adapts seamlessly across Desktop, Tablet, and Mobile devices (including a custom mobile bottom navigation bar).
- **Semantic & Accessible**: Uses semantic HTML5 tags and adheres to structural best practices.

## Project Structure Overview
```text
src/
├── assets/                  # Static assets (images, icons)
├── components/
│   ├── layout/              # Shared layouts (AdminLayout, PublicLayout)
│   └── ui/                  # Reusable UI elements (NewsCard, Pagination)
├── pages/                   # Main page components
│   ├── AdminDashboardCreate.jsx
│   ├── AdminDashboardList.jsx
│   └── PublicNews.jsx
├── styles/                  # Global styles (index.css)
├── App.jsx                  # Route definitions
└── main.jsx                 # Application entry point
```

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/kazi-Samin/maxvalid-blog-news-management.git
   ```
2. Navigate into the directory:
   ```bash
   cd maxvalid-blog-news-management
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development/Run Instructions
To start the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## Production Build Instructions
To create a production-ready build:
```bash
npm run build
```
The optimized files will be generated in the `dist` folder. To preview the build locally, run:
```bash
npm run preview
```

## Important Implementation Decisions
- **Styling Choice**: I deliberately chose Vanilla CSS and CSS Modules over Tailwind CSS to demonstrate core CSS competency, maintainability, and strict adherence to the assignment's emphasis on "Modern CSS" and "Clean project structure" without over-reliance on utility frameworks.
- **Responsiveness**: CSS Grid was used for the article layout, while Flexbox handles internal component alignment. A mobile-specific bottom navigation bar replaces the standard desktop navigation on small screens, matching the Figma design perfectly.
- **Mock Data**: Since no external API endpoint was provided, mock data arrays are used within the page components to simulate data fetching.
- **Routing**: `react-router-dom` handles switching between the Public view (`/`) and Admin views (`/admin/*`), using nested `Outlet` components for persistent layouts.

## Deployment Information
This project is deployment-ready. To deploy on platforms like **Vercel** or **Netlify**:
1. Connect your GitHub repository to the platform.
2. Ensure the framework preset is set to **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
