import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

function Jugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [error, setError] = useState('');
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const [showModal, setShowModal] = useState(false);
  const [nuevoJugador, setNuevoJugador] = useState({
    nombre_completo: '',
    fecha_nacimiento: '',
    categoria: '',
    posicion: '',
    fecha_inscripcion: '',
  });

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/jugadores', {
          params: { usuario }, // Pass user role to backend if needed
        });
        setJugadores(res.data);
      } catch (err) {
        setError('Error al cargar los jugadores');
      }
    };

    fetchJugadores();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const storedUser = JSON.parse(localStorage.getItem('usuario'));
    const res = await axios.post('http://localhost:3000/api/jugadores', {
      ...nuevoJugador,
      usuario: storedUser,
      fecha_inscripcion: nuevoJugador.fecha_inscripcion || new Date().toISOString().split('T')[0],
    });

    setJugadores((prev) => [...prev, res.data]);
    setShowModal(false);
    setNuevoJugador({
      nombre_completo: '',
      fecha_nacimiento: '',
      categoria: '',
      posicion: '',
      fecha_inscripcion: '',
    });
  } catch (error) {
    console.error('Error al guardar jugador:', error);
    alert('Hubo un error al guardar el jugador');
  }
};

  return (
    <Fragment>
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4 text-blue-700">Jugadores registrados</h1>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          {jugadores.length === 0 ? (
            <div className="text-gray-600">No hay jugadores registrados.</div>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-blue-100 text-left">
                  <th className="p-2 border">Nombre</th>
                  <th className="p-2 border">Nacimiento</th>
                  <th className="p-2 border">Categoría</th>
                  <th className="p-2 border">Posición</th>
                </tr>
              </thead>
              <tbody>
                {jugadores.map((j) => (
                  <tr key={j.id} className="border-t">
                    <td className="p-2">{j.nombre_completo}</td>
                    <td className="p-2">{j.fecha_nacimiento}</td>
                    <td className="p-2">{j.categoria}</td>
                    <td className="p-2">{j.posicion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {(usuario.rol === 'admin' || usuario.rol === 'entrenador') && (
            <div className="mt-6">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => setShowModal(true)}
              >
                Agregar jugador
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Agregar Nuevo Jugador</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre Completo"
                value={nuevoJugador.nombre_completo}
                onChange={(e) => setNuevoJugador({ ...nuevoJugador, nombre_completo: e.target.value })}
                className="border p-2 mb-4 w-full"
                required
              />
              <input
                type="date"
                placeholder="Fecha de Nacimiento"
                value={nuevoJugador.fecha_nacimiento}
                onChange={(e) => setNuevoJugador({ ...nuevoJugador, fecha_nacimiento: e.target.value })}
                className="border p-2 mb-4 w-full"
                required
              />
              <input
                type="text"
                placeholder="Categoría"
                value={nuevoJugador.categoria}
                onChange={(e) => setNuevoJugador({ ...nuevoJugador, categoria: e.target.value })}
                className="border p-2 mb-4 w-full"
                required
              />
              <input
                type="text"
                placeholder="Posición"
                value={nuevoJugador.posicion}
                onChange={(e) => setNuevoJugador({ ...nuevoJugador, posicion: e.target.value })}
                className="border p-2 mb-4 w-full"
                required
              />
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Guardar
              </button>
              <button type="button" onClick={() => setShowModal(false)} className="ml-2 text-gray-600">
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Jugadores;
