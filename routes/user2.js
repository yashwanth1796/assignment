var express= require('express');
var router = express.Router();
var userController= require('../controllers/user');

router.route('/v2/users')
  .post(userController.postUsers)
  .get(userController.getusers);

router.route('/v2/users/update/:id')
  .put(userController.updateUsers)
  .delete(userController.deleteUsers)
  .get(userController.finduser)

router.route('/v2/users/search')
  .get(userController.getuser)

module.exports=router;
