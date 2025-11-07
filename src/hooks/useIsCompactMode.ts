import { useState, useEffect } from 'react'

// 检测是否为紧凑模式（小于1600px）
export const useIsCompactMode = () => {
  const [isCompact, setIsCompact] = useState<boolean>(false)

  useEffect(() => {
    const checkCompactMode = () => {
      setIsCompact(window.innerWidth < 1600)
    }

    checkCompactMode()
    window.addEventListener('resize', checkCompactMode)

    return () => window.removeEventListener('resize', checkCompactMode)
  }, [])

  return isCompact
}
