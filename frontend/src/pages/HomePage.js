import React from 'react'

import Laptop from '../images/laptop.png'
import Accessory from '../images/accessory.png'

import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <main className='container my-5'>
        <div className="row">
            <div className="col-6 d-flex justify-content-center">
                <div className="card shadow-lg rounded">
                    <img src={Laptop} alt="l" className="card-img home__img" />
                    <div className="card-body">
                        <div className="card-title text-center">
                            Laptops
                        </div>
                        <div className="card-footer w-75 mx-auto mt-3">
                            <Link to='/laptops-list' className='btn btn-primary w-100'>
                                View All Laptops
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-6 d-flex justify-content-center">
                <div className="card shadow-lg rounded">
                    <img src={Accessory} alt="l" className="card-img home__img" />
                    <div className="card-body">
                        <div className="card-title text-center">
                            Accessories
                        </div>
                        <div className="card-footer w-75 mx-auto mt-3">
                            <Link to='/accessories-list' className='btn btn-primary w-100'>
                                View All Accessories
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default HomePage