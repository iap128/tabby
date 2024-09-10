import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FC, useState } from 'react';
import SortableItem from './SortableItem';

interface Props {
  sorting: boolean;
  columnName: string;
  cards: string[];
}

const CardsColumn: FC<Props> = ({ sorting, columnName, cards }) => {
  const [items, setItems] = useState(cards);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item === active.id);
      const newIndex = items.findIndex(item => item === over?.id);
      const newArray = arrayMove(items, oldIndex, newIndex);

      setItems(newArray);

      window.localStorage.setItem(columnName, newArray.toString());
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext disabled={!sorting} items={items} strategy={verticalListSortingStrategy}>
        {items.map(id => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default CardsColumn;
