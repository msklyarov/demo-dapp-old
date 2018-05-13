import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  getFacetState,
  setFacetState,
  initialState
} from '../actions/Facet'

class NavBarFacetSwitch extends Component {
  constructor(props) {
    super(props)

    this.handleFacetSwitchChange = this.handleFacetSwitchChange.bind(this)

    this.state = initialState
  }

  componentWillMount() {
    this.props.getFacetState()
  }

  componentWillReceiveProps(nextProps) {
    const { isEnabled } = nextProps.facet;
    this.setState({ isEnabled });
    document.getElementById('filtering-block').className = !isEnabled ? 'hidden' : ''
  }

  handleFacetSwitchChange(e) {
    const isEnabled = e.target.checked;
    this.setState({ isEnabled });
    this.props.setFacetState(isEnabled)
    document.getElementById('filtering-block').className = !isEnabled ? 'hidden' : ''
  }

  render() {
    return (
      <form className="form-inline my-2 my-lg-0">
        <input
          id="showFilter"
          type="checkbox"
          checked={this.state.isEnabled}
          onChange={this.handleFacetSwitchChange}
        />
        <label
          style={{ color: 'white' }}
          className="nav-item nav-link"
          htmlFor="showFilter"
        >
          Show filter
        </label>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  facet: state.facet
})

const mapDispatchToProps = dispatch => ({
  getFacetState: () => dispatch(getFacetState()),
  setFacetState: (isEnabled) => dispatch(setFacetState(isEnabled)),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(NavBarFacetSwitch)
)

