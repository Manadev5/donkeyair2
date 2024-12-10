import LogoDonkey from '../../Assets/logo_DonkeyAir.png';
import { Link } from 'react-router-dom';

function Header() {

    return (

        <body>
            <nav class="top-top">
                <div class="top">
                    <div class="logo-top-left">
                        <Link class="nav-link" to="home"><img src={LogoDonkey} height="70px" alt="logo-donkey" /></Link>
                    </div>
                    <div class="right">
                        <Link to="login-admin"><span>Admin</span></Link>
                        <Link to="login-user"><span>Log in</span></Link>
                    </div>
                </div>
            </nav>

        </body>
    )
}
export default Header;