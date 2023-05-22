import { Formik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { RootState, useAppDispatch } from "../../store";
import { signin } from "../../store/slices/user";

const LoginOrRegisterForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (error) {
      toast("Invalid email or password!", { type: "error" });
    }
  }, [error]);

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
        dispatch(signin(values));
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
            />
            {touched.password && errors.password && (
              <ErrorText>{errors.password}</ErrorText>
            )}
          </div>
          <Button disabled={loading} onClick={() => handleSubmit()}>
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
  background: grey;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px;
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
