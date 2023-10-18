import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

function Footer() {
  return (
    <Container fluid className="border border-1" style={{ marginTop: "100px" }}>
      <Container>
        <Row className="m-4 p-4 d-flex justify-content-center align-items-start">
          <Col xs={12} md={3}>
            <Link style={{ fontSize: "26px", marginRight: "30px" }}>
              <BsFacebook color="gray" />
            </Link>
            <Link style={{ fontSize: "26px", marginRight: "30px" }}>
              <BsInstagram color="gray" />
            </Link>
            <Link style={{ fontSize: "26px" }}>
              <BsTwitter color="gray" />
            </Link>
            <Link style={{ textDecoration: "none", color: "gray" }}>
              <p>Audio Description</p>
            </Link>
            <Link style={{ textDecoration: "none", color: "gray" }}>
              <p>Investor Relations</p>
            </Link>
            <Link style={{ textDecoration: "none", color: "gray" }}>
              <p>Illegal Information</p>
            </Link>
            <Link style={{ textDecoration: "none", color: "gray" }}>
              <p>Service Code</p>
            </Link>
          </Col>
          <Col xs={12} md={3}>
            <Link style={{ textDecoration: "none", color: "gray" }}>
              <p>Help Center</p>
            </Link>
            <Link style={{ textDecoration: "none", color: "gray" }}>
              <p>Job Vacancy</p>
            </Link>
            <Link style={{ textDecoration: "none", color: "gray" }}>
              <p>Cookie Preferences</p>
            </Link>
          </Col>
          <Col xs={12} md={3}>
            <Link style={{ textDecoration: "none", color: "gray" }}>
              <p>Gift Card</p>
            </Link>
            <Link style={{ textDecoration: "none", color: "gray" }}>
              <p>Terms of Use</p>
            </Link>
            <Link style={{ textDecoration: "none", color: "gray" }}>
              <p>Company Information</p>
            </Link>
          </Col>
          <Col xs={12} md={3}>
            <p
              style={{
                color: "gray",
                fontSize: "12px",
                textAlign: "end",
              }}
            >
              @ Copyrigth by Ariantika X Team 4 2023
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Footer;
