# 🎯 WheelOfWow - Lucky Draw System (Nuxt 3)

A modern, full-stack lucky draw application built with Nuxt 3, featuring authentication, subscription management, and multi-language support.

## 🚀 Tech Stack

- **Frontend Framework:** Nuxt 3 (Vue 3)
- **Styling:** Tailwind CSS
- **Icons:** Nuxt Icon (Iconify)
- **i18n:** @nuxtjs/i18n
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **Payment:** Stripe
- **Type Safety:** TypeScript
- **Utilities:** VueUse

## 📁 Project Structure

```
nuxt-app/
├── app/
│   └── app.vue                 # Root component
├── assets/
│   └── css/
│       └── tailwind.css        # Tailwind base styles
├── components/
│   ├── AppHeader.vue           # Main navigation ✅
│   ├── AppFooter.vue           # Footer component ✅
│   ├── LanguageSwitcher.vue    # Language selector ✅
│   ├── DashboardHeader.vue     # Dashboard navigation (TODO)
│   ├── DashboardSidebar.vue    # Dashboard sidebar (TODO)
│   └── draw/                   # Lucky draw components (TODO)
│       ├── LuckyWheel.vue
│       ├── PrizeSelector.vue
│       ├── ParticipantManager.vue
│       └── WinnersList.vue
├── composables/
│   ├── useSupabase.ts          # Supabase client ✅
│   ├── useAuth.ts              # Authentication logic ✅
│   ├── useSubscription.ts      # Subscription management (TODO)
│   └── useDraw.ts              # Draw logic (TODO)
├── layouts/
│   ├── default.vue             # Public pages layout ✅
│   ├── auth.vue                # Login/signup layout ✅
│   └── dashboard.vue           # Dashboard layout ✅
├── locales/
│   ├── en.json                 # English translations ✅
│   └── vi.json                 # Vietnamese translations ✅
├── middleware/
│   └── auth.ts                 # Route protection ✅
├── pages/
│   ├── index.vue               # Landing page ✅
│   ├── pricing.vue             # Pricing page (TODO)
│   ├── login.vue               # Login page (TODO)
│   ├── signup.vue              # Signup page (TODO)
│   └── dashboard/              # Protected pages (TODO)
│       ├── index.vue
│       ├── draw.vue
│       └── settings.vue
├── server/
│   └── api/                    # API routes (TODO)
│       ├── auth/
│       ├── stripe/
│       ├── users/
│       └── draw/
├── types/                      # TypeScript types (TODO)
├── .env.example                # Environment variables template ✅
├── nuxt.config.ts              # Nuxt configuration ✅
├── tailwind.config.ts          # Tailwind configuration ✅
└── package.json
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in your credentials:

```env
# App Configuration
APP_URL=http://localhost:3000

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
```

### 3. Setup Supabase

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key to `.env`

#### Run Database Migrations

See SQL schema in the **Database Schema** section below.

#### Configure Google OAuth

1. In Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials
4. Set redirect URL: `http://localhost:3000/auth/callback`

### 4. Setup Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from Dashboard → Developers → API keys
3. Create products and prices in Dashboard → Products
4. Setup webhook endpoint (for production)

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR(255) UNIQUE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_price_id VARCHAR(255),
  status VARCHAR(50),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Licenses table
CREATE TABLE licenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id),
  license_key VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Draw sessions table
CREATE TABLE draw_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  session_name VARCHAR(255),
  total_participants INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Winners table
CREATE TABLE winners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  draw_session_id UUID REFERENCES draw_sessions(id) ON DELETE CASCADE,
  participant_code VARCHAR(100),
  participant_name VARCHAR(255),
  prize_type VARCHAR(100),
  drawn_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE draw_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Users can only access their own data)
