from flask import Flask, jsonify, request

from ComandosAPI import *

from datetime import date

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SAMPLE_SPREADSHEET_ID = '1qXcz9vVVZxoip4JiAuiWYV4Df0bGaSwEAqAJeCNgxmQ'
SAMPLE_RANGE_NAME = 'A1:G8'

LocalQtdUsers = 'P1:P2'
LocalQtdProds = 'Q2'

def criaPessoa(creds, d, QTDUSUARIOS, QTDPRODUTOS):
    
    service = build('sheets', 'v4', credentials=creds)
    # Call the Sheets API
    sheet = service.spreadsheets()
    id = QTDUSUARIOS+1
    datahj = str(date.today())
    valores_a_adicionar = [
        [d['nome'],d['tel'],d['cpf'],d['email'],d['senha'],d['nascimento'],id,
         datahj,'','','0','','','0','[]']
    ]
    body = {
        'values':valores_a_adicionar
    }
    result = sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=getNewLine(), valueInputOption="USER_ENTERED",
                                    body=body).execute()
    
    QTDUSUARIOS = QTDUSUARIOS+1
    valor = [
        ['QuantidadeUsers'],
        [QTDUSUARIOS]
    ]
    sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=LocalQtdUsers, 
                                       valueInputOption="USER_ENTERED",
                                      body={'values':valor}).execute()
    
    return QTDUSUARIOS, QTDPRODUTOS, True

    
def updatePessoas(creds, d, QTDUSUARIOS, QTDPRODUTOS):
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    #Muda Nome:
    id = d['iduser']
    #print('ID:', id)
    valores_a_adicionar = [
        [d['name'],d['tel'],d['cpf'],d['email'],d['senha'],d['data']]
    ]
    body = {
        'values':valores_a_adicionar
    }
    
    novorange = 'A' + str(int(id)+1) + ':' + 'F' + str(int(id)+1)
    listausuarios = sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=novorange, valueInputOption="USER_ENTERED",
                                    body=body).execute()
    return QTDUSUARIOS, QTDPRODUTOS, True
    
def deletarPessoa(creds,id, QTDUSUARIOS, QTDPRODUTOS):
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    #Muda Nome:
    #print('ID:', id)
    valores_a_adicionar = [
        ['','','']
    ]
    body = {
        'values':valores_a_adicionar
    }
    
    novorange = 'A' + str(int(id)+1) + ':' + 'C' + str(int(id)+1)
    listausuarios = sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=novorange, valueInputOption="USER_ENTERED",
                                    body=body).execute()
    return QTDUSUARIOS, QTDPRODUTOS, listausuarios
    
def getPessoas(creds, aaa, QTDUSUARIOS, QTDPRODUTOS):
    
    
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    qtduser = QTDUSUARIOS
    novorange = 'A1:G' + str(qtduser+1)
    listausuarios = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=novorange).execute()
    return QTDUSUARIOS, QTDPRODUTOS, listausuarios['values']

def getPessoaId(creds, iduser, QTDUSUARIOS, QTDPRODUTOS):
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    
    qtduser = QTDUSUARIOS
    novorange = 'A' + str(int(iduser)+1) + ':N' + str(int(iduser)+1)
    listausuarios = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=novorange).execute()
    ##print(listausuarios['values'])
    return QTDUSUARIOS, QTDPRODUTOS, listausuarios['values'][0]

def getProdutos(creds, aaa, QTDUSUARIOS, QTDPRODUTOS):
    
    
    qtdprods = QTDPRODUTOS
    
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    
    novorange = 'R1:Z' + str(int(qtdprods)+1)
    listaprodutos = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=novorange).execute()
    
    produtosavenda = []
    for i in listaprodutos['values']:
        if i[8] == '2':
            produtosavenda.append(i)
    
    return QTDUSUARIOS, QTDPRODUTOS, produtosavenda

