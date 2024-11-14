import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSongs, deleteSong } from '../services/api';
import { Button, Table } from 'react-bootstrap';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getSongs();
      setSongs(data);
    };
    fetchSongs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta canción?");
    if (confirmDelete) {
      await deleteSong(id);
      setSongs(songs.filter((song) => song.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/songs/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/songs/add');
  };

  return (
    <div className="song-list">
      <h2 className="mb-4">Lista de Canciones</h2>
      <Button onClick={handleAdd} variant="primary" className="mb-3">
        Agregar Canción
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Álbum</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.id}</td>
              <td>{song.title}</td>
              <td>{song.albumTitle}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(song.id)} className="me-2">
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(song.id)}>
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

export default SongList;
