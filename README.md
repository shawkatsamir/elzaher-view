# Elzaher View

This project is a web application built with Next.js and TypeScript, showcasing various services and works.

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) - A React framework for building server-side rendered and statically generated web applications.
- **Language:** [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- **Linting:** [ESLint](https://eslint.org/) - A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **Formatting:** [Prettier](https://prettier.io/) - An opinionated code formatter.

## Project Structure

The project follows the standard Next.js `app` directory structure:

```
/
├── app/                      # Main application directory
│   ├── blog/                 # Blog section
│   ├── services/             # Services pages (cleaning, contracting, etc.)
│   ├── works/                # Works/portfolio section
│   ├── layout.tsx            # Main application layout
│   └── page.tsx              # Home page
├── components/               # Reusable React components
│   ├── ui/                   # Basic UI components (Button, Card, etc.)
│   └── *.tsx                 # Other components (Header, Footer, etc.)
├── public/                   # Static assets
│   └── images/               # Images used in the application
├── .eslintrc.json            # ESLint configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Project dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```