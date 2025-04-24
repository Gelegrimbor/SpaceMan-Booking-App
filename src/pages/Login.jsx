import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '/src/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const redirectParam = new URLSearchParams(location.search).get('redirect');
  const from = redirectParam ? decodeURIComponent(redirectParam) : '/events';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
      <div
        className="text-center mb-4"
        style={{ position: 'absolute', top: '4rem', width: '100%' }}
      >
        <h1 style={{ color: '#ffffff' }}>🚀 SpaceMan Events</h1>
      </div>

      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control mb-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3 text-center">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}
