
const cadastrar = document.querySelector('#cadastrar');

const modal = document.getElementById('modal-ativar');

cadastrar.addEventListener('click', () => {
    document.getElementById("loading").style.display = 'block';

    let cpf = document.getElementById("CPF").value
    var senha = document.getElementById("senha").value
    let senhaConf = document.getElementById("confirmarSenha").value
    localStorage.setItem('fecharPersonalizar', '');

    if (cpf == "" || senha == "" || senhaConf == "") {
        document.getElementById("loading").style.display = 'none';
        texto = "É necessário informar todos os dados";
        MostrarModal(texto);
    }


    else if (senha == senhaConf) {
        localStorage.setItem('cpf', cpf)
        cpf = cpf.replace("-", "").replace(".", "").replace(".", "")
        var valores = {
            cpf: cpf,
            senha: senha
        };

        fetch("https://pblelcoma-final.herokuapp.com/usuarios",
            {
                method: 'post',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(valores)

            })

            .then(function (res) {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res;
            })

            .then(function (res) {
                res.json().then(data => localStorage.setItem("CodSession", data));
                document.getElementById("loading").style.display = 'none';
                window.location.href = "home.html"
            })
            .catch(function (error) {
                document.getElementById("loading").style.display = 'none';
                texto = "OPSS.. Esse CPF já possui cadastro.";
                MostrarModal(texto);

            })

    } else {
        texto = "OPSS... senhas distintas"
        MostrarModal(texto);

    }

}
)

function MostrarModal(texto) {
    document.getElementById("msgErro").innerHTML = texto
    modal.classList.add('mostrar');

    modal.addEventListener('click', (e) => {

        if (e.target.id == 'modal-ativar') {
            modal.classList.remove('mostrar');

        }
    })
}