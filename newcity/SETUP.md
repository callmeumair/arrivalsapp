# NewCity Setup Guide

## Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/newcity"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Optional: Clerk Webhook Secret (for webhook verification)
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Getting Your Clerk Keys

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Go to the API Keys section
4. Copy your Publishable Key and Secret Key
5. Replace the placeholder values in your `.env.local` file

## Database Setup

1. Create a PostgreSQL database
2. Update the `DATABASE_URL` with your database credentials
3. Run the following commands:

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Open Prisma Studio to view your database
npm run db:studio
```

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application!

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your `DATABASE_URL` format
   - Ensure PostgreSQL is running
   - Verify database credentials

2. **Clerk Authentication Issues**
   - Verify your Clerk keys are correct
   - Check that your application URLs are configured in Clerk dashboard
   - Ensure your domain is allowed in Clerk settings

3. **Prisma Errors**
   - Run `npm run db:generate` to regenerate the Prisma client
   - Check that your database schema is up to date with `npm run db:migrate`

### Getting Help

- Check the main README.md for detailed documentation
- Review the code comments for implementation details
- Create an issue in the repository for bugs or questions 