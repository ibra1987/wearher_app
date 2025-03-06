

import { getLocale } from "next-intl/server";
import Link from "next/link";


export default async function NotFound(){
   const lang = await getLocale()
    return (
        <div className="w-full min-h-screen flex justify-center items-start pt-24">
            {"Nous n'avons pas trouver la page que vous cherchez,"}{" retour à la page"}<Link className="text-blue-500 font-medium underline ml-2 hover:text-blue-600" href={`/${lang}`}>{" d'acceuil"}</Link>
        </div>
    )
}