import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';


export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/30",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
    ghost: "hover:bg-slate-800 text-slate-400 hover:text-white",
    outline: "border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white"
  };
  return <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>{children}</button>;
};


export const Input = ({ label, type = "text", value, onChange, placeholder, error, icon: Icon, disabled, readOnly }) => (
  <div className="w-full">
    {label && <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>}
    <div className="relative group">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} readOnly={readOnly}
        className={`w-full bg-slate-900/50 border ${error ? 'border-red-500/50' : 'border-slate-700'} focus:border-indigo-500 text-slate-200 rounded-lg py-2.5 ${Icon ? 'pl-10' : 'pl-4'} pr-4 outline-none transition-all focus:ring-1 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-900/20`} />
    </div>
    {error && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {error}</p>}
  </div>
);


export const Card = ({ children, className = '' }) => (
  <div className={`bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl ${className}`}>{children}</div>
);


export const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  const styles = {
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    error: "bg-red-500/10 border-red-500/20 text-red-400",
    info: "bg-blue-500/10 border-blue-500/20 text-blue-400"
  };
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md animate-slide-up ${styles[type]}`}>
      {type === 'success' && <CheckCircle2 size={18} />}
      {type === 'error' && <AlertCircle size={18} />}
      <span className="font-medium text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={16} /></button>
    </div>
  );
};


export const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "in-progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  };
  return <span className={`text-xs font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide ${styles[status] || styles.pending}`}>{status}</span>;
};