import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://khoducccnjaydpfanqpa.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtob2R1Y2NjbmpheWRwZmFucXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyMzU1NzUsImV4cCI6MjA0MjgxMTU3NX0.Y-OJvRybqV6YB89SORLBJU_yI2qhngYL0N2S2FnlBHc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;