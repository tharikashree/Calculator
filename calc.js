//getting the html elements
const expText =document.querySelector('[expEl]');
const resText = document.querySelector('[resEl]');
const aClear = document.querySelector('[allClear]');
const del = document.querySelector('[del]');
const opr = document.querySelectorAll('[op]');
const num = document.querySelectorAll('[num]');
const eq = document.querySelector('[eq]');

//creating a calculator class with various methods
class Calculator{
    constructor(expText,resText){
        this.expText=expText;
        this.resText=resText;
        this.clear();
    }
    clear(){
        this.expr = '';
        this.res = '';
        this.operation=undefined;
    }
    chooseOperation(operation){
        if (this.res == '') return;
        if (this.expr !== '') {
            this.compute();
        }
        this.operation=operation;
        this.expr=this.res;
        this.res='';
    }
    compute(){
        let result;
        const a = parseFloat(this.expr);
        const b = parseFloat(this.res);
        if(isNaN(a) || isNaN(b)) return;
        switch(this.operation){
            case '+':
                result=a+b;
                break;
            case '-':
                result=a-b;
                break;
            case 'x':
                result = a * b;
                break;
            case '÷':
                if(b!==0){result = a/b;}
                break;
            case '%':
                result = a % b;
                break;
            default:
                return;
        }
        this.res=result;
        this.operation=undefined;
        this.expr='';
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
    delete(){
        this.res=this.res.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number=='.' && this.res.includes('.')) return;
        this.res= this.res.toString()+ number.toString();
    }
    updateDisplay() {
        this.resText.innerText =
            this.getDisplayNumber(this.res)
        if (this.operation != null) {
            this.expText.innerText =
                `${this.getDisplayNumber(this.expr)} ${this.operation}`
        } else {
            this.expText.innerText = ''
        }
    }
}

//calculator object
const calculator=new Calculator(expText,resText);
//adding event listeners to each of the buttons
num.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
opr.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
eq.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
}
)
aClear.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
}
)
del.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
}
)