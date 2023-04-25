import React from "react";
import { useParams } from "react-router-dom";
import { Col, Card, Badge } from "react-bootstrap";

const Post = ({ posts }) => {
  const { postId } = useParams();

  const post = posts.find((post) => post.index === postId);

  if (!post) {
    return <div>Post with ID {postId} not found</div>;
  }

  return (
    <Col md={8} style={{ minHeight: "685px" }}>
      <h3
        className="text-left"
        style={{ backgroundColor: "#ccc", padding: "1vh" }}
      >
        {post.title}
      </h3>
      <Card className="my-3">
        <Card.Img variant="top" src={post.image_path} height={400} />
        <Card.Body>
          <Card.Title className="mb-2 text-muted">
          <h3><Badge bg="secondary" className="me-1">
              {post.date}
            </Badge>
            <Badge bg="secondary">{post.author}</Badge> </h3>
          </Card.Title>
          <br/>
          <Card.Text>{post.text}</Card.Text>
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Post;
