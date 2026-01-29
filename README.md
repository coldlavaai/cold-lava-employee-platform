# Cold Lava AI Employee Platform

A self-serve portal where businesses can create, manage, and connect AI employees.

## Features

- 🔐 **Authentication** - Signup/login with company workspaces
- 👥 **Employee Management** - Create AI employees with custom roles
- 🔗 **Employee Linking** - Connect employees to work together
- 💬 **Chat Interface** - Converse with your AI team
- 📊 **Analytics** - Track performance and productivity
- ⚙️ **Settings** - Manage company profile and team

## Tech Stack

- **Frontend**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (Postgres)
- **AI Backend**: Clawdbot sessions

## Getting Started

1. Clone the repo:
```bash
git clone git@github.com:coldlavaai/cold-lava-employee-platform.git
cd cold-lava-employee-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Database Setup

Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── login/             # Login page
│   ├── signup/            # Signup wizard
│   ├── employees/         # Employee list & create
│   ├── messages/          # Chat interface
│   ├── analytics/         # Performance charts
│   └── settings/          # Company settings
├── components/            # Reusable components
│   ├── Sidebar.tsx
│   ├── EmployeeCard.tsx
│   └── ...
└── lib/                   # Utilities
    ├── supabase.ts        # Supabase client
    └── auth-context.tsx   # Auth provider
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
CLAWDBOT_GATEWAY_URL=your-clawdbot-url
CLAWDBOT_GATEWAY_TOKEN=your-gateway-token
```

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Set up wildcard subdomain: `*.coldlava.ai`

## License

Proprietary - Cold Lava © 2024
