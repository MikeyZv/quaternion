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
        this.w = radians * 180 / Math.PI;
        this.x = this.x/Math.sin(radians/2);
        this.y = this.y/Math.sin(radians/2);
        this.z = this.z/Math.sin(radians/2);
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

let cube = document.querySelector(".cube");
let pureQ = new Quaternion(0, 1, 1, 1);
let q1 = toQuaterion(0, 1, 0, 90);
let q2 = toQuaterion(0, 0, 1, 90);
let q3 = toQuaterion(0, 1, 0, 90);

q3.normalize();
q2.normalize();
q1.multiply(q2);
q1.multiply(q3);
q1.toAxisAngle();


cube.style.transform = "rotate3d(" + q1.x + "," + q1.y + "," + q1.z + "," + q1.w + "deg)";
