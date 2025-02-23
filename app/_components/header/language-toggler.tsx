"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

const LanguageToggler = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams().toString();
  const [lang, setLang] = useState(locale);

  const newPathname = pathname.split("/").slice(2).join("/");

  const onchange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLang(value);

    // Use `value` instead of `lang` to ensure the latest selected language
    const fullPath = `/${value}/${newPathname}${searchParams ? `?${searchParams}` : ""}`;
    
    router.push(fullPath);
  };

  return (
    <select
      className="w-[160px] p-2 border rounded-md outline-none text-right"
      value={lang}
      onChange={onchange}
    >
      <option value="ar">العربية</option>
      <option value="fr">Francais</option>
    </select>
  );
};

export default LanguageToggler;
