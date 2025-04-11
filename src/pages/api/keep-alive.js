import { supabase } from '../api/lib/supabase'; 

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('profiles')  // ✅ your existing table
      .select('id')
      .limit(1);

    if (error) {
      console.error('Supabase ping error:', error);
      return res.status(500).json({ error: 'Supabase ping failed' });
    }

    return res.status(200).json({ alive: true, data });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
