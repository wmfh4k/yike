
var app=angular.module('myApp', ['ng','ngRoute','ngAnimate']);
app.controller('comm',['$scope','$rootScope','$location','$http',function($scope,$rootScope,$location,$http){
  $rootScope.dengS="登陆";
  $rootScope.slide=false;
  $rootScope.arrcoll=[];
  $rootScope.bground=false;
  $rootScope.colnumn=0;
  $scope.night="夜晚";
  $rootScope.wther=true;
  $rootScope.wenzi=false;
  $scope.$watch('dengS', function(newValue, oldValue) {
    if (newValue=="登陆"){
      $rootScope.wther=true;
    }else{
      $rootScope.wther=false;
    }
  });
  // //天气预报
  //  if ($rootScope.wther) {
  //   $http({
  //     method:'jsonP',
  //     url:"http://www.sojson.com/open/api/weather/json.shtml?city=北京"
  //   }).then(function (data){
  //     console.log(data);
  //   })
  //  };
  // ONLINE
  $rootScope.online=function (){
    if ($rootScope.dengS!='登陆') {
     $rootScope.dengS='登陆';
   }  
  }
  // 进入用户中心判断
  $rootScope.dengp=function(){
     if ($rootScope.dengS=='登陆') {
      $location.path('/login');
    }else{
      alert("用户中心正在开发，敬请期待！");
    }
     $rootScope.leader1() 

    }
  // 搜索
  $rootScope.showsoso=function(){
    $rootScope.wenzi=!$rootScope.wenzi;
  }
  // changeblack
  $rootScope.charblack=function(){
    $scope.night=="夜晚"?$scope.night="白天":$scope.night="夜晚";
    $rootScope.bground=!$rootScope.bground;

  }
  $rootScope.sosodate=function(){

  }
  
  // 收藏
  $rootScope.cred=function($index){
    if ($rootScope.dengS=='登陆') {
      $location.path('/login');
    }
    else{
     $rootScope.colnumn= $rootScope.arrcoll.length+1;
      var abj=$rootScope.posts[this.$index];
      var spanx = angular.element(".contentT").eq($index)
      .find('span');
      $rootScope.indx=$index;         
      var strclass=spanx.attr('class');
      var arrclass=strclass.split(" ");
      for (var i = 0;i < arrclass.length; i++) {
        if (arrclass[i]=='icon-like') {
         $rootScope.arrnum+=1;
         spanx.removeClass('icon-like').addClass('icon-like_fill');
         spanx.attr('data-title',$rootScope.arrnum); 
         $rootScope.arrcoll.push(abj);
         $rootScope.colnumn=$rootScope.arrcoll.length;
         // console.log($rootScope.arrcoll.length);
         return;
       }
       if (arrclass[i]=='icon-like_fill') {
        spanx.removeClass('icon-like_fill').addClass('icon-like');
        var sn=spanx.attr('data-title');
        var splicm=parseInt(sn)-$rootScope.arrnum-1;
        $rootScope.arrcoll.splice(splicm,1);
        $rootScope.colnumn=$rootScope.arrcoll.length;
         // console.log($rootScope.arrcoll.length);
        return;
      }
    }
     
  } 
}

// 左右滑动
  $rootScope.leader=function(){
    if($rootScope.slide==false){
      $rootScope.slide=true;
    }else{
      $rootScope.slide=false;
    }
 }
 $rootScope.leader1=function(){
    if($rootScope.slide==true){
       $rootScope.slide=false;
  }
}

}])

