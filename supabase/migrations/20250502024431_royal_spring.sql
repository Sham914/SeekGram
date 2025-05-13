/*
  # Update events schema and add prediction tables

  1. Changes to college_events table
    - Add new columns:
      - venue (text)
      - expected_participants (integer)
      - image (text)
    
  2. New Tables
    - keam_predictions
      - id (uuid)
      - year (integer)
      - phase (integer)
      - college_id (integer)
      - branch (text)
      - category (text)
      - opening_rank (integer)
      - closing_rank (integer)
      - created_by (uuid)
      - created_at (timestamp)

  3. Security
    - Enable RLS
    - Add policies for admin access and public viewing
*/

-- Update college_events table
ALTER TABLE college_events
ADD COLUMN venue text NOT NULL DEFAULT '',
ADD COLUMN expected_participants integer,
ADD COLUMN image text;

-- Create keam_predictions table
CREATE TABLE IF NOT EXISTS keam_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year integer NOT NULL,
  phase integer NOT NULL,
  college_id integer NOT NULL,
  branch text NOT NULL,
  category text NOT NULL,
  opening_rank integer NOT NULL,
  closing_rank integer NOT NULL,
  created_by uuid REFERENCES admins(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE keam_predictions ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Admins can manage predictions"
  ON keam_predictions
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

CREATE POLICY "Public can view predictions"
  ON keam_predictions
  FOR SELECT
  TO anon
  USING (true);

-- Add foreign key constraint
ALTER TABLE keam_predictions
ADD CONSTRAINT fk_keam_predictions_college
FOREIGN KEY (college_id) REFERENCES colleges(id);