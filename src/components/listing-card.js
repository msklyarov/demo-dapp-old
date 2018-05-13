import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// temporary - we should be getting an origin instance from our app,
// not using a global singleton
// import origin from '../services/origin'

class ListingCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // loading: true,
      loading: false,
    }
  }

  // async componentDidMount() {
  //   try {
  //     const listing = await origin.listings.getByIndex(this.props.listingId)
  //     const obj = Object.assign({}, listing, { loading: false })
  //
  //     this.setState(obj)
  //   } catch (error) {
  //     console.error(`Error fetching contract or IPFS info for listingId: ${this.props.listingId}`)
  //   }
  // }

  render() {
    const { data } = this.props;

    return (
      <div className={`col-12 col-md-6 col-lg-4 listing-card${this.state.loading ? ' loading' : ''}`}>
        <Link to={`/listing/${data.address}`}>
          <div className="photo" style={{backgroundImage:`url("${
            (data.pictures && data.pictures.length>0 &&
              (new URL(data.pictures[0])).protocol === "data:") ?
                data.pictures[0] :
                '/images/default-image.jpg'}")`
          }}>
          </div>
          <p className="category placehold">{data.category}</p>
          <p className="category placehold">Location: {data.location}</p>
          {data.weekDayFrom && <p className="category placehold">Open: {data.weekDayFrom}-{data.weekDayTo} ({data.dayHourFrom}-{data.dayHourTo})</p>}
          <h2 className="title placehold">{data.name}</h2>
          <div className="d-flex align-items-center">
            <p className="price placehold">
              {data.price && `${Number(data.price).toLocaleString(undefined, {minimumFractionDigits: 3})} ETH`}
            </p>
            {data.unitsAvailable===0 &&
              <span className="sold-banner">Sold</span>
            }
          </div>
        </Link>
      </div>
    )
  }
}

export default ListingCard
