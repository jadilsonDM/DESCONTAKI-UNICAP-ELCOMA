
const mascara = {
    cpf(value){
        return value.replace(/\D/g,'')
        .replace(/(\d{3})(\d)/,'$1.$2')
        .replace(/(\d{3})(\d)/,'$1.$2')
        .replace(/(\d{3})(\d{1,2})/,'$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    }
}
document.querySelectorAll("input").forEach(($input) => {

const campo = $input.dataset.js

$input.addEventListener('input', (e) => {
    e.target.value = mascara[campo](e.target.value)
    }, false)
})

cadastrar.addEventListener( 'click', () => {
localStorage.setItem('cpf', document.getElementById('CPF').value);
let cpf = localStorage.getItem('cpf'); //apagar se mantiver o back
localStorage.setItem('nome', '')
localStorage.setItem('email', '')
localStorage.setItem('nascimento', '')
localStorage.setItem('sexo', '')
localStorage.setItem('fecharPersonalizar', '')
})

