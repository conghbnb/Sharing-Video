import { Formik } from "formik";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState, useAppDispatch } from "../../store";
import { signinOrSignup } from "../../store/slices/user";

const LoginOrRegisterForm = () => {
  const dispatch = useAppDispatch();
  const { loading } = useSelector((state: RootState) => state.user);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors: { password?: string; email?: string } = {};
        if (!values.password) {
          errors.password = "Required!";
        }
        if (!values.email) {
          errors.email = "Required!";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address!";
        }
        return errors;
      }}
      onSubmit={(values) => {
        dispatch(signinOrSignup(values));
      }}
    >
      {({
        touched,
        errors,
        handleSubmit,
        values,
        handleBlur,
        handleChange,
      }) => (
        <InputContainer>
          <div>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              data-testid="email-input"
            />
            {touched.email && errors.email && (
              <ErrorText>{errors.email}</ErrorText>
            )}
          </div>
          <div>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              data-testid="password-input"
            />
            {touched.password && errors.password && (
              <ErrorText>{errors.password}</ErrorText>
            )}
          </div>
          <Button
            disabled={loading}
            onClick={() => handleSubmit()}
            data-testid="submit-btn"
          >
            {loading ? "Loading..." : "Login/Register"}
          </Button>
        </InputContainer>
      )}
    </Formik>
  );
};

const InputContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 1rem;
  width: 500px;
`;

const Input = styled.input`
  border-radius: 2rem;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 15px;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background: grey;
  padding: 10px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 10px;
`;

const ErrorText = styled.small`
  color: red;
  width: 100%;
`;

export default LoginOrRegisterForm;
