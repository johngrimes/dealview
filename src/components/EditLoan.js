import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import LoanForm from './LoanForm.js'
import Breadcrumbs from './Breadcrumbs.js'
import NotFound from './NotFound.js'
import LoanActions from '../actions/loans.js'

import './styles/EditLoan.css'

export class EditLoan extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.loan.status === 'uninitialised') {
      this.props.dispatch(LoanActions.loadLoans())
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  breadcrumbs() {
    const { id, loan: { object: loan } } = this.props
    const loanName = typeof loan === 'undefined' ? id : loan.name
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Liabilities', path: '/portfolio/liabilities' },
      { display: loanName, path: `/portfolio/liabilities/loans/${id}` },
    ]
  }

  handleSubmit(loan) {
    this.props.dispatch(LoanActions.putLoan(loan))
    this.props.history.push('/portfolio/liabilities')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loan.status === 'uninitialised') {
      this.props.dispatch(LoanActions.loadLoans())
    }
  }

  render() {
    return typeof this.props.loan.object === 'undefined'
      ? <NotFound />
      : <div className='edit-loan'>
          <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
          <LoanForm
            loan={this.props.loan.object}
            onSubmit={this.handleSubmit}
          />
        </div>
  }
}

EditLoan.propTypes = {
  id: PropTypes.string.isRequired,
  loan: PropTypes.shape({
    status: PropTypes.oneOf([ 'uninitialised', 'loading', 'loaded', 'error' ]),
    object: PropTypes.object,
  }),
}

const mapStateToProps = (state, ownProps) => ({
  loan: {
    status: state.loans.status,
    object: state.loans.objects[ownProps.id],
  },
})

export default connect(mapStateToProps)(withRouter(EditLoan))
