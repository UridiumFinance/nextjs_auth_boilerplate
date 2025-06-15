type ButtonProps = {
  children: React.ReactNode;
  icon?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  icon,
  type = "button",
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      {...props}
      className={`bg-color-primary hover:bg-color-secondary flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
    >
      {icon && <div className={icon} aria-hidden="true" />}
      <span className="flex-1 text-center">{children}</span>
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  icon: "",
};
