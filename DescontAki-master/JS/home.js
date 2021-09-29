let nome;
let h1 = document.getElementsByTagName('h1')[0]
let valores = {};

const carregarPersonalizacoes = () => {

    const salvarFetch = (data) =>{
        valores = data;
        console.log(valores);
        nome = valores["nome"]
        
        imprimirNome()
    }


    fetch(
    `https://pblelcoma-final.herokuapp.com/usuarios/${localStorage.getItem(
      "CodSession"
    )}`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      response.json().then((data) => salvarFetch(data));
    })
    .catch((e) => console.log("deu erro" + e.message));
};
    
    
    
    if(localStorage.getItem('fecharPersonalizar') == ''){
        personalizar.style.display = 'block'
    }  


function imprimirNome(){

    if(nome != '' && nome != null){  
        h1.innerHTML = `Seja Bem-Vindo(a), <span>${valores["nome"]}</span> !`
    }   
}

function fecharBalao(){
    let personalizar = document.getElementById('personalizar')
    personalizar.style.display = 'none'
    localStorage.setItem('fecharPersonalizar', 1)
}

function salvarNome(){
    let nome = document.getElementById('inputRespNome')  
    let divRespNome = document.getElementById('respostaNome')  
    let divRespNasc = document.getElementById('respostaNascimento')  

    if(nome.value !='' ){
        valores["nome"] = nome.value;
        divRespNome.style.display = 'none'
        divRespNasc.style.display = 'block'
    } else {
        alert('Os dados precisam ser preenchidos para serem salvos.')
    }
}

function salvarNasc(){
    let nascimento = document.getElementById('inputRespNasc')  
    let divRespNasc = document.getElementById('respostaNascimento') 
    let divRespSexo = document.getElementById('respostaSexo')  

    if(nascimento.value !=''){
        valores["nascimento"] = nascimento.value;
        divRespNasc.style.display = 'none'
        divRespSexo.style.display = 'block'
    } else {
        alert('Os dados precisam ser preenchidos para serem salvos.')
    }
}

function salvarSexoMasc(){
    let divRespSexo = document.getElementById('respostaSexo')  
    let divRespEmail = document.getElementById('respostaEmail')

    valores["sexo"] = "m";
    divRespSexo.style.display = 'none'
    divRespEmail.style.display ='block'  
    
}

function salvarSexoFem(){
    let divRespSexo = document.getElementById('respostaSexo') 
    let divRespEmail = document.getElementById('respostaEmail')

    valores["sexo"] = "f";
    divRespSexo.style.display = 'none'
    divRespEmail.style.display ='block'
}

function salvarEmail(){
    let email = document.getElementById('inputRespEmail')
    let divRespEmail = document.getElementById('respostaEmail')
    let divMsgFinal = document.getElementById('divMsgFinal')
    let cabecalho =document.getElementById('cabecalhoPersonalizar')

    if(email.value !=''){
        valores["email"] = email.value;
        divRespEmail.style.display ='none'
        cabecalho.style.display = 'none'
        divMsgFinal.style.display ='block'
        localStorage.setItem('fecharPersonalizar', 1)
    } else {
        alert('Os dados precisam ser preenchidos para serem salvos.')
    }
    console.log(valores);
    
    salvarDados();
    
    carregarPersonalizacoes();
    
}

const salvarDados = () =>{
    fetch(`https://pblelcoma-final.herokuapp.com/usuarios/${localStorage.getItem(
        "CodSession"
      )}`, {
    method: "put",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(valores),
  })
    .then(function (res) {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res;
    })

    .then(function (res) {
      console.log(res);
      localStorage.setItem('fecharPersonalizar', 1);
    })
    .catch(function (error) {
      alert(error);
    });

  alert("Suas alterações foram realizadas com sucesso!");
}





function inciaModal(modalID) {

        const modal = document.getElementById(modalID);
        if (modal) {

            modal.classList.add('mostrar');

            modal.addEventListener('click', (e) => {

                if (e.target.id == modalID) {
                    modal.classList.remove('mostrar');
                }
            })
        }
    }


