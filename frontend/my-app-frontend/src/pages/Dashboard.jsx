import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('usuario');
    if (!stored) return navigate('/login');
    setUsuario(JSON.parse(stored));
  }, []);

  if (!usuario) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Hola {usuario.nombre}, eres <span className="text-blue-600">{usuario.rol}</span>
        </h1>

        <div className="grid gap-4">
          {(usuario.rol === 'admin' || usuario.rol === 'entrenador') && (
            <button
              onClick={() => navigate('/jugadores')}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Ver jugadores
            </button>
          )}

          {(usuario.rol === 'admin' || usuario.rol === 'operador') && (
            <button
              onClick={() => navigate('/equipamiento')}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Ver equipamiento
            </button>
          )}

          {usuario.rol === 'admin' && (
            <button
              onClick={() => navigate('/usuarios')}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            >
              Ver usuarios
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
