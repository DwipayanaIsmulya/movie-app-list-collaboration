import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner, Container } from "react-bootstrap";
import Jumbotron from "../Components/DetailsMovie.jsx/Jumbotron";

function DetailsMovies() {
  const [detailsMovies, setDetailsMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const { movieId, movieTitle } = useParams();

  useEffect(() => {
    const getDetailsMovies = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }3/movie/${movieId}?/${movieTitle}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          },
          {
            params: {
              language: "en-US",
              append_to_response: "videos",
            },
          }
        );
        const { data } = response;

        console.log([data]);
        setDetailsMovies([data]);
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

    getDetailsMovies();
  }, [errors, movieId, movieTitle]);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (detailsMovies.length === 0) {
    return (
      <div className="d-flex flex-row justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Container fluid="0">
        {detailsMovies.map((movie) => (
          <>
            <Jumbotron
              key={movie.id}
              id={movie.id}
              imageURL={import.meta.env.VITE_API_IMG_URL + movie?.backdrop_path}
              title={movie?.title}
              genres={movie.genres.map((genre) => (
                <p key={genre.id} className="d-inline pe-1">
                  {genre.name}
                </p>
              ))}
              overview={movie?.overview}
              vote_average={movie?.vote_average}
              release_date={movie?.release_date}
              trailerKey={movie?.videos?.results[0]?.key}
            />
          </>
        ))}
      </Container>
    </>
  );
}

export default DetailsMovies;
