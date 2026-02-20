import React from 'react'
import { NavLink, Link } from 'react-router-dom';
  
export default function Nav() {
  return (
    <nav className='navbar'>
        <Link to="/">Zalex Inc.</Link>
        <ul className='nav-links'>
            <li>
                <NavLink to="/" end>Request Certificate</NavLink>
            </li>
            <li>
                <NavLink to="/certificates">View Certificates</NavLink>
            </li>
        </ul>
    </nav>
  )
}