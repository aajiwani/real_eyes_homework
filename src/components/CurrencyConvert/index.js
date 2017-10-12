import React from "react";
import _ from "lodash";
import Dropdown from "components/Dropdown";

export default class CurrencyConvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      convertFrom: 0,
      convertFromCurrency: null,
      convertToCurrency: null
    };
    this.handleChangeConvertFrom = this.handleChangeConvertFrom.bind(this);
    this.drpDnFromClick = this.drpDnFromClick.bind(this);
    this.drpDnToClick = this.drpDnToClick.bind(this);
    this.allowDigitsOnly = this.allowDigitsOnly.bind(this);
  }

  allowDigitsOnly(controlName, event) {
    let val = (event.target.validity.valid) ? event.target.value : null;

    if (_.isEqual(controlName, "convertTo")) {
      if (val !== null) {
        this.setState({
          convertTo: val
        })
      }
    }
    else if (_.isEqual(controlName, "convertFrom")) {
      if (val !== null) {
        this.setState({
          convertFrom: val
        })
      }
    }
  }

  drpDnFromClick(title, value) {
    this.setState({
      convertFromCurrency: {
        title: title,
        rate: value
      }
    });
  }

  drpDnToClick(title, value) {
    this.setState({
      convertToCurrency: {
        title: title,
        rate: value
      }
    });
  }

  handleChangeConvertFrom() {
    this.setState({ convertFrom: event.target.value });
  }

  convertCurrencies() {
    if (_.isEmpty(this.state.convertFromCurrency) ||
      _.isEmpty(this.state.convertToCurrency)) {
      alert("Please make sure currencies are properly selected");
    }
    else {
      var fromToEUR = 1 / this.state.convertFromCurrency.rate;
      var totalEur = fromToEUR * this.state.convertFrom;

      this.setState({
        convertTo: totalEur * this.state.convertToCurrency.rate
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div
          className="col-md-5"
          style={{
            backgroundColor: "transparent"
          }}
        >
          <div className="col-md-offset-5">
            <p>Convert From</p>
            <input
              type="text"
              value={this.state.convertFrom}
              pattern="[0-9]+\.{0,1}[0-9]*"
              onInput={(event) => this.allowDigitsOnly('convertFrom', event)}
            />
            <Dropdown
              title="Select Currency"
              options={this.props.conversions}
              onClick={this.drpDnFromClick}
            />
          </div>
        </div>
        <div
          className="col-md-5"
          style={{
            backgroundColor: "transparent"
          }}
        >
          <div className="col-md-offset-5">
            <p>Convert To</p>
            <input
              type="text"
              value={this.state.convertTo}
              disabled={true}
            />
            <Dropdown
              title="Select Currency"
              options={this.props.conversions}
              onClick={this.drpDnToClick}
            />
          </div>
        </div>
        <div
          className="col-md-2"
          style={{
            backgroundColor: "transparent"
          }}
        >
          <button
            type="button"
            className="btn btn-info"
            style={{
              marginRight: 10,
              marginTop: 10
            }}
            onClick={() => this.convertCurrencies()}
          >
            Convert
          </button>
        </div>
      </div>
    );
  }
}
