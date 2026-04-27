import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [homeData, setHomeData] = useState(null);
  const [descData, setDescData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch both APIs
    Promise.all([
      fetch('http://localhost:3000/'),
      fetch('http://localhost:3000/description')
    ])
      .then(async ([homeRes, descRes]) => {
        if (!homeRes.ok || !descRes.ok) {
          throw new Error('Failed to fetch data');
        }
        const homeJson = await homeRes.json();
        const descJson = await descRes.json();
        setHomeData(homeJson);
        setDescData(descJson);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="app-container">
      <header className="hero">
        <h1 className="hero-title">{homeData ? homeData.message : 'Loading Anime News...'}</h1>
        <p className="hero-subtitle">Your ultimate source for anime updates</p>
      </header>

      <main className="content">
        {error && <div className="error-message">Error: {error}</div>}
        
        {descData ? (
          <div className="card">
            <h2 className="card-title">{descData.title}</h2>
            <p className="card-body">{descData.content}</p>
          </div>
        ) : (
          !error && <div className="loading-spinner">Loading description...</div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Anime News Network. Built with React & Node.js.</p>
      </footer>
    </div>
  );
}

export default App;
