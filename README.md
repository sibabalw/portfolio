# Sibabalwe Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design with sleek UI elements
- Interactive animations and transitions
- Dark/Light mode support
- Sections for About, Skills, Projects, and Contact
- Fully responsive layout optimized for mobile, tablet, and desktop
- Performance optimized with Next.js best practices

## Technologies Used

- **Next.js 15** - React framework for server-rendered applications
- **TypeScript** - Type safety for better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sibabalwe/sibabalwe-portfolio.git
cd sibabalwe-portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
/sibabalwe-portfolio
├── public/            # Static assets
│   └── images/        # Image assets
├── src/
│   ├── app/           # Next.js App Router
│   │   ├── layout.tsx # Root layout
│   │   └── page.tsx   # Home page
│   ├── components/    # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── ScrollToTop.tsx
├── tailwind.config.js # Tailwind CSS configuration
├── next.config.ts     # Next.js configuration
└── tsconfig.json      # TypeScript configuration
```

## Deployment

This project can be easily deployed to Vercel, Netlify, or any other hosting platform that supports Next.js.

### Deployment to Vercel

1. Create an account on [Vercel](https://vercel.com)
2. Install the Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project directory

## Customization

### Replacing Images

Replace the placeholder images in the `public/images` directory with your own images.

### Updating Content

- Update your personal information in the components
- Add your own projects in the `Projects.tsx` component
- Update your skills and information in the `Skills.tsx` and `About.tsx` components

### Color Scheme

The color scheme can be modified in the `globals.css` file by adjusting the CSS variables.

## License

This project is open source and available under the [MIT License](LICENSE).
