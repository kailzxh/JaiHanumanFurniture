// netlify/functions/keep-alive.js

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);


exports.handler = async function (event, context) {
  const { data, error } = await supabase.from('profiles').select('id').limit(1);

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Supabase ping failed' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ alive: true }),
  };
};
