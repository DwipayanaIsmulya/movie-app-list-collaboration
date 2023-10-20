import { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Alert,
} from "react-bootstrap";
import GoogleLogin from "../Components/Login/GoogleLogin";
import Particle from "../Components/Particles/Particle";
import styles from "../Components/Login/styles.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const login = async (event) => {
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

      // Redirect to home or reload the home
      // This is a temporary solution, the better solution is using redux
      window.location.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error?.response?.data?.message);
        return;
      }

      setErrors(error?.message);
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
                  Login to{" "}
                  <span style={{ color: "	#c1071e", fontWeight: "800" }}>
                    MOVIELIST
                  </span>
                  !
                </h1>
                <h5 className="my-3">
                  Please enter your{" "}
                  <span style={{ color: "	#c1071e" }}>login information</span> to
                  Access more Movies.
                </h5>
              </Card.Body>
            </Col>
            <Col>
              <Card.Body className="border border-2 rounded">
                <Form onSubmit={login}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
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
                  <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      style={{ height: "45px" }}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    {errors && (
                      <Alert
                        variant="danger"
                        style={{
                          fontSize: "14px",
                          marginTop: "10px",
                          padding: "10px",
                        }}
                      >
                        {errors}!
                      </Alert>
                    )}
                  </Form.Group>
                  <Form.Group className="mt-1" controlId="formBasicCheckbox">
                    <Row>
                      <Col>
                        <Form.Check
                          type="checkbox"
                          label="Remember me"
                          style={{
                            fontSize: "14px",
                            marginTop: "3px",
                            color: "GrayText",
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
                  </Form.Group>
                  <Button
                    variant="danger"
                    type="submit"
                    style={{ width: "100%", height: "45px" }}
                    className="mt-2"
                  >
                    Sign In
                  </Button>
                </Form>
                <p className="text-center my-2">OR</p>
                <div className="mb-3">
                  <GoogleLogin buttonText={<FcGoogle fontSize="18px" />} />
                </div>
                <div>
                  <Button
                    style={{
                      width: "100%",
                      height: "45px",
                      backgroundColor: "#3b5998",
                    }}
                  >
                    {<BsFacebook color="#fff" fontSize="17px" />} Sign in with
                    FaceBook
                  </Button>
                </div>
                <hr />
                <div className="d-flex justify-content-center">
                  <span style={{ fontSize: "15px", color: "GrayText" }}>
                    New to Movielist?
                  </span>
                  <Link
                    to="/register"
                    style={{
                      textDecoration: "none",
                      color: "#dc3545",
                      fontSize: "14px",
                      paddingLeft: "4px",
                    }}
                  >
                    Sign up now
                  </Link>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default Login;
