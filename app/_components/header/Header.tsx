import { getLocale } from "next-intl/server"
import LanguageToggler from "./language-toggler"
import Logo from "./Logo"
import Navbar from "./Navbar"






const Header = async () => {
  const locale = await getLocale()


  if(!locale) return null
  return (
    <header className={`w-full flex justify-between items-center p-4 ${locale === "ar" ? "flex-row-reverse":""}`}>
        <Logo/>
        <Navbar/>
        <LanguageToggler/>
 
    </header>
  )
}

export default Header