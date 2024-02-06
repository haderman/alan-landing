import type { APIRoute } from 'astro';

import { supabase } from '../../lib/supabase';

export const POST:APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  try {
    await subscribeEmail(email);
  } catch (error) {
    console.error('error subscribing email');
  }

  return redirect('/thank-you');
}

// Function to subscribe an email
async function subscribeEmail(email) {
  const { data, error } = await supabase
    .from('email_subscriptions')
    .insert([
      { email: email },
    ]);
  if (error) throw error;
  return data;
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
