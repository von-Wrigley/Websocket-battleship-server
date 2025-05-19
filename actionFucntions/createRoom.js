import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs/promises'
  import { players } from "./addUser.js"
import WebSocket, { WebSocketServer } from 'ws';
 
export const createRoom = async (ws, wsServer)=>{
      const resIndex = uuidv4()
        const usersInfo  = await fs.readFile('database/userInfo.json', "utf-8")
        const users = JSON.parse(usersInfo)
 const user = JSON.stringify(users[users.length-1])
 const userName = (JSON.parse(user)).name







         const roomsInfo  = await fs.readFile('database/rooms.json', "utf-8")
         const rooms = JSON.parse(roomsInfo)
      

         const roomInd = {
            creator: userName,
         }
  
         rooms.push(
            roomInd
         )
 
        await fs.writeFile('database/rooms.json', JSON.stringify(rooms, null, 2))



  
      
  const roomData = [
        { roomId: resIndex,
          roomUsers: [{
                name: userName,
                index: 0
               }],
        } ]
const room = {
      type: "update_room",
      data: JSON.stringify(roomData),
      id: 0,
}
     console.log('Room is created')
 



     const broadcastUSers= (ws, wsServer)=> {
     players.forEach((client)=> {
        if(client.readyState === WebSocket.OPEN){
            
              client.send(JSON.stringify(room))
        } 
      })
}
   broadcastUSers(ws, wsServer)



}


