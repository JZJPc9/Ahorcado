const path = require('path'); 

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine','ejs');

// app.set('views',path.join(__dirname+'/views'));
app.set('views', __dirname + "/views")
// app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + "/public")));


const server = app.listen(app.get('port'),()=>{
    console.log('http://localhost:3000');
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection',(socket)=>{
    console.log('new connection',socket.id);

    socket.on('ejemplo',()=>{       
        io.sockets.emit('ejemplo',{socket:socket.id});
    });

    socket.on('Unirse',()=>{
        console.log("socket que se unio: ",socket.id)
        io.sockets.emit('unirse',{socket:socket.id})
    })
    socket.on('esperandoJugador',()=>{
        io.sockets.emit('esperandoJugador');
    });
    // socket.on('esperandoJugadorSalio',(data)=>{
    //     console.log([data]);
    //     io.sockets.socket(data.socket).emit('jugadorFuera')
    // });
    socket.on('jugador2',()=>{
        io.sockets.emit('jugador2');
    });
    socket.on('empezarJuego',()=>{
        io.sockets.emit('empezarJuego');
    });
    socket.on('cancelar',()=>{
        console.log("calcelando")
        io.sockets.emit('cancelar');
    });

    socket.on('InicioJuego',()=>{
        io.sockets.emit('InicioJuego')
    });

    socket.on('compañero',()=>{
        io.sockets.emit('compañero')
        //alert('ya gano tu compañero')
    });

    socket.on('disconnect',()=>{
        console.log('Socket desconectado',socket.id)
        io.sockets.emit('socketDesconectado',{socket:socket.id});
    });


    
});