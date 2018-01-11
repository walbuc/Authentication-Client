import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions'
import { connect } from 'react-redux';

class SignIn extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signin">
        <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
          <fieldset className="form-group">
            <Field label="Email" name="email" type="text" component={ this.renderField }/>
          </fieldset>
          <fieldset className="form-group">
            <Field label="Password" name="password" type="password" component={ this.renderField } />
          </fieldset>
          { this.renderError() }
          <button action="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    )
  }

  renderField(field) {
    const { meta: { touched, error} } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={ className }>
        <label>{ field.label }</label>
        <input className="form-control"
          type={ field.type }
          {...field.input}
        />
        <div className="text-help">
        { touched ? error : '' }
        </div>
      </div>
    )
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
         <strong>Oops!</strong> { this.props.errorMessage }
        </div>
      )
    }
  }

 handleFormSubmit({email, password}) {
   this.props.signinUser({email, password})
  }
}

function mapStateToProps({ auth }) {
  return { errorMessage: auth.error }
}

function validate() {

}
export default reduxForm(
  {
    form: 'signin',
    fields: ['email', 'password']
  }
)(
  connect(mapStateToProps, actions)(SignIn)
)
