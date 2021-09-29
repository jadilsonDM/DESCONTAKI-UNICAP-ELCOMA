let ctx = document.getElementById('chart').getContext('2d');

let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['01 a 04', '05 a 11', '12 a 18', '19 a 25', '26 a 31'],
        datasets: [{
            label: 'Valor em reais',
            backgroundColor:'#ec6533',
            borderColor: 'rgb(255, 99, 132)',
            data: [55.25,98.33,70.18,75.60,33.75]
        }]
    },

    // Configuration options go here
    options: {
        animation : {
            duration : 1000
        },
        legend : {
            position : "bottom",
        },
        tooltips : {
            enabled : true
        },
        scales : {
        
        }
    }
});

let select = document.getElementById('meses'); 
let dataAtual = new Date();
let mesAtual = dataAtual.getMonth()+1;

select.selectedIndex = mesAtual-1;

let id_usuario = localStorage.getItem('id_usuario');

findCupomByMothAndIdUser('491',''+ mesAtual);

select.addEventListener('change', function (){
    let mesSelect = select.options[select.selectedIndex].value;
    findCupomByMothAndIdUser('491',''+ mesSelect);
})

async function  findCupomByMothAndIdUser(id,mes){
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };

   let response = await fetch(`https://pblelcoma-final.herokuapp.com/cupons/455/${mes}`, options)
   if(response.ok){
       let listObj = await response.json();
       console.log(listObj);
       let valorPeriodoList = [0,0,0,0,0];

       for(let i=0; i< listObj.length; i++){

            let dia = listObj[i].data_uso;
            dia = dia.substring(0,2);

            if(dia >= 01 && dia <= 04){
                valorPeriodoList[0] +=  listObj[i].cupom.valor
            }
            if(dia >= 05 && dia <= 11  ){
                valorPeriodoList[1] +=  listObj[i].cupom.valor
            }
            if(dia >= 12 && dia <= 18){
                valorPeriodoList[2] +=  listObj[i].cupom.valor
            }
            if(dia >= 19 && dia <= 25){
                valorPeriodoList[3] +=  listObj[i].cupom.valor
            }
            else if(dia>= 26 && dia <= 31){
                valorPeriodoList[4] +=  listObj[i].cupom.valor
            }
       }
       console.log(valorPeriodoList)

       for(let i =0; i < valorPeriodoList.length; i++){
           chart.data.datasets[0].data[i] = valorPeriodoList[i];
           chart.update()
       }
   }else{
        return 'Erro'
   }
}

