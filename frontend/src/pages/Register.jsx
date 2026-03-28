import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      alert("Registered successfully");

      navigate("/"); // go to login

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          <input name="name" placeholder="Name" onChange={handleChange} style={styles.input} />

          <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} />

          <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />

          <select name="role" onChange={handleChange} style={styles.input}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <button style={styles.button}>Register</button>

        </form>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "lightblue"
  },
  card: {
    padding: "30px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "300px"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "5px"
  }
};

export default Register;