'use client';
import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
    quantity: number,
}

export const QuantitySelector = ({quantity}: Props) => {

    const [count, setCount] = useState(quantity);

    const onQuantityChange = (value: number) => {
        if(count === 0 && value===-1) return;
        setCount(c => c+value);
    };

    return (
        <div className="flex">
            <button onClick={() => onQuantityChange(-1)}>
                <IoRemoveCircleOutline size={30}/>
            </button>

            <div className='w-20 mx-3 px-5 bg-gray-100 flex items-center justify-center rounded font-bold'>{count}</div>

            <button onClick={() => onQuantityChange(1)}>
                <IoAddCircleOutline size={30}/>
            </button>
        </div>
    );
};
