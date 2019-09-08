angular
  .module("app.conponent", [])

  .component("pagination", {
    bindings: {
      currentPage:"@",
      pageSize:"@",
      data:"="
    },

    controller: function() {
      numberOfPages = function() {
        return Math.ceil($scope.data.length / $scope.pageSize);
      };
    },
    template: `
    <button ng-disabled="currentPage == 0" ng-click="$ctrl.currentPage=$ctrl.currentPage-1">
    Previous
</button>
{{$ctrl.currentPage+1}}/{{$ctrl.numberOfPages()}}
<button ng-disabled="$ctrl.currentPage >= data.length/$ctrl.pageSize - 1" ng-click="$ctrl.currentPage=$ctrl.currentPage+1">
    Next
</button>
    `
  });
