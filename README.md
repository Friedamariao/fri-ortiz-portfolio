# Fri Ortiz — Security Portfolio

Academic cybersecurity portfolio developed by **Frieda María Ortiz López** for the **CNO IV — Seguridad Informática** course at Universidad Politécnica de San Luis Potosí.

The portfolio documents activities, projects, technical evidence, and learning progress throughout the August–December 2026 term. 

At the end of the course I plan on updating it to include my work and achievements as a reference for future academic and professional opportunities.

## Live site

[View the portfolio on GitHub Pages](https://friedamariao.github.io/fri-ortiz-portfolio/)

## Features

* Responsive, mobile-first interface.
* Editorial visual design with accessible color contrast.
* Academic introduction and student profile.
* Course focus and portfolio section index.
* Interactive terminal with portfolio-related commands.
* Technical implementation information.
* Accessible contact form with client-side validation.
* Email delivery and automatic confirmation through EmailJS.
* Keyboard navigation and visible focus states.
* Reduced-motion preference support.
* Automated GitHub Pages deployment.
* HTTPS-enabled public site.

## Interactive terminal

The homepage includes an interactive terminal with the following commands:

```text
help
whoami
course
portfolio
sections
tech
contact
clear
```

Commands are executed by typing them into the terminal and pressing `Enter`.

## Technology stack

* React 19
* JavaScript
* JSX
* Vite 8
* Tailwind CSS 4
* EmailJS
* ESLint
* Git and GitHub
* GitHub Actions
* GitHub Pages

## Local development

### Requirements

* A recent Node.js LTS release
* npm
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Friedamariao/fri-ortiz-portfolio.git
```

Enter the project directory:

```bash
cd fri-ortiz-portfolio
```

Install the dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

## Available scripts

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

```bash
npm run lint
```

Analyzes the source code with ESLint.

```bash
npm run build
```

Creates an optimized production build in the `dist` directory.

```bash
npm run preview
```

Runs a local preview of the production build.

## Project structure

```text
.
├── .github
│   └── workflows
│       └── deploy.yml
├── src
│   ├── components
│   │   ├── contact
│   │   ├── home
│   │   ├── layout
│   │   └── ui
│   ├── data
│   ├── layouts
│   ├── pages
│   ├── utils
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Deployment

The portfolio is deployed automatically through GitHub Actions.

Every push to the `main` branch triggers the deployment workflow, which:

1. Checks out the repository.
2. Configures Node.js.
3. Installs dependencies with `npm ci`.
4. injects the EmailJS configuration from GitHub Actions secrets.
5. Builds the production site.
6. Uploads the generated `dist` directory.
7. Deploys the artifact to GitHub Pages.

The production site is available through HTTPS.

## Environment variables

The application uses the following Vite environment variables:

```text
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

Local values must be stored in `.env.local`. Deployment values are configured through GitHub Actions secrets.

Environment files are excluded from version control.

## Accessibility

The project includes:

* Semantic HTML structure.
* A skip-to-content link.
* Keyboard-accessible navigation and controls.
* Associated form labels and validation messages.
* Live regions for terminal and form status updates.
* Visible focus indicators.
* Accessible color contrast.
* Responsive layouts.
* Reduced-motion preference support.

Accessibility and responsive behavior will continue to be reviewed as new portfolio sections are introduced.

## Planned sections (this is subject tochange)

* Home
* Activities
* Projects
* Certificates

Activities is already live and organizes academic evidence by assessment period (Parcial I, II, III), with access to documents, downloadable PDF files, code, and additional resources as they're published.

## Author

**Frieda María Ortiz López**

* [GitHub](https://github.com/Friedamariao)
* [LinkedIn](https://www.linkedin.com/in/frieda-ortiz/)

## Academic context

This repository is an academic project developed for **CNO IV — Seguridad Informática** at Universidad Politécnica de San Luis Potosí during the August–December 2026 term.
