type TextProps = {
    children: string | JSX.Element | JSX.Element[];
}

const TextComponent = ({
    children
}: TextProps) => {
    return (
        <p>{children}</p>
    );
}

export default TextComponent;