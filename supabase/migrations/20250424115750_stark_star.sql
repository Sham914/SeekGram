/*
  # Create colleges and related tables

  1. New Tables
    - `colleges`
      - `id` (integer, primary key)
      - `name` (text, not null)
      - `created_at` (timestamp with timezone)
    
  2. Security
    - Enable RLS on all tables
    - Add policies for:
      - Admins can manage all data
      - Public can view college data
*/

-- Create colleges table
CREATE TABLE IF NOT EXISTS colleges (
  id integer PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can manage colleges"
  ON colleges
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins WHERE admins.id = auth.uid()
  ));

CREATE POLICY "Public can view colleges"
  ON colleges
  FOR SELECT
  TO anon
  USING (true);