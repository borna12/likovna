let vol1 = "sortirano.csv";
function copyClipboard(e) {
  if (document.body.createTextRange) (t = document.body.createTextRange()).moveToElementText(e), t.select(), document.execCommand("Copy"), t.removeAllRanges(); else if (window.getSelection) { var t, a = window.getSelection(); (t = document.createRange()).selectNodeContents(e), a.removeAllRanges(), a.addRange(t), document.execCommand("Copy"), a.removeAllRanges(), e.setAttribute("data-tooltip", "citat kopiran") }
  const myTimeout = setTimeout(myGreeting, 3000);

  function myGreeting() {
    e.setAttribute("data-tooltip", "kopiraj citat")
  }
}
function povezivanje(e) {
  
  try {
    document.getElementsByTagName("input")[0].value = e.innerText.toUpperCase();
    localStorage.setItem("trazi", e.innerText.toUpperCase());

  }
  catch {
    document.getElementsByTagName("input")[0].value = String(e).replace("_", " ");
    localStorage.setItem("trazi", String(e).replace("_", " "));
  }
  /*close the list of autocompleted values,
  (or any other open lists of autocompleted values:*/
  setTimeout(function(){
    history.replaceState("", document.title, window.location.pathname);
    window.open(window.location.href, '_blank');
}, 1);
}

