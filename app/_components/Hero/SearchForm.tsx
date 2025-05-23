"use client";

import { Button } from "@/components/ui/button"
import { useLocale } from "next-intl"
import { useState } from "react"

const SearchForm = () => {
    const lang = useLocale()
    const [query,setQuery]=useState("")
    
  return (
    <form  className="w-full md:w-3/5 flex justify-center items-center text-primary rounded-md border shadow-lg shadow-purple-200 bg-white p-1" action={`/${lang}/search?q=${query}`}>
     
      <input onChange={(e)=>setQuery(e.target.value)} className="p-2 w-full outline-none  " type="search" placeholder={lang === "fr" ? "Recherche..." : " بحث..."} />
      <Button  variant={"default"} className="px-6 ">
      {lang === "fr" ? "Recherche" : "بحث"}
      </Button>
    </form>
  )
}

export default SearchForm