/*
  # Update colleges table schema and seed initial data

  1. Changes
    - Add new columns to colleges table
    - Insert initial college data
    
  2. New Columns
    - location (text)
    - district (text) 
    - established (integer)
    - type (text)
    - accreditation (jsonb)
    - ranking (jsonb)
    - intake (jsonb)
    - cutoff (jsonb)
    - website (text)
    - image (text)
    - courses (text[])
    - facilities (text[])
    - placement (jsonb)
*/

-- Add new columns to colleges table
ALTER TABLE colleges 
ADD COLUMN location text,
ADD COLUMN district text,
ADD COLUMN established integer,
ADD COLUMN type text,
ADD COLUMN accreditation jsonb DEFAULT '{}'::jsonb,
ADD COLUMN ranking jsonb DEFAULT '{}'::jsonb,
ADD COLUMN intake jsonb DEFAULT '{}'::jsonb,
ADD COLUMN cutoff jsonb,
ADD COLUMN website text,
ADD COLUMN image text,
ADD COLUMN courses text[] DEFAULT '{}'::text[],
ADD COLUMN facilities text[] DEFAULT '{}'::text[],
ADD COLUMN placement jsonb;

-- Update existing records with default values
UPDATE colleges SET
location = '',
district = '',
established = 0,
type = '',
website = '',
image = '';

-- Make columns NOT NULL after setting defaults
ALTER TABLE colleges
ALTER COLUMN location SET NOT NULL,
ALTER COLUMN district SET NOT NULL,
ALTER COLUMN established SET NOT NULL,
ALTER COLUMN type SET NOT NULL,
ALTER COLUMN website SET NOT NULL,
ALTER COLUMN image SET NOT NULL;

-- Insert initial college data
INSERT INTO colleges (
  id, name, location, district, established, type,
  accreditation, ranking, intake, cutoff,
  website, image, courses, facilities, placement
) VALUES
(1, 'College of Engineering Trivandrum', 'Thiruvananthapuram', 'Thiruvananthapuram', 1939, 'Government',
  '{"nba": true, "naac": {"grade": "A", "score": 3.45}}'::jsonb,
  '{"kerala": 1, "nirf": 95}'::jsonb,
  '{"total": 840, "branches": {"Computer Science": 120, "Electronics": 120, "Electrical": 120, "Mechanical": 120, "Civil": 120}}'::jsonb,
  '{"general": 1500, "sc": 15000, "st": 20000, "obc": 5000}'::jsonb,
  'https://www.cet.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech', 'M.Tech', 'PhD'],
  ARRAY['Library', 'Sports Complex', 'Hostels', 'Research Labs'],
  '{"averagePackage": 8.5, "highestPackage": 45, "placementPercentage": 95}'::jsonb
),
(2, 'TKM College of Engineering', 'Kollam', 'Kollam', 1958, 'Government Aided',
  '{"nba": true, "naac": {"grade": "A", "score": 3.30}}'::jsonb,
  '{"kerala": 2, "nirf": 150}'::jsonb,
  '{"total": 780, "branches": {"Computer Science": 120, "Electronics": 120, "Electrical": 60, "Mechanical": 120, "Civil": 120}}'::jsonb,
  '{"general": 2000, "sc": 18000, "st": 22000, "obc": 6000}'::jsonb,
  'https://www.tkmce.ac.in',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech', 'M.Tech'],
  ARRAY['Library', 'Sports Ground', 'Hostels', 'Cafeteria'],
  '{"averagePackage": 7.2, "highestPackage": 40, "placementPercentage": 90}'::jsonb
),
(3, 'Government Engineering College Thrissur', 'Thrissur', 'Thrissur', 1957, 'Government',
  '{"nba": true, "naac": {"grade": "A", "score": 3.20}}'::jsonb,
  '{"kerala": 3}'::jsonb,
  '{"total": 420, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60, "Civil": 60}}'::jsonb,
  '{"general": 3000, "sc": 20000, "st": 25000, "obc": 8000}'::jsonb,
  'https://gectcr.ac.in',
  'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech', 'M.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 6.8, "highestPackage": 35, "placementPercentage": 85}'::jsonb
);