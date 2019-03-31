import csv
import numpy as np
dict1={}
with open('output1.csv', 'r') as csvFile:

	reader = csv.reader(csvFile)
	for row in reader:
		dict1[row[0]]=row[1]


import pickle
import pandas as pd
filename = 'finalized_model1.sav'


def acute_predict(b):
	loaded_model = pickle.load(open(filename, 'rb'))
	result = loaded_model.predict(b)
	return result

def prepareinput(symptons):
	a=np.zeros([404])
	
	for sym in symptons:
		
		a[int(dict1[sym])]=1
	
	return np.array([a])



def finaloutput(arr):

	arr = prepareinput(arr)
	arr= acute_predict(arr)
	return arr





