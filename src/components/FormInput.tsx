import { getSanitizer } from "@/utils/inputSanitizers";
import Link from "next/link";
import { useState } from "react";

interface ComponentProps {
  data: string;
  setData: (value: string) => void;
  type?: string; // input type real (HTML)
  kind?: string; // tipo lógico para sanitizar (email, slug, text, keywords, etc.)
  required?: boolean;
  disabled?: boolean;
  placeholder?: "";
  maxLength?: number;
  title?: string;
  cta?: string;
  href?: string;
}

export default function FormInput({
  data,
  setData,
  type = "text",
  kind = "text",
  required = true,
  disabled = false,
  placeholder = "",
  maxLength = 120,
  title = "",
  cta = "",
  href = "",
}: ComponentProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const sanitizer = getSanitizer(kind);
    const cleaned = sanitizer(inputValue);
    setData(cleaned);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderCTA = () => {
    if (!cta) return null;
    if (href && href.includes("/")) {
      return (
        <div className="text-sm">
          <Link className="font-semibold text-indigo-600 hover:text-indigo-500" href={href}>
            {cta}
          </Link>
        </div>
      );
    }
    return <div className="font-semibold">{cta}</div>;
  };

  const isPasswordType = type === "password";

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-color-heading block text-sm/6 font-medium">{title}</span>
        {renderCTA()}
      </div>

      <div className="relative mt-2">
        <input
          value={data}
          type={isPasswordType && showPassword ? "text" : type}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleChange}
          className="bg-color-main text-color-text placeholder:text-color-subtext ring-color-border focus:ring-color-primary block w-full rounded-md px-3 py-1.5 text-base ring-1 ring-inset focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm/6"
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-color-primary hover:text-color-secondary focus-visible:outline-color-primary absolute inset-y-0 right-3 flex items-center rounded-md px-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:-outline-offset-2"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
}

FormInput.defaultProps = {
  type: "text",
  kind: "text",
  required: true,
  disabled: false,
  placeholder: "",
  maxLength: 120,
  title: "",
  cta: "",
  href: "",
};
