import { ModeToggle } from "../theme-toggler"
import Logo from "./Logo"
import Navbar from "./Navbar"






const Header = () => {
  return (
    <header className="w-full flex justify-between items-center p-4 ">
        <Logo/>
        <Navbar/>
        <ModeToggle/>

    </header>
  )
}

export default Header