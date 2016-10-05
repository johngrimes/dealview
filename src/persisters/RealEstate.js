// @flow

type Values = { [key: string]: string }

// Takes a set of values, and returns the ID of the new record.
export function save(values: Values): Promise<string> {
  const valuesCopy = Object.assign({}, values)
  return window.db.realEstate
    .put(valuesCopy)
}

// Takes an object with an id, and returns the number of modified objects.
export function update(values: Values): Promise<number> {
  const valuesCopy = Object.assign({}, values)
  return window.db.realEstate
    .where('id')
    .equals(valuesCopy.id)
    .modify(valuesCopy)
}

// Takes an ID, and returns the values of the matching record.
export function load(id: string): Promise<Values> {
  return window.db.realEstate
    .where('id')
    .equals(id)
    .first()
}
