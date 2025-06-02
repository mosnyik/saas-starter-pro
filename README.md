# SaaSStart Pro - Complete SaaS Starter Kit

A production-ready SaaS starter kit built with Next.js, Firebase Auth, Stripe, Prisma, and PostgreSQL. Features multi-tenancy, role-based access control, billing management, and everything you need to launch your SaaS quickly.

![SaaSStart Pro](https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop)

## 🚀 Features

- **🔐 Authentication**: Firebase Auth with email/password and magic links
- **👥 Multi-Tenancy**: Complete tenant isolation with team management
- **🛡️ RBAC**: Role-based access control (Owner, Admin, Member, Guest)
- **💳 Billing**: Stripe integration with subscriptions and invoices
- **📊 Dashboard**: Analytics, metrics, and user management
- **🔔 Notifications**: In-app notifications and email preferences
- **⚡ API**: Rate-limited, secure API routes
- **🎨 UI**: Modern, responsive design with Tailwind CSS
- **📱 Mobile**: Fully responsive across all devices

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Authentication**: Firebase Auth
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Firebase project
- Stripe account
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/saas-starter-pro.git
cd saas-starter-pro
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/saasstart_pro"

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef123456"

# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# App Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

### 5. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication with Email/Password and Email Link providers
4. Get your config from Project Settings > General > Your apps
5. Update the Firebase config in `.env.local`

### 6. Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys from Developers > API keys
3. Create products and prices for your subscription plans
4. Set up webhooks (see Webhook Setup section below)
5. Update Stripe config in `.env.local`

### 7. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Detailed Setup

### Database Configuration

#### Option 1: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database:
```sql
CREATE DATABASE saasstart_pro;
```
3. Update `DATABASE_URL` in `.env.local`

#### Option 2: Cloud Database (Recommended)

**Neon (Recommended)**:
1. Sign up at [Neon](https://neon.tech/)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`

**Supabase**:
1. Sign up at [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string to `DATABASE_URL`

**PlanetScale**:
1. Sign up at [PlanetScale](https://planetscale.com/)
2. Create a new database
3. Create a branch and get connection string
4. Update `DATABASE_URL` in `.env.local`

### Firebase Authentication Setup

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Follow the setup wizard

2. **Enable Authentication**:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password"
   - Enable "Email link (passwordless sign-in)"

3. **Configure Authorized Domains**:
   - Add your domain (e.g., `localhost`, `yourdomain.com`)

4. **Get Configuration**:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Copy the config object values to `.env.local`

### Stripe Integration Setup

1. **Create Stripe Account**:
   - Sign up at [Stripe](https://stripe.com/)
   - Complete account verification

2. **Get API Keys**:
   - Go to Developers > API keys
   - Copy Publishable key and Secret key
   - Use test keys for development

3. **Create Products and Prices**:
```bash
# Using Stripe CLI (recommended)
stripe products create --name="Starter Plan" --description="Perfect for small projects"
stripe prices create --product=prod_xxx --unit-amount=900 --currency=usd --recurring-interval=month

stripe products create --name="Professional Plan" --description="Best for growing businesses"
stripe prices create --product=prod_xxx --unit-amount=2900 --currency=usd --recurring-interval=month

stripe products create --name="Enterprise Plan" --description="For large organizations"
stripe prices create --product=prod_xxx --unit-amount=9900 --currency=usd --recurring-interval=month
```

4. **Webhook Setup**:
   - Go to Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | ✅ |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | ✅ |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | ✅ |
| `NEXTAUTH_SECRET` | NextAuth secret for JWT | ✅ |

## 📁 Project Structure

```
saasstart-pro/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── reset-password/
│   ├── (dashboard)/              # Dashboard pages
│   │   └── dashboard/
│   │       ├── billing/
│   │       ├── settings/
│   │       └── team/
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── stripe/
│   │   └── webhooks/
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable components
│   ├── dashboard/                # Dashboard-specific components
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utility libraries
│   ├── auth-context.tsx          # Authentication context
│   ├── firebase.ts               # Firebase configuration
│   ├── prisma.ts                 # Prisma client
│   ├── stripe.ts                 # Stripe configuration
│   └── rate-limit.ts             # Rate limiting utility
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── hooks/                        # Custom React hooks
├── .env.local                    # Environment variables
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🔐 Authentication Flow

1. **Sign Up**: Users register with email/password
2. **Email Verification**: Firebase sends verification email
3. **User Creation**: API creates user record in database
4. **Tenant Creation**: Default tenant/organization is created
5. **Dashboard Access**: User can access dashboard

## 💳 Billing Flow

1. **Subscription Creation**: User selects plan and pays via Stripe
2. **Webhook Processing**: Stripe webhooks update subscription status
3. **Access Control**: Features are enabled/disabled based on plan
4. **Billing Management**: Users can update payment methods and view invoices

## 👥 Multi-Tenancy

- Each user belongs to one or more tenants (organizations)
- Data is isolated by tenant ID
- Role-based permissions within each tenant
- Billing is handled at the tenant level

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository

2. **Configure Environment Variables**:
   - Add all environment variables from `.env.local`
   - Make sure to use production values for Firebase and Stripe

3. **Deploy**:
   - Vercel will automatically deploy your app
   - Set up custom domain if needed

### Deploy to Other Platforms

**Netlify**:
```bash
pnpm run build
pnpm run export
# Upload dist folder to Netlify
```

**Railway**:
```bash
# Install Railway CLI
pnpm add -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

## 🧪 Testing

### Run Tests

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:coverage
```

### Test Stripe Integration

1. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

2. Test webhooks locally:
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 🔧 Customization

### Adding New Payment Providers

1. Create provider configuration in `lib/`
2. Add API routes in `app/api/`
3. Update billing components
4. Add webhook handlers

### Extending User Roles

1. Update Prisma schema
2. Modify role checks in components
3. Update API middleware
4. Add role-specific features

### Custom Branding

1. Update colors in `tailwind.config.js`
2. Replace logo in components
3. Modify landing page content
4. Update email templates

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/create-user` - Create user profile
- `POST /api/auth/verify-email` - Verify email address

### Stripe Endpoints

- `POST /api/stripe/create-checkout-session` - Create payment session
- `POST /api/stripe/create-portal-session` - Create customer portal
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

### User Management

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/notifications` - Get notifications

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**:
- Check `DATABASE_URL` format
- Ensure database is running
- Verify network connectivity

**Firebase Auth Error**:
- Check Firebase configuration
- Verify authorized domains
- Ensure auth providers are enabled

**Stripe Webhook Error**:
- Verify webhook secret
- Check endpoint URL
- Ensure webhook events are selected

**Build Errors**:
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

### Getting Help

1. Check the [Issues](https://github.com/yourusername/saasstart-pro/issues) page
2. Join our [Discord community](https://discord.gg/saasstart)
3. Email support: support@saasstart.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Prisma](https://prisma.io/) - Database ORM
- [Firebase](https://firebase.google.com/) - Authentication
- [Stripe](https://stripe.com/) - Payment processing

## 📞 Support

Need help getting started? We're here to help!

- 📧 Email: support@saasstart.com
- 💬 Discord: [Join our community](https://discord.gg/saasstart)
- 📖 Documentation: [docs.saasstart.com](https://docs.saasstart.com)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/yourusername/saasstart-pro/issues)

---

**Happy building! 🚀**

Made with ❤️ by the SaaS Start team
