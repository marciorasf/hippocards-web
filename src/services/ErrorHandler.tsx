import { nodeEnv } from "../config";
import { Notify } from "../hooks/Notify";

function handleErrorDevelopment(error: Error, errorMessage: string) {
  console.log({ error });
  if (errorMessage) {
    Notify.error(errorMessage);
  }
}

function handleErrorProduction(error: Error, errorMessage: string) {
  if (errorMessage) {
    Notify.error(errorMessage);
  }
}

export default function handleError(error: Error, errorMessage?: string) {
  const errorMessageWithDefault =
    errorMessage === undefined ? "Something bad happened!" : errorMessage;

  if (nodeEnv) {
    handleErrorDevelopment(error, errorMessageWithDefault);
  } else {
    handleErrorProduction(error, errorMessageWithDefault);
  }
}
