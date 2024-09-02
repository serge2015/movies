import { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const [keyword, setKeyword] = useState('');
    let navigate = useNavigate();
    const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />

    return (
    <section id="landing">
        <header>
            <div className="header__container">
                <div className="header__description">
                    <h1>The open movie database</h1>
                    <h2>Search for any movie</h2>
                    <div className="input__search">
                        <input 
                            type="text" 
                            placeholder="type keyword" 
                            value={keyword} 
                            onChange={(event) => setKeyword(event.target.value)} 
                            onKeyDown={(event) => event.key === "Enter" && navigate(`/search/${keyword}`)}
                        />
                        <button className='search' onClick={() => navigate(`/search/${keyword}`)}>{searchIcon}</button>  
                    </div>
                </div>
            </div>
        </header>
    </section>
    )
}

export default Landing