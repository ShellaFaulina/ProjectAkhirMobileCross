import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xounqyppnudeqfcrmqgo.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvdW5xeXBwbnVkZXFmY3JtcWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NzA1NDUsImV4cCI6MjA2MjM0NjU0NX0.P20yKfH_52duql8L3kOm_PtMTnaYSsV7qJdkntq4dWw'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
