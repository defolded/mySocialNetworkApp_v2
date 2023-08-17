import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { login } from "../../redux/authReducer";
import { AppStateType } from "../../redux/redux-store";
import { required } from "../../utils/validators";
import styles from "./Login.module.css";

interface LoginFormOwnPropsType {
  captchaUrl: null | string
}

const LoginForm:React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = (props) => {
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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({
  form: "login",
})(LoginForm);


interface MapStateToPropsType {
  captchaUrl: string | null
  isAuth: boolean
}

interface MapDispatchToPropsType {
  login: (email: string, password: string, remmemberMe: boolean, captcha: null | string) => void
}

interface LoginFormValuesType {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}

const Login:React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.isAuth) {
    return <Navigate to={"/posts"} />;
  }

  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

let mapStateToProps = (state: AppStateType):MapStateToPropsType => {
  return {
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
  };
};

export default connect(mapStateToProps, { login })(Login);
