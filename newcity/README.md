# NewCity - Social Onboarding Platform

A modern, full-stack web application designed to help people who recently moved to a new city connect with locals and discover events in their area.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure signup/login with Clerk
- **User Profile Setup** - Complete onboarding with interests and tags
- **Event Discovery** - Browse and RSVP to local events
- **Matching System** - Find people with shared interests
- **Business Dashboard** - Admin panel for event management
- **Real-time Messaging** - Connect with new friends

### Technical Features
- **Modern UI/UX** - Beautiful dark theme with animations
- **Responsive Design** - Works on all devices
- **Type Safety** - Full TypeScript implementation
- **Database** - PostgreSQL with Prisma ORM
- **Authentication** - Clerk integration
- **Animations** - Framer Motion for smooth interactions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Clerk account for authentication

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd newcity
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/newcity"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database with sample data
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
newcity/
├── src/
│   ├── app/
│   │   ├── api/                 # API routes
│   │   │   ├── events/          # Event management
│   │   │   └── users/           # User management
│   │   ├── admin/               # Admin dashboard
│   │   ├── create-event/        # Event creation
│   │   ├── dashboard/           # Main dashboard
│   │   ├── onboarding/          # User onboarding
│   │   └── page.tsx             # Landing page
│   ├── lib/
│   │   └── prisma.ts            # Database client
│   └── middleware.ts            # Clerk middleware
├── prisma/
│   └── schema.prisma            # Database schema
└── public/                      # Static assets
```

## 🗄️ Database Schema

The application uses the following main models:

- **User** - User profiles with interests and tags
- **Event** - Events with RSVPs and categories
- **Interest** - User interests for matching
- **Tag** - User and event tags
- **RSVP** - Event attendance tracking
- **Chat** - Messaging system
- **Message** - Individual messages

## 🔧 Configuration

### Clerk Setup
1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key and secret key
4. Configure your application URLs in Clerk dashboard

### Database Setup
1. Create a PostgreSQL database
2. Update the `DATABASE_URL` in your `.env.local`
3. Run migrations to create tables

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
Make sure to set these in your production environment:
- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- All Clerk URL configurations

## 🎨 Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update colors in `src/app/layout.tsx` for Clerk theme
- Customize animations in components using Framer Motion

### Features
- Add new event categories in `src/app/create-event/page.tsx`
- Modify user interests in `src/app/onboarding/page.tsx`
- Extend the matching algorithm in API routes

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security Features

- Clerk authentication with secure session management
- API route protection with middleware
- Input validation and sanitization
- CORS protection
- Rate limiting (can be added)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📈 Analytics

The admin dashboard includes:
- Total events created
- Total RSVPs received
- Upcoming events count
- Event management tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🎯 Roadmap

Future features planned:
- [ ] Real-time notifications
- [ ] Advanced matching algorithm
- [ ] Event recommendations
- [ ] Group chat functionality
- [ ] Mobile app
- [ ] Integration with external event APIs
- [ ] Advanced analytics dashboard

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
