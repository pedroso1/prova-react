import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://kfkttdjklxkhmjzwbnwj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtma3R0ZGprbHhraG1qendibndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTIwMzQsImV4cCI6MjA5Mzc4ODAzNH0.gUTKadhnuaAl3oRxHlWaW7mFal9fMvPzpSi0W8XTXFc"
export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
