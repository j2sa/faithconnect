import { useState, useEffect } from 'react';
import api from '../src/utils/api';
import LayoutAuth from '../components/LayoutAuth';

const Membros = () => {
  const [membros, setMembros] = useState([]);
  const [aniversariantes, setAniversariantes] = useState([]);
  const [totalMembros, setTotalMembros] = useState({ ativos: 0, inativos: 0 });
  const [motivosInatividade, setMotivosInatividade] = useState([]);

  useEffect(() => {
    // Função para buscar os dados dos membros e relatórios
    const fetchDados = async () => {
      try {
        // Buscar membros
        const resultMembros = await api.get('/membros');
        setMembros(resultMembros.data);

        // Buscar aniversariantes da semana
        const resultAniversariantes = await api.get('/membros/relatorios/proximos-aniversarios');
        setAniversariantes(resultAniversariantes.data);

        // Buscar total de membros
        const resultTotalMembros = await api.get('/membros/relatorios/total-membros');
        setTotalMembros(resultTotalMembros.data);

        // Buscar motivos de inatividade
        const resultMotivosInatividade = await api.get('/membros/relatorios/motivos-inatividade');
        setMotivosInatividade(resultMotivosInatividade.data);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchDados();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Membros</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Gráfico de Aniversariantes da Semana */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Aniversariantes da Semana</h2>
          <ul>
            {aniversariantes.map((membro) => (
              <li key={membro.nome}>
                {membro.nome} - {new Date(membro.data_nascimento).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
        {/* Gráfico do Total de Membros */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Total de Membros</h2>
          <p>Ativos: {totalMembros.ativos}</p>
          <p>Inativos: {totalMembros.inativos}</p>
        </div>
        {/* Gráfico dos Motivos de Inatividade */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Motivos de Inatividade</h2>
          <ul>
            {motivosInatividade.map((motivo) => (
              <li key={motivo._id}>
                {motivo._id}: {motivo.count}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Lista de Membros</h2>
        <input
          type="text"
          placeholder="Pesquisar membros..."
          className="mb-4 p-2 border border-gray-300 rounded"
          // lógica de pesquisa
        />
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Nome</th>
              <th className="text-left py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {membros.map(membro => (
              <tr key={membro.id}>
                <td className="py-2">{membro.nome}</td>
                <td className="py-2">
                  <button className="mr-2 p-2 bg-blue-500 text-white rounded" onClick={() => {/* lógica para editar membro */}}>
                    📝
                  </button>
                  <button className="p-2 bg-gray-500 text-white rounded" onDoubleClick={() => {/* lógica para abrir informações do membro */}}>
                    ℹ️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 p-2 bg-green-500 text-white rounded" onClick={() => {/* lógica para cadastrar novo membro */}}>
          Cadastrar Novo Membro
        </button>
      </div>
    </div>
  );
};

Membros.getLayout = function getLayout(page) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default Membros;
