import { findUser } from "./findUser.js"
 
import fs from 'node:fs/promises'
import crypto from 'node:crypto'


export const players = []
export const addUser=async (ws, data)=> {
  
 
    const profoundData = JSON.parse(data)

    const userName = profoundData.name
    const userPassword = profoundData.password
     

    const {name, password}  =  await findUser(userName, userPassword)


    if(name === undefined && password=== undefined){
  

    const usersInfo  = await fs.readFile('database/userInfo.json', "utf-8")
    const users = JSON.parse(usersInfo) ?? []
    players.push(ws)
     users.push({
        id: 0,
        name: userName,
        password:userPassword
     })

   await fs.writeFile('database/userInfo.json', JSON.stringify(users, null, 2))

  //  const roomsInfo  = await fs.readFile('database/rooms.json', "utf-8")
  //  const roomIND = JSON.parse(roomsInfo)  
  //  let roomCreator = ''
  //    if(roomIND.length === 0){
  //     roomCreator = undefined
  //    }else {

  //   const room2 = JSON.stringify(roomIND[roomIND.length-1])
  //      roomCreator = (JSON.parse(room2)).creator
  //   console.log("D123: ",  roomCreator)

  //    }

   
     
   const resIndex = crypto.randomUUID()

   const r = JSON.stringify({
    name: userName,
    index: resIndex,
    error: false,
    errorText: "",
  })
  ws.send(JSON.stringify({
  type: "reg",
  data:  r,
  id:0 }))


console.log('Result: ' , data)


//    const roomData = [
//         { roomId: resIndex,
//           roomUsers: [{
//                 name: roomCreator ?? userName,
//                 index: 0
//                }],
//         } ]
  const winDta= []

//   const room = {
//       type: "update_room",
//       data: JSON.stringify(roomData),
//       id: 0,
// }
  const updateWinnwes = {
    type: "update_winners",
    data: JSON.stringify(winDta),
    id: 0,
}

  // const strRoom = JSON.stringify(room)
  const strUpdateWinners = JSON.stringify(updateWinnwes)
 
  // ws.send(strRoom)
  ws.send(strUpdateWinners)



    }

 else if(name && (password===undefined)){
   const r = JSON.stringify({
    name: name,
    index: 0,
    error: true,
    errorText: "Your name is fine, but password is wrong",
  })
  ws.send(JSON.stringify({
  type: "reg",
  data:  r,
  id:0 }))
               
 }
  else if(password && name===undefined){
   const r = JSON.stringify({
    name: userName,
    index: 0,
    error: true,
    errorText: "Your password is fine, but name is wrong",
  })
  ws.send(JSON.stringify({
  type: "reg",
  data:  r,
  id:0 }))           
 }
}
