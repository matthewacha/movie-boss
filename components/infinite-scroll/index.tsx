import { useRef, useEffect } from 'react';

interface Props {
    handlePageChange: () => void;
}

export default function InfiniteScroll({ handlePageChange }: Props) {
    const loader = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const loaderElement = loader.current;
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && loader.current) {
                handlePageChange();
            }
        };
        const observer = new IntersectionObserver(handleObserver);
        if (loaderElement) observer.observe(loaderElement);

        return () => {
            if (loaderElement) {
                observer.unobserve(loaderElement);
            }
        };
    }, [handlePageChange]);

    return <div ref={loader} />;
}
