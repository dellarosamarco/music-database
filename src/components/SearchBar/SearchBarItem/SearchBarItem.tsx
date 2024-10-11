import TextComponent from '../../Text/Text';
import './SearchBarItem.css';

type SearchBarItemProps = {
    name: string;
    description: string;
    image: string;
    onClick?: () => void;
}

export const SearchBarItem = ({
    name,
    description,
    image,
    onClick
}: SearchBarItemProps) => {
    return (
        <div className='search-bar__result' onClick={onClick}>
            <img src={image} alt='album-icon' className='search-bar__result-image'/>
            <div className='search-bar__result-info'>
                <TextComponent overflow='ellipsis'>{name}</TextComponent>
                <TextComponent overflow='ellipsis'>{description}</TextComponent>
            </div>
        </div>
    );
}