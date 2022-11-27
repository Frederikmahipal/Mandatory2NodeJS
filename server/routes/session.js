const router = require('express').Router()

router.get('/session', (req, res) => {
    if (req.session.user) {
        res.status(200).send({data: req.session})
    } else {
        res.status(401).send({data: 'no user signed in'}) 
    }
})

router.get('/destroysession', (req, res) => {
    req.session.destroy()
    res.redirect('/session')
})

module.exports = router;