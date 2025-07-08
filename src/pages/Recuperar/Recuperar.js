import React from 'react';

function Recuperar() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el correo
    alert("Correo de recuperación enviado");
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4 text-danger">Recuperar Contraseña</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="usuario@ejemplo.com"
                required
              />
            </div>

            <div className="card-footer text-center">
              <button type="submit" className="btn btn-danger w-100">Enviar Correo</button>
            </div>

            <div className="card-footer text-center mt-2">
              <small className="text-muted">
                <a href="/">Volver</a>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recuperar;