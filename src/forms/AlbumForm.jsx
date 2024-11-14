import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes para la validación de props
import { Button, Form } from 'react-bootstrap';
import { addAlbum, updateAlbum, getArtists } from '../services/api';

const AlbumForm = ({ album, onSubmit }) => {
  const [title, setTitle] = useState(album ? album.title : '');
  const [artistId, setArtistId] = useState(album ? album.artistId : '');
  const [image, setImage] = useState(null);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const data = await getArtists();
      setArtists(data);
    };
    fetchArtists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artistId', artistId);
    if (image) formData.append('image', image);

    if (album) {
      await updateAlbum(album.id, formData);
    } else {
      await addAlbum(formData);
    }

    onSubmit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Título del Álbum</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Artista</Form.Label>
        <Form.Control
          as="select"
          value={artistId}
          onChange={(e) => setArtistId(e.target.value)}
          required
        >
          <option value="">Seleccione un artista</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Imagen</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>
      <Button type="submit" className="mt-3">
        {album ? 'Actualizar Álbum' : 'Agregar Álbum'}
      </Button>
    </Form>
  );
};

// Define los tipos de las props esperadas
AlbumForm.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    artistId: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default AlbumForm;
