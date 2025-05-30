import { Field as FormikField } from 'formik';
import classNames from 'classnames';

interface FieldProps {
  title: string;
  name: string;
  type: string;
  value?: string;
  error?: string;
  className?: string;
}
 
export default function Field({ title, name, type, value, error = "", className = "" }: FieldProps) {
  return (
   <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {title}
      </label>
      <FormikField
        name={name}
        type={type}
        value={value}
        className={classNames(`px-3 py-2 text-gray-800 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500`, className)}
      />
      {error && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
 );
}
