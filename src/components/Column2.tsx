import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FC, useState } from 'react';
import SortableItem from './SortableItem';

interface Props {
    sorting: boolean;
}

const Column2: FC<Props> = ({ sorting }) => {
  const [items, setItems] = useState(['quick-links', 'time', 'calendar']);
  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    
    if (active.id !== over?.id) {
        const oldIndex = items.findIndex((item) => item === active.id);
        const newIndex = items.findIndex((item) => item === over?.id);
        const newArray = arrayMove(items, oldIndex, newIndex);

        setItems(newArray);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '33%' }}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext disabled={!sorting} items={items} strategy={verticalListSortingStrategy}>
            {items.map(id => <SortableItem key={id} id={id} />)}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Column2;
