import Subtitle from './subtitle';

const ResultSubmit = ({ text, status }: { text: string; status: number }) => {
    // variables
    const statusColor = status === 200 ? 'text-green-500' : 'text-rose-500';
    return (
        <Subtitle
            additionalClasses={`${statusColor} max-w-[250px] text-center`}
            subtitle={text}
        />
    );
};

export default ResultSubmit;
