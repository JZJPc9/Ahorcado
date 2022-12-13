//CLIENTE
const socket = io();

String.prototype.replaceAt=function(index, character) {
     return this.substring(0, index) + character + this.substring(index+character.length);
    } 

let btn = document.getElementById('btnUnirme');
// let btn3 = document.getElementById('ahoritaveoqueponeraqui'); 
let contador = 0;//para que solo dos personas puedan entrar a una sala
let arreglo=[];//los socket que entraron a la sala(pos si se desconecta un
// socket sabes si ese socket estaba jugando)

let palabras=["peces","nacer","vacío","burro","bingo","huevo","hotel","video","voraz","audio","ojera","aleta","extra","enojo","rimel","regla","solar","tarta","raton","perro"]
// setInterval(()=>{
socket.emit('ejemplo');//lo primero que hace emite un socket al servidor
// },5000)

socket.on('ejemplo',(data)=>{
    document.getElementById('saludo').innerHTML+='Socket: '+data.socket+"<br>";
});

//al clickear el unirse se cambia a cancelar
btn.addEventListener('click',()=>{
    document.getElementById('btn').innerHTML='<button id="btnUnirme" hidden>Unirme</button>'
    document.getElementById('btn2').innerHTML='<button id="btncancelar" onclick="location.href=location.href">Cancelar</button>'
    
    socket.emit('Unirse');
});

//si solo hay un jugador se espera a que entre otro
socket.on('unirse',(data)=>{
    contador++;
    if(contador ==1){
        arreglo.push(data.socket);
        socket.emit('esperandoJugador');
    }else{}
    if(contador ==2){
        arreglo.push(data.socket)
        socket.emit('empezarJuego') 
    }else{}  
    if(contador !=1 && contador!=2){
       document.getElementById('lleno').innerHTML='ya hay dos jugadores';
    }else{}    
    
});

socket.on('esperandoJugador',()=>{
    document.getElementById('enespera').innerHTML='Esperando jugador 2...'
});

socket.on('jugador2',()=>{
    document.getElementById('enespera').innerHTML='ya hay dos jugadores'
});


socket.on('compañero',()=>{
    document.getElementById('comresp').innerHTML='ya ha ganado tu compañero'
});

let btn2 = document.getElementById('btncancelar');
btn2.addEventListener('click',()=>{
    socket.emit('cancelar');
});

socket.on('socketDesconectado',(data)=>{
    // console.log(arreglo.indexOf(data));
    console.log("data",data.socket);
    console.log(arreglo.indexOf(data.socket))
    if(arreglo.indexOf(data.socket)!=-1 ){
        arreglo.slice(arreglo.indexOf(data.socket))
        console.log('el jugador abandono la partida')
        contador--;
        // io.sockets.socket(arreglo[0]).emit('')
        socket.emit('esperandoJugador');
    }else{
        console.log("no estaba jugando");
    }
    
});

// socket.on('empezarJuego',()=>{
//     document.getElementById('enespera').innerHTML="";

//     var x = Math.floor(Math.random()*20);
//     let palabra = palabras[x];
//     let palabraConGuiones = palabra.replace(/./g, "_ ");
//     document.getElementById('palabra').innerHTML=palabraConGuiones;
    
//     socket.emit('InicioJuego');    
// });



socket.on('empezarJuego',()=>{
// socket.on('InicioJuego',()=>{
    document.getElementById('enespera').innerHTML="";
    var x = Math.floor(Math.random()*20);
    let palabra = palabras[x];
    console.log(palabra)
    let palabraConGuiones = palabra.replace(/./g, "_ ");
    document.getElementById('palabra').innerHTML=palabraConGuiones;
    let contadorFallos=0;
    let letraEsIncorecta = true;
    // console.log(palabraConGuiones)
    // alert('InicioJuego')
    btnLetra = document.getElementById('A')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='a';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero');
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }

        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('B')
    btnLetra.addEventListener('click',()=>{
        letra='b';
        console.log(palabra)
        console.log(palabraConGuiones)
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }  
   
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('C')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='c';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
            letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('D')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='d';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
            letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('E')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='e';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('F')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='f';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('G')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='g';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('H')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='h';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('I')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='i';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('J')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='j';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('K')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='k';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('L')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='l';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('M')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='m';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('N')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='n';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('Ñ')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='ñ';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('O')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='o';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('P')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='p';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('Q')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='q';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('R')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='r';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('S')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='s';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('T')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='t';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('U')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='u';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('V')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='v';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('W')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='w';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('X')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='x';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('Y')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='y';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
             }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    btnLetra = document.getElementById('Z')
    btnLetra.addEventListener('click',()=>{
        // alert('A')
        letra='z';
        console.log(palabra)
        console.log(palabraConGuiones)
        // for(const i in palabra){
        letraEsIncorecta = true;
        for(let i=0; i<palabra.length; i++){
            if(letra == palabra[i]){
                var expR = /[a]/g
                console.log("palabra en el if",palabra)
                console.log(palabra[i])
                palabraConGuiones = palabraConGuiones.replaceAt(i*2, letra);
                console.log(palabraConGuiones)
                var cou = palabraConGuiones.indexOf("_");
                console.log(cou)
                if(cou <= -1){
                    alert("Usted a aganado");
                    socket.emit('compañero')
                    location.reload();
                }
                letraEsIncorecta=false;
                
            }
        }
        if(letraEsIncorecta){
            contadorFallos++
            document.querySelector("#img").style.backgroundPosition=-(250*contadorFallos)+'px 0'
            if(contadorFallos==6){
                alert('perdiste')
                location.reload();
            }
        }
        document.getElementById('palabra').innerHTML=palabraConGuiones;   
    });
    
});

// var x = Math.floor(Math.random()*20);
// let palabra = palabras[x];
// let palabraConGuiones = palabra.replace(/./g, "_ ");
// document.getElementById('palabra').innerHTML=palabraConGuiones;
    

// btnLetra = document.getElementById('A')




// socket.on('cancelar',()=>{
//     contador--;
//     document.getElementById('btn2').innerHTML='<button id="btncancelar" hidden>Cancelar</button>'
// });


// btn3.addEventListener('click',()=>{

// });