import React, { useState, useEffect } from 'react';
import { RefreshCw, Search, ShoppingCart } from 'lucide-react';

const GerenciadorEstoque = () => {
  // Estados
  const [ingredientes, setIngredientes] = useState([]);
  const [estoque, setEstoque] = useState({});
  const [itemAtual, setItemAtual] = useState({ nome: '', quantidade: 0 });
  const [filtro, setFiltro] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);

  // Simular o carregamento de dados
  useEffect(() => {
    // Carrega ingredientes e estoque do sistema
    const carregarDados = async () => {
      try {
        setCarregando(true);
        setErro(null);

        // Aqui você faria a chamada real à API
        // Exemplo com dados simulados:
        const ingredientesExemplo = [
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
  
        // Exemplo de estoque
        const estoqueExemplo = {
          "arroz": 1.5,
          "feijão": 0.8,
          "alho": 0.5,
          "sal": 0.5,
          "açúcar": 0.3,
          "café": 0.5
        };
  
        setIngredientes(ingredientesExemplo);
        setEstoque(estoqueExemplo);
  
        // Extrair categorias únicas
        const categoriasUnicas = [...new Set(ingredientesExemplo.map(ing => ing.categoria))].sort();
        setCategorias(categoriasUnicas);
  
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErro(`Não foi possível carregar os dados: ${error.message}`);
      } finally {
        setCarregando(false);
      }
    };
  
    carregarDados();
  }, []);

  // Função para atualizar o estoque
  const atualizarEstoque = (nome, novaQuantidade) => {
    const novoEstoque = { ...estoque };
    
    if (novaQuantidade <= 0) {
      // Se a quantidade for zero ou negativa, remove do estoque
      delete novoEstoque[nome];
    } else {
      // Atualiza a quantidade
      novoEstoque[nome] = novaQuantidade;
    }
    
    setEstoque(novoEstoque);
    
    // Aqui você faria a chamada à API para atualizar no backend
    // Por exemplo: fetch('/api/estoque', { method: 'PUT', body: JSON.stringify(novoEstoque) })
    
    // Exibe mensagem de sucesso
    setMensagem(`Estoque de ${nome} atualizado com sucesso!`);
    setTimeout(() => setMensagem(null), 3000);
  };

  // Função para lidar com a edição rápida de estoque
  const handleQuickEdit = (nome, delta) => {
    const quantidadeAtual = estoque[nome] || 0;
    const novaQuantidade = Math.max(0, quantidadeAtual + delta);
    atualizarEstoque(nome, novaQuantidade);
  };

  // Função para iniciar a edição de um item
  const iniciarEdicao = (nome) => {
    setItemAtual({
      nome: nome,
      quantidade: estoque[nome] || 0
    });
    setModoEdicao(true);
  };

  // Função para salvar a edição
  const salvarEdicao = () => {
    if (!itemAtual.nome) return;
    
    atualizarEstoque(itemAtual.nome, parseFloat(itemAtual.quantidade));
    setModoEdicao(false);
    setItemAtual({ nome: '', quantidade: 0 });
  };

  // Função para cancelar a edição
  const cancelarEdicao = () => {
    setModoEdicao(false);
    setItemAtual({ nome: '', quantidade: 0 });
  };

  // Função para manipular mudanças na quantidade
  const handleChangeQuantidade = (e) => {
    setItemAtual({
      ...itemAtual,
      quantidade: e.target.value === '' ? 0 : parseFloat(e.target.value)
    });
  };

  // Filtragem de ingredientes
  const ingredientesFiltrados = ingredientes.filter(ing => {
    const matchesCategoria = filtroCategoria === '' || ing.categoria === filtroCategoria;
    const matchesBusca = filtro === '' || ing.nome.toLowerCase().includes(filtro.toLowerCase());
    return matchesCategoria && matchesBusca;
  });

  // Ordenar ingredientes por nome
  const ingredientesOrdenados = [...ingredientesFiltrados].sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Gerenciador de Estoque</h1>
      
      {/* Mensagem de sucesso */}
      {mensagem && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {mensagem}
        </div>
      )}
      
      {/* Mensagem de erro */}
      {erro && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {erro}
        </div>
      )}
      
      {/* Indicador de carregamento */}
      {carregando && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-500">Carregando...</p>
        </div>
      )}
      
      {/* Filtros */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="sm:w-2/3 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Buscar ingredientes..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full p-2 pl-10 border rounded"
            />
          </div>
          <div className="sm:w-1/3">
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
      </div>
      
      {/* Modal de Edição */}
      {modoEdicao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Editar Estoque</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Ingrediente</label>
              <input
                type="text"
                value={itemAtual.nome}
                disabled
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Quantidade</label>
              <input
                type="number"
                value={itemAtual.quantidade}
                onChange={handleChangeQuantidade}
                step="0.01"
                min="0"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelarEdicao}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={salvarEdicao}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Tabela de Estoque */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Controle de Estoque</h2>
          <button 
            onClick={() => window.location.reload()}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <RefreshCw size={16} className="mr-1" /> Atualizar
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Ingrediente</th>
                <th className="border p-2 text-left">Categoria</th>
                <th className="border p-2 text-left">Unidade</th>
                <th className="border p-2 text-left">Em Estoque</th>
                <th className="border p-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {ingredientesOrdenados.length > 0 ? (
                ingredientesOrdenados.map(ing => {
                  const emEstoque = estoque[ing.nome] || 0;
                  return (
                    <tr key={ing.nome} className={`hover:bg-gray-50 ${emEstoque > 0 ? 'bg-green-50' : ''}`}>
                      <td className="border p-2">{ing.nome}</td>
                      <td className="border p-2">{ing.categoria}</td>
                      <td className="border p-2">{ing.unidade}</td>
                      <td className="border p-2 font-medium">
                        {emEstoque > 0 ? (
                          <span className="text-green-700">{emEstoque} {ing.unidade}</span>
                        ) : (
                          <span className="text-red-600">Não disponível</span>
                        )}
                      </td>
                      <td className="border p-2 text-center">
                        <div className="flex justify-center items-center space-x-2">
                          <button
                            onClick={() => handleQuickEdit(ing.nome, -0.1)}
                            className="bg-red-100 text-red-700 p-1 rounded hover:bg-red-200"
                            disabled={emEstoque <= 0}
                            title="Diminuir"
                          >
                            -
                          </button>
                          
                          <button
                            onClick={() => iniciarEdicao(ing.nome)}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                            title="Editar"
                          >
                            {emEstoque > 0 ? emEstoque : 0}
                          </button>
                          
                          <button
                            onClick={() => handleQuickEdit(ing.nome, 0.1)}
                            className="bg-green-100 text-green-700 p-1 rounded hover:bg-green-200"
                            title="Aumentar"
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="border p-4 text-center">
                    {carregando 
                      ? 'Carregando dados...' 
                      : 'Nenhum ingrediente encontrado'
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Total: {ingredientesOrdenados.length} ingrediente(s)
          </span>
          
          <button
            onClick={() => {}}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
          >
            <ShoppingCart size={16} className="mr-1" /> Gerar Lista de Compras
          </button>
        </div>
      </div>
    </div>
  );
};

export default GerenciadorEstoque;
