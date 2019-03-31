import numpy as np
from flask import Flask, request, jsonify,  render_template,Response
import pickle
import cv2
import jsonpickle
import model 

app = Flask(__name__)
# Load the model
@app.route('/api',methods=['POST'])
def predict():
	data = request.get_json(force=True)
	print(data)
	print(data['data'])
	
	output = model.finaloutput(data['data'])
	output=list(output)

	
	return jsonify(output)


app.run(port=5000,debug=True)