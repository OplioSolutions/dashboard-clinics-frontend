import { config as loadEnv } from 'dotenv'

console.log('Before loading .env:')
console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY)

// Load default .env then override with .env.local if present
loadEnv()
console.log('\nAfter loading .env:')
console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY)

loadEnv({ path: '.env.local', override: true })
console.log('\nAfter loading .env.local:')
console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY)
