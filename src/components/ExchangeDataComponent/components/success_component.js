import React from "react";
import CurrencyConvert from "components/CurrencyConvert";

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
        <CurrencyConvert conversions={this.conversionCurrencies} />
      </div>
    );
  }
}
