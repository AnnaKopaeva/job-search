import classNames from 'classnames';

interface ButtonProps {
  title: string;
  type: "button" | "submit";
  className?: string;
}
 
export default function Button({ title, type = "button", className = "" }: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames("w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition", className)}
    >
      {title}
    </button>
  );
}
