import db  from '../../TrucksDB/db.json';
let countOfRequestTLP = 0;

function getTruckListPromise() {
  let isError = Math.ceil(Math.random()*1000) < 100;
  let oneMoreRequest = isError && countOfRequestTLP < 2;
  let callErrForUser = isError && countOfRequestTLP >= 2;

  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if(oneMoreRequest) {
        countOfRequestTLP++;
        return getTruckListPromise()
                  .then(data => resolve(data))
                  .catch(err => reject(err));
      } else if(callErrForUser) {
        countOfRequestTLP = 0;
        reject({
          data: null,
          status: 429,
          message: "Promise - Internal Error",
          countRequests: countOfRequestTLP
        });
      } else {
        resolve({
          data: db.TRUCKS,
          status: 200,
          message: 'Promise request succes',
          countRequests: countOfRequestTLP
        });
      }
    }, 1000);
  })
}


getTruckListPromise()
  .then(response => console.log(response))
  .catch(error =>  console.log(error.message));