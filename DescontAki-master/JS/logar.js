

const logar = document.querySelector('#logar');
logar.addEventListener('click', () => {   

    document.getElementById("loading").style.display = 'block';
    var cpf = document.getElementById("CPF").value
    var senha = document.getElementById("senha").value 
    localStorage.setItem('cpf', cpf)
    cpf = cpf.replace("-","").replace(".","").replace(".","")
   
    const modal = document.getElementById('modal-ativar');    

    const validarConta = (data) =>  {
        for (const atributos in data){
            if (data["cpf"] == cpf && data["senha"] == senha){
                localStorage.setItem("CodSession", data["id"])
                window.location.href = "home.html"
            } 
            else if (modal)
            {

                document.getElementById("msgErro").innerHTML = "Os dados informados estão incorretos!"
                console.log(document.getElementById("msgErro").innerHtml)
                modal.classList.add('mostrar');

                modal.addEventListener('click', (e) => {

                    if (e.target.id == 'modal-ativar') {
                        modal.classList.remove('mostrar');
                      
                    }         
                })
              }
    
            }
    }

    //fetch pegando os valores do banco
    fetch(`https://pblelcoma-final.herokuapp.com/usuarios/cpf/${cpf}`,
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

            response.json().then(data => validarConta(data))
            document.getElementById("loading").style.display = 'none';

        }).catch(function(error){

            if (modal)
            { 
                document.getElementById("loading").style.display = 'none';
                document.getElementById("msgErro").innerHTML = "CPF ou senha inválidos, por favor tente novamente!";
                   
                console.log(document.getElementById("msgErro").innerHtml)
                modal.classList.add('mostrar');

                modal.addEventListener('click', (e) => {

                    if (e.target.id == 'modal-ativar') {
                        modal.classList.remove('mostrar'); 
                         
                    }         
                })
              }
        })

    
 })