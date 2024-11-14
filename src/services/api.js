import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Asegúrate de que coincida con la URL de tu backend

// ---------------------------------------
// Géneros
// ---------------------------------------

// Obtener lista de géneros
export const getGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}/genres`);
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};
export const searchGlobal = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { q: query }, // La consulta se pasa como parámetro
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

// Agregar un nuevo género
export const addGenre = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/genres`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding genres:', error);
  }
};

// Actualizar un género existente
export const updateGenre = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/genres/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating genres:', error);
  }
};

// Eliminar un género
export const deleteGenre = async (id) => {
  try {
    await axios.delete(`${API_URL}/genres/${id}`);
  } catch (error) {
    console.error('Error deleting genre:', error);
  }
};

// ---------------------------------------
// Artistas
// ---------------------------------------

// Obtener lista de artistas
export const getArtists = async () => {
  try {
    const response = await axios.get(`${API_URL}/artists`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artists:', error);
    return [];
  }
};

// Agregar un nuevo artista
export const addArtist = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/artists`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding artist:', error);
  }
};

// Actualizar un artista existente
export const updateArtist = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/artists/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating artist:', error);
  }
};

// Eliminar un artista
export const deleteArtist = async (id) => {
  try {
    await axios.delete(`${API_URL}/artists/${id}`);
  } catch (error) {
    console.error('Error deleting artist:', error);
  }
};

// ---------------------------------------
// Álbumes
// ---------------------------------------

// Obtener lista de álbumes
export const getAlbums = async () => {
  try {
    const response = await axios.get(`${API_URL}/albums`);
    return response.data;
  } catch (error) {
    console.error('Error fetching albums:', error);
    return [];
  }
};

// Agregar un nuevo álbum
export const addAlbum = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/albums`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding album:', error);
  }
};

// Actualizar un álbum existente
export const updateAlbum = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/albums/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating album:', error);
  }
};

// Eliminar un álbum
export const deleteAlbum = async (id) => {
  try {
    await axios.delete(`${API_URL}/albums/${id}`);
  } catch (error) {
    console.error('Error deleting album:', error);
  }
};

// ---------------------------------------
// Canciones
// ---------------------------------------

// Obtener lista de canciones
export const getSongs = async () => {
  try {
    const response = await axios.get(`${API_URL}/songs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
};

// Agregar una nueva canción
export const addSong = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/songs`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding song:', error);
  }
};

// Actualizar una canción existente
export const updateSong = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/songs/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating song:', error);
  }
};

// Eliminar una canción
export const deleteSong = async (id) => {
  try {
    await axios.delete(`${API_URL}/songs/${id}`);
  } catch (error) {
    console.error('Error deleting song:', error);
  }
};
