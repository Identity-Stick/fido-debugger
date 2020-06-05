#Intro
This small application was written as a possibility to debug FIDO Tokens. It outputs a very simple webpage, which allows you to construct a JSON create or authentication message, which will then be send via Webauthn create or authenticate method. The response will be shown on the website.

It can be run locally in the browser and works best in Chrome at the moment as Chrome implements Fido2. Make sure you followed the steps to set it up correctly an set the settings in Chrome to accept https self signed certificates.

It should only be used for demonstration or testing purposes. 

# Useful information
If you are interested to learn more about Fido2 & Webauthn or get a better understanding, you could start at some of those resources:

- [Introduction to Webauthn API](https://medium.com/@herrjemand/introduction-to-webauthn-api-5fd1fb46c285)
- [Ressources of the Fido alliance](https://fidoalliance.org/developers/)
- [Webauthn awesome list](https://github.com/herrjemand/awesome-webauthn)

# Setting it up
Clone this repository.
‘‘‘
git clone
‘‘‘

## Installing prerequisites
Use pip to install the listed prerequisites for the python server:
‘‘‘
pip install -r requirements.txt
'''

Besides that you will need openssl to create your own certificate. If you are on a Mac, you can use brew, to do install it.
‘‘‘
brew install openssl
‘‘‘

## Creating the certificate
The Webauthn API only works via a secured connection. Therefore you will also need to run the debugger over https. For that you will need to create your own certificate. You can use openssl with the configuration in req.cnf to do this like so:
‘‘‘
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365 -config req.cnf 

‘‘‘

Make sure to store cert.pem and key.pem in the root of your project as the Flask server will need access to this.

As Webauthn needs secure connections you need to make sure, that your browser accepts https connections from localhost. You will therefore need to get the created certificate accepted. Here are explanations on how to do this for [Chrome](https://www.robpeck.com/2010/10/google-chrome-mac-os-x-and-self-signed-ssl-certificates/#.WPpqZFKZNE4) and [Firefox](https://javorszky.co.uk/2019/11/06/get-firefox-to-trust-your-self-signed-certificates/). For Chrome you can acceppt localhost as a trusted entity by entering the correct command in your Chrome browser as explained [here](https://stackoverflow.com/a/31900210). 

## Running the server
Just start the Flask server.
‘‘‘
python app.py 
‘‘‘
This runs the server at localhost:5000. Make sure, that your server accepts https connections to localhost and your certificates.

# Using the Debugger
The Debugger gives you a textfield, in which you can enter JSON Text, which will then be translated to CBOR and send via the Webauthn using credentials.create() or credentials.get() respectiveley. The response of the FIDO Authenticator will be shown in the console as a Javascript object and parts of it will be shown on the page. 

Make sure, that your JSON is correct as no corrections or checking of the input is done. NOTE: The challenge will be set automatically and added to your JSON input.
