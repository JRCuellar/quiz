var express = require('express');
var router  = express.Router();

var quizController 		 = require('../controllers/quiz_controller');
var commentController 	 = require('../controllers/comment_controller');
var sessionController	 = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');

/* GET home page. */
router.get('/', sessionController.autoLogout, function(req, res) {
  	res.render('index', { title: 'Quiz' , errors:[]});
});

router.get('/author',sessionController.autoLogout, function(req,res){
	res.render('author',{ nombre:'Javier',apellidos:'Ramos Cuellar',edad:'34', pais:'España',ciudad:'Madrid', errors:[]});
});

router.get('/statistics', sessionController.autoLogout, statisticsController.getStatistics);

router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

router.get('/login', 	sessionController.new);
router.post('/login', 	sessionController.create);
router.get('/logout', 	sessionController.destroy);

router.get('/quizes',						sessionController.autoLogout, quizController.index);
router.get('/quizes/:quizId(\\d+)',			sessionController.autoLogout, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	sessionController.autoLogout, quizController.answer);
router.get('/quizes/new',					sessionController.autoLogout, sessionController.loginRequired, quizController.new);
router.get('/quizes/:quizId(\\d+)/edit',	sessionController.autoLogout, sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',			sessionController.autoLogout, sessionController.loginRequired, quizController.update);
router.post('/quizes/create',				sessionController.autoLogout, sessionController.loginRequired, quizController.create);
router.delete('/quizes/:quizId(\\d+)',		sessionController.autoLogout, sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', 						sessionController.autoLogout, commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', 							sessionController.autoLogout, commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',	sessionController.autoLogout, commentController.publish);

module.exports = router;
