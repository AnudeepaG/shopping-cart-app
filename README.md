# Shopping Cart App

A modern, feature-rich shopping cart application built with React, Vite, Tailwind CSS, and Context API. Includes authentication, wishlist, orders, account management, guest access, and a professional UI/UX.

---

## Features
- User registration & login
- Guest access
- Wishlist management
- Order history & cancellation
- Account management
- Responsive design
- Shopping-themed backgrounds and micro-interactions

---

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/<your-username>/<repo-name>.git
cd shopping-cart-app
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run the App Locally
```sh
npm run dev
```
- The app will start on `http://localhost:5173` (default Vite port).

### 4. Build for Production
```sh
npm run build
```
- Output will be in the `dist` folder.

### 5. Preview Production Build
```sh
npm run preview
```

---

## Project Structure
```
shopping-cart-app/
├── src/
│   ├── components/        # Reusable UI components
│   ├── contexts/          # Context providers (Auth, Wishlist)
│   ├── models/            # Data models (Product, Order, CartItem)
│   ├── pages/             # Main app pages (Login, Register, Orders, Account, Wishlist)
│   ├── services/          # API and business logic
│   ├── assets/            # Images and SVGs
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── shopping-bg.css    # Custom background styles
├── public/                # Static files
├── package.json           # Project metadata and scripts
├── tailwind.config.js     # Tailwind CSS config
├── vite.config.js         # Vite config
└── README.md              # Project documentation
```

---

## Environment & Tools
- Node.js (v16+ recommended)
- npm (v7+ recommended)
- Vite (for fast development/build)
- Tailwind CSS (utility-first styling)
- React (UI library)

---

## Deployment
- Deploy easily to Vercel, Netlify, or GitHub Pages (see README for details)

---

## Contributing
Pull requests and suggestions are welcome!

---

## License
MIT

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
