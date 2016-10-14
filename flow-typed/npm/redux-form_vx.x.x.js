// flow-typed signature: 5ca4aad45a06cc80c22fb6cae96f283f
// flow-typed version: <<STUB>>/redux-form_v^6.0.2/flow_v0.32.0

declare module 'redux-form' {
  declare module.exports: any

  declare type InputProps = { checked: boolean, name: string, onBlur: Function,
                              onChange: Function, onDragStart: Function,
                              onDrop: Function, onFocus: Function, value: any }

  declare type MetaProps = { active: boolean, autofilled: boolean,
                             asyncValidating: boolean, dirty: boolean,
                             dispatch: Function, error: Array<string>,
                             invalid: boolean, pristine: boolean,
                             submitting: boolean, touched: boolean,
                             valid: boolean, visited: boolean }

  declare type Values = { [key: string]: string }
  declare type Errors = { [key: string]: string }
  declare type Action = Object
  declare type AsyncAction = any
  declare type Dispatch = (a: Action | AsyncAction) => any

  declare type AsyncValidateFunction = (values: Values) => Promise<void|Errors>
  declare type OnSubmitFunction = (values: Values, dispatch: Dispatch) => Action
}
