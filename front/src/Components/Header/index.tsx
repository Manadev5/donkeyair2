import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import  logo from '../../Assets/logo_DonkeyAir.png';

function Header() {
    const {isAuthenticated, logout} = useAuth();


    return (

        <div>
            <nav className="top-top">
                <div className="top">
                    <div className="logo-top-left">
                        <Link className="nav-link" to="home"><img src={logo} height="70px" alt="logo-donkey" /></Link>
                    </div>
                    
                        {isAuthenticated? <button onClick={logout}>se deconnecter</button>
                            : 
                            <div className="right">   
                                <Link to="login-user"><span>se connecter</span></Link><br></br>
                                <Link to="registration-user"><span>créer un compte</span></Link>
                            </div>}

                </div>
            </nav>

        </div>
    )
}
export default Header;