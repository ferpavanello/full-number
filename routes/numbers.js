const express = require('express')
const router = express.Router()
const sanitizedNumber = require('../controller/sanitizeNumber')

router.get('/:rawNumber', (req, res) => {
    const rawNumber = req.params.rawNumber
    const teste = sanitizedNumber(rawNumber)
    return res.status(200).json({extenso: teste})
})

module.exports = router