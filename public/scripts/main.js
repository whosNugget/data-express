const main = {
    graphsCanvas: document.querySelector("#graphs"),
    apiUrl: "http://localhost:3000/api",
    apiResult: { fetched: false },
    apiPollCount: 0,
};

const checkForApiData = _ =>
{
    main.apiPollCount++;
    console.log("checking for api data", main.apiResult);
    if (main.apiResult.fetched)
    {
        window.clearInterval(check);
        initializeGraph();
    } else if (main.apiPollCount > 100) window.clearInterval(check);
};

let yPos = 200;
let xPos = 0;
let xPosOffset = 150;
let width = 80;
let heightOffset = 100;
const initializeGraph = _ =>
{
    // Create and populate the graph with stuff
    let ctx = main.graphsCanvas.getContext('2d');
    xPos = (main.graphsCanvas.width / 4) - width / 2;

    ctx.clearRect(0, 0, main.graphsCanvas.width, main.graphsCanvas.height);
    ctx.font = "3rem Roboto";

    //totalUserCount
    //favoriteColor
    //favoriteGame
    //preferredPhrase

    ctx.textAlign = 'center';

    //Favorite Color
    ctx.fillStyle = "red";
    ctx.fillText("Favorite Color?", main.graphsCanvas.width / 2, 50);

    ctx.font = "15px Roboto";
    ctx.fillRect(xPos, yPos, width, -(main.apiResult.data.favoriteColor["Cyan"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillText("Cyan " + main.apiResult.data.favoriteColor["Cyan"], xPos + (width / 2), yPos + 30)
    ctx.fillRect(xPos += xPosOffset, yPos, width, -(main.apiResult.data.favoriteColor["Olive Drab"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillText("Olive Drab " + main.apiResult.data.favoriteColor["Olive Drab"], xPos + (width / 2), yPos + 30)
    ctx.fillRect(xPos += xPosOffset, yPos, width, -(main.apiResult.data.favoriteColor["Orange"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillText("Orange " + main.apiResult.data.favoriteColor["Orange"], xPos + (width / 2), yPos + 30)
    ctx.fillRect(xPos += xPosOffset, yPos, width, -(main.apiResult.data.favoriteColor["Purple"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillText("Purple " + main.apiResult.data.favoriteColor["Purple"], xPos + (width / 2), yPos + 30)

    //Favorite Game
    xPos = (main.graphsCanvas.width / 4) - width / 2;
    yPos += 250;

    ctx.font = "3rem Roboto";
    ctx.fillStyle = "blue";
    ctx.fillText("Favorite Game?", main.graphsCanvas.width / 2, 300);

    ctx.font = "15px Roboto";
    ctx.fillRect(xPos, yPos, width, -(main.apiResult.data.favoriteGame["Halo"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillText("Halo " + main.apiResult.data.favoriteGame["Halo"], xPos + (width / 2), yPos + 30)
    ctx.fillRect(xPos += xPosOffset, yPos, width, -(main.apiResult.data.favoriteGame["Call of Duty"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillText("Call of Duty " + main.apiResult.data.favoriteGame["Call of Duty"], xPos + (width / 2), yPos + 30)
    ctx.fillRect(xPos += xPosOffset, yPos, width, -(main.apiResult.data.favoriteGame["Battlefield"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillText("Battlefield " + main.apiResult.data.favoriteGame["Battlefield"], xPos + (width / 2), yPos + 30)
    ctx.fillRect(xPos += xPosOffset, yPos, width, -(main.apiResult.data.favoriteGame["Super Mario"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillText("Super Mario " + main.apiResult.data.favoriteGame["Super Mario"], xPos + (width / 2), yPos + 30)

    //Preferred Phrase
    xPos = (main.graphsCanvas.width / 4) - width / 2;
    yPos += 250;

    ctx.font = "3rem Roboto";
    ctx.fillStyle = "green";
    ctx.fillText("Preferred Phrase?", main.graphsCanvas.width / 2, 550);

    ctx.font = "15px Roboto";
    ctx.fillRect(xPos, yPos, width, -(main.apiResult.data.preferredPhrase["Glass Half Empty"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillText("Glass Half Empty " + main.apiResult.data.preferredPhrase["Glass Half Empty"], xPos + (width / 2), yPos + 30)
    ctx.fillRect(xPos += xPosOffset, yPos, width, -(main.apiResult.data.preferredPhrase["Glass Half Full"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillText("Glass Half Full " + main.apiResult.data.preferredPhrase["Glass Half Full"], xPos + (width / 2), yPos + 30)
    ctx.fillRect(xPos += xPosOffset, yPos, width, -(main.apiResult.data.preferredPhrase["Tomorrow is a New Day"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillText("Tomorrow is a New Day " + main.apiResult.data.preferredPhrase["Tomorrow is a New Day"], xPos + (width / 2), yPos + 30)
    ctx.fillRect(xPos += xPosOffset, yPos, width, -(main.apiResult.data.preferredPhrase["I am tired"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillText("I am tired " + main.apiResult.data.preferredPhrase["I am tired"], xPos + (width / 2), yPos + 30)
};

//Only initialize the canvas and the API calls for logged in members
const resizeEvt = (window, evt) =>
{
    let header = document.querySelector("header");
    let mainDiv = document.querySelector("#main");

    mainDiv.style.marginTop = `${header.clientHeight + 140}px`;
};
let check;
if (main.graphsCanvas)
{
    main.graphsCanvas.setAttribute("width", `${main.graphsCanvas.clientWidth}`);
    main.graphsCanvas.style.height = `${yPos + 540}px`;
    main.graphsCanvas.setAttribute("height", `${main.graphsCanvas.clientHeight}`);
    main.graphsCanvas.getContext('2d').font = "1.2rem Roboto";
    main.graphsCanvas.getContext('2d').fillText("Loading question data from API...", 15, 30);
    fetch(main.apiUrl).then(res => res.json()).then(data => { main.apiResult.data = data; main.apiResult.fetched = true });
    check = window.setInterval(checkForApiData, 500);
    window.addEventListener("resize", resizeEvt);
    resizeEvt();
}
