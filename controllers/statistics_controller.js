var models = require('../models/models.js');

var np = 0;
var tc = 0;
var cm = 0;
var ps = 0;
var pc = 0;

exports.getStatistics = function (req,res){
	models.Quiz.findAll({
		include: [{model: models.Comment}]
	}).then(function(quizes){
			tc = 0;
			cm = 0;
			ps = 0;
			pc = 0;

			np = quizes.length;
			
			for (i=0;i<np;i++){
				pc_aux = 0;
				for(index in quizes[i].Comments){
					tc++;		
					pc_aux = 1;
				}
				if (pc_aux == 1)
					pc++;
				else
					ps++;
			}		
			
			cm = tc/np;
			res.render('statistics',{num_preguntas:np,total_comentarios:tc,comentarios_media:cm,preguntas_sin:ps,preguntas_con:pc,errors:[]})
		}
	);	
};