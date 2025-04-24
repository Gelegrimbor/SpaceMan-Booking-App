import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL =
  'https://837b254a-5635-472b-b253-9b33fa431557-00-3vuqojzxsiygq.pike.replit.dev';

export default function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/events`).then((res) => setEvents(res.data));

    // Apply dark theme class
    document.body.classList.add('events-page');

    return () => {
      document.body.classList.remove('events-page');
    };
  }, []);

  const handleBook = (id) => {
    navigate(`/dashboard?event=${id}`);
  };

  return (
    <div className="container">
      <h2 className="mb-4" style={{ marginTop: '2rem' }}>
        🎫 Upcoming Events
      </h2>
      <div className="row">
        {events.map((e) => (
          <div key={e.id} className="col-md-4 mb-4">
            <div className="card p-3">
              <h5>{e.title}</h5>
              <p>
                {e.date} at {e.time}
              </p>
              <p className="text-muted">{e.location}</p>
              <button
                className="btn btn-outline-primary"
                onClick={() => handleBook(e.id)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
