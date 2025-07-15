import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { auth } from '../../Firebase';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function PaginaPrincipal() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);
        await Swal.fire({
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión exitosamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/');
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo cerrar la sesión.', 'error');
      }
    }
  };

  return (
    <main data-bs-theme="auto">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">REAL HASTA LA MUERTE</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbarDark"
            aria-controls="offcanvasNavbarDark"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasNavbarDark"
            aria-labelledby="offcanvasNavbarDarkLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarDarkLabel">RHLM</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item"><a className="nav-link active" href="#">Inicio</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Canciones</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Álbumes</a></li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger w-15 mt-3">Salir</button>
                </li>
              </ul>
              <form className="d-flex mt-3" role="search">
                <input className="form-control me-2" type="search" placeholder="Buscar" />
                <button className="btn btn-outline-danger" type="submit">Buscar</button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container my-5">
        <div className="bg-body-tertiary p-5 rounded">
          <div className="col-sm-8 py-5 mx-auto">
            <h1 className="display-5 fw-normal">REAL HASTA LA MUERTE</h1>
            <p className="fs-5">
              Anuel AA el Dios Del Trap
            </p>
            <p>Real es una palabra, yo soy el significado</p>
            <p>
              <a className="btn btn-danger" href="/Registrar" role="button">
                Regístrate para ser un Real Hasta La Muerte &raquo;
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaginaPrincipal;