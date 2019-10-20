/**
 * @typedef Passenger
 * @property {string} end  
 * @property {number} endLocationId  
 * @property {string} start  
 * @property {number} startLocationId  
 * @property {number} userId  

 */

/**
 * @typedef Seat
 * @property {string} booked
 * @property {number} id
 * @property {Passenger[]} passengers
 */

/**
 * @typedef Bus
 * @property {number} id
 * @property {string} details
 * @property {string} end
 * @property {string} start
 * @property {Seat[]} seat
 */

/**
 *
 * @param {Bus[]} busesDB
 */
export default function parseBuses(busesDB) {
  const busesarray = [];

  busesDB.forEach(bus => {
    // const busDetails = {};

    let busobj = {};
    bus.forEach(busData => {
      if (busData.key === "seat") {
        let seatbooking = [];
        busData.forEach(seatDetails => {
          let seat = {};
          seat["passengers"] = [];
          seatDetails.forEach(seatfulldata => {
            if (seatfulldata.key === "passengers") {
              seatfulldata.forEach(passengersBookingData => {
                let bookingdata = {};
                passengersBookingData.forEach(fullData => {
                  bookingdata[fullData.key] = fullData.val();
                });
                seat["passengers"].push(bookingdata);
                console.log(seat);
              });
            } else seat[seatfulldata.key] = seatfulldata.val();
          });
          seatbooking.push(seat);
        });
        busobj["seat"] = seatbooking;
      } else {
        busobj[busData.key] = busData.val();
      }
      // busDetails.push(busobj);
    });
    busesarray.push(busobj);
  });
  return busesarray;
}
