import React,{Component}from "react";
import "./Calculator.css"
import Button from "../components/Button"
import Display from "../components/Display"

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component{


    constructor(props){
        super(props)
        this.state = {...initialState}
        this.clearMemory = this.clearMemory.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }
    
    clearMemory(){
        this.setState({...initialState})
    }

    setOperation(operation){
        if(this.state.current===0 && operation!=='='){
            this.setState({operation, current: 1, clearDisplay: true})
        }else {
            const equals = operation==='='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            switch (currentOperation) {
                case '+':
                    values[0] +=values[1]
                    values[1] = 0
                    break;
                case '-':
                    values[0] -=values[1]
                    values[1] = 0
                    break;
                case '*': 
                    values[0] *=values[1]
                    values[1] = 0
                    break;
                case '/':
                    values[0] /=values[1]
                    values[1] = 0
                    break;
                default:
                    console.log("[ERROR] Invalid Operation")
                    break;
            }
            this.setState({
                displayValue: values[0],
                operation : equals ? null : operation,
                current : equals ? 0 : 1,
                clearDisplay : !equals,
                values
            })
        }

    }
    
    addDigit(n){
        if(n === "." && this.state.displayValue.includes(".")){
            return
        }
        const clearDisplay = this.state.displayValue==="0"
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n;
        this.setState({displayValue, clearDisplay: false})

        if(n!='.'){
            const num = parseFloat(displayValue)
            const current = this.state.current
            const values = [...this.state.values]
            values[current] = num;
            this.setState({ values })
        }
    }
    
    render(){
        //const addDigit = n => this.addDigit(n);
        //const setOperation = op => this.setOperation(op)

        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button triple label="AC" click={this.clearMemory}/>
                <Button operation label="/" click={this.setOperation} />
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button operation label="*" click={this.setOperation}/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button operation label="-" click={this.setOperation}/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button operation label="+" click={this.setOperation}/>
                <Button double label="0" click={this.addDigit}/>
                <Button label="." click={this.addDigit}/>
                <Button operation label="=" click={this.setOperation}/>
            </div>
        )
    }
}