import React, { useState, useEffect } from 'react';
import api from '../src/utils/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MemberForm = ({ onClose }) => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState(null);
  const [sexo, setSexo] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataBatismo, setDataBatismo] = useState(null);

  useEffect(() => {
    if (cep) {
      fetchAddressData(cep);
    }
  }, [cep]);

  const fetchAddressData = async (cep) => {
    try {
      if (cep.length === 8) {
        const response = await api.get(`/cep/${cep}`);
        const data = response.data;
        setEndereco(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setEstado(data.uf);
      } else if (cep.length < 8) {//+
        // Clear the form fields if the CEP length is less than 8
        setEndereco('');
        setBairro('');
        setCidade('');
        setEstado('');
      }
    } catch (error) {
      console.error('Error fetching address data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!nome || !telefone || !dataNascimento || !cep) {
      alert('O Nome, Telefone, Data Nascimento e CEP são campos obrigatórios.');
      return;
    }
  
    try {
      // Create the payload object
      const payload = [
        {
          nome: nome.trim() !== '' ? nome : undefined,
          telefone: telefone.trim() !== '' ? telefone : undefined,
          email: email.trim() !== '' ? email : undefined,
          data_nascimento: dataNascimento ? dataNascimento.toISOString() : undefined,
          sexo: sexo.trim() !== ''? sexo : undefined,
          cep: cep.trim() !== ''? cep : undefined,
          endereco: endereco.trim() !== '' ? endereco : undefined,
          numero: numero.trim() !== '' ? numero : undefined,
          complemento: complemento.trim() !== '' ? complemento : undefined,
          bairro: bairro.trim() !== ''? bairro : undefined,
          cidade: cidade.trim() !== '' ? cidade : undefined,
          estado: estado.trim() !== '' ? estado : undefined,
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
              type="text"
              id="telefone"
              className="p-2 border border-gray-300 rounded m-2"
              value={telefone}
              onChange={(event) => setTelefone(event.target.value)}
              placeholder="Telefone"
              style={{ width: '40%' }}
            />

            <input
              type="email"
              id="email"
              className="p-2 border border-gray-300 rounded w-full m-2"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="E-mail"
            />
          </div>

          <div className="flex justify-between">
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
            <div 
              className="p-2 border border-gray-300 rounded m-2" 
              style={{ width: '40%' }}
            >
              <select
                id="sexo"
                value={sexo}
                onChange={(event) => setSexo(event.target.value)}
                className='w-full'
              >
                <option value="" disabled>Sexo</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
          </div>

          <div className="flex">
            <input
              type="number"
              id="cep"
              className="p-2 border border-gray-300 rounded m-2"
              value={cep.toString()}
              onChange={(event) => {
                const cepValue = event.target.value.replace(/\D/g, '');
                if (cepValue.length <= 8) {
                  setCep(cepValue);
                }
              }}
              placeholder="CEP"
              min="0"
              max="99999999"
              style={{ width: '27.5%' }}
            />
          </div>

          <div className="flex">
            <input
              type="text"
              id="endereco"
              className="p-2 border border-gray-300 rounded m-2"
              value={endereco}
              disabled
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
              style={{ width: '45%' }} // Adjust the width here
            />
            <input
              type="text"
              id="bairro"
              className="p-2 border border-gray-300 rounded w-full m-2"
              value={bairro}
              disabled
              placeholder="Bairro"
            />
          </div>

          <div className="flex">
          <input
              type="text"
              id="cidade"
              className="p-2 border border-gray-300 rounded w-full m-2"
              value={cidade}
              disabled
              placeholder="Cidade"
            />
            <input
              type="text"
              id="estado"
              className="p-2 border border-gray-300 rounded m-2"
              value={estado}
              disabled
              placeholder="Estado"
              style={{ width: '30%' }} // Adjust the width here
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