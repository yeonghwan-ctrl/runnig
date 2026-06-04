import { useCallback, useEffect, useState } from 'react'

/**
 * localStorage와 동기화되는 상태 훅.
 * - 초기값은 저장된 값이 있으면 그것을, 없으면 initialValue를 사용
 * - 다른 탭에서의 변경(storage 이벤트)도 반영
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const readValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [stored, setStored] = useState<T>(readValue)

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next =
          typeof value === 'function' ? (value as (p: T) => T)(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          // 저장 실패는 무시 (용량 초과 등)
        }
        return next
      })
    },
    [key],
  )

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // ignore
    }
    setStored(initialValue)
  }, [key, initialValue])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setStored(readValue())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key, readValue])

  return [stored, setValue, remove]
}
