# Cometa App 🚀

A modern web application built with **Next.js 15** and **React 19**, designed for performance, scalability, and ease of development.

## 🚀 Tech Stack

- **Next.js 15** with Turbopack  
- **React 19**  
- **Zustand** for state management  
- **Tailwind CSS** for styling  
- **Framer Motion** for animations  
- **Firebase** for backend services  
- **Jest** & **React Testing Library** for testing  
- **Husky** & **Lint-staged** for code quality  
- **Prettier** & **ESLint** for formatting and linting  

## 🛠 Getting Started

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd app-cometa
npm install
```

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

> ⚠️ `.env.example` includes all the required environment variables to run the app locally. Normally these files aren't versioned, but this one is included to simplify the setup process.

Start the development server:

```bash
npm run dev
```

## ✅ Running Tests

Run all tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## 📦 Useful Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run format    # Format code with Prettier
```

## 📄 Environment Variables

Example contents of `.env.example`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

These variables must be copied into `.env.local` with appropriate values.

## 🎥 Demo Video

[▶️ Ver demo en Loom](https://www.loom.com/share/c713f3345cec4056b878673891d62728?sid=82aa4c1a-bc03-4082-89a4-0e90aeff2755)
