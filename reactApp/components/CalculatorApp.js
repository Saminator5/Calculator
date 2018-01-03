var React = require('react');
var Loader = require('halogen/PulseLoader');

class CalculatorApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loan_value: 0,
      interest_rate: 0,
      loan_term: 15,
      calculated: false,
      calculating: false
    };
  }

  homeValue(event){
    this.setState({loan_value: parseInt(event.target.value.replace (',', ""))})
  }

  interestRate(event){
    this.setState({interest_rate: event.target.value})
  }

  loanTerm(event){
    console.log('loan changed: ', event.target.value)
    this.setState({loan_term: parseInt(event.target.value)})
  }

  waitCalculate(){
    this.setState({
      calculating: true
    })

    const _this = this;

    if(!this.state.interest_rate || !this.state.loan_value){
      alert('Please make sure all fields are filled in!')
      this.setState({calculating: false})
    }  else {
      setTimeout(function(){
        // do your calculations here
        console.log('state: ', _this.state)
        const principal = _this.state.loan_value;
        const loan_term = _this.state.loan_term;
        const monthly_loan_term = loan_term * 12;
        // to convert the percentage to a number * 0.01
        const interest_rate_converted = _this.state.interest_rate * 0.01;

        // Get the interest
        // 1) Get the monthly interest rate
        const monthly_interest_rate = interest_rate_converted / 12;
        // 2) Input info into equation for monthly payment
        const orig_monthly_payment = parseInt(principal * ( (monthly_interest_rate * Math.pow(1 + monthly_interest_rate, monthly_loan_term) ) /
        (Math.pow(1 + monthly_interest_rate, monthly_loan_term) - 1)
      ));
      // 4) Get the total interest
      const total_interest = (orig_monthly_payment * (monthly_loan_term)) - principal;

      const orig_total_payments = principal + total_interest;
      const interest_eliminated = parseInt(0.45 * total_interest);
      const updated_interest = total_interest - interest_eliminated;
      const updated_total_payments = principal + updated_interest;
      _this.setState({principal, total_interest, orig_total_payments, interest_eliminated, updated_interest, updated_total_payments})

      _this.setState({calculated: true, calculating: false})

    }, 1500)
  }
}

render() {
  return (
    <div className="container" style={{display: 'flex', height: '100vh', width: '100%', justifyContent: 'center', marginTop: 50}}>
      <div style={{display: 'flex', flexDirection: 'column',  width: '100%'}}>
        <div style={{display: 'flex', width: '100%'}}>
          <form className="form-inline" style={{display: 'flex', width: '100%', justifyContent: 'space-evenly'}}>
            <div className="input-group mb-2 mr-sm-2" style={{display: 'flex', flexDirection: 'column'}}>
              <div>
                <label htmlFor="home-value">Loan Amount</label>
              </div>
              <div className="input-group-prepend">
                <div className="input-group-text">$</div>
                <input type="text" className="form-control" id="home-value" placeholder="0" onChange={this.homeValue.bind(this)}/>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="loan-term">Loan Term</label>
              </div>
              <select onChange={this.loanTerm.bind(this)} id="loan-term" className="form-control form-control-md">
                <option value="15">15 Years</option>
                <option value="30">30 Years</option>
              </select>
            </div>

            <div className="input-group mb-2 mr-sm-2" style={{display: 'flex', flexDirection: 'column'}}>
              <div>
                <label htmlFor="interest-rate">Interest Rate</label>
              </div>
              <div className="input-group-prepend">
                <input type="text" className="form-control" id="interest-rate" placeholder="0.00" onChange={this.interestRate.bind(this)}/>
                <div className="input-group-text">%</div>
              </div>
            </div>
          </form>
        </div>
        {this.state.calculated ? <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', flex: 1, justifyContent: 'center', marginTop: 10}}>
            <div style={{display: 'flex', flex: 1/2}}>
              <ul className="list-group" style={{fontSize: 20, flex: 1, marginRight: 5}}>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Principal
                  <span className="badge badge-info badge-pill">${this.state.loan_value}</span>
                </li>
              </ul>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', marginTop: 15, justifyContent: 'space-evenly'}}>
            <ul className="list-group" style={{fontSize: 20, flex: 1, marginRight: 5}}>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Initial Interest
                <span className="badge badge-info badge-pill">${this.state.total_interest}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Original Total Payments
                <span className="badge badge-success badge-pill">${this.state.orig_total_payments}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Years To Pay
                <span className="badge badge-secondary badge-pill">{this.state.loan_term}</span>
              </li>
            </ul>
            <ul className="list-group" style={{fontSize: 20, flex: 1}}>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Interest Eliminated
                <span className="badge badge-danger badge-pill">${this.state.interest_eliminated}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                New Total Payments
                <span className="badge badge-success badge-pill">${this.state.updated_total_payments}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Years To Pay
                <span className="badge badge-secondary badge-pill">{this.state.loan_term / 2}</span>
              </li>
            </ul>
          </div> </div>: <div></div>}
          {this.state.calculating
            ?<div style={{alignSelf: 'center', marginTop: 15}}><Loader color="#26A65B" size="16px" margin="4px"/></div>

            : <div style={{alignSelf: 'center', marginTop: 15}}>
              <button onClick={() => this.waitCalculate()} type="submit" className="btn btn-warning mb-2" style={{color: 'white'}}>Xcelerator Estimate</button>
            </div>
          }
        </div>
      </div>
    );
  }
}

module.exports = CalculatorApp;
