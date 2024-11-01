import { useState, useEffect } from 'react';
import api from '../src/utils/api';
import LayoutAuth from '../components/LayoutAuth';

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Aniversariantes da Semana</h2>
              <ul>
                {aniversariantes.map((membro) => (
                  <li key={membro.id}>
                    {membro.nome} - {new Date(new Date(membro.data_nascimento).setDate(new Date(membro.data_nascimento).getDate() + 1)).toLocaleDateString('pt-BR', {day: '2-digit', month: 'numeric'})}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Total de Membros</h2>
              <p className="text-3xl font-bold">{totalMembros.totalAtivos}</p>
            </div>
          </div>

          {/* Lista de Membros */}
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Lista de Membros</h2>
            <input
              type="text"
              placeholder="Pesquisar membros..."
              className="mb-4 p-2 border border-gray-300 rounded"
              // lógica de pesquisa
            />
            <div className="flex flex-col gap-4">
              {membros.map((membro) => (
                <div key={membro.id} className="flex items-center justify-between p-2 border-b">
                  <div>{membro.nome}</div>
                  <div>{membro.contato}</div>
                  <div className="flex gap-2">
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
                  </div>
                </div>
              ))}
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