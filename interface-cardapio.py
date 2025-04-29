from flask import Flask, render_template, request, jsonify
from sistema_cardapio import SistemaCardapio
import json

app = Flask(__name__)
sistema = SistemaCardapio()
sistema.carregar_dados()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/atualizar-estoque', methods=['POST'])
def atualizar_estoque():
    dados = request.json
    sistema.atualizar_estoque(dados)
    return jsonify({"status": "ok", "estoque": sistema.estoque_atual})

@app.route('/atualizar-preferencias', methods=['POST'])
def atualizar_preferencias():
    dados = request.json
    sistema.atualizar_preferencias(dados)
    return jsonify({"status": "ok", "preferencias": sistema.preferencias})

@app.route('/adicionar-receita', methods=['POST'])
def adicionar_receita():
    receita = request.json
    sistema.adicionar_receita(receita)
    return jsonify({"status": "ok", "total_receitas": len(sistema.receitas)})

@app.route('/adicionar-ingrediente', methods=['POST'])
def adicionar_ingrediente():
    ingrediente = request.json
    sistema.adicionar_ingrediente(ingrediente)
    return jsonify({"status": "ok", "total_ingredientes": len(sistema.ingredientes_comuns)})

@app.route('/gerar-cardapio', methods=['GET'])
def gerar_cardapio():
    cardapio = sistema.gerar_cardapio_semanal()
    lista_compras = sistema.gerar_lista_compras(cardapio)
    
    return jsonify({
        "cardapio": cardapio,
        "cardapio_formatado": sistema.exibir_cardapio_formatado(cardapio),
        "lista_compras": lista_compras,
        "lista_compras_formatada": sistema.exibir_lista_compras_formatada(lista_compras)
    })

@app.route('/listar-receitas', methods=['GET'])
def listar_receitas():
    return jsonify({"receitas": sistema.receitas})

@app.route('/listar-ingredientes', methods=['GET'])
def listar_ingredientes():
    return jsonify({"ingredientes": sistema.ingredientes_comuns})

@app.route('/obter-estoque', methods=['GET'])
def obter_estoque():
    return jsonify({"estoque": sistema.estoque_atual})

@app.route('/obter-preferencias', methods=['GET'])
def obter_preferencias():
    return jsonify({"preferencias": sistema.preferencias})

if __name__ == '__main__':
    app.run(debug=True)
