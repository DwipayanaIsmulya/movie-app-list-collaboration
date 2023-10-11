import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PopularMovie from "./Pages/PopularMovie";
import AllMovies from "./Pages/AllMovies";
import DetailsMovies from "./Pages/DetailsMovies";
import SearchMovies from "./Pages/SearchMovies";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="popular-movie" element={<PopularMovie />} />
          <Route path="all-movie" element={<AllMovies />} />
          <Route
            path="/details/:movieId/:movieTitle"
            element={<DetailsMovies />}
          />
          <Route path="/search" element={<SearchMovies />} />

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
