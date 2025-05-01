import React, { useState, useEffect } from 'react';
import { Calendar, RefreshCw, ShoppingCart, Printer, Download } from 'lucide-react';

const GeradorCardapio = () => {
  // Estados
  const [cardapio, setCardapio] = useState({});
  const [listaCompras, setListaCompras] = useState({});
  const [preferencias, setPreferencias] = useState({
    refeicoes_por_dia: 3,
    pessoas: 4,
    repeticao_maxima: 2,
    balanceamento: {
      proteína: 1,
      vegetal: 2,
      grãos: 2,
      fruta: 1
    }
  });
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [editandoPreferencias, setEditandoPreferencias] = useState(false);

  // Dias da semana
  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  
  // Refeições do dia
  const refeicoesDia = ["café da manhã", "almoço", "jantar"];

  // Efeito para carregar o cardápio salvo, se houver
  useEffect(() => {
    // Na implementação real, você faria uma requisição ao backend
    const carregarCardapioSalvo = async () => {
      // Simulação de um cardápio
      const cardapioExemplo = {
        "Segunda": {
          "café da manhã": "Café com leite e pão",
          "almoço": "Arroz e feijão com frango grelhado",
          "jantar": "Omelete de queijo"
        },
        "Terça": {
          "café da manhã": "Omelete de queijo",
          "almoço": "Macarrão à bolonhesa",
          "jantar": "Salada de alface com tomate"
        },
        "Quarta": {
          "café da manhã": "Café com leite e pão",
          "almoço": "Frango assado com batatas",
          "jantar": "Macarrão à bolonhesa"
        },
        "Quinta": {
          "café da manhã": "Salada de frutas",
          "almoço": "Arroz e feijão com frango grelhado",
          "jantar": "Purê de batatas"
        },
        "Sexta": {
          "café da manhã": "Café com leite e pão",
          "almoço": "Macarrão à bolonhesa",
          "jantar": "Omelete de queijo"
        },
        "Sábado": {
          "café da manhã": "Salada de frutas",
          "almoço": "Frango assado com batatas",
          "jantar": "Salada de alface com tomate"
        },
        "Domingo": {
          "café da manhã": "Café com leite e pão",
          "almoço": "Frango assado com batatas",
          "jantar": "Arroz e feijão com frango grelhado"
        }
      };
      
      // Exemplo de lista de compras
      const listaComprasExemplo = {
        "peito de frango": 1.8,
        "arroz": 0.6,
        "feijão": 0.4,
        "macarrão": 2,
        "tomate": 0.8,
        "alface": 2,
        "batata": 1.2,
        "cebola": 0.5,
        "alho": 0.3,
        "ovos": 1.5,
        "leite": 2,
        "pão": 6,
        "queijo": 0.5,
        "banana": 1,
        "maçã": 1,
        "laranja": 1
      };
      
      setCardapio(cardapioExemplo);
      setListaCompras(listaComprasExemplo);
    };
    
    carregarCardapioSalvo();
  }, []);

  // Função para gerar um novo cardápio
  const gerarNovoCardapio = async () => {
    try {
      setCarregando(true);
      setErro(null);
      setMensagem(null);
      
      // Aqui você faria a chamada à API para gerar o cardápio
      // Por exemplo:
      // const resposta = await fetch('/api/cardapio/gerar', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(preferencias)
      // });
      // const dados = await resposta.json();
      // setCardapio(dados.cardapio);
      // setListaCompras(dados.lista_compras);
      
      // Simulação de processamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulação de um novo cardápio gerado
      const novoCardapio = {
        "Segunda": {
          "café da manhã": "Café com leite e pão",
          "almoço": "Arroz e feijão com frango grelhado",
          "jantar": "Omelete de queijo"
        },
        "Terça": {
          "café da manhã": "Salada de frutas",
          "almoço": "Macarrão à bolonhesa",
          "jantar": "Salada de alface com tomate"
        },
        "Quarta": {
          "café da manhã": "Café com leite e pão",
          "almoço": "Frango assado com batatas",
          "jantar": "Macarrão à bolonhesa"
        },
        "Quinta": {
          "café da manhã": "Omelete de queijo",
          "almoço": "Arroz e feijão com frango grelhado",
          "jantar": "Purê de batatas"
        },
        "Sexta": {
          "café da manhã": "Café com leite e pão",
          "almoço": "Macarrão à bolonhesa",
          "jantar": "Frango assado com batatas"
        },
        "Sábado": {
          "café da manhã": "Salada de frutas",
          "almoço": "Omelete de queijo",
          "jantar": "Salada de alface com tomate"
        },
        "Domingo": {
          "café da manhã": "Café com leite e pão",
          "almoço": "Arroz e feijão com frango grelhado",
          "jantar": "Purê de batatas"
        }
      };
      
      // Nova lista de compras simulada
      const novaListaCompras = {
        "peito de frango": 2.0,
        "arroz": 0.8,
        "feijão": 0.5,
        "macarrão": 2,
        "tomate": 1.0,
        "alface": 3,
        "batata": 1.5,
        "cebola": 0.6,
        "alho": 0.3,
        "ovos": 2.0,
        "leite": 2.5,
        "pão": 7,
        "queijo": 0.7,
        "banana": 1.2,
        "maçã": 1.2,
        "laranja": 1.2
      };
      
      setCardapio(novoCardapio);
      setListaCompras(novaListaCompras);
      
      setMensagem("Cardápio gerado com sucesso!");
      setTimeout(() => setMensagem(null), 3000);
      
    } catch (error) {
      console.error("Erro ao gerar cardápio:", error);
      setErro(`Não foi possível gerar o cardápio: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };

  // Função para salvar o cardápio atual
  const salvarCardapio = async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      // Aqui você faria a chamada à API para salvar o cardápio
      // Por exemplo:
      // await fetch('/api/cardapio/salvar', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ cardapio, lista_compras: listaCompras })
      // });
      
      // Simulação de processamento
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setMensagem("Cardápio salvo com sucesso!");
      setTimeout(() => setMensagem(null), 3000);
      
    } catch (error) {
      console.error("Erro ao salvar cardápio:", error);
      setErro(`Não foi possível salvar o cardápio: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };

  // Função para imprimir o cardápio
  const imprimirCardapio = () => {
    window.print();
  };

  // Função para atualizar as preferências
  const atualizarPreferencias = (campo, valor) => {
    if (campo.includes('.')) {
      // Atualizar campo aninhado (balanceamento)
      const [pai, filho] = campo.split('.');
      setPreferencias({
        ...preferencias,
        [pai]: {
          ...preferencias[pai],
          [filho]: parseInt(valor)
        }
      });
    } else {
      // Atualizar campo direto
      setPreferencias({
        ...preferencias,
        [campo]: parseInt(valor)
      });
    }
  };

  // Função para salvar as preferências
  const salvarPreferencias = async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      // Aqui você faria a chamada à API para salvar as preferências
      // Por exemplo:
      // await fetch('/api/preferencias', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(preferencias)
      // });
      
      // Simulação de processamento
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMensagem("Preferências salvas com sucesso!");
      setTimeout(() => setMensagem(null), 3000);
      setEditandoPreferencias(false);
      
    } catch (error) {
      console.error("Erro ao salvar preferências:", error);
      setErro(`Não foi possível salvar as preferências: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };

  // Obter as categorias da lista de compras
  const categorias = Object.entries(listaCompras).reduce((acc, [nome, quantidade]) => {
    // Na implementação real, você teria acesso às categorias dos ingredientes
    // Aqui estamos simplesmente definindo algumas categorias para exemplificação
    const categoriasPadrao = {
      "peito de frango": "proteína",
      "arroz": "grãos",
      "feijão": "grãos",
      "macarrão": "grãos",
      "tomate": "vegetal",
      "alface": "vegetal",
      "batata": "vegetal",
      "cebola": "vegetal",
      "alho": "tempero",
      "ovos": "proteína",
      "leite": "laticínio",
      "pão": "padaria",
      "queijo": "laticínio",
      "banana": "fruta",
      "maçã": "fruta",
      "laranja": "fruta"
    };
    
    const categoria = categoriasPadrao[nome] || "outros";
    
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    
    acc[categoria].push({ nome, quantidade });
    return acc;
  }, {});

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Cardápio Semanal</h1>
      
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-lg">Processando...</p>
          </div>
        </div>
      )}
      
      {/* Botões de Ação */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          onClick={gerarNovoCardapio}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
          disabled={carregando}
        >
          <RefreshCw size={16} className="mr-1" /> Gerar Novo Cardápio
        </button>
        
        <button
          onClick={salvarCardapio}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center"
          disabled={carregando || Object.keys(cardapio).length === 0}
        >
          <Download size={16} className="mr-1" /> Salvar Cardápio
        </button>
        
        <button
          onClick={imprimirCardapio}
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 flex items-center"
          disabled={carregando || Object.keys(cardapio).length === 0}
        >
          <Printer size={16} className="mr-1" /> Imprimir Cardápio
        </button>
        
        <button
          onClick={() => setEditandoPreferencias(true)}
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 flex items-center"
          disabled={carregando}
        >
          <Calendar size={16} className="mr-1" /> Configurar Preferências
        </button>
      </div>
      
      {/* Modal de Preferências */}
      {editandoPreferencias && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Configurar Preferências</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Número de pessoas</label>
                <input
                  type="number"
                  value={preferencias.pessoas}
                  onChange={(e) => atualizarPreferencias('pessoas', e.target.value)}
                  min="1"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Refeições por dia</label>
                <select
                  value={preferencias.refeicoes_por_dia}
                  onChange={(e) => atualizarPreferencias('refeicoes_por_dia', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="2">2 (Almoço e Jantar)</option>
                  <option value="3">3 (Café da manhã, Almoço e Jantar)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Repetição máxima de receitas na semana</label>
                <select
                  value={preferencias.repeticao_maxima}
                  onChange={(e) => atualizarPreferencias('repeticao_maxima', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="1">1 vez</option>
                  <option value="2">2 vezes</option>
                  <option value="3">3 vezes</option>
                  <option value="4">4 vezes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Balanceamento Diário</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium mb-1">Proteínas/dia</label>
                    <input
                      type="number"
                      value={preferencias.balanceamento.proteína}
                      onChange={(e) => atualizarPreferencias('balanceamento.proteína', e.target.value)}
                      min="0"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Vegetais/dia</label>
                    <input
                      type="number"
                      value={preferencias.balanceamento.vegetal}
                      onChange={(e) => atualizarPreferencias('balanceamento.vegetal', e.target.value)}
                      min="0"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Grãos/dia</label>
                    <input
                      type="number"
                      value={preferencias.balanceamento.grãos}
                      onChange={(e) => atualizarPreferencias('balanceamento.grãos', e.target.value)}
                      min="0"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Frutas/dia</label>
                    <input
                      type="number"
                      value={preferencias.balanceamento.fruta}
                      onChange={(e) => atualizarPreferencias('balanceamento.fruta', e.target.value)}
                      min="0"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={() => setEditandoPreferencias(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={salvarPreferencias}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Salvar Preferências
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Cardápio */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">📅 Cardápio da Semana</h2>
        
        {Object.keys(cardapio).length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Dia</th>
                  {refeicoesDia.slice(0, preferencias.refeicoes_por_dia).map(refeicao => (
                    <th key={refeicao} className="border p-2 text-left">
                      {refeicao.charAt(0).toUpperCase() + refeicao.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {diasSemana.map(dia => (
                  <tr key={dia} className="hover:bg-gray-50">
                    <td className="border p-2 font-medium">{dia}</td>
                    {refeicoesDia.slice(0, preferencias.refeicoes_por_dia).map(refeicao => (
                      <td key={`${dia}-${refeicao}`} className="border p-2">
                        {cardapio[dia] && cardapio[dia][refeicao] ? cardapio[dia][refeicao] : 'Não definido'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Nenhum cardápio gerado ainda. Clique em "Gerar Novo Cardápio" para começar.
          </div>
        )}
      </div>
      
      {/* Lista de Compras */}
      {Object.keys(listaCompras).length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">🛒 Lista de Compras</h2>
            <button 
              onClick={imprimirCardapio}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Printer size={16} className="mr-1" /> Imprimir
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(categorias).sort().map(([categoria, itens]) => (
              <div key={categoria} className="border rounded p-3">
                <h3 className="font-medium mb-2 text-blue-700 border-b pb-1">
                  {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                </h3>
                <ul className="space-y-1">
                  {itens.map(item => {
                    // Encontra a unidade para o item (em uma implementação real, viria do backend)
                    const unidades = {
                      "peito de frango": "kg",
                      "arroz": "kg",
                      "feijão": "kg",
                      "macarrão": "pacote",
                      "tomate": "kg",
                      "alface": "unidade",
                      "batata": "kg",
                      "cebola": "kg",
                      "alho": "cabeça",
                      "ovos": "dúzia",
                      "leite": "L",
                      "pão": "unidade",
                      "queijo": "kg",
                      "banana": "kg",
                      "maçã": "kg",
                      "laranja": "kg"
                    };
                    
                    const unidade = unidades[item.nome] || "un";
                    
                    return (
                      <li key={item.nome} className="flex justify-between items-center">
                        <span className="capitalize">{item.nome}</span>
                        <span className="text-gray-600 font-medium">
                          {item.quantidade} {unidade}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center mx-auto"
            >
              <ShoppingCart size={16} className="mr-1" /> Exportar Lista de Compras
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeradorCardapio;