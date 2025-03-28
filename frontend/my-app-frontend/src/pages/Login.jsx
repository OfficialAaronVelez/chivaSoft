import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/api/usuarios/login', {
        email,
        contrasena,
      });

      localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
     window.location.href = '/dashboard';
      // TODO: Redirect
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="flex items-center w-full  justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg   bg-white p-8 py-20 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Iniciar sesión</h1>

        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
