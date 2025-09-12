import { FormMultiSelect } from '@/components/form-components';
import { AvailableTagsType } from './tags-catalog';
import { useGetTags } from './tags-endpoints';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreateTagModal from './CreateTagModal';
import { useState } from 'react';

type Props = {
    multiSelectProps?: React.ComponentProps<typeof FormMultiSelect>;
    category: AvailableTagsType;
    name: string;
};

const TagsSelect: React.FC<Props> = (props) => {
    const { data, isFetching } = useGetTags({ category: props.category });
    const tags = data?.map((tag) => ({ value: tag.id.toString(), label: tag.name })) || [];
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex gap-2 items-center">
                <FormMultiSelect
                    className="w-full"
                    loading={isFetching}
                    options={tags}
                    name={props.name}
                    {...props.multiSelectProps}
                />
                <Button variant={'success'} onClick={() => setOpen(true)}>
                    <Plus />
                </Button>
            </div>
            <CreateTagModal
                open={open}
                onOpenChange={(open) => setOpen(open)}
                category={props.category}
            />
        </>
    );
};

export default TagsSelect;
