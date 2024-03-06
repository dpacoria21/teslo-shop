
interface Props {
    params: {
        id: string
    }
}

export default function CategoryIdPage({params}: Props) {
    return (
        <div>
            <h1>Hello Category Id Page {params.id}</h1>
        </div>
    );
}