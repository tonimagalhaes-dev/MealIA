import React, { useState, useEffect } from 'react';
import { CardapioService, IngredientesService } from '../services/api-service';

const GerenciadorIngredientes = () => {
  // Estados
  const [ingredientes, setIngredientes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [ingredienteAtual, setIngredienteAtual] = useState({
    nome: '',
    categoria: '',
    unidade: '',
    duracao_dias: 0
  });
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroBusca, setFiltroBusca] = useState('');

  // Categorias predefinidas
  const categorias = [
    'grãos', 'proteína', 'vegetal', 'tempero', 'laticínio', 
    'padaria', 'óleo', 'bebida', 'fruta', 'outros'
  ];
  
  // Unidades predefinidas
  const unidades = [
    'kg', 'g', 'L', 'ml', 'unidade', 'pacote', 'cabeça', 'dúzia', 'garrafa'
  ];

  // Simular o carregamento de dados
  useEffect(() => {
    // Dados de exemplo do código original
    const dadosExemplo = [
      {"nome": "arroz", "categoria": "grãos", "unidade": "kg", "duracao_dias": 90},
      {"nome": "feijão", "categoria": "grãos", "unidade": "kg", "duracao_dias": 90},
      {"nome": "peito de frango", "categoria": "proteína", "unidade": "kg", "duracao_dias": 3},
      {"nome": "carne moída", "categoria": "proteína", "unidade": "kg", "duracao_dias": 3},
      {"nome": "alface", "categoria": "vegetal", "unidade": "unidade", "duracao_dias": 5},
      {"nome": "tomate", "categoria": "vegetal", "unidade": "kg", "duracao_dias": 7},
      {"nome": "cebola", "categoria": "vegetal", "unidade": "kg", "duracao_dias": 14},
      {"nome": "alho", "categoria": "tempero", "unidade": "cabeça", "duracao_dias": 30},
      {"nome": "batata", "categoria": "vegetal", "unidade": "kg", "duracao_dias": 14},
      {"nome": "cenoura", "categoria": "vegetal", "unidade": "kg", "duracao_dias": 14},
      {"nome": "macarrão", "categoria": "grãos", "unidade": "pacote", "duracao_dias": 180},
      {"nome": "ovos", "categoria": "proteína", "unidade": "dúzia", "duracao_dias": 20},
      {"nome": "leite", "categoria": "laticínio", "unidade": "L", "duracao_dias": 7}
    ];
    setIngredientes(dadosExemplo);
  }, []);

  // Função para adicionar ou atualizar um ingrediente
  const salvarIngrediente = () => {
    if (!ingredienteAtual.nome || !ingredienteAtual.categoria || !ingredienteAtual.unidade) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    if (modoEdicao) {
      // Atualizar ingrediente existente
      setIngredientes(ingredientes.map(ing => 
        ing.nome === ingredienteAtual.nome ? ingredienteAtual : ing
      ));
    } else {
      // Verifica se já existe um ingrediente com o mesmo nome
      if (ingredientes.some(ing => ing.nome.toLowerCase() === ingredienteAtual.nome.toLowerCase())) {
        alert('Já existe um ingrediente com este nome!');
        return;
      }
      // Adicionar novo ingrediente
      setIngredientes([...ingredientes, ingredienteAtual]);
    }
    
    // Limpar o formulário
    limparFormulario();
  };

  // Função para editar um ingrediente
  const editarIngrediente = (ingrediente) => {
    setModoEdicao(true);
    setIngredienteAtual({...ingrediente});
  };

  // Função para excluir um ingrediente
  const excluirIngrediente = (nome) => {
    if (window.confirm(`Tem certeza que deseja excluir o ingrediente "${nome}"?`)) {
      setIngredientes(ingredientes.filter(ing => ing.nome !== nome));
    }
  };

  // Função para limpar o formulário
  const limparFormulario = () => {
    setIngredienteAtual({
      nome: '',
      categoria: '',
      unidade: '',
      duracao_dias: 0
    });
    setModoEdicao(false);
  };

  // Função para manipular mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredienteAtual({...ingredienteAtual, [name]: name === 'duracao_dias' ? parseInt(value) : value});
  };

  // Filtragem de ingredientes
  const ingredientesFiltrados = ingredientes.filter(ing => {
    const matchesCategoria = filtroCategoria === '' || ing.categoria === filtroCategoria;
    const matchesBusca = filtroBusca === '' || 
      ing.nome.toLowerCase().includes(filtroBusca.toLowerCase()) ||
      ing.categoria.toLowerCase().includes(filtroBusca.toLowerCase());
    return matchesCategoria && matchesBusca;
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Gerenciador de Ingredientes</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Painel de Entrada */}
        <div className="md:w-1/3 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            {modoEdicao ? 'Editar Ingrediente' : 'Adicionar Ingrediente'}
          </h2>
          
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nome*</label>
              <input
                type="text"
                name="nome"
                value={ingredienteAtual.nome}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={modoEdicao}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Categoria*</label>
              <select
                name="categoria"
                value={ingredienteAtual.categoria}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Unidade*</label>
              <select
                name="unidade"
                value={ingredienteAtual.unidade}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione uma unidade</option>
                {unidades.map(un => (
                  <option key={un} value={un}>{un}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Duração (dias)</label>
              <input
                type="number"
                name="duracao_dias"
                value={ingredienteAtual.duracao_dias}
                onChange={handleChange}
                min="1"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={salvarIngrediente}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                {modoEdicao ? 'Atualizar' : 'Adicionar'}
              </button>
              
              <button
                onClick={limparFormulario}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
        
        {/* Lista de Ingredientes */}
        <div className="md:w-2/3 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Lista de Ingredientes</h2>
          
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="sm:w-1/2">
              <input
                type="text"
                placeholder="Buscar ingredientes..."
                value={filtroBusca}
                onChange={(e) => setFiltroBusca(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="sm:w-1/2">
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Todas as categorias</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Tabela de ingredientes */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Nome</th>
                  <th className="border p-2 text-left">Categoria</th>
                  <th className="border p-2 text-left">Unidade</th>
                  <th className="border p-2 text-left">Duração (dias)</th>
                  <th className="border p-2 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {ingredientesFiltrados.length > 0 ? (
                  ingredientesFiltrados.map(ing => (
                    <tr key={ing.nome} className="hover:bg-gray-50">
                      <td className="border p-2">{ing.nome}</td>
                      <td className="border p-2">{ing.categoria}</td>
                      <td className="border p-2">{ing.unidade}</td>
                      <td className="border p-2">{ing.duracao_dias}</td>
                      <td className="border p-2 text-center">
                        <button
                          onClick={() => editarIngrediente(ing)}
                          className="bg-yellow-500 text-white py-1 px-2 rounded text-sm mr-2 hover:bg-yellow-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => excluirIngrediente(ing.nome)}
                          className="bg-red-600 text-white py-1 px-2 rounded text-sm hover:bg-red-700"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="border p-4 text-center">
                      Nenhum ingrediente encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Total: {ingredientesFiltrados.length} ingrediente(s)
          </div>
        </div>
      </div>
    </div>
  );
};

export default GerenciadorIngredientes;
