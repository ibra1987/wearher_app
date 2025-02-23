import { navlinks } from "@/contants";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";






const Navbar = () => {
  const locale = useLocale()
    const t = useTranslations('Navbar');
  return (
    <nav className=" flex justify-end">
      <ul className={`flex justify-center items-center gap-4  `}>
       {navlinks.map((link)=>(
        <li key={link.name}>
           <Link className="hover:text-muted-foreground" href={link.path}>{t(link.name)}</Link>
        </li>
       ))}
        </ul>
    </nav>
  )
}

export default Navbar