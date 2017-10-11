import React from "react";
import ReactPromisedComponent from "react-promised-component";
import LoadingComponent from "./components/loading_component.js";
import ErrorComponent from "./components/error_component.js";
import SuccessComponent from "./components/success_component.js";

var Promise = require("bluebird");
import xml2js from "xml2js";
import xpath from "xml2js-xpath";
let xml2jsParseString = Promise.promisify(xml2js.parseString);

const EXCHANGE_URL =
  "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml";
const PUBLIC_CORS = "https://cors-anywhere.herokuapp.com/";

var PromisedReactComponent = ReactPromisedComponent(
  "promise_name",
  LoadingComponent,
  ErrorComponent,
  SuccessComponent
);

export default class PromisedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.scrInst = null;
  }

  // Promise creator method
  promiseGenerator(params) {
    return fetch(params.url)
      .then(response => response.text())
      .then(body =>
        xml2jsParseString(body).then(json => {
          var matches = xpath.find(json, "//Cube/Cube");

          return _.map(matches, value => {
            return {
              time: value.$.time,
              conversions: _.map(value.Cube, val2 => {
                return {
                  currency: val2.$.currency,
                  rate: parseFloat(val2.$.rate)
                };
              })
            };
          });
        })
      );
  }

  // Method to supply parameters to promise method
  promiseParams() {
    return {
      url: PUBLIC_CORS + EXCHANGE_URL
    };
  }

  reloadData()
  {
    this.scrInst.retryPromise();
  }

  render() {
    return (
      <PromisedReactComponent
        promise_name={this.promiseGenerator.bind(this)}
        promise_name_params={this.promiseParams.bind(this)}
        ref={inst => (this.scrInst = inst)}
      />
    );
  }
}
