import './getTruckList/getTruckListAsynAwait';
import './getTruckList/getTruckListCallback';
import './getTruckList/getTruckListPromise';

function getTruckIdsCallback(callback) {
  setTimeout(() => {
      callback([1,2,5,9,67]);
  }, 1000)
}

function getTruckIds() {
  return new Promise((resolve => {
      getTruckIdsCallback(result => resolve(result));
  }))
}

function getTruckByIdCallback(id, callback) {
  setTimeout(() => {
      const isError = Math.ceil(Math.random()*1000) < 400;
      if (isError) {
          return callback(undefined, "Internal error"); 
      }
      callback({
          id: id,
          model: `truck ${id}`
      });
  })  
}

function getTruckById(id) {
  return new Promise ((resolve, reject) => {
    getTruckByIdCallback(id, (result, error) => {
      return result ? resolve(result) : reject(error)
    })
  })
}


getTruckById(67)
  .then(data => console.log(data))
  .catch(error => console.log(error))

                

export {
  getTruckIds,
  getTruckById
}