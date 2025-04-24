import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://837b254a-5635-472b-b253-9b33fa431557-00-3vuqojzxsiygq.pike.replit.dev';

export default function Admin() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.body.classList.add('admin-page');
    return () => {
      document.body.classList.remove('admin-page');
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/events`, formData);
      setMessage('✅ Event added successfully!');
      setFormData({ title: '', date: '', time: '', location: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add event.');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-box">
        <h2>🛠️ Admin Panel - Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            className="form-control mb-2"
            placeholder="Event Title"
            onChange={handleChange}
            value={formData.title}
          />
          <input
            name="date"
            className="form-control mb-2"
            type="date"
            onChange={handleChange}
            value={formData.date}
          />
          <input
            name="time"
            className="form-control mb-2"
            type="time"
            onChange={handleChange}
            value={formData.time}
          />
          <input
            name="location"
            className="form-control mb-2"
            placeholder="Location"
            onChange={handleChange}
            value={formData.location}
          />
          <button type="submit" className="btn btn-light w-100">➕ Add Event</button>
        </form>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
}
