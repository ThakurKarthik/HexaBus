
function convertRoutes(routesDB){
    const routes=[]
    routesDB.forEach(numberNames=>{
        let routeObject={}
        numberNames.val().forEach(routeKey=>{
            if(routeKey.key==='buses'){
                const buses=[]
                routeKey.val().forEach(busNumbers=>{
                    let busObject={}
                    busObject['id']=busNumbers.val()
                    buses.push(busObject)    
                })
                routeObject['buses']=buses    
            }else if(routeKey.key==='via'){
                const via=[]
                routeKey.val().forEach(viaNumbers=>{
                    let viaObject={}
                    viaObject['id']=viaNumbers.val()
                    via.push(viaObject)
                })
                routeObject['via']=via
            }else{
            routeObject[routeKey.key]=routeKey.val()        
            }
        })
        routes.push(routeObject)
    })
    return routes
}