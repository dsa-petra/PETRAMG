import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Rota principal: Abre o teclado numérico de login
@app.route('/')
def index():
    return render_template('tela_login_pin.html')

# Rota de navegação: Tela da Oficina / Manutenção
@app.route('/tela_liberacao_oficina.html')
def tela_liberacao_oficina():
    return render_template('tela_liberacao_oficina.html')

# Rota de navegação: Tela do Operador (Seleção de Equipamento)
@app.route('/tela_selecao_equipamento.html')
def tela_selecao_equipamento():
    # Nota: Certifique-se de que tem um ficheiro com este nome exato 
    # na sua pasta 'templates', ou altere aqui para o nome real do seu HTML de RDO.
    return render_template('tela_selecao_equipamento.html')

# Rota de simulação de Login pelo PIN (Pronto para integrar com Supabase)
@app.route('/login', methods=['POST'])
def login():
    dados = request.json
    pin_digitado = dados.get('pin')
    
    # Simulação dos perfis de acesso
    PIN_MECANICO = "1234"
    PIN_OPERADOR = "5678"
    
    if pin_digitado == PIN_MECANICO:
        usuario = {"nome": "Equipe de Manutenção", "perfil": "manutencao"}
        return jsonify({"status": "sucesso", "redirecionar": "/tela_liberacao_oficina.html", "usuario": usuario})
        
    elif pin_digitado == PIN_OPERADOR:
        usuario = {"nome": "Equipe de Operação", "perfil": "operador"}
        return jsonify({"status": "sucesso", "redirecionar": "/tela_selecao_equipamento.html", "usuario": usuario})
        
    else:
        return jsonify({"status": "erro", "mensagem": "PIN não encontrado"}), 401

# Rota para receber os dados offline do tablet e gravar no banco
@app.route('/salvar_apontamento', methods=['POST'])
def salvar_apontamento():
    dados = request.json
    print("Dados de apontamento recebidos do campo:", dados)
    
    # Aqui entrará o código do Supabase futuramente
    
    return jsonify({"status": "sucesso", "mensagem": "Apontamento gravado com sucesso!"})

if __name__ == '__main__':
    # O Render usa a variável de ambiente PORT para definir onde a app vai rodar
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)