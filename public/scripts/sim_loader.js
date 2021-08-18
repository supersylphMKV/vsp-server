var mainRoot, unityRoot, userName;
$(setup);

function setup(){
    mainRoot = $('#unity-container');
    unityRoot = $('#unity_canvas');
    userName = $('#unity-container').attr('data-id');

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

    loadingBar.style.display = 'block';

    var script = document.createElement("script");
    script.src = "/sim/Build/VSP.loader.js";
    script.onload = ()=>{
        createUnityInstance(document.querySelector("#unity-canvas"), {
            dataUrl: "./sim/Build/VSP.data",
            frameworkUrl: "/sim/Build/VSP.framework.js",
            codeUrl: "./sim/Build/VSP.wasm",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "DefaultCompany",
            productName: "VirtualSpaceDemo",
            productVersion: "0.1",
            // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
            // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
          }, (progress) => {
            progressBarFull.style.width = 100 * progress + "%";
          }).then((unityInstance) => {
              loadingBar.style.display = "none";
              SimInit(unityInstance, () => {
                //unityInstance.SetFullscreen(1);
                if(userName){
                  SimSpawn(userName, true);
                }
                DataInit();
              });
          }).catch((message) => {
              alert(message);
          });
    }
    document.body.appendChild(script);
}