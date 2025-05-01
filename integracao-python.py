import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from sistema_cardapio import SistemaCardapio  # Importa o módulo que você compartilhou

app = Flask(__name__)
CORS(app)  # Habilita o Cross-Origin Resource Sharing

# Inicializa o sistema de cardápio
sistema = SistemaCardapio()
sistema.carregar_dados()

# Rotas para gerenciamento de ingredientes
@app.route('/api/ingredientes', methods=['GET'])
def obter_ingredientes():
    """Retorna a lista de todos os ingredientes"""
    return jsonify(sistema.ingredientes_comuns)

@app.route('/api/ingredientes', methods=['POST'])
def adicionar_ingrediente():
    """Adiciona um novo ingrediente"""
    dados = request.json
    
    # Valida os dados obrigatórios
    if not all(k in dados for k in ['nome', 'categoria', 'unidade', 'duracao_dias']):
        return jsonify({'erro': 'Dados incompletos'}), 400
    
    # Verifica se o ingrediente já existe
    if any(ing['nome'].lower() == dados['nome'].lower() for ing in sistema.ingredientes_comuns):
        return jsonify({'erro': f'Já existe um ingrediente com o nome {dados["nome"]}'}), 400
    
    # Converte a duração para inteiro
    try:
        dados['duracao_dias'] = int(dados['duracao_dias'])
    except (ValueError, TypeError):
        return jsonify({'erro': 'A duração deve ser um número inteiro'}), 400
    
    # Adiciona o ingrediente no sistema
    sistema.adicionar_ingrediente(dados)
    
    # Salva a base de dados atualizada
    salvar_dados()
    
    return jsonify({'mensagem': 'Ingrediente adicionado com sucesso', 'ingrediente': dados}), 201

@app.route('/api/ingredientes/<nome>', methods=['PUT'])
def atualizar_ingrediente(nome):
    """Atualiza um ingrediente existente"""
    dados = request.json
    
    # Valida os dados obrigatórios
    if not all(k in dados for k in ['categoria', 'unidade', 'duracao_dias']):
        return jsonify({'erro': 'Dados incompletos'}), 400
    
    # Localiza o ingrediente a ser atualizado
    for i, ing in enumerate(sistema.ingredientes_comuns):
        if ing['nome'].lower() == nome.lower():
            # Não permite alterar o nome
            try:
                dados['duracao_dias'] = int(dados['duracao_dias'])
            except (ValueError, TypeError):
                return jsonify({'erro': 'A duração deve ser um número inteiro'}), 400
            
            # Atualiza o ingrediente
            sistema.ingredientes_comuns[i] = {
                'nome': nome,
                'categoria': dados['categoria'],
                'unidade': dados['unidade'],
                'duracao_dias': dados['duracao_dias']
            }
            
            # Salva a base de dados atualizada
            salvar_dados()
            
            return jsonify({'mensagem': 'Ingrediente atualizado com sucesso', 'ingrediente': sistema.ingredientes_comuns[i]})
    
    return jsonify({'erro': f'Ingrediente "{nome}" não encontrado'}), 404

@app.route('/api/ingredientes/<nome>', methods=['DELETE'])
def excluir_ingrediente(nome):
    """Exclui um ingrediente"""
    # Verifica se o ingrediente existe
    for i, ing in enumerate(sistema.ingredientes_comuns):
        if ing['nome'].lower() == nome.lower():
            # Remove o ingrediente
            ingrediente_removido = sistema.ingredientes_comuns.pop(i)
            
            # Remove também do estoque
            if nome in sistema.estoque_atual:
                del sistema.estoque_atual[nome]
            
            # Salva a base de dados atualizada
            salvar_dados()
            
            return jsonify({'mensagem': 'Ingrediente removido com sucesso', 'ingrediente': ingrediente_removido})
    
    return jsonify({'erro': f'Ingrediente "{nome}" não encontrado'}), 404

@app.route('/api/categorias', methods=['GET'])
def obter_categorias():
    """Retorna todas as categorias únicas de ingredientes"""
    categorias = set(ing['categoria'] for ing in sistema.ingredientes_comuns)
    return jsonify(sorted(list(categorias)))

@app.route('/api/unidades', methods=['GET'])
def obter_unidades():
    """Retorna todas as unidades únicas de ingredientes"""
    unidades = set(ing['unidade'] for ing in sistema.ingredientes_comuns)
    return jsonify(sorted(list(unidades)))

def salvar_dados():
    """Salva os dados em arquivos JSON"""
    try:
        # Salva ingredientes
        with open('ingredientes.json', 'w', encoding='utf-8') as f:
            json.dump(sistema.ingredientes_comuns, f, ensure_ascii=False, indent=4)
            
        # Salva estoque
        with open('estoque.json', 'w', encoding='utf-8') as f:
            json.dump(sistema.estoque_atual, f, ensure_ascii=False, indent=4)
            
        return True
    except Exception as e:
        print(f"Erro ao salvar dados: {e}")
        return False

# Ponto de entrada principal
if __name__ == '__main__':
    # Carrega dados dos arquivos se existirem
    if os.path.exists('ingredientes.json'):
        try:
            with open('ingredientes.json', 'r', encoding='utf-8') as f:
                sistema.ingredientes_comuns = json.load(f)
        except Exception as e:
            print(f"Erro ao carregar ingredientes: {e}")
    
    if os.path.exists('estoque.json'):
        try:
            with open('estoque.json', 'r', encoding='utf-8') as f:
                sistema.estoque_atual = json.load(f)
        except Exception as e:
            print(f"Erro ao carregar estoque: {e}")
    
    # Inicia o servidor
    app.run(debug=True, port=5000)