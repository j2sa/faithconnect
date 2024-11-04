import React, { useState } from 'react';
import api from '../src/utils/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MemberForm = ({ onClose }) => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState(null);
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataBatismo, setDataBatismo] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!nome || !telefone || !dataNascimento) {
      alert('O Nome, Telefone e Data Nascimento são campos obrigatórios.');
      return;
    }
  
    try {
      // Create the payload object
      const payload = [
        {
          nome: nome.trim() !== '' ? nome : undefined,
          data_nascimento: dataNascimento ? dataNascimento.toISOString() : undefined,
          endereco: endereco.trim() !== '' ? endereco : undefined,
          numero: numero.trim() !== '' ? numero : undefined,
          complemento: complemento.trim() !== '' ? complemento : undefined,
          cidade: cidade.trim() !== '' ? cidade : undefined,
          estado: estado.trim() !== '' ? estado : undefined,
          email: email.trim() !== '' ? email : undefined,
          telefone: telefone.trim() !== '' ? telefone : undefined,
          data_batismo: dataBatismo ? dataBatismo.toISOString() : undefined,
        }
      ].filter(Boolean);
  
      // Send the registration data to the API
      await api.post('/membros', payload);
  
  
      // Close the modal and perform any necessary actions
      onClose();
    } catch (error) {
      console.error('Erro ao cadastrar membro:', error);
    }
  };

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="modal-content bg-white p-8 rounded shadow-lg" style={{maxWidth: '500px'}}>
        <h2 className="text-xl font-semibold mb-4">Cadastrar Novo Membro</h2>
        <form onSubmit={handleSubmit}>
          {/* Add form fields for each property in the Membro model */}
          <div className="flex">
            <input
              type="text"
              id="nome"
              className="p-2 border border-gray-300 rounded w-full m-2"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="Nome"
            />
          </div>

          <div className="flex">
            <input
              type="email"
              id="email"
              className="p-2 border border-gray-300 rounded w-full m-2"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="E-mail"
            />
          </div>

          <div className="flex">
            <input
              type="text"
              id="telefone"
              className="p-2 border border-gray-300 rounded w-full m-2"
              value={telefone}
              onChange={(event) => setTelefone(event.target.value)}
              placeholder="Telefone"
            />
          </div>

          <div className="flex">
            <DatePicker
              selected={dataNascimento}
              onChange={setDataNascimento}
              className="p-2 border border-gray-300 rounded w-full m-2"
              dateFormat="dd/MM/yyyy"
              placeholderText="Data Nasc. (dd/MM/aaaa)"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          <div className="flex">
            <input
              type="text"
              id="endereco"
              className="p-2 border border-gray-300 rounded m-2"
              value={endereco}
              onChange={(event) => setEndereco(event.target.value)}
              placeholder="Endereço"
              style={{ width: '80%' }} // Adjust the width here
            />
            <input
              type="number"
              id="numero"
              className="p-2 border border-gray-300 rounded m-2"
              value={numero.toString()}
              onChange={(event) => setNumero(event.target.value)}
              placeholder="Nº"
              style={{ width: '20%' }} // Adjust the width here
            />
          </div>

          <div className="flex">
            <input
              type="text"
              id="complemento"
              className="p-2 border border-gray-300 rounded m-2"
              value={complemento}
              onChange={(event) => setComplemento(event.target.value)}
              placeholder="Complemento"
              style={{ width: '30%' }} // Adjust the width here
            />
            <input
              type="text"
              id="cidade"
              className="p-2 border border-gray-300 rounded m-2"
              value={cidade}
              onChange={(event) => setCidade(event.target.value)}
              placeholder="Cidade"
              style={{ width: '45%' }} // Adjust the width here
            />
            <input
              type="text"
              id="estado"
              className="p-2 border border-gray-300 rounded m-2"
              value={estado}
              onChange={(event) => setEstado(event.target.value)}
              placeholder="Estado"
              style={{ width: '20%' }} // Adjust the width here
            />
          </div>

          <div className="flex">
            <DatePicker
              selected={dataBatismo}
              onChange={setDataBatismo}
              className="p-2 border border-gray-300 rounded w-full m-2"
              dateFormat="dd/MM/yyyy"
              placeholderText="Data Batismo (dd/MM/aaaa)"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          {/* Repeat the above div for each property in the Membro model */}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="p-2 bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="p-2 bg-green-500 text-white rounded"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberForm;