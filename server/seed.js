const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Project = require('./models/Project');

dotenv.config({ path: path.join(__dirname, '.env') });

connectDB();

const seedProjects = [
  {
    name: 'Panchi Vihar',
    slug: 'panchi-vihar',
    tagline: 'Luxury Township in Holy Ayodhya',
    description: 'A sophisticated residential community designed with modern amenities and spiritual harmony, blending contemporary comforts with the sacred atmosphere of Ayodhya. Panchi Vihar represents the epitome of luxury living with world-class infrastructure, lush green spaces, and a holistic lifestyle.',
    status: 'Ongoing',
    heroImage: '/images/pv-1.png',
    gallery: [
      '/images/pv-1.png',
      '/images/pv-2.png',
      '/images/pv-3.png',
      '/images/pv-4.png',
      '/images/pv-5.png',
      '/images/pv-6.png',
      '/images/pv-7.png',
      '/images/pv-8.png',
      '/images/pv-9.png',
      '/images/pv-10.png'
    ],
    amenities: [
      'Swimming Pool',
      'Gymnasium',
      'Community Center',
      'Landscaped Gardens',
      'Children\'s Play Area',
      'Security Gates',
      '24/7 Security',
      'Parking Facilities'
    ],
    connectivity: [
      {
        destination: 'Ayodhya Airport',
        time: '15 Mins',
        icon: 'airport'
      },
      {
        destination: 'Ram Janmabhoomi',
        time: '30 Mins',
        icon: 'temple'
      },
      {
        destination: 'Saryu Ghat',
        time: '35 Mins',
        icon: 'water'
      },
      {
        destination: 'Kanak Bhawan',
        time: '32 Mins',
        icon: 'sun'
      },
      {
        destination: 'Hanuman Garhi',
        time: '30 Mins',
        icon: 'praying'
      }
    ]
  }
];

const seed = async () => {
  try {
    await Project.deleteMany({});
    const projects = await Project.insertMany(seedProjects);
    console.log('✅ Database seeded successfully');
    console.log('📁 Projects created:', projects.length);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seed();