CREATE POLICY "Users view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users view own licenses" ON licenses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own draws" ON draw_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own winners" ON winners FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM draw_sessions WHERE id = draw_session_id)
);
```

## 📝 Development Tasks

### ✅ Completed
- [x] Initialize Nuxt 3 project
- [x] Setup Tailwind CSS
- [x] Configure i18n (English & Vietnamese)
- [x] Create layouts (default, auth, dashboard)
- [x] Build landing page
- [x] Setup Supabase integration
- [x] Create authentication composables
- [x] Add route protection middleware

### 🚧 TODO (High Priority)
- [ ] Create login page
- [ ] Create signup page  
- [ ] Migrate lucky draw wheel component from vanilla JS
- [ ] Create prize selector component
- [ ] Create participant manager component
- [ ] Create winners list component
- [ ] Build pricing page
- [ ] Implement Stripe Checkout integration

### 📅 TODO (Medium Priority)
- [ ] Create dashboard pages
- [ ] Add Stripe webhook handling
- [ ] Build subscription management UI
- [ ] Implement license validation
- [ ] Add draw session history
- [ ] Create settings page

### 💡 TODO (Nice to Have)
- [ ] Email notifications
- [ ] Export functionality (CSV, PDF)
- [ ] Analytics dashboard
- [ ] Admin panel
- [ ] Dark mode
- [ ] PWA support

## 🎨 Component Migration Guide

Your current vanilla JS code needs to be migrated to Vue components. Here's the approach:

### Current Structure
```
Old Project/
├── index.html          # → pages/dashboard/draw.vue
├── script.js           # → composables/useDraw.ts + components
├── styles.css          # → Tailwind CSS classes
├── translations.js     # → locales/*.json ✅
```

### Migration Steps

1. **Extract Lucky Draw Logic**
   ```typescript
   // composables/useDraw.ts
   export const useDraw = () => {
     const participants = ref([])
     const winners = ref([])
     const currentPrize = ref('third')
     const isSpinning = ref(false)
     
     const loadParticipants = (data: string) => {
       // Parse and load participants
     }
     
     const startDraw = async () => {
       isSpinning.value = true
       // Draw logic with animation
       await animateDraw()
       selectWinner()
       isSpinning.value = false
     }
     
     return { participants, winners, startDraw, loadParticipants }
   }
   ```

2. **Create Vue Components**
   ```vue
   <!-- components/draw/LuckyWheel.vue -->
   <template>
     <div class="lucky-wheel">
       <div v-for="box in numberBoxes" :key="box" class="number-box">
         {{ currentNumber }}
       </div>
     </div>
   </template>
   
   <script setup lang="ts">
   const { isSpinning, currentNumber } = useDraw()
   </script>
   ```

## 🔒 Authentication Flow

1. User clicks "Sign in with Google"
2. Redirected to Google OAuth
3. After approval → `/auth/callback`
4. Supabase creates session
5. Redirect to `/dashboard`

Protected routes (under `/dashboard`) require authentication via `auth` middleware.

## 💳 Stripe Integration

### Subscription Flow
1. User selects plan on `/pricing`
2. Create Stripe Checkout Session
3. User completes payment on Stripe
4. Webhook receives `checkout.session.completed`
5. Create subscription + license in database
6. User gets premium access

### Webhook Example
```typescript
// server/api/stripe/webhook.post.ts
export default defineEventHandler(async (event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const sig = getHeader(event, 'stripe-signature')!
  const body = await readRawBody(event)
  
  const stripeEvent = stripe.webhooks.constructEvent(
    body!,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
  
  if (stripeEvent.type === 'checkout.session.completed') {
    // Create subscription record
    // Generate license key
  }
  
  return { received: true }
})
```

## 🌍 Using i18n

```vue
<template>
  <h1>{{ $t('app.title') }}</h1>
  <p>{{ $t('app.description') }}</p>
</template>

<script setup>
const { t, locale } = useI18n()
const title = t('nav.home')
locale.value = 'vi' // Switch to Vietnamese
</script>
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
- Build command: `npm run build`
- Publish directory: `.output/public`

Don't forget to add environment variables in your hosting dashboard!

## 📚 Resources

- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🎯 Next Steps

1. ✅ Review this README
2. ⏳ Setup Supabase project & OAuth
3. ⏳ Create authentication pages
4. ⏳ Migrate lucky draw components
5. ⏳ Implement Stripe integration
6. ⏳ Test and deploy

For detailed architecture, see [ARCHITECTURE_RECOMMENDATION.md](../ARCHITECTURE_RECOMMENDATION.md)

---

**Built with ❤️ using Nuxt 3**


# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
