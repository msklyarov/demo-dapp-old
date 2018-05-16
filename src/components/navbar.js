import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Notification from './notification'
import data from '../data'

import NavBarFacetSwitch from './navbar-facet-switch'

class NavBar extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = { searchQuery: '' }
  }

  handleChange(e) {
    this.setState({ searchQuery: e.target.value })
  }

  render() {
    // randomly select from three examples
    const exampleCounts = [4, 44, 444][Math.floor(Math.random() * 3)]
    // avoid integers greater than two digits
    const notificationCount = exampleCounts < 100 ? Number(exampleCounts).toLocaleString() : `${Number(99).toLocaleString()}+`

    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <button className="navbar-toggler mr-3" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <img src="/images/menu-icon-light.svg" alt="Menu" />
          </button>
          <Link to="/" className="navbar-brand mr-auto mr-lg-3">
            <div className="logo-container">
              <img src="/images/jolyy-header-logo.svg" height="38" className="origin-logo" alt="Origin Protocol" />
            </div>
          </Link>
          <div className="collapse navbar-collapse order-2 order-lg-1" id="navbarSupportedContent">
            {window.location.href.endsWith('/#/') && <NavBarFacetSwitch />}
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search Listings" aria-label="Search" onChange={this.handleChange} value={this.state.searchQuery} />
            </form>
            <div className="navbar-nav justify-content-end">
              <Link to="/my-purchases" className="nav-item nav-link">Buy</Link>
              <div className="sell dropdown">
                <a className="dropdown-toggle nav-item nav-link" id="sellDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sell</a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="sellDropdown">
                  <div className="triangle-container d-none d-lg-flex justify-content-end"><div className="triangle"></div></div>
                  <div className="actual-menu">
                    <Link to="/my-listings" className="dropdown-item">My Listings</Link>
                    <Link to="/my-sales" className="dropdown-item">My Sales</Link>
                    <Link to="/create" className="dropdown-item d-none d-lg-block">Add a Listing</Link>
                  </div>
                </div>
              </div>
              <Link to="/create" className="nav-item nav-link"><img src="/images/add-listing-icon.svg" alt="Add Listing" className="add-listing" />Add Listing</Link>
            </div>
          </div>
          <div className="static navbar-nav order-1 order-lg-2">
            <div className="nav-item notifications dropdown">
              <a className="nav-link active dropdown-toggle" id="notificationsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="unread-badge"></div>
                <img src="/images/alerts-icon.svg" className="notifications" alt="Notifications" />
                <img src="/images/alerts-icon-selected.svg" className="notifications selected" alt="Notifications" />
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="notificationsDropdown">
                <div className="triangle-container d-flex justify-content-end"><div className="triangle"></div></div>
                <div className="actual-menu">
                  <header className="d-flex">
                    <div className="count">
                      <p className="d-inline-block">{notificationCount}</p>
                    </div>
                    <h3>Notifications</h3>
                  </header>
                  <div className="notifications-list">
                    <ul className="list-group">
                      {data.notifications.map(n => <Notification key={`navbar-notification-${n._id}`} notification={n} />)}
                    </ul>
                  </div>
                  <footer>
                    <Link to="/notifications">View All</Link>
                  </footer>
                </div>
              </div>
            </div>
            <div className="nav-item identity dropdown">
              <a className="nav-link active dropdown-toggle" id="identityDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="/images/identicon.png"
                  srcSet="/images/identicon@2x.png 2x, /images/identicon@3x.png 3x"
                  className="identicon" alt="Identicon" />
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="identityDropdown">
                <div className="triangle-container d-flex justify-content-end"><div className="triangle"></div></div>
                <div className="actual-menu">
                  <div className="wallet">
                    <div className="d-flex">
                      <div className="image-container">
                        <Link to="/profile">
                          <img src="/images/identicon.png"
                            srcSet="/images/identicon@2x.png 2x, /images/identicon@3x.png 3x"
                            alt="wallet icon" />
                        </Link>
                      </div>
                      <div>
                        <p><Link to="/profile">ETH Address:</Link></p>
                        <p><Link to="/profile"><strong>0x32Be343B94f860124dC4fEe278FDCBD38C102D88</strong></Link></p>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex">
                      <div className="avatar-container">
                        <Link to="/profile"><img src="/images/avatar-blue.svg" alt="avatar" /></Link>
                      </div>
                      <div className="identification">
                        <p><Link to="/profile">Aure Gimon</Link></p>
                        <Link to="/profile"><img src="/images/twitter-icon-verified.svg" alt="Twitter verified icon" /></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar
