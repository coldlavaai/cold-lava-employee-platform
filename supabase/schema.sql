-- Cold Lava AI Employee Platform Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (company admins/members)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Employees table
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar TEXT DEFAULT '🤖',
  role TEXT NOT NULL,
  category TEXT DEFAULT 'custom' CHECK (category IN ('sales', 'ops', 'support', 'content', 'custom')),
  personality TEXT,
  instructions TEXT,
  clawdbot_session TEXT,
  status TEXT DEFAULT 'offline' CHECK (status IN ('online', 'offline', 'busy')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage tracking
CREATE TABLE usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  message_count INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  UNIQUE(employee_id, date)
);

-- Employee links (for inter-employee communication)
CREATE TABLE employee_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  to_employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  link_type TEXT DEFAULT 'notify' CHECK (link_type IN ('notify', 'delegate', 'collaborate')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_employee_id, to_employee_id)
);

-- Indexes for performance
CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_employees_company ON employees(company_id);
CREATE INDEX idx_messages_employee ON messages(employee_id);
CREATE INDEX idx_messages_created ON messages(created_at);
CREATE INDEX idx_usage_employee_date ON usage(employee_id, date);

-- Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only see their company's data)
-- Note: These will need auth.uid() once Supabase Auth is configured

-- For now, allow all (will tighten with auth)
CREATE POLICY "Allow all for companies" ON companies FOR ALL USING (true);
CREATE POLICY "Allow all for users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all for employees" ON employees FOR ALL USING (true);
CREATE POLICY "Allow all for messages" ON messages FOR ALL USING (true);
CREATE POLICY "Allow all for usage" ON usage FOR ALL USING (true);
CREATE POLICY "Allow all for employee_links" ON employee_links FOR ALL USING (true);
