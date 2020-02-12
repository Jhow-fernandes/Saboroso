HTMLFormElement.prototype.save = function () {

    let form = this;

    return new Promise((resolve, reject) => {

        form.addEventListener('submit', e => {

            //CANCELANDO O EVENTO PADRÃO
            e.preventDefault();

            let formData = new FormData(form);

            //PASSANDO OS DADOS VIA AJAX
            fetch(form.action, {

                method: form.method,
                body: formData
            })
                .then(response => response.json())
                .then(json => {
                    resolve(json);
                }).catch(err => {
                    reject(err);
                })
        });

    });

}