import Logo from "./Logo"
import Navbar from "./Navbar"






const Header = () => {
  return (
    <header className="w-full flex justify-between items-center p-4 ">
        <Logo/>
        <Navbar/>

    </header>
  )
}

export default Header