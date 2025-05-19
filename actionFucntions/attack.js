import { arrShotsall,arrShotsall2, map, playerShotsMap } from "../src/http_server/server.js"
import { players } from "./addUser.js"


export const attack = (ws, data, )=>{
const jsData = JSON.parse(data)
const x = JSON.parse(data)
const sendCoordX = x.x
const sendCoordY = x.y
const shipDataEntries = Array.from(map.keys())


console.log(`Attack coordinates: x: ${sendCoordX}, y: ${sendCoordY}`)

 
     if(shipDataEntries[0]===jsData.indexPlayer) {
             arrShotsall.push({
        Cx:sendCoordX, Cy:sendCoordY
      })
 
        }

          if(shipDataEntries[1]===jsData.indexPlayer) {
             arrShotsall2.push({
        Cx:sendCoordX, Cy:sendCoordY
      })
        }







let IdPla;
if(map.has(jsData.indexPlayer)){
       for(const key of map.keys()    ){
        if(key !==    jsData.indexPlayer){
            IdPla = key
            break
        }
       }
}
const shipsLocation = (map.get(IdPla))

 

let resultAttack;
const checkAttack = (CoordX, CoordY, ships) => {
    for(const ship of ships){
        const {x, y} = ship.position
        const length = ship.length

             
         
       if (ship.direction === true) { 
      if (CoordX === x && CoordY >= y && CoordY < y + length) {
         console.log(`Attack by User id: ${jsData.indexPlayer}. He shot the boat. He will shot again` )
        return resultAttack =  "shot" ;
      }
    } else { 
     
  if (CoordY === y && CoordX >= x && CoordX < x + length) {
     console.log(`Attack by User id: ${jsData.indexPlayer}. He shot the boat. He will shot again` )
                 
        return resultAttack =  "shot" ;
      }
    }

     
  }
  return resultAttack =  "miss" ;

  
}


const  res = checkAttack(sendCoordX, sendCoordY, shipsLocation)
 


    players.forEach((client, index)=> {
            if(client.readyState === WebSocket.OPEN){
   
                 if(res==='shot') { 
     
 

                    

 
                 
                    client.send(JSON.stringify({
    type: "attack",
    data: JSON.stringify({
            position: {
                x: sendCoordX,
                y: sendCoordY,
            },
            currentPlayer:  jsData.indexPlayer,  
            status: res ,
        }),
    id: 0,
}))
               
            client.send(JSON.stringify({
    type: "turn",
    data: JSON.stringify({
           currentPlayer: jsData.indexPlayer,
        }),
    id: 0,
}))}
                    
          
       else     {
         console.log(`Attack by User id: ${jsData.indexPlayer}. He missed` )
             console.log(`Its turn: ${IdPla}` )
        client.send(JSON.stringify({
    type: "attack",
    data: JSON.stringify(    {
            position: {
                x: sendCoordX,
                y: sendCoordY,
            },
            currentPlayer:  jsData.indexPlayer,  
            status: res ,
        }),
    id: 0,
}))
           client.send(JSON.stringify({
    type: "turn",
    data: JSON.stringify({
           currentPlayer: IdPla,
        }),
    id: 0,
}))

                 }
          
            }
})}

