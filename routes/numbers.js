const express = require('express')
const router = express.Router()

router.get('/:rawNumber', (req, res) => {
    const rawNumber = req.params.rawNumber
    console.log('param', rawNumber)
})

module.exports = router