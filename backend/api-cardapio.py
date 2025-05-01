import os
import json
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from sistema_cardapio import SistemaCardapio

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)  # Habilita o Cross-Origin Resource Sharing

# Inicializa o sistema de cardápio
sistema = SistemaCardapio()

# Configurações
DATA_DIR = 'data'
INGREDIENTES_FILE = os.path.join(DATA_DIR, 'ingredientes.json')
RECEITAS_FILE = os.path.join(DATA_DIR, 'receitas.json')
ESTOQUE_FILE = os.path.join(DATA_DIR, 'estoque.json')
PREFERENCIAS_FILE = os.path.join(DATA_DIR, 'preferencias.json')
CARDAPIO_FILE = os.path.join(DATA_DIR, 'cardapio_atual.json')
LISTA_COMPRAS_FILE = os.path.join(DATA_DIR, 'lista_compras_atual.json')

# Cria diretório de dados se não existir
os.makedirs(DATA_DIR, exist_ok=True)

def inicializar_sistema():
    """Inicializa o sistema com dados do disco ou usa os dados padrão"""
    try:
        # Carrega ingredientes
        if os.path.exists(INGREDIENTES_FILE):
            with open(INGREDIENTES_FILE, 'r', encoding='utf-8') as f:
                sistema.ingredientes_comuns = json.load(f)
            
        # Carrega receitas
        if os.path.exists(RECEITAS_FILE):
            with open(RECEITAS_FILE, 'r', encoding='utf-8') as f:
                sistema.receitas = json.load(f)
                
        # Carrega estoque
        if os.path.exists(ESTOQUE_FILE):
            with open(ESTOQUE_FILE, 'r', encoding='utf-8') as f:
                sistema.estoque_atual = json.load(f)
                
        # Carrega preferências
        if os.path.exists(PREFERENCIAS_FILE):
            with open(PREFERENCIAS_FILE, 'r', encoding='utf-8') as f:
                sistema.preferencias = json.load(f)
        
        # Se não houver dados, carrega os padrões
        if not sistema.ingredientes_comuns or not sistema.receitas:
            sistema.carregar_dados()
            
    except Exception as e:
        print(f"Erro ao inicializar sistema: {e}")
        # Carrega dados padrão
        sistema.carregar_dados()

def salvar_dados():
    """Salva todos os dados do sistema em arquivos JSON"""
    try:
        # Salva ingredientes
        with open(INGREDIENTES_FILE, 'w', encoding='utf-8') as f:
            json.dump(sistema.ingredientes_comuns, f, ensure_ascii=False, indent=4)
            
        # Salva receitas
        with open(RECEITAS_FILE, 'w', encoding='utf-8') as f:
            json.dump(sistema.receitas, f, ensure_ascii=False, indent=4)
            
        # Salva estoque
        with open(ESTOQUE_FILE, 'w', encoding='utf-8') as f:
            json.dump(sistema.estoque_atual, f, ensure_ascii=False, indent=4)
            
        # Salva preferências
        with open(PREFERENCIAS_FILE, 'w', encoding='utf-8') as f:
            json.dump(sistema.preferencias, f, ensure_ascii=False, indent=4)
            
        return True
    except Exception as e:
        print(f"Erro ao salvar dados: {e}")
        return False

# Rotas para servir a aplicação frontend
@app.route('/')
def index():
    """Rota principal que serve o frontend React"""
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_proxy(path):
    """Serve arquivos estáticos do frontend"""
    return app.send_static_file(path)

# API para Ingredientes
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
            # Converte a duração para inteiro
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

# API para Estoque
@app.route('/api/estoque', methods=['GET'])
def obter_estoque():
    """Retorna o estoque atual"""
    return jsonify(sistema.estoque_atual)

@app.route('/api/estoque', methods=['PUT'])
def atualizar_estoque():
    """Atualiza o estoque atual"""
    novo_estoque = request.json
    
    if not isinstance(novo_estoque, dict):
        return jsonify({'erro': 'O estoque deve ser um objeto'}), 400
    
    # Atualiza o estoque
    sistema.atualizar_estoque(novo_estoque)
    
    # Salva a base de dados atualizada
    salvar_dados()
    
    return jsonify({'mensagem': 'Estoque atualizado com sucesso', 'estoque': sistema.estoque_atual})

