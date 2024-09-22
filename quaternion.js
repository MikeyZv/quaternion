const xPos90Btn = document.querySelector("#btn-rotate-x-pos90");
const yPos90Btn = document.querySelector("#btn-rotate-y-pos90");
const zPos90Btn = document.querySelector("#btn-rotate-z-pos90");
const xNeg90Btn = document.querySelector("#btn-rotate-x-neg90");
const yNeg90Btn = document.querySelector("#btn-rotate-y-neg90");
const zNeg90Btn = document.querySelector("#btn-rotate-z-neg90");

xPos90Btn.addEventListener("click", rotateXPos);
// yPos90Btn.addEventListener("click", rotateYPos);
// zPos90Btn.addEventListener("click", rotateZPos); 
// xNeg90Btn.addEventListener("click", rotateXNeg);
// yNeg90Btn.addEventListener("click", rotateYNeg);
// zNeg90Btn.addEventListener("click", rotateZNeg);

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
            let w = radians * 180 / Math.PI;
            let x = this.x/Math.sin(radians/2);
            let y = this.y/Math.sin(radians/2);
            let z = this.z/Math.sin(radians/2);

            this.w = w;
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    toQuaterion() {
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
        this.w = this.w / magnitude;
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;
        this.z = this.z / magnitude;
    }
    
};

function toQuaterion(a, b, c, angle) {
    let radians = angle * Math.PI / 180;
    let halfangle = radians / 2;
    let sin = Math.sin(halfangle);
    let cos = Math.cos(halfangle);
    return new Quaternion(cos, sin*a, sin*b, sin*c);
};

function slerp(a, b, t) {
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

let initQuat = toQuaterion(0,0,0,0);
document.getElementById("text-container").innerHTML = `<span class='textCSS'>Initial Quaternion, (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})</span>`;

function rotateXPos() {
    let q1 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);
    
    let text1 = `initQuat = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
    let text2 = `q1 = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/>`;

    let q2 = toQuaterion(1, 0, 0, 90);
    let text3 = `q2 = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/>`;

    initQuat.multiply(q2);

    let text4 = `initQuat mult q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;

    let q3 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    t = 0;
    let slerpInterval = setInterval(()=>{
        let cube = document.querySelector(".cube");
        let percent = t/100;
        let slerpQ = slerp(q1, q3, percent);
        slerpQ.toAxisAngle();
        cube.style.transform = `rotate3d(${slerpQ.x},${slerpQ.y},${slerpQ.z},${slerpQ.w}deg)`;
        t++;
        if (t == 101) {
            clearInterval(slerpInterval);
        }
    },4);
    

    let text5 = `q3 = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;

    //difference

    let text6 = `q1 conj = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/>`;
    
    let text7 = `q3 mult q1 = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;

    // q3.toAxisAngle();

    let text8 = `q3 axis angle = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;

    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${text1} ${text2} ${text3} ${text4} ${text5} ${text6} ${text7} ${text8}</span>`;

    // for (let i = 0; i < 100; i++) {
    //     q3.multiply(q1conj);
    // }
    // let t = 0;
    // let slerpInterval = setInterval(()=>{
    //     let cube = document.querySelector(".cube");
    //     q3.multiply(q1conj);
    //     q3.toAxisAngle();
    //     // let text1 = `(${q2.w * t/100}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/>`;
    //     // let text2 = `(${q3.w * t/100}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;
    //     cube.style.transform = `rotate3d(${q3.x},${q3.y},${q3.z},${q3.w * (t/100)}deg)`;
    //     // document.getElementById("text-container").innerHTML = `<span class='textCSS'>${text1} ${text2}</span>`;
    //     q3.toQuaterion();
    //     t++;
    //     if (t == 100) {
    //         clearInterval(slerpInterval);
    //     };
    // }, 4);
    // initQuat = q3.multiply(q1);
    // let slerpInterval = setInterval(()=>{
    //     let cube = document.querySelector(".cube");
    //     let text1 = `(${q3.w * t/100}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;
    //     let text2 = `(${q3.w * t/100}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;
    //     cube.style.transform = `rotate3d(${q3.x},${q3.y},${q3.z},${q3.w * (t/100)}deg)`;
    //     document.getElementById("text-container").innerHTML = `<span class='textCSS'>${text1} ${text2}</span>`;
    //     t++;
    //     if (t == 100) {
    //         clearInterval(slerpInterval);
    //         q3.toQuaterion();
    //     };
    // }, 4);
    // for (let i = 0; i < 100; i++) {
    //     let cube = document.querySelector(".cube");
    //     q1.conjugate();
    //     q3.multiply(q1);
    //     q3.toAxisAngle();
    //     let text1 = `(${q3.w * t}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;
    //     let text2 = `(${q3.w * t}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;
    //     cube.style.transform = `rotate3d(${q3.x},${q3.y},${q3.z},${q3.w * t}deg)`;
    //     document.getElementById("text-container").innerHTML = `<span class='textCSS'>${text1} ${text2}</span>`;
    //     t++;
    //     q3.toQuaterion();
    // }



    // let result = `Quarternion Result, Q1 * Q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
    // let returnQ = initQuat.toAxisAngle();
    // let axisResult = `Angle-Axis Result, Q1 * Q2 = (${returnQ.w.toFixed(2)}, ${returnQ.x.toFixed(2)}, ${returnQ.y.toFixed(2)}, ${returnQ.z.toFixed(2)})`;

    // cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
    // document.getElementById("text-container").innerHTML = `<span class='textCSS'>${text1} ${text2} ${text3} ${text4}</span>`;
};

