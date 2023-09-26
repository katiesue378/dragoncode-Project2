const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bucketlistRoutes = require('./bucketListRoutes'); 

router.use('/users', userRoutes);
router.use('/bucketlists', bucketlistRoutes);

module.exports = router;