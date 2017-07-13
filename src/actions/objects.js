export const createObjectActions = (
  name,
  pluralName,
  nameTitled,
  pluralNameTitled
) => {
  return {
    [`put${nameTitled}Request`]: object => ({
      type: `PUT_${name}_REQUEST`,
      object,
    }),
    [`put${nameTitled}Success`]: object => ({
      type: `PUT_${name}_SUCCESS`,
      object,
    }),
    [`put${nameTitled}Failure`]: error => ({
      type: `PUT_${name}_FAILURE`,
      error,
    }),
    [`delete${nameTitled}Request`]: id => ({
      type: `DELETE_${name}_REQUEST`,
      id,
    }),
    [`delete${nameTitled}Success`]: id => ({
      type: `DELETE_${name}_SUCCESS`,
      id,
    }),
    [`delete${nameTitled}Failure`]: error => ({
      type: `DELETE_${name}_FAILURE`,
      error,
    }),
    [`load${pluralNameTitled}Request`]: () => ({
      type: `LOAD_${pluralName}_REQUEST`,
    }),
    [`load${pluralNameTitled}Success`]: objects => ({
      type: `LOAD_${pluralName}_SUCCESS`,
      objects,
    }),
    [`load${pluralNameTitled}Failure`]: error => ({
      type: `LOAD_${pluralName}_FAILURE`,
      error,
    }),
  }
}
