const express = require('express')
const router = express.Router()
const sanitizeNumber = require('../controller/sanitizeNumber')

router.get('/:rawNumber', (req, res) => {
    const rawNumber = req.params.rawNumber
    try {
        if (isNaN(rawNumber)) {
            return res.status(406).json({message: 'Invalid params, please put a number'})
        }
        const sanitizedNumber = sanitizeNumber(rawNumber)
        return res.status(200).json({extenso: sanitizedNumber})
    } catch (e) {
        console.error(e)
        return res.status(500).json({error: 'API couldn\'t parser the result'})
    }
})

router.get('/*', (req, res) => {
    res.status(404).json({message: 'Unexpected route'})
})

module.exports = router