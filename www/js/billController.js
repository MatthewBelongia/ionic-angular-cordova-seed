angular.module('starter.billController', [])

.controller('BillCtrl', function($scope, $stateParams, OpenTabsFactory, $ionicPopover, $http, SMoKEAPIservice,$ionicPopup) {
  $scope.openTab = OpenTabsFactory.get($stateParams.tabID);
  console.log($scope.openTab);
  $scope.id = '';
  $scope.item = null;
  $scope.subtotal;
  var calcTotal = 0;
  var sub = $scope.item;

  /*
  for(let sub of $scope.openTab.bill){
      calcTotal += item.data.cost;
   }
   */

  $scope.subtotal = calcTotal;
  window.onerror = function (errorMsg, url, lineNumber) {
         alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
    }

  $scope.showPopup = function() {
    $scope.data = {};


    
    var myPopup = $ionicPopup.show({


      template: '<input type="number" ng-model="data.scanned" autofocus/>',
      title: 'Scan Item',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button-positive',
        onTap: function(e) {

          $scope.id = $scope.data.scanned;
          SMoKEAPIservice.getItemDetails($scope.id).then(function successCallback(response) {
      //Digging into the response to get the relevant data
      $scope.item = response;
      console.log(response);
      console.log("openTab.bill: " + $scope.openTab.bill);
      $scope.openTab.bill.push($scope.item);
      /*
      for(let sub of $scope.openTab.bill){
      calcTotal += item.data.cost;
      */
   
      //$scope.subtotal = calcTotal;
      
    }, function errorCallback(response) {})
          console.log($scope.data.scanned);
          console.log($scope.id);
          return $scope.id;
        }
      }
      ]
    });
    return $scope.id;
  }


  $scope.addItem = function() {

   $scope.showPopup()
   
   console.log($scope.subtotal);
   $scope.id = '';
 };

 $ionicPopover.fromTemplateUrl('templates/popover.html', {
  scope: $scope
}).then(function(popover) {
  $scope.popover = popover;
});
$scope.openPopover = function($event) {
  $scope.popover.show($event);
};
$scope.voidItem = function(item) {
  $scope.openTab.bill.splice($scope.openTab.bill.indexOf(item), 1);
  $scope.openTab.subtotal -= item.price;
};
$scope.reOrderItem = function(item) {};
})
