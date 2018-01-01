var React = require('react');
var Loader = require('halogen/PulseLoader');

class CalculatorApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loan_value: 0,
      interest_rate: 0,
      loan_term: 1,
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
        const monthly_payment = parseInt(principal * ( (monthly_interest_rate * Math.pow(1 + monthly_interest_rate, monthly_loan_term) ) /
                                        (Math.pow(1 + monthly_interest_rate, monthly_loan_term) - 1)
                                      ));
        // 4) Get the total interest
        const total_interest = (monthly_payment * (monthly_loan_term)) - principal;

        const orig_total_payments = principal + total_interest;
        const interest_eliminated = parseInt(0.45 * total_interest);
        const updated_interest = total_interest - interest_eliminated;
        const updated_total_payments = principal + updated_interest;
        _this.setState({principal, total_interest, orig_total_payments, interest_eliminated, updated_interest, updated_total_payments, monthly_payment})

        _this.setState({calculated: true, calculating: false})

      }, 1500)
    }
  }

  render() {
    return (
      <div className="container" style={{display: 'flex', height: '100vh', width: '100%', justifyContent: 'center', marginTop: 50}}>
        <div style={{display: 'flex', flexDirection: 'column',  width: '100%'}}>
          <div style={{display: 'flex', width: '100%'}}>
            <form className="form-inline" style={{width: '100%', justifyContent: 'space-evenly'}}>
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
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="4">4 Years</option>
                  <option value="5">5 Years</option>
                  <option value="6">6 Years</option>
                  <option value="7">7 Years</option>
                  <option value="8">8 Years</option>
                  <option value="9">9 Years</option>
                  <option value="10">10 Years</option>
                  <option value="11">11 Years</option>
                  <option value="12">12 Years</option>
                  <option value="13">13 Years</option>
                  <option value="14">14 Years</option>
                  <option value="15">15 Years</option>
                  <option value="16">16 Years</option>
                  <option value="17">17 Years</option>
                  <option value="18">18 Years</option>
                  <option value="19">19 Years</option>
                  <option value="20">20 Years</option>
                  <option value="21">21 Years</option>
                  <option value="22">22 Years</option>
                  <option value="23">23 Years</option>
                  <option value="24">24 Years</option>
                  <option value="25">25 Years</option>
                  <option value="26">26 Years</option>
                  <option value="27">27 Years</option>
                  <option value="28">28 Years</option>
                  <option value="29">29 Years</option>
                  <option value="30">30 Years</option>
                  <option value="31">31 Years</option>
                  <option value="32">32 Years</option>
                  <option value="33">33 Years</option>
                  <option value="34">34 Years</option>
                  <option value="35">35 Years</option>
                  <option value="36">36 Years</option>
                  <option value="38">37 Years</option>
                  <option value="39">39 Years</option>
                  <option value="40">40 Years</option>
                  <option value="41">41 Years</option>
                  <option value="42">42 Years</option>
                  <option value="43">43 Years</option>
                  <option value="44">44 Years</option>
                  <option value="45">45 Years</option>
                  <option value="46">46 Years</option>
                  <option value="47">47 Years</option>
                  <option value="48">48 Years</option>
                  <option value="49">49 Years</option>
                  <option value="50">50 Years</option>
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
          {this.state.calculated ? <div style={{marginTop: 15}}>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Principal
                <span className="badge badge-primary badge-pill">${this.state.principal}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Interest
                <span className="badge badge-info badge-pill">${this.state.total_interest}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Total Payments
                <span className="badge badge-success badge-pill">${this.state.orig_total_payments}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Interest Eliminated
                <span className="badge badge-danger badge-pill">${this.state.interest_eliminated}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                New Interest Amount
                <span className="badge badge-info badge-pill">${this.state.updated_interest}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Monthly Payment
                <span className="badge badge-success badge-pill">${this.state.monthly_payment}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                New Total Payments
                <span className="badge badge-success badge-pill">${this.state.updated_total_payments}</span>
              </li>
            </ul>

          </div>: <div></div>}
          {this.state.calculating
            ?<div style={{alignSelf: 'center', marginTop: 15}}><Loader color="#26A65B" size="16px" margin="4px"/></div>

            : <div style={{alignSelf: 'center', marginTop: 15}}>
              <button onClick={() => this.waitCalculate()} type="submit" className="btn btn-warning mb-2">Calculate</button>
            </div>
          }
        </div>
      </div>
    );
  }
}

module.exports = CalculatorApp;
