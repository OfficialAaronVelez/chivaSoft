import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Jugadores from './pages/Jugadores.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jugadores" element={<Jugadores />} />
      <Route path="*" element={<div className="p-4">404 Página no encontrada</div>} />
    </Routes>
  );
}

export default App;
