import { useEffect } from "react";

export type ToastProps = {
  message: string;
  type?: "error" | "success";
  onClose: () => void;
};

export default function Toast({ message, type = "error", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isError = type === "error";
  const bgColor = isError ? "bg-red-600" : "bg-green-100";
  const textColor = isError ? "text-white" : "text-green-900";
  const borderColor = isError ? "border-red-700" : "border-green-400";
  const icon = isError ? (
    <svg className="w-6 h-6 text-red-100" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
  ) : (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
  );

  return (
    <div
      className={`fixed top-8 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-lg shadow-xl border-l-8 ${bgColor} ${borderColor} ${textColor} animate-fade-in transition-all min-w-[320px] max-w-[90vw]`}
      role="alert"
      style={{ borderLeftWidth: 8 }}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="font-semibold text-base">{message}</span>
    </div>
  );
}
