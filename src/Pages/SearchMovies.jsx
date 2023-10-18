/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../Components/Home-2/MovieCard";

const SearchMovies = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  const query = searchParams.get("query");
  let page = searchParams.get("page");

  useEffect(() => {
    const getSearchMovie = async (page = 1) => {
      try {
        // Get token from local storage
        const token = localStorage.getItem("token");
        if (!token) return;

        // Get the data from API with query and page variable
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/search/movie?page=${page}&query=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set state for the movies that have been searched
        const { data } = response.data;
        console.log(data);
        setMovies(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            ...errors,
            isError: true,
            message: error?.response?.data?.message || error?.message,
          });
          return;
        }
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    };
    getSearchMovie();
  }, [query, page]);

  console.log(movies);

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
          {movies.map((search) => (
            <Col key={search.id}>
              <MovieCard
                id={search.id}
                imageURL={import.meta.env.VITE_API_IMG_URL + search?.poster_path}
                overview={search?.overview}
                title={search?.title}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchMovies;
