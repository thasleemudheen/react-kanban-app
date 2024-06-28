import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function Task() {
  const [count, setCount] = useState([
    {
      name: 'thasleem',
      age: 23,
      place: 'vatakara',
    },
    {
      name: 'muhammed',
      age: 23,
      place: 'vatakara',
    },
    {
      name: 'abdulla',
      age: 23,
      place: 'vatakara',
    },
    {
      name: 'master',
      age: 23,
      place: 'vatakara',
    },
  ]);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    
    if (!destination) {
      return;
    }

    const items = Array.from(count);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setCount(items);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dragAndDrop">
          {(provided) => (
            <ul
              className="dragAndDrop"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {count.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                    >
                      {item.name}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
