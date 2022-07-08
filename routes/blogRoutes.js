const express = require('express');
const blogController = require('../controller/blogController');

const router = express.Router();

router.get('/', blogController.index);

router.post('/', blogController.store);
router.get('/create', blogController.create);

//Route parameters get using ID
router.get('/:id', blogController.search);

//Delete a blog
router.delete('/:id', blogController.deleted);

module.exports = router;