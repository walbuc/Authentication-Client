import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class SingOut extends Component {

  componentWillMount() {
    this.props.signOutUser()
  }

  render() {
    return (
      <div className="sign-out">
        <div className="display-4">See you later!!!</div>
      </div>
    )
  }
}

export default connect(null, actions)(SingOut)
