import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./login.css";

export const Auth = () => {
  return (
    <div> 
    <div className="auth">
          <h1 className="heading">Booking Application</h1>
          <img className="img-logo" src="https://cdn.dribbble.com/users/6498639/screenshots/15138706/media/0262f2a4841a14755bd96261e11b6334.gif" alt="" />
      <Login />
      <Register />
    </div>
    </div>
  );
};

//Login
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://mern-booking-backend.onrender.com/auth/api/login",
        {
          username,
          password,
        }
      );

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

// Register
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://mern-booking-backend.onrender.com/auth/api/register",
        {
          username,
          password,
        }
      );
      alert("Registration Completed! Now login.");
    } catch (error) {
     console.log(error)
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};