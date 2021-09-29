   let scanner = new Instascan.Scanner(
            {
                video: document.getElementById('preview')
            }
        );
        scanner.addListener('scan', function(content) {
            //alert('Escaneou o conteudo: ' + content);
           // window.open(content, "_blank");

                InserindoNota(content);
                console.log(content)

        });
        Instascan.Camera.getCameras().then(cameras => 
        {
            if(cameras.length > 0){
                scanner.start(cameras[0]);
            } else {
                console.error("Não existe câmera no dispositivo!");
            }
        });

        function InserindoNota(content){
            
            var valores = {
                 url: content
            };
             fetch("http://pblelcoma-final.herokuapp.com/notafiscal",
                {
                    method: 'post',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify(valores)     
                            
                })
                
                .then(function (res) {
                    if(!res.ok){
                        throw Error(res.statusText);
                    }
                    return res;})

                .then(function (res)
                { 
                    console.log(funcionou)
                })
                .catch(function(error){
                    console.log(error);
                }) 
        }