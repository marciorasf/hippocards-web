import { __is_dev_env__ } from "@/config"

function _handleErrorDevelopment(error: Error, errorMessage: string) {
  if (errorMessage) {
    console.error({ error })
  }
}

function _handleErrorProduction(_error: Error, errorMessage: string) {
  if (errorMessage) {
    console.error({ error: _error })
  }
}

const errorService = {
  handle(error: Error, errorMessage?: string) {
    const errorMessageWithDefault =
      errorMessage === undefined ? "Something bad happened!" : errorMessage

    if (__is_dev_env__) {
      _handleErrorDevelopment(error, errorMessageWithDefault)
    } else {
      _handleErrorProduction(error, errorMessageWithDefault)
    }
  },
}

export default errorService
