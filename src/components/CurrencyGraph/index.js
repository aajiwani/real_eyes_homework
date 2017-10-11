import React from "react";
import _ from "lodash";
import Rickshaw from "rickshaw";
import Dropdown from "components/Dropdown";
import moment from "moment";

export default class CurrencyGraph extends React.Component {
  constructor(props) {
    super(props);
    //currencyData
    console.dir(props);
    this.availableCurrencies = props.currencyData[0].conversions.map(option => {
      return {
        title: option.currency,
        value: option.currency
      };
    });

    this.currencyChange = this.currencyChange.bind(this);
  }

  currencyChange(title, value) {
    var graphData = this.props.currencyData.map((tupple) => {
      return {
        x: moment(tupple.time).unix(),
        y: _.find(tupple.conversions, (currTup) => _.isEqual(currTup.currency, value)).rate
      }
    });

    document.querySelector("#chart").innerHTML = "";
    document.querySelector("#legend").innerHTML = "";

    var graph = new Rickshaw.Graph({
      element: document.querySelector("#chart"),
      width: 700,
      height: 200,
      renderer: 'line',
      series: [{
        color: '#c05020',
        data: _.sortBy(graphData, "x"),
        name: value,
        strokeWidth: 5,
        opacity: 1.0
      }]
    });

    var hoverDetail = new Rickshaw.Graph.HoverDetail({
      graph: graph
    });
    var legend = new Rickshaw.Graph.Legend({
      graph: graph,
      element: document.getElementById('legend')
    });
    var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
      graph: graph,
      legend: legend
    });

    var axes = new Rickshaw.Graph.Axis.Time({ graph: graph });

    graph.render();
    axes.render();
  }

  render() {
    return (
      <div>
        <div className="row pull-right" style={{
          margin: 10
        }}>
          <Dropdown
            title="Select Currency"
            options={this.availableCurrencies}
            onClick={this.currencyChange}
          />
        </div>
        <div className="row">
          <div id="chart_container">
            <div id="chart"></div>
            <div id="legend_container">
              <div id="smoother" title="Smoothing"></div>
              <div id="legend"></div>
            </div>
            <div id="slider"></div>
          </div>
        </div>
      </div>
    )
  }
}