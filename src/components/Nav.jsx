import React from "react";
import MovieDbLogo from '../assets/Logo_w_text_transparent.png'
import { Link } from "react-router-dom";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Nav = () => {
    function openMenu() {
        document.body.classList += " menu--open"
    }

    function closeMenu() {
        document.body.classList.remove('menu--open')
    }

    const barsIcon = <FontAwesomeIcon icon={faBars} />
    const closeIcon = <FontAwesomeIcon icon={faTimes} />


    return (
    <nav>
        <div className="nav__container">
            <Link to="/">
                <img src={MovieDbLogo} alt="Logo" className="logo" width={32} height={32}/>            
            </Link>
            <ul className="nav__links">
                <li className="nav__list">
                    <Link to="/" className="nav__link">
                        Search
                    </Link>
                </li>

                <button className="btn__menu" onClick={openMenu}>
                    {barsIcon}
                </button>

            </ul>
            <div className="menu__backdrop">
                <button className="btn__menu btn__menu--close" onClick={closeMenu}>{closeIcon}
                </button>
                <ul className="menu__links">
                    <li className="menu__list">
                    <Link to="/" className="nav__link" onClick={closeMenu}>
                        Search
                    </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}
export default Nav