function modal(e) {
  // Functions to open and close a modal
  function openModal($el) {
    try {
      $el.classList.add('is-active');
    }
    catch { }
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
    setTimeout(function(){
      history.replaceState("", document.title, window.location.pathname);
  }, 1);

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
  if (e.id == "impresum") { $(".modal-card-title").html("Impresum"); $(".modal-card-body").html('<p><strong>Tiskano izdanje</strong><br /><strong>Glavni urednici:</strong>&nbsp;Slavko Batušić, Andre Mohorovičić, Mirko Šeper<br />  <strong>Godina izdanja:</strong> 1959–1966.<br /><strong>Broj svezaka: </strong>4</p><p>&nbsp;</p><p><strong>Mrežno izdanje</strong><br /> <strong>Urednice:&nbsp;</strong>Irina Starčević Stančić, Cvijeta Kraus<br /> <strong>Izrada mrežne stranice:&nbsp;</strong>Josip Mihaljević<br /> <strong>Računalni unos podataka:</strong> Suzana Caganić, Gabrijela Romac</p><br><p>&copy;' + new Date().getFullYear() + ' &nbsp;Leksikografski zavod Miroslav Krleža. Sva prava pridržana.</p>'); $(".modal-card-foot a").html("") }
  else {
    window.location.hash = e.getAttribute("data-id");

    adresa = window.location.href.split('#vrh')[0]
    if (Number(e.getAttribute("data-vol")) == "4") { broj = Number(e.getAttribute("data-stranica")) + 9 }
    else { broj = Number(e.getAttribute("data-stranica")) + 6 }
    vol = e.getAttribute("data-vol")
    if (Number(e.getAttribute("data-vol")) == "3" && broj >= 103) { broj = broj + 14 }
    tekst = e.getAttribute("data-tekst")
    if (tekst == "null") { tekst = "" }
    intern = e.getAttribute("data-intern")

    if (intern != "null") {
      strdodatka=Number(intern)+9
      tekst+="<br><br><strong><em><a class='dodatak' href='./web/viewer.html?file=../stranice/lik4/likovna-4.pdf#page=" + strdodatka + "' target='_blank'>VIDI DODATAK</a></em></strong>"
    }

    VezaEHU="https://media.lzmk.hr/jm/ehu/#"+e.getAttribute("data-vezaehu")

    $(".modal-card-title").html(e.innerText)
    $(".modal-card-body").html("<a href='./web/viewer.html?file=../stranice/lik" + vol + "/likovna-" + vol + ".pdf#page=" + broj + "' target='_blank'><figure><img src='thumbnail/lik" + vol + "/(" + e.getAttribute("data-stranica") + ").jpg' style='float: left; margin-right:10px; filter: drop-shadow(1px 1px 1px #000); max-height:200px'><figcaption>Vidi PDF...<figcaption></figure></a><p>Stranica: " + e.getAttribute("data-stranica") + "</p><p>Svezak: " + vol + "</p><p class='ehu_link'><a href='"+VezaEHU+"' target='_blank'>Vidi u Enciklopediji hrvatske umjetnosti</a></p><p><br></p><p class='show-read-more'>" + tekst + "</p><p></p>")
    if(e.getAttribute("data-vezaehu")=="null" || e.getAttribute("data-vezaehu")==null){
      $(".ehu_link").hide()
    }

    var yourElement = $(".modal-card-body");

    poveznica = e.getAttribute("data-poveznica").split("; ")
    prilog = e.getAttribute("data-prilog")


    if (poveznica != "null") {
      for (var i = 0; i < poveznica.length; i++) {
        var find = poveznica[i];
        var re = new RegExp(find, 'g');
        yourElement.html(yourElement.html().replace(re, "<a onclick='povezivanje(this)'>" + poveznica[i] + "</a>"));
      }
    }

  
    if (prilog != "null") {
      if (prilog.split("; ").length == 2) {
        prilozi = prilog.split("; ")
        var re = new RegExp("VIDI PRILOG");
        yourElement.html(yourElement.html().replace(re, "<a href=./web/viewer.html?file=../prilozi/vol" + vol + "/" + prilozi[0] + " target='_blank'><strong><em>VIDI PRILOG</em></strong></a>"));
        zadnja = yourElement.html().lastIndexOf("VIDI PRILOG");
        htmlTekst = yourElement.html()
        htmlTekst = htmlTekst.substring(0, zadnja) + "<a href=./web/viewer.html?file=../prilozi/vol" + vol + "/" + prilozi[1] + " target='_blank'><strong><em>VIDI PRILOG</em></strong></a>" + htmlTekst.substr(zadnja + 11);
        yourElement.html(htmlTekst)
      }
      else {
        var re = new RegExp("VIDI PRILOG", 'g');
        yourElement.html(yourElement.html().replace(re, "<a href=./web/viewer.html?file=../prilozi/vol" + vol + "/" + prilog + " target='_blank'><strong><em>VIDI PRILOG</em></strong></a>"));
        var re = new RegExp("v. <em>Prilog", 'g');
        yourElement.html(yourElement.html().replace(re, "v. <em><a href=./web/viewer.html?file=../prilozi/vol" + vol + "/" + prilog + " target='_blank'>Prilog</a></em>"));
      }
    }

    vrijeme = new Date()
    t_godina = vrijeme.getFullYear()
    t_mjesec = vrijeme.getMonth() + 1
    t_dan = vrijeme.getDate()

    $(".modal-card-foot a").html(e.innerText + ". <en style='font-style: italic;'>Enciklopedija likovnih umjetnosti</en>. Leksikografski zavod Miroslav Krleža, 1959–1966. Pristupljeno " + t_dan + ". " + t_mjesec + ". " + t_godina + ". 	&#60;" + window.location.href.split('#')[0] + "&#62;.")
  }


  var maxLength = 2500;
  $(".show-read-more").each(function () {
    var myStr = $(this).html();

    if ($.trim(myStr).length > maxLength) {
      br = myStr.indexOf('.<br>', maxLength);
      if (br!=-1){
      var newStr = myStr.substring(0, br + 1);
      var removedStr = myStr.substring(br + 1, $.trim(myStr).length);
      $(this).empty().html(newStr);
      $(this).append(' <a href="javascript:void(0);" class="read-more"><strong>[pročitaj do kraja]</strong></a>');
      $(this).append('<span class="more-text">' + removedStr + '</span>');}
    }
  });
  $(".read-more").click(function () {
    $(this).siblings(".more-text").contents().unwrap();
    $(this).remove();
  });
}

function modal2(e) {
  // Functions to open and close a modal
  $(".modal").addClass("is-active")
  adresa = window.location.href.split('#')[0]
  if (Number(e.Vez) == "4") { broj = Number(e.Stranica) + 9 }
  else { broj = Number(e.Stranica) + 6 }
  vol = e.Vez
  if (Number(e.Vez) == "3" && broj >= 103) { broj = broj + 14 }
  tekst = e.Tekst
  intern = e.InternLink
  VezaEHU="https://media.lzmk.hr/jm/ehu/#"+e.VezaEHU

  if (tekst == null) { tekst = "" }
  if (intern != null) {
    strdodatka=Number(intern)+9
    tekst+="<br><br><strong><a class='dodatak' href='./web/viewer.html?file=../stranice/lik4/likovna-4.pdf#page=" + strdodatka + "' target='_blank'>VIDI DODATAK</a></strong>"
  }
  $(".modal-card-title").html(e.Natuknica)
  $(".modal-card-body").html("<a href='./web/viewer.html?file=../stranice/lik" + vol + "/likovna-" + vol + ".pdf#page=" + broj + "' target='_blank'><figure><img src='thumbnail/lik" + vol + "/(" + e.Stranica + ").jpg' style='float: left; margin-right:10px; filter: drop-shadow(1px 1px 1px #000); max-height:200px'><figcaption>Vidi PDF...<figcaption></figure></a><p>Stranica: " + e.Stranica + "</p><p>Svezak: " + vol + "</p><p class='ehu_link'><a href='"+VezaEHU+"' target='_blank'>Vidi u Enciklopediji hrvatske umjetnosti</a></p><p><br></p><p class='show-read-more'>" + tekst + "</p><p></p>")
  var yourElement = $(".modal-card-body");
  if(e.VezaEHU=="null" || e.VezaEHU==null){
    $(".ehu_link").hide()
  }
  poveznica = String(e.Poveznica).split("; ")
  prilog = String(e.Prilog)
  if (poveznica != "null") {
    for (var i = 0; i < poveznica.length; i++) {
      var find = poveznica[i];
      var re = new RegExp(find, 'g');
      yourElement.html(yourElement.html().replace(re, "<a onclick='povezivanje(this)'>" + poveznica[i] + "</a>"));
    }
  }
  if (prilog != "null") {
    if (prilog.split("; ").length == 2) {
      prilozi = prilog.split("; ")
      var re = new RegExp("VIDI PRILOG");
      yourElement.html(yourElement.html().replace(re, "<a href=./web/viewer.html?file=../prilozi/vol" + vol + "/" + prilozi[0] + " target='_blank'><strong><em>VIDI PRILOG</em></strong></a>"));
      zadnja = yourElement.html().lastIndexOf("VIDI PRILOG");
      htmlTekst = yourElement.html()
      htmlTekst = htmlTekst.substring(0, zadnja) + "<a href=./web/viewer.html?file=../prilozi/vol" + vol + "/" + prilozi[1] + " target='_blank'><strong><em>VIDI PRILOG</em></strong></a>" + htmlTekst.substr(zadnja + 11);
      yourElement.html(htmlTekst)
    }
    else {
      var re = new RegExp("VIDI PRILOG", 'g');
      yourElement.html(yourElement.html().replace(re, "<a href=./web/viewer.html?file=../prilozi/vol" + vol + "/" + prilog + " target='_blank'><strong><em>VIDI PRILOG</em></strong></a>"));
      var re = new RegExp("v. <em>Prilog", 'g');
      yourElement.html(yourElement.html().replace(re, "v. <em><a href=./web/viewer.html?file=../prilozi/vol" + vol + "/" + prilog + " target='_blank'>Prilog</a></em>"));
    }
  }
  
  vrijeme = new Date()
  t_godina = vrijeme.getFullYear()
  t_mjesec = vrijeme.getMonth() + 1
  t_dan = vrijeme.getDate()

  $(".modal-card-foot a").html(e.Natuknica + ". <en style='font-style: italic;'>Enciklopedija likovnih umjetnosti</en>. Leksikografski zavod Miroslav Krleža, 1959–1966. Pristupljeno " + t_dan + ". " + t_mjesec + ". " + t_godina + ". 	&#60;" + window.location.href.split('#')[0] + "&#62;.")
}

$(document).ready(function () {

  $("#input-search").keyup(function (event) {
    if (event.keyCode === 13 && $(".autocomplete-items")[0]) {
      $("#btnSearch").click();
    }
  });



  $(".navbar-item.has-dropdown")
    .click(function () {
      $(this).children(".navbar-dropdown").toggleClass("is-active");
    });
  $(".nested")
    .click(function () {
      $(this).children(".dropdown-menu").toggle();
      $(".ajde").toggleClass("is-active");
    });

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });
});



