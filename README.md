# Echelon Menswear

Modern men's clothing e‑commerce built with Next.js 14, Tailwind, Prisma, NextAuth, Stripe, and Cloudinary.

## ✨ Features

- **Homepage**: Hero banner, featured products, category navigation
- **Product Catalog**: Advanced filtering by category, size, and price range
- **Product Details**: Multiple images, size selection, add to cart
- **Shopping Cart**: Persistent cart with Stripe checkout integration
- **User Authentication**: Sign up/login with credentials or GitHub OAuth
- **Wishlist**: Save favorite products for later
- **Order History**: Track past purchases and order status
- **Admin Dashboard**: Complete product management with image uploads
- **Responsive Design**: Mobile-first, fully responsive UI
- **SEO Optimized**: Server-side rendering with Next.js App Router

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: NextAuth.js with Prisma adapter
- **Payments**: Stripe Checkout + webhooks
- **Images**: Cloudinary with automatic optimization
- **Deployment**: Vercel (frontend), Railway/Render/Supabase (database)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Stripe account
- Cloudinary account

### 1. Installation
```bash
git clone <your-repo>
cd clothing-app
pnpm install
```

### 2. Environment Setup
Create `.env` file:
```bash
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"

# App
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth (optional)
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 3. Database Setup
```bash
npx prisma migrate dev --name init
pnpm seed
```

### 4. Run Development Server
```bash
pnpm dev
```
Visit http://localhost:3000

### 5. Stripe Webhooks (Local Development)
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET` in `.env`

## 👤 User Management

### Create Admin User
1. Sign up at `/signup` or `/api/auth/signin`
2. Promote to admin:
```bash
pnpm promote-admin user@example.com
```

### Authentication Options
- **Credentials**: Email/password with bcrypt hashing
- **GitHub OAuth**: Social login integration
- **Session Management**: JWT-based sessions via NextAuth

## 🛒 Core Features

### Product Management (Admin)
- Create/edit products with multiple images
- Set inventory by size
- Category and pricing management
- Cloudinary image uploads with automatic optimization

### Shopping Experience
- Advanced product filtering (category, size, price)
- Persistent shopping cart
- Stripe Checkout integration
- Order tracking and history
- Wishlist functionality

### Payment Processing
- Secure Stripe integration
- Webhook handling for order fulfillment
- Automatic inventory updates
- Order status management

## 📁 Project Structure

```
├── app/
│   ├── (admin)/          # Admin-only pages
│   ├── (auth)/           # Authentication pages
│   ├── (store)/          # Public store pages
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/
│   ├── admin/            # Admin components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Database client
│   ├── cloudinary.ts     # Image upload utilities
│   └── utils.ts          # Shared utilities
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
├── scripts/
│   └── promote-admin.ts  # Admin promotion utility
└── types/                # TypeScript definitions
```

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `CLOUDINARY_*` variables

3. Deploy automatically on push to main branch

### Database Setup (Production)
- **Railway**: Easy PostgreSQL hosting
- **Render**: Free tier available
- **Supabase**: Includes auth and real-time features

### Post-Deployment
1. Run database migrations:
```bash
npx prisma migrate deploy
```

2. Configure Stripe webhook endpoint:
   - Add `https://your-domain.com/api/stripe/webhook` in Stripe dashboard
   - Update `STRIPE_WEBHOOK_SECRET` with production webhook secret

## 🔒 Security Features

- **Authentication**: Secure JWT sessions with NextAuth
- **Authorization**: Role-based access control (USER/ADMIN)
- **Input Validation**: Prisma schema validation
- **CSRF Protection**: Built-in Next.js CSRF protection
- **Environment Variables**: Secure credential management
- **Password Hashing**: bcrypt with salt rounds

## ⚡ Performance Optimizations

- **Image Optimization**: Next.js Image component + Cloudinary transformations
- **Server-Side Rendering**: Fast initial page loads
- **Database Optimization**: Efficient Prisma queries with includes
- **Caching**: Static generation where possible
- **Bundle Optimization**: Tree shaking and code splitting

## 🧪 Development Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm seed             # Seed database with sample data
pnpm promote-admin    # Promote user to admin role
pnpm lint             # Run ESLint
```

## 📝 API Routes

- `POST /api/auth/signup` - User registration
- `POST /api/cart` - Add items to cart
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks
- `POST /api/wishlist` - Manage wishlist items
- `POST /api/admin/products` - Create products (admin)
- `POST /api/admin/upload` - Upload images (admin)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

Built with ❤️ using Next.js, Tailwind CSS, and modern web technologies.
