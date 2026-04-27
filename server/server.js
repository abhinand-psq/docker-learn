const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = 4000;
const HOST = '0.0.0.0';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:8000',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Anime News API' });
});

app.get('/description', (req, res) => {
  res.json({ 
    title: 'Anime News Description', 
    content: 'Stay updated with the latest news, releases, and reviews from the anime world.' 
  });
});

app.get('/api/news', (req, res) => {
  const newsList = [
    { id: 1, title: 'Attack on Titan Final Season', content: 'The epic conclusion is finally here! Don\'t miss the final battle.', date: '2023-11-04' },
    { id: 2, title: 'Demon Slayer Season 4', content: 'Hashira Training Arc announced. Prepare for more stunning animation.', date: '2024-05-12' },
    { id: 3, title: 'Jujutsu Kaisen', content: 'Culling Game arc confirmed for next season.', date: '2024-01-20' },
  ];
  res.json(newsList);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