let results;
let filesData = []

const csvData = Papa.parse(vol1, {
  dynamicTyping: true,
  download: true,
  header: true,
  comments: "*=",
  complete: function (data) {
    results = data.data
  }
});
var podatci
var natuknice = []
setTimeout(() => {
  podatci = results
  if (window.location.hash) {
    for (var i = 0; i < podatci.length - 1; i++) {
      natuknice.push(podatci[i].Natuknica)
      if (String(window.location.hash.replace("#", "")) == String(podatci[i].ID)) {
        modal2(podatci[i])
      }
    }
  } else {
    for (var i = 0; i < podatci.length - 1; i++) {
      natuknice.push(podatci[i].Natuknica)
    }
  }

  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";

  if ("trazi" in localStorage) {
    document.getElementsByTagName("input")[0].value = localStorage.getItem("trazi")
    /*close the list of autocompleted values,
    (or any other open lists of autocompleted values:*/

    document.getElementById('btnSearch').click();
    var rez = document.getElementsByClassName("trazen");
    for (var i = 0; i < rez.length; i++) {
      if (rez[i].innerText.toUpperCase() == localStorage.getItem("trazi").toUpperCase()) {
        rez[i].click()
      }
    } localStorage.removeItem("trazi");

  }

  /*var rez = document.getElementsByClassName("trazen");
  for (var i = 0; i < rez.length; i++) {
    if (rez[i].innerText.toUpperCase() == e.innerText.toUpperCase()) {
      rez[i].click()
    }
  }*/


}, 1500);



