 import { players } from "./addUser.js"
 export const startGame = (ws, shipData)=>{

     const shipDataEntries = Array.from(shipData.keys())
       if(shipData.size === 2){
              players.forEach((client, index)=> {


                     console.log(`Player ${shipDataEntries[index]} has follow ships: ${ JSON.stringify(   shipData.get(shipDataEntries[index]))}`)
            if(client.readyState === WebSocket.OPEN){
                     
            
                    client.send(JSON.stringify({
    type: "start_game",
    data:
        {
            ships: JSON.stringify(   shipData.get(shipDataEntries[index])),
            currentPlayerIndex: shipDataEntries[index]
        },
    id: 0,
}))
           client.send(JSON.stringify({
    type: "turn",
    data: JSON.stringify({
           currentPlayer: shipDataEntries[0],
        }),
    id: 0,
}))
 

                
            } 
          })

       }


    
  }