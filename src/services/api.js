import axios from 'axios';

const API =
  'https://837b254a-5635-472b-b253-9b33fa431557-00-3vuqojzxsiygq.pike.replit.dev'; // <- Update this!

export const getBookings = (userId) =>
  axios.get(`${API}/bookings`, { params: { user_id: userId } });
export const createBooking = (data) => axios.post(`${API}/bookings`, data);
export const updateBooking = (id, data) =>
  axios.put(`${API}/bookings/${id}`, data);
export const deleteBooking = (id) => axios.delete(`${API}/bookings/${id}`);
export const getEventById = (id) => axios.get(`${API}/events/${id}`); // assuming your event API looks like this
