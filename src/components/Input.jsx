import { useId } from 'react';

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  disabled = false,
  required = false,
  minLength,
  helperText,
}) {
  const id = useId();
  const hasValue = Boolean(value);

  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-2 block body-sm text-neutral-500">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
        minLength={minLength}
        aria-describedby={helperText ? `${id}-help` : undefined}
        className={`h-[52px] w-full rounded-xl border bg-white px-4 py-2 text-base leading-[1.4] outline-none transition-colors placeholder:text-neutral-300 focus:border-2 focus:border-primary-600 focus:ring-2 focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-neutral-100 disabled:text-neutral-200 disabled:placeholder:text-neutral-200 ${hasValue ? 'border-primary-500 text-neutral-500' : 'border-neutral-200 text-neutral-500'}`}
      />
      {helperText && <p id={`${id}-help`} className="mt-1.5 caption text-neutral-300">{helperText}</p>}
    </div>
  );
}
