HTTP.methods({
  '/habilitados':{                  // Permite acessar todos os dados da Collection Habilitados.
    get: function(){
      var json = Habilitados.find().fetch();
      return JSON.stringify(json);
    }
  },
  '/habilitados/uf/:value':{      // Permite acessar os dados filtrados por 'uf' da Collection Habilitados.
    get: function(){
      var value = this.params.value;
      var json = Habilitados.find({"uf":value}).fetch();
      return JSON.stringify(json);
    }
  },
  '/rate/gid/:gid_value/aid/:android_id_value/rating/:rating':{      // Permite acessar os dados filtrados por 'uf' da Collection Habilitados.
    get: function(){

      var gid_value = this.params.gid_value;
      var android_id_value = this.params.android_id_value;
      var rating = this.params.rating;

      var json;

      var alreadyHasRating = 0;
      alreadyHasRating = Rating.find({"aid":android_id_value, "gid":gid_value}).count();

      if (alreadyHasRating != 0){
          json = Rating.update({"aid":android_id_value, "gid":gid_value},{"aid":android_id_value, "gid":gid_value, "rating":parseInt(rating)});
          return "Updated - AndroidID_already_voted";
      }else{
          json = Rating.insert({"aid":android_id_value, "gid":gid_value, "rating":parseInt(rating)});
          return "OK";
      }
    }
  },
  '/rate':{      // Permite acessar os dados filtrados por 'uf' da Collection Habilitados.
    get: function(){
      var json;
      var buffer = Rating.aggregate([{$group:{_id:"$gid",rate:{$avg:"$rating"}}}]);
      return buffer;
    }
  },
  '/rate/gid/:gid_value':{      // Permite acessar os dados filtrados por 'uf' da Collection Habilitados.
    get: function(){
      var json;
      var gid_value = this.params.gid_value;
      var buffer = Rating.aggregate([
        {$group:{_id:"$gid", rate:{$avg:"$rating"}}},
        {$match:{"_id":gid_value}}
      ]);
      console.log(buffer);
      return buffer;
    }
  },
  '/farmacia_popular':{
    get: function(){
      var json = Farmacia_popular.find().fetch();
      return JSON.stringify(json);
    }
  },
  '/farmacia_popular/uf/:value':{      // Permite acessar os dados filtrados por 'uf' da Collection Farmacia_popular.
    get: function(){
      var value = this.params.value;
      var json = Farmacia_popular.find({"uf":value}).fetch();
      return JSON.stringify(json);
    }
  },
  '/farmacia_popular_conveniada':{
    get: function(){
      var json = Farmacia_popular_conveniada.find().fetch();
      return JSON.stringify(json);
    }
  },
  '/farmacia_popular_conveniada/uf/:value':{      // Permite acessar os dados filtrados por 'uf' da Collection Farmacia_popular_conveniada.
    get: function(){
      var value = this.params.value;
      var json = Farmacia_popular_conveniada.find({"uf":value}).fetch();
      return JSON.stringify(json);
    }
  }
});
