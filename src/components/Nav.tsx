import { NavLink, Link } from 'react-router-dom';
  
export default function Nav() {
  return (
    <nav className='flex items-center justify-between py-4 bg-blue-900 text-white px-4'>
        <Link to="/">Zalex Inc.</Link>
        <ul className='flex space-x-4'>
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