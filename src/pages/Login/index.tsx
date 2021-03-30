import { Formik, Form } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";

import { Button, Container } from "@material-ui/core";

import InputField from "../../components/InputField";
import apiService from "../../services/api";
import errorService from "../../services/error";
import { useUserStore } from "../../store/user";

const Login: React.FC = () => {
  const userStore = useUserStore();
  const history = useHistory();

  return (
    <Container>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const { data } = await apiService.post("/login", values);

            userStore.setUser({
              email: data.email,
            });

            history.push("/categories");
          } catch (err) {
            errorService.handle(err);
            const { data } = err.response;
            setErrors(data.login.errors);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" label="Email" required />

            <InputField
              name="password"
              label="Password"
              type="password"
              required
            />

            <Button type="submit" disabled={isSubmitting}>
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
