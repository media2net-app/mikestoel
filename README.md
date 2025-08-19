# Mike Stoel - Login Page

Een moderne React Next.js login pagina voor Mike Stoel met dark mode ondersteuning.

## 🚀 Features

- **Moderne UI/UX**: Gebouwd met Tailwind CSS en moderne design patterns
- **Dark Mode**: Volledige dark mode ondersteuning met localStorage persistentie
- **Responsive Design**: Werkt perfect op alle apparaten
- **TypeScript**: Volledig getypeerd voor betere developer experience
- **Moderne Animaties**: Subtiele animaties en overgangen
- **Toegankelijkheid**: WCAG compliant met proper focus states

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: Voor type safety
- **State Management**: React hooks
- **Dark Mode**: Custom hook met localStorage

## 📁 Project Structuur

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles met dark mode
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Login pagina
├── components/            # React componenten
│   ├── auth/             # Authenticatie componenten
│   │   └── login-form.tsx # Login formulier
│   └── ui/               # Herbruikbare UI componenten
│       ├── button.tsx    # Button component
│       ├── card.tsx      # Card component
│       ├── input.tsx     # Input component
│       └── dark-mode-toggle.tsx # Dark mode toggle
├── hooks/                # Custom React hooks
│   └── use-dark-mode.ts  # Dark mode hook
├── lib/                  # Utility functies
│   └── utils.ts          # Class name utilities
└── types/                # TypeScript type definities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm of yarn

### Installation

1. Clone het project:
```bash
git clone <repository-url>
cd mikestoel
```

2. Installeer dependencies:
```bash
npm install
```

3. Start de development server:
```bash
npm run dev
```

4. Open [http://localhost:8000](http://localhost:8000) in je browser.

## 🎨 Customization

### Kleuren aanpassen

De kleuren kunnen aangepast worden in `src/app/globals.css` in de `:root` en `.dark` selectors.

### Logo aanpassen

Het logo kan aangepast worden in `src/components/auth/login-form.tsx` bij de `MS` initials.

### Teksten aanpassen

Alle teksten zijn te vinden in de componenten en kunnen direct aangepast worden.

## 📱 Responsive Design

De login pagina is volledig responsive en werkt op:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🌙 Dark Mode

De dark mode functionaliteit:
- Slaat de voorkeur op in localStorage
- Respecteert de system preference bij eerste bezoek
- Schakelt soepel over tussen light en dark mode
- Is beschikbaar via de toggle in de rechterbovenhoek

## 🔧 Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build voor productie
- `npm run start` - Start productie server
- `npm run lint` - Run ESLint

### Code Style

Het project gebruikt:
- ESLint voor code linting
- Prettier voor code formatting
- TypeScript voor type checking

## 📄 License

Dit project is gemaakt voor Mike Stoel. Alle rechten voorbehouden. © 2025

## 🤝 Contributing

Voor vragen of suggesties, neem contact op met het development team.
