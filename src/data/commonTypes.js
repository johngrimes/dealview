export const AddressDefaults = {
  line1: '',
  line2: '',
  line3: '',
  locality: '',
  state: '',
  postcode: '',
}

export const DateDisplayFormat = 'D MMM YYYY'
export const DateStorageFormat = 'YYYY-MM-DD'

export const parseNumber = string =>
  typeof string === 'string' ? parseInt(string) : undefined

export const formatNumber = number => {
  if (typeof number !== 'number') return undefined
  const numString = number.toString()
  return [...numString].reduce((prev, curr, i, arr) => {
    return arr.length - i - 1 !== 0 && (arr.length - i - 1) % 3 === 0
      ? prev + curr + ','
      : prev + curr
  }, '')
}

export const formatDollars = number =>
  typeof number === 'number' ? '$' + formatNumber(number) : undefined

export const unformatNumber = string => {
  return typeof string === 'string'
    ? parseInt(string.replace(/,/g, ''), 10)
    : undefined
}

export const unformatDollars = string => {
  return typeof string === 'string'
    ? unformatNumber(string.replace(/\$/g, ''))
    : undefined
}
