import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

import colors from "../../assets/styles/colors";

export const Title = styled.header`
  text-transform: uppercase;
  font-size: 1.5em;
  color: ${colors.secondary};
`;

export const Description = styled.p`
  color: ${colors.textInPrimary};
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Link = styled((props) => <RouterLink {...props} />)`
  color: ${colors.secondary};
`;
