import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import LoanForm from './LoanForm.js'
import Breadcrumbs from './Breadcrumbs.js'
import LoanActions from '../actions/loans.js'

import './styles/CreateLoan.css'

export class CreateLoan extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  breadcrumbs() {
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Liabilities', path: '/portfolio/liabilities' },
      { display: 'New Loan', path: '/portfolio/liabilities/loans/new' },
    ]
  }

  handleSubmit(loan) {
    this.props.dispatch(LoanActions.putLoan(loan))
    this.props.history.push('/portfolio/liabilities')
  }

  render() {
    return (
      <div className='create-loan'>
        <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
        <LoanForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default connect()(withRouter(CreateLoan))
