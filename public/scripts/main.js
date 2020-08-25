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

const initializeGraph = _ =>
{
    // Create and populate the graph with stuff
    let ctx = main.graphsCanvas.getContext('2d');

    ctx.clearRect(0, 0, main.graphsCanvas.width, main.graphsCanvas.height);
    ctx.font = "3rem Roboto";
    ctx.fillText("Graph Goes Here", 15, 40);

    //totalUserCount
    //favoriteColor
    //favoriteGame
    //preferredPhrase
    var yPos = 450;
    var xPos = 15;
    var xPosOffset = 30;
    var width = 15;
    var heightOffset = 100;

    ctx.fillStyle = "red";
    ctx.fillRect(xPos,               yPos, width, -(main.apiResult.data.favoriteColor["Cyan"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillRect(xPos += xPosOffset, yPos, width, -(main.apiResult.data.favoriteColor["Olive Drab"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillRect(xPos += xPosOffset, yPos, width, -(main.apiResult.data.favoriteColor["Orange"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    ctx.fillRect(xPos += xPosOffset, yPos, width, -(main.apiResult.data.favoriteColor["Purple"] / main.apiResult.data.totalUserCount) * heightOffset + 1);
    renderData(main.apiResult);
};

const renderData = data =>
{

};

main.graphsCanvas.setAttribute("width", `${main.graphsCanvas.clientWidth}`);
main.graphsCanvas.setAttribute("height", `${main.graphsCanvas.clientHeight}`);

fetch(main.apiUrl).then(res => res.json()).then(data => { main.apiResult.data = data; main.apiResult.fetched = true });
const check = window.setInterval(checkForApiData, 500);

main.graphsCanvas.getContext('2d').font = "1.2rem Roboto";
main.graphsCanvas.getContext('2d').fillText("Loading question data from API...", 15, 30);