function parseBuses(busesDB) {
  busesarray = [];

  busesDB.forEach(bus => {
    const busDetails = [];

    bus.val().forEach(busData => {
      if (busData.key === seat) {
        let seat = {};
        seat.forEach(seatDetails => {
          seadDetails.forEach(seatfulldata => {
            if (seatfulldata.key === passengers) {
              seatbooking = {};

              passengers.forEach(passengersBookingData => {
                let bookingdata = {};
                bookingdata[
                  passengersBookingData.key
                ] = passengersBookingData.val();
                seatbooking.push(bookingdata);
              });

              seatfulldata.seatbooking[se];
            } else seat[seatfulldata.key] = seatfulldata.val();
          });
        });

        busDetails.push(seat);
      } else {
        let busobj = {};
        busobj[busData.key] = busData.val();
        busDetails.push(busobj);
      }
    });
  });
}
