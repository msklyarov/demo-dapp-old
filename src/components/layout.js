import React, { Fragment } from 'react'
import Footer from './footer'
import NavBar from './navbar'
import FacetBlock from './facet-block'

const Layout = ({ children }) => (
  <Fragment>
    <main className="d-flex flex-column">
      <NavBar />
      <section style={{ margin: 'auto' }}>
        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
          {window.location.href.endsWith('/#/') && <FacetBlock/>}
        </div>
        <div
          style={{ display: 'inline-block' }}
        >
          {children}
        </div>
      </section>
    </main>
    <Footer />
  </Fragment>
)

export default Layout
