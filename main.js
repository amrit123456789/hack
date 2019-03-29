const model = tf.sequential();

//config for layer
const config_hidden = {
  inputShape:[8],
  activation:'relu',
  units:100,
  kernel_regularizer:tf.regularizers.l2()
}
const config_output={
  units:2,
  activation:'sigmoid'
}

//defining the hidden and output layer
const hiden = tf.layers.dense(config_hidden);
const output = tf.layers.dense(config_output);

//adding layers to model
model.add(hiden);
model.add(output);

//define an optimizer
const optimize=tf.train.adam(0.001);

//config for model
const config={
optimizer:optimize,
loss:'softmaxCrossEntropy'
}

//compiling the model
model.compile(config);

console.log('Model Successfully Compiled');

const csvUrl =
'';

const csvDataset = tf.data.csv( csvUrl, {
	hasHeader:true,
	columnConfigs: {
        Outcome: {
			isLabel: true
        }
    }
});

const numOfFeatures = (await csvDataset.columnNames()).length - 1;



