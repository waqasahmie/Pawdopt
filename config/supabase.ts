import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzrkiwwkrdhsurcqjwrt.supabase.co';
const supabaseAnonKey  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cmtpd3drcmRoc3VyY3Fqd3J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MTg1MTAsImV4cCI6MjA2MTE5NDUxMH0.6zZVxA2rJvG1dPF7t9PJctQPgzHaKwWnM0Toh6-8hWw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey );
