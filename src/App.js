import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPages/LoginPage';
import Recuperar from './pages/Recuperar/Recuperar';
import Registrar from './pages/Registrar/Registrar';
import PaginaPrincipal from './pages/PaginaPrincipal/PaginaPrincipal';
import UseStateExample from './Playground/UseStateExample';
import UseEffectExample from './Playground/UseEffectExample';
import ProtectedRoute from './pages/components/ProtectedRoute';
import NotFoundPage from './pages/components/NotFoundPage';
import ResetPasswordPage from './pages/ResetPassword/ResetPassword';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Recuperar" element={<Recuperar />} />
        <Route path="/Registrar" element={<Registrar />} />
        <Route path="/ResetPassword" element={<ResetPasswordPage />} />

        <Route path="/PaginaPrincipal" element={<ProtectedRoute> <PaginaPrincipal /> </ProtectedRoute>} />
        {/* Ruta genérica para páginas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/UseStateExample" element={<UseStateExample />} />
        <Route path="/UseEffectExample" element={<UseEffectExample />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;