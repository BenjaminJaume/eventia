import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./App.scss";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const [message, setMessage] = useState(null);
  const [age, setAge] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState("/api");

  const fetchData = useCallback(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setMessage(json.message);
        setAge(json.age);
        setIsFetching(false);
      })
      .catch((e) => {
        setMessage(`API call failed. Is API server running? (${e})`);
        setIsFetching(false);
      });
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="mt-5">Quick API</h1>
        <img src={logo} className="App-logo" alt="logo" />
        {/* {process.env.NODE_ENV === "production" ? (
          <p>This is a production build from create-react-app.</p>
        ) : (
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        )} */}
        <p>
          <br />
          {isFetching ? (
            <>
              <Spinner animation="border" role="status">
                <span className="sr-only">Fetching message from API...</span>
              </Spinner>
              <span>Fetching message from API</span>
            </>
          ) : (
            <>
              <h2>Message from the API server: </h2>
              <p>
                «<strong>{message}</strong>»
              </p>
              <br />
              <h2>Age from the API server: </h2>
              <p>
                « <strong>{age}</strong> »
              </p>
            </>
          )}
        </p>
        <hr />
        {[
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
          "info",
          "light",
          "dark",
        ].map((variant, idx) => (
          <Alert key={idx} variant={variant}>
            This is a {variant} alert
          </Alert>
        ))}
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        <>
          <Button className="my-5" variant="primary">
            Primary
          </Button>{" "}
          <Button className="my-5" variant="secondary">
            Secondary
          </Button>{" "}
          <Button className="my-5" variant="success">
            Success
          </Button>{" "}
          <Button className="my-5" variant="warning">
            Warning
          </Button>{" "}
          <Button className="my-5" variant="danger">
            Danger
          </Button>{" "}
          <Button className="my-5" variant="info">
            Info
          </Button>{" "}
          <Button className="my-5" variant="light">
            Light
          </Button>{" "}
          <Button className="my-5" variant="dark">
            Dark
          </Button>{" "}
          <Button className="my-5" variant="link">
            Link
          </Button>
        </>
      </header>
    </div>
  );
}

export default App;
