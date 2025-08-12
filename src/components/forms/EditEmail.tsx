interface ComponentProps {
  data: string;
  setData: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  maxTextLength?: number;
  placeholder?: string;
  title?: string;
  description?: string;
}

export default function EditEmail({
  data,
  setData,
  required = false,
  disabled = false,
  maxTextLength = 120,
  placeholder = "",
  title = "",
  description = "",
}: ComponentProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    inputValue = inputValue
      .replace(/<script.*?>.*?<\/script>/gi, "") // Remover script tags
      .replace(/<\/?[^>]+(>|$)/g, "") // Remover HTML tags
      .replace(/[;:"!]/g, ""); // Remueve ; : " !

    setData(inputValue);
  };

  return (
    <div>
      <span className="dark:text-dark-txt block text-sm font-bold text-gray-900">{title}</span>
      <span className="dark:text-dark-txt-secondary mb-2 block text-sm text-gray-500">
        {description}
      </span>
      <input
        type="email"
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        value={data}
        maxLength={maxTextLength}
        className="outline-color-border placeholder:text-color-subtext focus:outline-color-secondary text-color-text w-full min-w-0 rounded-md px-3 py-1.5 text-base outline outline-1 -outline-offset-1 focus:outline focus:outline-2 focus:-outline-offset-2 sm:w-64 sm:text-sm/6 xl:w-full"
        onChange={handleInputChange}
      />
    </div>
  );
}

EditEmail.defaultProps = {
  required: false,
  disabled: false,
  maxTextLength: 120,
  showMaxTextLength: false,
  placeholder: "",
  title: "",
  description: "",
};
