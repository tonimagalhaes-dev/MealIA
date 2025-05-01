import React, { useState, useEffect } from 'react';
import { Menu, PlusCircle, ShoppingCart, Calendar, Users, Settings, Book } from 'lucide-react';

const AppCardapioFamiliar = () => {
  // Estado para controlar qual aba está ativa
  const [abaAtiva, setAbaAtiva] = useState('cardapio');
  // Estado para controlar se o menu mobile está aberto
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  // Opções de menu
  const opcoes = [
    { id: 'cardapio', nome: 'Cardápio', icone: <Calendar size={20} /> },
    { id: 'ingredientes', nome: 'Ingredientes', icone: <PlusCircle size={20} /> },
    { id: 'receitas', nome: 'Receitas', icone: <Book size={20} /> },
    { id: 'estoque', nome: 'Estoque', icone: <ShoppingCart size={20} /> },
    { id: 'configuracoes', nome: 'Configurações', icone: <Settings size={20} /> }
  ];

  // Função para alternar a exibição do menu mobile
  const toggleMenuMobile = () => {
    setMenuMobileAberto(!menuMobileAberto);
  };

  // Renderiza o componente correspondente à aba ativa
  const renderizarComponente = () => {
    switch (abaAtiva) {
      case 'ingredientes':
        return (
          <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Gerenciador de Ingredientes</h1>
            <div className="bg-white p-6 rounded shadow">
              <p className="text-center text-lg">
                Esta seção permite cadastrar, editar e excluir ingredientes para uso nas receitas. 
                Aqui você pode especificar detalhes como categoria, unidade de medida e tempo de validade.
              </p>
              <div className="mt-6 text-center">
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Implementar Gerenciador de Ingredientes
                </button>
              </div>
            </div>
          </div>
        );
      case 'receitas':
        return (
          <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Gerenciador de Receitas</h1>
            <div className="bg-white p-6 rounded shadow">
              <p className="text-center text-lg">
                Esta seção permite criar e gerenciar receitas, associando ingredientes, 
                definindo porções, tempo de preparo e dificuldade de cada receita.
              </p>
              <div className="mt-6 text-center">
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Implementar Gerenciador de Receitas
                </button>
              </div>
            </div>
          </div>
        );
      case 'estoque':
        return (
          <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Gerenciador de Estoque</h1>
            <div className="bg-white p-6 rounded shadow">
              <p className="text-center text-lg">
                Esta seção permite controlar o estoque de ingredientes disponíveis em casa,
                facilitando o planejamento da lista de compras.
              </p>
              <div className="mt-6 text-center">
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Implementar Gerenciador de Estoque
                </button>
              </div>
            </div>
          </div>
        );
      case 'cardapio':
        return (
          <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Cardápio Semanal</h1>
            
            <div className="bg-white p-6 rounded shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">Gerar Cardápio</h2>
              <p className="mb-4">
                Nosso sistema gera automaticamente um cardápio semanal balanceado com base nas
                receitas disponíveis e preferências da família.
              </p>
              <div className="flex justify-center">
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center">
                  <Calendar size={18} className="mr-2" /> Gerar Novo Cardápio
                </button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">Exemplo de Cardápio</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Dia</th>
                      <th className="border p-2 text-left">Café da Manhã</th>
                      <th className="border p-2 text-left">Almoço</th>
                      <th className="border p-2 text-left">Jantar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-medium">Segunda</td>
                      <td className="border p-2">Café com leite e pão</td>
                      <td className="border p-2">Arroz, feijão e frango grelhado</td>
                      <td className="border p-2">Sopa de legumes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-medium">Terça</td>
                      <td className="border p-2">Vitamina de frutas</td>
                      <td className="border p-2">Macarrão com molho bolonhesa</td>
                      <td className="border p-2">Omelete com salada</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-medium">Quarta</td>
                      <td className="border p-2">Iogurte com granola</td>
                      <td className="border p-2">Arroz, feijão e bife</td>
                      <td className="border p-2">Sanduíche natural</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-medium">Quinta</td>
                      <td className="border p-2">Mingau de aveia</td>
                      <td className="border p-2">Estrogonofe com arroz</td>
                      <td className="border p-2">Salada de macarrão</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-medium">Sexta</td>
                      <td className="border p-2">Café com leite e bolo</td>
                      <td className="border p-2">Feijoada</td>
                      <td className="border p-2">Crepioca com queijo</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-medium">Sábado</td>
                      <td className="border p-2">Panquecas com mel</td>
                      <td className="border p-2">Lasanha</td>
                      <td className="border p-2">Caldo verde</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-medium">Domingo</td>
                      <td className="border p-2">Café colonial</td>
                      <td className="border p-2">Churrasco</td>
                      <td className="border p-2">Torta salgada</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Lista de Compras</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded p-3">
                  <h3 className="font-medium mb-2 text-blue-700 border-b pb-1">Vegetais</h3>
                  <ul>
                    <li className="flex justify-between py-1">
                      <span>Tomate</span>
                      <span>1 kg</span>
                    </li>
                    <li className="flex justify-between py-1">
                      <span>Cebola</span>
                      <span>0.5 kg</span>
                    </li>
                    <li className="flex justify-between py-1">
                      <span>Alface</span>
                      <span>2 unidades</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded p-3">
                  <h3 className="font-medium mb-2 text-blue-700 border-b pb-1">Carnes</h3>
                  <ul>
                    <li className="flex justify-between py-1">
                      <span>Frango</span>
                      <span>1.5 kg</span>
                    </li>
                    <li className="flex justify-between py-1">
                      <span>Carne moída</span>
                      <span>0.8 kg</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded p-3">
                  <h3 className="font-medium mb-2 text-blue-700 border-b pb-1">Grãos</h3>
                  <ul>
                    <li className="flex justify-between py-1">
                      <span>Arroz</span>
                      <span>2 kg</span>
                    </li>
                    <li className="flex justify-between py-1">
                      <span>Feijão</span>
                      <span>1 kg</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded p-3">
                  <h3 className="font-medium mb-2 text-blue-700 border-b pb-1">Lácteos</h3>
                  <ul>
                    <li className="flex justify-between py-1">
                      <span>Leite</span>
                      <span>3 L</span>
                    </li>
                    <li className="flex justify-between py-1">
                      <span>Queijo</span>
                      <span>0.5 kg</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center">
                  <ShoppingCart size={18} className="mr-2" /> Exportar Lista de Compras
                </button>
              </div>
            </div>
          </div>
        );
      case 'configuracoes':
        return (
          <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Configurações</h1>
            <div className="bg-white p-6 rounded shadow">
              <div className="flex items-center mb-6">
                <Users size={24} className="mr-3 text-blue-600" />
                <h2 className="text-xl font-semibold">Perfil Familiar</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome da Família</label>
                  <input
                    type="text"
                    placeholder="Ex: Família Silva"
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Número de Pessoas</label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="4"
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Restrições Alimentares</label>
                  <textarea
                    placeholder="Ex: Um membro da família é vegetariano, outro tem intolerância a lactose"
                    className="w-full p-2 border rounded h-24"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Salvar Configurações
                </button>
              </div>
            </div>
            
            <div className="mt-6 bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Sobre o Sistema</h2>
              <p className="mb-2">Sistema de Cardápio Familiar com IA - Versão 1.0</p>
              <p className="text-gray-600">
                Este sistema ajuda famílias a planejar refeições semanais, gerenciar estoque de ingredientes
                e gerar listas de compras de forma inteligente.
              </p>
            </div>
          </div>
        );
      default:
        return <div>Componente não encontrado</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Menu size={24} className="mr-2" />
            <h1 className="text-xl font-bold">Cardápio Familiar</h1>
          </div>
          
          {/* Botão menu mobile */}
          <button 
            className="md:hidden"
            onClick={toggleMenuMobile}
          >
            <Menu size={24} />
          </button>
          
          {/* Menu desktop */}
          <nav className="hidden md:flex space-x-4">
            {opcoes.map(opcao => (
              <button
                key={opcao.id}
                className={`flex items-center px-3 py-2 rounded transition-colors ${
                  abaAtiva === opcao.id 
                    ? 'bg-white text-blue-600 font-medium' 
                    : 'text-white hover:bg-blue-500'
                }`}
                onClick={() => setAbaAtiva(opcao.id)}
              >
                <span className="mr-1">{opcao.icone}</span>
                {opcao.nome}
              </button>
            ))}
          </nav>
        </div>
      </header>
      
      {/* Menu mobile */}
      {menuMobileAberto && (
        <div className="md:hidden bg-blue-500 text-white">
          <nav className="container mx-auto px-4 py-2">
            {opcoes.map(opcao => (
              <button
                key={opcao.id}
                className={`flex items-center w-full px-3 py-2 rounded my-1 transition-colors ${
                  abaAtiva === opcao.id 
                    ? 'bg-white text-blue-600 font-medium' 
                    : 'text-white hover:bg-blue-400'
                }`}
                onClick={() => {
                  setAbaAtiva(opcao.id);
                  setMenuMobileAberto(false);
                }}
              >
                <span className="mr-2">{opcao.icone}</span>
                {opcao.nome}
              </button>
            ))}
          </nav>
        </div>
      )}
      
      {/* Conteúdo principal */}
      <main className="flex-grow p-4">
        {renderizarComponente()}
      </main>
      
      {/* Rodapé */}
      <footer className="bg-gray-200 text-gray-600 py-4 text-center text-sm">
        <div className="container mx-auto px-4">
          <p>© 2025 Sistema de Cardápio Familiar com IA - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default AppCardapioFamiliar;
