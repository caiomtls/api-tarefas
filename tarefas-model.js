const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TarefasSchema = new Schema({
    descricao: { type: String, required: true },
    prazo: { type: String, required: false },
    completa: { type: Boolean, required: false },
    // Necessária para auto-icremento
    id: { type: Number, required: false }
})

module.exports = mongoose.model('Tarefas', TarefasSchema)
