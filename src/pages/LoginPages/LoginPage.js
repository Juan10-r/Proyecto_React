import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../Firebase';
import { signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2';
import './loginPage.css';

const usuarios = [
  { email: "juan@correo.com", password: "jua123" },
  { email: "maria@correo.com", password: "mar123" },
  // Agrega los demás usuarios si quieres
];

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioValido = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioValido) {
      console.log('Inicio de sesión correcto');
      if (remember) {
        localStorage.setItem('usuario', JSON.stringify(usuarioValido));
      }
      navigate('/PaginaPrincipal'); // Ruta donde quieres ir
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: "¡Bienvenido!",
          text: `Sesión iniciada con Google: ${user.email}`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = "/PaginaPrincipal";
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "No se pudo iniciar sesión con Google", "error");
      });
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="card-title text-center mb-4 text-danger">Logueate ahora</h3>
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
            <button type="submit" className="btn btn-danger w-100 mb-2">Entrar</button>
            <div>
              <button type="button" className='btn btn-danger w-100' onClick={handleGoogleLogin}>
                Iniciar sesión con Google
              </button>
            </div>
          </div>
        </form>

        <div className="card-footer text-center mt-3">
          <small className="text-muted">
            ¿Olvidaste tu contraseña? <a href="/Recuperar">Reestablece</a>
          </small>
        </div>

        <div className="card-footer text-center mt-2">
          <small className="text-muted">
            ¿No tienes cuenta? <a href="/Registrar">Regístrate</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
