
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

let ipAddress;
const ipBtn = document.querySelector(".ipbtn");
ipBtn.addEventListener("click", () => {
    // document.querySelector(".ipDiv").style.display = "none";
    // ipAddress = document.querySelector(".ipInput").value;

    const left = document.querySelector("#left");
    left.addEventListener("click", async () => {
            await fetch(`http://${ipAddress.innerText}/?${
                left.name
              }=${left.value}`);
    });

    const right = document.querySelector("#right");
    right.addEventListener("click",async () => {
        await fetch(`http://${ipAddress.innerText}/?${
                right.name
              }=${right.value}`);
    });

    const backward = document.querySelector("#backward");
    backward.addEventListener("click", async() => {
        await fetch(`http://${ipAddress.innerText}/?${
                backward.name
              }=${backward.value}`);
    });
    const stop = document.querySelector("#stop");
    stop.addEventListener("click",async () => {
        await fetch(`http://${ipAddress.innerText}/?${
                stop.name
              }=${stop.value}`);
    });
    const forward = document.querySelector("#forward");
    forward.addEventListener("click", async() => {
        await fetch(`http://${ipAddress.innerText}/?${
                stop.name
              }=${stop.value}`);
    });
    const motioncontrol = document.querySelector("#motioncontrol");
    motioncontrol.addEventListener("click", async() => {
        await fetch(`http://${ipAddress.innerText}/?${
                motioncontrol.name
              }=${motioncontrol.value}`);
        if (motioncontrol.value == "on") {
            motioncontrol.value = "off";
            motioncontrol.innerText = "Off Automatic";
        } else {
            motioncontrol.value = "on";
            motioncontrol.innerText = "Automatic Motion control";
        }
    });

    const grassCutter = document.querySelector("#grasscutter");
    grassCutter.addEventListener("click",async () => {
        await  fetch(`http://${ipAddress.innerText}/?${
            grassCutter.name
          }=${grassCutter.value}`);
        if (grassCutter.value == "on") {
            grassCutter.value = "off";
            grassCutter.innerText = "Grass trimmer off";
        } else {
            grassCutter.value = "on";
            grassCutter.innerText = "Grass trimmer on";
        }
    });

    const plougher = document.querySelector("#plougher");
    plougher.addEventListener("click",async () => {
        await fetch(`http://${ipAddress.innerText}/?${
                plougher.name
              }=${plougher.value}`);
        if (plougher.value == "on") {
            plougher.value = "off";
            plougher.innerText = "plougher off";
        } else {
            plougher.value = "on";
            plougher.innerText = "plougher on";
        }
    });
    const seedsower = document.querySelector("#seedsower");
    seedsower.addEventListener("click", async() => {
        await fetch(`http://${ipAddress.innerText}/?${
                seedsower.name
              }=${seedsower.value}`);
        if (seedsower.value == "on") {
            seedsower.value = "off";
            seedsower.innerText = "seed sower off";
        } else {
            seedsower.value = "on";
            seedsower.innerText = "seed sower on";
        }
    });
});
//---------------------------------------------------------firebase-----------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyBkomFp8M4EZI-jjR06EKQSEoW2g2oJ934",
    authDomain: "spamar-71800.firebaseapp.com",
    projectId: "spamar-71800",
    storageBucket: "spamar-71800.appspot.com",
    messagingSenderId: "211264968903",
    appId: "1:211264968903:web:d81ba03baacd2f32e646e2",
};
const app = initializeApp(firebaseConfig);
import {
    getDatabase,
    get,
    ref,
    set,
    child,
    update,
    remove,
    onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const db = getDatabase();
var soilmoisture = document.querySelector(".smvalue");

function realtime() {
    const dbRef = ref(db);
    var x = onValue(dbRef, (snapshot) => {
        var data = [];
        snapshot.forEach((childsnapshot) => {
            console.log(childsnapshot.val());
            data.push(childsnapshot.val());
        });
        soilmoisture.innerText = parseInt(data[2]);
    });
}
window.onload = realtime();