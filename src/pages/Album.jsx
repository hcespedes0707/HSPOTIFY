import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlbumById, getSongsByAlbum, deleteSong } from '../services/api';
import { Button, Table } from 'react-bootstrap';

const Album = () => {
  const { id } = useParams(); // ID del álbum desde la URL
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbumData = async () => {
      const albumData = await getAlbumById(id);
      setAlbum(albumData);

      const songsData = await getSongsByAlbum(id);
      setSongs(songsData);
    };
    fetchAlbumData();
  }, [id]);

  const handleDelete = async (songId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta canción?");
    if (confirmDelete) {
      await deleteSong(songId);
      setSongs(songs.filter((song) => song.id !== songId));
    }
  };

  const handleEdit = (songId) => {
    navigate(`/songs/edit/${songId}`);
  };

  const handleAddSong = () => {
    navigate(`/albums/${id}/add-song`);
  };

  if (!album) {
    return <p>Cargando álbum...</p>;
  }

  return (
    <div className="album">
      <h2>{album.title}</h2>
      <h4>Artista: {album.artistName}</h4>
      <Button onClick={handleAddSong} variant="primary" className="mb-3">
        Agregar Canción
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.id}</td>
              <td>{song.title}</td>
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

export default Album;