def getMyProducts(creds, iduser, QTDUSUARIOS, QTDPRODUTOS):
    
    qtdprods = QTDPRODUTOS
    
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    
    novorange = 'O' + str(int(iduser)+1)
    listamyproducts = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=novorange).execute()
    
    #print(listamyproducts['values'][0])
    
    
    lista = str(listamyproducts['values'][0][0])
    lista = lista.replace('[','').replace(']','')
    #lista = lista.replace('[','').replace(']','')
    ##print(lista)
    lista = str(lista)
    lista1 = lista.split(',')
    #print(lista)
    
    rangeprod = 'R1:AA' + str(int(qtdprods)+1)
    listaprodstotal = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=rangeprod).execute()
    
    myproducts = []
    #print(lista)
    for i in listaprodstotal['values']:
        for j in lista1:
            
            if i[0] == j:
                #print(i[0], j)
                myproducts.append(i)
                break
    
    return QTDUSUARIOS, QTDPRODUTOS, myproducts

def getProds(creds, iduser, QTDUSUARIOS, QTDPRODUTOS):
    
    
    qtdprods = QTDPRODUTOS
    
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    
    novorange = 'R1:Z' + str(int(qtdprods)+1)
    listaprodutos = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=novorange).execute()
    
    vetorretorno = []
    for i in listaprodutos['values']:
        if i[5] == iduser and i[8] != '4':
            vetorretorno.append(i)
    #print(vetorretorno)
    return QTDUSUARIOS, QTDPRODUTOS, vetorretorno

def getProdutoId(creds, idproduto, QTDUSUARIOS, QTDPRODUTOS):
    
    
    qtdprods = QTDPRODUTOS
    #qtduser = QTDUSUARIOS
    
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    
    novorange = 'R1:Z' + str(int(qtdprods)+1)
    listaprodutos = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=novorange).execute()
    
    #print(listaprodutos['values'])
    for i in listaprodutos['values']:
        if i[0] == idproduto:
            #print(i)
            
            rangeuser = 'A' + str(int(i[5])+1)
            nomeanunciante = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=rangeuser).execute()
            
            resposta = i
            resposta.append(nomeanunciante['values'])
            
            return QTDUSUARIOS, QTDPRODUTOS, resposta
        
    return QTDUSUARIOS, QTDPRODUTOS, 0

def publicarProd(creds, dados, QTDUSUARIOS, QTDPRODUTOS):
    idprod = dados['id']
    status = dados['status']
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    
    rangestatus = 'Z' + str(int(idprod)+1)
    statusatual = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=rangestatus).execute()
    
    #print(idprod)
    #print(statusatual['values'])
    
    valor = statusatual['values'][0][0]
    #print(valor)
    
    if(valor == '1' or valor == '2'):
        #print('Chegouaqui')
        body = {
            'values':[[status]]
        }
        sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=rangestatus, valueInputOption="USER_ENTERED",
                                        body=body).execute()
        
        if(status == '4'):
            iduser = dados['iduser']
        
            rangeqtdProds = 'K' + str(int(iduser)+1)
            qtdprodutosUser = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=rangeqtdProds).execute() 
            qtd = int(qtdprodutosUser['values'][0][0])-1
            body = {
                'values':[[qtd]]
            }
            sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                        range=rangeqtdProds, valueInputOption="USER_ENTERED",
                                            body=body).execute()
        
        return QTDUSUARIOS, QTDPRODUTOS, True
    
    return QTDUSUARIOS, QTDPRODUTOS, ''

