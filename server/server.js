const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// --- FIXED CORS CONFIGURATION ---
app.use(cors({
  origin: [
    'https://ayodhyaestate.com',
    'http://ayodhyaestate.com',
    'https://www.ayodhyaestate.com',
    'http://www.ayodhyaestate.com',
    'https://ayodhyaestates.netlify.app',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
  credentials: true
}));
// -----------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/inquiry', require('./routes/inquiry'));
app.use('/api/admin', require('./routes/admin'));

// Health check for uptime monitoring
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});

// Dynamic XML Sitemap Generator
app.get('/sitemap.xml', async (req, res) => {
  try {
    const Project = require('./models/Project');
    
    // Fetch all projects with slug field
    const projects = await Project.find({}, 'slug updatedAt').lean();
    
    // Base URL for your site
    const baseUrl = 'https://ayodhyaestate.com';
    
    // Current date in ISO format
    const currentDate = new Date().toISOString();
    
    // Build XML sitemap
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add homepage
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '    <priority>1.0</priority>\n';
    xml += '  </url>\n';
    
    // Add projects listing page
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/projects</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.9</priority>\n';
    xml += '  </url>\n';
    
    // Add about page
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/about</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    xml += '  </url>\n';
    
    // Add gallery page
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/gallery</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    xml += '  </url>\n';
    
    // Add contact page
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/contact</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
    
    // Add individual project pages
    projects.forEach(project => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/projects/${project.slug}</loc>\n`;
      xml += `    <lastmod>${project.updatedAt ? new Date(project.updatedAt).toISOString() : currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    // Set proper XML headers
    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(xml);
    
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// Robots.txt for search engine crawlers
app.get('/robots.txt', (req, res) => {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap location
Sitemap: https://ayodhyaestate.com/sitemap.xml

# Disallow admin routes
Disallow: /api/admin/
Disallow: /admin/
`;
  
  res.header('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: err.message 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🕉️  Ayodhya Estate Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🗺️  Sitemap: http://localhost:${PORT}/sitemap.xml`);
  console.log(`🤖 Robots.txt: http://localhost:${PORT}/robots.txt`);
});
