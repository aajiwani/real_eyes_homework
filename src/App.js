import React from "react";
import ExchangeDataComponent from "components/ExchangeDataComponent";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.dataExchange = null;
    this.reloadData = this.reloadData.bind(this);
  }

  reloadData() {
    this.dataExchange.reloadData();
  }

  render() {
    return (
      <div>
        <div className="row">
          <button
            type="button"
            className="btn btn-info pull-right"
            style={{
              margin: 10
            }}
            onClick={this.reloadData}
          >
            Reload data
        </button>
        </div>
        <div className="container">
          <ExchangeDataComponent ref={inst => (this.dataExchange = inst)} />
        </div>
      </div>
    );
  }
}
