/**
 * @typedef Via
 * @property {string} id
 */

/**
  * @typedef Route
  * @property {string} id
  * @property {Via[]} via
  */

/**
 * 
 * @param {string} firstLocationId 
 * @param {string} secondLocationId 
 * @param {Route[]} routes 
 * @returns {string[]}
 */


function searchFirstNLastInRoutes(firstLocationId,secondLocationId,routes){
    const routeIds=[]
    routes.forEach(routeObject=>{
        if(routeObject.via && 
            routeObject.via.find(viaObject=>viaObject.id===firstLocationId)&&
            routeObject.via.find(viaObject=>viaObject.id===secondLocationId)
        ) {
            return routeObject.id
        }
    })
    return routeIds
}