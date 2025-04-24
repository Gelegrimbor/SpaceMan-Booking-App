import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '/src/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';

import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getEventById,
} from '../services/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [editing, setEditing] = useState(null);
  const [eventInfo, setEventInfo] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchBookings = async (userId) => {
    try {
      const res = await getBookings(userId);
      setBookings(res.data);
    } catch (err) {
      toast.error('Failed to fetch bookings.');
    }
  };

  useEffect(() => {
    document.body.classList.add('dashboard-page');

    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        const redirectTo = encodeURIComponent(
          location.pathname + location.search
        );
        navigate(`/login?redirect=${redirectTo}`);
        return;
      }

      setUser(currentUser);
      fetchBookings(currentUser.uid);

      const eventId = new URLSearchParams(location.search).get('event');
      if (eventId) {
        try {
          const res = await getEventById(eventId);
          setEventInfo({
            event: res.data.title,
            date: res.data.date,
            time: res.data.time,
          });
        } catch {
          toast.error('Failed to load event details.');
        }
      }
    });

    return () => {
      document.body.classList.remove('dashboard-page');
      unsub();
    };
  }, []);

  const handleCreate = async (data) => {
    if (!user) return;

    const payload = { ...data, user_id: user.uid };
    try {
      const res = await createBooking(payload);
      toast.success('Booking created successfully!');
      setEditing(null);
      fetchBookings(user.uid);
    } catch (err) {
      toast.error('Booking creation failed.');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateBooking(id, data);
      toast.success('Booking updated.');
      setEditing(null);
      fetchBookings(user.uid);
    } catch {
      toast.error('Update failed.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      toast.info('Booking deleted.');
      fetchBookings(user.uid);
    } catch {
      toast.error('Delete failed.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-white">🎟️ Your Bookings</h2>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => navigate('/events')}
          >
            View Events
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <BookingForm
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editing={editing || eventInfo}
      />

      <BookingList
        bookings={bookings}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </div>
  );
}
