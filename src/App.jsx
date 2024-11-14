// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenreForm from './forms/GenreForm';
import ArtistForm from './forms/ArtistForm';
import AlbumForm from './forms/AlbumForm';
import SongForm from './forms/SongForm';
import Home from './pages/Home'; // Importa el componente Home
import Navbar from './components/Navbar'; // Importa el Navbar
import Player from './components/Player'; // Importa el Player
import './App.css'; // Asegúrate de tener estilos aplicables en App.css

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar /> {/* Navbar siempre visible en la parte superior */}
        <div className="content">
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<Home />} />
            
            {/* Rutas para Géneros */}
            <Route path="/genres/add" element={<GenreForm onSubmit={() => { /* handle submit */ }} />} />
            <Route path="/genres/edit/:id" element={<GenreForm onSubmit={() => { /* handle submit */ }} />} />
            
            {/* Rutas para Artistas */}
            <Route path="/artists/add" element={<ArtistForm onSubmit={() => { /* handle submit */ }} />} />
            <Route path="/artists/edit/:id" element={<ArtistForm onSubmit={() => { /* handle submit */ }} />} />
            
            {/* Rutas para Álbumes */}
            <Route path="/albums/add" element={<AlbumForm onSubmit={() => { /* handle submit */ }} />} />
            <Route path="/albums/edit/:id" element={<AlbumForm onSubmit={() => { /* handle submit */ }} />} />
            
            {/* Rutas para Canciones */}
            <Route path="/songs/add" element={<SongForm onSubmit={() => { /* handle submit */ }} />} />
            <Route path="/songs/edit/:id" element={<SongForm onSubmit={() => { /* handle submit */ }} />} />
          </Routes>
        </div>
        <Player /> {/* Player siempre visible en la parte inferior */}
      </div>
    </Router>
  );
}

export default App;
