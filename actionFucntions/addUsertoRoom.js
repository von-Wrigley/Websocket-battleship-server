  import { players } from "./addUser.js"
import crypto from 'node:crypto'
 


export const addUsertoRoom = (ws, wsServer)=>{


const createGame = {
    type: "create_game", 
    data: JSON.stringify(
        {
            idGame: '0',  
            idPlayer: '', 
        }),
    id: 0,
}
 

     
   
                  const broadcastUSers= (ws, wsServer)=> {
                    players.forEach((client)=> {
                       if(client.readyState === WebSocket.OPEN){
                           
                             client.send(JSON.stringify(
                                {
    type: "create_game", 
    data: JSON.stringify(
        {
            idGame: '0',  
            idPlayer: crypto.randomUUID(), 
        }),
    id: 0,
}
                                
                             ))
                       } 
                     })
               }
                  broadcastUSers(ws, wsServer)


}