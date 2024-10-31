import { useState, useEffect } from 'react';
import api from '../src/utils/api';

const MemberForm = ({ member, onSave }) => {
  const [name, setName] = useState(member ? member.name : '');
  const [email, setEmail] = useState(member ? member.email : '');
  const [role, setRole] = useState(member ? member.role : '');
  const [conjuge, setConjuge] = useState(member ? member.conjuge : '');
  const [filhos, setFilhos] = useState(member ? member.filhos : []);
  const [membros, setMembros] = useState([]);

  useEffect(() => {
    const fetchMembros = async () => {
      try {
        const response = await api.get('/members');
        setMembros(response.data);
      } catch (error) {
        console.error('Failed to fetch members', error);
      }
    };

    fetchMembros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const memberData = { name, email, role, conjuge, filhos };
    try {
      if (member) {
        await api.put(`/members/${member.id}`, memberData);
      } else {
        await api.post('/members', memberData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save member', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <label>
        Conjuge:
        <select value={conjuge} onChange={(e) => setConjuge(e.target.value)}>
          <option value="">Selecione...</option>
          {membros.filter(m => m.id !== member.id).map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </label>
      <label>
        Filhos:
        <select
          multiple
          value={filhos}
          onChange={(e) => setFilhos(Array.from(e.target.selectedOptions, option => option.value))}
        >
          {membros.filter(m => m.id !== member.id).map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </label>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default MemberForm;
