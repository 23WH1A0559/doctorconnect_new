import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function BookAppointment() {

  const { doctorId } = useParams();

  const [slots, setSlots] = useState([]);

  // Fetch available slots
  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await API.get(`/doctors/${doctorId}/slots`);
      setSlots(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Book slot
  const handleBook = async (slot) => {
    try {

      const user = JSON.parse(localStorage.getItem("user"));

      await API.post("/appointments", {
        patientId: user._id,
        doctorId: doctorId,
        appointmentDate: slot.date,
        appointmentTime: slot.time
      });

      alert("Appointment booked!");

      fetchSlots(); // refresh slots

    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Available Slots</h2>

      {slots.length === 0 ? (
        <p>No slots available</p>
      ) : (
       slots.map((slot, index) => (
  <div key={index} style={styles.card}>
    <p>{slot.date} - {slot.time}</p>

    {slot.isBooked ? (
      <button style={styles.bookedButton} disabled>
        Booked
      </button>
    ) : (
      <button onClick={() => handleBook(slot)} style={styles.button}>
        Book
      </button>
    )}
  </div>
))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px"
  },
  card: {
    padding: "15px",
    margin: "10px 0",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)"
  },
  button: {
    padding: "8px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px"
  },
  bookedButton: {
  padding: "8px",
  background: "gray",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "not-allowed"
}
};

export default BookAppointment;