import {
  getTruckIds,
  getTruckById
} from '../script';

async function getTruckListAsynAwait() {
  const idsList = await getTruckIds();
  const truckList = await Promise.all(
    idsList.map(id => 
      getTruckById(id).catch(() => 
        getTruckById(id).catch(() => 
          getTruckById(id).catch(() => console.log("Async/await - To much request for id: ", id))
          )
        )
      )
  )
  
  const data =  truckList.filter(truck => !!truck);
  return data.length ? data : new Error("Async/await - Internal Error");
} 


getTruckListAsynAwait()
  .then(data => console.log('Async/await data: ', data))
  .catch(error => console.log(error));



