let express = require('express');
let users = require('../include/users');
let admin = require('../include/admin');
let menus = require('../include/menus');
let router = express.Router();

//VALIDAR O USUARIO
router.use(function (req, res, next) {

    if (['/login'].indexOf(req.url) === -1 && !req.session.user) {
        res.redirect('/admin/login');
    } else {

        next();
    }

});

//ROTA DE NAVEGAÇÃO DOS MENU DO ASIDE
router.use(function (req, res, next) {

    req.menus = admin.getMenus(req);

    next()

});

// ROTAS DE logout
router.get("/logout", function (req, res, next) {

    delete req.session.user;

    res.redirect("/admin/login");
});

//ROTAS DA HOME
router.get("/", function (req, res, next) {

    admin.dashboard().then(data => {

        res.render("admin/index", admin.getParams(req, {
            data
        }));

    }).catch(err => {
        console.error(err);
    })


});

//ROTAS PAR ACESSAR O PAINEL DE ADMIN
router.post("/login", function (req, res, next) {


    if (!req.body.email) {
        users.render(req, res, "Preencha o campo e-mail");
    }

    else if (!req.body.password) {
        users.render(req, res, "Preencha o campo senha,");
    }

    else {
        users.login(req.body.email, req.body.password).then(user => {

            req.session.user = user;

            res.redirect("/admin");
        }).catch(err => {

            users.render(req, res, err.message || err);
        });
    }

});

//ROTAS DO LOGIN METEODO GET
router.get("/login", function (req, res, next) {

    users.render(req, res, null);
});

//ROTAS DE CONTATOS
router.get("/contacts", function (req, res, next) {

    res.render("admin/contacts", admin.getParams(req));
});

//ROTAS DE EMAILS
router.get("/emails", function (req, res, next) {

    res.render("admin/emails", admin.getParams(req));
});

//RONTAS DE MENU
router.get("/menus", function (req, res, next) {

    menus.getMenus().then(data => {

        res.render("admin/menus", admin.getParams(req, {
            data
        }));

    });

});
router.post('/menus', function (req, res, next) {

    menus.save(req.fields, req.files).then(results => {

        res.send(results);
    }).catch(err => {
        res.send(err);
    });
});


//ROTA PARA DELETAR USUARIO
router.delete('/menus/:id', function (req, res, next) {
    menus.delete(req.params.id).then(results => {

        res.send(results);

    }).catch(err => {

        res.send(err);
    })
})



// ROTAS DE RESERVAS
router.get("/reservations", function (req, res, next) {

    res.render("admin/reservations", admin.getParams(req, {
        date: {}
    }));
});

//ROTAS DE USUARIOS
router.get("/users", function (req, res, next) {

    res.render("admin/users", admin.getParams(req));
});




module.exports = router;


