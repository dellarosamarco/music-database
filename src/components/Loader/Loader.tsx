import './Loader.css';

type LoaderDefaultState = 'normal';

type LoaderProps = {
    size?: LoaderDefaultState | 'lg';
}

const Loader = ({
    size
}: LoaderProps) => {
    const getClasses = () => {
        const classes = ['loader'];
        if (size === 'lg') classes.push('loader--lg');
        return classes.join(' ');
    }

    return <div role="status" className={getClasses()}></div>
}

export default Loader;