import { useCallback, useEffect, useState } from 'react'
import type { Student } from '@/types/student'
import { studentApi } from '@/services/api/studentApi'

export function useStudents(teacherId?: string): {
  students: Student[]
  loading: boolean
  error: string | null
  refresh: () => void
} {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let active = true
    setLoading(true)
    const load = teacherId
      ? studentApi.getStudentsByTeacher(teacherId)
      : studentApi.getStudents()
    load
      .then((data) => {
        if (active) {
          setStudents(data)
          setError(null)
        }
      })
      .catch(() => {
        if (active) setError('Unable to load students.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [teacherId, tick])

  const refresh = useCallback(() => setTick((t) => t + 1), [])

  return { students, loading, error, refresh }
}
