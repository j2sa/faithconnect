import { useState, useEffect } from 'react';
import api from '../src/utils/api';
import LayoutAuth from '../components/LayoutAuth';
import '../src/styles/globals.css';

const Membros = () => {
  // Define the useState hooks to store the data
  const [membros, setMembros] = useState([]);
  const [aniversariantes, setAniversariantes] = useState([]);
  const [totalMembros, setTotalMembros] = useState({totalAtivos: 0, totalInativos: 0});

  // Define a function to fetch the data
  const fetchData = async () => {
    try {
      // Fetch the data for membros
      const resultMembros = await api.get('/membros');
      setMembros(resultMembros.data);

      // Fetch the data for aniversariantes
      const resultAniversariantes = await api.get('/membros/relatorios/proximos-aniversarios');
      setAniversariantes(resultAniversariantes.data);

      // Fetch the data for total membros
      const resultTotalMembros = await api.get('/membros/relatorios/total-membros');
      setTotalMembros(resultTotalMembros.data);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  // Use the useEffect hook to fetch the data only once when the component mounts
  useEffect(() => {
    fetchData();
  }, []);
  console.log(aniversariantes)
  return (
    <div className="mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold mb-6">Gerenciamento de Membros</h1>
        <div>
          {/* Quadros de Aniversariantes e Total de Membros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 flex justify-between">
            <div className="p-4 bg-white rounded shadow flex flex-col justify-start flex-1">
              <h2 className="text-xl font-semibold mb-4">Aniversariantes da Semana</h2>
              <ul className="quadroAniversario grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
                {aniversariantes.map((membro) => (
                  <li key={membro.id}>
                    {membro.nome} - {new Date(new Date(membro.data_nascimento).setDate(new Date(membro.data_nascimento).getDate() + 1)).toLocaleDateString('pt-BR', {day: '2-digit', month: 'numeric'})}
                  </li>
                ))}
              </ul>
            </div>
            <div className="quadroTotalMembros p-4 bg-white rounded shadow flex flex-col items-center justify-end">
              <h2 className="text-xl font-semibold mb-4">Total de Membros</h2>
              <p className="text-9xl font-semibold p-3">{totalMembros.totalAtivos}</p>
            </div>
          </div>

          {/* Lista de Membros */}
          <div className="quadroListaMembros p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Lista de Membros</h2>
            <input
              type="text"
              placeholder="Pesquisar membros..."
              className="mb-4 p-2 border border-gray-300 rounded"
              // lógica de pesquisa
            />
            <div className="overflow-y-auto h-80">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Nome</th>
                    <th className="px-4 py-2 text-left">Telefone</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {membros.map((membro) => (
                    <tr key={membro.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{membro.nome}</td>
                      <td className="px-4 py-2">{membro.telefone}</td>
                      <td className="px-4 py-2">{membro.email}</td>
                      <td className="px-4 py-2 flex gap-2 justify-end">
                        <button
                          className="p-2 bg-blue-500 text-white rounded"
                          onClick={() => {/* lógica para editar membro */}}
                        >
                          Editar
                        </button>
                        <button
                          className="p-2 bg-gray-500 text-white rounded"
                          onDoubleClick={() => {/* lógica para abrir informações do membro */}}
                        >
                          ℹ️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="mt-4 p-2 bg-green-500 text-white rounded"
              onClick={() => {/* lógica para cadastrar novo membro */}}
            >
              Cadastrar Novo Membro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Membros.getLayout = function getLayout(page) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default Membros;