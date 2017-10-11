import React from 'react';

export default class ErrorComponent extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  retryPromise()
  {
    // Use retry from props, in case you want to implement retry-able promise
    this.props.retry();
  }

  render()
  {
    // Add your render code here for the Error Component
    return (
      <div className="row">
        <h3>Problem loading the feed</h3>
        <button
          type="button"
          className="btn btn-warning"
          style={{
            marginRight: 10,
            marginTop: 10
          }}
          onClick={this.retryPromise.bind(this)}
        >
          Retry
        </button>
      </div>
    );
  }
}