@app.route('/api/estoque/<nome>', methods=['PUT'])
def atualizar_item_estoque(nome):
    """Atualiza um item específico no estoque"""
    dados = request.json
    
    if 'quantidade' not in dados:
        return jsonify({'erro': 'A quantidade é obrigatória'}), 400
    
    try:
        quantidade = float(dados['quantidade'])
    except (ValueError, TypeError):
        return jsonify({'erro': 'A quantidade deve ser um número'}), 400
    
    # Verifica se o ingrediente existe
    if not any(ing['nome'].lower() == nome.lower() for ing in sistema.ingredientes_comuns):
        return jsonify({'erro': f'Ingrediente "{nome}" não encontrado'}), 404
    
    # Atualiza o estoque
    novo_estoque = {**sistema.estoque_atual}
    
    if quantidade <= 0:
        if nome in novo_estoque:
            del novo_estoque[nome]
    else:
        novo_estoque[nome] = quantidade
    
    sistema.atualizar_estoque(novo_estoque)
    
    # Salva a base de dados atualizada
    salvar_dados()
    
    return jsonify({'mensagem': f'Estoque de {nome} atualizado com sucesso', 'quantidade': quantidade})

# API para Receitas
@app.route('/api/receitas', methods=['GET'])
def obter_receitas():
    """Retorna a lista de todas as receitas"""
    return jsonify(sistema.receitas)

@app.route('/api/receitas', methods=['POST'])
def adicionar_receita():
    """Adiciona uma nova receita"""
    dados = request.json
    
    # Valida os dados obrigatórios
    if not all(k in dados for k in ['nome', 'categoria', 'ingredientes', 'tempo_preparo', 'dificuldade', 'porcoes']):
        return jsonify({'erro': 'Dados incompletos'}), 400
    
    # Verifica se a receita já existe
    if any(rec['nome'].lower() == dados['nome'].lower() for rec in sistema.receitas):
        return jsonify({'erro': f'Já existe uma receita com o nome {dados["nome"]}'}), 400
    
    # Valida ingredientes
    if not isinstance(dados['ingredientes'], list) or len(dados['ingredientes']) == 0:
        return jsonify({'erro': 'A receita deve ter pelo menos um ingrediente'}), 400
    
    for ing in dados['ingredientes']:
        if not all(k in ing for k in ['nome', 'quantidade', 'unidade']):
            return jsonify({'erro': 'Dados de ingrediente incompletos'}), 400
    
    # Adiciona a receita no sistema
    sistema.adicionar_receita(dados)
    
    # Salva a base de dados atualizada
    salvar_dados()
    
    return jsonify({'mensagem': 'Receita adicionada com sucesso', 'receita': dados}), 201

@app.route('/api/receitas/<nome>', methods=['PUT'])
def atualizar_receita(nome):
    """Atualiza uma receita existente"""
    dados = request.json
    
    # Valida os dados obrigatórios
    if not all(k in dados for k in ['categoria', 'ingredientes', 'tempo_preparo', 'dificuldade', 'porcoes']):
        return jsonify({'erro': 'Dados incompletos'}), 400
    
    # Valida ingredientes
    if not isinstance(dados['ingredientes'], list) or len(dados['ingredientes']) == 0:
        return jsonify({'erro': 'A receita deve ter pelo menos um ingrediente'}), 400
    
    for ing in dados['ingredientes']:
        if not all(k in ing for k in ['nome', 'quantidade', 'unidade']):
            return jsonify({'erro': 'Dados de ingrediente incompletos'}), 400
    
    # Localiza a receita a ser atualizada
    for i, rec in enumerate(sistema.receitas):
        if rec['nome'].lower() == nome.lower():
            # Atualiza a receita mantendo o nome original
            sistema.receitas[i] = {
                'nome': nome,
                'categoria': dados['categoria'],
                'ingredientes': dados['ingredientes'],
                'tempo_preparo': dados['tempo_preparo'],
                'dificuldade': dados['dificuldade'],
                'porcoes': dados['porcoes']
            }
            
            # Salva a base de dados atualizada
            salvar_dados()
            
            return jsonify({'mensagem': 'Receita atualizada com sucesso', 'receita': sistema.receitas[i]})
    
    return jsonify({'erro': f'Receita "{nome}" não encontrada'}), 404

