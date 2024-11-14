import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAlbums, deleteAlbum } from '../services/api';
import { Button, Table } from 'react-bootstrap';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      const data = await getAlbums();
      setAlbums(data);
    };
    fetchAlbums();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este álbum?");
    if (confirmDelete) {
      await deleteAlbum(id);
      setAlbums(albums.filter((album) => album.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/albums/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/albums/add');
  };

  return (
    <div className="album-list">
      <h2 className="mb-4">Lista de Álbumes</h2>
      <Button onClick={handleAdd} variant="primary" className="mb-3">
        Agregar Álbum
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Artista</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr key={album.id}>
              <td>{album.id}</td>
              <td>{album.title}</td>
              <td>{album.artistName}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(album.id)} className="me-2">
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(album.id)}>
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

export default AlbumList;
