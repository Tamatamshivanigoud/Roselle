import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', id, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#1F2937]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`
            w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm
            text-[#1F2937] placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227]
            transition-all duration-200
            ${icon ? 'pl-11' : ''}
            ${error ? 'border-red-400 focus:ring-red-200' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', id, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#1F2937]">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`
          w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm
          text-[#1F2937] placeholder:text-gray-400 resize-none
          focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227]
          transition-all duration-200
          ${error ? 'border-red-400 focus:ring-red-200' : ''}
          ${className}
        `}
        rows={4}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ label, error, options, placeholder, className = '', id, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#1F2937]">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`
          w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm
          text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227]
          transition-all duration-200 cursor-pointer appearance-none
          ${error ? 'border-red-400 focus:ring-red-200' : ''}
          ${className}
        `}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};
