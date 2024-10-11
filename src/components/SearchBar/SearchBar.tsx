import './SearchBar.css';
import LensIcon from './../../assets/icons/lens.svg';
import { SearchBarItem } from './SearchBarItem/SearchBarItem';
import { useState } from 'react';
import TextComponent from '../Text/Text';
import Loader from '../Loader/Loader';

type SearchBarResult = {
    name: string;
    description: string;
    image: string;
    onClick?: () => void;
}

type SearchBarProps = {
    results?: SearchBarResult[];
    maxResults?: number;
    placeholder?: string;
    isLoading?: boolean;
    onSearch?: (searchTerm: string) => void;
}

const SearchBar = ({
    results=[],
    placeholder='',
    onSearch,
    isLoading=false
}: SearchBarProps) => {
    const [resultsPanelOpen, setResultsPanelOpen] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchTerm = e.target.value.toLowerCase();

        if(searchTerm === '') {
            setResultsPanelOpen(false);
            return;
        }

        onSearch?.(searchTerm);
        setResultsPanelOpen(true);
    }

    return (
        <div className='search-bar-container'>
            <div className='search-bar'>
                <img src={LensIcon} alt='search' className='search-bar__icon'/>
                <input 
                    placeholder={placeholder}
                    type='text'
                    className='search-bar__input' 
                    onChange={(e) => onChange(e)}
                    onClick={(e) => onChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
                />
            </div>
            <div className={`search-bar__items ${resultsPanelOpen ? 'search-bar__items--opened' : ''}`}>
                {!isLoading ? (
                    results.length > 0 ? results.map((result, index) => (
                        <SearchBarItem onClick={() => {
                            result.onClick?.();
                            setResultsPanelOpen(false);
                        }} key={index} name={result.name} description={result.description} image={result.image}></SearchBarItem>
                    )) 
                    :
                    <div className='search-bar__items--empty'>
                        <TextComponent color="ghost">No results found</TextComponent>
                    </div>
                ) : <div className='search-bar__items--empty'><Loader></Loader></div>}
            </div>
            <div
                // L'overlay andrebbe gestito a livello di tutto l'applicativo con un componente dedicato e gestito da Redux, e non da questo componente.
                // Ma per mancanza di tempo lo gestisco direttamente qui.
                className={`search-bar__overlay ${resultsPanelOpen ? 'search-bar__overlay--opened' : ''}`}
                onClick={() => setResultsPanelOpen(false)}
            ></div>
        </div>
    );
}

export default SearchBar;