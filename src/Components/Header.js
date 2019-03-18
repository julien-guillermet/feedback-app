import React from 'react'
import { Link } from "react-router-dom";

const Header = () => (
    <div className='header'>
        <Link style={{ textDecoration: 'none', color: 'black' }} to={{ pathname: '/' }}>
            <h1>Feedback App</h1>
        </Link>
    </div>
)
export default Header