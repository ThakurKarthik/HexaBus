export default function convertRoutes(routesDB) {
  const routes = [];
  console.log("routesDB", routesDB);
  routesDB.forEach(numberNames => {
    let routeObject = {};
    console.log("numberNames", numberNames);
    numberNames.forEach(routeKey => {
      if (routeKey.key === "buses") {
        const buses = [];
        routeKey.forEach(busNumbers => {
          let busObject = {};
          busObject["id"] = busNumbers.val();
          buses.push(busObject);
        });
        routeObject["buses"] = buses;
      } else if (routeKey.key === "via") {
        const via = [];
        routeKey.forEach(viaNumbers => {
          let viaObject = {};
          viaObject["id"] = viaNumbers.val();
          via.push(viaObject);
        });
        routeObject["via"] = via;
      } else {
        routeObject[routeKey.key] = routeKey.val();
      }
    });
    routes.push(routeObject);
  });
  return routes;
}
