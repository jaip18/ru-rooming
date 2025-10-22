# RU Rooming - Roommate Matching App

Stop Swiping Blindly! Trading your peace for a random roommate is a gamble. Tired of the housemate horror stories? RU Rooming uses smart AI to find your genuinely compatible match, not just a warm body for the lease.

A Tinder-like app for finding compatible roommates, built with Next.js, Auth0, and modern web technologies.

## Features

- 🔐 **Secure Authentication** - Auth0 integration for user management
- 💫 **Swipe Interface** - Tinder-like experience for roommate discovery
- 🎯 **Smart Matching** - Algorithm-based compatibility scoring
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🏠 **Profile Management** - Comprehensive roommate profiles
- 💬 **Match System** - View and manage your matches

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: PostgreSQL, Weavinate, AWS services
- **Styling**: Tailwind CSS v4
- **Authentication**: Auth0
- **Icons**: Lucide React
- **Deployment**: Vercel (planned)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Auth0 account (free tier)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd RURooming/ru-rooming
```

2. Install dependencies:
```bash
npm install
```

3. Set up Auth0:
   - Create a new Auth0 application
   - Configure allowed callback URLs: `http://localhost:3000/api/auth/callback`
   - Configure allowed logout URLs: `http://localhost:3000`
   - Copy your Auth0 credentials

4. Create environment variables:
```bash
cp .env.local.example .env.local
```

5. Update `.env.local` with your Auth0 credentials:
```
AUTH0_SECRET=your-auth0-secret-here
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/auth/          # Auth0 API routes
│   ├── dashboard/         # Main swipe interface
│   ├── matches/           # View matches
│   ├── profile/           # Profile management
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
├── lib/                   # Utilities and configurations
└── types/                 # TypeScript type definitions
```

## Features Overview

### Landing Page
- Beautiful hero section with app introduction
- Feature highlights and how-it-works section
- Auth0 login integration

### Dashboard (Swipe Interface)
- Tinder-like card interface
- Profile cards with compatibility scores
- Swipe actions (like/pass)
- Mock data for demonstration

### Matches Page
- View all your matches
- Match compatibility scores
- Quick actions (message, view profile)

### Profile Management
- Edit personal information
- Set preferences (budget, lifestyle, interests)
- Location and move-in date settings
- Interactive preference selection

## Future Enhancements

- [ ] Real-time messaging system
- [ ] Advanced matching algorithms
- [ ] Image upload functionality
- [ ] Location-based filtering
- [ ] Push notifications
- [ ] Mobile app (React Native)

## Deployment

The app is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## Contributing

This is a personal project for portfolio purposes. Feel free to fork and modify for your own use.

## License

MIT License - feel free to use this project for learning and portfolio purposes.