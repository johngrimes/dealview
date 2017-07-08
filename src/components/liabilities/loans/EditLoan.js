// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import LoanForm from 'components/liabilities/loans/LoanForm'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import NotFound from 'components/NotFound/NotFound'
import LoanActions from 'actions/liabilities/loans'
import type { Loan } from 'types/liabilities/loan'
import type { GlobalState } from 'store'
import type { ObjectStoreStatus } from 'store'
import type { BreadcrumbTrail } from 'components/Breadcrumbs/Breadcrumbs'

import './EditLoan.css'

type Props = {
  id: string,
  loan: {
    status: ObjectStoreStatus,
    object: Loan
  },
  dispatch: any,
  history: any,
}

export class EditLoan extends React.Component {
  props: Props
  handleSubmit: (loan: Loan) => void

  constructor(props: Props) {
    super(props)
    if (this.props.loan.status === 'uninitialised') {
      this.props.dispatch(LoanActions.loadLoans())
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  breadcrumbs(): BreadcrumbTrail {
    const { id, loan: { object: loan } } = this.props
    const loanName = (typeof loan === 'undefined') ? id : loan.name
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Liabilities', path: '/portfolio/liabilities' },
      { display: loanName, path: `/portfolio/liabilities/loans/${id}` },
    ]
  }

  handleSubmit(loan: Loan): void {
    this.props.dispatch(LoanActions.putLoan(loan))
    this.props.history.push('/portfolio/liabilities')
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.loan.status === 'uninitialised') {
      this.props.dispatch(LoanActions.loadLoans())
    }
  }

  render() {
    return (typeof this.props.loan.object === 'undefined')
    ? <NotFound />
    : <div className='edit-loan'>
        <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
        <LoanForm loan={this.props.loan.object} onSubmit={this.handleSubmit} />
      </div>
  }
}

const mapStateToProps = (state: GlobalState, ownProps: Props) => {
  return {
    loan: {
      status: state.loans.status,
      object: state.loans.objects[ownProps.id],
    },
  }
}

export default connect(mapStateToProps)(withRouter(EditLoan))