@app.route('/api/receitas/<nome>', methods=['DELETE'])
def excluir_receita(nome):
    """Exclui uma receita"""
    # Verifica se a receita existe
    for i, rec in enumerate(sistema.receitas):
        if rec['nome'].lower() == nome.lower():
            # Remove a receita
            receita_removida = sistema.receitas.pop(i)
            
            # Salva a base de dados atualizada
            salvar_dados()
            
            return jsonify({'mensagem': 'Receita removida com sucesso', 'receita': receita_removida})
    
    return jsonify({'erro': f'Receita "{nome}" não encontrada'}), 404

# API para Cardápio
@app.route('/api/cardapio', methods=['GET'])
def obter_cardapio():
    """Retorna o cardápio atual salvo"""
    if os.path.exists(CARDAPIO_FILE):
        with open(CARDAPIO_FILE, 'r', encoding='utf-8') as f:
            return jsonify(json.load(f))
    return jsonify({})

@app.route('/api/cardapio', methods=['POST'])
def gerar_cardapio():
    """Gera um novo cardápio semanal"""
    # Atualiza preferências se fornecidas
    if request.json and 'preferencias' in request.json:
        sistema.atualizar_preferencias(request.json['preferencias'])
        salvar_dados()
    
    # Gera o cardápio
    cardapio = sistema.gerar_cardapio_semanal()
    
    # Gera a lista de compras
    lista_compras = sistema.gerar_lista_compras(cardapio)
    
    # Salva o cardápio e a lista de compras
    with open(CARDAPIO_FILE, 'w', encoding='utf-8') as f:
        json.dump(cardapio, f, ensure_ascii=False, indent=4)
        
    with open(LISTA_COMPRAS_FILE, 'w', encoding='utf-8') as f:
        json.dump(lista_compras, f, ensure_ascii=False, indent=4)
    
    return jsonify({
        'mensagem': 'Cardápio gerado com sucesso',
        'cardapio': cardapio,
        'lista_compras': lista_compras
    })

@app.route('/api/cardapio', methods=['PUT'])
def salvar_cardapio():
    """Salva um cardápio manualmente"""
    dados = request.json
    
    if not dados or not isinstance(dados, dict):
        return jsonify({'erro': 'Dados inválidos'}), 400
    
    # Salva o cardápio
    with open(CARDAPIO_FILE, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=4)
    
    # Se uma lista de compras for fornecida, salva também
    if 'lista_compras' in dados:
        with open(LISTA_COMPRAS_FILE, 'w', encoding='utf-8') as f:
            json.dump(dados['lista_compras'], f, ensure_ascii=False, indent=4)
    
    return jsonify({'mensagem': 'Cardápio salvo com sucesso'})

@app.route('/api/lista-compras', methods=['GET'])
def obter_lista_compras():
    """Retorna a lista de compras atual"""
    if os.path.exists(LISTA_COMPRAS_FILE):
        with open(LISTA_COMPRAS_FILE, 'r', encoding='utf-8') as f:
            return jsonify(json.load(f))
    return jsonify({})

@app.route('/api/preferencias', methods=['GET'])
def obter_preferencias():
    """Retorna as preferências atuais do sistema"""
    return jsonify(sistema.preferencias)

@app.route('/api/preferencias', methods=['PUT'])
def atualizar_preferencias():
    """Atualiza as preferências do sistema"""
    dados = request.json
    
    if not dados or not isinstance(dados, dict):
        return jsonify({'erro': 'Dados inválidos'}), 400
    
    # Atualiza as preferências
    sistema.atualizar_preferencias(dados)
    
    # Salva a base de dados atualizada
    salvar_dados()
    
    return jsonify({'mensagem': 'Preferências atualizadas com sucesso', 'preferencias': sistema.preferencias})

# Ponto de entrada principal
if __name__ == '__main__':
    # Inicializa o sistema
    inicializar_sistema()
    
    # Inicia o servidor
    app.run(debug=True, host='0.0.0.0', port=5000)