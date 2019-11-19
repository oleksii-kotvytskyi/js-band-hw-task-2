import {
  getTruckIds,
  getTruckById
} from '../script';


function getTruckListPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      getTruckIds().then(idsList => {
        Promise.all(idsList.map(id => 
          getTruckById(id).catch(() => 
            getTruckById(id).catch(() => 
              getTruckById(id).catch(() => console.log("Promise - To much request for id: ", id))
              )
            )
          )
        ).then(truckList => {
          let data = truckList.filter(truck => !!truck);
          data.length ? resolve(data) : reject("Promise - Internal Error");
        })
      })
    }, 1000);
  })
}


getTruckListPromise()
  .then(data => console.log('Promise data: ',data))
  .catch(error => console.log(error));