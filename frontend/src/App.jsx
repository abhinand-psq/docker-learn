import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [descData, setDescData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all APIs from backend on port 4000
    Promise.all([
      fetch('http://localhost:4000/description'),
      fetch('http://localhost:4000/api/news')
    ])
      .then(async ([descRes, newsRes]) => {
        if (!descRes.ok || !newsRes.ok) {
          throw new Error('Failed to fetch data');
        }
        const descJson = await descRes.json();
        const newsJson = await newsRes.json();
        setDescData(descJson);
        setNewsData(newsJson);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="app-container">
      <header className="hero">
        <h1 className="hero-title">Anime News Network</h1>
        <p className="hero-subtitle">Your ultimate source for anime updates</p>
      </header>

      <main className="content">
        {error && <div className="error-message">Error: {error}</div>}
        
        <div className="main-grid">
          {descData ? (
            <div className="card">
              <h2 className="card-title">{descData.title}</h2>
              <p className="card-body">{descData.content}</p>
            </div>
          ) : (
            !error && <div className="loading-spinner">Loading description...</div>
          )}

          {newsData ? (
            <div className="news-container">
              <h2 className="news-header">Latest News</h2>
              <div className="news-list">
                {newsData.map((news) => (
                  <div key={news.id} className="news-card">
                    <h3 className="news-title">{news.title}</h3>
                    <p className="news-content">{news.content}</p>
                    <span className="news-date">{news.date}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            !error && <div className="loading-spinner">Loading news...</div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Anime News Network. Built with React & Node.js.</p>
      </footer>
    </div>
  );
}

export default App;
