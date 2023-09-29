const router = require('express').Router();
const { Bucketlist, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const bucketlistData = await Bucketlist.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });


    // Serialize data so the template can read it
    const bucketlistItems = bucketlistData.map((listItem) => listItem.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      bucketlistItems, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bucketlist/:id', async (req, res) => {
  try {
    const bucketlistData = await Bucketlist.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const bucketlist = bucketlistData.get({ plain: true });

    res.render('bucketlist', {
      ...bucketlist,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// withAuth,
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id)
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
