const express = require('express')
const router = express.Router()
const sanitizedNumber = require('../controller/sanitizeNumber')

router.get('/:rawNumber', (req, res) => {
    const rawNumber = req.params.rawNumber
    try {
        const teste = sanitizedNumber(rawNumber)
        return res.status(200).json({extenso: teste})
    } catch {
        if (typeof rawNumber !== 'number') {
            res.status(406).json({message: 'Invalid params, please put a number'})
        }
        return res.status(500).json({error: 'API couldn\'t parser the result'})
    }
})

router.get('/*', (req, res) => {
    res.status(406).json({message: 'Unexpected route'})
})

module.exports = router