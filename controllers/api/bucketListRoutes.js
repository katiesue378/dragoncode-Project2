const router = require('express').Router();
const { Bucketlist } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('bucketlist');
});

router.post('/', async (req, res) => {
  try {
    const newBucketlist = await Bucketlist.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBucketlist);
  } catch (err) {
    res.status(400).json(err);
  }
});




module.exports = router;