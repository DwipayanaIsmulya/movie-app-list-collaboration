import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PopularMovie from "./Pages/PopularMovie";
import AllMovies from "./Pages/AllMovies";
import DetailsMovies from "./Pages/DetailsMovies";
import SearchMovies from "./Pages/SearchMovies";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MyProfile from "./Pages/MyProfile";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Protected from "./Components/Protected/Protected";
import NoAccessToken from "./Components/Protected/NoAccessToken";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
        >
          <BrowserRouter>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <Protected>
                    <HomePage />
                  </Protected>
                }
              />

              <Route
                path="popular-movie"
                element={
                  <Protected>
                    <PopularMovie />
                  </Protected>
                }
              />

              <Route
                path="all-movie"
                element={
                  <Protected>
                    <AllMovies />
                  </Protected>
                }
              />

              <Route
                path="/details/:movieId/:movieTitle"
                element={
                  <Protected>
                    <DetailsMovies />
                  </Protected>
                }
              />

              <Route
                path="/search"
                element={
                  <Protected>
                    <SearchMovies />
                  </Protected>
                }
              />

              <Route
                path="/myprofile"
                element={
                  <Protected>
                    <MyProfile />
                  </Protected>
                }
              />

              {/* Authentication */}
              <Route
                path="/login"
                element={
                  <NoAccessToken>
                    <Login />
                  </NoAccessToken>
                }
              />
              <Route
                path="/register"
                element={
                  <NoAccessToken>
                    <Register />
                  </NoAccessToken>
                }
              />

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
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}

export default App;
