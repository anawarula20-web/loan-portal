export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition duration-300 shadow-md"
    >
      {text}
    </button>
  );
}