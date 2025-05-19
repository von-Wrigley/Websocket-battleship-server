import { WebSocketServer } from 'ws';
import { createRoom } from '../../actionFucntions/createRoom.js';
import { addUsertoRoom } from '../../actionFucntions/addUsertoRoom.js';
import { startGame } from '../../actionFucntions/startGame.js';
import { addUser, players } from '../../actionFucntions/addUser.js';
import { attack } from '../../actionFucntions/attack.js';
import { randomAttack } from '../../actionFucntions/randomAttack.js';

 export let map = new Map()
 export let arrShotsall = []
  export let arrShotsall2 = []
 export let playerShotsMap = new Map();


export  function startwsServer (port){
    const wsServer = new WebSocketServer({port});
    wsServer.on('connection', function connection(ws) {

    ws.on('message', function message(data1) {
        
    try {
      const {type, data, id} = JSON.parse(data1.toString())
      

    if(type === 'reg'){
    console.log('Command: ' , JSON.parse(data1.toString()))
               addUser(ws, data)
    }
    else if(type === 'create_room'){
 
      createRoom(ws, wsServer)
  } else if(type ==="add_user_to_room"){
    console.log('Add user to the room')
     console.log('The game starts now...')
    addUsertoRoom(ws, wsServer)
  }
   else if(type ==="add_ships"){
 
  const shipsData = JSON.parse(data)
     console.log('Command: Add ships')

 
  map.set(shipsData.indexPlayer, shipsData.ships)
  startGame(ws, map)
  }
   else if(type ==="attack"){
 console.log('Command Attack')
     const shipsData = JSON.parse(data)

     playerShotsMap.set(shipsData.indexPlayer, []);

             attack(ws, data)

  }



    } catch (error) {
          console.log("ERROR:  ", error)
    }
  });

  ws.on('error', console.error);
  ws.on('close', function close(e) {
    players.find(ws=> ws===ws)
    console.log('Other user disconected')
});
});
 
wsServer.onopen = function () {
    var t = setInterval(function(){
        if (ws.readyState != 1) {
            clearInterval(t);
            return;
        }
        ws.send('{type:"ping"}');
    }, 55000);
};


}

