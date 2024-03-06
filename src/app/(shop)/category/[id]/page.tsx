import { notFound } from 'next/navigation';

interface Props {
    params: {
        id: string
    }
}

const categories: String[] = ['men','women'];

export default function CategoryIdPage({params}: Props) {

    const {id} = params;

    if(!categories.includes(id)) {
        notFound();
    }

    return (
        <div>
            <h1>Hello Category Id Page {id}</h1>
        </div>
    );
}