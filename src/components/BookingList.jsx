// BookingList.jsx
export default function BookingList({ bookings, onEdit, onDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Event</th>
          <th>Date</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings?.map((b) => (
          <tr key={b.id}>
            <td>{b.name}</td>
            <td>{b.email}</td>
            <td>{b.phone}</td>
            <td>{b.event}</td>
            <td>{b.date}</td>
            <td>{b.time}</td>
            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEdit(b)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(b.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
