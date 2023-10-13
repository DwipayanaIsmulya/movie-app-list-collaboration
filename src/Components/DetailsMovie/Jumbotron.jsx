import PropType from "prop-types";
import { useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { Container, Card, Overlay, Button, Modal } from "react-bootstrap";
import styles from "./style.module.css";

function Jumbotron({
  id,
  title,
  release_date,
  genres,
  overview,
  vote_average,
  imageURL,
  trailerKey,
}) {
  const [showTrailer, setShowTrailer] = useState(false);

  // Fungsi untuk membuka modal trailer
  const openTrailerModal = () => {
    setShowTrailer(true);
  };

  // Fungsi untuk menutup modal trailer
  const closeTrailerModal = () => {
    setShowTrailer(false);
  };

  return (
    <>
      <Container fluid="0">
        <Card className={styles["img-backdrop"]}>
          <Card.Img src={imageURL} alt={id} />

          <Overlay
            show={true}
            target={(ref) => ref && ref.parentElement}
            placement="top"
          >
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
                onClick={openTrailerModal}
              >
                <BsPlayCircle className="me-2" />
                <b>WATCH NOW</b>
              </Button>
              <Modal
                show={showTrailer}
                onHide={closeTrailerModal}
                size="lg"
                centered
              >
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
                <Modal.Footer></Modal.Footer>
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
  trailerKey: PropType.string,
};

export default Jumbotron;
