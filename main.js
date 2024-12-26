import { Quaternion, slerp } from "./quaternion.js";
import { handleTouchStart, handleTouchMove, handleTouchEnd } from "./touch.js";

const touchpad = document.querySelector(".cube-container");
const xPos90Btn = document.querySelector("#btn-rotate-x-pos90");
const yPos90Btn = document.querySelector("#btn-rotate-y-pos90");
const zPos90Btn = document.querySelector("#btn-rotate-z-pos90");
const xNeg90Btn = document.querySelector("#btn-rotate-x-neg90");
const yNeg90Btn = document.querySelector("#btn-rotate-y-neg90");
const zNeg90Btn = document.querySelector("#btn-rotate-z-neg90");

let t;

function addListeners() {
    xPos90Btn.addEventListener("click", rotateXPos);
    yPos90Btn.addEventListener("click", rotateYPos);
    zPos90Btn.addEventListener("click", rotateZPos); 
    xNeg90Btn.addEventListener("click", rotateXNeg);
    yNeg90Btn.addEventListener("click", rotateYNeg);
    zNeg90Btn.addEventListener("click", rotateZNeg);
    touchpad.addEventListener("touchstart", handleTouchStart);
    touchpad.addEventListener("touchmove", handleTouchMove);
    touchpad.addEventListener("touchend", handleTouchEnd);
};

function removeListeners() {
    xPos90Btn.removeEventListener("click", rotateXPos);
    yPos90Btn.removeEventListener("click", rotateYPos);
    zPos90Btn.removeEventListener("click", rotateZPos); 
    xNeg90Btn.removeEventListener("click", rotateXNeg);
    yNeg90Btn.removeEventListener("click", rotateYNeg);
    zNeg90Btn.removeEventListener("click", rotateZNeg);
    touchpad.removeEventListener("touchstart", handleTouchStart);
    touchpad.removeEventListener("touchmove", handleTouchMove);
    touchpad.removeEventListener("touchend", handleTouchEnd);
};

addListeners();

let initQuat = new Quaternion(0,0,0,0);
initQuat.toQuaternion();

document.getElementById("text-container").innerHTML = `<span class='textCSS'>initial quaternion, (${initQuat.w.toFixed(2)}, ${initQuat.x.toFixed(2)}, ${initQuat.y.toFixed(2)}, ${initQuat.z.toFixed(2)})</span>`;

export function rotateXPos() {
    removeListeners();

    //initial quaternion
    let q1 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    //q1 text
    let text1 = "initial quaternion<br/>";
    let text2 = `q1, quaternion = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/>`;
    q1.toAxisAngle();
    let text3 = `q1, angle-axis = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/><br/>`;
    q1.toQuaternion();

    //transformation quaternion
    let q2 = new Quaternion(90, 1, 0, 0);
    q2.toQuaternion();

    //q2 text
    let text4 = "transformation quaternion<br/>";
    let text5 = `q2, quaternion = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/>`;
    q2.toAxisAngle();
    let text6 = `q2, angle-axis = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/><br/>`;
    q2.toQuaternion();

    //q1 * q2
    initQuat.multiply(q2);

    //result
    let q3 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    //q3 text
    let text7 = "q3 = q1 * q2<br/>";
    let text8 = `q3, quaternion = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;
    q3.toAxisAngle();
    let text9 = `q3, angle-axis = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/><br/>`;
    q3.toQuaternion();

    //slerp
    t = 0;
    let slerpInterval = setInterval(()=>{
        let cube = document.querySelector(".cube");
        let percent = t/100;
        let slerpQ = slerp(q1, q3, percent);
        let slerpText1 = `slerp(q1, q3), quaternion = (${slerpQ.w.toFixed(2)}, ${slerpQ.x.toFixed(2)}, ${slerpQ.y.toFixed(2)}, ${slerpQ.z.toFixed(2)})<br/>`;
        slerpQ.toAxisAngle();
        cube.style.transform = `rotate3d(${slerpQ.x},${slerpQ.y},${slerpQ.z},${slerpQ.w}deg)`;
        let slerpText2 = `slerp(q1, q3), angle-axis = (${slerpQ.w.toFixed(2)}, ${slerpQ.x.toFixed(2)}, ${slerpQ.y.toFixed(2)}, ${slerpQ.z.toFixed(2)})<br/>`;
        document.getElementById("slerp-container").innerHTML = `<span class='textCSS'>${slerpText1} ${slerpText2}</span>`;
        t++;
        if (t == 101) {
            clearInterval(slerpInterval);
        }
    }, 4);

    //print text
    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${text1} ${text2} ${text3} ${text4} ${text5} ${text6} ${text7} ${text8} ${text9}</span>`;

    //prevent users from spamming
    setTimeout(()=>{
        addListeners();
    }, 405);
};

