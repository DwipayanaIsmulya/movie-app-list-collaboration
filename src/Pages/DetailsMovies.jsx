import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner, Container } from "react-bootstrap";
import Jumbotron from "../Components/DetailsMovie/Jumbotron";

const DetailsMovies = () => {
  const [detailsMovies, setDetailsMovies] = useState();
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const { movieId, movieTitle } = useParams();

  useEffect(() => {
    const getDetailsMovies = async () => {
      try {
        // Get token from local storage
        const token = localStorage.getItem("token");

        // If the token is not exist in the local storage
        if (!token) return;
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response.data;

        setDetailsMovies(data);
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

  if (!detailsMovies) {
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
        <>
          <Jumbotron
            key={detailsMovies.id}
            id={detailsMovies.id}
            imageURL={
              import.meta.env.VITE_API_IMG_BACKDROP_URL +
              detailsMovies?.backdrop_path
            }
            title={detailsMovies?.title}
            genres={detailsMovies.genres?.map((genre) => (
              <p key={genre.id} className="d-inline pe-1">
                {genre.name}
              </p>
            ))}
            overview={detailsMovies?.overview}
            vote_average={detailsMovies?.vote_average}
            release_date={detailsMovies?.release_date}
            // trailerKey={movie?.videos?.results[0]?.key}
          />
        </>
      </Container>
    </>
  );
};

export default DetailsMovies;
