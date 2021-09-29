var elemtent_pai_inst = document.getElementById("inst");
var divCupomInst = "";

// Trazendo informação das categorias
/*            
            fetch(`http://pblelcoma-final.herokuapp.com/categoria`,
            {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrerPolicy: 'no-referrer'            
            })
            .then(response => {
                if (!response.ok)
                {
                    throw Error(response.statusText); 
                }

                response.json().then(function(result){

                    for (let index = 0; index < result.length; index++) {
                        var element_pai = document.getElementById("select");
                        var options = document.createElement('option');
                        options.text = result[index].descricao;
                        element_pai.appendChild(options);    
                        options.value = result[index].id;                                          
                    }           
                })

            }).catch(function(error){
                console.log(error);
            })


        function FiltrarPorCategoria(){
            var select = document.getElementById("select").value
            this.Cupons(select);
        }

  */
// Tazendo informações do cupom /cupons/categoria?idCategoria=1&idUsuario=455

var codigoUsuairo = localStorage.getItem("CodSession");

fetch(`https://pblelcoma-final.herokuapp.com/cupons/usuario/${codigoUsuairo}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
})
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        response.json().then(function (result) {
            if (result.length == 0) {
                h2 = document.createElement("h2");
                elemtent_pai_inst.appendChild(h2);
                h2.textContent = "Nenhum Cupom encontrado!!!";
            } else {
                for (let index = 0; index < result.length; index++) {
                    divCupomInst = document.createElement("div");
                    elemtent_pai_inst.appendChild(divCupomInst);
                    divCupomInst.className = "cupomInst";
                    var h2 = document.createElement("h4");
                    var p = document.createElement("p");
                    divCupomInst.appendChild(h2);
                    divCupomInst.appendChild(p);
                    h2.textContent = result[index].nomeLoja;
                    p.textContent =
                        result[index].titulo +
                        " - " +
                        result[index].descricao +
                        ", no valor de: " +
                        result[index].valor +
                        "%, Código: " + result[index].codigo;
                    h2.className = "Pcupom";
                    p.className = "H2cupom";
                }
            }
        });
    })
    .catch(function (error) {
        console.log(error);
        h2 = document.createElement("h2");
        elemtent_pai_inst.appendChild(h2);
        h2.textContent = "Nenhum Cupom encontrado!!!";
    });

//[MANOEL] função para verificar se os cards exitem, e limpar
/*
function limparCards(){
    console.log(divCupomInst)
    while(divCupomInst != ""  && divCupomInst != null)
    {       
        this.divCupomInst.remove();
        break;
    }

}
*/
window.onload = initPage;

function initPage() {
    calculateGoal();
    document.getElementById("loading").style.display = 'block';
}

function generateCode() {
    const button = document.querySelector("button");
    const codCoupon = 'CYD-6458';
    document.getElementById("generateCode").innerHTML = 'Ativado';
    document.getElementById("showCode").innerHTML = `Utilize o código: ${codCoupon}`;
    button.disabled = true;
    localStorage.setItem('activeMission', true);
}

function calculateGoal() {
    let totalValueRegistered = 0;
    const dataCadastroCupom = "2021-06-0401:00:00";
    fetch(
        `https://pblelcoma-final.herokuapp.com/notafiscal/totalnotas/${codigoUsuairo}/${dataCadastroCupom}`,
        {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            redirect: "follow",
            referrerPolicy: "no-referrer",
        }
    )
        .then((res) => res.json())
        .then((result) => {
            result.forEach((element) => {
                totalValueRegistered = totalValueRegistered + element.valor;
            });
            return totalValueRegistered;
        })
        .then(() => {
            document.getElementById("loading").style.display = 'none';
            document.getElementById("totalCadastrado").innerHTML = ` R$${totalValueRegistered.toFixed(2)}`;
            let activateCoupon = true;
            const button = document.querySelector("button");
            if (localStorage.getItem('activeMission')) {
                generateCode();
            } else {
                button.disabled = false;
            }
            const totalGoal = "30.00";
            document.getElementById("goalValue").innerHTML = `R$${totalGoal}`;

            if (totalValueRegistered >= totalGoal && !localStorage.getItem('activeMission')) {
                activateCoupon = false;
                button.disabled = activateCoupon;
            } else if (totalValueRegistered < totalGoal) {
                localStorage.removeItem('activeMission');
                button.disabled = activateCoupon;
            }

            let result =
                (parseFloat(totalValueRegistered) * 100) / parseFloat(totalGoal);

            document
                .getElementsByClassName("progress-bar")
                .item(0)
                .setAttribute("style", "width:" + result + "%");
        })
        .catch((err) => {
            document.getElementById("loading").style.display = 'none';
            console.error("Failed retrieving information", err);
        });
}