export function rotateYPos() {
    removeListeners();

    //initial quaternion
    let q1 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    //q1 text
    let text1 = "initial quaternion<br/>";
    let text2 = `q1, quaternion = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/>`;
    q1.toAxisAngle();
    let text3 = `q1, angle-axis = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/><br/>`;
    q1.toQuaternion();

    //transformation quaternion
    let q2 = new Quaternion(90, 0, 1, 0);
    q2.toQuaternion();

    //q2 text
    let text4 = "transformation quaternion<br/>";
    let text5 = `q2, quaternion = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/>`;
    q2.toAxisAngle();
    let text6 = `q2, angle-axis = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/><br/>`;
    q2.toQuaternion();

    //q1 * q2
    initQuat.multiply(q2);

    //result
    let q3 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    //q3 text
    let text7 = "q3 = q1 * q2<br/>";
    let text8 = `q3, quaternion = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;
    q3.toAxisAngle();
    let text9 = `q3, angle-axis = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/><br/>`;
    q3.toQuaternion();

    //slerp
    t = 0;
    let slerpInterval = setInterval(()=>{
        let cube = document.querySelector(".cube");
        let percent = t/100;
        let slerpQ = slerp(q1, q3, percent);
        let slerpText1 = `slerp(q1, q3), quaternion = (${slerpQ.w.toFixed(2)}, ${slerpQ.x.toFixed(2)}, ${slerpQ.y.toFixed(2)}, ${slerpQ.z.toFixed(2)})<br/>`;
        slerpQ.toAxisAngle();
        cube.style.transform = `rotate3d(${slerpQ.x},${slerpQ.y},${slerpQ.z},${slerpQ.w}deg)`;
        let slerpText2 = `slerp(q1, q3), angle-axis = (${slerpQ.w.toFixed(2)}, ${slerpQ.x.toFixed(2)}, ${slerpQ.y.toFixed(2)}, ${slerpQ.z.toFixed(2)})<br/>`;
        document.getElementById("slerp-container").innerHTML = `<span class='textCSS'>${slerpText1} ${slerpText2}</span>`;
        t++;
        if (t == 101) {
            clearInterval(slerpInterval);
        }
    }, 4);

    //print text
    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${text1} ${text2} ${text3} ${text4} ${text5} ${text6} ${text7} ${text8} ${text9}</span>`;

    //prevent users from spamming
    setTimeout(()=>{
        addListeners();
    }, 405);
};

function rotateZPos() {
    removeListeners();

    //initial quaternion
    let q1 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    //q1 text
    let text1 = "initial quaternion<br/>";
    let text2 = `q1, quaternion = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/>`;
    q1.toAxisAngle();
    let text3 = `q1, angle-axis = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/><br/>`;
    q1.toQuaternion();

    //transformation quaternion
    let q2 = new Quaternion(90, 0, 0, 1);
    q2.toQuaternion();

    //q2 text
    let text4 = "transformation quaternion<br/>";
    let text5 = `q2, quaternion = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/>`;
    q2.toAxisAngle();
    let text6 = `q2, angle-axis = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/><br/>`;
    q2.toQuaternion();

    //q1 * q2
    initQuat.multiply(q2);

    //result
    let q3 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    //q3 text
    let text7 = "q3 = q1 * q2<br/>";
    let text8 = `q3, quaternion = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;
    q3.toAxisAngle();
    let text9 = `q3, angle-axis = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/><br/>`;
    q3.toQuaternion();

    //slerp
    t = 0;
    let slerpInterval = setInterval(()=>{
        let cube = document.querySelector(".cube");
        let percent = t/100;
        let slerpQ = slerp(q1, q3, percent);
        let slerpText1 = `slerp(q1, q3), quaternion = (${slerpQ.w.toFixed(2)}, ${slerpQ.x.toFixed(2)}, ${slerpQ.y.toFixed(2)}, ${slerpQ.z.toFixed(2)})<br/>`;
        slerpQ.toAxisAngle();
        cube.style.transform = `rotate3d(${slerpQ.x},${slerpQ.y},${slerpQ.z},${slerpQ.w}deg)`;
        let slerpText2 = `slerp(q1, q3), angle-axis = (${slerpQ.w.toFixed(2)}, ${slerpQ.x.toFixed(2)}, ${slerpQ.y.toFixed(2)}, ${slerpQ.z.toFixed(2)})<br/>`;
        document.getElementById("slerp-container").innerHTML = `<span class='textCSS'>${slerpText1} ${slerpText2}</span>`;
        t++;
        if (t == 101) {
            clearInterval(slerpInterval);
        }
    }, 4);

    //print text
    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${text1} ${text2} ${text3} ${text4} ${text5} ${text6} ${text7} ${text8} ${text9}</span>`;

    //prevent users from spamming
    setTimeout(()=>{
        addListeners();
    }, 405);
};

