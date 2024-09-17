class Quaternion {
    w;
    x;
    y;
    z;

    constructor(w, x, y, z) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    multiply(q) {
        let newW = this.w*q.w - this.x*q.x - this.y*q.y - this.z*q.z;
        let newX = this.w*q.x + this.x*q.w - this.y*q.z + this.z*q.y;
        let newY = this.w*q.y + this.x*q.z + this.y*q.w - this.z*q.x;
        let newZ = this.w*q.z - this.x*q.y + this.y*q.x + this.z*q.w;
        
        this.w = newW;
        this.x = newX; 
        this.y = newY;
        this.z = newZ; 
    }

    conjugate() {
        return new Quaternion(this.w, -this.x, -this.y, -this.z);
    }


    toAxisAngle() {
        let radians = 2*Math.acos(this.w);
        let w = radians * 180 / Math.PI;
        let x = this.x/Math.sin(radians/2);
        let y = this.y/Math.sin(radians/2);
        let z = this.z/Math.sin(radians/2);
        return new Quaternion(w, x, y, z);
    }

    normalize() {
        let magnitude = Math.sqrt(this.w*this.w + this.x*this.x + this.y*this.y + this.z*this.z);
        this.w = this.w / magnitude;
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;
        this.z = this.z / magnitude;
    }
    
}

function toQuaterion(a, b, c, angle) {
    let radians = angle * Math.PI / 180;
    let halfangle = radians / 2;
    let sin = Math.sin(halfangle);
    let cos = Math.cos(halfangle);
    return new Quaternion(cos, sin*a, sin*b, sin*c);
};

let initQuat = toQuaterion(0,0,0,0);

function rotateX() {
    let cube = document.querySelector(".cube");
    let q = toQuaterion(1, 0, 0, 90);
    q.normalize();
    initQuat.multiply(q);
    let returnQ = initQuat.toAxisAngle();
    cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
};

function rotateY() {
    let cube = document.querySelector(".cube");
    let q = toQuaterion(0, 1, 0, 90);
    q.normalize();
    initQuat.multiply(q);
    let returnQ = initQuat.toAxisAngle();
    cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
};

function rotateZ() {
    let cube = document.querySelector(".cube");
    let q = toQuaterion(0, 0, 1, 90);
    q.normalize();
    initQuat.multiply(q);
    let returnQ = initQuat.toAxisAngle();
    cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
};

rotateX();
rotateY();
rotateZ();