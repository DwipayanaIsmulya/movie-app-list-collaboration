/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../Components/Home-2/MovieCard";

const SearchMovies = () => {
  // Create state for movies that have been searched
  const [movies, setMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getSearchMovies = async () => {
      try {
        const query = searchParams.get("query");
        // const page = searchParams.get("page");

        // Get the data from API with query and page variable
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }3/search/movie?query=${query}&page=1&include_adult=false&language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );

        const { data } = response;

        // Set state for the movie that have been searched
        console.log(data);
        setMovies(data.results);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            ...errors,
            isError: true,
            message: error?.response?.data?.status_message || error?.message,
          });
          return;
        }

        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    };

    getSearchMovies();
  }, [errors, searchParams]);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (movies.length === 0) {
    return (
      <div className="d-flex flex-row justify-content-center align-items-center vh-100">
        <h1>Result not found for "{searchParams.get("query")}"</h1>
      </div>
    );
  }

  // Foreach or map every object of movies array
  return (
    <>
      <Container fluid className="p-3" style={{ marginTop: "80px" }}>
        <Row>
          <Col>
            <h3>Search Result for "{searchParams.get("query")}"</h3>
          </Col>
        </Row>
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard
                id={movie.id}
                imageURL={import.meta.env.VITE_API_IMG_URL + movie?.poster_path}
                overview={movie?.overview}
                title={movie?.title}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchMovies;
