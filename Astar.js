function search1(startX,startY,endX,endY) {
    var startPoint = new Point(startX,startY,null);
    var endPoint = new Point(endX,endY,null);
    openList = [];
    openList.push(startPoint);
    var resultList = search(startPoint,endPoint);

    return resultList;
}

function Point(x,y,parentPoint) {
    this.x = x;
    this.y = y;
    this.parentPoint = parentPoint;
    this.g = 0;
    this.h = 0;
    this.f = 0;
}
Point.prototype.getX = function() {
    return this.x;
};
Point.prototype.setX = function(x) {
    this.x = x;
};
Point.prototype.getY = function() {
    return this.y;
};
Point.prototype.setY = function(y) {
    this.y = y;
};
Point.prototype.getParentPoint = function() {
    return this.parentPoint;
};
Point.prototype.setParentPoint = function(parentPoint) {
    this.parentPoint = parentPoint;
};
Point.prototype.getG = function() {
    return this.g;
};
Point.prototype.setG = function(g) {
    this.g = g;
};
Point.prototype.getH = function() {
    return this.h;
};
Point.prototype.setH = function(h) {
    this.h = h;
};
Point.prototype.getF = function() {
    return this.f;
};
Point.prototype.setF = function(f) {
    this.f = f;
};


var openList = [];
var closeList = [];
var row = map.length;
var col = map[0].length;



function search(startPoint,endPoint) {
    var resultList = [];
    var isFind = false;
    var curPoint = null;
    while(openList.length > 0) {
        curPoint = openList[0];
        if(curPoint.getX() == endPoint.getX() && curPoint.getY() == endPoint.getY()) {
            isFind = true;
            break;
        }
        if(curPoint.getY()-1 >= 0) {
            checkPath(curPoint.getX(),curPoint.getY()-1,curPoint,endPoint);
        }
        if(curPoint.getY()+1 < 20) {
            checkPath(curPoint.getX(),curPoint.getY()+1,curPoint,endPoint);
        }
        if(curPoint.getX()-1 >= 0) {
            checkPath(curPoint.getX()-1,curPoint.getY(),curPoint,endPoint);
        }
        if(curPoint.getX()+1 < 20) {
            checkPath(curPoint.getX()+1,curPoint.getY(),curPoint,endPoint);
        }
        closeList.push(openList.shift());
        openList.sort(compare);
    }
    if(isFind) {
        getPath(resultList,curPoint);
    }
    openList = [];
    closeList = [];
    return resultList;
}

function checkPath(x,y,parentPoint,endPoint) {
    var newPoint = new Point(x,y,parentPoint);
    if(map[x][y] != 0) {
        closeList.push(newPoint);
        return false;
    }
    if(isListContains(closeList,x,y) != -1) {
        return false;
    }
    var index = -1;
    if((index = isListContains(openList,x,y)) != -1) {
        if(parentPoint.getG()+1 < openList[index].getG()) {
            newPoint.setParentPoint(parentPoint);
            countG(newPoint,endPoint);
            countF(newPoint);
            openList[index] = newPoint;
        }
    }else{
        newPoint.setParentPoint(parentPoint);
        count(newPoint,endPoint);
        openList.push(newPoint);
    }
    return true;
}

function isListContains(list,x,y) {
    for(var i = 0;i < list.length; i++) {
        if(list[i].getX() == x && list[i].getY() == y) {
            return i;
        }
    }
    return -1;
}

function getPath(resultList,point) {
    if(point.getParentPoint() != null) {
        getPath(resultList,point.getParentPoint());
    }
    resultList.push(point);
}

function count(point,endPoint) {
    countG(point,endPoint);
    countH(point,endPoint);
    countF(point);
}

function countG(point,endPoint) {
    if(point.getParentPoint() == null) {
        point.setG(1);
    }else{
        point.setG(point.getParentPoint().getG()+1);
    }
}

function countH(point,endPoint) {
    point.setH(Math.abs(point.getX()-endPoint.getX())+Math.abs(point.getY()-endPoint.getY()))
}

function countF(point) {
    point.setF(point.getG() + point.getH());
}

function compare(o1,o2) {
    return o1.getF() - o2.getF();
}