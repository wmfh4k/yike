



$rootScope.$watchCollection("arrcoll", function(newValue, oldValue) {
      $rootScope.arrcoll=newValue;
      console.log($rootScope.arrcoll);
      var poststr=angular.toJson($rootScope.arrcoll);
      // console.log(poststr);
      if ($rootScope.dengS=='登陆'||$rootScope.dengS=='') {
        $location.path('/login');
      }else{
        $http({
        url: './api/collection.php', 
        method: 'post',
        data:{'data':poststr},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function(obj) {
        var str = [];
        for(var p in obj){
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
        }
    }).then(function (info) {
          // console.log(info.data);
         if (info.data=="") {
            
         }else{


         }

   })
  }