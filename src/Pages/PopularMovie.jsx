import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import { Spinner, Container, Col, Row } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import MovieCard from "../Components/Home-2/MovieCard";

function PopularMovie() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  const options = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    dots: true,
    nav: false,
    // navText: ["next", "prev"],
    controlsClass: "owl-controls",
    margin: 20,
    responsive: {
      1100: {
        items: 4,
      },
      724: {
        items: 3,
      },
      500: {
        items: 2,
      },
      400: {
        items: 2,
        dots: false,
        innerWidth: "50%",
        outerWidth: "50%",
      },
      370: {
        items: 1,
        dots: false,
        innerWidth: "100%",
        outerWidth: "100%",
      },
    },
  };

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        // Get token from local storage
        const token = localStorage.getItem("token");

        // If the token is not exist in the local storage
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/movie/popular`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response.data;

        setPopularMovies(data);
        setErrors({ ...errors, isError: false });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            ...errors,
            isError: true,
            message: error?.response?.data?.message || error?.message,
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

    getPopularMovies();
  }, []);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (popularMovies.length === 0) {
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
      <Container fluid className="mt-5">
        <Row>
          <Col>
            <h2 style={{ fontWeight: 800, marginTop: "50px" }}>
              Popular Movies
            </h2>
          </Col>
          <Col className="d-flex justify-content-end align-items-end">
            <Link
              to="/all-movie"
              style={{
                textDecoration: "none",
                color: "red",
              }}
            >
              See All Movies {<BsArrowRight />}
            </Link>
          </Col>
        </Row>
        <OwlCarousel
          className="owl-theme"
          // navContainerClass={styles["owl-nav"]}
          // navClass={styles[["owl-prev", "owl-next"]]}
          {...options}
        >
          {popularMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              imageURL={import.meta.env.VITE_API_IMG_URL + movie?.poster_path}
              overview={movie?.overview}
              title={movie?.title}
            />
          ))}
        </OwlCarousel>
      </Container>
    </>
  );
}

export default PopularMovie;
