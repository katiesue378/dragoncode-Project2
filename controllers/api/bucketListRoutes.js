const router = require('express').Router();
const { Bucketlist } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/bucketlist', async (req, res) => {
//   // Send the rendered Handlebars.js template back as the response
//   res.render('bucketlist');
// });

router.get('/', async (req, res) => {
  try {
    const bucketlistData = await Bucketlist.findAll()
    if (!bucketlistData){
      res.status(404).json({message:"Bucketlist not found!"})
      return
    }
    res.status(200).json(bucketlistData)
  } catch (error) {
   console.log(error) 
   res.status(500).json(error)
  }
}
)
router.post('/', async (req, res) => {
  console.log("HELLO")
  try {
  
    const newBucketlist = await Bucketlist.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log("Hey LOOK HERE", newBucketlist)
    res.status(200).json(newBucketlist);
  } catch (err) {
    res.status(400).json(err);
  }
});




module.exports = router;