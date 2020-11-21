const NumbersEnum = require('./NumbersEnum')

function sanitizeNumber (rawNumber) {
    if (NumbersEnum[rawNumber]) {
        return NumbersEnum[rawNumber]
    }

    const arrNumbers = rawNumber.split('')
    const numbersLength = arrNumbers.length
    const treatment = selectTreatment(numbersLength)
    return treatment(arrNumbers, numbersLength)
}

function selectTreatment (numbersLength) {
    const treats = {
        2: constructLabel,
        3: constructLabel,
        4: thousandTreat
    }

    return treats[numbersLength]
}

function thousandTreat (arrNumbers, numbersLength) {
    return constructLabel(arrNumbers, numbersLength)
}

function constructLabel (arrNumbers, numbersLength) {
    const arrLabels = arrNumbers.map((number, index) => {
        const elementPosition = index + 1
        const rangeFromLength = numbersLength - elementPosition
        const exponent = Math.pow(10, rangeFromLength)
        return NumbersEnum[number * exponent]
    })

    const fullLabel = arrLabels.join()
    return fullLabel.replace(/,+/g, ' e ')
}

module.exports = sanitizeNumber