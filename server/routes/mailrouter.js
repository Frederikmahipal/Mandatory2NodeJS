const router = require('express').Router()
const sendRecovery = require('../util/nodemailer')

router.post('/passwordreset', (req, res) => {
    const email = req.body.email
    sendRecovery(email)
        .then(async () => {
             res.send({data: 'sent reset mail'})
        })
        .catch(errorMessage => {
            res.send({error: errorMessage})
        })
})

module.exports = router