/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../Components/Home-2/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { getSearchMovies } from "../redux/actions/searchActions";

const SearchMovies = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  let page = searchParams.get("page");

  const dispatch = useDispatch();

  const { search } = useSelector((state) => state.search);

  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    dispatch(getSearchMovies(setErrors, errors, query, page));
  }, [dispatch, errors, query, page, searchParams]);

  if (search.length === 0) {
    return (
      <div className="d-flex flex-row justify-content-center align-items-center vh-100">
        <h1>Result not found for "{searchParams.get("query")}"</h1>
      </div>
    );
  }

  // console.log(search);
  // Foreach or map every object of movies array
  return (
    <>
      <Container fluid className="p-3" style={{ marginTop: "80px" }}>
        <Row>
          <Col>
            <h3>
              Result for <span>{searchParams.get("query")}</span>
            </h3>
          </Col>
        </Row>
        <Row>
          {search.map((searchMov) => (
            <Col key={searchMov.id}>
              <MovieCard
                id={searchMov.id}
                imageURL={import.meta.env.VITE_API_IMG_URL + searchMov?.poster_path}
                overview={searchMov?.overview}
                title={searchMov?.title}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchMovies;
