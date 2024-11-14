import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGenres } from '../services/api';
import { Card, Button } from 'react-bootstrap';
import './Home.css';

const Home = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      const genreData = await getGenres();
      setGenres(genreData);
    };
    fetchGenres();
  }, []);

  const goToGenre = (genreId) => {
    navigate(`/genres/${genreId}`);
  };

  return (
    <div className="home-page">
      <div className="intro-banner">
        <h1>Bienvenido a HiltonMusic</h1>
        <p>Encuentra tu música favorita y explora por géneros, artistas y más.</p>
      </div>
      <h2 className="explore-title">Explora por Género</h2>
      <div className="genre-list">
        {genres.map((genre) => (
          <Card key={genre.id} className="genre-card">
            <Card.Img variant="top" src={genre.imageUrl} alt={genre.name} className="genre-image" />
            <Card.Body className="genre-card-body">
              <Card.Title className="genre-title">{genre.name}</Card.Title>
              <Button variant="success" className="genre-button" onClick={() => goToGenre(genre.id)}>
                Ver Género
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
