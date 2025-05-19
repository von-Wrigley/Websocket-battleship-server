


import fs from 'node:fs/promises'





export const findUser= async (userName, userPassword)=> {
    const usersInfo  = await fs.readFile('database/userInfo.json', "utf-8")
    const users = JSON.parse(usersInfo) ?? []

    // const arr= JSON.parse((data.replaceAll('/', ' ') ))
    // const profoundData = JSON.parse(arr.data)

    // const userName = profoundData.name
    // const userPassword = profoundData.password
     
    const findPassword = users.find(x => x.password === userPassword) ?? 'undefined'
    const findName = users.find(x => x.name === userName) ?? 'undefined'


   return {
    name:   findName.name,
    password: findPassword.password 
   }
} 