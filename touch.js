import {rotateXPos, rotateXNeg, rotateYPos, rotateYNeg} from "./main.js"

let touchstartX;
let touchstartY;
let touchendX;
let touchendY;


export function handleTouchStart(event) {
    touchstartX = event.touches[0].clientX;
    touchstartY = event.touches[0].clientY;
};

export function handleTouchMove(event) {
    touchendX = event.touches[0].clientX;
    touchendY = event.touches[0].clientY;
    event.preventDefault();
};

export function handleTouchEnd() {
    const threshold = 75;
    const deltaX = touchendX - touchstartX;
    const deltaY = touchendY - touchstartY;
    if ((Math.abs(deltaX) > Math.abs(deltaY)) && (Math.abs(deltaX) > threshold)) {
        // Horizontal swipe
        if (deltaX > 0) {
          // Swipe right
          rotateYPos();
        } else {
          // Swipe left
          rotateYNeg();
        }
    } else if ((Math.abs(deltaY) > Math.abs(deltaX)) && (Math.abs(deltaY) > threshold)) {
        // Vertical swipe
        if (deltaY > 0) {
          // Swipe down
          rotateXNeg();
        } else {
          // Swipe up
          rotateXPos();
        }
    }
};


