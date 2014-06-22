$(document).ready(function() {
    $('#canvas').click(function(e) {
        var parentOffset = $(this).parent().offset();
        var x = e.pageX - parentOffset.left;
        var y = e.pageY - parentOffset.top;
        //console.log(x, y);
        var point = {
            x : x,
            y : y
        };
        capture.add(point);
    })
});
var capture = (function() {
    var _shapes = [];
    var _actualShape = false;
    var shape = function(name) {
        if (name) {
            _actualShape = name
            _shapes[_actualShape]=[];
        }
    };
    var exportShapes = function() {
        return _shapes;
    };
    var add = function(point) {
        if (_actualShape) {
            console.log(point)
            _shapes[_actualShape].push(point);
        }

    };
    return {
        add : add,
        shape : shape,
        exportShapes : exportShapes
    }
})();
//capture.shape('R');
//JSON.stringify(capture.exportShapes()['R'])