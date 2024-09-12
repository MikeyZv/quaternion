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
    
        return new Quaternion(newW, newX, newY, newZ);
    }

    conjugate(q) {
        return new Quaternion(q.w, -q.x, -q.y, -q.z);
    }


    toAxisAngle() {
        angle = 2*Math.acos(this.w);
        let a = this.x/Math.sin(angle/2)
        let b = this.y/Math.sin(angle/2)
        let c  = this.z/Math.sin(angle/2)
        return "rotate3d(" + a + "," + b + "," + c + "," + angle + "deg)";
    }
}

function toQuaterion(a, b, c, angle) {
    halfangle = angle / 2;
    sin = Math.sin(halfangle);
    cos = Math.cos(halfangle);
    return new Quaternion(cos, sin*a, sin*b, sin*c);
};

let pureQuat = new Quaternion(0, 0, 1, 0);
let cube = document.querySelector(".cube");
let q1 = toQuaterion(0, 1, 0, 90);

let q2 = q1.multiply(pureQuat);
let trans = q2.toAxisAngle();


cube.style.transform = trans;

