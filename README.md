# Employee Certificate Request Solution

## An MVP single-page application built with **React**.

## Form Walkthrough**.



https://github.com/user-attachments/assets/74d5d176-bdd2-41b1-a02e-b51f26e9f0cd


## ✨ Features

- Client-side routing with React Router

- Data loading via React Router loaders

- Form validation using Zod

- Sortable data table powered by TanStack Table

- Strongly typed application using TypeScript

- Fully client-side SPA architecture

- Unit testing with Vitest and React Testing Library (in progress)

---

## 🧱 Tech Stack

- **React**
- **TypeScript**
- **React Router**
- **Vite + Tailwind CSS**
- **Zod**
- **Tanstack Table**
- **Testing Library / Vitest/RTL**

---

## 📌 Installation Guide

## Clone the Repository

```bash
git clone https://github.com/LaurenAMolloy/Employee-Certificate-Solution.git
cd Employee-Certificate-Solution
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Environment Setup

```bash
cp .env.example .env
```

Update `/.env.example`:

```env
VITE_SUBMISSION_API_KEY=your_submission_key
VITE_CERTIFICATES_API=your_certificates_key
```

---

## Run

```bash
npm run dev
```

Runs at:

```
http://localhost:3000
```

---

# 📁 Project Structure

```
.
├── eslint.config.js
├── index.html                  # Root HTML template
├── package.json                # Project dependencies and scripts
├── package-lock.json
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts              # Vite build configuration
├── vitest.config.ts            # Vitest testing configuration
├── README.md
│
├── public
│   └── vite.svg                # Static public assets
│
└── src
    ├── main.tsx                # React entry point
    ├── App.tsx                 # Application routing setup
    ├── index.css               # Global styles
    │
    ├── api                     # API layer (data fetching & mutations)
    │   ├── mutations
    │   │   └── createCertificate.ts
    │   ├── queries
    │   │   └── getCertificates.ts
    │   └── types               # Shared API types
    │       ├── certificate.ts
    │       ├── createCertificateApiInput.ts
    │       └── createCertificateInput.ts
    │
    ├── components              # Reusable UI components
    │   ├── CertificateForm.tsx
    │   ├── Nav.tsx
    │   └── Table.tsx
    │
    ├── pages                   # Route-based pages
    │   ├── Root.tsx
    │   ├── certificates
    │   │   ├── CertificateListPage.tsx
    │   │   └── certificatesListLoader.tsx
    │   └── requestCert
    │       ├── RequestCertificatePage.tsx
    │       ├── RequestCertificatePage.test.tsx
    │       ├── certificateAction.ts
    │       └── schema.ts
    │
    └── assets                  # Static assets (images, icons, etc.)
```

# 🚀 Future Improvements & Roadmap

The project is actively evolving. Below are planned improvements to enhance reliability, test coverage, and production readiness.

---

## 🛡 Error Handling Improvements

Currently, the application does not implement:

- React Error Boundaries
- Route-level `errorElement` handling (React Router)

### Planned Enhancements

- Implement a reusable `ErrorBoundary` component
- Add route-based `errorElement` support
- Introduce centralized error handling for API failures
- Add user-friendly fallback UI for unexpected crashes

This will significantly improve resilience and user experience.

---

## 🧪 Expanded Test Coverage

While one test has been implemeted, coverage can be improved.

### Planned Improvements

- Add unit tests for the `Table` component

---

## 🌐 Mock API Testing (Mock Service Worker)

To improve test reliability and isolation, we plan to integrate:

- Mock Service Worker (MSW)

### Benefits

- Mock network requests during development and testing
- Avoid hitting real APIs during tests

This will allow more realistic integration tests without relying on external services.

---

## 🔒 Production Deployment Architecture

Currently, API requests are handled directly from the frontend.

For production deployment, a backend proxy server will be introduced.

### Why This Is Important

- Prevent exposing API keys in the browser
- Secure secrets

### Planned Architecture

Frontend (React + Vite)
↓
Node.js + Express Proxy Server
↓
External APIs / Services

The proxy server will:

- Store API keys securely in environment variables
- Forward authenticated requests to third-party APIs

This ensures security best practices are followed in a production environment.

These improvements aim to transition the application from a development prototype to a production-ready, scalable solution.
