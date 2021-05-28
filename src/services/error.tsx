import { Notification } from "@components"

const errorService = {
  handle(error: Error, errorMessage?: string) {
    if (error.message === "Network Error") {
      Notification.error({ message: "Could not connect to server" })
    }

    console.log({ error, errorMessage })
  },
}

export default errorService
