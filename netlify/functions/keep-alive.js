// netlify/functions/keep-alive.js

const { supabase } = require('../../src/lib/supabase'); // adjust path as needed

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
