"use client"




const EmailSubscription = () => {
  return (
    <div className="w-full p-4 md:p-16 text-center  ">
       
        <h4 className="text-2xl md:text-4xl font-black">Recevez des notifcations des alertes meteo au Maroc</h4>
        <form className="w-full flex  justify-center items-center gap-4 p-8">
           <div className="w-full md:w-3/5 p-1 border rounded-md bg-gray-100 flex justify-center items-center gap-2">
           <input className="w-full bg-inherit outline-none " type="email" placeholder="votre email"/>
             <button className="bg-blue-500 text-white px-6 py-2 rounded-md">
                {"S'abonner"}
             </button>
           </div>
        </form>
      
    </div>
  )
}

export default EmailSubscription
