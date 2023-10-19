import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Card, Col, Container, Row, Button } from "react-bootstrap";
import { BsCollectionPlay, BsPencilSquare } from "react-icons/bs";
import {
  FaUserCircle,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

function MyProfile() {
  const [user, setUser] = useState(null);

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
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="w-100">
          <hr />
          <Card.Body>
            <Row>
              <Col>
                <p className="text-center">
                  <FaUserCircle size="100px" color="grey" />
                </p>
                <h5 className="text-center">{user?.name}</h5>
                <p
                  style={{
                    color: "grey",
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  <BsCollectionPlay className="me-1" size="20px" />
                  Member since October 2023
                </p>
                <Col className="d-flex justify-content-center align-items-center">
                  <p
                    style={{
                      color: "grey",
                      fontSize: "14px",
                    }}
                  >
                    Connect with
                  </p>
                  <Button variant="outline-danger" className="border-0">
                    <FaInstagram style={{ fontSize: "22px" }} />
                  </Button>
                  <Button variant="outline-danger" className="border-0">
                    <FaFacebook style={{ fontSize: "22px" }} />
                  </Button>
                  <Button variant="outline-danger" className="border-0">
                    <FaTwitter style={{ fontSize: "22px" }} />
                  </Button>
                </Col>
                <Col className="my-3 d-flex justify-content-center">
                  <Button
                    variant="danger"
                    as={Link}
                    to="/login"
                    className="w-50"
                  >
                    <BiLogOut className="me-1" />
                    Sign Out
                  </Button>
                </Col>
              </Col>
              <Col>
                <h2>My Profile</h2>
                <hr />
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Text>Name</Form.Text>
                      <Form.Control
                        type="text"
                        placeholder={user?.name}
                        aria-label="Disabled input example"
                        disabled
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Text>Email Address</Form.Text>
                      <Form.Control
                        type="email"
                        placeholder={user?.email}
                        aria-label="Disabled input example"
                        disabled
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Text>Location</Form.Text>
                      <Form.Control
                        type="text"
                        placeholder="Indonesia"
                        aria-label="Disabled input example"
                        disabled
                        readOnly
                      />
                    </Form.Group>
                    <Form.Text>Phone Number</Form.Text>
                    <Form.Control
                      type="text"
                      placeholder="628123456789"
                      aria-label="Disabled input example"
                      disabled
                      readOnly
                    />
                  </Col>
                </Row>
                <Button variant="outline-danger" className="my-4 w-100">
                  {<BsPencilSquare className="me-1" />}Edit Profile
                </Button>
              </Col>
            </Row>
          </Card.Body>
          <hr />
        </Card>
      </Container>
    </>
  );
}

export default MyProfile;
