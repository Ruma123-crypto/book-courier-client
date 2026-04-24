import React, { useContext } from 'react';
import Logo from '../Logo/Logo';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const {user, logOut}=useContext(AuthContext)
    const links=<>
     <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-books"> All Books</NavLink>
      </li>
       {
        user && <li>
        <NavLink to="lbdashboard/add-books">Librarian</NavLink>
      </li>
       }
        </>
          
        
          const handleLogOut=()=>
          {
            logOut()
            .then(res=>
              console.log(res)
            )
            .catch(error=>
            {
              console.log(error)
            }
            )
          }
    return (
         
        <div className="navbar  shadow-sm my-4 bg-white">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
        
      </ul>
    </div>
    <a className="btn btn-ghost text-xl"><Logo></Logo></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {
        links
      }
    </ul>
  </div>
  <div className="navbar-end ">
    {
  user?<a onClick={handleLogOut} className="btn bg-primary text-white">SignOut</a>:
 <Link to='/login' className="btn bg-primary text-white">Login</Link>
}
{user && (
  <NavLink className="btn ml-2 bg-primary text-white" to="/dashboard">Dashboard</NavLink>
)}
    
  </div>
</div>
    );
};

export default Navbar;