(function(document) {
  'use strict';
  var LightTableSorter = (function(Arr) {
    var _th, _cellIndex, _order = '';

    function _text(row) {
      return row.cells.item(_cellIndex).textContent.toLowerCase();
    }

    function _sort(a, b) {
      var va = _text(a),
        vb = _text(b),
        n = parseInt(va, 10);
      if (n) {
        va = n;
        vb = parseInt(vb, 10);
      }
      return va > vb ? 1 : va < vb ? -1 : 0;
    }

    function _toggle() {
      var c = _order !== 'asc' ? 'asc' : 'desc';
      _th.className = (_th.className.replace(_order, '') + ' ' + c).trim();
      _order = c;
    }

    function _reset() {
      _th.className = _th.className.replace('asc', '').replace('desc', '');
      _order = '';
    }

    function onClickEvent(e) {
      if (_th && _cellIndex !== e.target.cellIndex) {
        _reset();
      }
      _th = e.target;
      _cellIndex = _th.cellIndex;
      var tbody = _th.offsetParent.getElementsByTagName('tbody')[0],
        rows = tbody.rows;
      if (rows) {
        rows = Arr.sort.call(Arr.slice.call(rows, 0), _sort);
        if (_order === 'asc') {
          Arr.reverse.call(rows);
        }
        _toggle();
        tbody.innerHtml = '';
        Arr.forEach.call(rows, function(row) {
          tbody.appendChild(row);
        });
      }
    }
    return {
      init: function() {
        var ths = document.getElementsByTagName('th');
        Arr.forEach.call(ths, function(th) {
          th.onclick = onClickEvent;
        });
      }
    };
  })(Array.prototype);
  document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') {
      LightTableSorter.init();
    }
  });
})(document);
var app = angular.module('RandomTrackingTool', []);
app.controller('MainCtrl', function($scope, $timeout, $interval) {
  
  var promise;
  var list = ['Thai', 'Cang', 'Thuy Hoang', 'Phuong', 'Tam Tit', 'Hau', 'Quynh', 'Toan Gia', 'Tam Ga', 'Chung', 'Dat', 'Vi', 'Quang', 'Truong']

  var room = ['Room 1', 'Room 2', 'Room 3', 'Room 1', 'Room 2', 'Room 3', 'Room 1', 'Room 2', 'Room 3', 'Room 1', 'Room 2', 'Room 3', 'Room 1', 'Room 2']	
  function Person(name, value) {
    this.name = name;
    this.value = value;
    this.done = false;
  }

  function getNumber(firstNum, lastNum) {
    return Math.floor((Math.random() * lastNum) + firstNum)
  }
  
  $scope.init = function() {
  $scope.people = [];
    for (var i = 0; i < list.length; i++) {
      var persion = new Person(list[i], 0);
      $scope.people.push(persion);
    }
    var countUp = function() {
	
	  for (var i = 0; i < list.length; i++) {
        $scope.people[i].value = getNumber(1, 3);
      }
	  
      promise = $timeout(countUp, 50);
    }
    promise = $timeout(countUp, 50);
  }
  $scope.init();
  $scope.start = function() {
    $timeout.cancel(promise);
	
	function extractRandom(arr) {
        var index = Math.floor(Math.random() * arr.length);
        var result = arr[index];
        // remove item from the array
        removeItem(arr, index);
        return(result);
    }
	
	function removeItem(arr, index) {
        for (var i = index; i < arr.length - 1; i++) {
            arr[i] = arr[i + 1];
        }
		arr.length = arr.length - 1;
    }
	
	for (var i = 0; i < list.length; i++) {
		$scope.people[i].room = extractRandom(room);
    }
	
  };
  $scope.showlog = function() {
    console.table($scope.people)
  }
});
