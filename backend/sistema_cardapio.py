import json
import random
import datetime
from collections import defaultdict

class SistemaCardapio:
    def __init__(self):
        # Bases de dados
        self.ingredientes_comuns = []
        self.receitas = []
        self.preferencias = {}
        self.estoque_atual = {}
        
    def carregar_dados(self, arquivo_ingredientes=None, arquivo_receitas=None):
        """Carrega dados de arquivos JSON ou usa exemplos padrão"""
        if arquivo_ingredientes:
            with open(arquivo_ingredientes, 'r', encoding='utf-8') as f:
                self.ingredientes_comuns = json.load(f)
        else:
            # Exemplo de ingredientes comuns
            self.ingredientes_comuns = [
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
                {"nome": "leite", "categoria": "laticínio", "unidade": "L", "duracao_dias": 7},
                {"nome": "queijo", "categoria": "laticínio", "unidade": "kg", "duracao_dias": 10},
                {"nome": "pão", "categoria": "padaria", "unidade": "unidade", "duracao_dias": 5},
                {"nome": "azeite", "categoria": "óleo", "unidade": "garrafa", "duracao_dias": 180},
                {"nome": "sal", "categoria": "tempero", "unidade": "kg", "duracao_dias": 365},
                {"nome": "açúcar", "categoria": "tempero", "unidade": "kg", "duracao_dias": 365},
                {"nome": "café", "categoria": "bebida", "unidade": "pacote", "duracao_dias": 90},
                {"nome": "banana", "categoria": "fruta", "unidade": "kg", "duracao_dias": 7},
                {"nome": "maçã", "categoria": "fruta", "unidade": "kg", "duracao_dias": 14},
                {"nome": "laranja", "categoria": "fruta", "unidade": "kg", "duracao_dias": 14}
            ]
        
        if arquivo_receitas:
            with open(arquivo_receitas, 'r', encoding='utf-8') as f:
                self.receitas = json.load(f)
        else:
            # Exemplo de receitas simples
            self.receitas = [
                {
                    "nome": "Arroz e feijão com frango grelhado",
                    "categoria": "almoço/jantar",
                    "ingredientes": [
                        {"nome": "arroz", "quantidade": 0.2, "unidade": "kg"},
                        {"nome": "feijão", "quantidade": 0.1, "unidade": "kg"},
                        {"nome": "peito de frango", "quantidade": 0.3, "unidade": "kg"},
                        {"nome": "alho", "quantidade": 0.1, "unidade": "cabeça"},
                        {"nome": "cebola", "quantidade": 0.1, "unidade": "kg"},
                        {"nome": "azeite", "quantidade": 0.02, "unidade": "garrafa"},
                        {"nome": "sal", "quantidade": 0.005, "unidade": "kg"}
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
                        {"nome": "alho", "quantidade": 0.05, "unidade": "cabeça"},
                        {"nome": "azeite", "quantidade": 0.03, "unidade": "garrafa"},
                        {"nome": "sal", "quantidade": 0.005, "unidade": "kg"}
                    ],
                    "tempo_preparo": 30,
                    "dificuldade": "fácil",
                    "porcoes": 4
                },
                {
                    "nome": "Salada de alface com tomate",
                    "categoria": "acompanhamento",
                    "ingredientes": [
                        {"nome": "alface", "quantidade": 1, "unidade": "unidade"},
                        {"nome": "tomate", "quantidade": 0.2, "unidade": "kg"},
                        {"nome": "azeite", "quantidade": 0.01, "unidade": "garrafa"},
                        {"nome": "sal", "quantidade": 0.002, "unidade": "kg"}
                    ],
                    "tempo_preparo": 10,
                    "dificuldade": "fácil",
                    "porcoes": 4
                },
                {
                    "nome": "Omelete de queijo",
                    "categoria": "café da manhã/jantar",
                    "ingredientes": [
                        {"nome": "ovos", "quantidade": 0.25, "unidade": "dúzia"},
                        {"nome": "queijo", "quantidade": 0.1, "unidade": "kg"},
                        {"nome": "sal", "quantidade": 0.002, "unidade": "kg"},
                        {"nome": "azeite", "quantidade": 0.01, "unidade": "garrafa"}
                    ],
                    "tempo_preparo": 15,
                    "dificuldade": "fácil",
                    "porcoes": 1
                },
                {
                    "nome": "Café com leite e pão",
                    "categoria": "café da manhã",
                    "ingredientes": [
                        {"nome": "café", "quantidade": 0.02, "unidade": "pacote"},
                        {"nome": "leite", "quantidade": 0.1, "unidade": "L"},
                        {"nome": "pão", "quantidade": 1, "unidade": "unidade"},
                        {"nome": "queijo", "quantidade": 0.05, "unidade": "kg"}
                    ],
                    "tempo_preparo": 5,
                    "dificuldade": "fácil",
                    "porcoes": 1
                },
                {
                    "nome": "Salada de frutas",
                    "categoria": "sobremesa/lanche",
                    "ingredientes": [
                        {"nome": "banana", "quantidade": 0.2, "unidade": "kg"},
                        {"nome": "maçã", "quantidade": 0.2, "unidade": "kg"},
                        {"nome": "laranja", "quantidade": 0.2, "unidade": "kg"},
                        {"nome": "açúcar", "quantidade": 0.01, "unidade": "kg"}
                    ],
                    "tempo_preparo": 15,
                    "dificuldade": "fácil",
                    "porcoes": 4
                },
                {
                    "nome": "Purê de batatas",
                    "categoria": "acompanhamento",
                    "ingredientes": [
                        {"nome": "batata", "quantidade": 0.5, "unidade": "kg"},
                        {"nome": "leite", "quantidade": 0.1, "unidade": "L"},
                        {"nome": "sal", "quantidade": 0.003, "unidade": "kg"},
                        {"nome": "azeite", "quantidade": 0.01, "unidade": "garrafa"}
                    ],
                    "tempo_preparo": 25,
                    "dificuldade": "fácil",
                    "porcoes": 4
                },
                {
                    "nome": "Frango assado com batatas",
                    "categoria": "almoço/jantar",
                    "ingredientes": [
                        {"nome": "peito de frango", "quantidade": 0.5, "unidade": "kg"},
                        {"nome": "batata", "quantidade": 0.4, "unidade": "kg"},
                        {"nome": "cebola", "quantidade": 0.1, "unidade": "kg"},
                        {"nome": "alho", "quantidade": 0.05, "unidade": "cabeça"},
                        {"nome": "azeite", "quantidade": 0.03, "unidade": "garrafa"},
                        {"nome": "sal", "quantidade": 0.005, "unidade": "kg"}
                    ],
                    "tempo_preparo": 60,
                    "dificuldade": "média",
                    "porcoes": 4
                }
            ]
        
        # Inicializar o estoque com zero para todos os ingredientes
        self.estoque_atual = {ingrediente["nome"]: 0 for ingrediente in self.ingredientes_comuns}
        
        # Preferências padrão
        self.preferencias = {
            "refeicoes_por_dia": 3,  # café da manhã, almoço, jantar
            "pessoas": 4,  # número de pessoas na família
            "repeticao_maxima": 2,  # quantas vezes a mesma receita pode repetir na semana
            "balanceamento": {
                "proteína": 1,  # pelo menos 1 por dia
                "vegetal": 2,   # pelo menos 2 por dia
                "grãos": 2,     # pelo menos 2 por dia
                "fruta": 1      # pelo menos 1 por dia
            }
        }
        
    def atualizar_preferencias(self, novas_preferencias):
        """Atualiza as preferências do sistema"""
        self.preferencias.update(novas_preferencias)
        
    def atualizar_estoque(self, novo_estoque):
        """Atualiza o estoque atual"""
        self.estoque_atual.update(novo_estoque)
    
    def adicionar_receita(self, nova_receita):
        """Adiciona uma nova receita ao sistema"""
        self.receitas.append(nova_receita)
    
    def adicionar_ingrediente(self, novo_ingrediente):
        """Adiciona um novo ingrediente ao sistema"""
        self.ingredientes_comuns.append(novo_ingrediente)
        if novo_ingrediente["nome"] not in self.estoque_atual:
            self.estoque_atual[novo_ingrediente["nome"]] = 0
    
    def _selecionar_receitas_para_dia(self, dia, receitas_usadas):
        """Seleciona receitas para um dia específico"""
        refeicoes = ["café da manhã", "almoço", "jantar"]
        cardapio_dia = {}
        
        categorias_adequadas = {
            "café da manhã": ["café da manhã", "café da manhã/jantar"],
            "almoço": ["almoço/jantar"],
            "jantar": ["almoço/jantar", "café da manhã/jantar"]
        }
        
        # Para cada refeição do dia
        for refeicao in refeicoes:
            # Filtra receitas adequadas para esta refeição e que não excedam o limite de repetição
            receitas_possiveis = [
                r for r in self.receitas 
                if any(cat in r["categoria"] for cat in categorias_adequadas[refeicao])
                and receitas_usadas.get(r["nome"], 0) < self.preferencias["repeticao_maxima"]
            ]
            
            if not receitas_possiveis:
                # Se não há receitas disponíveis, flexibiliza o critério de repetição
                receitas_possiveis = [
                    r for r in self.receitas 
                    if any(cat in r["categoria"] for cat in categorias_adequadas[refeicao])
                ]
            
            if receitas_possiveis:
                receita_escolhida = random.choice(receitas_possiveis)
                cardapio_dia[refeicao] = receita_escolhida["nome"]
                receitas_usadas[receita_escolhida["nome"]] = receitas_usadas.get(receita_escolhida["nome"], 0) + 1
            else:
                cardapio_dia[refeicao] = "Refeição não definida"
                
        return cardapio_dia, receitas_usadas
    
    def gerar_cardapio_semanal(self):
        """Gera um cardápio semanal baseado nas preferências e receitas disponíveis"""
        dias_semana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
        cardapio_semanal = {}
        
        # Controle de receitas já usadas na semana
        receitas_usadas = {}
        
        for dia in dias_semana:
            cardapio_dia, receitas_usadas = self._selecionar_receitas_para_dia(dia, receitas_usadas)
            cardapio_semanal[dia] = cardapio_dia
        
        return cardapio_semanal
    
    def _obter_receita_por_nome(self, nome_receita):
        """Obtém uma receita pelo nome"""
        for receita in self.receitas:
            if receita["nome"] == nome_receita:
                return receita
        return None
    
    def gerar_lista_compras(self, cardapio_semanal):
        """Gera uma lista de compras baseada no cardápio semanal e no estoque atual"""
        lista_compras = defaultdict(float)
        ingredientes_utilizados = defaultdict(float)
        
        # Para cada dia e cada refeição, some os ingredientes necessários
        for dia, refeicoes in cardapio_semanal.items():
            for refeicao, nome_receita in refeicoes.items():
                if nome_receita == "Refeição não definida":
                    continue
                    
                receita = self._obter_receita_por_nome(nome_receita)
                if not receita:
                    continue
                
                # Fator de multiplicação baseado no número de pessoas vs porções da receita
                fator = self.preferencias["pessoas"] / receita["porcoes"]
                
                for ingrediente in receita["ingredientes"]:
                    nome = ingrediente["nome"]
                    qtd_necessaria = ingrediente["quantidade"] * fator
                    ingredientes_utilizados[nome] += qtd_necessaria
        
        # Verifica o que precisa ser comprado considerando o estoque
        for nome, qtd_necessaria in ingredientes_utilizados.items():
            estoque = self.estoque_atual.get(nome, 0)
            if qtd_necessaria > estoque:
                lista_compras[nome] = qtd_necessaria - estoque
        
        return dict(lista_compras)
    
    def exibir_cardapio_formatado(self, cardapio_semanal):
        """Exibe o cardápio semanal formatado de forma amigável"""
        resultado = "📅 CARDÁPIO SEMANAL 📅\n\n"
        
        for dia, refeicoes in cardapio_semanal.items():
            resultado += f"=== {dia} ===\n"
            for refeicao, receita in refeicoes.items():
                resultado += f"  {refeicao.capitalize()}: {receita}\n"
            resultado += "\n"
            
        return resultado
    
    def exibir_lista_compras_formatada(self, lista_compras):
        """Exibe a lista de compras formatada por categorias"""
        if not lista_compras:
            return "Não há itens para comprar esta semana!"
            
        # Organize os itens por categoria
        itens_por_categoria = defaultdict(list)
        
        for nome, quantidade in lista_compras.items():
            # Procura a categoria e unidade do ingrediente
            categoria = "Outros"
            unidade = "un"
            
            for ingrediente in self.ingredientes_comuns:
                if ingrediente["nome"] == nome:
                    categoria = ingrediente["categoria"]
                    unidade = ingrediente["unidade"]
                    break
            
            qtd_formatada = f"{quantidade:.2f}".rstrip('0').rstrip('.') if quantidade % 1 != 0 else f"{int(quantidade)}"
            item_formatado = f"{nome.capitalize()}: {qtd_formatada} {unidade}"
            itens_por_categoria[categoria].append(item_formatado)
        
        # Monta a lista formatada
        resultado = "🛒 LISTA DE COMPRAS 🛒\n\n"
        
        for categoria, itens in sorted(itens_por_categoria.items()):
            resultado += f"--- {categoria.capitalize()} ---\n"
            for item in sorted(itens):
                resultado += f"  • {item}\n"
            resultado += "\n"
            
        return resultado
    
    def salvar_cardapio(self, cardapio_semanal, nome_arquivo="cardapio_semanal.json"):
        """Salva o cardápio em um arquivo JSON"""
        with open(nome_arquivo, 'w', encoding='utf-8') as f:
            json.dump(cardapio_semanal, f, ensure_ascii=False, indent=4)
            
    def salvar_lista_compras(self, lista_compras, nome_arquivo="lista_compras.json"):
        """Salva a lista de compras em um arquivo JSON"""
        with open(nome_arquivo, 'w', encoding='utf-8') as f:
            json.dump(lista_compras, f, ensure_ascii=False, indent=4)

# Exemplo de uso do sistema
if __name__ == "__main__":
    sistema = SistemaCardapio()
    sistema.carregar_dados()
    
    # Atualizar o estoque atual (o que já tem em casa)
    estoque_exemplo = {
        "arroz": 1.5,  # 1.5 kg de arroz
        "feijão": 0.8,  # 800g de feijão
        "alho": 0.5,    # meia cabeça de alho
        "sal": 0.5,     # 500g de sal
        "açúcar": 0.3,  # 300g de açúcar
        "café": 0.5,    # meio pacote de café
    }
    sistema.atualizar_estoque(estoque_exemplo)
    
    # Gerando o cardápio semanal
    cardapio = sistema.gerar_cardapio_semanal()
    
    # Gerando a lista de compras baseada no cardápio
    lista_compras = sistema.gerar_lista_compras(cardapio)
    
    # Exibindo o resultado
    print(sistema.exibir_cardapio_formatado(cardapio))
    print(sistema.exibir_lista_compras_formatada(lista_compras))
    
    # Salvando os resultados
    sistema.salvar_cardapio(cardapio)
    sistema.salvar_lista_compras(lista_compras)
