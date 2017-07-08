// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import LoanForm from 'components/liabilities/loans/LoanForm'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import LoanActions from 'actions/liabilities/loans'
import type { Loan } from 'types/liabilities/loan'
import type { BreadcrumbTrail } from 'components/Breadcrumbs/Breadcrumbs'

import './CreateLoan.css'

type Props = {
  dispatch: any,
  history: any,
}

export class CreateLoan extends React.Component {
  props: Props
  breadcrumbs: () => BreadcrumbTrail
  handleSubmit: (loan: Loan) => void

  constructor(props: Props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  breadcrumbs(): BreadcrumbTrail {
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Liabilities', path: '/portfolio/liabilities' },
      { display: 'New Loan', path: '/portfolio/liabilities/loans/new' },
    ]
  }

  handleSubmit(loan: Loan): void {
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
