import React, { Fragment } from 'react'
import Footer from './footer'
import NavBar from './navbar'
import FacetBlock from './facet-block'

const Layout = ({ children }) => (
  <Fragment>
    <main className="d-flex flex-column">
      <NavBar />
      <section className="container">
        <div className="row">
          <div style={{ verticalAlign: 'top', maxWidth: '12em' }}>
            {window.location.href.endsWith('/#/') && <FacetBlock />}
          </div>
          <div id="shop-items">
            {children}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </Fragment>
)

export default Layout
