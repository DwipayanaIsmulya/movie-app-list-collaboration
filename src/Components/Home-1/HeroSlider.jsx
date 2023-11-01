import { useState, useEffect } from "react";
import axios from "axios";
import { BsPlayCircle } from "react-icons/bs";
import {
  Spinner,
  Carousel,
  Button,
  Container,
  Image,
  Modal,
} from "react-bootstrap";
import styles from "./home1.module.css";
import { useDispatch, useSelector } from "react-redux";
import { heroMovieSlider } from "../../redux/actions/heroActions";

const HeroSlider = () => {
  const dispatch = useDispatch();

  const { hero } = useSelector((state) => state.hero);

  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    dispatch(heroMovieSlider(setErrors, errors));
  }, []);

  const openTrailerModal = async (movie) => {
    setSelectedMovie(movie);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/movie/${movie.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response.data;

      if (data) {
        setTrailerKey(data.videos[0].key);
        setShowTrailer(true);
      } else {
        setShowTrailer(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors({
          ...errors,
          isError: true,
          message: error?.response?.data?.message || error?.message,
        });
      } else {
        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    }
  };

  const closeTrailerModal = () => {
    setSelectedMovie(null);
    setShowTrailer(false);
  };

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (hero.length === 0) {
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
        <Carousel controls={false} interval={4000}>
          {hero.map((movie) => (
            <Carousel.Item key={movie.id}>
              <div className={styles["img-backdrop"]}>
                <Image
                  src={`${import.meta.env.VITE_API_IMG_BACKDROP_URL}${
                    movie?.backdrop_path
                  }`}
                  style={{ width: "100%" }}
                />
              </div>
              <Carousel.Caption className="p-0">
                <div className={styles["content"]}>
                  <h1>{movie.title}</h1>
                  <p>{movie.overview}</p>
                  <Button
                    variant="danger"
                    className="rounded-pill"
                    size="lg"
                    onClick={() => openTrailerModal(movie)}
                  >
                    <BsPlayCircle className="me-2" />
                    <b>WATCH TRAILER</b>
                  </Button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <Modal show={showTrailer} onHide={closeTrailerModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMovie?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder="0"
              allowFullScreen
              title="Movie Trailer"
            ></iframe>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default HeroSlider;
