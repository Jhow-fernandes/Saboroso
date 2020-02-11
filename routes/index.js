var conn = require('../include/db');
var express = require('express');
var menus = require('../include/menus');
var reservations = require('../include/reservations');
var contacts = require('../include/contacts');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  menus.getMenus().then(results => {

    res.render('index', {
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true

    });

  });

});

//ROTA DOS CONTATOS
router.get('/contacts', function (req, res, next) {

  contacts.render(req, res);

});

//ROTA DOS CONTATOS VIA POST
router.post('/contacts', function (req, res, next) {

  if (!req.body.name) {
    contacts.render(req, res, "Digite o Nome");

  } else if (!req.body.email) {

    contacts.render(req, res, "Digite o e-mail");

  } else if (!req.body.message) {
    contacts.render(req, res, "Digite a Menssagem");
  }

  //SALVA OS DADOS NO BANCO DE DADOS
  else {

    contacts.save(req.body).then(results => {
      //metodo para limpa os dadaos no formulario assim que finalizar o cadastro
      req.body = {};

      contacts.render(req, res, null, "Menssagem Enviada com Sucesso");

    }).catch(err => {

      contacts.render(req, res, err.message);
    });
  }

});

// ROTAS DOS MENUS
router.get('/menus', function (req, res, next) {

  menus.getMenus().then(results => {

    res.render('menus', {
      title: 'Menu - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results
    });
  });
});

// ROTAS DAS RESERVAS VIA GET
router.get('/reservations', function (req, res, next) {

  reservations.render(req, res);
});


//ROTADAS DE RESERVA VIA POST
router.post('/reservations', function (req, res, next) {
  if (!req.body.name) {
    reservations.render(req, res, "Digite o Nome");

  } else if (!req.body.email) {

    reservations.render(req, res, "Digite o e-mail");

  } else if (!req.body.people) {
    reservations.render(req, res, "Selecione o números De pessoas");

  } else if (!req.body.date) {

    reservations.render(req, res, "Selecione o campo Data");

  } else if (!req.body.time) {
    reservations.render(req, res, "Selecione o Campo Horas");
  }

  //SALVA OS DADOS NO BANCO DE DADOS
  else {

    reservations.save(req.body).then(results => {
      //metodo para limpa os dadaos no formulario assim que finalizar o cadastro
      req.body = {};

      reservations.render(req, res, null, "Reserva realizada com sucesso!");

    }).catch(err => {

      reservations.render(req, res, err.message);
    });
  }

});


//ROTAS DO SERVIÇOS
router.get('/services', function (req, res, next) {

  res.render('services', {
    title: 'Serviços - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  });
});

module.exports = router;
