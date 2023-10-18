
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { BsSearch, BsPersonCircle } from "react-icons/bs";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./navbar.module.css";

function Header() {
  const [navbar, setNavbar] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search/?query=${query}`);
  };

  const logout = (event) => {
    event.preventDefault();

    localStorage.removeItem("token");

    // Redirect to home or reload the home
    // This is temporary solution, the better solution is using redux
    window.location.replace("/");
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_AUTH_URL}/api/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data } = response.data;

        // Set the user state from API data
        setUser(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If token is not valid
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            return;
          }

          alert(error?.response?.data?.message);
          return;
        }

        alert(error?.message);
      }
    };

    getMe();
  }, []);

  return (
    <>
      <Navbar
        expand="md"
        className={navbar ? styles["navbar-active"] : styles["navbar"]}
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <h1 style={{ color: "	#c1071e", fontWeight: "800" }}>MOVIELIST</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledb
            y={`offcanvasNavbarLabel-expand`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand`}
                as={Link}
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                <h1>MOVIELIST</h1>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1">
                <Form onSubmit={handleSearch} style={{ width: "50%" }}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      value={query}
                      placeholder="Search any movies"
                      aria-label="search"
                      className="bg-transparent border-danger rounded-pill"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <Button
                      type="submit"
                      className="bg-transparent border-0 rounded-pill"
                      style={{ translate: -50 }}
                      onClick={handleSearch}
                    >
                      <BsSearch color="red" />
                    </Button>
                  </InputGroup>
                </Form>
              </Nav>
              <br />
              <Nav className="justify-content-center pe-2">
                <div className="d-flex">

                  <Button
                    variant="outline-danger"
                    className="me-3 rounded-pill"
                    style={{ width: "100%" }}
                  >
                    Login
                  </Button>
                  <Button variant="danger" className="rounded-pill" style={{ width: "100%" }}>
                    Register
                  </Button>

                  {user ? (
                    <>
                      <NavDropdown
                        title={
                          user ? (
                            <>
                              <BsPersonCircle
                                className="me-1"
                                style={{ fontSize: "20px" }}
                              />{" "}
                              {user.name}
                            </>
                          ) : (
                            <BsPersonCircle className="me-2" />
                          )
                        }
                        menuVariant="dark"
                        style={{ width: "100%" }}
                      >
                        <NavDropdown.Item as={Link} to="/myprofile">
                          My Profile
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} onClick={logout}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Button
                      as={Link}
                      to="/login"
                      variant="outline-danger"
                      className="me-3 rounded-pill"
                      style={{ width: "100%" }}
                    >
                      Login
                    </Button>
                  )}

                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
