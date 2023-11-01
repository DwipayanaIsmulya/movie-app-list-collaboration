import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Card, Col, Container, Row, Button } from "react-bootstrap";
import { BsCollectionPlay, BsPencilSquare } from "react-icons/bs";
import {
  FaUserCircle,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getMe, logout } from "../redux/actions/authActions";

function MyProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

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
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card
          className="w-100"
          style={{
            boxShadow:
              "0 6px 10px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05)",
          }}
        >
          <Card.Body className="p-4">
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
                    margin: "3px",
                  }}
                >
                  <BsCollectionPlay className="mx-2" size="20px" />
                  Member since October 2023
                </p>
                <Col className="d-flex justify-content-center align-items-center">
                  <p
                    style={{
                      color: "grey",
                      fontSize: "14px",
                      margin: "0 5px",
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
                  <Button variant="danger" onClick={onlogout} className="w-50">
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
        </Card>
      </Container>
    </>
  );
}

export default MyProfile;
