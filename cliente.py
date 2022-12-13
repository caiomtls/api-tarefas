import requests
import json

def nao_econtrado():
    print('Nao existe tarefa com o ID solicitado\n')

def esperar():
    input("Pressione Enter para continuar...")

def criar_tarefa():
    url = "https://api-todolist.herokuapp.com/tarefas"

    print(f'\n===== Cadastro de tarefa ===== \n')

    tarefa = {
        "descricao": "",
        "prazo": "",
        "completa": False
    }

    tarefa["descricao"] = input('Descricao: ')  # Ex.: Enviar relatorio mensal

    op = input('Deseja inserir um prazo(s/n): ')
    if op == 's' or 'S':
        tarefa["prazo"] = input('Prazo(YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ssZ): ')

    op = input('Deseja inserir se foi completa(s/n): ')
    if op == 's' or 'S':
        if input('Completa(s/n): ') == 's' or 'S':
            tarefa["completa"] = True
        else:
            tarefa["completa"] = False

    myResponse = requests.post(url, json.dumps(tarefa))
    if (myResponse.ok):
        print(myResponse.content)
    else:
        myResponse.raise_for_status()
    esperar()


def listar_tarefas():
    url = "https://api-todolist.herokuapp.com/tarefas"
    myResponse = requests.get(url)
    if (myResponse.ok):
        jData = json.loads(myResponse.content)
        print("Foram encontrados {0} tarefas.".format(len(jData)))
        print("\n")
        for tarefa in jData:
            for atributo in tarefa:
                print(atributo + ": " + str(tarefa[atributo]))
            print("\n")
    else:
        # Em caso de erro, imprime o código de erro
        myResponse.raise_for_status()
    esperar()


def buscar_tarefa():
    id = input("Digite o ID da tarefa a ser buscada: ")
    print()  # Quebra de linha
    url = "https://api-todolist.herokuapp.com/tarefas/" + id
    myResponse = requests.get(url)
    if (myResponse.ok):
        try:
            jData = json.loads(myResponse.content)
            for atributo in jData:
                print(atributo + ": " + str(jData[atributo]))
            print("\n")
        except:
            nao_econtrado()
    else:
        myResponse.raise_for_status()
    esperar()


def deletar_tarefa():
    id = input("Digite o ID da tarefa a ser deletada: ")
    print()  # Quebra de linha
    url = "https://api-todolist.herokuapp.com/tarefas/" + id
    myResponse = requests.delete(url)
    if (myResponse.ok):
        print(myResponse.content)
    else:
        myResponse.raise_for_status()
    esperar()


operacoes = [criar_tarefa, listar_tarefas,  buscar_tarefa, deletar_tarefa]
op = 0
while op != -1:
    print('''
    --------- MENU ---------\n
    1-Criar tarefa
    2-Listar todas tarefas
    3-Buscar tarefa
    4-Atualizar tarefa
    5-Deletar tarefa\n
    Digite -1 para encerrar.\n''')
    op = int(input(' Digite o número da operação desejada: '))

    if (op != -1):
        operacoes[op-1]()
