import {
  Container,
  Navbar,
  Nav,
  Offcanvas,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";

function Header() {
  const [navbar, setNavbar] = useState(false);
  const [query, setQuery] = useState("");

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

  return (
    <>
      <Navbar
        expand="md"
        className={navbar ? styles["navbar-active"] : styles["navbar"]}
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <h1 style={{ color: "red", fontWeight: "800" }}>MOVIELIST</h1>
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
                <Form onSubmit={handleSearch} style={{ width: "100%" }}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      value={query}
                      placeholder="What do you want to watch?"
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
                  <Button
                    variant="danger"
                    className="rounded-pill"
                    style={{ width: "100%" }}
                  >
                    Register
                  </Button>
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
