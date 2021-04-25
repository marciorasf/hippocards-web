import React from "react"

import DesktopHeader from "@components/Header/DesktopHeader"
import MobileHeader from "@components/Header/MobileHeader"
import useIsMobile from "@hooks/useIsMobile"

type HeaderProps = {
  title?: string
  goBackTo?: string
  fabFn?: () => void
  children?: React.ReactNode
  isLandingPage?: boolean
}

const Header: React.FC<HeaderProps> = (props) => {
  const isMobile = useIsMobile()

  return isMobile ? <MobileHeader {...props} /> : <DesktopHeader {...props} />
}

export default Header
