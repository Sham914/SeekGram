/*
  # Add college reviews system

  1. New Tables
    - `college_reviews`
      - `id` (uuid, primary key)
      - `college_id` (integer, references colleges)
      - `user_id` (uuid, references auth.users)
      - `course` (text)
      - `review_text` (text)
      - `status` (text) - pending/approved/rejected
      - `created_at` (timestamp)
      - `approved_at` (timestamp)
      - `approved_by` (uuid, references admins)

  2. Security
    - Enable RLS
    - Add policies for:
      - Users can create reviews
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

-- Insert some sample reviews
INSERT INTO college_reviews (college_id, user_id, course, review_text, status, approved_at, approved_by)
VALUES 
(1, '00000000-0000-0000-0000-000000000001', 'Computer Science', 'Amazing experience at CET! The faculty is highly knowledgeable and supportive. The campus infrastructure is excellent, especially the new computer labs. I particularly enjoyed the technical festivals and coding competitions.', 'approved', now(), (SELECT id FROM admins LIMIT 1)),
(1, '00000000-0000-0000-0000-000000000002', 'Electronics Engineering', 'The electronics lab facilities are state-of-the-art. The professors are industry veterans who bring practical knowledge to the classroom. The placement cell did an excellent job with campus recruitment.', 'approved', now(), (SELECT id FROM admins LIMIT 1)),
(1, '00000000-0000-0000-0000-000000000003', 'Mechanical Engineering', 'Great learning environment with emphasis on both theoretical and practical knowledge. The workshops and industrial visits were very helpful. The alumni network is strong and supportive.', 'approved', now(), (SELECT id FROM admins LIMIT 1));