import React, { useState, useEffect } from 'react';
import { Trash2, Edit, PlusCircle, MinusCircle, Save, XCircle } from 'lucide-react';

const GerenciadorReceitas = () => {
  // Estados
  const [receitas, setReceitas] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [filtroBusca, setFiltroBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [receitaAtual, setReceitaAtual] = useState({
    nome: '',
    categoria: '',
    ingredientes: [],
    tempo_preparo: 0,
    dificuldade: 'fácil',
    porcoes: 1
  });
  const [ingredienteSelecionado, setIngredienteSelecionado] = useState({
    nome: '',
    quantidade: 0,
    unidade: ''
  });
  const [visualizandoReceita, setVisualizandoReceita] = useState(null);

  // Categorias predefinidas para receitas
  const categorias = [
    'café da manhã', 
    'almoço/jantar', 
    'café da manhã/jantar',
    'acompanhamento', 
    'sobremesa', 
    'lanche', 
    'sobremesa/lanche'
  ];
  
  // Níveis de dificuldade
  const niveisDeificuldade = ['fácil', 'média', 'difícil'];

  // Simular o carregamento de dados
  useEffect(() => {
    // Carrega ingredientes do API (seria substituído pela chamada real)
    const carregarIngredientes = async () => {
      // Aqui faremos uma simulação, mas você substituiria isso por uma chamada ao seu backend
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
    };
    
    // Carrega receitas do API (seria substituído pela chamada real)
    const carregarReceitas = async () => {
      // Aqui faremos uma simulação, mas você substituiria isso por uma chamada ao seu backend
      const receitasExemplo = [
        {
          "nome": "Arroz e feijão com frango grelhado",
          "categoria": "almoço/jantar",
          "ingredientes": [
            {"nome": "arroz", "quantidade": 0.2, "unidade": "kg"},
            {"nome": "feijão", "quantidade": 0.1, "unidade": "kg"},
            {"nome": "peito de frango", "quantidade": 0.3, "unidade": "kg"},
            {"nome": "alho", "quantidade": 0.1, "unidade": "cabeça"},
            {"nome": "cebola", "quantidade": 0.1, "unidade": "kg"}
          ],
          "tempo_preparo": 40,
          "dificuldade": "fácil",
          "porcoes": 4
        },
        {
          "nome": "Macarrão à bolonhesa",
          "categoria": "almoço/jantar",
          "ingredientes": [
            {"nome": "macarrão", "quantidade": 1, "unidade": "pacote"},
            {"nome": "carne moída", "quantidade": 0.3, "unidade": "kg"},
            {"nome": "tomate", "quantidade": 0.3, "unidade": "kg"},
            {"nome": "cebola", "quantidade": 0.1, "unidade": "kg"},
            {"nome": "alho", "quantidade": 0.05, "unidade": "cabeça"}
          ],
          "tempo_preparo": 30,
          "dificuldade": "fácil",
          "porcoes": 4
        },
        {
          "nome": "Omelete de queijo",
          "categoria": "café da manhã/jantar",
          "ingredientes": [
            {"nome": "ovos", "quantidade": 0.25, "unidade": "dúzia"},
            {"nome": "leite", "quantidade": 0.05, "unidade": "L"},
            {"nome": "queijo", "quantidade": 0.1, "unidade": "kg"}
          ],
          "tempo_preparo": 15,
          "dificuldade": "fácil",
          "porcoes": 1
        }
      ];
      setReceitas(receitasExemplo);
    };

    carregarIngredientes();
    carregarReceitas();
  }, []);

  // Função para adicionar um ingrediente à receita atual
  const adicionarIngredienteNaReceita = () => {
    // Valida os campos
    if (!ingredienteSelecionado.nome || ingredienteSelecionado.quantidade <= 0) {
      alert('Selecione um ingrediente e especifique uma quantidade maior que zero.');
      return;
    }
    
    // Verifica se o ingrediente já existe na receita
    if (receitaAtual.ingredientes.some(ing => ing.nome === ingredienteSelecionado.nome)) {
      alert('Este ingrediente já foi adicionado à receita.');
      return;
    }
    
    // Encontra a unidade padrão do ingrediente selecionado
    const ingredienteInfo = ingredientes.find(i => i.nome === ingredienteSelecionado.nome);
    const unidade = ingredienteInfo ? ingredienteInfo.unidade : '';
    
    // Adiciona à lista de ingredientes da receita
    const novoIngrediente = {
      nome: ingredienteSelecionado.nome,
      quantidade: parseFloat(ingredienteSelecionado.quantidade),
      unidade: unidade
    };
    
    setReceitaAtual({
      ...receitaAtual,
      ingredientes: [...receitaAtual.ingredientes, novoIngrediente]
    });
    
    // Limpa o seletor de ingredientes
    setIngredienteSelecionado({
      nome: '',
      quantidade: 0,
      unidade: ''
    });
  };

  // Função para remover um ingrediente da receita atual
  const removerIngredienteDaReceita = (nome) => {
    setReceitaAtual({
      ...receitaAtual,
      ingredientes: receitaAtual.ingredientes.filter(ing => ing.nome !== nome)
    });
  };

  // Função para salvar a receita (adicionar nova ou atualizar existente)
  const salvarReceita = () => {
    // Valida campos obrigatórios
    if (!receitaAtual.nome || !receitaAtual.categoria || receitaAtual.ingredientes.length === 0) {
      alert('Por favor, preencha todos os campos obrigatórios e adicione pelo menos um ingrediente.');
      return;
    }

    if (modoEdicao) {
      // Atualiza uma receita existente
      setReceitas(receitas.map(rec => 
        rec.nome === receitaAtual.nome ? receitaAtual : rec
      ));
    } else {
      // Verifica se já existe uma receita com o mesmo nome
      if (receitas.some(rec => rec.nome.toLowerCase() === receitaAtual.nome.toLowerCase())) {
        alert('Já existe uma receita com este nome.');
        return;
      }
      // Adiciona nova receita
      setReceitas([...receitas, receitaAtual]);
    }
    
    // Limpa o formulário
    limparFormulario();
  };

  // Função para editar uma receita
  const editarReceita = (receita) => {
    setModoEdicao(true);
    setReceitaAtual({...receita});
    setVisualizandoReceita(null);
  };

  // Função para excluir uma receita
  const excluirReceita = (nome) => {
    if (window.confirm(`Tem certeza que deseja excluir a receita "${nome}"?`)) {
      setReceitas(receitas.filter(rec => rec.nome !== nome));
      
      // Se estiver visualizando esta receita, fecha a visualização
      if (visualizandoReceita && visualizandoReceita.nome === nome) {
        setVisualizandoReceita(null);
      }
    }
  };

  // Função para limpar o formulário
  const limparFormulario = () => {
    setReceitaAtual({
      nome: '',
      categoria: '',
      ingredientes: [],
      tempo_preparo: 0,
      dificuldade: 'fácil',
      porcoes: 1
    });
    setModoEdicao(false);
  };

  // Função para manipular mudanças nos campos do formulário da receita
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Para campos numéricos, converte para número
    if (name === 'tempo_preparo' || name === 'porcoes') {
      setReceitaAtual({...receitaAtual, [name]: value === '' ? 0 : parseInt(value)});
    } else {
      setReceitaAtual({...receitaAtual, [name]: value});
    }
  };

  // Função para manipular mudanças no ingrediente selecionado
  const handleChangeIngrediente = (e) => {
    const { name, value } = e.target;
    
    // Para o campo quantidade, converte para número
    if (name === 'quantidade') {
      setIngredienteSelecionado({
        ...ingredienteSelecionado,
        [name]: value === '' ? 0 : parseFloat(value)
      });
    } else {
      setIngredienteSelecionado({...ingredienteSelecionado, [name]: value});
    }
  };

  // Função para visualizar detalhes da receita
  const visualizarReceita = (receita) => {
    setVisualizandoReceita(receita);
  };

  // Filtragem de receitas
  const receitasFiltradas = receitas.filter(rec => {
    const matchesCategoria = filtroCategoria === '' || rec.categoria === filtroCategoria;
    const matchesBusca = filtroBusca === '' || 
      rec.nome.toLowerCase().includes(filtroBusca.toLowerCase());
    return matchesCategoria && matchesBusca;
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Gerenciador de Receitas</h1>
      
      <div className="flex flex-col gap-6">
        {/* Área de visualização de receita */}
        {visualizandoReceita && (
          <div className="bg-white p-4 rounded shadow mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{visualizandoReceita.nome}</h2>
              <button 
                onClick={() => setVisualizandoReceita(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <span className="font-medium">Categoria:</span> {visualizandoReceita.categoria}
              </div>
              <div>
                <span className="font-medium">Tempo de Preparo:</span> {visualizandoReceita.tempo_preparo} min
              </div>
              <div>
                <span className="font-medium">Porções:</span> {visualizandoReceita.porcoes}
              </div>
              <div>
                <span className="font-medium">Dificuldade:</span> {visualizandoReceita.dificuldade}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Ingredientes:</h3>
              <ul className="list-disc pl-5">
                {visualizandoReceita.ingredientes.map((ing, idx) => (
                  <li key={idx}>
                    {ing.quantidade} {ing.unidade} de {ing.nome}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => editarReceita(visualizandoReceita)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 flex items-center"
              >
                <Edit size={16} className="mr-1" /> Editar
              </button>
              <button
                onClick={() => excluirReceita(visualizandoReceita.nome)}
                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 flex items-center"
              >
                <Trash2 size={16} className="mr-1" /> Excluir
              </button>
            </div>
          </div>
        )}
        
        {/* Filtros */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Filtros</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="sm:w-1/2">
              <input
                type="text"
                placeholder="Buscar receitas..."
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
        </div>
        
        {/* Lista de Receitas */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Lista de Receitas</h2>
            <span className="text-sm text-gray-600">
              Total: {receitasFiltradas.length} receita(s)
            </span>
          </div>
          
          {receitasFiltradas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {receitasFiltradas.map(receita => (
                <div 
                  key={receita.nome} 
                  className="border rounded p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => visualizarReceita(receita)}
                >
                  <div className="font-medium text-blue-600 mb-1">{receita.nome}</div>
                  <div className="text-sm text-gray-600 mb-2">
                    {receita.categoria} • {receita.tempo_preparo} min • {receita.porcoes} porções
                  </div>
                  <div className="text-xs text-gray-500">
                    {receita.ingredientes.length} ingredientes • Dificuldade: {receita.dificuldade}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              Nenhuma receita encontrada
            </div>
          )}
        </div>
        
        {/* Formulário de Receita */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">
            {modoEdicao ? 'Editar Receita' : 'Adicionar Nova Receita'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome da Receita*</label>
              <input
                type="text"
                name="nome"
                value={receitaAtual.nome}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={modoEdicao}
                placeholder="Ex: Arroz com Feijão"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Categoria*</label>
              <select
                name="categoria"
                value={receitaAtual.categoria}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Tempo de Preparo (minutos)</label>
              <input
                type="number"
                name="tempo_preparo"
                value={receitaAtual.tempo_preparo}
                onChange={handleChange}
                min="1"
                className="w-full p-2 border rounded"
                placeholder="Ex: 30"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Porções</label>
              <input
                type="number"
                name="porcoes"
                value={receitaAtual.porcoes}
                onChange={handleChange}
                min="1"
                className="w-full p-2 border rounded"
                placeholder="Ex: 4"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Dificuldade</label>
              <select
                name="dificuldade"
                value={receitaAtual.dificuldade}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                {niveisDeificuldade.map(nivel => (
                  <option key={nivel} value={nivel}>{nivel}</option>
                ))}
              </select>
            </div>
          </div>
          
          <h3 className="text-md font-medium mb-2">Ingredientes*</h3>
          
          {/* Lista de ingredientes da receita */}
          <div className="mb-4 border rounded p-3 bg-gray-50">
            {receitaAtual.ingredientes.length > 0 ? (
              <ul className="mb-3">
                {receitaAtual.ingredientes.map((ing, idx) => (
                  <li key={idx} className="flex justify-between items-center mb-1 pb-1 border-b">
                    <span>
                      {ing.quantidade} {ing.unidade} de {ing.nome}
                    </span>
                    <button
                      onClick={() => removerIngredienteDaReceita(ing.nome)}
                      className="text-red-500 hover:text-red-700"
                      type="button"
                    >
                      <MinusCircle size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-2 text-gray-500 mb-3">
                Nenhum ingrediente adicionado
              </div>
            )}
            
            {/* Seletor de ingredientes */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Ingrediente</label>
                <select
                  name="nome"
                  value={ingredienteSelecionado.nome}
                  onChange={handleChangeIngrediente}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Selecione um ingrediente</option>
                  {ingredientes.map(ing => (
                    <option key={ing.nome} value={ing.nome}>{ing.nome}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Quantidade</label>
                <input
                  type="number"
                  name="quantidade"
                  value={ingredienteSelecionado.quantidade}
                  onChange={handleChangeIngrediente}
                  step="0.01"
                  min="0.01"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <button
                  onClick={adicionarIngredienteNaReceita}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full flex items-center justify-center"
                  type="button"
                >
                  <PlusCircle size={18} className="mr-1" /> Adicionar
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <button
              onClick={salvarReceita}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
              type="button"
            >
              <Save size={18} className="mr-1" /> {modoEdicao ? 'Atualizar Receita' : 'Salvar Receita'}
            </button>
            
            <button
              onClick={limparFormulario}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              type="button"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GerenciadorReceitas;
