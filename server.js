var bodyParser = require('body-parser');
const res = require('express/lib/response');
var urlencodedParser = bodyParser.urlencoded({extended:false})
const shortId = require("shortid")



const {addObjectToFile,findInBase,validURL} = require('./Scripts/scripts.js'),
express = require('express'),
app = express(),
port = 80;


app.use(express.static(`/public`))
app.use('/css', express.static(__dirname + '/WebHosting/public/css'))
app.use('/js', express.static(__dirname + '/WebHosting/public/js'))




//INDEX AS DEFAULT PAGE

app.get('',(req,res) =>{
    res.sendFile(__dirname + '/WebHosting/views/index.html')
})

app.get('/:id',async (req,res) =>{
    let FoundObject = await findInBase('./database.json',req.params['id'])
    if(FoundObject){return res.redirect(FoundObject?.fullURL)}
    return res.redirect('/')
})

app.post('/create',urlencodedParser, async (req,res) =>{
    
    let FoundObject = await findInBase('./database.json',req.body.url)
    if(FoundObject){return res.json(FoundObject)}
    if(validURL(req.body.url)){
        let generatedID = shortId();
        console.info("Link Created!")
        addObjectToFile('./database.json',{id:`${generatedID}`,fullURL:`${req.body.url}`})
        return res.json({"id":generatedID})
    }
    return res.json({"id":"WRONG_URL"})
})







// Listen on port 3000
app.listen(port, ()=>{
    console.info(`Listening on ${port}`)
})