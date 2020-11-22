const NumbersEnum = require('./NumbersEnum')

function sanitizeNumber (rawNumber) {
    if (NumbersEnum[rawNumber]) {
        return NumbersEnum[rawNumber]
    }

    const arrNumbers = rawNumber.split('')
    const numbersLength = arrNumbers.length
    const treatment = selectTreatment(numbersLength)
    return treatment(arrNumbers)
}

function selectTreatment (numbersLength) {
    const treats = {
        2: constructLabel,
        3: constructLabel,
        4: thousandTreat,
        5: tenThousandTreat
    }

    return treats[numbersLength]
}

function thousandTreat (arrNumbers) {
    const thousandLabel = treatThousandLabel(arrNumbers, 1)
    arrNumbers.shift()
    const useConnector = arrNumbers[0] !== '0'
    const connector = useConnector ? ' e ' : ' '
    const hundredLabel = constructLabel(arrNumbers)
    const treatedLabel = `${thousandLabel}${connector}${hundredLabel}`
    return treatedLabel.trim()
}

function getThousandLabel (tenThousandNumber, arrThousand) {
    const labelFromEnum = NumbersEnum[tenThousandNumber]
    if (labelFromEnum) {
        return labelFromEnum
    }
    return constructLabel(arrThousand)
}

function treatThousandLabel (arrNumbers, thousandLength) {
    const arrThousand = arrNumbers.slice(0, thousandLength)
    const tenThousandNumber = arrThousand.join().replace(/,/g, '')
    const tenThousandLabel = getThousandLabel(tenThousandNumber, arrThousand)
    return tenThousandNumber > 1 ? `${tenThousandLabel} mil` : 'mil'
}

function tenThousandTreat (arrNumbers) {
    const thousandLabel = treatThousandLabel(arrNumbers, 2)
    console.log('thousandLabel', thousandLabel)
    const hundredLabel = constructLabel(arrNumbers.slice(2))
    const treatedLabel = `${thousandLabel} ${hundredLabel}`
    return treatedLabel.trim()
}

function constructLabel (arrNumbers) {
    const isAllNumbersZero = arrNumbers.every(element => element === '0')
    console.log('arrNumbers', arrNumbers)
    if (isAllNumbersZero) {
        return ''
    }

    const numbersLength = arrNumbers.length
    const arrLabels = arrNumbers.map((number, index) => {
        const elementPosition = index + 1
        const rangeFromLength = numbersLength - elementPosition
        const exponent = Math.pow(10, rangeFromLength)
        return NumbersEnum[number * exponent]
    })

    const fullLabel = arrLabels.join()
    const formatedLabel = fullLabel.replace(/,+/g, ' e ')
    return formatedLabel.trim()
}

module.exports = sanitizeNumber