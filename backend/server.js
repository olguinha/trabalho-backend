const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/escola', {
 useNewUrlParser: true,
 useUnifiedTopology: true
}).then(() => {
 console.log('Conectado ao MongoDB');
}).catch((err) => {
 console.log('Erro ao conectar ao MongoDB:', err);
});


const alunoSchema = new mongoose.Schema({
 codaluno: String,
 nomealuno: String,
 curso: String,
 sexo: String
});

const Aluno = mongoose.model('Aluno', alunoSchema);


app.post('/alunos', (req, res) => {
 const novoAluno = new Aluno(req.body);
 novoAluno.save()
 .then((aluno) => res.json(aluno))
 .catch((err) => res.status(500).send(err));
});

app.get('/alunos', (req, res) => {
 Aluno.find()
 .then((alunos) => res.json(alunos))
 .catch((err) => res.status(500).send(err));
});

app.put('/alunos/:id', (req, res) => {
 Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true })
 .then((aluno) => res.json(aluno))
 .catch((err) => res.status(500).send(err));
});

app.delete('/alunos/:id', (req, res) => {
 Aluno.findByIdAndDelete(req.params.id)
 .then(() => res.json({ message: 'Aluno excluído' }))
 .catch((err) => res.status(500).send(err));
});


const port = 3000;
app.listen(port, () => {
 console.log(`Servidor rodando na porta ${port}`);
});
