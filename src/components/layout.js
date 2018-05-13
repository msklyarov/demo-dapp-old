import React, { Fragment } from 'react'
import Footer from './footer'
import NavBar from './navbar'
import FilteringBlock from './filtering-block'

const Layout = ({ children }) => (
  <Fragment>
    <main className="d-flex flex-column">
      <NavBar />
      <section style={{ margin: 'auto' }}>
        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
          {window.location.href.endsWith('/#/') && <FilteringBlock/>}
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
