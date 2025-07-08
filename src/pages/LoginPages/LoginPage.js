import React, { useState } from 'react';

function LoginPage() {
  // Definir los estados para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes manejar la lógica de autenticación o llamada a una API
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember me:', remember);

    // Limpia el formulario si es necesario
    // setEmail('');
    // setPassword('');
    // setRemember(false);
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="card-title text-center mb-4 text-success">Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="usuario@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberCheck"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberCheck">Recuérdame</label>
          </div>

          <div className="card-footer text-center">
            <button type="submit" className="btn btn-success w-100">Entrar</button>
          </div>
        </form>

        <div className="card-footer text-center mt-3">
          <small className="text-muted">
            ¿Olvidaste tu contraseña? <a href="./html/Recuperar.html">Reestablece</a>
          </small>
        </div>

        <div className="card-footer text-center mt-2">
          <small className="text-muted">
            ¿No tienes cuenta? <a href="./html/login.html">Regístrate</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;