function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") == val.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        if (val.toUpperCase()[0] == "Ž" && arr[i].substr(0, val.length) == "Ž") {

        }
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          document.getElementById('btnSearch').click()
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
        document.getElementById('btnSearch').click()
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
autocomplete(document.getElementById("input-search"), natuknice);

let serchIndex = (function () {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "indeks.json",
    'dataType': "json",
    'success': function (data) {
      json = data;
    }
  });
  return json;
})();

(function () {

  // Get the DOM elements
  let form = document.querySelector('#form-search');
  let input = document.querySelector('#input-search');
  let resultList = document.querySelector('#search-results');
  let searchStatus = document.querySelector('#search-status');

  form.addEventListener('submit', submitHandler);
  function submitHandler(event) {
    document.getElementById("search-results").innerHTML = "";
    event.preventDefault();
    search(input.value);
  }

  abeceda = []


  /*  if (!abeceda.includes(obj.Natuknica[0].toLowerCase())){
    //resultList.innerHTML +=<>
    abeceda.push(obj.Natuknica[0].toLowerCase()) 
  }*/
  /* for (var i = 0; i < podatci.length; i++) {
         var obj = podatci[i];
         resultList.innerHTML += "<br><a data-target='modal-js-example' class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a>"
       }*/
  adresa = window.location.href.split('#vrh')[0]

  $(".kazalo a").click(function () {
    $("#search-results").addClass("stupci")
    resultList.innerHTML = '';
    br = 0;
    $(".back-to-top-wrapper").removeClass("sakri")
    lastDisplayedPost = 0;
    sakri = 0
    function load(a) {
      brojka = 0;
      if (a == "A") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "a" || obj.Natuknica[0].toLowerCase() == "à" || obj.Natuknica[0].toLowerCase() == "á") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }

      }
      else if (a == "B") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "b") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "C") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "c") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "Č") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "č") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "Ć") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "ć") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "D") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "d" && obj.Natuknica[1].toLowerCase() != "ž") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "Dž") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica.slice(0, 2).toLowerCase() == "dž") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "Đ") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "đ") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "E") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "e" || obj.Natuknica[0].toLowerCase() == "é") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "F") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "f") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "G") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "g") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "H") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "h") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "I") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "i") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "J") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "j") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "K") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "k") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "L") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "l" && obj.Natuknica[1].toLowerCase() != "j") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "Lj") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica.slice(0, 2).toLowerCase() == "lj") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "M") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "m") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "N") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "n" && obj.Natuknica[1].toLowerCase() != "j") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "O") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "o" || obj.Natuknica[0].toLowerCase() == "ō" || obj.Natuknica[0].toLowerCase() == "ö") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "P") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "p") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "Q") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "q") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "R") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "r") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "S") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "s") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "Š") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "š") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "T") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "t") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "U") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "u") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "V") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "v") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "W") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "w") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "Y") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "y") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "Z") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "z") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }
      else if (a == "Ž") {
        for (let i = lastDisplayedPost; i < podatci.length; i++) {
          sakri++
          var obj = podatci[i];
          if (obj.Natuknica[0].toLowerCase() == "ž") {
            resultList.innerHTML += "<li ><a data-target='modal-js-example' data-poveznica='" + obj.Poveznica + "'data-id='"+obj.ID+"' data-vezaehu='"+obj.VezaEHU+"' data-intern='" + obj.InternLink+ "'  data-prilog='" + obj.Prilog + "' data-stranica='" + obj.Stranica + "' data-tekst='" + obj.Tekst + "'  data-vol='" + obj.Vez + "'  onclick='modal(this)'  class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline'  target='_blank'>" + obj.Natuknica + "</a></li>"
            brojka++
            if (brojka == 300) { break }
          }
        }
      }

      z = a
      lastDisplayedPost = sakri;

      if (lastDisplayedPost >= 300) { $("#read_more").show(); }
      if (sakri >= podatci.length) { $("#read_more").hide(); }
      $("#read_more").bind("click", function () {
        load(z)
        $("#impresum").click()
        $(this).preventDefault();
        return;
      })
      searchStatus.innerHTML = ""

    }
    load($(this).html())


    //searchStatus.innerHTML = `<p>Broj natuknica: ${br}</p>`;
    $('html, body').animate({
      scrollTop: $("#search-status").offset().top
    }, 100);
    try {
      modal()
    }
    catch (err) {

    }

  })

  function search(query) {
    $("#read_more").hide()
    $(".back-to-top-wrapper").addClass("sakri")
    var selector = document.getElementById("odabir");
    //var filter = selector.value;
    // Create a regex for each query

    let regMap = query.toLowerCase().split(' ').filter(function (word) {
      return word.length && !stopWords.includes(word);
    }).map(function (word) {
      return new RegExp(word, 'i');
    });

    //pokušaj
    regMap = regMap.join(" ").replace(/\/i/g, "").replace(/\//g, "")
    // Get and sort the results
    let results = podatci.reduce(function (results, article, index) {
      // Setup priority count
      let priority = 0;
      // Assign priority
      //for (let reg of regMap) {
      var isEvery = regMap.split(" ").every(function (word) { return article.Natuknica.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1 });
      if (isEvery) {
        priority += 100;
      }
      /* try {
       let occurences = article.Autor.match(reg);
       if (occurences) { priority += occurences.length; }
     } catch (error) {console.error(error);}*/
      // }
      // If any matches, push to results
      if (priority > 0) {
        results.push({
          priority: priority,
          article: article
        });
      }
      return results;

    }, []).sort(function (article1, article2) {
      return article2.priority - article1.priority;
    });
    // Display the results
    showResults(results);
  }

  function showResults(results) {
    $("#search-results").removeClass("stupci")
    if (results.length) {
      searchStatus.innerHTML = `<p>Broj pronađenih natuknica: ${results.length}</p>`;
      //str = JSON.stringify(results, null, 4); // (Optional) beautiful indented output.
      //jazon = jQuery.parseJSON(str);

      for (var i = 0; i < results.length; i++) {
        var obj = results[i];
        resultList.innerHTML += "<a data-target='modal-js-example' class='has-tooltip-arrow js-modal-trigger has-tooltip-multiline trazen' data-target='modal-js-example' data-poveznica='" + obj.article.Poveznica + "' data-prilog='" + obj.article.Prilog + "' data-stranica='" + obj.article.Stranica + "' data-id='" + obj.article.ID + "'  data-vezaehu='" + obj.article.VezaEHU + "' data-intern='" + obj.article.InternLink + "' data-tekst='" + obj.article.Tekst + "'  data-vol='" + obj.article.Vez + "' onclick='modal(this)'  target='_blank'><li class='ikone' style='background-image: url(\"thumbnail/lik" + obj.article.Vez + "/\(" + obj.article.Stranica + ").jpg\")'>" + obj.article.Natuknica + "</li></a>"

      }
      //results.article.title

    } else {
      searchStatus.innerHTML = '<p>Pojam koji pretražujete ne postoji.</p>';
      resultList.innerHTML = '';
    }

    $('html, body').animate({
      scrollTop: $("#search-status").offset().top
    }, 100);
    try {
      modal()
    }
    catch (err) {
    }
  }

  let stopWords = [',', 'i', 'u', ' ', ':', 'ili', 'ako', 'can', 'cannot', 'can\'t', 'could', 'couldn\'t', 'how', 'is', 'isn\'t', 'it', 'its', 'it\'s', 'that', 'the', 'their', 'there', 'they', 'they\'re', 'them', 'to', 'too', 'us', 'very', 'was', 'we', 'well', 'were', 'what', 'whatever', 'when', 'whenever', 'where', 'with', 'would', 'yet', 'you', 'your', 'yours', 'yourself', 'yourselves', 'the', 'vanilla', 'javascript', 'js'];

  // Make sure required content exists
  if (!form || !input || !resultList || !searchStatus || !podatci) return;
})();
$(document).mouseup(function (e) {
  var container = $(".navbar");

  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $(".navbar-dropdown").removeClass("is-active")
  }
});

$("#impresum").click()

function radi(e) {
  $(".swal2-confirm").click();
  autor = e.innerHTML.split(", ")
  autor = autor[1] + " " + autor[0]
  $("#odabir").val("Autor").change();
  $("#input-search").val(autor.replace("(*)", ""))
  $(".is-info").click();
}

