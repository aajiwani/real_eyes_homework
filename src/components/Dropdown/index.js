import React from "react";
import _ from "lodash";

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      selVal: -1,
      selText: -1
    };
  }

  onItemClick(title, value) {
    this.setState({
      title: title,
      selVal: value,
      selText: title
    });

    if (this.props.onClick) this.props.onClick(title, value);
  }

  get SelectedValue() {
    return this.state.selVal;
  }

  get SelectedText() {
    return this.state.selText;
  }

  render() {
    return (
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
        >
          {this.state.title}
          <span className="caret" />
        </button>
        <ul className="dropdown-menu">
          {this.props.options.map(val => {
            return (
              <li key={val.title}>
                <a
                  href="#"
                  onClick={() => this.onItemClick(val.title, val.value)}
                >
                  {val.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
