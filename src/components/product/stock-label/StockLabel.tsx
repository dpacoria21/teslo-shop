'use client';

import { getStockBySlug } from '@/actions/product/get-stock-by-slug';
import { titleFont } from '@/config/fonts';
import { useEffect, useState } from 'react';

interface Props {
    slug: string,
}

export const StockLabel = ({slug}: Props) => {
    const getStock = async() => {
        const stock = await getStockBySlug(slug); 
        setStock(stock);
        setIsLoading(false);
    };

    // const product = getProductBySlug(slug)
    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    // .then((res) => console.log(res));

    useEffect(() => {
        getStock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            {
                isLoading 
                    ?   (<h1 className={`${titleFont.className} antialiased font-medium text-lg bg-slate-300 animate-pulse rounded-sm`}>
                    &nbsp;
                    </h1>)
                    :   (<h1 className={`${titleFont.className} antialiased font-medium text-lg`}>Stock: {stock}</h1>)
            }
        </>
    );
};
