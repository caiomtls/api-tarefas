var Tarefas = require('./tarefas-model')

// ----------- CRUD -------------
// CREATE
exports.cadastrarTarefa = function (req, res) {
    let tarefa = new Tarefas({
        descricao: req.body.descricao,
        prazo: req.body.prazo,
        completa: req.body.completa
    })

    if (tarefa.prazo) {
        tarefa.prazo = new Date(tarefa.prazo).toISOString() // Representa data/horario no formato ISO e horário UTC
    }

    tarefa.save(function (err) {
        if (err) {
            return next(err)
        }
    })
    res.send('Tarefa cadastrada.')
}

// READ
exports.listarTarefas = function (req, res) {
    Tarefas.find({}, function (err, tarefas) {
        if (err) return next(err)
        return res.json(tarefas);
    })
}

exports.buscarTarefa = function (req, res) {
    Tarefas.findOne({ id: req.params.id }, function (err, tarefa) {
        if (err) return next(err)
        if (tarefa) {
            return res.json(tarefa)
        }
        return res.send('Nao existe tarefa com o ID solicitado')
    })
}

// UPDATE
exports.atualizarTarefa = function (req, res) {
    if (req.body.prazo) {
        novoPrazo = new Date(req.body.prazo).toISOString()
    } else {
        novoPrazo = null
    }

    Tarefas.findOneAndUpdate({ id: req.params.id },
        {
            descricao: req.body.descricao,
            prazo: novoPrazo,
            completa: req.body.completa
        }, function (err, tarefa) {

            if (err) return next(err)
            if (tarefa) {
                return res.send('Tarefa atualizada.')
            }
            return res.send('Nao existe tarefa com o ID solicitado')

        })
}

// DELETE
exports.ExcluirTarefa = function (req, res) {
    Tarefas.findOneAndDelete({ id: req.params.id }, function (err, tarefa) {
        if (err) return next(err)
        if (tarefa) {
            return res.send('Tarefa exlcluida.')
        }
        return res.send('Nao existe tarefa com o ID solicitado')
    })

}