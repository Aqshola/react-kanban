import ListTask from './ListTask';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';

export default function KanbanCard({
  title,
  todolist = [],
  index,
  addListFunc,
  delFunc,
}) {
  const [form, setform] = useState('');

  const _handleChange = (e) => {
    setform(e.target.value);
  };

  const _handlePress = (e) => {
    if (e.key === 'Enter') {
      addListFunc(title, form);
      setform('');
    }
  };

  return (
    <Draggable draggableId={title} index={index} key={index}>
      {(provider, snapshot) => (
        <div
          className="w-64"
          ref={provider.innerRef}
          {...provider.draggableProps}
          {...provider.dragHandleProps}
        >
          <Droppable droppableId={title} direction="vertical">
            {(provider, snapshot) => (
              <div
                className="flex flex-col "
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                <h1 className="font-semibold">{title}</h1>
                <div
                  className="w-full bg-gray-100 rounded-md flex flex-col mt-5 p-3"
                  style={{ minHeight: '200px' }}
                >
                  <ul className="flex-grow">
                    {todolist.map((todo, index) => (
                      <ListTask
                        id={todo.id}
                        key={todo.id}
                        content={todo.content}
                        index={index}
                        removeList={delFunc}
                        category={title}
                      />
                    ))}
                    {provider.placeholder}
                  </ul>
                  <input
                    type="text"
                    placeholder="New List"
                    className="p-2"
                    onChange={_handleChange}
                    onKeyPress={_handlePress}
                    value={form}
                  />
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
