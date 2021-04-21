export const newStateName = "forward"

export default function handleBackButton(onBackButtonPress: () => void) {
  const lastPathName = window.location.pathname

  /**
   * Creates a new history without changing any page data.
   */
  window.history.pushState(newStateName, "", window.location.pathname)

  /**
   * if it goes to the last pathname we trigger the callback function
   * since it means the user has gone back with back button.
   */
  window.addEventListener("popstate", function onPopStateChange() {
    if (lastPathName === window.location.pathname) {
      onBackButtonPress()
    }

    // eslint-disable-next-line
    window.removeEventListener("popstate", onPopStateChange)
  })
}
