// FormField.tsx
type FormFieldProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormField = ({
  label,
  name,
  type,
  value,
  onChange,
}: FormFieldProps) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={name}
      className="text-sm text-gray-700 font-medium"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={name}
      required
      className="px-3 py-2 border border-gray-300 rounded-md bg-[#fdfcf8] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition duration-150"
    />
  </div>
);
