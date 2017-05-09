var myapp = angular.module("myApp",[]);
myapp.controller("myCon",["$scope", "$http", function($scope, $http){
		
		var r = function(){
			$http.get("/list").then(function(res){
				$scope.det=res.data;
			},
			function(err){});
		};
		r();

		var nullCheck = function()
		{
			var error = "ok";

			if($scope.prodName == null || $scope.qty == null)
			{
				error = "Name and Quantity value is mandatory";
			}

			return error;
		}

		$scope.clean = function()
		{
			$scope.prodName=null;
			$scope.qty=null;
			r();
		};
		

		$scope.add = function()
		{
			var err = nullCheck();

			if(err == "ok")
			{
				$http.post("/list/"+$scope.prodName+"/"+$scope.qty).then(function(res){},function(err){});
				r();
				$scope.clean();
			}
			else
			{
				alert(err);
			}

		}

		$scope.remove = function(id)
		{
			$http.post("/list/"+id).then(function(res){

			},function(err){});
			r();
			$scope.clean();
		}

		$scope.update = function(id,n,value)
		{
			$scope.prodName = n;
			$scope.qty = value;
		}

		$scope.dbupdate = function()
		{
			var err = nullCheck();

			if(err == "ok")
			{
				$http.put("/list/"+$scope.prodName+"/"+$scope.qty).then(function(res){},function(err){})
				r();
				$scope.clean();
			}
			else
			{
				alert(err);
			}
		}
}]);
