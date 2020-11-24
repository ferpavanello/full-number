const NumbersEnum = require('./NumbersEnum')

/**
 * Sanitizes received param from API and returns full number label
 * @param { String } rawNumber - Param from API
 * @returns { String } full number label
 */
function sanitizeNumber (rawNumber) {
    const operator = rawNumber.charAt(0) === '-' ? 'menos ' : ''
    if (operator) {
        rawNumber = rawNumber.slice(1)
    }

    rawNumber = formatRamNumber(rawNumber)

    if (NumbersEnum[rawNumber]) {
        return `${operator}${NumbersEnum[rawNumber]}`
    }

    if (rawNumber === '0') {
        return 'zero'
    }

    const arrNumbers = rawNumber.split('')
    const numbersLength = arrNumbers.length
    const treatment = selectTreatment(numbersLength)
    const fullNumber = treatment(arrNumbers,  numbersLength)
    return `${operator}${fullNumber}`
}

/**
 * Formats / cleans number to remove unnecessary characteres
 * @param { String } rawNumber API number
 * @returns { String } formated number
 */
function formatRamNumber (rawNumber) {
    const noSpaceNumber = rawNumber.trim()
    const noPlusOperator = noSpaceNumber.replace(/\+/, '')
    const noUnecessaryZeros = removeUnnecessaryZeros(noPlusOperator)
    const noDotsZeros = noUnecessaryZeros.replace(/\.0+/g, '')
    return noDotsZeros
}

/**
 * Removes unnecessary zeros from number
 * @param { String } numberParam raw number
 * @returns { String } no zeros number
 */
function removeUnnecessaryZeros (numberParam) {
    const zeroMatchs = numberParam.match(/^0+(\d+)/, '') || []
    return zeroMatchs[1] || numberParam
}

/**
 * Select treatment to use at API param
 * @param { Number } numbersLength - Numbers array size
 * @returns { Function } treatment
 */
function selectTreatment (numbersLength) {
    const treats = {
        2: constructLabel,
        3: constructLabel,
        4: mountThousandLabel,
        5: mountThousandLabel
    }

    return treats[numbersLength]
}

/**
 * Mounts label when API param is about thousand and ten thounsand
 * @param { String[] } arrNumbers - Array from API number
 * @param { Number } numbersLength - Numbers array size
 * @returns { String } full number label
 */
function mountThousandLabel (arrNumbers, numbersLength) {
    const startHundred = numbersLength - 3
    const thousandLabel = treatThousandLabel(arrNumbers, startHundred)
    const useConnector = arrNumbers[startHundred] !== '0'
    const connector = useConnector ? ' e ' : ' '
    const hundredLabel = constructLabel(arrNumbers.slice(startHundred))
    const treatedLabel = `${thousandLabel}${connector}${hundredLabel}`
    return treatedLabel.trim()
}

/**
 * Gets thousand part from thousand number
 * @param { String } tenThousandNumber - thousand part number
 * @param { String[] } arrThousand - Array of thousand part 
 * @returns { String } thousand part
 */
function getThousandLabel (tenThousandNumber, arrThousand) {
    const labelFromEnum = NumbersEnum[tenThousandNumber]
    if (labelFromEnum) {
        return labelFromEnum
    }
    return constructLabel(arrThousand)
}

/**
 * Formats thousand part label
 * @param { String[] } arrNumbers - Array from API number
 * @param { Number } thousandLength - Thousando numbers size
 * @returns { String } thousand part label
 */
function treatThousandLabel (arrNumbers, thousandLength) {
    const arrThousand = arrNumbers.slice(0, thousandLength)
    const tenThousandNumber = arrThousand.join().replace(/,/g, '')
    const tenThousandLabel = getThousandLabel(tenThousandNumber, arrThousand)
    return tenThousandNumber > 1 ? `${tenThousandLabel} mil` : 'mil'
}

/**
 * Constructs label from number array received
 * @param { String[] } arrNumbers - Number array
 * @returns { String } formated number label
 */
function constructLabel (arrNumbers) {
    const isAllNumbersZero = arrNumbers.every(element => element === '0')
    if (isAllNumbersZero) {
        return ''
    }

    const numbersLength = arrNumbers.length
    const rawNumber = arrNumbers.join().replace(/,/g, '')
    const tenRawNumber = rawNumber.slice(1)
    const tenRawEnum = NumbersEnum[tenRawNumber]
    if (numbersLength === 3 && (arrNumbers[0] === '1' || tenRawEnum)) {
        return tenHundredSpecificTreats(arrNumbers, tenRawEnum)
    }

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

/**
 * Mounts number label treating specific cases of ten hundred number
 * When number one is requested
 * When ten number part is founded at enum
 * @param { String[] } arrNumbers - Array from hundred number part
 * @param { String } tenRawEnum hundred label from NumbersEnum
 * @returns { String } formated number label
 */
function tenHundredSpecificTreats (arrNumbers, tenRawEnum) {
    const tenLabel = tenRawEnum ? tenRawEnum : constructLabel(arrNumbers.slice(1))

    const hundredLabel = arrNumbers[0] !== '0' ? NumbersEnum[`${arrNumbers[0]}00`] : '' 
    const hundredTreated = arrNumbers[0] === '1' ? 'cento' : hundredLabel

    const fullLabel = `${hundredTreated} e ${tenLabel}`
    const formatedLabel = fullLabel.replace(' e e', ' e')
    return formatedLabel.trim()
}

module.exports = sanitizeNumber