import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rkvdjbmmkyurwadnsoou.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrdmRqYm1ta3l1cndhZG5zb291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMTg3NDgsImV4cCI6MjA5MDc5NDc0OH0.iucpHP1h28nZlCFq1EF8S0Jc1cz83vG_bxG1EJpZOzQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
