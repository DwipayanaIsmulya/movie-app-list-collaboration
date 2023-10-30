import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsArrowDown } from "react-icons/bs";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import MovieCard from "../Components/Home-2/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovie } from "../redux/actions/allMovieActions";

const AllMovies = () => {
  const dispatch = useDispatch();

  const { allMovie } = useSelector((state) => state.seeAll);

  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    dispatch(getAllMovie(setErrors, errors));
  }, [dispatch, errors]);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (allMovie.length === 0) {
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
      <Container fluid className="p-3" style={{ marginTop: "70px" }}>
        <Link to="/all-movie" style={{ textDecoration: "none", color: "red" }}>
          See All Movies {<BsArrowDown />}
        </Link>
        <Row>
          {allMovie.map((movie) => (
            <Col key={movie.id}>
              <MovieCard
                id={movie.id}
                imageURL={import.meta.env.VITE_API_IMG_URL + movie?.poster_path}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllMovies;
