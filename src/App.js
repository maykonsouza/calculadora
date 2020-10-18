import React, {Component} from 'react';
import './App.css';




function Display(props) {
  return (
    <div className="App">
      <p>{props.value}</p>
    </div>   
  );
}

function Button(props) {
  return (
    <button onClick={props.aoClicar}>{props.text}</button>
  );
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentOperand: "",
      previousOperand: "",
      display: "",
      operation: "",
      result: "",
      mem: [],
    };
    this.addNumber = this.addNumber.bind(this);
    this.handleAc = this.handleAc.bind(this);
    this.handleEle = this.handleEle.bind(this);
    this.handleEval = this.handleEval.bind(this);
    this.handleNum = this.handleNum.bind(this);
    this.handleOpe = this.handleOpe.bind(this);
    this.handleEvalPar = this.handleEvalPar.bind(this);
  }

  

  addNumber(number) {
    this.setState(state => {
        return{
          currentOperand: state.currentOperand + number,
        };        
      }
    );
  }

  handleAc() {
    this.setState(state => {
      return{          
        display: "0",
        previousOperand: "",
        currentOperand: "",
        result: "", 
        };        
    });
  }


  


  handleNum(number) {
    if(this.state.result === ""){
    this.setState(state => {
        return{
          currentOperand: state.currentOperand + number,
          display: state.currentOperand + number,
        };        
      }
    );}
    else{
      this.setState(state => {
        return{
          currentOperand: number,
          display: number,
        };
      });
    }
  }

  handleOpe(ope) {
    if(this.state.previousOperand !== ""){
      this.setState(state => {
        return{          
          operation: ope,
        };        
      })
      this.handleEvalPar();
    }
    else{
      this.setState(state => {
        return{ 
          previousOperand: state.currentOperand,
          currentOperand: "",          
          operation: ope,
        };        
      })
    }

    

    // if(this.state.result === ""){
    //   this.setState(state => {
    //     return{ 
    //       previousOperand: state.currentOperand,
    //       currentOperand: "",          
    //       operation: ope,
    //     };        
    //   })
    // }
    //   else{
    //     this.setState(state => {
    //       return{        
    //         operation: ope,
    //       };
    //     });        
    //   }        


  }
    
  

  handleEle(input) {
    this.setState(state => {
        return{
          currentOperand: state.currentOperand ,
        };        
      }
    );
  }

  handleEval() {
    let c = "";
    let p = "";

    if(this.state.currentOperand === ""){
      c = parseFloat(this.state.previousOperand);
      p = parseFloat(this.state.result);

      // this.setState(state => {
      //   return{           
      //     currentOperand: state.previousOperand,
      //     previousOperand: state.result,          
      //   };        
      // })
    }

    else{
      c = parseFloat(this.state.currentOperand);
      p = parseFloat(this.state.previousOperand);        
    } 

    
    let rlt = "";

    switch(this.state.operation){
      case "+":
        rlt = p + c;
      break;
  
      case "-":
        rlt = p - c;
      break;
        
      case "x":
        rlt = p * c;
      break;
  
      case "÷":
        rlt = p / c;
      break;
  
      default:
        rlt = p;
      };
    if(isNaN(rlt)){
      this.setState(state => {
        return{          
          result: "",
          display: "",
          previousOperand: "",
          currentOperand: "", 
          };        
      }); 
    }
    else{
      this.setState(state => {
        return{          
          result: rlt,
          display: rlt,
          previousOperand: "",
          currentOperand: "", 
        };        
      }
    );
  }


    }



    handleEvalPar() {
      let c = "";
      let p = "";
      let rlt = "";
      if(this.state.result !== ""){
        c = parseFloat(this.state.currentOperand);
        p = parseFloat(this.state.result);
      }  
      else{
        c = parseFloat(this.state.currentOperand);
        p = parseFloat(this.state.previousOperand);        
      } 
  
      switch(this.state.operation){
        case "+":
          rlt = p + c;
        break;
    
        case "-":
          rlt = p - c;
        break;
          
        case "x":
          rlt = p * c;
        break;
    
        case "÷":
          rlt = p / c;
        break;
    
        default:
          rlt = p;
        };
      if(isNaN(rlt)){
        this.setState(state => {
          return{          
            result: "",
            display: "",
            previousOperand: "",
            currentOperand: "", 
            };        
        }); 
      }
      else{
        this.setState(state => {
          return{          
            result: rlt,
            display: rlt,
          };        
        }
      );
    }

  }

  handleMem(value) {
    if(value === "MC"){
    this.setState(state => {
        return{
          mem: [],
          display: "0",
          currentOperand: "",
        };        
      }
    );}
    else if(value === "MR"){
      let e = this.state.mem.pop();
      this.setState(state => {
          return{
            currentOperand: e,
            display: e,          
          };        
        }
      );}
      else if(value === "MS"){
        this.state.mem.push(this.state.result)
      }
      else if(value === "M+"){
        let m = parseFloat(this.state.mem.pop()) + parseFloat(this.state.currentOperand);
        this.forceUpdate();
        this.state.mem.push(m)          
        }
  }

  

    

  render(){
  return (
    <div className="Calc">

      <div className="linha1">
        <Display value={this.state.display}/>
      </div>

      

      <div className="linha3">
        <Button text="7" aoClicar={() => this.handleNum("7")}/>
        <Button text="8" aoClicar={() => this.handleNum("8")}/>
        <Button text="9" aoClicar={() => this.handleNum("9")}/>
        <Button text="÷" aoClicar={() => this.handleOpe("÷")}/>
      </div>

      <div className="linha4">
        <Button text="4" aoClicar={() => this.handleNum("4")}/>
        <Button text="5" aoClicar={() => this.handleNum("5")}/>
        <Button text="6" aoClicar={() => this.handleNum("6")}/>      
        <Button text="x" aoClicar={() => this.handleOpe("x")}/>
      </div>

      <div className="linha5">
      <Button text="1" aoClicar={() => this.handleNum("1")}/>
      <Button text="2" aoClicar={() => this.handleNum("2")}/>
      <Button text="3" aoClicar={() => this.handleNum("3")}/>      
      <Button text="-" aoClicar={() => this.handleOpe("-")}/>
      </div>

      <div className="linha6">
      <Button text="AC" aoClicar={() => this.handleAc()}/>      
      <Button text="0" aoClicar={() => this.handleNum("0")}/>
      <Button text="." aoClicar={() => this.handleNum(".")}/>
      <Button text="+" aoClicar={() => this.handleOpe("+")}/>
      </div>

      <div className="linha7">
      <Button text="=" aoClicar={() => this.handleEval()}/>
      </div>
    </div>   
    );
  }
}

export default App;
