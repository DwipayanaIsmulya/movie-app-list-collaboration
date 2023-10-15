// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Spinner, Container } from "react-bootstrap";
// import Jumbotron from "../Components/DetailsMovie/Jumbotron";

// function DetailsMovies() {
//   const [detailsMovies, setDetailsMovies] = useState([]);
//   const [errors, setErrors] = useState({
//     isError: false,
//     message: null,
//   });
//   const { movieId, movieTitle } = useParams();

//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkZhaG1pIEFsZmFyZXphIiwiZW1haWwiOiJmYWxmYXJlemExQGJpbmFyYWNhZGVteS5vcmciLCJpYXQiOjE2OTMxODEzMTV9.ki5wCImtVV7qOhzZHf5A4RuxcU7XcAdMQ5QLVTe_6zY";
//   // Simpan token di local storage
//   localStorage.setItem("token", token);

//   useEffect(() => {
//     const getDetailsMovies = async () => {
//       try {
//         const response = await axios.get(
//           `${
//             import.meta.env.VITE_API_BASE_URL
//           }/api/v1/movie/${movieId}?/${movieTitle}?language=en-US`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const { data } = response;

//         console.log([data]);
//         setDetailsMovies([data]);
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           setErrors({
//             ...errors,
//             isError: true,
//             message: error?.response?.data?.status_message || error?.message,
//           });
//           return;
//         }

//         alert(error?.message);
//         setErrors({
//           ...errors,
//           isError: true,
//           message: error?.message,
//         });
//       }
//     };

//     getDetailsMovies();
//   }, [errors, movieId, movieTitle]);

//   if (errors.isError) {
//     return <h1>{errors.message}</h1>;
//   }

//   if (detailsMovies.length === 0) {
//     return (
//       <div className="d-flex flex-row justify-content-center align-items-center vh-100">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Container fluid="0">
//         {detailsMovies.map((movie) => (
//           <>
//             <Jumbotron
//               key={movie.id}
//               id={movie.id}
//               imageURL={import.meta.env.VITE_API_IMG_URL + movie?.backdrop_path}
//               title={movie?.title}
//               genres={movie.genres.map((genre) => (
//                 <p key={genre.id} className="d-inline pe-1">
//                   {genre.name}
//                 </p>
//               ))}
//               overview={movie?.overview}
//               vote_average={movie?.vote_average}
//               release_date={movie?.release_date}
//               // trailerKey={movie?.videos?.results[0]?.key}
//             />
//           </>
//         ))}
//       </Container>
//     </>
//   );
// }

// export default DetailsMovies;

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsArrowDown } from "react-icons/bs";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import MovieCard from "../Components/Home-2/MovieCard";

function AllMovies() {
  const { movieId } = useParams();
  const [allMovies, setAllMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;

        setAllMovies(data?.results);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            isError: true,
            message: error?.response?.data?.status_message || error?.message,
          });
        } else {
          alert(error?.message);
          setErrors({
            isError: true,
            message: error?.message,
          });
        }
      }
    };

    getAllMovies();
  }, []);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (allMovies.length === 0) {
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
          {allMovies.map((movie) => (
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
}

export default AllMovies;
