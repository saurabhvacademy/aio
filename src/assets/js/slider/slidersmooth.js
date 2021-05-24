(function (window, document) {
  function loadScripts() {
     if(document.getElementById('scriptsToDefer')){
        var scriptsToDefer = JSON.parse(document.getElementById('scriptsToDefer').firstChild.nodeValue);
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = scriptsToDefer;
        document.body.appendChild(s);
     } 
    
  }

  window.addEventListener('load', function () {
    setTimeout(loadScripts);
  });
})(window, document);
