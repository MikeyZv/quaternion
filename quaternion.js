export class Quaternion {
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

    add(q) {
        this.w = this.w + q.w;
        this.x = this.x + q.x;
        this.y = this.y + q.y;
        this.z = this.z + q.z;

        return new Quaternion(this.w, this.x, this.y, this.z);
    }

    conjugate() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
    }


    toAxisAngle() {
        if (this.w == 1) {
            this.w = 0;
            this.x = 1;
            this.y = 0;
            this.z = 0;
        } else {
            let radians = 2*Math.acos(this.w);
            let degree = radians * 180 / Math.PI;
            let newW = degree;
            let newX = this.x/Math.sin(radians/2);
            let newY = this.y/Math.sin(radians/2);
            let newZ = this.z/Math.sin(radians/2);

            this.w = newW;
            this.x = newX;
            this.y = newY;
            this.z = newZ; 
        }
    }

    toQuaternion() {
        let radians = this.w * Math.PI / 180;
        let halfangle = radians / 2;
        let sin = Math.sin(halfangle);
        let cos = Math.cos(halfangle);

        this.w = cos;
        this.x = sin*this.x;
        this.y = sin*this.y;
        this.z = sin*this.z;
    }

    normalize() {
        let magnitude = Math.sqrt(this.w*this.w + this.x*this.x + this.y*this.y + this.z*this.z);
        this.w /= magnitude;
        this.x /= magnitude;
        this.y /= magnitude;
        this.z /= magnitude;
    }
    
};

export function slerp(a, b, t) {
    let theta = b.w / 2;
    let difference = 1 - t;
    let topSinA = Math.sin(difference*theta);
    let topSinB = Math.sin(t*theta);
    let topQA = new Quaternion(a.w*topSinA, a.x*topSinA, a.y*topSinA, a.z*topSinA); 
    let topQB = new Quaternion(b.w*topSinB, b.x*topSinB, b.y*topSinB, b.z*topSinB);
    let topQR = topQA.add(topQB);
    let result = new Quaternion(topQR.w/Math.sin(theta), topQR.x/Math.sin(theta), topQR.y/Math.sin(theta), topQR.z/Math.sin(theta));
    return result;
};