import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ntggwdmclhkaictxucrn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50Z2d3ZG1jbGhrYWljdHh1Y3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2MTgzNTksImV4cCI6MjAxODE5NDM1OX0.gLxJ5cEYo0BbeiajC62kfhL1UaybqAsQRvqnA0RFgzY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
