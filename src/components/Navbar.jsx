import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Nav, Navbar, Button, Dropdown, NavDropdown } from 'react-bootstrap';
import { searchGlobal } from '../services/api';

const NavbarComponent = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Maneja la búsqueda y actualiza las sugerencias para el autocompletado
  const handleSearch = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      const results = await searchGlobal(searchQuery); // Llama a la API para obtener sugerencias
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  // Navega a la página de resultados de búsqueda al hacer clic en "Buscar"
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (query) {
      navigate(`/search?query=${query}`);
      setQuery('');
      setSuggestions([]);
    }
  };

  // Navega al elemento correspondiente al seleccionar una sugerencia
  const handleSuggestionClick = (suggestion) => {
    navigate(`/${suggestion.type}/${suggestion.id}`);
    setQuery('');
    setSuggestions([]);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand href="/">HiltonMusic</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto">
          {/* Enlaces de navegación a todas las páginas */}
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/genres">Géneros</Nav.Link>
          <Nav.Link href="/artists">Artistas</Nav.Link>
          <Nav.Link href="/albums">Álbumes</Nav.Link>
          <Nav.Link href="/songs">Canciones</Nav.Link>

          {/* Menú desplegable para los formularios */}
          <NavDropdown title="Administrar" id="admin-dropdown">
            <NavDropdown.Item href="/genres/add">Agregar Género</NavDropdown.Item>
            <NavDropdown.Item href="/genres/edit/:id">Editar Género</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/artists/add">Agregar Artista</NavDropdown.Item>
            <NavDropdown.Item href="/artists/edit/:id">Editar Artista</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/albums/add">Agregar Álbum</NavDropdown.Item>
            <NavDropdown.Item href="/albums/edit/:id">Editar Álbum</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/songs/add">Agregar Canción</NavDropdown.Item>
            <NavDropdown.Item href="/songs/edit/:id">Editar Canción</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Form className="d-flex" onSubmit={handleSearchSubmit}>
          <FormControl
            type="search"
            placeholder="Buscar..."
            className="me-2"
            value={query}
            onChange={handleSearch}
          />
          <Button variant="outline-success" type="submit">
            Buscar
          </Button>
        </Form>
      </Navbar.Collapse>
      
      {/* Dropdown para las sugerencias */}
      {suggestions.length > 0 && (
        <Dropdown className="search-suggestions">
          <Dropdown.Menu show>
            {suggestions.map((suggestion) => (
              <Dropdown.Item
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name} - {suggestion.type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Navbar>
  );
};

export default NavbarComponent;
