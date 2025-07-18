import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  Table,
  Button,
  Form,
  Modal,
  Container,
} from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { auth } from '../../Firebase';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

function PaginaPrincipal() {
  const navigate = useNavigate();
  const [auxiliares, setAuxiliares] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAux, setSelectedAux] = useState(null);

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

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'usuarios', id));
        setAuxiliares(auxiliares.filter((a) => a.id !== id));
        Swal.fire('Eliminado', 'Registro eliminado correctamente.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
      }
    }
  };

  const handleEdit = (aux) => {
    setSelectedAux(aux);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchAuxiliares = async () => {
      const querySnapshot = await getDocs(collection(db, 'usuarios'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAuxiliares(data);
    };
    fetchAuxiliares();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const auxRef = doc(db, 'usuarios', selectedAux.id);
      await updateDoc(auxRef, {
        nombres: selectedAux.nombres,
        apellidos: selectedAux.apellidos,
        cedula: selectedAux.cedula,
        telefono: selectedAux.telefono,
        email: selectedAux.email,
        fechaNacimiento: selectedAux.fechaNacimiento,
        sexo: selectedAux.sexo,
        estado: selectedAux.estado,
      });

      setAuxiliares(
        auxiliares.map((a) => (a.id === selectedAux.id ? selectedAux : a))
      );

      setShowModal(false);
      Swal.fire('Actualizado', 'Los datos fueron actualizados.', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo actualizar.', 'error');
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedAux({
      ...selectedAux,
      [name]: value,
    });
  };

  return (
    <>
      <main data-bs-theme="auto">
        {/* Navbar */}
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              REAL HASTA LA MUERTE
            </a>
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
                <h5 className="offcanvas-title" id="offcanvasNavbarDarkLabel">
                  RHLM
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link btn btn-link active"
                      onClick={() => navigate('/')}
                    >
                      Inicio
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link btn btn-link"
                      onClick={() => navigate('/canciones')}
                    >
                      Canciones
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link btn btn-link"
                      onClick={() => navigate('/albumes')}
                    >
                      Álbumes
                    </button>
                  </li>
                  <li className="nav-item mt-3">
                    <button
                      onClick={handleLogout}
                      className="btn btn-danger w-80"
                      type="button"
                    >
                      Salir
                    </button>
                  </li>
                </ul>
                <form className="d-flex mt-3" role="search" onSubmit={(e) => e.preventDefault()}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Buscar"
                    aria-label="Buscar"
                  />
                  <button className="btn btn-outline-danger" type="submit">
                    Buscar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <div className="container my-5">
          <div className="bg-body-tertiary p-5 rounded my-login shadow-sm">
            <div className="col-sm-8 py-5 mx-auto text-center">
              {/* Imagen cargada correctamente */}
              <img
                src="/imagenes/fondo.jpg"
                alt="Anuel AA"
                className="img-fluid rounded mb-4"
                style={{ maxHeight: '150px', objectFit: 'cover' }}
              />

              <h1 className="display-5 fw-normal">REAL HASTA LA MUERTE</h1>
              <p className="fs-5">Anuel AA el Dios Del Trap</p>
              <p>Real es una palabra, yo soy el significado</p>
              <p>
                <a className="btn btn-danger" href="/Registrar" role="button">
                  Regístrate para ser un Real Hasta La Muerte &raquo;
                </a>
              </p>
            </div>
          </div>

          {/* Sección de beneficios */}
          <section className="my-5 text-center">
            <h2>¿Por qué unirte?</h2>
            <ul className="list-unstyled fs-5">
              <li>✔️ Acceso exclusivo a contenido.</li>
              <li>✔️ Comunidad de seguidores.</li>
              <li>✔️ Eventos y sorteos especiales.</li>
            </ul>
          </section>

          {/* Sección de testimonios */}
          <section className="my-5 bg-light p-4 rounded shadow-sm">
            <h2 className="text-center mb-4">Testimonios</h2>
            <blockquote className="blockquote text-center">
              <p className="mb-3 fst-italic">
                "Ser parte de RHLM me conectó con gente que ama el trap tanto como yo."
              </p>
              <footer className="blockquote-footer">Fan</footer>
            </blockquote>
          </section>
        </div>
      </main>

      {/* Tabla auxiliares */}
      <section className="main-content bg-white py-4">
        <Container className="mt-4">
          <h2 className="page-title text-center mb-4">
            AUXILIARES REGISTRADOS SIENDO RHLM
          </h2>
          <div className="table-responsive">
            <Table striped bordered hover responsive className="tabla-auxiliares">
              <thead>
                <tr>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Cédula</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Fecha Nacimiento</th>
                  <th>Sexo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {auxiliares.map((aux) => (
                  <tr key={aux.id}>
                    <td>{aux.nombres}</td>
                    <td>{aux.apellidos}</td>
                    <td>{aux.cedula}</td>
                    <td>{aux.telefono}</td>
                    <td>{aux.email}</td>
                    <td>{aux.fechaNacimiento || '-'}</td>
                    <td>{aux.sexo || '-'}</td>
                    <td>{aux.estado || 'Pendiente'}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(aux)}
                        aria-label={`Editar ${aux.nombres}`}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminar(aux.id)}
                        aria-label={`Eliminar ${aux.nombres}`}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </section>

      {/* Modal editar auxiliar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Auxiliar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAux && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  type="text"
                  name="nombres"
                  value={selectedAux.nombres}
                  onChange={handleModalChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  name="apellidos"
                  value={selectedAux.apellidos}
                  onChange={handleModalChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Cédula</Form.Label>
                <Form.Control
                  type="text"
                  name="cedula"
                  value={selectedAux.cedula}
                  onChange={handleModalChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={selectedAux.telefono}
                  onChange={handleModalChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={selectedAux.email}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaNacimiento"
                  value={selectedAux.fechaNacimiento || ''}
                  onChange={handleModalChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Sexo</Form.Label>
                <Form.Select
                  name="sexo"
                  value={selectedAux.sexo || ''}
                  onChange={handleModalChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="estado"
                  value={selectedAux.estado || 'Pendiente'}
                  onChange={handleModalChange}
                >
                  <option>Pendiente</option>
                  <option>Activo</option>
                  <option>Inactivo</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer con redes sociales */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p>Síguenos en redes sociales:</p>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-3"
          aria-label="Instagram"
        >
          Instagram
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-3"
          aria-label="Twitter"
        >
          Twitter
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-3"
          aria-label="YouTube"
        >
          YouTube
        </a>
        <p className="mt-3">&copy; {new Date().getFullYear()} REAL HASTA LA MUERTE</p>
      </footer>
    </>
  );
}

export default PaginaPrincipal;
