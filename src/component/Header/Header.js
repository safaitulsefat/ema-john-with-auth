import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    const [logInUser,setLogInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo} alt="" />
             <nav>
                 <Link to="/shop">shop</Link>
                 <Link to="/review">Review</Link>
                 <Link to="/inventory">Manage Iventory</Link>
                 <button onClick={()=>setLogInUser({})}>sign out</button>
             </nav>
        </div>
    );
};

export default Header;