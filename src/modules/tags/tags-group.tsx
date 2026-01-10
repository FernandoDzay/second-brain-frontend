import { Tag } from '@/common/entity-types';
import { Badge } from '@/components/ui/badge';

type Props = {
    tags?: Tag[];
};

const TagsGroup: React.FC<Props> = ({ tags }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
                <Badge key={tag.id} variant={'secondary'}>
                    {tag.name}
                </Badge>
            ))}
        </div>
    );
};

export default TagsGroup;
