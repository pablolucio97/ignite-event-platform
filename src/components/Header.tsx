import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Header() {
    return (
        <Link to='/'>
            <header className="w-full py-5 flex items-center justify-center bg-gray-900 border-b border-gray-600">
                <Logo />
            </header>
        </Link>
    )
}