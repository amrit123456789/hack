let model;
(async function(){
	model = await tf.models.load_model('http://localhost:8080/diab_model.json');
	$('.progress-bar').hide();
})();

let prediction = await model.predict().data();
let topp = Array.from(prediction)
.map(function(p,i){
	return {
		probability : p,
		className : 
	}
}).sort(function(a,b){
	return b.probability-a.probability;
}).slice(0,1);