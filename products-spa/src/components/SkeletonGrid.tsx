import SkeletonCard from './SkeletonCard';

interface Props {
    count: number;
}

const SkeletonGrid = ({ count }: Props) => {
    return (
        <div className="pets-page__grid">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};

export default SkeletonGrid;