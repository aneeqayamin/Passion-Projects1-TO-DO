import { createClient } from '@supabase/supabase-js'

// Replace these with your actual keys from the Supabase API Settings
const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient('https://aziybncsffpdpwrjlcgz.supabase.col', eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6aXlibmNzZmZwZHB3cmpsY2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5ODg1NDEsImV4cCI6MjA4NjU2NDU0MX0.axEIu32nxXIYWfkmdyVFpwYa5O4dGkTP9CT23F30rsU)