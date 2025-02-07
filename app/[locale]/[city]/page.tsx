

interface CityPageProps {
    params:Promise<{city:string}>
}


async function CityPage({params}:CityPageProps) {
    const {city} = await params
    if(!city) return null
  return (
    <div>
        {city}
    </div>
  )
}

export default CityPage