# Sankaran Portfolio

A premium, modern portfolio website for Backend Software Engineer Sankaran Rajendran. Built with Next.js 14, Tailwind CSS, Framer Motion, and Sanity CMS.

## Features

- **Modern Design**: Black + Orange theme with glassmorphism effects
- **Dark/Light Mode**: Toggle between themes with persistence
- **3D Hero Section**: Floating geometric shapes using React Three Fiber
- **Headless CMS**: Sanity Studio at `/studio` for easy content management
- **Responsive**: Mobile-first design with smooth animations
- **Contact Form**: Web3Forms integration for email notifications
- **E2E Testing**: Playwright test coverage

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + Drei
- **CMS**: Sanity.io
- **Contact Form**: Web3Forms
- **Testing**: Playwright
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account (https://sanity.io)
- Web3Forms account (https://web3forms.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Sankaran-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example file and fill in your values:
   ```bash
   cp env.local.example .env.local
   ```

   Edit `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_key
   ```

4. **Configure Sanity CORS**

   Go to https://sanity.io/manage → Your Project → API → CORS origins
   - Add `http://localhost:3000` for development
   - Add your production URL when deploying

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Accessing Sanity Studio

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to manage your content.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Playwright tests |
| `npm run test:ui` | Run Playwright with UI |
| `npm run test:headed` | Run Playwright in headed mode |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── studio/            # Sanity Studio route
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Navigation, Footer, ThemeToggle
│   ├── providers/         # Theme provider
│   ├── sections/          # Page sections (Hero, About, etc.)
│   ├── three/             # 3D components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/
│   └── sanity/            # Sanity client and queries
└── types/                 # TypeScript interfaces

sanity/
└── schemas/               # Sanity content schemas

tests/
└── e2e/                   # Playwright E2E tests
```

## Content Management

All content is managed through Sanity Studio at `/studio`. Available content types:

- **Site Settings**: Global settings, social links, profile image
- **Hero**: Landing section content
- **About**: Biography and quick facts
- **Skills**: Skill categories and technologies
- **Projects**: Portfolio projects with details
- **Experience**: Work history timeline
- **Achievements**: Stats and accomplishments
- **Testimonials**: Client/colleague testimonials

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Post-Deployment

1. Update Sanity CORS to include your production URL
2. Update Web3Forms domain setting

## License

MIT
