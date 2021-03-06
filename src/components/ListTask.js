import { Draggable } from 'react-beautiful-dnd';

export default function ListTask({ id, content, index, removeList, category }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provider, snapshot) => (
        <li
          className={
            'bg-white rounded-md w-full p-3 font-semibold flex items-center mb-2 transform transition ' +
            (snapshot.isDragging && 'shadow-lg ')
          }
          ref={provider.innerRef}
          {...provider.dragHandleProps}
          {...provider.draggableProps}
        >
          <p className="flex-grow">{content}</p>
          <button onClick={() => removeList(category, id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current text-black hover:text-red-600 transition"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      )}
    </Draggable>
  );
}