// today
app.controller('ctrltoday',['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
  $rootScope.arrnum=0;//收藏点击
  var today = $filter('date')(new Date, 'yyyy-MM-dd');
    $rootScope.title = '今日一刻';
    $rootScope.loaded = true;
    $scope.isActive=-1;
    // console.log($rootScope.loaded)
    $http({
        url: './api/today.php', // 请求地址，解决跨域问题
        method: 'get',
        params: {today: today}
    }).then(function (info) {
        var data=info.data;
        $rootScope.date = data.date;
        $rootScope.posts = data.posts;
        $rootScope.loaded = false;
    });

}])
// older
app.controller('ctrlolder',['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
    $rootScope.arrnum=0; //收藏点击  
    $rootScope.title = '往期内容';
    $rootScope.index = 1;
    $rootScope.loaded = true;
    $scope.num=0;
    $scope.prehid=true;
    $rootScope.date="";
    $http({
        url: './api/older.php',
        method: 'get',
        params:{num:$scope.num} 
    }).then(function (info) {
      $scope.daypre="向前看";
      $scope.daynext="向后看";
        $rootScope.loaded = false;
        var data=info.data;
        $rootScope.date = data.date;
        $rootScope.posts = data.posts;

    });
    $scope.preaday=function(){
      angular.element(".neirong").scrollTop(0);
      $rootScope.loaded = true;
      $scope.num-=1;
      if($scope.num>0){
        $scope.prehid=false;
      }else{
        $scope.prehid=true;
        $scope.num=0;
      }
      var num=$scope.num;
      $http({
        url: './api/older.php',
        method: 'get',
        params:{num:$scope.num}
        }).then(function(info){
          $rootScope.loaded = false;
        var data=info.data;
        $rootScope.date = data.date;
        $rootScope.posts = data.posts;
        })
    }
    $scope.nextaday=function(){
      angular.element(".neirong").scrollTop(0);
      $rootScope.loaded = true;
      $scope.num+=1;
      $scope.num>0?$scope.prehid=false:
      $scope.prehid=true;
      var num=$scope.num;
      $http({
        url: './api/older.php',
        method: 'get',
        params:{num:$scope.num}
    }).then(function (info) {
      $rootScope.loaded = false;
        var data=info.data;
        $rootScope.date = data.date;
        $rootScope.posts = data.posts;
    })
    }

}])
// collection
app.controller('ctrlcollection',['$scope', '$http', '$filter', '$rootScope','$location', function ($scope, $http, $filter, $rootScope,$location) {
  if ($rootScope.dengS=='登陆'||$rootScope.dengS=='') {
      $location.path('/login');
    }else{
      $rootScope.title="我的收藏";
      var xinxi=angular.toJson($rootScope.arrcoll)
      // console.log(xinxi);
  $http({
        url: './api/collection.php', // 请求地址，解决跨域问题
        method: 'post',
        data:$.param({'data':xinxi}),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function (info) {
         var arr= angular.fromJson(info);
        var data=arr.data;
        console.log(data);
        console.log(data.length);
        $rootScope.colldata=data;
        // console.log(arr.length);
        $rootScope.colnumn=data.length;
        // 移出收藏夹
        $rootScope.crmove=function($index){ var spanx = angular.element(".contentT").eq($index)
      .find('span');    
           $rootScope.colldata.splice(this.$index,1);
           $rootScope.colnumn=$rootScope.colldata.length;
              return;
        }
  });
 }
}])
// login
app.controller('ctrllogin',['$scope', '$http','$location', '$filter', '$rootScope', function ($scope, $http,$location, $filter, $rootScope) {
    $rootScope.dengL=true;

    // 注册转入
    $scope.register=function(){
      $location.path('/register');
    }

    $scope.remov=function(){
      $rootScope.dengL=false;
      $location.path('/today'); 
    };
    $scope.usernameD="";
    $scope.passwordD="";
    $scope.Deng=function(){
        $http({
        url: './api/login.php',
        method: 'get',
        params: {"username":$scope.usernameD,"password":$scope.passwordD}
    }).then(function (info) {
       // console.log(info);
      var data=info.data;
      if(data==0){
       $scope.usernameD="";
       $scope.passwordD="";
       alert("用户密码错误！"); 
      }else{
        $rootScope.dengL=false;
        $rootScope.dengS=data.username;
        $location.path('/today');
         alert("登陆成功！");
      }
    });
    }

}])
// 注册
app.controller('ctrlregist',['$scope', '$http', '$filter', '$rootScope','$location', function ($scope, $http, $filter, $rootScope,$location) {
  $scope.usernameD='';
  $scope.passwordD='';
  $scope.Zce=true;
  $scope.remov=function(){
    $scope.Zce=false;
    $location.path('/today');
  }
  $scope.Zdate=function(){
     $http({
        url: './api/register.php',
        method: 'post',
        data: {"username":$scope.usernameD,"password":$scope.passwordD},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function(obj) {
        var str = [];
        for(var p in obj){
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
        }
    }).then(function (info) {
      console.log(info);
      console.log(info.data);
      if(info.data=="0"){
        alert("该用户名已被占用，请重新注册！");
         $scope.usernameD='';
         $scope.passwordD='';
      }else{
         alert("注册成功！");
        $scope.Zce=!$scope.Zce;
        $rootScope.dengS=info.data;
        $location.path('/today');

      }

    })

  }
}])
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/today',{
    templateUrl:'views/today.html',
    controller:'ctrltoday'
  })
  .when('/older',{
    templateUrl:'views/older.html',
    controller:'ctrlolder'
  })
  .when('/collection',{
    templateUrl:'views/collection.html',
    controller:'ctrlcollection'
  })
  .when('/login',{
    templateUrl:'views/login.html',
    controller:'ctrllogin'
  })
  .when('/register',{
    templateUrl:'views/register.html',
    controller:'ctrlregist'
  })
  .otherwise({
    redirectTo: '/today'
  });
}])
app.config(['$locationProvider',function($locationProvider){
  $locationProvider.hashPrefix('');
}])