export function rotateXNeg() {
    removeListeners();

    //initial quaternion
    let q1 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    //q1 text
    let text1 = "initial quaternion<br/>";
    let text2 = `q1, quaternion = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/>`;
    q1.toAxisAngle();
    let text3 = `q1, angle-axis = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/><br/>`;
    q1.toQuaternion();

    //transformation quaternion
    let q2 = new Quaternion(90, 1, 0, 0);
    q2.toQuaternion();
    q2.conjugate();

    //q2 text
    let text4 = "transformation quaternion<br/>";
    let text5 = `q2, quaternion = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/>`;
    q2.toAxisAngle();
    let text6 = `q2, angle-axis = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/><br/>`;
    q2.toQuaternion();

    //q1 * q2
    initQuat.multiply(q2);

    //result
    let q3 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    //q3 text
    let text7 = "q3 = q1 * q2<br/>";
    let text8 = `q3, quaternion = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;
    q3.toAxisAngle();
    let text9 = `q3, angle-axis = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/><br/>`;
    q3.toQuaternion();

    //slerp
    t = 0;
    let slerpInterval = setInterval(()=>{
        let cube = document.querySelector(".cube");
        let percent = t/100;
        let slerpQ = slerp(q1, q3, percent);
        let slerpText1 = `slerp(q1, q3), quaternion = (${slerpQ.w.toFixed(2)}, ${slerpQ.x.toFixed(2)}, ${slerpQ.y.toFixed(2)}, ${slerpQ.z.toFixed(2)})<br/>`;
        slerpQ.toAxisAngle();
        cube.style.transform = `rotate3d(${slerpQ.x},${slerpQ.y},${slerpQ.z},${slerpQ.w}deg)`;
        let slerpText2 = `slerp(q1, q3), angle-axis = (${slerpQ.w.toFixed(2)}, ${slerpQ.x.toFixed(2)}, ${slerpQ.y.toFixed(2)}, ${slerpQ.z.toFixed(2)})<br/>`;
        document.getElementById("slerp-container").innerHTML = `<span class='textCSS'>${slerpText1} ${slerpText2}</span>`;
        t++;
        if (t == 101) {
            clearInterval(slerpInterval);
        }
    }, 4);

    //print text
    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${text1} ${text2} ${text3} ${text4} ${text5} ${text6} ${text7} ${text8} ${text9}</span>`;

    //prevent users from spamming
    setTimeout(()=>{
        addListeners();
    }, 405);
};

