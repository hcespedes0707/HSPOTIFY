import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistDetails } from '../services/api';
import Player from '../components/Player';
import { Card, ListGroup, Button } from 'react-bootstrap';

const Artist = () => {
  const { artistId } = useParams(); // Obtiene el ID del artista desde la URL
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  // Obtiene los detalles del artista al cargar el componente
  useEffect(() => {
    const fetchArtistDetails = async () => {
      const artistData = await getArtistDetails(artistId);
      setArtist(artistData.artist);
      setAlbums(artistData.albums);
    };

    fetchArtistDetails();
  }, [artistId]);

  // Muestra el reproductor con la canción seleccionada
  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  if (!artist) return <p>Cargando...</p>;

  return (
    <div className="artist-page">
      <h2 className="mb-4">{artist.name}</h2>
      {albums.map((album) => (
        <Card key={album.id} className="mb-4">
          <Card.Img variant="top" src={album.imageUrl} alt={album.title} />
          <Card.Body>
            <Card.Title>{album.title}</Card.Title>
            <ListGroup variant="flush">
              {album.tracks.map((track) => (
                <ListGroup.Item key={track.id} className="d-flex justify-content-between align-items-center">
                  {track.title}
                  <Button variant="outline-primary" onClick={() => playTrack(track)}>
                    Play
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}

      {/* Reproductor de música */}
      {currentTrack && (
        <div className="player-container mt-4">
          <Player trackUrl={currentTrack.url} trackTitle={currentTrack.title} />
        </div>
      )}
    </div>
  );
};

export default Artist;
