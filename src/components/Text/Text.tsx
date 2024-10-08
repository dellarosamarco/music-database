import './Text.css';

type TextDefaultState = 'normal';

type TextFontWeight = TextDefaultState | 'bold';

type TextOverflow = TextDefaultState | 'ellipsis';

type TextColor = TextDefaultState | 'ghost';

type TextProps = {
    children: string | JSX.Element | JSX.Element[];
    fontWeight?: TextFontWeight;
    overflow?: TextOverflow;
    color?: TextColor;
}

const TextComponent = ({
    children,
    fontWeight = 'normal',
    overflow = 'normal',
    color = 'normal'
}: TextProps) => {
    const getClasses = () => {
        const classes = ['text-component'];

        if (fontWeight === 'bold') classes.push('text-component--bold');
        if (overflow === 'ellipsis') classes.push('text-component--ellipsis');
        if (color === 'ghost') classes.push('text-component--ghost');

        return classes.join(' ');
    }

    return (
        <p className={getClasses()}>{children}</p>
    );
}

export default TextComponent;