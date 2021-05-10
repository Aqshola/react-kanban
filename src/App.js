import React from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import KanbanCard from './components/KanbanCard';
import { useEffect } from 'react';
import { uid } from 'uid';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
    list: [],
  },
  {
    category: 'In Progress',
    list: [],
  },

  {
    category: 'In Review',
    list: [],
  },
];

function App() {
  const [kanbanList, setkanbanList] = useState(dataTemplate);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // handle if drag with no destination
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
      if (result.type === 'container') {
        const orderData = reorder(
          kanbanList,
          result.source.index,
          result.destination.index
        );

        setkanbanList(orderData);
      } else {
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
      }
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
    setKanbanStorage();
  };

  const _addNewList = (idKanban, value) => {
    const indexCard = kanbanList.map((res) => res.category).indexOf(idKanban);
    const dataTemp = Array.from(kanbanList);

    const newList = {
      id: uid(),
      content: value,
    };
    dataTemp[indexCard].list.push(newList);

    setkanbanList(dataTemp);
    setKanbanStorage();
  };

  const _removeList = (kanbanCategory, idValue) => {
    const indexCard = kanbanList
      .map((res) => res.category)
      .indexOf(kanbanCategory);
    const dataTemp = Array.from(kanbanList);
    const res = dataTemp[indexCard].list.filter((res) => res.id !== idValue);

    dataTemp[indexCard].list = res;

    setkanbanList(dataTemp);
    setKanbanStorage();
  };

  const setKanbanStorage = () => {
    localStorage.setItem('kanban', JSON.stringify(kanbanList));
  };

  useEffect(() => {
    const storageKanban = JSON.parse(localStorage.getItem('kanban'));
    if (storageKanban !== null) {
      setkanbanList(storageKanban);
    } else {
      localStorage.setItem('kanban', JSON.stringify(dataTemplate));
    }
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>React DND - Kanban</title>
          <meta
            name="description"
            content="Simple Kanban Board for learning React DnD Beautiful"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@React DnD - Kanban" />
          <meta property="og:url" content="https://react-kanban.vercel.app/" />
          <meta property="og:title" content="React DnD - Kanban" />
          <meta
            property="og:description"
            content="Simple Kanban Board for learning React DnD Beautiful"
          />
        </Helmet>
      </HelmetProvider>

      <div className="max-w-screen-lg mx-auto ">
        <div className="p-5 text-center ">
          <h1 className="text-3xl font-bold">Simple Kanban React</h1>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="container"
            type="container"
            direction="horizontal"
          >
            {(provider, snapshot) => (
              <div
                className="mt-10 w-full flex justify-between gap-10"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {kanbanList.map((kanban, index) => (
                  <KanbanCard
                    addListFunc={_addNewList}
                    title={kanban.category}
                    todolist={kanban.list}
                    key={kanban.category}
                    index={index}
                    delFunc={_removeList}
                  />
                ))}
                {provider.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
