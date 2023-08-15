import React from "react";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import styles from "./Login.module.css";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { required } from "../../utils/validators";
import { compile } from "nth-check";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={styles.formDiv}>
        <Field placeholder="Email" name="email" component="input" />
      </div>
      <div className={styles.formDiv}>
        <Field
          placeholder="Password"
          name="password"
          component="input"
          type="password"
        />
      </div>
      <div className={styles.formDiv}>
        <Field type="checkbox" name="rememberMe" component="input" /> remember
        me
      </div>
      {props.error && (
        <div className={styles.errorMessage}>
          <h4>{props.error}</h4>
        </div>
      )}
      {props.captchaUrl && <img src={props.captchaUrl} alt="captcha" />}
      {props.captchaUrl && (
        <Field
          placeholder="Enter captcha"
          name="captcha"
          validate={required}
          component="input"
        />
      )}
      <div className={styles.buttonDiv}>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.state.isAuth) {
    return <Navigate to={"/posts"} />;
  }

  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.state.captchaUrl} />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    state: state.auth,
  };
};

export default connect(mapStateToProps, { login })(Login);
