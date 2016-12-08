import { compose } from 'redux'

const composeWithDevTools =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : () => {
      // eslint-disable-next-line no-undefined
      if (arguments.length === 0) return undefined
      if (typeof arguments[0] === 'object') return compose
      return Reflect.apply(compose, null, arguments)
    }

export default composeWithDevTools
