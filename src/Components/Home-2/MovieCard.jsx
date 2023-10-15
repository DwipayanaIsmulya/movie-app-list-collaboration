import { Link } from "react-router-dom";
import PropType from "prop-types";
import { Container, Card } from "react-bootstrap";
import styles from "./home2.module.css";

function MovieCard({ id, title, imageURL }) {
  return (
    <>
      <Container fluid="0" className="my-3">
        <Card as={Link} to={`/details/${id}/${title}`} className={styles["card"]}>
          <Card.Img src={imageURL} />
        </Card>
      </Container>
    </>
  );
}

MovieCard.propTypes = {
  id: PropType.number.isRequired,
  title: PropType.string.isRequired,
  imageURL: PropType.string.isRequired,
};

export default MovieCard;
