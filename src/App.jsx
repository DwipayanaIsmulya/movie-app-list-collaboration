// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "./Pages/HomePage";
// import PopularMovie from "./Pages/PopularMovie";
// import AllMovies from "./Pages/AllMovies";
// import DetailsMovies from "./Pages/DetailsMovies";
// import SearchMovies from "./Pages/SearchMovies";
// import Header from "./Components/Header/Header";
// import Footer from "./Components/Footer/Footer";

// function App() {

//   return (
//     <>
//       <BrowserRouter>
//         <Header />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="popular-movie" element={<PopularMovie />} />
//           <Route path="all-movie" element={<AllMovies />} />
//           <Route
//             path="/details/:movieId/:movieTitle"
//             element={<DetailsMovies />}
//           />
//           <Route path="/search" element={<SearchMovies />} />

//           {/* The page for not found url path */}
//           <Route
//             path="*"
//             element={
//               <h1 className="d-flex flex-row justify-content-center align-items-center vh-100">
//                 404 Page Not Found
//               </h1>
//             }
//           />
//         </Routes>
//         <Footer />
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PopularMovie from "./Pages/PopularMovie";
import AllMovies from "./Pages/AllMovies";
import DetailsMovies from "./Pages/DetailsMovies";
import SearchMovies from "./Pages/SearchMovies";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Mengambil token dari local storage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      // Jika token tidak tersedia di local storage, Anda bisa set token default di sini.
      // Ini hanya contoh, Anda mungkin ingin menangani ini secara berbeda.
      setToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkZhaG1pIEFsZmFyZXphIiwiZW1haWwiOiJmYWxmYXJlemExQGJpbmFyYWNhZGVteS5vcmciLCJpYXQiOjE2OTMxODEzMTV9.ki5wCImtVV7qOhzZHf5A4RuxcU7XcAdMQ5QLVTe_6zY"
      );
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="popular-movie" element={<PopularMovie/>} />
          <Route path="all-movie" element={<AllMovies token={token} />} />
          <Route path="/details/:movieId/:movieTitle" element={<DetailsMovies token={token} />} />
          <Route path="/search" element={<SearchMovies token={token} />} />

          {/* The page for not found url path */}
          <Route
            path="*"
            element={
              <h1 className="d-flex flex-row justify-content-center align-items-center vh-100">
                404 Page Not Found
              </h1>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
