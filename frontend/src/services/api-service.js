/**
 * api-service.js
 * Serviço para comunicação com a API do backend do Sistema de Cardápio Familiar
 */

// URL base da API
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Funções auxiliares para as requisições HTTP
 */
const ApiService = {
  // Requisição GET
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Erro ao realizar GET para ${endpoint}:`, error);
      throw error;
    }
  },

  // Requisição POST
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Erro ao realizar POST para ${endpoint}:`, error);
      throw error;
    }
  },

  // Requisição PUT
  async put(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Erro ao realizar PUT para ${endpoint}:`, error);
      throw error;
    }
  },

  // Requisição DELETE
  async delete(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Erro ao realizar DELETE para ${endpoint}:`, error);
      throw error;
    }
  },
};

/**
 * Serviços específicos para cada funcionalidade
 */

// Serviço para Ingredientes
export const IngredientesService = {
  // Obter todos os ingredientes
  obterTodos() {
    return ApiService.get('ingredientes');
  },

  // Adicionar um novo ingrediente
  adicionar(ingrediente) {
    return ApiService.post('ingredientes', ingrediente);
  },

  // Atualizar um ingrediente existente
  atualizar(nome, ingrediente) {
    return ApiService.put(`ingredientes/${nome}`, ingrediente);
  },

  // Excluir um ingrediente
  excluir(nome) {
    return ApiService.delete(`ingredientes/${nome}`);
  },

  // Obter todas as categorias
  obterCategorias() {
    return ApiService.get('categorias');
  },

  // Obter todas as unidades
  obterUnidades() {
    return ApiService.get('unidades');
  },
};

// Serviço para Receitas
export const ReceitasService = {
  // Obter todas as receitas
  obterTodas() {
    return ApiService.get('receitas');
  },

  // Adicionar uma nova receita
  adicionar(receita) {
    return ApiService.post('receitas', receita);
  },

  // Atualizar uma receita existente
  atualizar(nome, receita) {
    return ApiService.put(`receitas/${nome}`, receita);
  },

  // Excluir uma receita
  excluir(nome) {
    return ApiService.delete(`receitas/${nome}`);
  },
};

// Serviço para Estoque
export const EstoqueService = {
  // Obter o estoque atual
  obterEstoque() {
    return ApiService.get('estoque');
  },

  // Atualizar o estoque completo
  atualizarEstoque(estoque) {
    return ApiService.put('estoque', estoque);
  },

  // Atualizar a quantidade de um item específico
  atualizarItem(nome, quantidade) {
    return ApiService.put(`estoque/${nome}`, { quantidade });
  },
};

// Serviço para Cardápio
export const CardapioService = {
  // Obter o cardápio atual
  obterCardapio() {
    return ApiService.get('cardapio');
  },

  // Gerar um novo cardápio
  gerarCardapio(preferencias = null) {
    return ApiService.post('cardapio', preferencias ? { preferencias } : {});
  },

  // Salvar um cardápio manualmente
  salvarCardapio(cardapio) {
    return ApiService.put('cardapio', cardapio);
  },

  // Obter a lista de compras
  obterListaCompras() {
    return ApiService.get('lista-compras');
  },
};

// Serviço para Preferências
export const PreferenciasService = {
  // Obter as preferências atuais
  obterPreferencias() {
    return ApiService.get('preferencias');
  },

  // Atualizar as preferências
  atualizarPreferencias(preferencias) {
    return ApiService.put('preferencias', preferencias);
  },
};

// Exportar todos os serviços
export default {
  ingredientes: IngredientesService,
  receitas: ReceitasService,
  estoque: EstoqueService,
  cardapio: CardapioService,
  preferencias: PreferenciasService,
};
