#Intro
This small application was written as a possibility to debug FIDO Tokens. It outputs a very simple webpage, which allows you to construct a JSON create or authentication message, which will then be send via Webauthn create or authenticate method. The response will be shown on the website.

It can be run locally in the browser and works best in Chrome at the moment as Chrome implements Fido2. Make sure you followed the steps to set it up correctly an set the settings in Chrome to accept https self signed certificates.

# Useful information
If you are interested to learn more about Fido2 & Webauthn or get a better understanding, you could start at some of those resources:

- [https://medium.com/@herrjemand/introduction-to-webauthn-api-5fd1fb46c285](Introduction to Webauthn API)
- [](Ressources of the Fido alliance)
- [](Webauthn awesome list)

# Setting it up
Clone this repository.
‘‘‘
git clone
‘‘‘

## Installing prerequisites
Use pip to install the listed prerequisites:
‘‘‘
pip install -r requirements.txt
'''

Besides that you will need openssl to create your own certificate. If you are on a Mac, you can use brew, to do this.
‘‘‘
brew install openssl
‘‘‘

## Creating the certificate
The Webauthn API only works via a secured connection. Therefore you will also need to run the debugger over https. For that you will need to create your own certificate. You can use openssl to do this like so:
‘‘‘
openssl
‘‘‘

There are some things, which you should pay attention to.
