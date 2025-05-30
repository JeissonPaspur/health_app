import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://sqnunlwygcwragysniuj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbnVubHd5Z2N3cmFneXNuaXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjE5MjAsImV4cCI6MjA1OTEzNzkyMH0.3Kk7uk4fH1S4BNBz62_CcdkwgssmDyoXEcuhTzinUUM";


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);