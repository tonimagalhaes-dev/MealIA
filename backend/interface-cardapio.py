from flask import Flask, render_template, request, jsonify, redirect, url_for
from sistema_cardapio import SistemaCardapio

app = Flask(__name__)
sistema = SistemaCardapio()
sistema.carregar_dados()

@app.route('/')
def index():
    return render_template('index.html')

# Rota para gerar cardápio em HTML
@app.route('/gerar_cardapio', methods=['GET', 'POST'])
def gerar_cardapio():
    if request.method == 'POST':
        try:
            num_pessoas = int(request.form.get('pessoas', 4))
            preferencias = {
                'pessoas': num_pessoas
                # Adicione mais campos de preferência conforme necessário
            }
            sistema.atualizar_preferencias(preferencias)
        except:
            pass
    
    cardapio = sistema.gerar_cardapio_semanal()
    lista_compras = sistema.gerar_lista_compras(cardapio)
    
    cardapio_formatado = sistema.exibir_cardapio_formatado(cardapio)
    lista_compras_formatada = sistema.exibir_lista_compras_formatada(lista_compras)
    
    # Certifique-se de que está renderizando o template, não retornando JSON
    return render_template('cardapio.html', 
                          cardapio_formatado=cardapio_formatado,
                          lista_compras_formatada=lista_compras_formatada)

# Se quiser uma API JSON separada, mantenha esta rota
@app.route('/api/cardapio', methods=['GET'])
def api_cardapio():
    cardapio = sistema.gerar_cardapio_semanal()
    lista_compras = sistema.gerar_lista_compras(cardapio)
    
    return jsonify({
        'cardapio': cardapio,
        'lista_compras': lista_compras
    })

if __name__ == '__main__':
    app.run(debug=True)