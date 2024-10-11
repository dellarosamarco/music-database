import './Text.css';

type TextDefaultState = 'normal';

type TextFontWeight = TextDefaultState | 'bold';

type TextOverflow = TextDefaultState | 'ellipsis';

type TextColor = TextDefaultState | 'ghost' | 'black';

type TextSize = TextDefaultState | 'h1' | 'h2' | 'h3' | 'h4';

type TextProps = {
    children?: string | JSX.Element | JSX.Element[];
    fontWeight?: TextFontWeight;
    overflow?: TextOverflow;
    color?: TextColor;
    size?: TextSize;
}

const TextComponent = ({
    children,
    fontWeight = 'normal',
    overflow = 'normal',
    color = 'normal',
    size = 'normal'
}: TextProps) => {
    const getClasses = () => {
        const classes = ['text-component'];

        if (fontWeight === 'bold') classes.push('text-component--bold');
        if (overflow === 'ellipsis') classes.push('text-component--ellipsis');
        if (color === 'ghost') classes.push('text-component--ghost');
        if (color === 'black') classes.push('text-component--black');
        if (size === 'h1') classes.push('text-component--h1');
        if (size === 'h2') classes.push('text-component--h2');
        if (size === 'h3') classes.push('text-component--h3');
        if (size === 'h4') classes.push('text-component--h4');

        return classes.join(' ');
    }

    return (
        <p className={getClasses()}>{children}</p>
    );
}

export default TextComponent;