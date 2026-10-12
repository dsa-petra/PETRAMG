import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Credenciais do seu banco de dados
const supabaseUrl = 'https://mgzyrcnkmaepybaeznij.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nenlyY25rbWFlcHliYWV6bmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0NzIxMDQsImV4cCI6MjEwNzA0ODEwNH0.kAtmUAKSn53owxV8eNHfSOtkeQkjs5RkxVD54p_2Vlk'

// Cria e exporta a conexão para ser usada nos outros ficheiros
export const supabase = createClient(supabaseUrl, supabaseKey)