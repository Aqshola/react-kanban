export default function NewCard(display) {
  return (
    <div
      className={
        'w-56 h-auto p-4 bg-gray-100 shadow-md ' +
        (display === true ? '' : 'hidden')
      }
    >
      <div>
        <input
          type="text"
          placeholder="title card"
          className="transition p-2 bg-transparent font-bold focus:bg-gray-400 w-full focus:outline-none focus:placeholder-black"
          autoFocus
        />
        <ul
          className=""
          style={{
            minHeight: '50px',
          }}
        ></ul>
        <input
          type="text"
          placeholder="todo"
          className="transition p-2 bg-transparent font-bold focus:bg-gray-400 w-full focus:outline-none focus:placeholder-black"
        />
      </div>
      <button className="p-2 font-bold bg-white rounded shadow-md mt-3">
        Save
      </button>
    </div>
  );
}
