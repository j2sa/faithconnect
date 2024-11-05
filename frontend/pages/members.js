import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import auth from '../src/utils/auth';
import api from '../src/utils/api';
import LayoutAuth from '../components/LayoutAuth';
import '../styles/globals.css';
import MemberForm from '../components/MemberForm';

const Membros = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // Define the useState hooks to store the data
  const [membros, setMembros] = useState([]);
  const [aniversariantes, setAniversariantes] = useState([]);
  const [totalMembros, setTotalMembros] = useState({ totalAtivos: 0, totalInativos: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('Todos');
  const [showModal, setShowModal] = useState(false);
  const [churchId, setChurchId] = useState('');
  // Define a function to fetch the data
  const fetchData = async () => {
    try {
      // Fetch the data for membros
      const resultMembros = await api.get('/membros');
      setMembros(resultMembros.data);

      // Fetch the data for aniversariantes
      const resultAniversariantes = await api.get('/membros/relatorios/proximos-aniversarios');
      // Sort the aniversariantes by date and name
      const sortedAniversariantes = resultAniversariantes.data.sort((a, b) => {
        const dateA = new Date(a.data_nascimento);
        const dateB = new Date(b.data_nascimento);
        if (dateA.getTime() === dateB.getTime()) {
          return a.nome.localeCompare(b.nome);
        }
        return dateA.getTime() - dateB.getTime();
      });
      setAniversariantes(sortedAniversariantes);

      // Fetch the data for total membros
      const resultTotalMembros = await api.get('/membros/relatorios/total-membros');
      setTotalMembros(resultTotalMembros.data);

      setChurchId(auth.getChurchId());

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  // Use the useEffect hook to fetch the data only once when the component mounts
  useEffect(() => {
    if (!auth.validateToken()) {
      router.push('/login');
    } else {
      setLoading(false);
      fetchData();
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (option) => {
    setFilterOption(option);
  };

  const filteredMembros = membros.filter(membro => {
    const isActive = membro.status === 'ativo';
    const isInactive = membro.status === 'inativo';

    if (filterOption === 'Todos') {
      return (
        membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        membro.telefone.includes(searchTerm) ||
        membro.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (filterOption === 'Ativos') {
      return isActive && (
        membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        membro.telefone.includes(searchTerm) ||
        membro.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (filterOption === 'Inativos') {
      return isInactive && (
        membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        membro.telefone.includes(searchTerm) ||
        membro.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return false;
  }).sort((a, b) => {
    return a.nome.localeCompare(b.nome);
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleOpenChurchRegistration = (churchId) => {
    const url = `/churchmemberregistration?churchId=${churchId}`;
    window.open(url, '_blank');
  };

  return (
    <div className="mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold mb-6">Gerenciamento de Membros</h1>
        <div>
          {/* Quadros de Aniversariantes e Total de Membros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 flex justify-between">
            <div className="quadroAniversariantes p-4 bg-white rounded shadow flex flex-col justify-start flex-1">
              <h2 className="text-xl font-semibold mb-2">Aniversariantes da Semana</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto gap-2">
                {aniversariantes.map((membro) => (
                  <li key={membro.id} className="flex items-center">
                    <span className="flex-1">{membro.nome}</span>
                    <span className="flex-1">
                      {new Date(membro.data_nascimento).toLocaleDateString('pt-BR', { day: '2-digit', month: 'numeric' })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="quadroTotalMembros p-4 bg-white rounded shadow flex flex-col items-center justify-end">
              <h2 className="text-xl font-semibold mb-4">Total de Membros</h2>
              <p className="text-9xl font-semibold p-3 flex-1 overflow-hidden text-overflow-ellipsis">{totalMembros.totalAtivos}</p>
            </div>
          </div>

          {/* Lista de Membros */}
          <div className="quadroListaMembros p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Lista de Membros</h2>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Pesquisar membros..."
                className="p-2 border border-gray-300 rounded"
                onChange={(event) => handleSearch(event.target.value)}
              />
              <select
                className="ml-4 p-2 border border-gray-300 rounded"
                value={filterOption}
                onChange={(event) => handleFilter(event.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Ativos">Ativos</option>
                <option value="Inativos">Inativos</option>
              </select>
              <div className="flex-1"></div>
              <div>
                <button
                  className="p-2 bg-blue-500 text-white rounded"
                  onClick={handleOpenModal}
                >
                  Cadastrar Membro
                </button>
                <button
                  className="ml-2 p-2 bg-blue-500 text-white rounded"
                  onClick={() => handleOpenChurchRegistration(churchId)}
                  >
                  Pagina de cadastro
                </button>
              </div>
            </div>
            <div className="overflow-y-auto h-80">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Nome</th>
                    <th className="px-4 py-2 text-left">Telefone</th>
                    <th className="px-4 py-2 text-left">Bairro</th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {filteredMembros.map((membro) => (
                    <tr key={membro.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{membro.nome}</td>
                      <td className="px-4 py-2">{membro.telefone}</td>
                      <td className="px-4 py-2">{membro.bairro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showModal && <MemberForm onClose={() => setShowModal(false)} />}
    </div>
  );
};

Membros.getLayout = function getLayout(page) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default Membros; 