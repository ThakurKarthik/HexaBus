
function getBusesInRoutes(routesIds,routesData){
    const buses=[]
    routesIds.forEach(routeId=>{
        const route=routesData.find(route=>route.id===routeId)
        route.buses && route.buses.forEach(busObject=>{
            buses.push(busObject)
        })
    })
    return buses
}