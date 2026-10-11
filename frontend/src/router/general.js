import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

/*
 * Task 11 - general.js
 *
 * Retrieves all books and their details based on ISBN, Author and Title
 * from the back-end REST API using async/await with Axios.
 * Every request is wrapped in a try/catch block so that HTTP errors
 * (4xx/5xx responses) and network failures are handled gracefully.
 */

/* ------------------------------------------------------------------ */
/* Helper: build a consistent error message from an Axios error        */
/* ------------------------------------------------------------------ */
const getErrorMessage = (err) =>
  err.response
    ? `Request failed with status ${err.response.status}: ${JSON.stringify(
        err.response.data
      )}`
    : err.message;

/* ------------------------------------------------------------------ */
/* 1. Retrieve ALL books                                               */
/* ------------------------------------------------------------------ */
const GetAllBooks = () => {
  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/`);
        setBooks(response.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  if (loading) {
    return <div className="container">Loading all books…</div>;
  }

  if (error) {
    return (
      <div className="container">
        <h2>All Books</h2>
        <p style={{ color: "red" }}>Error retrieving books: {error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>All Books</h2>
      <pre>{JSON.stringify(books, null, 2)}</pre>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 2. Retrieve a book by ISBN                                          */
/* ------------------------------------------------------------------ */
const GetBookByISBN = () => {
  const [isbn, setIsbn] = useState("");
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  const fetchBookByISBN = async (event) => {
    event.preventDefault();
    setBook(null);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
      setBook(response.data);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="container">
      <h2>Get Book by ISBN</h2>
      <form onSubmit={fetchBookByISBN}>
        <input
          type="text"
          value={isbn}
          placeholder="Enter ISBN (e.g. 1)"
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
        <button type="submit">Search by ISBN</button>
      </form>
      {error && <p style={{ color: "red" }}>Error retrieving book: {error}</p>}
      {book && <pre>{JSON.stringify(book, null, 2)}</pre>}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 3. Retrieve books by Author                                         */
/* ------------------------------------------------------------------ */
const GetBooksByAuthor = () => {
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);

  const fetchBooksByAuthor = async (event) => {
    event.preventDefault();
    setBooks(null);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/author/${author}`);
      setBooks(response.data);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="container">
      <h2>Get Books by Author</h2>
      <form onSubmit={fetchBooksByAuthor}>
        <input
          type="text"
          value={author}
          placeholder="Enter author name (e.g. Jane Austen)"
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Search by Author</button>
      </form>
      {error && <p style={{ color: "red" }}>Error retrieving books: {error}</p>}
      {books && <pre>{JSON.stringify(books, null, 2)}</pre>}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 4. Retrieve books by Title                                          */
/* ------------------------------------------------------------------ */
const GetBooksByTitle = () => {
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);

  const fetchBooksByTitle = async (event) => {
    event.preventDefault();
    setBooks(null);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/title/${title}`);
      setBooks(response.data);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="container">
      <h2>Get Books by Title</h2>
      <form onSubmit={fetchBooksByTitle}>
        <input
          type="text"
          value={title}
          placeholder="Enter book title (e.g. Pride and Prejudice)"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Search by Title</button>
      </form>
      {error && <p style={{ color: "red" }}>Error retrieving books: {error}</p>}
      {books && <pre>{JSON.stringify(books, null, 2)}</pre>}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Routes for the general (public) part of the application             */
/* ------------------------------------------------------------------ */
const General = () => (
  <Routes>
    <Route path="/" element={<GetAllBooks />} />
    <Route path="/isbn" element={<GetBookByISBN />} />
    <Route path="/author" element={<GetBooksByAuthor />} />
    <Route path="/title" element={<GetBooksByTitle />} />
  </Routes>
);

export default General;