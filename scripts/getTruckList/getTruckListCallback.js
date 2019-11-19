import {
  getTruckIds,
  getTruckById
} from '../script';

function getTruckListCallback(callback) {
  setTimeout(() => {
    getTruckIds().then(idsList => {
      Promise.all(idsList.map(id => 
        getTruckById(id).catch(() => 
          getTruckById(id).catch(() => 
            getTruckById(id).catch(() => console.log("CallBack - To much request for id: ", id))
            )
          )
        )
      ).then(truckList => {
        let data = truckList.filter(truck => !!truck);
        return data.length ? callback(data) : callback(undefined, 'Callback - Internal Error');
      })
    })
  }, 1000);
}


getTruckListCallback(
  (data, error) => data ? console.log("CB data: ", data) : console.log(error)
);