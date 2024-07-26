import { Row, Col, Card } from 'react-bootstrap';

export default function Highlight() {
  return (
    <Row className="mt-3 mb-3">
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>Premium Pet Foods</h2>
            </Card.Title>
            <Card.Text>
              Discover a wide range of high-quality pet foods that your furry friends will love. We offer the best ingredients to ensure your pets are happy and healthy. Shop now for premium selections that cater to all dietary needs.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>Natural Ingredients</h2>
            </Card.Title>
            <Card.Text>
              Our pet foods are made with 100% natural ingredients. No fillers or artificial additives—just wholesome nutrition that pets crave. Choose from our variety of natural options to give your pets the best.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>Join Our Pet Lovers Community</h2>
            </Card.Title>
            <Card.Text>
              Become part of a community that shares your passion for pets. Enjoy exclusive offers, pet care tips, and connect with other pet owners. Sign up today and stay updated with our latest news and promotions.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
