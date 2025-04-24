import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const BASE_URL = 'https://837b254a-5635-472b-b253-9b33fa431557-00-3vuqojzxsiygq.pike.replit.dev';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    const res = await axios.get(`${BASE_URL}/events`);
    setEvents(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${BASE_URL}/events/${id}`);
      fetchEvents(); // reload updated event list
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchEvents();

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.email === "admin@spaceman.com") {
        setIsAdmin(true);
      }
    });

    document.body.classList.add("events-page");
    return () => {
      document.body.classList.remove("events-page");
    };
  }, []);

  const handleBook = (id) => {
    navigate(`/dashboard?event=${id}`);
  };

  const handleAdd = () => navigate("/admin");

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🎫 Upcoming Events</h2>
        {isAdmin && (
          <button className="btn btn-light" onClick={handleAdd}>
            ➕ Add Event
          </button>
        )}
      </div>
      <div className="row">
        {events.map((e) => (
          <div key={e.id} className="col-md-4 mb-4">
            <div className="card p-3 h-100 d-flex flex-column justify-content-between">
              <div>
                <h5>{e.title}</h5>
                <p>{e.date} at {e.time}</p>
                <p className="text-muted">{e.location}</p>
              </div>
              <div>
                <button
                  className="btn btn-outline-primary w-100 mb-2"
                  onClick={() => handleBook(e.id)}
                >
                  Book Now
                </button>
                {isAdmin && (
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => handleDelete(e.id)}
                  >
                    🗑 Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
