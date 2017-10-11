import React from "react";
import CurrencyConvert from "components/CurrencyConvert";
import CurrencyGraph from "components/CurrencyGraph";

export default class SuccessComponent extends React.Component {
  constructor(props) {
    super(props);
    this.conversionCurrencies = props.result[0].conversions.map(option => {
      return {
        title: option.currency,
        value: option.rate
      };
    });
  }

  render() {
    // this.props.result could be used to retrieve promise results
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">Currency Conversion</div>
          <div className="panel-body">
            <CurrencyConvert conversions={this.conversionCurrencies} />
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Currency Graph</div>
          <div className="panel-body">
            <CurrencyGraph currencyData={this.props.result} />
          </div>
        </div>
      </div>
    );
  }
}
