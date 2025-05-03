import { FaSpinner } from 'react-icons/fa';
function Button({ loading = false, onClick, className, children }) {
  const clazz = [
    'bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
    className,
  ].join(' ');

  const handleClick = () => {
    // onClick이 undefined 일 경우 아래 로직을 수행하지 않으면 에러를 방지할 수 있어요!
    if (!onClick) {
      return;
    }
    if (loading) {
      return;
    }
    onClick();
  };
  return (
    <button className={clazz} onClick={handleClick} disabled={loading}>
      <span className="flex items-center justify-center">
        {loading && <FaSpinner className="animate-spin mr-2" />}
        {children}
      </span>
    </button>
  );
}

export default Button;
