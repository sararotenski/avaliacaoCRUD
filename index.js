require("dotenv").config(); // Ele procura o arquivo .env na raiz do projeto e carrega as variáveis ​​que estão no arquivo .env na memória.

const db = require("./db");

const port = process.env.PORT;

const express = require('express');

const app = express();

// como os dados que vamos inserir no banco de dados estão chegando no formato .json, temos que preparar o back-end para receber esses dados
app.use(express.json());

// Rota responsável pelo envio de informações para a função que insere dados de clientes no banco de dados
app.post('/client', async (req, res) => {
    // O objeto req.body contem os dados enviados pelo cliente na requisição POST
    await db.insertCustomer(req.body);
    // Envia o status 201 para indicar que um novo recurso foi criado com sucesso
    res.sendStatus(201);
    });

// app.get('caminho da rota', (função de callback que na verdade é a função que vai ser disparada quando a rota é chamada)=> {})

app.get('/', (req, res) => {
    res.json({
        message: "Funcionando!!!"
    })
})

// Rota para listar um cliente
app.get('/clientes/:id', async (req, res) => {
    const cliente = await db.selectCustomer(req.params.id);

    res.json(cliente);
})

// Rota para listar todos os clientes
app.get('/clientes', async (req, res) => {
    const clientes = await db.selectCustomers();

    res.json(clientes);
})

// Rota para editar/atualizar clientes
app.patch("/clientes/:id", async (req, res) => {
    await db.updateCustomer(req.params.id, req.body)
    res.sendStatus(200) // 200 é o código de atualização
})

// Rota para excluir cliente
app.delete("/clientes/:id", async (req, res) => {
    await db.deleteCustomer(req.params.id)
    res.sendStatus(204) // 204 é o código para exclusão
})

app.listen(port);

console.log("Backend is running")