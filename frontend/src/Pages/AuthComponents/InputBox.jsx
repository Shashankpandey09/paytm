export const InputBox = ({label,type,placeholder,onChange}) => {
  return (
    <div className="px-4">
        <div className="text-md font-medium text-left py-2">
        {label}
      </div>
        <input type={type} required placeholder={placeholder} onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200"/>
    </div>
  )
}