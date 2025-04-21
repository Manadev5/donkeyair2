import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

function Header() {
    const LogoDonkey = require( '../../Assets/logo_DonkeyAir.png');
    const {isAuthenticated, logout} = useAuth();


    return (

        <body>
            <nav className="top-top">
                <div className="top">
                    <div className="logo-top-left">
                        <Link className="nav-link" to="home"><img src={LogoDonkey} height="70px" alt="logo-donkey" /></Link>
                    </div>
                    
                        {isAuthenticated? <button onClick={logout}>se deconnecter</button>
                            : 
                            <div className="right">   
                                <Link to="login-user"><span>se connecter</span></Link><br></br>
                                <Link to="registration-user"><span>créer un compte</span></Link>
                            </div>}

                </div>
            </nav>

        </body>
    )
}
export default Header;