import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  getFiltering,
  setFiltering,
  resetFiltering,
  sortKey,
  sortOrder,
  initialState
} from '../actions/Filtering'

import beautyServicesJson from '../../public/schemas/beauty-services.json';
import cosmeticsJson from '../../public/schemas/cosmetics.json';

import '../css/hidden.css'

class FacetBlock extends Component {
  constructor(props) {
    super(props)

    this.handleKeyChange = this.handleKeyChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleCheckBoxValueChange = this.handleCheckBoxValueChange.bind(this)
    this.resetFiltering = this.resetFiltering.bind(this)

    this.state = initialState
  }

  componentWillMount() {
    this.props.getFiltering()
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.filtering);

    document.getElementById('sort-order').className =
      nextProps.filtering.sortKey !== sortKey.none ? '' : 'hidden'
  }

  handleKeyChange(e) {
    if (e.target.value !== sortKey.none) {
      const sortOrderState = this.state.sortOrder || sortOrder.asc;
      this.setState({
        sortKey: e.target.value,
        sortOrder: sortOrderState
      })
      this.props.setFiltering({ sortKey: e.target.value, sortOrder: sortOrderState })

      document.getElementById('sort-order').className = ''
    } else {
      this.setState({ sortKey: e.target.value, sortOrder: null })
      this.props.setFiltering({ sortKey: e.target.value, sortOrder: null })

      document.getElementById('sort-order').className = 'hidden'
    }
  }

  handleValueChange(name) {
    return (e) => {
      const obj = { [name]: e.target.value }
      this.setState(obj)
      this.props.setFiltering(obj)
    };
  }

  handleCheckBoxValueChange(name, value) {
    return (e) => {
      const obj = e.target.checked
        ? { [name]: [...this.state[name], value] }
        : { [name]: this.state[name].filter(item => item !== value) }

      this.setState(obj)
      this.props.setFiltering(obj)
    }
  }

  resetFiltering() {
    this.setState(initialState);
    this.props.resetFiltering()
  }

  render() {
    const beautyServicesList = beautyServicesJson.properties.category.enum
    const cosmeticsList = cosmeticsJson.properties.category.enum

    const weekDaysList = beautyServicesJson.properties.weekDayFrom.enum
    const listingTypes = ["Beauty services", "Cosmetics"]

    return (
      <section
        id="filtering-block"
        className="hidden"
        style={{
          margin: '40px 20px'
        }}
      >
        <form className="filtering">
          <div>
            <label
              style={{
                color: 'black',
                fontWeight: 'bold'
              }}
              htmlFor="location"
            >
              Location
            </label>
          </div>
          <div>
            <input
              type="text"
              name="location"
              id="location"
              onChange={this.handleValueChange('location')}
              value={this.state.location}
            />
          </div>
          <div style={{ marginTop: "0.5em" }}>
            <label
              style={{
                color: 'black',
                fontWeight: 'bold'
              }}
              htmlFor="name"
            >
              Item name
            </label>
          </div>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              onChange={this.handleValueChange('name')}
              value={this.state.name}
            />
          </div>
          <hr />
          <div style={{ fontWeight: 'bold' }}>
            Show categories
          </div>
          <details style={{ margin: '0.5em 0' }}>
            <summary>{listingTypes[0]}</summary>
            <section style={{ marginTop: '0.5em' }}>
              {beautyServicesList.map((item, i) => (
                <div key={i} style={{ marginLeft: '1em' }}>
                  <input
                    id={item}
                    type="checkbox"
                    checked={this.state.beautyServices.includes(item)}
                    onChange={this.handleCheckBoxValueChange('beautyServices', item)}
                  />
                  <label
                    style={{
                      color: 'black',
                      marginBottom: '3px'
                    }}
                    htmlFor={item}
                  >
                    {item.substring(0, 25)}
                    </label>
                </div>
              ))}
            </section>
          </details>
          <details style={{ margin: '0.5em 0' }}>
            <summary>{listingTypes[1]}</summary>
            <section style={{ marginTop: '0.5em' }}>
              {cosmeticsList.map((item, i) => (
                <div key={i} style={{ marginLeft: '1em' }}>
                  <input
                    id={item}
                    type="checkbox"
                    checked={this.state.cosmetics.includes(item)}
                    onChange={this.handleCheckBoxValueChange('cosmetics', item)}
                  />
                  <label
                    style={{
                      color: 'black',
                      marginBottom: '3px'
                    }}
                    htmlFor={item}
                  >
                    {item.substring(0, 25)}
                  </label>
                </div>
              ))}
            </section>
          </details>
          <hr />
          <div style={{ fontWeight: 'bold' }}>
            Select timeframe
          </div>
          <details style={{ margin: '0.5em 0' }}>
            <summary>Select days of the week</summary>
            <section style={{ marginTop: '0.5em' }}>
              {weekDaysList.map((item, i) => (
                <div key={i} style={{ marginLeft: '1em' }}>
                  <input
                    id={item}
                    type="checkbox"
                    checked={this.state.weekDays.includes(item)}
                    onChange={this.handleCheckBoxValueChange('weekDays', item)}
                  />
                  <label
                    style={{
                      color: 'black',
                      marginBottom: '3px'
                    }}
                    htmlFor={item}
                  >
                    {item}
                  </label>
                </div>
              ))}
            </section>
          </details>
          <div>
            <label
              style={{
                color: 'black',
                fontWeight: 'bold'
              }}
              htmlFor="dayHourFrom"
            >
              Hours
            </label>
          </div>
          <div>
            <input
              id="dayHourFrom"
              type="number"
              min="0"
              max="23"
              onChange={this.handleValueChange('dayHourFrom')}
              value={this.state.dayHourFrom}
            />
            {' - '}
            <input
              id="dayHourTo"
              type="number"
              min="0"
              max="23"
              onChange={this.handleValueChange('dayHourTo')}
              value={this.state.dayHourTo}
            />
          </div>
          <hr />
          <div>
            <label
              style={{
                color: 'black',
                fontWeight: 'bold'
              }}
              htmlFor="sortBy"
            >
              Sort by
            </label>
          </div>
          <select
            id="sortBy"
            value={this.state.sortKey || ''}
            onChange={this.handleKeyChange}
          >
            {Object.keys(sortKey).map((item, i) => <option key={i} value={item}>{item}</option>)}
          </select>{'  '}
          <span id="sort-order" className="hidden">
            <select
              value={this.state.sortOrder || ''}
              onChange={this.handleValueChange('sortOrder')}
            >
              {Object.keys(sortOrder).map((item, i) => <option key={i} value={item}>{item}</option>)}
            </select>
          </span>
          <div style={{ marginTop: "1em" }}>
            <button type="button" onClick={this.resetFiltering}>Reset Filter</button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  filtering: state.filtering
})

const mapDispatchToProps = dispatch => ({
  getFiltering: () => dispatch(getFiltering()),
  setFiltering: (obj) => dispatch(setFiltering(obj)),
  resetFiltering: () => dispatch(resetFiltering()),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(FacetBlock)
)