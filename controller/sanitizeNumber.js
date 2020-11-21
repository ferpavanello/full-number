const NumbersEnum = require('./NumbersEnum')

function sanitizeNumber (rawNumber) {
    if (NumbersEnum[rawNumber]) {
        return NumbersEnum[rawNumber]
    }

    const arrNumbers = rawNumber.split('')
    const numbersLength = arrNumbers.length
    const treatment = selectTreatment(numbersLength)
    return treatment(rawNumber, arrNumbers, numbersLength)
}

function selectTreatment (numbersLength) {
    const treats = {
        1: unityTreat,
        2: tenTreat,
        3: hundredTreat,
        4: thousandTreat
    }

    return treats[numbersLength]
}

function unityTreat (rawNumber) {
    console.log('unity', NumbersEnum[rawNumber])
    return NumbersEnum[rawNumber]
}

function tenTreat (rawNumber, arrNumbers, numbersLength) {
    const sanitizedLabel = constructLabel(arrNumbers, numbersLength)
    console.log('ten')

    return sanitizedLabel
}

function hundredTreat (rawNumber, arrNumbers, numbersLength) {
    const sanitizedLabel = constructLabel(arrNumbers, numbersLength)
    console.log('hundred')
    return sanitizedLabel
}

function thousandTreat (rawNumber, arrNumbers, numbersLength) {
    const sanitizedLabel = constructLabel(arrNumbers, numbersLength)
    console.log('thousandTreat')
    return sanitizedLabel
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