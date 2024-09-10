import { FC } from "react";
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import QuickLinks from "../cards/QuickLinks";
import Time from "../cards/Time";
import CalendarCard from "../cards/CalendarCard";

interface Props {
    id: string;
}

const SortableItem: FC<Props> = ({ id }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: id,
      });
    
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

      const GetComponent = () => {
        switch (id) {
          case 'quick-links':
            return <QuickLinks />;
          case 'time':
            return <Time />;
          case 'calendar':
            return <CalendarCard />;
          default:
            return null;
        }
      }

      return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <GetComponent />
        </div>
      )
};

export default SortableItem;