// function rotateYPos() {
//     let cube = document.querySelector(".cube");
//     let q = toQuaterion(0, 1, 0, 90);
//     let q1 = `Current Quaternion, Q1 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
//     let q2 = `Rotation Quaternion, Q2 = (${q.w.toFixed(2)}, ${q.x.toFixed(2)}, ${q.y.toFixed(2)}, ${q.z.toFixed(2)})<br/>`;
//     initQuat.multiply(q);
//     let result = `Quarternion Result, Q1 * Q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
//     let returnQ = initQuat.toAxisAngle();
//     let axisResult = `Angle-Axis Result, Q1 * Q2 = (${returnQ.w.toFixed(2)}, ${returnQ.x.toFixed(2)}, ${returnQ.y.toFixed(2)}, ${returnQ.z.toFixed(2)})`;
//     cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
//     document.getElementById("text-container").innerHTML = `<span class='textCSS'>${q1} ${q2} ${result} ${axisResult}</span>`;
// };

// function rotateZPos() {
//     let cube = document.querySelector(".cube");
//     let q = toQuaterion(0, 0, 1, 90);
//     let q1 = `Current Quaternion, Q1 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
//     let q2 = `Rotation Quaternion, Q2 = (${q.w.toFixed(2)}, ${q.x.toFixed(2)}, ${q.y.toFixed(2)}, ${q.z.toFixed(2)})<br/>`;
//     initQuat.multiply(q);
//     let result = `Quarternion Result, Q1 * Q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
//     let returnQ = initQuat.toAxisAngle();
//     let axisResult = `Angle-Axis Result, Q1 * Q2 = (${returnQ.w.toFixed(2)}, ${returnQ.x.toFixed(2)}, ${returnQ.y.toFixed(2)}, ${returnQ.z.toFixed(2)})`;
//     cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
//     document.getElementById("text-container").innerHTML = `<span class='textCSS'>${q1} ${q2} ${result} ${axisResult}</span>`;
// };

// function rotateXNeg() {
//     let cube = document.querySelector(".cube");
//     let q = toQuaterion(1, 0, 0, 90);
//     q.conjugate();
//     let q1 = `Current Quaternion, Q1 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
//     let q2 = `Rotation Quaternion, Q2 = (${q.w.toFixed(2)}, ${q.x.toFixed(2)}, ${q.y.toFixed(2)}, ${q.z.toFixed(2)})<br/>`;
//     initQuat.multiply(q);
//     let result = `Quarternion Result, Q1 * Q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
//     let returnQ = initQuat.toAxisAngle();
//     let axisResult = `Angle-Axis Result, Q1 * Q2 = (${returnQ.w.toFixed(2)}, ${returnQ.x.toFixed(2)}, ${returnQ.y.toFixed(2)}, ${returnQ.z.toFixed(2)})`;
//     cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
//     document.getElementById("text-container").innerHTML = `<span class='textCSS'>${q1} ${q2} ${result} ${axisResult}</span>`;
// };

// function rotateYNeg() {
//     let cube = document.querySelector(".cube");
//     let q = toQuaterion(0, 1, 0, 90);
//     q.conjugate();
//     let q1 = `Current Quaternion, Q1 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
//     let q2 = `Rotation Quaternion, Q2 = (${q.w.toFixed(2)}, ${q.x.toFixed(2)}, ${q.y.toFixed(2)}, ${q.z.toFixed(2)})<br/>`;
//     initQuat.multiply(q);
//     let result = `Quarternion Result, Q1 * Q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
//     let returnQ = initQuat.toAxisAngle();
//     let axisResult = `Angle-Axis Result, Q1 * Q2 = (${returnQ.w.toFixed(2)}, ${returnQ.x.toFixed(2)}, ${returnQ.y.toFixed(2)}, ${returnQ.z.toFixed(2)})`;
//     cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
//     document.getElementById("text-container").innerHTML = `<span class='textCSS'>${q1} ${q2} ${result} ${axisResult}</span>`;
// };

// function rotateZNeg() {
//     let cube = document.querySelector(".cube");
//     let q = toQuaterion(0, 0, 1, 90);
//     q.conjugate();
//     let q1 = `Current Quaternion, Q1 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
//     let q2 = `Rotation Quaternion, Q2 = (${q.w.toFixed(2)}, ${q.x.toFixed(2)}, ${q.y.toFixed(2)}, ${q.z.toFixed(2)})<br/>`;
//     initQuat.multiply(q);
//     let result = `Quarternion Result, Q1 * Q2 = (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})<br/>`;
//     let returnQ = initQuat.toAxisAngle();
//     let axisResult = `Angle-Axis Result, Q1 * Q2 = (${returnQ.w.toFixed(2)}, ${returnQ.x.toFixed(2)}, ${returnQ.y.toFixed(2)}, ${returnQ.z.toFixed(2)})`;
//     cube.style.transform = "rotate3d(" + returnQ.x + "," + returnQ.y + "," + returnQ.z + "," + returnQ.w + "deg)";
//     document.getElementById("text-container").innerHTML = `<span class='textCSS'>${q1} ${q2} ${result} ${axisResult}</span>`;
// };


