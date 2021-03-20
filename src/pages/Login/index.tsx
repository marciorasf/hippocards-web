import React from "react";

import { Button, Container } from "@material-ui/core";

import apiService from "../../services/api";
import errorService from "../../services/error";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  async function handleLogin() {
    try {
      const response = await apiService.post("/login", {
        email: "marciorasf@gmail.com",
        password: "12345678",
      });

      console.log(response);
    } catch (err) {
      errorService.handle(err);
    }
  }

  return (
    <Container>
      <Button onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;
