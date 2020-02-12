let conn = require('./db');
let path = require('path');

module.exports = {
    getMenus() {

        return new Promise((resolve, reject) => {
            conn.query(`
                    SELECT * FROM tb_menus ORDER BY title
                    `, (err, results) => {
                if (err) {
                    reject(err);
                }

                resolve(results);
            });
        });
    },
    //METODO PARA INSERIR E ATUALIZAR CONTEUDOS DO PAINEL DE ADM
    save(fields, files) {
        return new Promise((resolve, reject) => {

            fields.photo = `images/${path.parse(files.photo.path).base}`;

            let query, queryPhoto = '', params = [
                fields.title,
                fields.description,
                fields.price
            ];

            if (files.photo.name) {
                queryPhoto = ',photo = ?';
                params.push(fields.photo);
            }

            if (parseInt(fields.id) > 0) {
                params.push(fields.id);
                query = `
                    update tb_menus
                    set title = ?,
                        description = ?,
                        price = ?
                        ${queryPhoto}
                    where id = ?
                `;

            } else {

                if (!files.photo.name) {
                    reject('Envie a foto do  prato');
                }
                query = `
                INSERT INTO tb_menus (title, description, price, photo)
                VALUES(?, ?, ?, ?)
                `;

            }
            conn.query(query, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    //METODO PARA DELETER USUARIO DO BANCO DE DADOS E DA PAG ADM
    delete(id) {

        return new Promise((resolve, reject) => {

            conn.query(`

            DELETE FROM tb_menus WHERE id = ?
            `, [
                id
            ], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};