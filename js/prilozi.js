let slike ="https://docs.google.com/spreadsheets/d/e/2PACX-1vQdynbTdIJPNWUtx-a5joIjDxx3uifMLbWhJgsr2fPT7w0ErRJ3-3BdCgMsUZTPzcpmgAxipyqyBRjB/pub?gid=1152255770&single=true&output=csv";
Papa.parse(slike, {
  download: true,
  header: true,
  complete: addPoints,
});


function addPoints(data) {
  data = data.data;
  for (let row = 0; row < data.length; row++) {
    $("#prilozi").append(' <figure><a target="_blank" onclick="modal(this)" class="js-modal-trigger" data-target="modal-js-example" data-tekst="'+data[row].Tekst+'" data-id="'+data[row].ID+'" data-vol="'+data[row].Vol+'" data-naslov="'+data[row].Naslov+'"><img src="/prilozi/vol'+data[row].Vol+'/('+data[row].ID+').jpeg" alt="Cinque Terre" width="600" height="400"></a><figcaption">'+data[row].Tekst+'</figcaption></figure>')
  }
  $("#impresum").click()
}




function modal(e){
  $(".modal-card-body").empty();
  $(".modal-card-body").append('<div id="image-map"></div><div id="map-sizer"></div>')
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }
  function closeModal($el) {
    $el.classList.remove('is-active');
  }
  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }
  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button ') || []).forEach(($close) => {
    const $target = $close.closest('.modal');
    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
  
  function createMap(mapId, mapSizer, imageSrc, markers) {
    function pixelTolatlngPosition(pos, map) {
      let LatLng = map.unproject(pos, map.getMaxZoom() - 1);
      return LatLng;
    };
    
    function latlngToPixelPosition(latlng, map) {
      let clientClick = map.project(latlng, map.getZoom());
      let overlay = map["imageOverlay"];
      let overlayImage = overlay["_image"]
  
      //Calculate the current image ratio from the original (deals with zoom)
      let yR = overlayImage.clientHeight / overlayImage.naturalHeight;
      let xR = overlayImage.clientWidth / overlayImage.naturalWidth;
  
      //scale the click coordinates to the original dimensions
      //basically compensating for the scaling calculated by the map projection
      let x = clientClick.x / xR;
      let y = clientClick.y / yR;
  
      return {x:x, y:y};
    }
    function loadMarkers(map, markers) {
      markers.forEach(m => {
         addMarker(m, map)
      })
    }
    function imageReady(map, mapSizer) {
      
       let w = mapSizer.firstElementChild.naturalWidth,
           h = mapSizer.firstElementChild.naturalHeight,
           url = imageSrc;
      let southWest = map.unproject([0, h], map.getMaxZoom() - 1);
      let northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
      let bounds = L.latLngBounds(southWest, northEast);
  
      // add the image overlay, so that it covers the entire this.map
      var imageOverlay = L.imageOverlay(url, bounds); 
      map.setMaxBounds(bounds); //set limit where map can be
      map.fitBounds(bounds); //center in bounds
      imageOverlay.addTo(map);
      map["imageOverlay"] = imageOverlay;
    }
    
    var map = L.map(mapId, {
      minZoom: 1,
      maxZoom: 5,
      center: [0, 0],
      zoom: 5,
      crs: L.CRS.Simple, fullscreenControl: {
        pseudoFullscreen: false,
        title: {
          'false': 'prikaz preko punog zaslona',
          'true': 'izlaz preko punog zaslona'
      } // if true, fullscreen to page width and height
  }
    }); 
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | © <a href="https://www.lzmk.hr/">LZMK</a>')
  
    //create mapImgLoader
    let mapSz = document.getElementById(mapSizer);
  
    if (mapSz.firstElementChild)
        mapSz.firstElementChild.remove();
  
    let imgPlano = new Image();
    mapSz.appendChild(imgPlano);
    imgPlano.onload = (() => 
                       {
      imageReady(map, mapSz)
      loadMarkers(map, markers);
    });
    imgPlano.src = imageSrc;
    
  
    return map;
  }
  if (e.id=="impresum"){$(".modal-card-title").html("Impresum");$(".modal-card-body").html('<p><strong>Glavni urednici:</strong>&nbsp;Slavko Batušić, Andre Mohorovičić, Mirko Šeper<br />  <strong>Godina izdanja:</strong>&nbsp;1959–1966.<br /><strong>Broj svezaka:</strong>4</p><p>&nbsp;</p><p><strong>Mrežno izdanje</strong><br /> <strong>Urednice:&nbsp;</strong>Irina Starčević Stančić, Cvijeta Kraus<br /> <strong>Izrada mrežne stranice:&nbsp;</strong>Josip Mihaljević<br /> <strong>Računalni unos podataka:&nbsp;</strong>Suzana Caganić</p><br><p>&copy;2022&nbsp;Leksikografski zavod Miroslav Krleža. Sva prava pridržana.</p>');  $(".modal-card-foot a").html("")}
else{
  id=e.getAttribute("data-id")
  vol=e.getAttribute("data-vol")
  tekst=e.getAttribute("data-tekst")
  naslov=e.getAttribute("data-naslov")

  let imageSrc = "../prilozi/vol"+vol+"/("+id+").jpeg";
  $(".modal-card-foot").html(tekst)
  $(".modal-card-title").html(naslov)
  
  let markers=[]
  
  
  
  var myMap = createMap('image-map', 'map-sizer', imageSrc, markers)
}

}

