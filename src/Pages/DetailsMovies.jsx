import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import { Spinner, Container } from "react-bootstrap";
import Jumbotron from "../Components/DetailsMovie/Jumbotron";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsMovie } from "../redux/actions/detailActions";

const DetailsMovies = () => {
  // const [detailsMovies, setDetailsMovies] = useState();

  const dispatch = useDispatch();

  const { details } = useSelector((state) => state.detail);

  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const { movieId } = useParams();

  useEffect(() => {
    dispatch(getDetailsMovie(movieId, setErrors, errors));
  }, [movieId, setErrors, errors]);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (!details) {
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
            key={details.id}
            id={details.id}
            imageURL={import.meta.env.VITE_API_IMG_BACKDROP_URL + details?.backdrop_path}
            title={details?.title}
            genres={details.genres?.map((genre) => (
              <p key={genre.id} className="d-inline pe-1">
                {genre.name}
              </p>
            ))}
            overview={details?.overview}
            vote_average={details?.vote_average}
            release_date={details?.release_date}
            // trailerKey={movie?.videos?.results[0]?.key}
          />
        </>
      </Container>
    </>
  );
};

export default DetailsMovies;
