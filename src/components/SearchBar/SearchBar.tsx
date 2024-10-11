import './SearchBar.css';
import LensIcon from './../../assets/icons/lens.svg';
import { SearchBarItem } from './SearchBarItem/SearchBarItem';
import { useState } from 'react';
import TextComponent from '../Text/Text';

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
}

const SearchBar = ({
    results=[],
    maxResults=5,
    placeholder=''
}: SearchBarProps) => {
    const [resultsPanelOpen, setResultsPanelOpen] = useState(false);
    const [resultsFound, setResultsFound] = useState<SearchBarResult[]>([]);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchTerm = e.target.value.toLowerCase();

        if(searchTerm === '') {
            setResultsPanelOpen(false);
            return;
        }

        setResultsPanelOpen(true);

        const filteredResults = 
            results
            .slice(0, maxResults)
            .filter(
                result => (
                    result.name.toLowerCase().includes(searchTerm) ||
                    result.description.toLocaleLowerCase().includes(searchTerm)
                )
            );
        
        setResultsFound(filteredResults);
    }

    return (
        <div className='search-bar-container'>
            <div className='search-bar'>
                <img src={LensIcon} alt='search' className='search-bar__icon'/>
                <input 
                    placeholder={placeholder}
                    type='text'
                    className='search-bar__input' 
                    onChange={(e) => onSearch(e)}
                    onClick={(e) => onSearch(e as unknown as React.ChangeEvent<HTMLInputElement>)}
                />
            </div>
            <div className={`search-bar__items ${resultsPanelOpen ? 'search-bar__items--opened' : ''}`}>
                {
                    resultsFound.length > 0 ? resultsFound.map((result, index) => (
                        <SearchBarItem onClick={() => {
                            result.onClick?.();
                            setResultsPanelOpen(false);
                        }} key={index} name={result.name} description={result.description} image={result.image}></SearchBarItem>
                    )) 
                    :
                    <div className='search-bar__items--empty'>
                        <TextComponent color="ghost">No results found</TextComponent>
                    </div>
                }
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