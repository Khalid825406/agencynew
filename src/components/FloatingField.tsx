"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
  type OptionHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

type BaseProps = {
  label: string;
  as?: "input" | "textarea" | "select";
  children?: ReactNode;
  error?: boolean;
  onValueChange?: (value: string) => void;
};

type FloatingFieldProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

function parseOptions(children: ReactNode) {
  return Children.toArray(children)
    .filter(isValidElement)
    .map((el) => {
      const props = el.props as OptionHTMLAttributes<HTMLOptionElement>;
      return {
        value: String(props.value ?? ""),
        label: typeof props.children === "string" ? props.children : String(props.value ?? ""),
        disabled: Boolean(props.disabled),
        hidden: Boolean(props.hidden),
      };
    })
    .filter((o) => !o.hidden);
}

function CustomSelect({
  id,
  label,
  active,
  error,
  name,
  required,
  defaultValue,
  children,
  onValueChange,
}: {
  id: string;
  label: string;
  active: boolean;
  error?: boolean;
  name?: string;
  required?: boolean;
  defaultValue?: string;
  children?: ReactNode;
  onValueChange?: (value: string) => void;
}) {
  const options = parseOptions(children);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(String(defaultValue ?? ""));
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  const choose = (v: string) => {
    setValue(v);
    setOpen(false);
    onValueChange?.(v);
  };

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`peer flex w-full items-center justify-between border-b bg-transparent pb-3 pt-6 text-left text-lg text-white outline-none transition-colors ${
          error ? "border-red-400/70" : "border-white/20 focus:border-blue-bright"
        }`}
      >
        <span className={selected ? "text-white" : "text-white/30"}>
          {selected?.label ?? ""}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-3 shrink-0 text-white/40"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.span>
      </button>

      {required && (
        <input
          tabIndex={-1}
          aria-hidden="true"
          value={value}
          required
          onChange={() => {}}
          className="absolute bottom-0 left-0 h-px w-px opacity-0"
        />
      )}

      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 transition-all duration-300 ${
          active
            ? "top-0 text-xs tracking-[0.1em] text-blue-bright uppercase"
            : "top-6 text-lg text-white/40"
        }`}
      >
        {label}
      </label>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-auto rounded-xl border border-white/10 bg-[#10151D] py-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {options.map((o) => {
              const isSelected = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={o.disabled}
                  onClick={() => choose(o.value)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                    o.disabled
                      ? "cursor-not-allowed text-white/20"
                      : isSelected
                        ? "text-blue-bright"
                        : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {o.label}
                  {isSelected && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                      <path d="M5 12.5 9.5 17 19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FloatingField({
  label,
  as = "input",
  children,
  error,
  onValueChange,
  ...props
}: FloatingFieldProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  // A <select> always renders some option's text, so its label reads better
  // pinned small/up permanently rather than floating like an empty text input.
  const active = as === "select" || focused || value.length > 0;

  if (as === "select") {
    return (
      <CustomSelect
        id={id}
        label={label}
        active={active}
        error={error}
        name={props.name}
        required={props.required}
        defaultValue={props.defaultValue as string | undefined}
        onValueChange={onValueChange}
      >
        {children}
      </CustomSelect>
    );
  }

  const shared = {
    id,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
    className: `peer w-full border-b bg-transparent pb-3 pt-6 text-lg text-white outline-none transition-colors ${
      error ? "border-red-400/70" : "border-white/20 focus:border-blue-bright"
    }`,
  };

  return (
    <div className="relative">
      {as === "textarea" ? (
        <textarea rows={3} {...shared} {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input {...shared} {...(props as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 transition-all duration-300 ${
          active
            ? "top-0 text-xs tracking-[0.1em] text-blue-bright uppercase"
            : "top-6 text-lg text-white/40"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
