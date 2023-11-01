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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe, logout } from "../../redux/actions/authActions";
import styles from "./navbar.module.css";

function Header() {
  const [navbar, setNavbar] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

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

  const onlogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      dispatch(getMe(navigate, null, "/login"));
    }
  }, [dispatch, navigate, token]);

  return (
    <>
      {user && (
        <Navbar
          expand="md"
          className={navbar ? styles["navbar-active"] : styles["navbar"]}
          fixed="top"
        >
          <Container fluid className="mx-4">
            <Navbar.Brand href="/">
              <h1 style={{ color: "	#c1071e", fontWeight: "800" }}>MOVIELIST</h1>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand`}
              aria-labelledby
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
                  <Form onSubmit={handleSearch} className="d-flex w-75">
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
                <Nav>
                  {user ? (
                    <>
                      <NavDropdown
                        title={
                          user ? (
                            <>
                              <BsPersonCircle className="me-1" style={{ fontSize: "20px" }} />
                              {user.name}
                            </>
                          ) : (
                            <BsPersonCircle className="me-2" />
                          )
                        }
                        menuVariant="dark"
                      >
                        <NavDropdown.Item as={Link} to="/myprofile">
                          My Profile
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Button} onClick={onlogout}>
                          Sign Out
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
                      Sign In
                    </Button>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default Header;
