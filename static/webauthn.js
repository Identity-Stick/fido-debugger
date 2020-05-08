function create(){

  var jsonInput = document.getElementById('json_input').value;
  
  var publicKey = createPublicKey(jsonInput);

  navigator.credentials.create({ 'publicKey': publicKey })
    .then((newCredentialInfo) => {
        console.log('SUCCESS', newCredentialInfo)
        $('#response').text(newCredentialInfo.toString())
        console.log(JSON.stringify(newCredentialInfo))
    })
    .catch((error) => {
        console.log('FAIL', error)
    })

}


function create_challenge(){
  var challenge = new Uint8Array(32);
  window.crypto.getRandomValues(challenge);
  console.log('created challenge: ' + challenge);
  return challenge;
}

function createPublicKey(input){
  //createPublicKey from input, for now it is hardcoded
  var publicKey
  try{
    publicKey = JSON.parse(input);  
  }catch(error){
    console.log('Input Parsing failed: ', error)
  }

  //TODO: Check, if everything is available
  console.log (publicKey)
  //Set the challenge, should not be done by user
  var challenge = create_challenge();
  publicKey.challenge = challenge

  //Set the id
  var userID = 'Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw='
  var id = Uint8Array.from(window.atob(userID), c=>c.charCodeAt(0))
  publicKey.user.id = id

  return publicKey;
}

function registerUser(){

  username=$('email').val()
  if(username===""){
    alert("please enter a username");
    return;
  }

  $.get(

    )
}