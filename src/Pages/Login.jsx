import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import GoogleLogin from "../Components/Login/GoogleLogin";
import Particle from "../Components/Particles/Particle";
import styles from "../Components/Login/styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/loginActions";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const [showToast, setShowToast] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    dispatch(login(email, password, navigate, setErrors, errors));
    setShowToast(true);
  };

  return (
    <>
      <Particle />
      <ToastContainer position="top-end">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={4500}
          autohide
          bg="warning"
        >
          <Toast.Body>{errors.message}!</Toast.Body>
        </Toast>
      </ToastContainer>
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
              <Card.Body
                className="border border-2 rounded"
                style={{
                  boxShadow:
                    "0 6px 10px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05)",
                }}
              >
                <Form onSubmit={onSubmit}>
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
