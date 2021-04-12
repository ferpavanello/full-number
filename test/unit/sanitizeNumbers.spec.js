const {
    selectTreatment,
    formatRawNumber,
    removeUnnecessaryZeros,
    constructLabel,
    mountThousandLabel,
    getThousandLabel,
    treatThousandLabel,
    tenHundredSpecificTreats
} = require('../../src/controller/sanitizeNumber')

describe('unit teste - sanitizeNumbers', () => {
    describe('formatRawNumber - treats diferent inputs', () => {
        it('get "0" from "-000,+00,0.0,00.00"', () => {
            const testRawNumbers = [
                '-000',
                '+00',
                '0.0',
                '00.00'
            ]
            testRawNumbers.forEach(rawNumber => {
                const formatedNumber = formatRawNumber(rawNumber)
                expect(formatedNumber).toEqual('0')
            })
        })

        it('get "9" from "000009"', () => {
            const formatedNumber = formatRawNumber('000009')
            expect(formatedNumber).toEqual('9')
        })

        it('get "22" from "  22"', () => {
            const formatedNumber = formatRawNumber('  22')
            expect(formatedNumber).toEqual('22')
        })

        it('get "123" from "-00123.000"', () => {
            const formatedNumber = formatRawNumber('-00123.000')
            expect(formatedNumber).toEqual('123')
        })
    })

    describe('removeUnnecessaryZeros', () => {
        it('remove zero from start', () => {
            const numberTreated = removeUnnecessaryZeros('0559')
            expect(numberTreated).toEqual('559')
        })

        it('remove zeros from start', () => {
            const numberTreated = removeUnnecessaryZeros('0006')
            expect(numberTreated).toEqual('6')
        })
    })

    describe('selectTreatment', () => {
        it('select constructLabel when number size is two', () => {
            const treatment = selectTreatment(2)
            expect(treatment).toEqual(constructLabel)
        })

        it('select constructLabel when number size is three', () => {
            const treatment = selectTreatment(3)
            expect(treatment).toEqual(constructLabel)
        })

        it('select mountThousandLabel when number size is four', () => {
            const treatment = selectTreatment(4)
            expect(treatment).toEqual(mountThousandLabel)
        })

        it('select mountThousandLabel when number size is five', () => {
            const treatment = selectTreatment(5)
            expect(treatment).toEqual(mountThousandLabel)
        })
    })

    describe('mountThousandLabel', () => {
        it('mount label "três mil e quinze"', () => {
            const treatedLabel = mountThousandLabel(['3', '0', '1', '5'], 4)
            expect(treatedLabel).toEqual('três mil e quinze')
        })

        it('mount label "mil e cento e dez"', () => {
            const treatedLabel = mountThousandLabel(['1', '1', '1', '0'], 4)
            expect(treatedLabel).toEqual('mil e cento e dez')
        })

        it('mount label "noventa e nove mil e novecentos e noventa e nove"', () => {
            const treatedLabel = mountThousandLabel(['9', '9', '9', '9', '9'], 5)
            expect(treatedLabel).toEqual('noventa e nove mil e novecentos e noventa e nove')
        })
    })

    describe('getThousandLabel', () => {
        it('get unity thousand part', () => {
            const thousandLabel = getThousandLabel('7', ['7'])
            expect(thousandLabel).toEqual('sete')
        })

        it('get ten thousand part', () => {
            const thousandLabel = getThousandLabel('36', ['3', '6'])
            expect(thousandLabel).toEqual('trinta e seis')
        })
    })

    describe('treatThousandLabel', () => {
        it('get unity thousand label', () => {
            const thousandLabel = treatThousandLabel(['4', '0', '1', '2'], 1)
            expect(thousandLabel).toEqual('quatro mil')
        })

        it('get ten thousand label', () => {
            const thousandLabel = treatThousandLabel(['2', '0', '9', '8', '7'], 2)
            expect(thousandLabel).toEqual('vinte mil')
        })
    })

    describe('constructLabel', () => {
        it('construct label "dois"', () => {
            const treatedLabel = constructLabel(['2'])
            expect(treatedLabel).toEqual('dois')
        })

        it('construct label "cento e vinte e dois"', () => {
            const treatedLabel = constructLabel(['1', '2', '2'])
            expect(treatedLabel).toEqual('cento e vinte e dois')
        })

        it('construct label "seiscentos e onze"', () => {
            const treatedLabel = constructLabel(['6', '1', '1'])
            expect(treatedLabel).toEqual('seiscentos e onze')
        })

        it('construct label "noventa e nove"', () => {
            const treatedLabel = constructLabel(['9', '9'])
            expect(treatedLabel).toEqual('noventa e nove')
        })

        it('return empty string when array contains just zeros', () => {
            const treatedLabel = constructLabel(['0', '0'])
            expect(treatedLabel).toEqual('')
        })
    })

    describe('tenHundredSpecificTreats', () => {
        it('get correct label when number one is on the first position', () => {
            const treatedLabel = tenHundredSpecificTreats(['1', '2', '3'], undefined)
            expect(treatedLabel).toEqual('cento e vinte e três')
        })

        it('get correct label when ten number part is founded at enum', () => {
            const treatedLabel = tenHundredSpecificTreats(['7', '9', '0'], 'noventa')
            expect(treatedLabel).toEqual('setecentos e noventa')
        })
    })
})
