-- Create auction status enum
CREATE TYPE auction_status AS ENUM ('draft', 'scheduled', 'active', 'ended', 'cancelled');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create auctions table
CREATE TABLE public.auctions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  starting_bid NUMERIC(10,2) NOT NULL CHECK (starting_bid > 0),
  current_bid NUMERIC(10,2) NOT NULL DEFAULT 0,
  reserve_price NUMERIC(10,2),
  buy_now_price NUMERIC(10,2),
  minimum_increment NUMERIC(10,2) NOT NULL DEFAULT 5.00,
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_time TIMESTAMPTZ NOT NULL,
  status auction_status NOT NULL DEFAULT 'draft',
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  winning_bidder_id UUID REFERENCES auth.users(id),
  viewers INTEGER NOT NULL DEFAULT 0,
  surge_multiplier NUMERIC(5,2) DEFAULT 1.0,
  ai_suggested_price NUMERIC(10,2),
  auto_extend_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT valid_end_time CHECK (end_time > start_time),
  CONSTRAINT valid_reserve CHECK (reserve_price IS NULL OR reserve_price >= starting_bid),
  CONSTRAINT valid_buy_now CHECK (buy_now_price IS NULL OR buy_now_price > starting_bid)
);

-- Create bids table
CREATE TABLE public.bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID NOT NULL REFERENCES public.auctions(id) ON DELETE CASCADE,
  bidder_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_auctions_status ON public.auctions(status);
CREATE INDEX idx_auctions_end_time ON public.auctions(end_time);
CREATE INDEX idx_auctions_created_by ON public.auctions(created_by);
CREATE INDEX idx_bids_auction_id ON public.bids(auction_id);
CREATE INDEX idx_bids_bidder_id ON public.bids(bidder_id);
CREATE INDEX idx_bids_created_at ON public.bids(auction_id, created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Auctions policies
CREATE POLICY "Auctions are viewable by everyone"
  ON public.auctions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create auctions"
  ON public.auctions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Auction creators can update their auctions"
  ON public.auctions FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Auction creators can delete their auctions"
  ON public.auctions FOR DELETE
  USING (auth.uid() = created_by);

-- Bids policies
CREATE POLICY "Bids are viewable by everyone"
  ON public.bids FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can place bids"
  ON public.bids FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = bidder_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', SPLIT_PART(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update auction current bid and winning bidder
CREATE OR REPLACE FUNCTION public.update_auction_on_bid()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update auction with new current bid and winning bidder
  UPDATE public.auctions
  SET 
    current_bid = NEW.amount,
    winning_bidder_id = NEW.bidder_id,
    updated_at = NOW(),
    -- Auto-extend if bid placed in last 2 minutes
    end_time = CASE 
      WHEN auto_extend_enabled = true 
        AND end_time - NOW() < INTERVAL '2 minutes'
        AND end_time - NOW() > INTERVAL '0 seconds'
      THEN end_time + INTERVAL '2 minutes'
      ELSE end_time
    END
  WHERE id = NEW.auction_id;
  
  RETURN NEW;
END;
$$;

-- Trigger to update auction when bid is placed
CREATE TRIGGER on_bid_placed
  AFTER INSERT ON public.bids
  FOR EACH ROW
  EXECUTE FUNCTION public.update_auction_on_bid();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Trigger for auctions updated_at
CREATE TRIGGER update_auctions_updated_at
  BEFORE UPDATE ON public.auctions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update auction status based on time
CREATE OR REPLACE FUNCTION public.update_auction_status()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Set auctions to active if start time has passed
  UPDATE public.auctions
  SET status = 'active'
  WHERE status = 'scheduled'
    AND start_time <= NOW();
  
  -- Set auctions to ended if end time has passed
  UPDATE public.auctions
  SET status = 'ended'
  WHERE status = 'active'
    AND end_time <= NOW();
END;
$$;

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.auctions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bids;