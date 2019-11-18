import db  from '../../TrucksDB/db.json';
let countOfRequestTLC = 0;

function getTruckListCallback(callback) {
  setTimeout(() => {
    const isError = Math.ceil(Math.random()*1000) < 100;
    if(isError && countOfRequestTLC < 2) {
      countOfRequestTLC++;
      getTruckListCallback(callback);
    } else if(isError && countOfRequestTLC >= 2) {
      countOfRequestTLC = 0;
       callback(null, {
        data: null,
        status: 429,
        message: "Callback - Internal Error",
        countRequests: countOfRequestTLP
      });
    } else {
      callback({
        data: db.TRUCKS,
        status: 200,
        message: 'Callback request succes',
        countRequests: countOfRequestTLC
      });
    }
  }, 1000);
}


getTruckListCallback((data, err) => data ? console.log(data) : console.log(err));