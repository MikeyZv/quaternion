const canvas1 = document.getElementById("animation-box-front");
const ctx1 = canvas1.getContext("2d");

const canvas2 = document.getElementById("animation-box-back");
const ctx2 = canvas2.getContext("2d");

const canvas3 = document.getElementById("animation-box-left");
const ctx3 = canvas3.getContext("2d");

const canvas4 = document.getElementById("animation-box-right");
const ctx4 = canvas4.getContext("2d");

const canvas5 = document.getElementById("animation-box-top");
const ctx5 = canvas5.getContext("2d");

const canvas6 = document.getElementById("animation-box-bottom");
const ctx6 = canvas6.getContext("2d");

canvas1.width = 300;
canvas1.height = 300;

canvas2.width = 300;
canvas2.height = 300;

canvas3.width = 300;
canvas3.height = 300;

canvas4.width = 300;
canvas4.height = 300;

canvas5.width = 300;
canvas5.height = 300;

canvas6.width = 300;
canvas6.height = 300;

//モエヤキオカ7ケサスz152ヨタワ4ネヌナ98ヒ0ホア3ウセ¦:꞊ミラリ╌ツテニハソ—<>0|+*コシマムメ
let textColor = "red";
let letters = "モエヤキオカ7ケサスz152ヨタワ4ネヌナ98ヒ0ホア3ウセ¦:꞊ミラリ╌ツテニハソ—<>0|+*コシマムメ";
letters = letters.split("");

const columnWidth = 20;
let columns = (canvas1.width / columnWidth) + 0.5;
let trails = [];
for (let i = 0; i < columns; i++) {
    trails[i] = 1;
}

canvas5.addEventListener("click", changeColor1);
canvas6.addEventListener("click", changeColor2);


function changeColor1() {
    textColor = "#00FF41";
}

function changeColor2() {
    textColor = "red";
}


function draw(canvas, ctx) {
    //makes trail fade
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgb(255, 255, 255, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < columns; i++) {
        let text = letters[Math.floor(Math.random() * letters.length)];

        //constant text settings
        ctx.textAlign = "center";
        ctx.font = "20px Matrix";

        ctx.clearRect((i * columnWidth) - (columnWidth / 2), (trails[i] * columnWidth) - (columnWidth * 0.8), columnWidth, columnWidth);
        ctx.fillStyle = textColor;
        ctx.fillText(text, i * columnWidth, trails[i] * columnWidth);

        trails[i]++;

        //&& Math.random() > 0.95 #00FF41
        //random spawns at when trails reaches bottom of page
        if (trails[i] * columnWidth > canvas.height && Math.random() > 0.95) {
            let text2 = letters[Math.floor(Math.random() * letters.length)];
            let text3 = letters[Math.floor(Math.random() * letters.length)];

            //random indices
            randomIndX = Math.floor(Math.random() * columns);
            randomIndX2 = Math.floor(Math.random() * columns);
            while (randomIndX2 == randomIndX) {
                randomIndX2 = Math.floor(Math.random() * columns);
            }
            randomIndY = Math.floor(Math.random() * columns);
            randomIndY2 = Math.floor(Math.random() * columns);
            while (randomIndY2 == randomIndY) {
                randomIndY2 = Math.floor(Math.random() * columns);
            }

            // first random cluster
            ctx.clearRect(((randomIndX * columnWidth) - (columnWidth / 2)), ((trails[randomIndX]-randomIndY) * columnWidth) - (columnWidth * 0.8), columnWidth, columnWidth);
            ctx.fillStyle = textColor;
            ctx.fillText(text2, randomIndX * columnWidth, (trails[randomIndX]-randomIndY) * columnWidth);

            //second random cluster
            ctx.clearRect(((randomIndX2 * columnWidth) - (columnWidth / 2)), ((trails[randomIndX2]-randomIndY2) * columnWidth) - (columnWidth * 0.8), columnWidth, columnWidth);
            ctx.fillStyle = textColor;
            ctx.fillText(text3, randomIndX2 * columnWidth, (trails[randomIndX2]-randomIndY2) * columnWidth);

            // reset y coordinates back to 0 (top of page)
            trails[i] = 0;
        }
    }
};

setInterval(() => {
    draw(canvas1, ctx1)
}, 10);
setInterval(() => {
    draw(canvas2, ctx2)
}, 10);
setInterval(() => {
    draw(canvas3, ctx3)
}, 10);
setInterval(() => {
    draw(canvas4, ctx4)
}, 10);
setInterval(() => {
    draw(canvas5, ctx5)
}, 10);
setInterval(() => {
    draw(canvas6, ctx6)
}, 10);