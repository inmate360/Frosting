# Sparkle Nuxt

A modern Nuxt 3 application with TypeScript support, ready for deployment on Vercel.

## Features

- 🚀 Nuxt 3 with Vue 3
- 📦 TypeScript support
- 🎨 Nuxt UI components
- 🔐 Authentication system
- 💬 Real-time chat functionality
- 👤 User profiles
- 💳 Wallet/Payment integration
- 🚀 Optimized for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd sparkle-nuxt
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Deployment on Vercel

### Option 1: Via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Via GitHub Integration

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Nuxt and configure the build settings

### Environment Variables

Set the following environment variables in your Vercel project:

```
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
VITE_API_BASE_URL=your-api-base-url
```

## Project Structure

```
sparkle-nuxt/
├── app/
│   ├── components/     # Vue components
│   ├── composables/    # Vue composables
│   ├── layouts/        # Layout components
│   ├── pages/          # Page routes
│   └── assets/         # Static assets
├── server/
│   ├── api/            # API routes
│   ├── middleware/     # Server middleware
│   └── utils/          # Server utilities
├── nuxt.config.ts      # Nuxt configuration
├── vercel.json         # Vercel configuration
└── package.json        # Dependencies
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Chat
- `GET /api/chat/[id]` - Get chat history
- `POST /api/chat/[id]` - Send message

### Wallet
- `POST /api/wallet/topup` - Top up wallet

## License

MIT
