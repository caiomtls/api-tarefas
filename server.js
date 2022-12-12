// Imports
const express = require("express")
const mongoose = require("mongoose")
const tarefa_controller = require('./tarefas-controller')

// Conexão com o banco de dados
mongoose.set("strictQuery", true);
mongoose.connect('mongodb+srv://usuario_padrao:2tOlvnQZ11vymngt@cluster0.nhakpmz.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'myFirstDatabase' })
mongoose.Promise = global.Promise
try {
    let db = mongoose.connection
    db.on('errr', console.error.bind(console, 'Erro de conexao no banco'))
} catch (e) {
    console.log(e)
}
const router = express.Router()

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bem vindo a API: To Do List')
})

// ----------------------- Rotas -----------------------
// Cria tarefa
router.post('/tarefas', tarefa_controller.cadastrarTarefa)

// Lista tarefas
router.get('/tarefas', tarefa_controller.listarTarefas)

// Busca tarefa por id
router.get('/tarefas/:id', tarefa_controller.buscarTarefa)

// Atualiza tarefa por id
router.put('/tarefas/:id', tarefa_controller.atualizarTarefa)

// Deleta tarefa por id
router.delete('/tarefas/:id', tarefa_controller.ExcluirTarefa)

app.use('/', router)

// Usa porta ambiente ou, caso não exista, a de número 10000
let porta = process.env.PORT || 10000

app.listen(porta, () => {
    console.log("Servidor em execucao na porta " + porta)
})