import { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import GoogleLogin from "../Components/GoogleLogin/GoogleLogin";
import Particle from "../Components/Particles/Particle";
import styles from "../Components/GoogleLogin/styles.module.css";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    // Prevent default is to prevent the default behavior
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      const { data } = response.data;
      const { token } = data;

      // Save our token
      localStorage.setItem("token", token);

      // Redirect to home
      // navigate("/");

      // Redirect to home or reload the home
      // This is temporary solution, the better solution is using redux
      window.location.replace("/");
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
          <Card.Body>
            <Form onSubmit={login} className="mb-4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  <h3 style={{ fontWeight: "800" }}>Sign In</h3>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  style={{ height: "45px" }}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  style={{ height: "45px" }}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <Button
                variant="danger"
                type="submit"
                style={{ width: "100%" }}
                className="mt-2"
              >
                Sign In
              </Button>
              <Form.Group className="mt-1" controlId="formBasicCheckbox">
                <Row>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      style={{
                        fontSize: "14px",
                        marginTop: "3px",
                      }}
                    />
                  </Col>
                  <Col className="d-flex justify-content-end align-items-start">
                    <Form.Text
                      as={Link}
                      style={{
                        fontSize: "13px",
                        textDecoration: "none",
                      }}
                    >
                      Forgot password?
                    </Form.Text>
                  </Col>
                </Row>
                <hr />
              </Form.Group>
            </Form>
            <div className="mb-3">
              <GoogleLogin buttonText={<FcGoogle fontSize="18px" />} />
            </div>
            <div>
              <Button variant="primary" style={{ width: "100%" }}>
                {<BsFacebook color="#fff" fontSize="17px" />} Sign in with
                FaceBook
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;
