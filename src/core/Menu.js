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

            <li className="nav-item">
                <Link className="nav-link" sytle={isActive(history, '/users')} to="/users">Users</Link>
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
                        <span className="nav-link" 
                        sytle={(isActive(history,'signup'),
                        { cursor: "pointer", color: "#fff" })
                        }   
                        onClick={() => signout(() => history.push('/'))}>Sign Out
                        </span>
                    </li>

                    <li className="nav-item">
                        <span className="nav-link">
                            <Link to={`/user/${isAuthenticated().user._id}`} sytle={{color:'#fff'}}>
                                {`${isAuthenticated().user.name}'s profile`}
                            </Link>
                        </span>
                    </li>
                </>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);



