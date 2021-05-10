import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import KanbanCard from './components/KanbanCard';
import { useEffect } from 'react';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const dataTemplate = [
  {
    category: 'To Do',
    list: [
      {
        id: 'abc',
        content: 'mandi',
      },
      {
        id: 'dbc',
        content: 'makan',
      },
    ],
  },
  {
    category: 'In Progress',
    list: [
      {
        id: 'cba',
        content: 'mandi',
      },
      {
        id: 'bdc',
        content: 'makan',
      },
    ],
  },

  {
    category: 'In Review',
    list: [
      {
        id: 'xyz',
        content: 'mandi',
      },
      {
        id: 'zyx',
        content: 'makan',
      },
    ],
  },
];

function App() {
  const [kanbanList, setkanbanList] = useState(dataTemplate);

  const onDragEnd = (result) => {
    console.log(result);

    //handle if drag with no destination
    if (!result.destination) {
      return;
    }

    //handle drag and drop if drag source and drop destination is same todo
    if (
      result.destination.index === result.source.index &&
      result.source.droppableId === result.destination.droppableId
    ) {
      return;
    }

    const tempData = Array.from(kanbanList); //temp data for kanbanlist

    /* 
    handle drag and drop if drag source todo is different 
    with drop destination todo but within same kanbanCard
    */
    if (result.source.droppableId === result.destination.droppableId) {
      const parentOfTodoIndex = kanbanList
        .map((res) => res.category)
        .indexOf(result.source.droppableId);

      const orderData = reorder(
        kanbanList[parentOfTodoIndex].list,
        result.source.index,
        result.destination.index
      );

      tempData[parentOfTodoIndex].list = orderData;

      setkanbanList(tempData);
    } else {
      /*
    handle drag and drop if drag source todo and drop destination todo
    is different with diffrent kanbanCard
    */
      const indexSource = result.source.index;
      const indexDest = result.destination.index;

      const sourceOfTodoIndex = kanbanList
        .map((res) => res.category)
        .indexOf(result.source.droppableId);

      const destinationOfTodoIndex = kanbanList
        .map((res) => res.category)
        .indexOf(result.destination.droppableId);

      const [removed] = tempData[sourceOfTodoIndex].list.splice(indexSource, 1);

      tempData[destinationOfTodoIndex].list.splice(indexDest, 0, removed);

      setkanbanList(tempData);
    }
  };

  // useEffect(() => {
  //   const storageKanban = JSON.parse(localStorage.getItem('kanban'));
  //   if (storageKanban !== null) {
  //     setkanbanList(storageKanban);
  //   } else {
  //     localStorage.setItem('kanban', JSON.stringify(dataTemplate));
  //   }
  // }, []);

  return (
    <div className="max-w-screen-lg mx-auto ">
      <div className="p-5 text-center ">
        <h1 className="text-3xl font-bold">Simple Kanban React</h1>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mt-10 w-full grid grid-cols-9 gap-10">
          {kanbanList.map((kanban) => (
            <KanbanCard
              title={kanban.category}
              todolist={kanban.list}
              key={kanban.category}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
