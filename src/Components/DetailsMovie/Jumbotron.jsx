import PropType from "prop-types";
import axios from "axios";
import { useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { Container, Card, Overlay, Button, Modal } from "react-bootstrap";
import styles from "./style.module.css";

function Jumbotron({ id, title, release_date, genres, overview, vote_average, imageURL }) {
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const openTrailerModal = async () => {
    try {
      const token = localStorage.getItem("token");

      // If the token is not exist in the local storage
      if (!token) return;
      const response = await axios.get(`${import.meta.env.VITE_API_AUTH_URL}/api/v1/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const closeTrailerModal = () => {
    setShowTrailer(false);
  };

  return (
    <>
      <Container fluid="0">
        <Card className={styles["img-backdrop"]}>
          <Card.Img src={imageURL} alt={id} />

          <Overlay show={true} target={(ref) => ref && ref.parentElement} placement="top">
            <div className={styles["content"]}>
              <h1>{title}</h1>
              Genre: <b>{genres}</b>
              <h5 className="mt-3">
                <b>Synopsis</b>
              </h5>
              <p>{overview}</p>
              <p>
                Release date: <b>{release_date}</b>
              </p>
              <p>
                ⭐<b>{vote_average}</b>
              </p>
              <Button
                variant="danger"
                className="rounded-pill"
                size="lg"
                onClick={() => openTrailerModal()}
              >
                <BsPlayCircle className="me-2" />
                <b>WATCH NOW</b>
              </Button>
              <Modal show={showTrailer} onHide={closeTrailerModal} size="lg" centered>
                <Modal.Header closeButton>
                  <Modal.Title>{title}</Modal.Title>
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
              </Modal>
            </div>
          </Overlay>
        </Card>
      </Container>
    </>
  );
}

Jumbotron.propTypes = {
  id: PropType.number.isRequired,
  title: PropType.string.isRequired,
  release_date: PropType.string.isRequired,
  genres: PropType.array.isRequired,
  overview: PropType.string.isRequired,
  vote_average: PropType.number.isRequired,
  imageURL: PropType.string.isRequired,
};

export default Jumbotron;
