const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')


keys.addEventListener('click', e => {
 
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType
        if(!action){
            
            const resultString = createResultString(displayedNum, previousKeyType, keyContent)
            display.textContent = resultString

            if(previousKeyType === 'calculate')
            {
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
            }

            calculator.dataset.previousKeyType = 'number'
            console.log('number key!')
        }

        else if(action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide'){
            console.log('operator key!')
                const firstValue = calculator.dataset.firstValue
                const operator = calculator.dataset.operator
                const secondValue = displayedNum

                if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') //if first value and operator exsist
                {
                    const calcValue = calculate(firstValue, operator, secondValue)
                    display.textContent = calcValue
                    calculator.dataset.firstValue = calcValue
                }
                else{
                    calculator.dataset.firstValue = displayedNum
                }

                key.classList.add('is-depressed')
                calculator.dataset.previousKeyType = 'operator'
                calculator.dataset.operator = action
        }
        else if (action === 'decimal') {
            
            const resultString = createDecimalString(displayedNum, previousKeyType)

            display.textContent = resultString

            if(previousKeyType === 'calculate')
            {
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
            }
            calculator.dataset.previousKeyType = 'decimal'
        }
        else if (action === 'clear') {
            console.log('clear key!')
            if (key.textContent !== 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                key.textContent = 'AC'
            } else {
                key.textContent = 'AC'
            }
            display.textContent = 0    
            calculator.dataset.previousKeyType = 'clear'

        }
        else if (action === 'calculate') {
            console.log('equal key!')
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum
            if(firstValue){
                if(previousKeyType === 'calculate'){
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
    }
})

const createDecimalString = (displayedNum, previousKeyType) => {
    return previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
        ? '0.'
        : displayedNum + '.'
}
const createResultString = (displayedNum, previousKeyType, keyContent ) => {
    // Variables required are:
    // 1. keyContent
    // 2. displayedNum
    // 3. previousKeyType
    // 4. action
    return displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate' 
        ? keyContent
        : displayedNum + keyContent
}

const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
  
    if (operator === 'add') return firstNum + secondNum
    if (operator === 'subtract') return firstNum - secondNum
    if (operator === 'multiply') return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum  
  }