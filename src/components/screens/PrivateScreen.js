import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { Link } from "react-router-dom";

const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
  };

  return error ? (
    <>
      <span className="error-message">{error}</span>
      <Link to="/login">
        <button className="btn login-button">Login</button>
      </Link>
    </>
  ) : (
    <div className="total">
      <div className="private-data">{privateData}</div>
      <Link to="/login">
        <button
          className="logout-button btn btn-primary"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </Link>
    </div>
  );
};

export default PrivateScreen;
