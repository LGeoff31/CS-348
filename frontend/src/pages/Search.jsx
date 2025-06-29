import { useState } from "react";
import { Form, ListGroup, Badge, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Search() {
  const [term, setTerm] = useState("");
  const [data, setData] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    fetch(`/api/search?q=${encodeURIComponent(term)}`)
      .then((r) => r.json())
      .then(setData);
  };

  return (
    <>
      <Form onSubmit={submit} className="mb-3">
        <Form.Control
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search movies..."
        />
      </Form>

      <ListGroup>
        {data.map((m) => (
          <ListGroup.Item
            key={m.movie_id}
            className="d-flex align-items-center"
          >
            <Image
              src={m.poster_link}
              width={40}
              className="me-3"
              rounded
              alt={m.title}
            />
            <Link to={`/movie/${m.movie_id}`}>
              {m.title} ({m.year})
            </Link>
            <Badge bg="secondary" className="ms-auto">
              {m.imdb_rating ?? ""}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
