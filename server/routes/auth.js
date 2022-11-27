const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../users')

router.get('/', (req, res) => {
    res.send('test')
})

router.get('/homepage', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('unauthenticated')
    } else {
        return res.status(200).send('ok')
    }
})

router.post('/register', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
    })

    const invalidEmail = await User.findOne({email: req.body.email})
    if (!invalidEmail) {
      res.status(200).json({message: 'creating user'})
      console.log(req.body.email + 'just joined')

      await user.save()
    } else {
      res.status(400).json({error: 'email already exist'})
      console.log('error creating user')
    }
    
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword) {
      res.status(200).json({ message: 'Valid password' });
    } else {
      res.status(400).json({ error: 'Invalid Password' });
    }
  } else {
    res.status(401).json({ error: 'User does not exist' });
  }
});



module.exports = router;