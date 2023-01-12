from flask_cors import CORS
from flask import Flask, jsonify, request

import os.path
from ComandosAPI import *

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from datetime import date

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# The ID and range of a sample spreadsheet.
SAMPLE_SPREADSHEET_ID = '1qXcz9vVVZxoip4JiAuiWYV4Df0bGaSwEAqAJeCNgxmQ'
SAMPLE_RANGE_NAME = 'A1:G8'

LocalQtdUsers = 'P1:P2'
QTDUSUARIOS = 0

LocalQtdProds = 'Q2'
QTDPRODUTOS = 0

QUANTIDADECOLUNAS = 3


def getRange():
    global QTDUSUARIOS
    qt = QTDUSUARIOS
    return 'A1:G' + str(qt+1)

def getNewLine():
    global QTDUSUARIOS
    qt = QTDUSUARIOS
    return 'A' + str(qt+2)
    

def obtemdados():
    global QTDUSUARIOS
    global QTDPRODUTOS
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('sheets', 'v4', credentials=creds)

        # Call the Sheets API
        sheet = service.spreadsheets()
        
        lerqtduser = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=LocalQtdUsers).execute()
        qtdusers = lerqtduser['values'][1]
        qtduser = int("".join(map(str, qtdusers)))
        #print(qtduser)
        QTDUSUARIOS = qtduser
        
        lerqtdprodutos = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=LocalQtdProds).execute()
        qtdprods = lerqtdprodutos['values'][0]
        QTDPRODUTOS = int("".join(map(str, qtdprods)))
        
        
        novorange = 'A1:E' + str(qtduser+1)
        tabelaoriginal = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=novorange).execute()
        
    except HttpError as err:
        print(err)
        
def carregaFuncao(funcao, valor):
    global QTDUSUARIOS
    global QTDPRODUTOS
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
            
    try:
            
        qtdu, qtdp, resultado = funcao(creds, valor, QTDUSUARIOS, QTDPRODUTOS)
        QTDUSUARIOS = qtdu
        QTDPRODUTOS = qtdp
        return resultado
    except HttpError as err:
            #print(err)
        return "Mensagem de erro da funçãocarrega"
        
def podeCriar(dados):
    
    pessoas = carregaFuncao(getPessoas, '')
    #print(pessoas)
    for i in pessoas:
        if i[2] == dados['cpf']:
            return jsonify(False, 'Esse CPF já está cadastrado')
        elif i[3] == dados['email']:
            return jsonify(False, 'Esse email já está cadastrado')
    
    if carregaFuncao(criaPessoa, dados):
        
        return jsonify(True, 'Usuário cadastrado com sucesso')   
    
    return jsonify(False, 'Erro')     

def podeLogar(dados):
    
    pessoas = carregaFuncao(getPessoas, '')
    
    #print('PODE LOGAR')
    for i in pessoas:
        if i[3] == dados['email']:
            if i[4] == dados['senha']:
                iduser = i[6]
                #print('IDUSER - ',iduser)
                return jsonify(True, 'Login efetuado com sucesso', iduser)
            else:
                return jsonify(False, 'Senha incorreta', '')
    
    return jsonify(False, 'Email não cadastrado', '')
    


obtemdados()

app = Flask(__name__)
CORS(app)

@app.route('/get', methods=['GET'])
def get():
    pessoas = carregaFuncao(getPessoas, '')
    return jsonify(pessoas)

@app.route('/getpessoa/<id>', methods=['GET'])
def getpessoa(id):
    pessoa = carregaFuncao(getPessoaId, id)
    #print(pessoa)
    return jsonify(pessoa)

@app.route('/update/<id>', methods=['PUT'])
def update(id):
    
    dados = request.json
    #print(dados)
    pessoaatual = carregaFuncao(updatePessoas, dados)
    #print(pessoaatual)
    return jsonify(pessoaatual)

@app.route('/cria', methods=['POST'])
def cria():
    d = request.json
    retorno = carregaFuncao(criaPessoa, d)
    return jsonify(retorno)

'''@app.route('/cria/<name>/<age>/<w>', methods=['GET'])
def cria2(name,age,w):
    retorno = criaPessoa(name,age,w)
    return jsonify(retorno)'''

@app.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    #print('ID deletado:', id)
    pessoaatual = carregaFuncao(deletarPessoa, id)
    #print(pessoaatual)
    return jsonify(id)

@app.route('/logar', methods=['POST'])
def logar():
    login_informations = request.json
    #pessoaatual = carregaFuncao(deletarPessoa, id)
    #print(login_informations)
    return podeLogar(login_informations)

@app.route('/registrar', methods=['POST'])
def registrar():
    register_informations = request.json
    #pessoaatual = carregaFuncao(deletarPessoa, id)
    #print(register_informations)
    return podeCriar(register_informations)

@app.route('/getprodutos', methods=['GET'])
def getprodutos():
    produtos = carregaFuncao(getProdutos, '')
    return jsonify(produtos)

@app.route('/meusprodutos/<id>', methods=['GET'])
def meusprodutos(id):
    produtos = carregaFuncao(getMyProducts, id)
    return jsonify(produtos)

@app.route('/getprods/<id>', methods=['GET'])
def getprods(id):
    produtos = carregaFuncao(getProds, id)
    return jsonify(produtos)

@app.route('/getprodutoid/<id>', methods=['GET'])
def getprodutoid(id):
    produto = carregaFuncao(getProdutoId, id)
    return jsonify(produto)

@app.route('/publicar', methods=['PUT'])
def publicar():
    dados = request.json
    #print(request.json)
    publicar = carregaFuncao(publicarProd, dados)
    return jsonify(publicar)

@app.route('/comprarprod', methods=['PUT'])
def comprarprod():
    dados = request.json
    #print(request.json)
    publicar = carregaFuncao(comprarProd, dados)
    return jsonify(publicar)

@app.route('/inserirprod', methods=['POST'])
def inserirprod():
    dados = request.json
    #print(request.json)
    publicar = carregaFuncao(inserirProd, dados)
    return jsonify(publicar)

if __name__ == "__main__":
    app.run()