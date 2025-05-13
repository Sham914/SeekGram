/*
  # Create admin and college management tables

  1. New Tables
    - `admins`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
    - `college_updates`
      - `id` (uuid, primary key)
      - `college_id` (integer, references colleges)
      - `field` (text)
      - `old_value` (jsonb)
      - `new_value` (jsonb)
      - `updated_by` (uuid, references admins)
      - `created_at` (timestamp)
    - `college_events`
      - `id` (uuid, primary key)
      - `college_id` (integer, references colleges)
      - `title` (text)
      - `description` (text)
      - `event_date` (timestamp)
      - `created_by` (uuid, references admins)
      - `created_at` (timestamp)
    - `keam_cutoffs`
      - `id` (uuid, primary key)
      - `college_id` (integer, references colleges)
      - `year` (integer)
      - `branch` (text)
      - `category` (text)
      - `rank` (integer)
      - `created_by` (uuid, references admins)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view own data"
  ON admins
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create college_updates table
CREATE TABLE IF NOT EXISTS college_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id integer NOT NULL,
  field text NOT NULL,
  old_value jsonb,
  new_value jsonb NOT NULL,
  updated_by uuid REFERENCES admins(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE college_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage college updates"
  ON college_updates
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));

-- Create college_events table
CREATE TABLE IF NOT EXISTS college_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id integer NOT NULL,
  title text NOT NULL,
  description text,
  event_date timestamptz NOT NULL,
  created_by uuid REFERENCES admins(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE college_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage events"
  ON college_events
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));

CREATE POLICY "Public can view events"
  ON college_events
  FOR SELECT
  TO anon
  USING (true);

-- Create keam_cutoffs table
CREATE TABLE IF NOT EXISTS keam_cutoffs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id integer NOT NULL,
  year integer NOT NULL,
  branch text NOT NULL,
  category text NOT NULL,
  rank integer NOT NULL,
  created_by uuid REFERENCES admins(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE keam_cutoffs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage cutoffs"
  ON keam_cutoffs
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));

CREATE POLICY "Public can view cutoffs"
  ON keam_cutoffs
  FOR SELECT
  TO anon
  USING (true);