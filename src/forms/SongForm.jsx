import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import { Button, Form } from 'react-bootstrap';
import { addSong, updateSong, getAlbums } from '../services/api';

const SongForm = ({ song, onSubmit }) => {
  const [title, setTitle] = useState(song ? song.title : '');
  const [albumId, setAlbumId] = useState(song ? song.albumId : '');
  const [file, setFile] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const data = await getAlbums();
      setAlbums(data);
    };
    fetchAlbums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('albumId', albumId);
    if (file) formData.append('file', file);

    if (song) {
      await updateSong(song.id, formData);
    } else {
      await addSong(formData);
    }

    onSubmit(); // Callback para actualizar la lista o cerrar el formulario
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Título de la Canción</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Álbum</Form.Label>
        <Form.Control
          as="select"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          required
        >
          <option value="">Seleccione un álbum</option>
          {albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.title}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Archivo MP3</Form.Label>
        <Form.Control
          type="file"
          accept="audio/mp3"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </Form.Group>
      <Button type="submit" className="mt-3">
        {song ? 'Actualizar Canción' : 'Agregar Canción'}
      </Button>
    </Form>
  );
};

// Agrega la validación de tipos de las props
SongForm.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    albumId: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default SongForm;
