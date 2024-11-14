import  { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchGlobal } from '../services/api';
import { ListGroup, Button } from 'react-bootstrap';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Extrae la consulta de búsqueda desde la URL
  const query = new URLSearchParams(location.search).get('query');

  // Ejecuta la búsqueda cuando el componente se carga o cambia la consulta
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        const searchData = await searchGlobal(query);
        setResults(searchData);
      }
    };

    fetchSearchResults();
  }, [query]);

  // Navega a la página correspondiente del resultado
  const goToResult = (result) => {
    navigate(`/${result.type}/${result.id}`);
  };

  if (!query) return <p>Por favor ingrese una consulta de búsqueda.</p>;

  return (
    <div className="search-results-page">
      <h2 className="mb-4">Resultados de búsqueda para: {query}</h2>
      <ListGroup>
        {results.length > 0 ? (
          results.map((result) => (
            <ListGroup.Item key={result.id} className="d-flex justify-content-between align-items-center">
              <span>
                {result.name} ({result.type})
              </span>
              <Button variant="primary" onClick={() => goToResult(result)}>
                Ver {result.type}
              </Button>
            </ListGroup.Item>
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </ListGroup>
    </div>
  );
};

export default SearchResults;
