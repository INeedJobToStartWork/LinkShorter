fs = require('fs');
var bodyParser = require('body-parser');
const res = require('express/lib/response');
const shortId = require("shortid")

function addObjectToFile(file,object){
    fs.readFile(file,'utf-8',(err,data)=>{
        var tablica = JSON.parse(data);
        tablica.push(object)
        fs.writeFile(file,JSON.stringify(tablica,null,2),err =>{})
    });
}
async function findInBase(file,ToFind) {
    var response; 
    await readFile(file)
    .then(async (data)=> {
        data = JSON.parse(data)
        response =  await data.find(x => x.id == ToFind || x.fullURL == ToFind) ?? null
    })
    .catch(error => {
        response = null
        console.log("Cant Read/Found File")
    })
    return response;
}

var readFile = (path) =>{
    return new Promise(function (resolve, reject){   
        fs.readFile(path, 'utf-8', function(error, contents) {
            if (error) reject(error);
            else resolve(contents);
        });
    })
};


function validURL(myURL){
    var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var regex = new RegExp(expression);
    if (myURL.match(regex)) {
        return true
    }
    return false
}
module.exports = {
    addObjectToFile,
    findInBase,
    readFile,
    validURL
}