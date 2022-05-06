const {v4} = require("uuid");
const fs = require("fs");
const { use } = require("express/lib/application");
const FILE_PATH = require("path").join(__dirname, "users.json");

/* Funções de capturas */
function findUsers(){
    if(!fs.existsSync(FILE_PATH)) return [];
    const rawData = fs.readFileSync(FILE_PATH);
    return JSON.parse(rawData);
}

function findUser(id){
    return findUsers().find(item => item.id === id);
}

/* Funções de modificação */
function insertUser(user){
    const users = findUsers();
    user.id = v4();
    users.push(user);
    fs.writeFileSync(FILE_PATH, JSON.stringify(users) );
    return user;
}

function updatePutUser(id, user){
    const users = findUsers();
    users.forEach((item, index, array)=> {
        if(item.id === id){
            user.id = id;
            array[index] = user;
        }
    });

    fs.writeFileSync(FILE_PATH, JSON.stringify(users));
    return user;
}

function updateUser(id, user, overwrite){
    const users = findUsers();
    const index = users.findIndex(item => item.id === id)
    
    if(index == -1) return {};
    
    if(overwrite){
        users[index] = user;
        users[index].id = id;
    }else{
        for(let key in user){
            users[index][key] = user[key];
        }
    }

    fs.writeFileSync(FILE_PATH, JSON.stringify(users) );
    return users[index];
}

function deleteUser(id){
    const users = findUsers(id);
    
    users.forEach((item, index, array)=>{
        if(item.id === id){
            array.splice(index, 1);
        }
    })
    fs.writeFileSync(FILE_PATH, JSON.stringify(users));
    return id;
}

module.exports = {findUser, findUsers, insertUser, updateUser, deleteUser, updatePutUser};