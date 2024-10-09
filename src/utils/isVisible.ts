const isVisibleY = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if(rect.bottom < windowHeight) {
        return true;
    }
    return false;
}

export default isVisibleY;