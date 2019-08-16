import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#FF0000' };
    }
    else {
        return { color: '#FFFFFF' };
    }
};
//color is not changing in tabs 






const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" sytle={isActive(history, '/')} to="/">Home</Link>
            </li>

            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" sytle={isActive(history, '/signin')} to="/signin">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" sytle={isActive(history, '/signup')} to="/signup">Sign Up</Link>
                    </li>
                </>
            )}

            {isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <a className="nav-link" sytle={{ cursor: "pointer", color: "#fff" }} onClick={() => signout(() => history.push('/'))}>Sign Out</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link">{isAuthenticated().user.name}</a>
                    </li>
                </>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);



