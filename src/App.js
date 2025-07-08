import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPages/LoginPage';
import Recuperar from './pages/Recuperar/Recuperar';
import Registrar from './pages/Registrar/Registrar';
import PaginaPrincipal from './pages/PaginaPrincipal/PaginaPrincipal';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/Recuperar" element={<Recuperar/>}/>
      <Route path="/Registrar" element={<Registrar/>}/>
      <Route path="/PaginaPrincipal" element={<PaginaPrincipal/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;