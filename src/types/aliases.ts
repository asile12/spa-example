import ResasApiResolved from './ResasApiResolved'
import ResasApiRejected from './ResasApiRejected'

export type ResasResponse<T> = ResasApiResolved<T> | ResasApiRejected

export type PrefCode = number