def comprarProd(creds, dados, QTDUSUARIOS, QTDPRODUTOS):
    idprod = dados['idprod']
    iduser = dados['iduser']
    
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    
    body = {
            'values':[['3']]
        }
    rangeprod = 'Z' + str(int(idprod)+1)
    sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=rangeprod, valueInputOption="USER_ENTERED",
                                    body=body).execute()
    #print(idprod)
    
    datahj = str(date.today())
    
    rangeuser = 'N' + str(int(iduser)+1) 
    req = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                            range=rangeuser).execute()
    qtdpedidosUser = int(req['values'][0][0])
    if(qtdpedidosUser > 0):
        qtd = qtdpedidosUser+1
        body={
            'values':[[datahj,qtd]]
        }
        rangeupdateuser = 'M' + str(int(iduser)+1) 
        sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=rangeupdateuser, 
                                    valueInputOption="USER_ENTERED",
                                    body=body).execute()
        
        rangeuserprods = 'O' + str(int(iduser)+1)
        listamyproducts = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=rangeuserprods).execute()
        
        listaprodutos = listamyproducts['values'][0][0]
        
        novalista = listaprodutos.replace(']','') 
        novalista = novalista + ',' + idprod + ']'
        body = {
            'values':[[novalista]]
        }
        
        
        
        rangeuserprods = 'O' + str(int(iduser)+1)
        listaprods = sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=rangeuserprods, valueInputOption="USER_ENTERED",
                                        body=body).execute()
        
    else:
        
        body={
            'values':[[datahj,datahj,1]]
        }
        rangeupdateuser = 'L' + str(int(iduser)+1) 
        sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=rangeupdateuser, 
                                    valueInputOption="USER_ENTERED",
                                    body=body).execute()
        novalista = '[' + idprod + ']'
        
        ##print(novalista)
        body = {
            'values':[[novalista]]
        }
        
        rangeuserprods = 'O' + str(int(iduser)+1)
        listaprods = sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=rangeuserprods, valueInputOption="USER_ENTERED",
                                        body=body).execute()
        
    rangedataprod = 'AA' + str(int(idprod)+1) 
    sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                            range=rangedataprod, 
                                valueInputOption="USER_ENTERED",
                                body={'values':[[datahj]]}).execute()

    return QTDUSUARIOS, QTDPRODUTOS, True

def inserirProd(creds, d, QTDUSUARIOS, QTDPRODUTOS):
    qtdprods = QTDPRODUTOS
    
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    
    idprod = qtdprods+1
    iduser = d['userid']
    datahj = str(date.today())
    
    if(d['linhaespecifica'] == ''):
        
        rangeuserprods = 'R' + str(int(qtdprods)+2)
        
        valores_a_adicionar = [
        [idprod,str(d['tipo']),d['nome'],d['descricao'],d['valor'],d['userid'],
         datahj,datahj,'1']
        ]
        body = {
            'values':valores_a_adicionar
        }
        
        sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=rangeuserprods, valueInputOption="USER_ENTERED",
                                        body=body).execute()
        
        qtdprods = qtdprods+1
        QTDPRODUTOS = qtdprods
        
        rangeuser = 'K' + str(int(iduser)+1) 
        req = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=rangeuser).execute()
        qtdprodutosUser = int(req['values'][0][0])
        if(qtdprodutosUser > 0):
            qtd = qtdprodutosUser+1
            body={
                'values':[[datahj,qtd]]
            }
            rangeupdateuser = 'J' + str(int(iduser)+1) 
            sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=rangeupdateuser, 
                                       valueInputOption="USER_ENTERED",
                                      body=body).execute()
        else:
            
            body={
                'values':[[datahj,datahj,1]]
            }
            rangeupdateuser = 'I' + str(int(iduser)+1) 
            sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=rangeupdateuser, 
                                       valueInputOption="USER_ENTERED",
                                      body=body).execute()
            
        sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=LocalQtdProds, 
                                       valueInputOption="USER_ENTERED",
                                      body={'values':[[qtdprods]]}).execute()
        
        return QTDUSUARIOS, QTDPRODUTOS, True
    else:
        idprod = d['linhaespecifica']
        rangeuserprods = 'R' + str(int(idprod)+1)
        
        valores_a_adicionar = [
        [idprod,str(d['tipo']),d['nome'],d['descricao'],d['valor'],d['userid']]
        ]
        body = {
            'values':valores_a_adicionar
        }
        
        listaprods = sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=rangeuserprods, valueInputOption="USER_ENTERED",
                                        body=body).execute()
        
        rangeupdatedata = 'Y' + str(int(idprod)+1)
        body = {
            'values':[[datahj,'1']]
        }
        sheet.values().update(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=rangeupdatedata, valueInputOption="USER_ENTERED",
                                        body=body).execute()
        return QTDUSUARIOS, QTDPRODUTOS, True
        