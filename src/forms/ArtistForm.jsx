import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes para la validación de props
import { Button, Form } from 'react-bootstrap';
import { addArtist, updateArtist, getGenres } from '../services/api';

const ArtistForm = ({ artist, onSubmit }) => {
  const [name, setName] = useState(artist ? artist.name : '');
  const [genreId, setGenreId] = useState(artist ? artist.genreId : '');
  const [image, setImage] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('genreId', genreId);
    if (image) formData.append('image', image);

    if (artist) {
      await updateArtist(artist.id, formData);
    } else {
      await addArtist(formData);
    }

    onSubmit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nombre del Artista</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Género</Form.Label>
        <Form.Control
          as="select"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          required
        >
          <option value="">Seleccione un género</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
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
        {artist ? 'Actualizar Artista' : 'Agregar Artista'}
      </Button>
    </Form>
  );
};

// Define los tipos de las props esperadas
ArtistForm.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    genreId: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default ArtistForm;
