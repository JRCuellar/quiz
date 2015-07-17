var express = require('express');
var router  = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', { title: 'Quiz' , errors:[]});
});

router.get('/author',function(req,res){
	res.render('author',{ nombre:'Javier',apellidos:'Ramos Cuellar',edad:'34', pais:'España',ciudad:'Madrid', errors:[]});
});

router.param('quizId', quizController.load);

router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);
router.get('/quizes/new',					quizController.new);
router.post('/quizes/create',				quizController.create);

module.exports = router;
