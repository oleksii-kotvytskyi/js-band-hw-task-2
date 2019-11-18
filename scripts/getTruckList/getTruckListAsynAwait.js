import db  from '../../TrucksDB/db.json';
let countOfRequestTLAA = 0;


async function getTruckListAsynAwait() {
  let isError = Math.ceil(Math.random()*1000) < 100;
  let oneMoreRequest = isError && countOfRequestTLAA < 2;
  let callErrorForUser = isError && countOfRequestTLAA >= 2;

  let result = await new Promise((resolve,reject) => {
    setTimeout(() => {
      if(oneMoreRequest) {
        countOfRequestTLAA++;
        return getTruckListAsynAwait()
                  .then(data => resolve(data))
                  .catch(err => reject(err));
      } else if (callErrorForUser) {
        reject({
          data: null,
          status: 429,
          message: "Async/Await - Internal Error",
          countRequests: countOfRequestTLAA
        });
        countOfRequestTLAA = 0;
      } else {
        resolve({
          data: db.TRUCKS,
          status: 200,
          message: 'Async/await request succes',
          countRequests: countOfRequestTLAA
        });
      }
    }, 1000)
  })
    // here we can do something with result 
  return result;
}

getTruckListAsynAwait()
  .then(response => console.log(response))
  .catch(err => console.log(err));
