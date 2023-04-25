import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Header from "./Header";
import BlogPosts from "./BlogPosts";
import Post from "./Post";
import NewsArticles from "./NewsArticles";
import Footer from "./Footer";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("blog_post_example.xml")
      .then((response) => response.text())
      .then((xml) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");
        const postNodes = xmlDoc.getElementsByTagName("post");
        const parsedPosts = [];

        for (let i = 0; i < postNodes.length; i++) {
          const post = postNodes[i];
          parsedPosts.push({
            index: post.getElementsByTagName("index")[0].textContent,
            title: post.getElementsByTagName("title")[0].textContent,
            date: post.getElementsByTagName("date")[0].textContent,
            author: post.getElementsByTagName("author")[0].textContent,
            image_path: post.getElementsByTagName("image_path")[0].textContent,
            text: post.getElementsByTagName("text")[0].textContent,
            body: post.getElementsByTagName("body")[0].textContent,
          });
        }
        setPosts(parsedPosts);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <Header />
      <br />
      <Container style={{ border: "1px solid black", padding: "25px" }}>
        <Row md={12}>
          <Routes>
            <Route exact path="/" element={<BlogPosts posts={posts} />} />
            <Route path="/post/:postId" element={<Post posts={posts} />} />
          </Routes>
          <NewsArticles />
        </Row>
      </Container>
      <br />
      <Footer />
    </Router>
  );
};

export default App;
