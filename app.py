#!/usr/bin/env python3

from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/verify_credentials', methods=['POST'])
def verify():
	registration_response = request.form
	print(registration_response)


if __name__ == '__main__':
	app.run(host='localhost', ssl_context=('cert.pem', 'key.pem'), debug=True)