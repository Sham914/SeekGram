export interface College {
  id: number;
  name: string;
  shortName: string;
  location: string;
  district: string;
  established: number;
  type: 'Government' | 'Government Aided' | 'Self Financing';
  accreditation: {
    nba?: boolean;
    naac?: {
      grade: string;
      score: number;
    };
  };
  ranking: {
    kerala: number;
    nirf?: number;
  };
  intake: {
    total: number;
    branches: {
      [key: string]: number;
    };
  };
  cutoff?: {
    general: number;
    sc: number;
    st: number;
    obc: number;
  };
  website: string;
  image: string;
  courses: string[];
  facilities: string[];
  placement?: {
    averagePackage: number;
    highestPackage: number;
    placementPercentage: number;
  };
}

export const colleges: College[] = [
  {
    id: 1,
    name: 'College of Engineering Trivandrum',
    shortName: 'CET',
    location: 'Thiruvananthapuram',
    district: 'Thiruvananthapuram',
    established: 1939,
    type: 'Government',
    accreditation: {
      nba: true,
      naac: {
        grade: 'A',
        score: 3.45,
      },
    },
    ranking: {
      kerala: 1,
      nirf: 95,
    },
    intake: {
      total: 840,
      branches: {
        'Computer Science': 120,
        'Electronics': 120,
        'Electrical': 120,
        'Mechanical': 120,
        'Civil': 120,
      },
    },
    cutoff: {
      general: 1500,
      sc: 15000,
      st: 20000,
      obc: 5000,
    },
    website: 'https://www.cet.ac.in',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    facilities: ['Library', 'Sports Complex', 'Hostels', 'Research Labs'],
    placement: {
      averagePackage: 8.5,
      highestPackage: 45,
      placementPercentage: 95,
    },
  },
  {
    id: 2,
    name: 'TKM College of Engineering',
    shortName: 'TKMCE',
    location: 'Kollam',
    district: 'Kollam',
    established: 1958,
    type: 'Government Aided',
    accreditation: {
      nba: true,
      naac: {
        grade: 'A',
        score: 3.30,
      },
    },
    ranking: {
      kerala: 2,
      nirf: 150,
    },
    intake: {
      total: 780,
      branches: {
        'Computer Science': 120,
        'Electronics': 120,
        'Electrical': 60,
        'Mechanical': 120,
        'Civil': 120,
      },
    },
    cutoff: {
      general: 2000,
      sc: 18000,
      st: 22000,
      obc: 6000,
    },
    website: 'https://www.tkmce.ac.in',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech', 'M.Tech'],
    facilities: ['Library', 'Sports Ground', 'Hostels', 'Cafeteria'],
    placement: {
      averagePackage: 7.2,
      highestPackage: 40,
      placementPercentage: 90,
    },
  },
  {
    id: 3,
    name: 'Government Engineering College Thrissur',
    shortName: 'GECT',
    location: 'Thrissur',
    district: 'Thrissur',
    established: 1957,
    type: 'Government',
    accreditation: {
      nba: true,
      naac: {
        grade: 'A',
        score: 3.20,
      },
    },
    ranking: {
      kerala: 3,
    },
    intake: {
      total: 420,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 60,
        'Civil': 60,
      },
    },
    cutoff: {
      general: 3000,
      sc: 20000,
      st: 25000,
      obc: 8000,
    },
    website: 'https://gectcr.ac.in',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech', 'M.Tech'],
    facilities: ['Library', 'Labs', 'Hostels', 'Canteen'],
    placement: {
      averagePackage: 6.8,
      highestPackage: 35,
      placementPercentage: 85,
    },
  },
  {
    id: 4,
    name: 'Government Engineering College Barton Hill',
    shortName: 'GECBH',
    location: 'Thiruvananthapuram',
    district: 'Thiruvananthapuram',
    established: 1999,
    type: 'Government',
    accreditation: {
      nba: true,
      naac: {
        grade: 'B+',
        score: 2.95,
      },
    },
    ranking: {
      kerala: 4,
    },
    intake: {
      total: 300,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 60,
        'Civil': 60,
      },
    },
    website: 'https://www.gecbh.ac.in',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech', 'M.Tech'],
    facilities: ['Library', 'Labs', 'Hostels', 'Cafeteria'],
    placement: {
      averagePackage: 6.2,
      highestPackage: 32,
      placementPercentage: 82,
    },
  },
  {
    id: 5,
    name: 'Model Engineering College',
    shortName: 'MEC',
    location: 'Thrikkakara',
    district: 'Ernakulam',
    established: 1989,
    type: 'Government',
    accreditation: {
      nba: true,
      naac: {
        grade: 'A',
        score: 3.15,
      },
    },
    ranking: {
      kerala: 5,
    },
    intake: {
      total: 360,
      branches: {
        'Computer Science': 60,
        'Electronics': 120,
        'Electrical': 60,
        'Biomedical': 60,
        'Electronics and Biomedical': 60,
      },
    },
    website: 'https://www.mec.ac.in',
    image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech', 'M.Tech'],
    facilities: ['Library', 'Innovation Lab', 'Hostels', 'Sports Complex'],
    placement: {
      averagePackage: 7.5,
      highestPackage: 38,
      placementPercentage: 88,
    },
  },
  {
    id: 6,
    name: 'NSS College of Engineering',
    shortName: 'NSSCE',
    location: 'Palakkad',
    district: 'Palakkad',
    established: 1960,
    type: 'Government Aided',
    accreditation: {
      nba: true,
      naac: {
        grade: 'A',
        score: 3.10,
      },
    },
    ranking: {
      kerala: 6,
    },
    intake: {
      total: 420,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 120,
        'Civil': 60,
        'Industrial': 60,
      },
    },
    website: 'https://www.nssce.ac.in',
    image: 'https://images.unsplash.com/photo-1581362072978-14998d01fdaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech', 'M.Tech'],
    facilities: ['Library', 'Workshop', 'Hostels', 'Gymnasium'],
    placement: {
      averagePackage: 6.5,
      highestPackage: 30,
      placementPercentage: 85,
    },
  },
  {
    id: 7,
    name: 'Mar Athanasius College of Engineering',
    shortName: 'MACE',
    location: 'Kothamangalam',
    district: 'Ernakulam',
    established: 1961,
    type: 'Government Aided',
    accreditation: {
      nba: true,
      naac: {
        grade: 'A',
        score: 3.05,
      },
    },
    ranking: {
      kerala: 7,
    },
    intake: {
      total: 420,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 120,
        'Civil': 60,
        'Industrial': 60,
      },
    },
    website: 'https://www.mace.ac.in',
    image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech', 'M.Tech'],
    facilities: ['Library', 'Research Center', 'Hostels', 'Auditorium'],
    placement: {
      averagePackage: 6.3,
      highestPackage: 28,
      placementPercentage: 83,
    },
  },
  {
    id: 8,
    name: 'Government Engineering College Kozhikode',
    shortName: 'GECK',
    location: 'Kozhikode',
    district: 'Kozhikode',
    established: 1999,
    type: 'Government',
    accreditation: {
      nba: true,
      naac: {
        grade: 'B+',
        score: 2.85,
      },
    },
    ranking: {
      kerala: 8,
    },
    intake: {
      total: 360,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 60,
        'Civil': 60,
        'Information Technology': 60,
      },
    },
    website: 'https://www.geck.ac.in',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech', 'M.Tech'],
    facilities: ['Library', 'Computer Labs', 'Hostels', 'Sports Ground'],
    placement: {
      averagePackage: 6.0,
      highestPackage: 28,
      placementPercentage: 80,
    },
  },
  {
    id: 9,
    name: 'Rajiv Gandhi Institute of Technology',
    shortName: 'RIT',
    location: 'Kottayam',
    district: 'Kottayam',
    established: 1991,
    type: 'Government',
    accreditation: {
      nba: true,
      naac: {
        grade: 'A',
        score: 3.00,
      },
    },
    ranking: {
      kerala: 9,
    },
    intake: {
      total: 420,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 120,
        'Civil': 60,
        'Production': 60,
      },
    },
    website: 'https://www.rit.ac.in',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech', 'M.Tech'],
    facilities: ['Library', 'Advanced Labs', 'Hostels', 'Cafeteria'],
    placement: {
      averagePackage: 6.1,
      highestPackage: 30,
      placementPercentage: 82,
    },
  },
  {
    id: 10,
    name: 'Government Engineering College Wayanad',
    shortName: 'GECW',
    location: 'Wayanad',
    district: 'Wayanad',
    established: 1999,
    type: 'Government',
    accreditation: {
      naac: {
        grade: 'B',
        score: 2.75,
      },
    },
    ranking: {
      kerala: 10,
    },
    intake: {
      total: 300,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 60,
        'Civil': 60,
      },
    },
    website: 'https://www.gecwyd.ac.in',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech'],
    facilities: ['Library', 'Labs', 'Hostels', 'Canteen'],
    placement: {
      averagePackage: 5.5,
      highestPackage: 25,
      placementPercentage: 75,
    },
  },
  {
    id: 11,
    name: 'College of Engineering Kidangoor',
    shortName: 'CEK',
    location: 'Kidangoor',
    district: 'Kottayam',
    established: 2000,
    type: 'Government',
    accreditation: {
      naac: {
        grade: 'B+',
        score: 2.80,
      },
    },
    ranking: {
      kerala: 11,
    },
    intake: {
      total: 300,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 60,
        'Civil': 60,
      },
    },
    website: 'https://www.ce-kgr.org',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech'],
    facilities: ['Library', 'Labs', 'Hostels', 'Canteen'],
    placement: {
      averagePackage: 5.2,
      highestPackage: 22,
      placementPercentage: 72,
    },
  },
  {
    id: 12,
    name: 'College of Engineering Adoor',
    shortName: 'CEA',
    location: 'Adoor',
    district: 'Pathanamthitta',
    established: 1995,
    type: 'Government',
    accreditation: {
      naac: {
        grade: 'B+',
        score: 2.82,
      },
    },
    ranking: {
      kerala: 12,
    },
    intake: {
      total: 300,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 60,
        'Civil': 60,
      },
    },
    website: 'https://www.cea.ac.in',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech'],
    facilities: ['Library', 'Labs', 'Hostels', 'Canteen'],
    placement: {
      averagePackage: 5.0,
      highestPackage: 20,
      placementPercentage: 70,
    },
  },
  {
    id: 13,
    name: 'College of Engineering Chengannur',
    shortName: 'CEC',
    location: 'Chengannur',
    district: 'Alappuzha',
    established: 1993,
    type: 'Government',
    accreditation: {
      naac: {
        grade: 'A',
        score: 3.05,
      },
    },
    ranking: {
      kerala: 13,
    },
    intake: {
      total: 360,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 60,
        'Civil': 60,
        'Information Technology': 60,
      },
    },
    website: 'https://www.ceconline.edu',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech', 'M.Tech'],
    facilities: ['Library', 'Labs', 'Hostels', 'Canteen'],
    placement: {
      averagePackage: 5.8,
      highestPackage: 26,
      placementPercentage: 78,
    },
  },
  {
    id: 14,
    name: 'College of Engineering Munnar',
    shortName: 'CEM',
    location: 'Munnar',
    district: 'Idukki',
    established: 2000,
    type: 'Government',
    accreditation: {
      naac: {
        grade: 'B',
        score: 2.70,
      },
    },
    ranking: {
      kerala: 14,
    },
    intake: {
      total: 240,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 60,
      },
    },
    website: 'https://www.cemunnar.ac.in',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech'],
    facilities: ['Library', 'Labs', 'Hostels', 'Canteen'],
    placement: {
      averagePackage: 4.8,
      highestPackage: 18,
      placementPercentage: 68,
    },
  },
  {
    id: 15,
    name: 'College of Engineering Thalassery',
    shortName: 'CET',
    location: 'Thalassery',
    district: 'Kannur',
    established: 1999,
    type: 'Government',
    accreditation: {
      naac: {
        grade: 'B+',
        score: 2.85,
      },
    },
    ranking: {
      kerala: 15,
    },
    intake: {
      total: 300,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 60,
        'Civil': 60,
      },
    },
    website: 'https://www.cethalassery.ac.in',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech'],
    facilities: ['Library', 'Labs', 'Hostels', 'Canteen'],
    placement: {
      averagePackage: 5.0,
      highestPackage: 20,
      placementPercentage: 70,
    },
  },
  {
    id: 16,
    name: 'College of Engineering Perumon',
    shortName: 'CEP',
    location: 'Perumon',
    district: 'Kollam',
    established: 2000,
    type: 'Government',
    accreditation: {
      naac: {
        grade: 'B',
        score: 2.75,
      },
    },
    ranking: {
      kerala: 16,
    },
    intake: {
      total: 300,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 60,
        'Civil': 60,
      },
    },
    website: 'https://www.ceperumon.ac.in',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech'],
    facilities: ['Library', 'Labs', 'Hostels', 'Canteen'],
    placement: {
      averagePackage: 4.5,
      highestPackage: 18,
      placementPercentage: 65,
    },
  },
  {
    id: 17,
    name: 'College of Engineering Poonjar',
    shortName: 'CEP',
    location: 'Poonjar',
    district: 'Kottayam',
    established: 2000,
    type: 'Government',
    accreditation: {
      naac: {
        grade: 'B',
        score: 2.70,
      },
    },
    ranking: {
      kerala: 17,
    },
    intake: {
      total: 240,
      branches: {
        'Computer Science': 60,
        'Electronics': 60,
        'Electrical': 60,
        'Mechanical': 60,
      },
    },
    website: 'https://www.cepoonjar.ac.in',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    courses: ['B.Tech'],
    facilities: ['Library', 'Labs', 'Hostels', 'Canteen'],
    placement: {
      averagePackage: 4.2,
      highestPackage: 16,
      placementPercentage: 62,
    },
  }
];

export const collegeTypes = ['Government', 'Government Aided', 'Self Financing'] as const;
export const districts = ['Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'] as const;
export const branches = ['Computer Science', 'Electronics', 'Electrical', 'Mechanical', 'Civil', 'Chemical', 'Production', 'Automobile', 'Industrial', 'Biotechnology', 'Biomedical', 'Electronics and Biomedical', 'Information Technology'] as const;