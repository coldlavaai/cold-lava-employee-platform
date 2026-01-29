import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (will be auto-generated later)
export interface Company {
  id: string;
  name: string;
  subdomain: string;
  logo_url?: string;
  created_at: string;
}

export interface User {
  id: string;
  company_id: string;
  email: string;
  name?: string;
  role: 'admin' | 'member';
  created_at: string;
}

export interface Employee {
  id: string;
  company_id: string;
  name: string;
  avatar: string;
  role: string;
  category: 'sales' | 'ops' | 'support' | 'content' | 'custom';
  personality?: string;
  clawdbot_session?: string;
  status: 'online' | 'offline' | 'busy';
  created_at: string;
}

export interface Message {
  id: string;
  employee_id: string;
  user_id: string;
  content: string;
  direction: 'inbound' | 'outbound';
  created_at: string;
}

export interface Usage {
  id: string;
  employee_id: string;
  date: string;
  message_count: number;
  tasks_completed: number;
}
