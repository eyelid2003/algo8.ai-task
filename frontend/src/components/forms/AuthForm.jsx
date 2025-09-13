import React, { useState } from 'react';


const AuthForm = ({ type, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!type.includes('login') && !name)) {
      setError('Please fill in all required fields.');
      return;
    }
    onSubmit({ name, email, password });
    setName(''); setEmail(''); setPassword(''); setError('');
  };

  return (
    <div className="centered-form">
      <div className="auth-card">
        <h2>{type === 'login' ? 'Login' : 'Sign Up'}</h2>
        {error && <p className="error">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          {!type.includes('login') && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{type === 'login' ? 'Login' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
