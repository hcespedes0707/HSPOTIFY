import { useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes para la validación de props
import { Button, Form } from 'react-bootstrap';
import { addGenre, updateGenre } from '../services/api';

const GenreForm = ({ genre, onSubmit }) => {
  const [name, setName] = useState(genre ? genre.name : '');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (image) formData.append('image', image);  // Asegúrate de agregar la imagen correctamente

    if (genre) {
      await updateGenre(genre.id, formData);  // Actualiza el género si existe
    } else {
      await addGenre(formData);  // Agrega un nuevo género
    }

    onSubmit();  // Callback para actualizar la lista o cerrar el formulario
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nombre del Género</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Imagen</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}  // Configura correctamente la imagen
        />
      </Form.Group>
      <Button type="submit" className="mt-3">
        {genre ? 'Actualizar Género' : 'Agregar Género'}
      </Button>
    </Form>
  );
};

// Define los tipos de las props esperadas
GenreForm.propTypes = {
  genre: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,  // Asegúrate de que onSubmit es obligatorio
};

export default GenreForm;
