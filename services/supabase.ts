
import { createClient } from '@supabase/supabase-js';
import { ChatMessage } from '../types';

const supabaseUrl = 'https://taxbbfzqnvgmrdhgfkmn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRheGJiZnpxbnZnbXJkaGdma21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNDQ1NTIsImV4cCI6MjA1ODkyMDU1Mn0.csaq7i-e5quffJbrkWtHtQj0sKNOl8mfIl9xIdQS5MM';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided.');
}

export const supabase = createClient<any>(supabaseUrl, supabaseAnonKey);

export const parseChatMessage = (data: any): ChatMessage => {
  return {
    id: data.id,
    session_id: data.session_id,
    message: data.message,
    created_at: data.created_at,
    correo_enviado: data.correo_enviado,
  };
};
