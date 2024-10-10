import './SearchBar.css';
import LensIcon from './../../assets/icons/lens.svg';
import { SearchBarItem } from './SearchBarItem/SearchBarItem';
import { useState } from 'react';
import TextComponent from '../Text/Text';

type SearchBarResult = {
    name: string;
    description: string;
    image: string;
}

type SearchBarProps = {
    results?: SearchBarResult[];
    maxResults?: number;
}

const SearchBar = ({
    results=[],
    maxResults=5
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
                    className='search-bar__input' 
                    onChange={(e) => onSearch(e)}
                    onClick={(e) => onSearch(e)}
                />
            </div>
            <div className={`search-bar__items ${resultsPanelOpen ? 'search-bar__items--opened' : ''}`}>
                {
                    resultsFound.length > 0 ? resultsFound.map((result, index) => (
                        <SearchBarItem key={index} name={result.name} description={result.description} image={result.image}></SearchBarItem>
                    )) 
                    :
                    <div className='search-bar__items--empty'>
                        <TextComponent color="ghost">No results found</TextComponent>
                    </div>
                }
            </div>
            <div 
                className={`search-bar__overlay ${resultsPanelOpen ? 'search-bar__overlay--opened' : ''}`}
                onClick={() => setResultsPanelOpen(false)}
            ></div>
        </div>
    );
}

export default SearchBar;