export function rotateYNeg() {
    removeListeners();

    //initial quaternion
    let q1 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    //q1 text
    let text1 = "initial quaternion<br/>";
    let text2 = `q1, quaternion = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/>`;
    q1.toAxisAngle();
    let text3 = `q1, angle-axis = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/><br/>`;
    q1.toQuaternion();

    //transformation quaternion
    let q2 = new Quaternion(90, 0, 1, 0);
    q2.toQuaternion();
    q2.conjugate();

    //q2 text
    let text4 = "transformation quaternion<br/>";
    let text5 = `q2, quaternion = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/>`;
    q2.toAxisAngle();
    let text6 = `q2, angle-axis = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/><br/>`;
    q2.toQuaternion();

    //q1 * q2
    initQuat.multiply(q2);

    //result
    let q3 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    //q3 text
    let text7 = "q3 = q1 * q2<br/>";
    let text8 = `q3, quaternion = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;
    q3.toAxisAngle();
    let text9 = `q3, angle-axis = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/><br/>`;
    q3.toQuaternion();

    //slerp
    t = 0;
    let slerpInterval = setInterval(()=>{
        let cube = document.querySelector(".cube");
        let percent = t/100;
        let slerpQ = slerp(q1, q3, percent);
        let slerpText1 = `slerp(q1, q3), quaternion = (${slerpQ.w.toFixed(2)}, ${slerpQ.x.toFixed(2)}, ${slerpQ.y.toFixed(2)}, ${slerpQ.z.toFixed(2)})<br/>`;
        slerpQ.toAxisAngle();
        cube.style.transform = `rotate3d(${slerpQ.x},${slerpQ.y},${slerpQ.z},${slerpQ.w}deg)`;
        let slerpText2 = `slerp(q1, q3), angle-axis = (${slerpQ.w.toFixed(2)}, ${slerpQ.x.toFixed(2)}, ${slerpQ.y.toFixed(2)}, ${slerpQ.z.toFixed(2)})<br/>`;
        document.getElementById("slerp-container").innerHTML = `<span class='textCSS'>${slerpText1} ${slerpText2}</span>`;
        t++;
        if (t == 101) {
            clearInterval(slerpInterval);
        }
    }, 4);

    //print text
    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${text1} ${text2} ${text3} ${text4} ${text5} ${text6} ${text7} ${text8} ${text9}</span>`;

    //prevent users from spamming
    setTimeout(()=>{
        addListeners();
    }, 405);
};

function rotateZNeg() {
    removeListeners();

    //initial quaternion
    let q1 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    //q1 text
    let text1 = "initial quaternion<br/>";
    let text2 = `q1, quaternion = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/>`;
    q1.toAxisAngle();
    let text3 = `q1, angle-axis = (${q1.w.toFixed(2)}, ${q1.x.toFixed(2)}, ${q1.y.toFixed(2)}, ${q1.z.toFixed(2)})<br/><br/>`;
    q1.toQuaternion();

    //transformation quaternion
    let q2 = new Quaternion(90, 0, 0, 1);
    q2.toQuaternion();
    q2.conjugate();

    //q2 text
    let text4 = "transformation quaternion<br/>";
    let text5 = `q2, quaternion = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/>`;
    q2.toAxisAngle();
    let text6 = `q2, angle-axis = (${q2.w.toFixed(2)}, ${q2.x.toFixed(2)}, ${q2.y.toFixed(2)}, ${q2.z.toFixed(2)})<br/><br/>`;
    q2.toQuaternion();

    //q1 * q2
    initQuat.multiply(q2);

    //result
    let q3 = new Quaternion(initQuat.w, initQuat.x, initQuat.y, initQuat.z);

    //q3 text
    let text7 = "q3 = q1 * q2<br/>";
    let text8 = `q3, quaternion = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/>`;
    q3.toAxisAngle();
    let text9 = `q3, angle-axis = (${q3.w.toFixed(2)}, ${q3.x.toFixed(2)}, ${q3.y.toFixed(2)}, ${q3.z.toFixed(2)})<br/><br/>`;
    q3.toQuaternion();

    //slerp
    t = 0;
    let slerpInterval = setInterval(()=>{
        let cube = document.querySelector(".cube");
        let percent = t/100;
        let slerpQ = slerp(q1, q3, percent);
        let slerpText1 = `slerp(q1, q3), quaternion = (${slerpQ.w.toFixed(2)}, ${slerpQ.x.toFixed(2)}, ${slerpQ.y.toFixed(2)}, ${slerpQ.z.toFixed(2)})<br/>`;
        slerpQ.toAxisAngle();
        cube.style.transform = `rotate3d(${slerpQ.x},${slerpQ.y},${slerpQ.z},${slerpQ.w}deg)`;
        let slerpText2 = `slerp(q1, q3), angle-axis = (${slerpQ.w.toFixed(2)}, ${slerpQ.x.toFixed(2)}, ${slerpQ.y.toFixed(2)}, ${slerpQ.z.toFixed(2)})<br/>`;
        document.getElementById("slerp-container").innerHTML = `<span class='textCSS'>${slerpText1} ${slerpText2}</span>`;
        t++;
        if (t == 101) {
            clearInterval(slerpInterval);
        }
    }, 4);

    //print text
    document.getElementById("text-container").innerHTML = `<span class='textCSS'>${text1} ${text2} ${text3} ${text4} ${text5} ${text6} ${text7} ${text8} ${text9}</span>`;

    //prevent users from spamming
    setTimeout(()=>{
        addListeners();
    }, 405);
};
