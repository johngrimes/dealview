// @flow

type Values = { [key: string]: string }

export function save(values: Values): Promise<Values> {
  const valuesCopy = Object.assign({}, values)
  return window.db.realEstate
    .put(valuesCopy)
}

export function update(values: Values): Promise<string> {
  const valuesCopy = Object.assign({}, values)
  return window.db.realEstate
    .where('id')
    .equals(valuesCopy.id)
    .modify(valuesCopy)
}

export function load(id: string): Promise<Values> {
  return window.db.realEstate
    .where('id')
    .equals(id)
    .first()
}
