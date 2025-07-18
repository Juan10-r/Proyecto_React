import { useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../../Firebase";  // Ajusta la ruta según tu estructura
import { sendPasswordResetEmail } from "firebase/auth";

function Recuperar() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire("Campo vacío", "Por favor ingresa tu correo.", "warning");
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(email)) {
      Swal.fire("Correo inválido", "Por favor escribe un correo válido.", "error");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        title: "¡Revisa tu correo!",
        html:
          `Te hemos enviado instrucciones para recuperar tu contraseña, tienes 60 minutos. <strong>¡Podría estar en SPAM!</strong>`,
        icon: "success",
        timer: 5000,
        showConfirmButton: false,
      });
      setEmail("");
    } catch (error) {
      console.error("Error Firebase:", error.code, error.message);

      // Mejor mostrar el código y mensaje para identificar el error
      Swal.fire("Error", `(${error.code}) ${error.message}`, "error");
    }
  };

  const handleGoBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
      <div
        className="form-card shadow-lg p-4 rounded-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <h3 className="mb-3 text-center">
          <i className="bi bi-lock-fill me-2"></i>Recuperar Contraseña
        </h3>
        <p className="text-center text-muted mb-4" style={{ fontSize: "0.95rem" }}>
          Ingresa tu correo electrónico para enviarte instrucciones de recuperación.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-danger">
              Enviar instrucciones
            </button>
            <button type="button" className="btn btn-outline-danger" onClick={handleGoBack}>
              Volver al inicio de sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Recuperar;
