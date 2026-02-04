# 🏗️ TƯ VẤN KIẾN TRÚC HỆ THỐNG LUCKY DRAW

**Dự án:** WheelOfWow - Lucky Draw System  
**Ngày:** 4 tháng 2, 2026  
**Người tư vấn:** GitHub Copilot

---

## 📋 MỤC LỤC

1. [Tổng quan hiện trạng](#tổng-quan-hiện-trạng)
2. [Yêu cầu tương lai](#yêu-cầu-tương-lai)
3. [Phân tích và đề xuất](#phân-tích-và-đề-xuất)
4. [Kiến trúc được khuyến nghị](#kiến-trúc-được-khuyến-nghị)
5. [Tech Stack chi tiết](#tech-stack-chi-tiết)
6. [Roadmap triển khai](#roadmap-triển-khai)
7. [Cấu trúc thư mục đề xuất](#cấu-trúc-thư-mục-đề-xuất)
8. [Chi phí ước tính](#chi-phí-ước-tính)
9. [Security Best Practices](#security-best-practices)
10. [Kết luận](#kết-luận)

---

## 📊 TỔNG QUAN HIỆN TRẠNG

### Công nghệ hiện tại
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Hosting:** GitHub Pages (static website)
- **SEO:** Đã có meta tags cơ bản, Open Graph, Twitter Card
- **Đa ngôn ngữ:** Có hỗ trợ (translations.js)
- **Chức năng chính:**
  - Quay số trúng thưởng
  - Quản lý danh sách tham gia
  - Hiển thị người trúng thưởng
  - Nhiều loại giải thưởng

### Điểm mạnh
✅ Website hoạt động tốt  
✅ SEO cơ bản đã được implement  
✅ Có đa ngôn ngữ (Việt/Anh)  
✅ UI/UX đơn giản, dễ sử dụng  
✅ Chi phí hosting = $0  

### Hạn chế
❌ Không có backend  
❌ Không có authentication  
❌ Không có database  
❌ Không thể quản lý users  
❌ Không hỗ trợ payment  
❌ Không có license management  

---

## 🎯 YÊU CẦU TƯƠNG LAI

### Must-have
1. **SEO chuẩn** (đã có, cần duy trì)
2. **Multi-language** (đã có, cần enhance)
3. **Google Authentication**
4. **Subscription Payment System**
5. **License Management** (monthly subscription)

### Nice-to-have
- User dashboard
- Usage analytics
- Email notifications
- Admin panel
- API for integrations

---

## 🔍 PHÂN TÍCH VÀ ĐỀ XUẤT

### Câu hỏi: Có cần Framework không?

**🟢 CÓ - VÌ:**

1. **Authentication phức tạp**
   - Google OAuth cần backend secure
   - JWT token management
   - Session handling
   - Refresh token rotation

2. **Payment Processing**
   - Stripe/PayPal yêu cầu webhook verification
   - PCI compliance
   - Secure customer data
   - Recurring subscription management

3. **Security Requirements**
   - XSS protection
   - CSRF tokens
   - SQL injection prevention
   - Rate limiting
   - Input sanitization

4. **Scalability**
   - Server-side rendering cho SEO
   - Code splitting
   - Caching strategies
   - Database optimization

5. **Developer Experience**
   - TypeScript support
   - Hot reload
   - Built-in routing
   - API routes
   - Testing framework

**🔴 KHÔNG CẦN nếu:**
- Chỉ là landing page tĩnh
- Không có user data
- Không có payment
- Không cần authentication

**➡️ KẾT LUẬN: CẦN FRAMEWORK**

---

## 🏗️ KIẾN TRÚC ĐƯỢC KHUYẾN NGHỊ

### Option 1: HYBRID APPROACH (Khuyến nghị cho giai đoạn đầu)

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND LAYER                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Next.js 14+ (App Router)                 │  │
│  │  - Server-Side Rendering (SEO)                   │  │
│  │  - Static Site Generation                        │  │
│  │  - Client Components (Interactive UI)            │  │
│  │  - Built-in i18n                                 │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   API LAYER                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Next.js API Routes                       │  │
│  │  - /api/auth/[...nextauth]                       │  │
│  │  - /api/stripe/webhooks                          │  │
│  │  - /api/users/*                                  │  │
│  │  - /api/draw/*                                   │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                 SERVICES LAYER                          │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ NextAuth.js │  │   Stripe     │  │   Supabase   │  │
│  │  (OAuth)    │  │  (Payment)   │  │  (Database)  │  │
│  └─────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  DATA LAYER                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │         PostgreSQL (Supabase)                    │  │
│  │  - users                                         │  │
│  │  - subscriptions                                 │  │
│  │  - draw_sessions                                 │  │
│  │  - winners                                       │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Option 2: MICROSERVICES (Cho tương lai dài hạn)

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Frontend   │    │  Auth API    │    │ Payment API  │
│   Next.js    │───▶│  (Node.js)   │    │  (Node.js)   │
│              │    │  + Redis     │    │  + Stripe    │
└──────────────┘    └──────────────┘    └──────────────┘
       │                   │                    │
       │                   └────────┬───────────┘
       │                            │
       ▼                            ▼
┌──────────────────────────────────────────────────────┐
│              API Gateway (Kong/AWS API Gateway)       │
└──────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────┐
│                  Database Cluster                     │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  PostgreSQL  │  │    Redis     │  │  MongoDB   │ │
│  │   (Primary)  │  │   (Cache)    │  │  (Logs)    │ │
│  └──────────────┘  └──────────────┘  └────────────┘ │
└──────────────────────────────────────────────────────┘
```

**➡️ KHUYẾN NGHỊ: Bắt đầu với Option 1, scale lên Option 2 khi cần**

---

## 🛠️ TECH STACK CHI TIẾT

### Frontend Framework Comparison

| Framework | Ưu điểm | Nhược điểm | SEO | Phù hợp |
|-----------|---------|------------|-----|---------|
| **Next.js 14** | - SSR/SSG tốt nhất<br>- React ecosystem lớn<br>- Vercel support<br>- App Router mạnh | - Bundle size lớn<br>- Learning curve | ⭐⭐⭐⭐⭐ | ✅ **KHUYẾN NGHỊ** |
| **Nuxt 3** | - Vue dễ học<br>- SSR built-in<br>- Module ecosystem | - Community nhỏ hơn<br>- TypeScript OK | ⭐⭐⭐⭐⭐ | ✅ Nếu thích Vue |
| **SvelteKit** | - Nhẹ nhất<br>- Performance tốt<br>- Syntax đơn giản | - Ecosystem nhỏ<br>- Jobs ít | ⭐⭐⭐⭐⭐ | 🟡 Nếu ưu tiên perf |
| **Astro** | - Ultra-fast<br>- Island architecture<br>- Component agnostic | - Dynamic khó hơn<br>- Còn mới | ⭐⭐⭐⭐⭐ | 🟡 Content-heavy |

### Recommended Stack

```yaml
Frontend:
  framework: Next.js 14.2+
  language: TypeScript
  ui_library: Tailwind CSS + shadcn/ui
  state_management: Zustand / React Context
  form: React Hook Form + Zod

Authentication:
  library: NextAuth.js v5 (Auth.js)
  providers:
    - Google OAuth 2.0
    - Email/Password (future)
  session: JWT + Database

Payment:
  gateway: Stripe
  features:
    - Checkout Sessions
    - Customer Portal
    - Webhooks
    - Subscription Management
  pricing_model: Monthly/Yearly recurring

Database:
  primary: Supabase (PostgreSQL)
  features:
    - Row Level Security (RLS)
    - Real-time subscriptions
    - Built-in Auth
    - Auto-generated API
  alternative: PlanetScale / Neon

Hosting:
  platform: Vercel
  features:
    - Zero-config Next.js
    - Edge Functions
    - Analytics
    - Preview deployments
  alternative: Netlify / Railway

Monitoring:
  error_tracking: Sentry
  analytics: Vercel Analytics / Google Analytics 4
  logging: Axiom / LogFlare

Email:
  service: Resend / SendGrid
  use_cases:
    - Welcome emails
    - Payment receipts
    - Subscription reminders
```

---

## 🗓️ ROADMAP TRIỂN KHAI

### Phase 1: Preparation (1-2 tuần) ⏱️

**Week 1:**
- [ ] Setup Next.js project with TypeScript
- [ ] Migrate current HTML/CSS/JS to React components
- [ ] Setup Tailwind CSS + shadcn/ui
- [ ] Configure i18n (next-intl)
- [ ] Test SEO with next/seo

**Week 2:**
- [ ] Create Supabase project
- [ ] Design database schema
- [ ] Setup Google OAuth credentials
- [ ] Create Stripe account
- [ ] Setup development environment

**Deliverables:**
- ✅ Working Next.js app (same features as current)
- ✅ Environment variables configured
- ✅ Database schema defined

---

### Phase 2: Authentication (1-2 tuần) 🔐

**Week 3:**
- [ ] Install and configure NextAuth.js
- [ ] Setup Google OAuth provider
- [ ] Create login/signup pages
- [ ] Implement session management
- [ ] Add protected routes middleware

**Week 4:**
- [ ] Create user profile page
- [ ] Add user settings
- [ ] Implement logout functionality
- [ ] Test auth flow (happy path + edge cases)
- [ ] Add loading states and error handling

**Deliverables:**
- ✅ Users can sign in with Google
- ✅ Session persisted across pages
- ✅ Protected routes working

---

### Phase 3: Payment Integration (2-3 tuần) 💳

**Week 5-6:**
- [ ] Setup Stripe products and pricing
- [ ] Create pricing page
- [ ] Implement Stripe Checkout
- [ ] Setup webhook endpoint
- [ ] Handle subscription events (created, updated, cancelled)

**Week 7:**
- [ ] Create subscription management page
- [ ] Implement Customer Portal integration
- [ ] Add subscription status checks
- [ ] Test payment flow (sandbox)
- [ ] Handle failed payments

**Deliverables:**
- ✅ Users can subscribe monthly
- ✅ Webhooks processing correctly
- ✅ Subscription status reflected in UI

---

### Phase 4: License Management (1-2 tuần) 🎫

**Week 8:**
- [ ] Create license table in database
- [ ] Generate license keys
- [ ] Link licenses to subscriptions
- [ ] Implement license validation middleware
- [ ] Add license expiration logic

**Week 9:**
- [ ] Create user dashboard
- [ ] Show license status and expiry
- [ ] Add upgrade/downgrade flows
- [ ] Implement grace period for expired licenses
- [ ] Email notifications for expiry

**Deliverables:**
- ✅ License generated on subscription
- ✅ License checked before draw feature
- ✅ Email reminders working

---

### Phase 5: Testing & Optimization (1 tuần) 🧪

**Week 10:**
- [ ] Write unit tests (Jest + React Testing Library)
- [ ] Write E2E tests (Playwright)
- [ ] Test payment flows thoroughly
- [ ] Security audit (OWASP Top 10)
- [ ] Performance optimization (Lighthouse)

**Deliverables:**
- ✅ Test coverage > 70%
- ✅ Lighthouse score > 90
- ✅ Security vulnerabilities fixed

---

### Phase 6: Launch (1 tuần) 🚀

**Week 11:**
- [ ] Setup production environment
- [ ] Configure domain and SSL
- [ ] Setup monitoring (Sentry)
- [ ] Create documentation
- [ ] Soft launch (beta users)

**Week 12:**
- [ ] Collect feedback
- [ ] Fix critical bugs
- [ ] Public launch
- [ ] Marketing materials
- [ ] Monitor performance

**Deliverables:**
- ✅ Live production site
- ✅ Payment processing real money
- ✅ Users onboarding successfully

---

## 📁 CẤU TRÚC THƯ MỤC ĐỀ XUẤT

```
wheelofwow/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── app/                          # Next.js 14 App Router
│   ├── (marketing)/              # Public pages (no auth)
│   │   ├── page.tsx              # Landing page
│   │   ├── about/
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   ├── features/
│   │   └── layout.tsx
│   │
│   ├── (auth)/                   # Auth pages
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/              # Protected pages
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── draw/                 # Main lucky draw app
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   ├── profile/
│   │   │   ├── subscription/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── stripe/
│   │   │   ├── checkout/
│   │   │   │   └── route.ts
│   │   │   ├── webhook/
│   │   │   │   └── route.ts
│   │   │   └── portal/
│   │   │       └── route.ts
│   │   ├── users/
│   │   │   ├── me/
│   │   │   │   └── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── draw/
│   │   │   ├── start/
│   │   │   ├── winners/
│   │   │   └── history/
│   │   └── license/
│   │       ├── validate/
│   │       └── status/
│   │
│   ├── [locale]/                 # i18n routes
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── layout.tsx                # Root layout
│   ├── globals.css
│   └── error.tsx
│
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ...
│   │
│   ├── auth/
│   │   ├── login-form.tsx
│   │   ├── signup-form.tsx
│   │   └── social-login.tsx
│   │
│   ├── draw/
│   │   ├── wheel.tsx             # Main lucky draw wheel
│   │   ├── prize-selector.tsx
│   │   ├── participant-manager.tsx
│   │   ├── winners-list.tsx
│   │   └── draw-settings.tsx
│   │
│   ├── dashboard/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── stats-card.tsx
│   │
│   ├── pricing/
│   │   ├── pricing-card.tsx
│   │   ├── pricing-table.tsx
│   │   └── feature-list.tsx
│   │
│   └── shared/
│       ├── navbar.tsx
│       ├── footer.tsx
│       ├── language-switcher.tsx
│       └── theme-toggle.tsx
│
├── lib/
│   ├── auth.ts                   # NextAuth config
│   ├── stripe.ts                 # Stripe client
│   ├── supabase.ts               # Supabase client
│   ├── db.ts                     # Database helpers
│   ├── utils.ts                  # Utility functions
│   ├── validations.ts            # Zod schemas
│   └── constants.ts
│
├── hooks/
│   ├── use-user.ts
│   ├── use-subscription.ts
│   ├── use-license.ts
│   └── use-draw.ts
│
├── types/
│   ├── auth.ts
│   ├── subscription.ts
│   ├── draw.ts
│   └── database.ts
│
├── store/                        # Zustand stores
│   ├── draw-store.ts
│   └── user-store.ts
│
├── messages/                     # i18n translations
│   ├── vi.json
│   └── en.json
│
├── public/
│   ├── images/
│   ├── icons/
│   ├── favicon.ico
│   └── robots.txt
│
├── prisma/                       # If using Prisma
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── supabase/                     # If using Supabase
│   ├── migrations/
│   └── seed.sql
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.local
├── .env.example
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 💰 CHI PHÍ ƯỚC TÍNH

### Development Phase (One-time)

| Item | Cost (USD) | Note |
|------|------------|------|
| Development (3 months) | $0 | Self-development |
| UI/UX Design | $0-500 | Template / DIY |
| Testing & QA | $0-300 | Self-testing |
| **Total Development** | **$0-800** | |

### Monthly Operating Costs

#### Tier 1: Free / Hobby (0-1000 users)

| Service | Plan | Cost | Limit |
|---------|------|------|-------|
| Vercel | Hobby | $0 | 100GB bandwidth |
| Supabase | Free | $0 | 500MB database, 2GB bandwidth |
| Stripe | Pay-as-you-go | 2.9% + $0.30 | Per transaction |
| Domain | .com | $12/year | - |
| Email (Resend) | Free | $0 | 100 emails/day |
| Monitoring (Sentry) | Developer | $0 | 5K errors/month |
| **Total** | | **~$1-5/month** | |

#### Tier 2: Growth (1K-10K users)

| Service | Plan | Cost | Note |
|---------|------|------|------|
| Vercel | Pro | $20 | Unlimited bandwidth |
| Supabase | Pro | $25 | 8GB database, 50GB bandwidth |
| Stripe | Standard | 2.9% + $0.30 | Per transaction |
| Domain | .com | $12/year | - |
| Email (Resend) | Starter | $20 | 50K emails/month |
| Monitoring (Sentry) | Team | $26 | 50K errors/month |
| Analytics | Optional | $0-10 | Vercel included |
| **Total** | | **~$90-120/month** | |

#### Tier 3: Scale (10K-100K users)

| Service | Plan | Cost | Note |
|---------|------|------|------|
| Vercel | Enterprise | Custom | Contact sales |
| Supabase | Team/Enterprise | $599-2500 | Dedicated resources |
| Stripe | Standard | 2.9% + $0.30 | Volume discount available |
| Domain | .com | $12/year | - |
| Email (Resend) | Pro | $80 | 500K emails/month |
| Monitoring (Sentry) | Business | $80 | Unlimited errors |
| CDN (Cloudflare) | Pro | $20 | Better performance |
| **Total** | | **~$800-3000/month** | |

### Revenue Projection Example

```
Pricing: $10/month per user

Month 1-3:   50 users  = $500/month  - $90 cost  = $410 profit
Month 4-6:   200 users = $2000/month - $90 cost  = $1910 profit
Month 7-12:  500 users = $5000/month - $120 cost = $4880 profit
Year 2:      2000 users = $20K/month - $800 cost = $19.2K profit
```

### Stripe Transaction Fees

```
$10 subscription:
- Stripe fee: $0.59 (5.9%)
- Your revenue: $9.41

$20 subscription:
- Stripe fee: $0.88 (4.4%)
- Your revenue: $19.12

$100 subscription:
- Stripe fee: $3.20 (3.2%)
- Your revenue: $96.80
```

---

## 🔒 SECURITY BEST PRACTICES

### Authentication

```typescript
// lib/auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          userId: user.id,
          accessToken: account.access_token,
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.userId
      return session
    },
  },
})
```

### Protected API Routes

```typescript
// app/api/draw/start/route.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { checkLicense } from "@/lib/license"

export async function POST(request: Request) {
  // 1. Check authentication
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  // 2. Check license
  const hasValidLicense = await checkLicense(session.user.id)
  if (!hasValidLicense) {
    return NextResponse.json(
      { error: "No active subscription" },
      { status: 403 }
    )
  }

  // 3. Rate limiting
  const rateLimit = await checkRateLimit(session.user.id)
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    )
  }

  // 4. Validate input
  const body = await request.json()
  const validated = drawSchema.safeParse(body)
  if (!validated.success) {
    return NextResponse.json(
      { error: "Invalid input", details: validated.error },
      { status: 400 }
    )
  }

  // 5. Process request
  // ... your logic here
}
```

### Middleware Protection

```typescript
// middleware.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default async function middleware(request: NextRequest) {
  const session = await auth()
  const isAuthPage = request.nextUrl.pathname.startsWith("/login")
  const isProtectedPage = request.nextUrl.pathname.startsWith("/dashboard")

  // Redirect to login if accessing protected page without auth
  if (isProtectedPage && !session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect to dashboard if accessing auth page while logged in
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
```

### Environment Variables Security

```bash
# .env.example
# Public (can be exposed to browser)
NEXT_PUBLIC_APP_URL=https://wheelofwow.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Private (server-only)
DATABASE_URL=postgresql://...
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_SECRET=... # Generate with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
```

### Stripe Webhook Verification

```typescript
// app/api/stripe/webhook/route.ts
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import type Stripe from "stripe"

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get("Stripe-Signature")!

  let event: Stripe.Event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return new Response("Webhook Error", { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutComplete(event.data.object)
      break
    case "customer.subscription.updated":
      await handleSubscriptionUpdate(event.data.object)
      break
    case "customer.subscription.deleted":
      await handleSubscriptionCancel(event.data.object)
      break
  }

  return new Response(JSON.stringify({ received: true }))
}
```

### SQL Injection Prevention (Supabase)

```typescript
// ✅ GOOD - Using parameterized queries
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId) // Automatically escaped

// ✅ GOOD - Using Row Level Security (RLS)
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own data
CREATE POLICY users_select_policy ON users
  FOR SELECT
  USING (auth.uid() = id);

// ❌ BAD - Never do this
const query = `SELECT * FROM users WHERE id = '${userId}'` // SQL injection risk!
```

### XSS Prevention

```typescript
// ✅ GOOD - React automatically escapes
function WinnerDisplay({ name }: { name: string }) {
  return <div>{name}</div> // Escaped by React
}

// ✅ GOOD - Using DOMPurify for HTML content
import DOMPurify from "isomorphic-dompurify"

function RichContent({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: clean }} />
}

// ❌ BAD - Never do this
function UnsafeContent({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} /> // XSS risk!
}
```

---

## 📊 DATABASE SCHEMA

### Supabase Schema

```sql
-- Users table (managed by NextAuth/Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  image TEXT,
  email_verified TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR(255) UNIQUE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_price_id VARCHAR(255),
  status VARCHAR(50), -- active, canceled, past_due, etc.
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Licenses table
CREATE TABLE licenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id),
  license_key VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'active', -- active, expired, suspended
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Draw sessions table
CREATE TABLE draw_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
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

-- Indexes
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX idx_licenses_user_id ON licenses(user_id);
CREATE INDEX idx_winners_session_id ON winners(draw_session_id);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE draw_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;

-- Users can only read their own data
CREATE POLICY users_select_own ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY subscriptions_select_own ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY licenses_select_own ON licenses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY draw_sessions_all_own ON draw_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY winners_all_own ON winners
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM draw_sessions WHERE id = draw_session_id
    )
  );
```

---

## 🎨 UI/UX IMPROVEMENTS

### Pricing Page Design

```typescript
// app/(marketing)/pricing/page.tsx
const pricingPlans = [
  {
    name: "Free",
    price: 0,
    features: [
      "5 draws per month",
      "Up to 50 participants",
      "Basic prizes",
      "Email support",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: 10,
    features: [
      "Unlimited draws",
      "Unlimited participants",
      "All prize types",
      "Priority support",
      "Export results",
      "Custom branding",
    ],
    cta: "Subscribe Now",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Everything in Pro",
      "API access",
      "White-label solution",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
  },
]
```

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR                                                  │
│  [Logo] [Dashboard] [Draw] [History]     [Profile] [⚙️] │
└─────────────────────────────────────────────────────────┘
│
├─ SIDEBAR (Desktop) ─────┬─ MAIN CONTENT ────────────────┤
│                          │                               │
│  📊 Dashboard            │  ┌─────────────────────────┐ │
│  🎯 Lucky Draw           │  │   Your Subscription     │ │
│  📜 History              │  │   Plan: Pro Monthly     │ │
│  ⚙️  Settings            │  │   Status: Active        │ │
│  💳 Subscription         │  │   Expires: Mar 4, 2026  │ │
│                          │  └─────────────────────────┘ │
│                          │                               │
│                          │  ┌─────────────────────────┐ │
│                          │  │   Quick Stats           │ │
│                          │  │   Total Draws: 45       │ │
│                          │  │   Winners: 120          │ │
│                          │  │   This Month: 12        │ │
│                          │  └─────────────────────────┘ │
│                          │                               │
│                          │  [Start New Draw →]          │
└──────────────────────────┴───────────────────────────────┘
```

---

## 🚀 DEPLOYMENT GUIDE

### Step 1: Setup Vercel Project

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Step 2: Configure Environment Variables

```bash
# In Vercel Dashboard > Settings > Environment Variables

# Database
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...

# Auth
NEXTAUTH_URL=https://wheelofwow.com
NEXTAUTH_SECRET=... # Generate with: openssl rand -base64 32
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Email
RESEND_API_KEY=re_...
```

### Step 3: Setup Custom Domain

```bash
# In Vercel Dashboard > Settings > Domains
# Add: wheelofwow.com

# Update DNS records:
# A record: @ → 76.76.21.21
# CNAME: www → cname.vercel-dns.com
```

### Step 4: Setup Stripe Webhook

```bash
# Stripe Dashboard > Developers > Webhooks
# Add endpoint: https://wheelofwow.com/api/stripe/webhook

# Events to listen:
# - checkout.session.completed
# - customer.subscription.created
# - customer.subscription.updated
# - customer.subscription.deleted
# - invoice.payment_succeeded
# - invoice.payment_failed
```

---

## 📈 MONITORING & ANALYTICS

### Setup Sentry

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

### Setup Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## ✅ KẾT LUẬN

### Tóm tắt khuyến nghị

**🎯 FRAMEWORK:** Next.js 14 với App Router  
**🔐 AUTH:** NextAuth.js với Google OAuth  
**💳 PAYMENT:** Stripe Checkout + Webhooks  
**💾 DATABASE:** Supabase (PostgreSQL)  
**🚀 HOSTING:** Vercel  
**💰 CHI PHÍ:** $0-120/month (phụ thuộc users)

### Timeline tổng quan
- **Phase 1-2:** 4 tuần (Setup + Auth)
- **Phase 3-4:** 4 tuần (Payment + License)
- **Phase 5-6:** 2 tuần (Testing + Launch)
- **TOTAL:** ~10-12 tuần (2.5-3 tháng)

### Next Steps
1. ✅ Review tài liệu này
2. ✅ Quyết định framework (khuyến nghị Next.js)
3. ✅ Tạo accounts (Supabase, Stripe, Vercel)
4. ✅ Bắt đầu Phase 1: Migration

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Guide](https://authjs.dev)
- [Stripe Integration](https://stripe.com/docs/payments/checkout)
- [Supabase Quickstart](https://supabase.com/docs/guides/getting-started)
- [Vercel Deployment](https://vercel.com/docs)

---

**📞 Support:**  
Nếu cần hỗ trợ thêm trong quá trình implementation, hãy cho tôi biết!

**📝 Document Version:** 1.0  
**📅 Last Updated:** February 4, 2026  
**✍️ Author:** GitHub Copilot
