var express = require('express');
var router = express.Router();
const db = require('../db');

/* Pega todos os usuarios */
router.get('/', function(req, res, next) {
  res.json(db.findUsers());
});;

/* Pega uma usuario especifico */
router.get('/:id', function(req, res, next) {
  // res.send(req.params.id);
  res.json(db.findUser(req.params.id));
});;

/* Insere um usuario via POST */
router.post('/', (request, response)=>{
  const user = db.insertUser(request.body);
  response.status(200).json(user);
})

/* Faz a atualização  de um usuario */
router.put('/:id', (request, response)=>{
  const id = request.params.id;
  const user = db.updateUser(id, request.body, true);

  response.status(202).json(user);
})

router.patch('/:id', (request, response)=>{
  const id = request.params.id;
  const user = db.updateUser(id, request.body, false);

  response.status(202).json(user);
})

/* Deleta um usuario */
router.delete("/:id", (request, response)=>{
  const id = request.params.id;
  const user = db.deleteUser(id);
  response.status(200).json(user);
})
module.exports = router;
