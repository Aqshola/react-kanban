import { uid } from 'uid';

const kanban = [
  {
    id: uid(),
    category: 'On going',
    todo: [],
  },
  {
    id: uid(),
    category: 'finish',
    todo: [],
  },
];

export default kanban;
