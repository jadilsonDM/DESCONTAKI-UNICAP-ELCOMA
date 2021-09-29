class SlideStories{
    constructor(id) {
        this.slide = document.getElementById(id)
        this.init()
    }

    ativarSlide(index){
        this.ativo = index
        this.itens.forEach(item => item.classList.remove('ativo'))
        this.itens[index].classList.add('ativo')
        this.itensBarraProgressao.forEach(item => item.classList.remove('ativo'))
        this.itensBarraProgressao[index].classList.add('ativo')
        this.autoSlide()
    }

    voltar(){
        if(this.ativo>0){
        this.ativarSlide(this.ativo - 1)
        } else {
            this.ativarSlide(this.itens.length -1)
        }
    }

    avancar(){
        if(this.ativo < this.itens.length -1){
            this.ativarSlide(this.ativo + 1)
        } else {
            this.ativarSlide(0)
        }
    }

    addNavegacao(){
        const btnProximo = this.slide.querySelector('button.proximo')
        const btnVoltar = this.slide.querySelector('button.anterior')

        
        btnProximo.addEventListener('click', this.avancar)
        btnVoltar.addEventListener('click', this.voltar)
    }

    addBarraProgressaoStories(){
        this.itens.forEach(() => this.barraProgressao.innerHTML += `<span></span>`)
        this.itensBarraProgressao = Array.from(this.barraProgressao.children)
        console.log(this.itensBarraProgressao)

    }

    autoSlide(){
        clearTimeout(this.timeout)
        this.timeout = setTimeout(this.avancar, 5000)
    }

    init(){
        this.avancar = this.avancar.bind(this)
        this.voltar = this.voltar.bind(this)
        this.itens = this.slide.querySelectorAll('.itensSlides > *')
        this.barraProgressao = this.slide.querySelector('div.progressoSlide')
        this.addBarraProgressaoStories()
        this.ativarSlide(0)
        this.addNavegacao()
    }
}

new SlideStories('slide1')


//Botão abertura storie

function abrirStorie(){
    window.location = './storie.html'

}

function sairStorie(){
    window.history.back()
}
