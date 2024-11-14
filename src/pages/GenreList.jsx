import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGenres, deleteGenre } from '../services/api';
import { Button, Table } from 'react-bootstrap';

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este género?");
    if (confirmDelete) {
      await deleteGenre(id);
      setGenres(genres.filter((genre) => genre.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/genres/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/genres/add');
  };

  return (
    <div className="genre-list">
      <h2 className="mb-4">Lista de Géneros</h2>
      <Button onClick={handleAdd} variant="primary" className="mb-3">
        Agregar Género
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre.id}>
              <td>{genre.id}</td>
              <td>{genre.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(genre.id)} className="me-2">
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(genre.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GenreList;
