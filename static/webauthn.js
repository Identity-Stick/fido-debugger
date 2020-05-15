function create(){

  var jsonInput = document.getElementById('json_input').value;
  
  var publicKey = createPublicKey(jsonInput);

  navigator.credentials.create({ 'publicKey': publicKey })
    .then((newCredentialInfo) => {
        console.log('SUCCESS', newCredentialInfo)
        
        var response = newCredentialInfo.response;
        var clientExtResults = newCredentialInfo.getClientExtensionResults();

        //Decode client data 
        const utf8Decoder = new TextDecoder('utf-8');
        const decodedClientData = utf8Decoder.decode(response.clientDataJSON)
        
        //Show client data on page and log as an object
        $('#responseClientData').text(decodedClientData);
        const clientDataObj = JSON.parse(decodedClientData);
        console.log(clientDataObj)

        const decodedAttestationObject = CBOR.decode(response.attestationObject);

        console.log(decodedAttestationObject);

        //Get auth data and show it on page
        const authData = parseAuthData(decodedAttestationObject);
        $('#responseAuthData').text(authData);

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

function parseAuthData(decodedAttestation){

  const {authData} = decodedAttestation;

  // get the length of the credential ID
  const dataView = new DataView(new ArrayBuffer(2));
  const idLenBytes = authData.slice(53, 55);
  idLenBytes.forEach(
    (value, index) => dataView.setUint8(index, value)
  );
  const credentialIdLength = dataView.getUint16();

  // get the credential ID
  const credentialId = authData.slice(55, 55 + credentialIdLength);

  // get the public key object
  const publicKeyBytes = authData.slice(55 + credentialIdLength);

  // the publicKeyBytes are encoded again as CBOR
  const publicKeyObject = CBOR.decode(publicKeyBytes.buffer);
  console.log("publicKeyObject")
  console.log(publicKeyObject)

  const extensionData = authData.slice()

  return publicKeyObject;

}


/**
 * Posts the new credential data to the server for validation and storage.
 * @param {Object} credentialDataForServer 
 */
const postNewAssertionToServer = async (credentialDataForServer) => {
    const formData = new FormData();
    Object.entries(credentialDataForServer).forEach(([key, value]) => {
        formData.set(key, value);
    });
    
    return await fetch_json(
        "/verify_credentials", {
        method: "POST",
        body: formData
    });
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