
const memorizeArray = []

async function createLink(){
    const inputURL = document.getElementById('url')
    if(!(await itsMemorized(inputURL.value))){
      let apiRequest = await sendRequest(inputURL.value);
      memorizeArray.push(apiRequest) 
      return displayResults(apiRequest)
    }
    return displayResults(await findInMemorize(inputURL.value))   
}
async function sendRequest(inputURL){
  let response;
  var urlencoded = new URLSearchParams();
  urlencoded.append("url", `${inputURL}`);

  var requestOptions = {
    method: 'POST',
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: urlencoded,
    redirect: 'manual'
  };
  
  await fetch("/create", requestOptions)
    .then(response => response.text())
    .then(result => {
      data = JSON.parse(result);
      response = {id:data.id,fullURL:inputURL}
    })
    .catch(error =>  {
      response = `ERROR : ${error}` 
    });
    return response
}
async function itsMemorized(apiRequest){
  let foundItem = await memorizeArray.find(x => x?.fullURL == apiRequest);
  if(foundItem){
    return true
  }
  return false
}
async function findInMemorize(ToFind){
  let foundItem = await memorizeArray.find(x => x?.fullURL == ToFind);
  return foundItem
}
function displayResults(results){
  var LinkHolder = document.getElementById("finallyLink")
  LinkHolder.innerHTML = `Your link: <a href="${results.fullURL}">localhost.com/${results.id}</a>`
}



