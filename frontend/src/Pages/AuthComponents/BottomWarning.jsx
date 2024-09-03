import { Link } from "react-router-dom"

export function BottomWarning({label, buttonText, to}) {
    return <div className="pb-2  text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer hover:font-bold  transition-all ease-in-out" to={to}>
        {buttonText}
      </Link>
    </div>
}