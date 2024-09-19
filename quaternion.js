const xPos90Btn = document.querySelector("#btn-rotate-x-pos90");
const yPos90Btn = document.querySelector("#btn-rotate-y-pos90");
const zPos90Btn = document.querySelector("#btn-rotate-z-pos90");
const xNeg90Btn = document.querySelector("#btn-rotate-x-neg90");
const yNeg90Btn = document.querySelector("#btn-rotate-y-neg90");
const zNeg90Btn = document.querySelector("#btn-rotate-z-neg90");

xPos90Btn.addEventListener("click", rotateXPos);
yPos90Btn.addEventListener("click", rotateYPos);
zPos90Btn.addEventListener("click", rotateZPos); 
xNeg90Btn.addEventListener("click", rotateXNeg);
yNeg90Btn.addEventListener("click", rotateYNeg);
zNeg90Btn.addEventListener("click", rotateZNeg);

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
        this.w = this.w;
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
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

function rotateXPos() {
    let cube = document.querySelector(".cube");
    let q = toQuaterion(1, 0, 0, 90);
    let q1 = `Current Quaternion, Q1: (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
    let q2 = `Rotation Quaternion, Q2: (${q.w.toFixed(2)}, ${q.x.toFixed(2)}, ${q.y.toFixed(2)}, ${q.z.toFixed(2)})<br/>`;
    initQuat.multiply(q);
    let result = `Result Quarternion, Q1 * Q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})`;
    let returnQ = initQuat.toAxisAngle();
    cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${q1} ${q2} ${result}</span>`;
};

function rotateYPos() {
    let cube = document.querySelector(".cube");
    let q = toQuaterion(0, 1, 0, 90);
    let q1 = `Current Quaternion, Q1: (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
    let q2 = `Rotation Quaternion, Q2: (${q.w.toFixed(2)}, ${q.x.toFixed(2)}, ${q.y.toFixed(2)}, ${q.z.toFixed(2)})<br/>`;
    initQuat.multiply(q);
    let result = `Result Quarternion, Q1 * Q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})`;
    let returnQ = initQuat.toAxisAngle();
    cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${q1} ${q2} ${result}</span>`;
};

function rotateZPos() {
    let cube = document.querySelector(".cube");
    let q = toQuaterion(0, 0, 1, 90);
    let q1 = `Current Quaternion, Q1: (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
    let q2 = `Rotation Quaternion, Q2: (${q.w.toFixed(2)}, ${q.x.toFixed(2)}, ${q.y.toFixed(2)}, ${q.z.toFixed(2)})<br/>`;
    initQuat.multiply(q);
    let result = `Result Quarternion, Q1 * Q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})`;
    let returnQ = initQuat.toAxisAngle();
    cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${q1} ${q2} ${result}</span>`;
};

function rotateXNeg() {
    let cube = document.querySelector(".cube");
    let q = toQuaterion(1, 0, 0, 90);
    let q1 = `Current Quaternion, Q1: (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
    let q2 = `Rotation Quaternion, Q2: (${q.w.toFixed(2)}, ${q.x.toFixed(2)}, ${q.y.toFixed(2)}, ${q.z.toFixed(2)})<br/>`;
    initQuat.multiply(q);
    let result = `Result Quarternion, Q1 * Q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})`;
    let returnQ = initQuat.toAxisAngle();
    cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${q1} ${q2} ${result}</span>`;
};

function rotateYNeg() {
    let cube = document.querySelector(".cube");
    let q = toQuaterion(0, 1, 0, 90);
    let q1 = `Current Quaternion, Q1: (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
    let q2 = `Rotation Quaternion, Q2: (${q.w.toFixed(2)}, ${q.x.toFixed(2)}, ${q.y.toFixed(2)}, ${q.z.toFixed(2)})<br/>`;
    initQuat.multiply(q);
    let result = `Result Quarternion, Q1 * Q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})`;
    let returnQ = initQuat.toAxisAngle();
    cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${q1} ${q2} ${result}</span>`;
};

function rotateZNeg() {
    let cube = document.querySelector(".cube");
    let q = toQuaterion(0, 0, 1, 90);
    let q1 = `Current Quaternion, Q1: (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
    let q2 = `Rotation Quaternion, Q2: (${q.w.toFixed(2)}, ${q.x.toFixed(2)}, ${q.y.toFixed(2)}, ${q.z.toFixed(2)})<br/>`;
    initQuat.multiply(q);
    let result = `Result Quarternion, Q1 * Q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})`;
    let returnQ = initQuat.toAxisAngle();
    cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${q1} ${q2} ${result}</span>`;
};


