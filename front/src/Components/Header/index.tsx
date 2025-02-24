import { Link } from 'react-router-dom';

function Header() {
    const LogoDonkey = require( '../../Assets/logo_DonkeyAir.png');


    return (

        <body>
            <nav className="top-top">
                <div className="top">
                    <div className="logo-top-left">
                        <Link className="nav-link" to="home"><img src={LogoDonkey} height="70px" alt="logo-donkey" /></Link>
                    </div>
                    <div className="right">
                        <Link to="login-admin"><span>Admin</span></Link>
                        <Link to="login-user"><span>Log in</span></Link>
                    </div>
                </div>
            </nav>

        </body>
    )
}
export default Header;