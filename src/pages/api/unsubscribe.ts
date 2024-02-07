import type { APIRoute } from 'astro';

import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  try {
    await unsubscribeEmail(email);
    console.log('Unsubscribed successfully!');
  } catch (error) {
    console.error('Error unsubscribing email: ', error);
  }

  return redirect('/goodbye');
}

// Function to unsubscribe an email
async function unsubscribeEmail(email) {
  const { data, error } = await supabase
    .from('email_subscriptions')
    .delete()
    .match({ email: email });
  if (error) throw error;
  return data;
}
