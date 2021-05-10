import ListTask from './ListTask';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function KanbanCard({ title, todolist = [], id, index }) {
  return (
    <Droppable droppableId={title}>
      {(provider, snapshot) => (
        <div
          className="flex flex-col col-span-3"
          ref={provider.innerRef}
          {...provider.droppableProps}
        >
          <h1 className="font-semibold">{title}</h1>
          <div
            className="w-full bg-gray-100 rounded-md flex flex-col mt-5 p-3"
            style={{ minHeight: '200px' }}
          >
            <ul>
              {todolist.map((todo, index) => (
                <ListTask
                  id={todo.id}
                  key={todo.id}
                  content={todo.content}
                  index={index}
                />
              ))}
              {provider.placeholder}
            </ul>
          </div>
        </div>
      )}
    </Droppable>
  );
}
