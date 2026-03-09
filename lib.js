const splat3DStyleDefault = document.createElement('style');
splat3DStyleDefault.innerHTML = `
.splat3D {
    border-radius: 15px;
    border: none;
    width: 100%;
    height: 100%;
    background: black;
}
.splat3DError { 
    border-radius: 15px; 
    width: 100%; 
    height: 100%; 
    background: black; 
    color: white; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    font-family: sans-serif; 
    text-align: center;
}
`;
document.head.insertBefore(splat3DStyleDefault, document.head.firstChild);

const iframeVisibilityObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        const iframe = entry.target;
        const originalSrc = iframe.dataset.originalSrc;

        if (!entry.isIntersecting) {
            if (!iframe.dataset.unloaded) {
                iframe.src = "";
                iframe.dataset.unloaded = "true";
            };
        } else {
            if (iframe.dataset.unloaded) {
                iframe.src = originalSrc;
                iframe.dataset.unloaded = "";
            };
        };
    });
}, { threshold: 0 });

function loadSplats() {
    document.querySelectorAll('splat3D').forEach(function (player) {

        if (location.protocol && location.protocol === "http:") {
            const error = document.createElement('div');
            error.className = player.className + " splat3DError";
            error.id = player.id;
            error.style.cssText = player.style.cssText;
            error.textContent = "Splat3D does not work on insecure sites. Please upgrade to HTTPS.";
            player.replaceWith(error);
            return;
        };

        var modeliframe = document.createElement('iframe');
        var params = new URLSearchParams();

        for (var attr of player.attributes) {
            params.set(attr.name, attr.value);
        };

        var src = `https://phswireclippers5902.github.io/robotembed/?${params.toString()}`;

        modeliframe.src = src;
        modeliframe.dataset.originalSrc = src;
        modeliframe.className = player.className;
        modeliframe.id = player.id;
        modeliframe.style.cssText = player.style.cssText;
        modeliframe.classList.add("splat3D");

        player.replaceWith(modeliframe);

        iframeVisibilityObserver.observe(modeliframe);
    });
};

loadSplats();
