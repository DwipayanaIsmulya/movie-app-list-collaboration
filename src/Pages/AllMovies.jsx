// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { BsArrowDown } from "react-icons/bs";
// import { Spinner, Container, Row, Col } from "react-bootstrap";
// import MovieCard from "../Components/Home-2/MovieCard";

// function AllMovies() {
//   const [allMovies, setAllMovies] = useState([]);
//   const [errors, setErrors] = useState({
//     isError: false,
//     message: null,
//   });

//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkZhaG1pIEFsZmFyZXphIiwiZW1haWwiOiJmYWxmYXJlemExQGJpbmFyYWNhZGVteS5vcmciLCJpYXQiOjE2OTMxODEzMTV9.ki5wCImtVV7qOhzZHf5A4RuxcU7XcAdMQ5QLVTe_6zY";
//   // Simpan token di local storage
//   localStorage.setItem("token", token);

//   useEffect(() => {
//     const getAllMovies = async () => {
//       const params = { page: 1 };
//       try {
//         // Get token from local storage
//         const token = localStorage.getItem("token");

//         // If the token is not exist in the local storage
//         if (!token) return;
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/api/v1/movie/popular?language=en-US&page=1`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//           { params }
//         );
//         const { data } = response;

//         console.log(data?.results);
//         setAllMovies(data?.results);
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

//     getAllMovies();
//   }, [errors]);

//   // useEffect(() => {
//   //   const getAllMovies = async () => {
//   //     const params = { page: 1 };
//   //     try {
//   //       const response = await axios.get(
//   //         `${import.meta.env.VITE_API_BASE_URL}3/movie/popular?language=en-US&page=1`,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
//   //           },
//   //         },
//   //         { params }
//   //       );
//   //       const { data } = response;

//   //       console.log(data?.results);
//   //       setAllMovies(data?.results);
//   //     } catch (error) {
//   //       if (axios.isAxiosError(error)) {
//   //         setErrors({
//   //           ...errors,
//   //           isError: true,
//   //           message: error?.response?.data?.status_message || error?.message,
//   //         });
//   //         return;
//   //       }

//   //       alert(error?.message);
//   //       setErrors({
//   //         ...errors,
//   //         isError: true,
//   //         message: error?.message,
//   //       });
//   //     }
//   //   };

//   //   getAllMovies();
//   // }, [errors]);

//   if (errors.isError) {
//     return <h1>{errors.message}</h1>;
//   }

//   if (allMovies.length === 0) {
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
//       <Container fluid className="p-3" style={{ marginTop: "70px" }}>
//         <Link to="/all-movie" style={{ textDecoration: "none", color: "red" }}>
//           See All Movies {<BsArrowDown />}
//         </Link>
//         <Row>
//           {allMovies.map((movie) => (
//             <Col key={movie.id}>
//               <MovieCard
//                 id={movie.id}
//                 imageURL={import.meta.env.VITE_API_IMG_URL + movie?.poster_path}
//               />
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default AllMovies;
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsArrowDown } from "react-icons/bs";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import MovieCard from "../Components/Home-2/MovieCard";

function AllMovies() {
  const [allMovies, setAllMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkZhaG1pIEFsZmFyZXphIiwiZW1haWwiOiJmYWxmYXJlemExQGJpbmFyYWNhZGVteS5vcmciLCJpYXQiOjE2OTMxODEzMTV9.ki5wCImtVV7qOhzZHf5A4RuxcU7XcAdMQ5QLVTe_6zY";
  // Simpan token di local storage
  localStorage.setItem("token", token);

  useEffect(() => {
    const getAllMovie = async () => {
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

        setAllMovies(data);
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

    getAllMovie();
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
