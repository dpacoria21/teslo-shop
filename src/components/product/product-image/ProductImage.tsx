import Image from 'next/image';

interface Props {
    src?: string,
    alt: string,
    className: React.StyleHTMLAttributes<HTMLImageElement>['className']
    width: number,
    height: number,
}

export const ProductImage = ({alt, src = '', className, width, height}: Props) => {

    let localSrc = '';
    if(src !== 'undefined') {
        localSrc = src.startsWith('http') ? src : `/products/${src}`; 
    }else {
        localSrc = '/imgs/placeholder.jpg';
    }

    return (
        <Image 
            src={localSrc}
            width={width}
            height={height}
            alt={alt}
            className={className}
        />
    );
};
