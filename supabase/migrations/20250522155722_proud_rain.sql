/*
  # Add college reviews system
  
  1. New Tables
    - `college_reviews`
      - `id` (uuid, primary key)
      - `college_id` (integer, references colleges)
      - `user_id` (uuid, references auth.users)
      - `course` (text)
      - `review_text` (text)
      - `status` (text: pending, approved, rejected)
      - `created_at` (timestamp)
      - `approved_at` (timestamp)
      - `approved_by` (uuid, references admins)
  
  2. Security
    - Enable RLS on college_reviews table
    - Add policies for:
      - Users can create their own reviews
      - Users can view their own reviews
      - Public can view approved reviews
      - Admins can manage all reviews
*/

CREATE TABLE IF NOT EXISTS college_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id integer REFERENCES colleges(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  course text NOT NULL,
  review_text text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  approved_at timestamptz,
  approved_by uuid REFERENCES admins(id),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Enable RLS
ALTER TABLE college_reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can create reviews"
  ON college_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own reviews"
  ON college_reviews
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view approved reviews"
  ON college_reviews
  FOR SELECT
  TO anon
  USING (status = 'approved');

CREATE POLICY "Admins can manage reviews"
  ON college_reviews
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins WHERE admins.id = auth.uid()
  ));