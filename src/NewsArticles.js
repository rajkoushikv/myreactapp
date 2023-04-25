import React, { useState, useEffect } from "react";
import { Col, Card, Badge, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewsArticles = () => {
  const [data, setData] = useState({ articles: [] });
  const [refresh, setRefresh] = useState(false);

  const fetchData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY&pageSize=5`);
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const jsonData = JSON.parse(xhr.responseText);
          setData(jsonData);
          setRefresh(true);
          setTimeout(function () {
            setRefresh(false);
          }, 5000);
        } else {
          console.log('Error:', xhr.statusText);
        }
      }
    };
    xhr.send();
  };
  
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <Col md={4} style={{ maxHeight: "1100px" }}>
      <Row>
        <Col md={12}>
          <Link
            to="/"
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "1.5vh",
              marginBottom: "25px",
            }}
          >
            Home
          </Link>

          <h2
            className="text-center"
            style={{
              backgroundColor: "#ccc",
              padding: "1vh",
              marginBottom: "10px",
            }}
          >
            News Articles
          </h2>
          <h5 className="text-center">{refresh ? <img src="refresh.gif" alt="refreshnews"></img> : ""}</h5>
        </Col>
      </Row>
      <Col
        className="news"
        md={12}
        style={{ overflowY: "scroll", maxHeight: "685px" }}
      >
        {data.articles.map((newspost, index) => (
          <Card key={index} className="mb-3">
            <Card.Img variant="top" height={125} src={newspost.urlToImage} />
            <Card.Body>
              <Card.Title as="h5">
                <a href={newspost.url} target="_blank" rel="noreferrer">
                  {newspost.title}
                </a>
              </Card.Title>
              <br />
              <Card.Subtitle className="mb-2 text-muted">
                <Badge bg="secondary" className="me-1">
                  {new Date(newspost.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Badge>
                <Badge bg="secondary">{newspost.author}</Badge>
              </Card.Subtitle>
              <Card.Text>{newspost.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Col>
  );
};

export default NewsArticles;
