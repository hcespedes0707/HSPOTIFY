import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArtists, deleteArtist } from '../services/api';
import { Button, Table } from 'react-bootstrap';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      const data = await getArtists();
      setArtists(data);
    };
    fetchArtists();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este artista?");
    if (confirmDelete) {
      await deleteArtist(id);
      setArtists(artists.filter((artist) => artist.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/artists/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/artists/add');
  };

  return (
    <div className="artist-list">
      <h2 className="mb-4">Lista de Artistas</h2>
      <Button onClick={handleAdd} variant="primary" className="mb-3">
        Agregar Artista
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td>{artist.id}</td>
              <td>{artist.name}</td>
              <td>{artist.genreName}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(artist.id)} className="me-2">
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(artist.id)}>
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

export default ArtistList;
