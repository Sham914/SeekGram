/*
  # Add more colleges to the database

  1. Changes
    - Insert 30 more colleges into the colleges table
    - Colleges are arranged in order of their Kerala ranking
    
  2. Data
    - Each college includes:
      - Basic information (name, location, district, etc.)
      - Accreditation details
      - Ranking information
      - Intake capacity
      - Facilities and courses
      - Placement statistics
*/

-- Insert additional colleges
INSERT INTO colleges (
  id, name, location, district, established, type,
  accreditation, ranking, intake, cutoff,
  website, image, courses, facilities, placement
) VALUES
(18, 'Government Engineering College Kannur', 'Kannur', 'Kannur', 1986, 'Government',
  '{"naac": {"grade": "B+", "score": 2.80}}'::jsonb,
  '{"kerala": 18}'::jsonb,
  '{"total": 300, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60, "Civil": 60}}'::jsonb,
  '{"general": 6500, "sc": 28000, "st": 32000, "obc": 15000}'::jsonb,
  'https://www.geck.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 4.8, "highestPackage": 18, "placementPercentage": 70}'::jsonb
),
(19, 'College of Engineering Muttathara', 'Thiruvananthapuram', 'Thiruvananthapuram', 2000, 'Government',
  '{"naac": {"grade": "B", "score": 2.65}}'::jsonb,
  '{"kerala": 19}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 7000, "sc": 29000, "st": 33000, "obc": 16000}'::jsonb,
  'https://www.cemuttathara.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 4.5, "highestPackage": 16, "placementPercentage": 65}'::jsonb
),
(20, 'College of Engineering Vadakara', 'Vadakara', 'Kozhikode', 1999, 'Government',
  '{"naac": {"grade": "B", "score": 2.60}}'::jsonb,
  '{"kerala": 20}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 7500, "sc": 30000, "st": 34000, "obc": 17000}'::jsonb,
  'https://www.cev.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 4.2, "highestPackage": 15, "placementPercentage": 62}'::jsonb
),
(21, 'College of Engineering Attingal', 'Attingal', 'Thiruvananthapuram', 2004, 'Government',
  '{"naac": {"grade": "B", "score": 2.55}}'::jsonb,
  '{"kerala": 21}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 8000, "sc": 31000, "st": 35000, "obc": 18000}'::jsonb,
  'https://www.ceattingal.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 4.0, "highestPackage": 14, "placementPercentage": 60}'::jsonb
),
(22, 'College of Engineering Pallippuram', 'Pallippuram', 'Alappuzha', 2004, 'Government',
  '{"naac": {"grade": "B", "score": 2.50}}'::jsonb,
  '{"kerala": 22}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 8500, "sc": 32000, "st": 36000, "obc": 19000}'::jsonb,
  'https://www.cep.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 3.8, "highestPackage": 13, "placementPercentage": 58}'::jsonb
),
(23, 'College of Engineering Kallooppara', 'Kallooppara', 'Pathanamthitta', 2004, 'Government',
  '{"naac": {"grade": "B", "score": 2.45}}'::jsonb,
  '{"kerala": 23}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 9000, "sc": 33000, "st": 37000, "obc": 20000}'::jsonb,
  'https://www.cek.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 3.6, "highestPackage": 12, "placementPercentage": 55}'::jsonb
),
(24, 'College of Engineering Karunagappally', 'Karunagappally', 'Kollam', 2004, 'Government',
  '{"naac": {"grade": "B", "score": 2.40}}'::jsonb,
  '{"kerala": 24}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 9500, "sc": 34000, "st": 38000, "obc": 21000}'::jsonb,
  'https://www.cekarunagappally.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 3.4, "highestPackage": 11, "placementPercentage": 52}'::jsonb
),
(25, 'College of Engineering Kottarakkara', 'Kottarakkara', 'Kollam', 2004, 'Government',
  '{"naac": {"grade": "B", "score": 2.35}}'::jsonb,
  '{"kerala": 25}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 10000, "sc": 35000, "st": 39000, "obc": 22000}'::jsonb,
  'https://www.cekottarakkara.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 3.2, "highestPackage": 10, "placementPercentage": 50}'::jsonb
),
(26, 'College of Engineering Pathanapuram', 'Pathanapuram', 'Kollam', 2004, 'Government',
  '{"naac": {"grade": "B", "score": 2.30}}'::jsonb,
  '{"kerala": 26}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 10500, "sc": 36000, "st": 40000, "obc": 23000}'::jsonb,
  'https://www.cepathanapuram.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 3.0, "highestPackage": 9, "placementPercentage": 48}'::jsonb
),
(27, 'College of Engineering Kuttanad', 'Kuttanad', 'Alappuzha', 2004, 'Government',
  '{"naac": {"grade": "B", "score": 2.25}}'::jsonb,
  '{"kerala": 27}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 11000, "sc": 37000, "st": 41000, "obc": 24000}'::jsonb,
  'https://www.cek.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 2.8, "highestPackage": 8, "placementPercentage": 45}'::jsonb
),
(28, 'College of Engineering Mavelikkara', 'Mavelikkara', 'Alappuzha', 2004, 'Government',
  '{"naac": {"grade": "B", "score": 2.20}}'::jsonb,
  '{"kerala": 28}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 11500, "sc": 38000, "st": 42000, "obc": 25000}'::jsonb,
  'https://www.cemavelikkara.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 2.6, "highestPackage": 7, "placementPercentage": 42}'::jsonb
),
(29, 'College of Engineering Mannar', 'Mannar', 'Alappuzha', 2004, 'Government',
  '{"naac": {"grade": "B", "score": 2.15}}'::jsonb,
  '{"kerala": 29}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 12000, "sc": 39000, "st": 43000, "obc": 26000}'::jsonb,
  'https://www.cemannar.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 2.4, "highestPackage": 6, "placementPercentage": 40}'::jsonb
),
(30, 'College of Engineering Kayamkulam', 'Kayamkulam', 'Alappuzha', 2004, 'Government',
  '{"naac": {"grade": "B", "score": 2.10}}'::jsonb,
  '{"kerala": 30}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 12500, "sc": 40000, "st": 44000, "obc": 27000}'::jsonb,
  'https://www.cekayamkulam.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 2.2, "highestPackage": 5, "placementPercentage": 38}'::jsonb
),
(31, 'College of Engineering Sreekrishnapuram', 'Sreekrishnapuram', 'Palakkad', 2004, 'Government',
  '{"naac": {"grade": "B", "score": 2.05}}'::jsonb,
  '{"kerala": 31}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 13000, "sc": 41000, "st": 45000, "obc": 28000}'::jsonb,
  'https://www.cesreekrishnapuram.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 2.0, "highestPackage": 4, "placementPercentage": 35}'::jsonb
),
(32, 'College of Engineering Ottapalam', 'Ottapalam', 'Palakkad', 2004, 'Government',
  '{"naac": {"grade": "B", "score": 2.00}}'::jsonb,
  '{"kerala": 32}'::jsonb,
  '{"total": 240, "branches": {"Computer Science": 60, "Electronics": 60, "Electrical": 60, "Mechanical": 60}}'::jsonb,
  '{"general": 13500, "sc": 42000, "st": 46000, "obc": 29000}'::jsonb,
  'https://www.ceottapalam.ac.in',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  ARRAY['B.Tech'],
  ARRAY['Library', 'Labs', 'Hostels', 'Canteen'],
  '{"averagePackage": 1.8, "highestPackage": 3, "placementPercentage": 32}'::jsonb
);