let lojista = '';
let msgError = '';

window.onload = initPage;

function initPage() {
    document.getElementById("loading").style.display = 'block';
}

function startToast() {
    Toastify({
        text: `Cupom ${lojista} cadastrado com sucesso!`,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "rgb(10 187 10)",
        stopOnFocus: true,
        close: false,
        className: "showToast"
    }).showToast();
}
function startToastError() {
    Toastify({
        text: `${msgError}`,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
        stopOnFocus: true,
        close: false,
        className: "showToast"
    }).showToast();
}
function dismissLoad() {
    setTimeout(function () {
        document.getElementById("loading").style.display = 'none';
    }, 2000);
}
function showNewInvoice() {
    document.getElementById('newInvoice').style.display = "block";
    document.getElementById('preview').style.display = "none";
}
function hiddenNewInvoice() {
    document.getElementById('newInvoice').style.display = "none";
    document.getElementById('preview').style.display = "block";
}
function InserindoNota(content) {
    document.getElementById("loading").style.display = 'block';
    var codigoUsuairo = localStorage.getItem("CodSession")
    var valores = {
        url: content,
        "usuario": {
            "id": codigoUsuairo
        }
    };
    fetch("https://pblelcoma-final.herokuapp.com/notafiscal",
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
            body: JSON.stringify(valores),

        })

        .then((res) => res.json())
        .then((result) => {
            if (result.nome) {
                lojista = result.nome;
                startToast();
                dismissLoad();
            } else {
                msgError = result.msg;
                startToastError();
                dismissLoad();
            }
        }).catch(function (error) {
            console.error(error);
        })
}