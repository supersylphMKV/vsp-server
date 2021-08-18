var mainRoot, unityRoot, socket;

$(document).ready(setup);

function setup(){
    socket = io();
    mainRoot = $('#unity-container');
    unityRoot = $('#unity_canvas');

    var rootWidth, rootheight;
    var loadingBar = document.querySelector("#unity-loading-bar");
    var progressBarFull = document.querySelector("#unity-progress-bar-full");

    rootWidth = $(mainRoot).width();
    rootheight = $(mainRoot).height();
    
    if(unityRoot.length == 0){
        var simContainer = $('<canvas id="unity-canvas" width='+ 960 +' height='+ 600 +' style="width: '+ 960 +'px; height: '+ 600 +'px; background: #231F20"></canvas>');
        $(simContainer).prependTo(mainRoot);

        unityRoot = $('#unity_canvas');
    }

    console.log($(mainRoot).height(), $(mainRoot).width());

    loadingBar.style.display = 'block';

    var script = document.createElement("script");
    script.src = "/sim/Build/TempleSpace.loader.js";
    script.onload = ()=>{
        createUnityInstance(document.querySelector("#unity-canvas"), {
            dataUrl: "./sim/Build/TempleSpace.data",
            frameworkUrl: "/sim/Build/TempleSpace.framework.js",
            codeUrl: "./sim/Build/TempleSpace.wasm",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "DefaultCompany",
            productName: "2D_IsoTilemaps_Project",
            productVersion: "0.1",
            // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
            // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
          }, (progress) => {
            progressBarFull.style.width = 100 * progress + "%";
          }).then((unityInstance) => {
              loadingBar.style.display = "none";
              setTimeout(2000,()=>{
                unityInstance.SetFullscreen(1);
              });
          }).catch((message) => {
              alert(message);
          });
    }
    document.body.appendChild(script);
}