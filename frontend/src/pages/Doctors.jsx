import { useEffect, useState } from "react";
import API from "../services/api";

function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));


 
  // Fetch doctors from backend
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/"; // redirect to login
};

  return (
    
    <div style={styles.container}>
        
       
    <div style={styles.header}>

    {/* TOP: Heading */}
    <h1 style={{
        textAlign: "center",
        backgroundColor: "#2196F3",
        color: "white",
        padding: "15px",
        borderRadius: "5px"
    }}>
        Welcome to MediConnect - A Doctor Appointment System
    </h1>

    {/* BOTTOM: User info + Logout */}
    <div style={styles.userRow}>
        <div>
        <h3>Welcome, {user?.name}</h3>
        <p>Role: {user?.role}</p>
        </div>

        <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
        </button>
    </div>

    </div>



      <h2>Doctors List</h2>

      <div style={styles.grid}>
        {doctors.map((doc) => (
           <div key={doc._id} style={styles.card}>

  <div style={styles.cardContent}>

    {/* Left side (Text) */}
    <div>
      <h2>Dr. {doc.userId?.name}</h2>

      <p><b>Specialization:</b> {doc.specialization}</p>
      <p><b>Experience:</b> {doc.experience} years</p>

      <button style={styles.button}>
        Book Appointment
      </button>
    </div>

    {/* Right side (Image) */}
    <img
      src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
      alt="doctor"
      style={styles.image}
    />

  </div>

</div>
 
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },
  header: {
  marginBottom: "20px",
  padding: "15px",
  background: "#e3f2fd",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",   // 👈 IMPORTANT CHANGE
  gap: "10px"
},
  card: {
    padding: "20px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },

cardContent: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
},

image: {
  width: "150px",
  height: "150px",
  borderRadius:"50%"
},

button: {
  marginTop: "10px",
  padding: "10px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
},
logoutBtn: {
  padding: "10px 15px",
  background: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  height: "40px"
},
userRow: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
},
  
};
export default Doctors;