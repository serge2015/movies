import { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const [keyword, setKeyword] = useState('');
    const [id, setId] = useState('');
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
                            placeholder="type keyword or title" 
                            value={keyword} 
                            onChange={(event) => setKeyword(event.target.value)} 
                            onKeyDown={(event) => event.key === "Enter" && navigate(`/search/${keyword}/1`)}
                        />
                        <button className='search' onClick={() => 
                            navigate(`/search/${keyword}/1`)}>{searchIcon}</button>  
                    </div>
                    <div className="input__search second">
                    <p>Or search by IMDB ID:</p>
                        <input 
                            type="text" 
                            placeholder="type IMDB ID" 
                            value={id} 
                            onChange={(event) => setId(event.target.value)} 
                            onKeyDown={(event) => event.key === "Enter" && navigate(`/${id}`)}
                        />
                        <button className='search' onClick={() => 
                            navigate(`/${id}`)}>{searchIcon}</button>  
                    </div>
                </div>
            </div>
        </header>
    </section>
    )
}

export default Landing