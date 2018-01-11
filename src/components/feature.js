import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Feature extends Component {

  componentWillMount() {
    this.props.fetchMessage()
  }

  render() {
    return (
      <div className="feature">
      <strong className="display-4">Great! you have been redirected to a secure url. </strong>
      <p className="lead">This is a message from the authentication server:</p>
      <p className="lead">{ this.props.message}</p>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { message: auth.message }
}
export default connect(mapStateToProps, actions)(Feature)
