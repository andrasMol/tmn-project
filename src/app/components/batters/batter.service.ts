module tmnProject {
  'use strict';

  export class BatterService {
    public batters: any = {};
    
    /** @ngInject */
    constructor(private $http: ng.IHttpService, private $q: ng.IQService) {

    }

    getBatterData(id) {
      if (this.batters[id]) {
        // we already have this loaded in so just return the data
        var deferred = this.$q.defer();
        deferred.resolve(this.batters[id]);
        return deferred.promise;
      }
      var promise = this.$http.get('/assets/data/'+id+'.json');
      promise.then((response: any) => {
        this.batters[response.data.id] = response;
      });
      return promise;
    }

    getAllBatters() {
      // no caching here because in the meantime batters could have changed and we want to make sure we get the new data
      return this.$http.get('/assets/data/batters.json');
    }
  }
}
