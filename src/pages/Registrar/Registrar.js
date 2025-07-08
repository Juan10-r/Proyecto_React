import React from 'react';

function Registrar() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos del formulario
    alert("Formulario enviado");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-center text-danger mb-4">Regístrate</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputNombre" className="form-label">Nombres</label>
              <input
                type="text"
                className="form-control"
                id="inputNombre"
                placeholder="Escribe tus nombre completo"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputApellidos" className="form-label">Apellidos</label>
              <input
                type="text"
                className="form-control"
                id="inputApellidos"
                placeholder="Escribe tus apellidos"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputFecha" className="form-label">Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="inputFecha"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputContraseña" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="inputContraseña"
                placeholder="Escribe una Contraseña"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputRepetir" className="form-label">Repetir Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="inputRepetir"
                placeholder="Repite la Contraseña"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputCorreo" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="inputCorreo"
                placeholder="Escribe tu Correo"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputTelefono" className="form-label">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                id="inputTelefono"
                placeholder="Escribe tu número de Teléfono"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputSexo" className="form-label">Sexo</label>
              <select className="form-select" id="inputSexo" required>
                <option value="">Seleccione el tipo de Sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="inputNacionalidad" className="form-label">Nacionalidad</label>
              <select className="form-select" id="inputNacionalidad" required>
                <option value="">Seleccione Nacionalidad</option>
                <option value="Colombia">Colombia</option>
                <option value="Venezuela">Venezuela</option>
              </select>
            </div>

            <div className="card-footer text-center">
              <button type="submit" className="btn btn-danger w-100">Enviar</button>
            </div>
          </form>

          <div className="card-footer text-center mt-2">
            <small className="text-muted">
              <a href="/">Volver</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrar;