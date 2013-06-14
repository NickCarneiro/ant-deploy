$ = window['$']; //suppress intellij warnings
var field = {
    width: 800,
    height: 600
};
var dirtTypes = {
    'normal': {
        'index': 0,
        'color': '#5D461C'

    },
    'empty': {
        'index': 1,
        'color': '#FFFFFF'
    }
};
var dirtIndexToName = [];
for (var d in dirtTypes) {
    if (dirtTypes.hasOwnProperty(d)) {
        dirtIndexToName.push(dirtTypes[d]);
    }
}

var fieldArray = [];
//contains all ant objects. Each ant knows its type and where it is.
var ants = [];
var antTypes = {
    'scout': {
        'width': 8,
        'height': 4,
        'color': '#FFDE00'
    }
};

$(function(){

    var canvas = $('#game-canvas')[0];
    var context = canvas.getContext('2d');
    $(canvas).width(field.width);
    $(canvas).height(field.height);
    $(canvas).on('mousedown', handleFieldClick);
    for (var i = 0; i < field.height; i++) {
        fieldArray[i] = [];
        for (var j = 0; j < field.width; j++) {
            fieldArray[i][j] = dirtTypes.normal.index;
        }
    }
    var scout = {
        'type': 'scout',
        'x': 0,
        'y': 0
    };
    ants.push(scout);

    drawField(context);
});

function drawField(context) {
    //first draw the background
    for (var i = 0; i < field.height; i++) {
        for (var j = 0; j < field.width; j++) {
            var color = dirtIndexToName[fieldArray[i][j]].color;
            context.fillStyle = color;
            context.fillRect(j, i, 1, 1);
        }
    }
    // then draw our ants
    for (var ant in ants) {
        if (ants.hasOwnProperty(ant)) {
            ant = ants[ant];
            context.fillStyle = antTypes[ant.type].color;
            var width = antTypes[ant.type].width;
            var height = antTypes[ant.type].height;
            context.fillRect(ant.x, ant.y, width, height);
        }
    }
}

function handleFieldClick(e) {
    var canvas = $('#game-canvas')[0];
    var offset = $(canvas).offset();
    var x = Math.floor(e.pageX - offset.left);
    var y = Math.floor(e.pageY - offset.top);
    console.log('x: ' + x + ' y: ' + y);
}
