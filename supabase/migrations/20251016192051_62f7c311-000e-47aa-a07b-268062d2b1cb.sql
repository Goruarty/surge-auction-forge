-- Drop the incorrect foreign key that points to auth.users
ALTER TABLE public.bids
DROP CONSTRAINT IF EXISTS bids_bidder_id_fkey;

-- Add the correct foreign key that points to public.profiles
ALTER TABLE public.bids
ADD CONSTRAINT bids_bidder_id_fkey 
FOREIGN KEY (bidder_id) REFERENCES public.profiles(id) ON DELETE CASCADE;