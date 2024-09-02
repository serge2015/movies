import React from 'react'
import Logo from '../assets/Library.svg'
import { Link } from 'react-router-dom'
import MovieDbLogo from '../assets/Logo_w_text_transparent.png'


const Footer = () => {
    function currentYear() {
        return new Date().getFullYear();
    }
    return(
        <footer>
            <div className="footer__container">
                <div className="row row__column">
                <Link to="/">
                <img src={MovieDbLogo} alt="Logo" className="logo" width={32} height={32}/>            
            </Link>
                    <div className="footer__copyright">
                        Copyright &copy; {currentYear()} Moviebase
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer