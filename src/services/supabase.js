import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://khoducccnjaydpfanqpa.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtob2R1Y2NjbmpheWRwZmFucXBhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzIzNTU3NSwiZXhwIjoyMDQyODExNTc1fQ._-JBuEeYRmmnzSV2fvXlTfqktbjUTzhM-9Ia9jXhxKo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;