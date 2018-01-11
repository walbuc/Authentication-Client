import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions'
import { connect } from 'react-redux';
console.log(actions)

class SignUp extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signup">
        <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
          <fieldset className="form-group">
            <Field label="Email" name="email" type="text" component={ this.renderField }/>
          </fieldset>
          <fieldset className="form-group">
            <Field label="Password" name="password" type="password" component={ this.renderField } />
          </fieldset>
          <fieldset className="form-group">
            <Field label="Password" name="passwordConfirm" type="password" component={ this.renderField } />
          </fieldset>
          { this.renderAlert() }
          <button action="submit" className="btn btn-primary">Sign Up</button>
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
        <div className="form-control-feedback">
        { touched ? error : '' }
        </div>
      </div>
    )
  }

  handleFormSubmit(values) {
    //Call Action Creator
    //pass cb to redirect if needed
    this.props.signUpUser(values)
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger"><strong>Oops</strong>{ this.props.errorMessage }</div>
      )
    }
  }
}

//improvement- map or reduce on each value
function validate(values) {
  const errors = {}
  if(!values.email) {
    errors.email = "Please enter an email"
  }
  if(!values.password) {
    errors.password = "Please enter a password"
  }
  if(!values.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confrimation"
  }
  if(values.password !== values.passwordConfirm) {
    errors.password = "Passwords must match"
  }
  return errors
}

function mapStateToProps({ auth }) {
  return { errorMessage: auth.error }
}

export default reduxForm({
  validate,
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm']
})(
  connect(mapStateToProps, actions)(SignUp)
)
