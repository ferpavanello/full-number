const { sanitizeNumber } = require('../../src/controller/sanitizeNumber')

describe('end to end - numbers treatment', () => {
    it('get "0" from "-000,+00,0.0,00.00"', () => {
        const testRawNumbers = [
            '-000',
            '+00',
            '0.0',
            '00.00'
        ]
        testRawNumbers.forEach(rawNumber => {
            const sanitizedNumber = sanitizeNumber(rawNumber)
            expect(sanitizedNumber).toEqual('zero')
        })
    })

    it('get "menos duzentos e cinquenta e seis" from "-256"', () => {
        const sanitizedNumber = sanitizeNumber('-256')
        expect(sanitizedNumber).toEqual('menos duzentos e cinquenta e seis')
    })

    it('get "menos oitenta" from "-80"', () => {
        const sanitizedNumber = sanitizeNumber('-80')
        expect(sanitizedNumber).toEqual('menos oitenta')
    })

    it('get "cento e onze" from "111"', () => {
        const sanitizedNumber = sanitizeNumber('111')
        expect(sanitizedNumber).toEqual('cento e onze')
    })

    it('get "mil e duzentos e trinta e quatro" from "1234"', () => {
        const sanitizedNumber = sanitizeNumber('1234')
        expect(sanitizedNumber).toEqual('mil e duzentos e trinta e quatro')
    })

    it('get "noventa e nove mil e novecentos e noventa e nove" from "99999"', () => {
        const sanitizedNumber = sanitizeNumber('99999')
        expect(sanitizedNumber).toEqual('noventa e nove mil e novecentos e noventa e nove')
    })
})
