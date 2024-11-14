import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtistsByGenre } from '../services/api';
import { Card, Button } from 'react-bootstrap';

const Genre = () => {
  const { genreId } = useParams(); // Obtiene el ID del género desde la URL
  const [genre, setGenre] = useState(null);
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  // Obtiene los artistas del género al cargar el componente
  useEffect(() => {
    const fetchArtists = async () => {
      const genreData = await getArtistsByGenre(genreId);
      setGenre(genreData.genre);
      setArtists(genreData.artists);
    };

    fetchArtists();
  }, [genreId]);

  // Navega a la página del artista seleccionado
  const goToArtist = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  if (!genre) return <p>Cargando...</p>;

  return (
    <div className="genre-page">
      <h2 className="mb-4">Género: {genre.name}</h2>
      <div className="artist-list d-flex flex-wrap">
        {artists.map((artist) => (
          <Card key={artist.id} className="m-2" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={artist.imageUrl} alt={artist.name} />
            <Card.Body>
              <Card.Title>{artist.name}</Card.Title>
              <Button variant="primary" onClick={() => goToArtist(artist.id)}>
                Ver Artista
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Genre;
