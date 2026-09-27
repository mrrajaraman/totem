import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dmwltfsnabwjrzeqdqga.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtd2x0ZnNuYWJ3anJ6ZXFkcWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0Nzg1MDgsImV4cCI6MjEwNjA1NDUwOH0.up204AOIwrpNk8FcE0J8JBewWTOV73OY6QuNmhOKNSM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DbBooking {
  id?: string;
  booking_code: string;
  lead_guest_name: string;
  lead_guest_phone: string;
  lead_guest_email: string;
  squad_size: number;
  world_slug: string;
  world_title?: string;
  session_date: string;
  session_time: string;
  status?: 'pending_lock' | 'locked' | 'checked_in' | 'completed' | 'cancelled';
  slot_lock_deposit: number;
  total_game_fee: number;
  discount_amount?: number;
  is_weekday_offer_applied?: boolean;
  balance_due_at_venue: number;
  special_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DbCorporateInquiry {
  id?: string;
  company_name: string;
  contact_name: string;
  work_email: string;
  phone: string;
  team_size: string;
  hear_about?: string;
  status?: string;
  created_at?: string;
}

export interface DbFranchiseInquiry {
  id?: string;
  applicant_name: string;
  phone: string;
  email: string;
  target_city: string;
  space_available?: string;
  discovery_source?: string;
  message?: string;
  status?: string;
  created_at?: string;
}
