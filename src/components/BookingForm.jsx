import { useState, useEffect } from 'react';

export default function BookingForm({ onCreate, onUpdate, editing }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    event: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    if (editing) {
      setForm((prev) => ({ ...prev, ...editing }));
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure phone input stays numeric
    if (name === 'phone' && value && !/^\d*$/.test(value)) return;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Additional client-side email format check (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Ensure phone is numeric (in case user bypasses the input filter)
    if (!/^\d+$/.test(form.phone)) {
      alert('Phone number must be numeric.');
      return;
    }

    if (editing && editing.id) {
      onUpdate(editing.id, form);
    } else {
      onCreate(form);
    }

    setForm((prev) => ({
      name: '',
      email: '',
      phone: '',
      event: prev.event,
      date: prev.date,
      time: prev.time,
    }));
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Your name"
        className="form-control mb-2"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="form-control mb-2"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone number"
        className="form-control mb-2"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        name="event"
        placeholder="Event name"
        className="form-control mb-2"
        value={form.event}
        readOnly
      />
      <input
        name="date"
        placeholder="Date (YYYY-MM-DD)"
        className="form-control mb-2"
        value={form.date}
        readOnly
      />
      <input
        name="time"
        placeholder="Time (HH:MM)"
        className="form-control mb-2"
        value={form.time}
        readOnly
      />
      <button className="btn btn-primary">
        {editing && editing.id ? 'Update' : 'Book'}
      </button>
    </form>
  );
}
