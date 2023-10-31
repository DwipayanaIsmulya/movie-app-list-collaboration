import { useState } from "react";
import axios from "axios";
import Particle from "../Components/Particles/Particle";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import styles from "../Components/Login/styles.module.css";
import { Link } from "react-router-dom";

const Register = () => {
  // const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = JSON.stringify({
        name,
        email,
        password,
      });

      let config = {
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);

      // navigate("/");

      // Temporary solution
      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.message);
        return;
      }
      alert(error?.message);
    }
  };

  return (
    <>
      <Particle />

      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className={styles["card"]}>
          <Row className="d-flex justify-content-center align-items-center">
            <Col>
              <Card.Body>
                <h1>
                  Welcome to{" "}
                  <span style={{ color: "	#c1071e", fontWeight: "800" }}>
                    MOVIELIST
                  </span>
                  !
                </h1>
                <h5 className="my-3">
                  Create your{" "}
                  <span style={{ color: "	#c1071e" }}>new account</span> to
                  Access more Movies.
                </h5>
              </Card.Body>
            </Col>
            <Col>
              <Card.Body
                className="border border-2 rounded"
                style={{
                  boxShadow:
                    "0 6px 10px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05)",
                }}
              >
                <Form onSubmit={onSubmit} className="mb-4">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      <h3 style={{ fontWeight: "800" }}>Sign Up</h3>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      style={{ height: "45px" }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      style={{ height: "45px" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      style={{ height: "45px" }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    type="submit"
                    style={{ width: "100%" }}
                    className="mb-3"
                  >
                    Sign Up
                  </Button>
                  <hr className="my-1" />
                  <div className="d-flex justify-content-center my-3 ">
                    <span style={{ fontSize: "15px", color: "GrayText" }}>
                      Have Already Account?
                    </span>
                    <Link
                      as={Link}
                      to="/login"
                      style={{
                        textDecoration: "none",
                        color: "#dc3545",
                        fontSize: "14px",
                        paddingLeft: "4px",
                      }}
                    >
                      Sign In now
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default Register;
