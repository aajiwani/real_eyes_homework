import React from "react";
import _ from "lodash";
import Dropdown from "components/Dropdown";

export default class CurrencyConvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      convertFrom: 0,
      convertTo: 0,
      convertFromCurrency: null,
      convertToCurrency: null
    };
    this.handleChangeConvertFrom = this.handleChangeConvertFrom.bind(this);
    this.handleChangeConvertTo = this.handleChangeConvertTo.bind(this);
    this.drpDnFromClick = this.drpDnFromClick.bind(this);
    this.drpDnToClick = this.drpDnToClick.bind(this);
    this.allowDigitsOnly = this.allowDigitsOnly.bind(this);
  }

  allowDigitsOnly(event)
  {
    return event.charCode >= 48 && event.charCode <= 57;
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

  handleChangeConvertTo() {
    this.setState({ convertTo: event.target.value });
  }

  render() {
    return (
      <div className="row">
        <div
          className="col-md-5"
          style={{
            backgroundColor: "yellow"
          }}
        >
          <div className="row">
            <p>Convert From</p>
            <input
              type="text"
              value={this.state.convertFrom}
              onChange={this.handleChangeConvertFrom}
              onKeyPress={this.allowDigitsOnly}
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
            backgroundColor: "pink"
          }}
        >
          <div className="row">
            <p>Convert To</p>
            <input
              type="text"
              value={this.state.convertTo}
              onChange={this.handleChangeConvertTo}
              onKeyPress={this.allowDigitsOnly}
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
            backgroundColor: "aqua"
          }}
        >
          <button
            type="button"
            className="btn btn-info"
            style={{
              marginRight: 10,
              marginTop: 10
            }}
          >
            Convert
          </button>
        </div>
      </div>
    );
  }
}
