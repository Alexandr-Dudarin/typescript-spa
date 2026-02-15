🐶 Pet Journal SPA

Single Page Application for browsing, creating and managing pets.

🔗 Live Demo:https://alexandr-dudarin.github.io/typescript-spa

🔗 Repository:https://github.com/Alexandr-Dudarin/typescript-spa

✨ Features

- Fetch pets from external API
- Like / Unlike pets
- Create new pet
- Delete pets
- Search by title (debounced)
- Pagination
- Skeleton loaders
- Dynamic routing
- Light / Dark theme (persisted in localStorage)
- Fully responsive layout

🛠 Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Router
- Vite
- CSS (Design system with variables)

🧠 Architecture Highlights

- Feature-based scalable folder structure
- Global state management with Redux Toolkit
- UI state isolated in `features/ui`
- Memoized selectors for performance
- Reusable UI component system
- Persistent application theme
- Separation of data, UI and business logic

📁 Project Structure

src/
├─ api/            # API requests
├─ app/            # store & router
├─ components/     # reusable components
├─ features/       # Redux slices
│  ├─ pets/
│  └─ ui/
├─ layout/         # app layout
├─ pages/          # route pages
├─ index.css       # global styles & design tokens
└─ main.tsx        # app entry point


🚀 Getting Started
Install dependencies

npm install
Run locally
npm run dev

Build
npm run build

🌐 Deployment

The app is deployed using GitHub Pages.

npm run deploy

🔌 API

Data is fetched from:

https://dog.ceo/dog-api/

🎨 UI & Theming

CSS variables as a design system

Light / Dark mode

Theme persistence via localStorage

Reusable Button component with variants

Skeleton loaders for better UX

📌 Future Improvements

Edit pet page

Form validation

Unit tests

Error boundaries

Accessibility improvements

i18n

🎯 Purpose of the Project

This project was built to practice:

Scalable React architecture

Type-safe development

State management with Redux Toolkit

SPA routing

Complex UI state handling

Production-like project structure

👨‍💻 Author

Alexander Dudarin

Frontend Developer

[Мой Telegram](https://t.me/Dudarin23)
