export default function Button(props) {
  return (
    <button className="bg-white transition p-3 w-max rounded-lg font-bold shadow focus:outline-none transform hover:-translate-y-1 ">
      {props.children}
    </button>
  );
}
