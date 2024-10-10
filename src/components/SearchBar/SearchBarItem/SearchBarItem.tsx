import TextComponent from '../../Text/Text';
import './SearchBarItem.css';

type SearchBarItemProps = {
    name: string;
    description: string;
    image: string;
}

export const SearchBarItem = ({
    name,
    description,
    image
}: SearchBarItemProps) => {
    return (
        <div className='search-bar__result'>
            <img src={image} alt='album-icon' className='search-bar__result-image'/>
            <div className='search-bar__result-info'>
                <TextComponent>{name}</TextComponent>
                <TextComponent>{description}</TextComponent>
            </div>
        </div>
    );
}