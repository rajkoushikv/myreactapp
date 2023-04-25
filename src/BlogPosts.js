import { Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogPosts = ({ posts }) => {

  return (
    <Col md={8} style={{ maxHeight: "1100px" }}>
      <h2
        className="text-center"
        style={{ backgroundColor: "#ccc", padding: "1vh" }}
      >
        Blog Posts
      </h2>
      <Row>
        {posts.map((post) => (
          <Col sm={12} md={6} className="mt-2 mb-2" key={post.index}>
            <Card className="my-1">
              <Card.Img variant="top" height={125} src={post.image_path} />
              <Card.Body>
                <Card.Title as="h5">
                  <Link to={`/Post/${post.index}`}>{post.title}</Link>
                </Card.Title>
                <br />
                <Card.Subtitle as="h5" className="mb-2 text-muted">
                  <Badge bg="secondary" className="me-1">
                    {post.date}
                  </Badge>
                  <Badge bg="secondary">{post.author}</Badge>
                </Card.Subtitle>
                <Card.Text>{post.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default BlogPosts;
