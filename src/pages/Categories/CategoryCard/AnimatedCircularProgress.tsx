import React, { useEffect, useState } from "react"

import { CircularProgress } from "@material-ui/core"

type AnimatedCircularProgressProps = {
  value: number
}

const AnimatedCircularProgress: React.FC<AnimatedCircularProgressProps> = ({
  value,
}) => {
  const [innerValue, setInnerValue] = useState(0)

  useEffect(() => {
    if (innerValue === 0) {
      setTimeout(() => {
        setInnerValue(value)
      }, 200)
    } else {
      setInnerValue(value)
    }
  }, [innerValue, value])

  return (
    <CircularProgress
      variant="determinate"
      value={innerValue}
      size={184}
      thickness={2.4}
    />
  )
}

export default AnimatedCircularProgress
