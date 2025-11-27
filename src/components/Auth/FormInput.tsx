interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  readOnly?: boolean;
}

export default function FormInput({ label, name, type, value, onChange, placeholder, required = false, readOnly = false }: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        className={`w-full px-4 py-3 ${readOnly ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700'} border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        placeholder={placeholder}
      />
    </div>
  );
}