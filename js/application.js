
$(document).ready(function(){
  $('.searchbtn').click(function(){
    console.log('search');
    // window.location.href('#template_section');
    // $(window).attr('location', '/landing/app.html#template_section');
  });

  $('.searchbtn2').click(function() {
    // var cookieData = JSON.parse(Cookies.get('accountAuth'));
    var d = new Object();
    // d.text = $('#search-text').val().toLowerCase() + " " + cookieData['_id'];
    d.text = $('#search-text').val().toLowerCase() + " " + '  354bf8888d2c11e89a1d0254fc6d9140';
    console.log(d)

    //$.post("http://54.186.153.173:9000/n3n/cloud/tags/themes", JSON.stringify(d), function(result){
    $.post(
      'http://34.216.224.153:9000/n3n/cloud/syntax',
      JSON.stringify(d),
      function(result) {
        //console.log(result);
        //var obj = JSON.parse(result);
        var templates = JSON.parse(result).templates;
        var images = JSON.parse(result).images;
        var html = '';
        var imageArray = [];
        if (images.length > 0) {
          for (var i in images) {
            imageArray.push(images[i].webformatURL);
            html += '<div class="item pointer">';
            html +=
              '<img class="displayBlock" alt="" src="' +
              images[i].previewURL +
              '" data-url="' +
              images[i].webformatURL +
              '" />';
            html += '</div>';
          }
          //fix for last line
          html += '<div class="item"></div>';
          html += '<div class="item"></div>';
          html += '<div class="item"></div>';
          html += '<div class="item"></div>';
        }

        // Function to take the tag retrieved from the backend and make it parseable for html tags.
        //(i.e. "Father's Day" => "Fathers-Day" for <a id="Fathers-Day"><a/>)

        let modifyWord = (word) => {
          word = word.replace(/ /g, '-');
          return word.replace(/'/g, '');
        };

        // Function to sort templates in ascending order to fix a css rendering issue with whitespace.
        let sortAscending = (array) => {
          let counter = {};
          for (var i = 0; i < array.length; i++) {
            let tag = array[i].tag;
            if (!counter[tag]) {
              counter[tag] = 1;
            } else {
              counter[tag]++;
            }
          }
          return Object.keys(counter).sort(function(a, b){
            return counter[a] - counter[b];
          });
        };

        let sortedTemplates = sortAscending(templates);

        let createLookup = (array) => {
          let lookup = {};
          for (var i = 0; i < array.length; i++) {
            let element = array[i];
            let tag = modifyWord(element);
            if (!lookup[element]) {
              lookup[element] = tag;
            }
          }
          return lookup;
        };

        let imageTags = createLookup(sortedTemplates);

        //$('#theme-list').html('');
        var htmls = `<span>TEMPLATES</span>`;

        let toggle = true;

        htmls += `<ul class='nav nav-pills' id='pills-tab' role='tablist'>`;

        Object.keys(imageTags).forEach(function(key){
          let value = imageTags[key];
          if (toggle) {
            htmls += `
            <li class='nav-item'>
              <a class='nav-link active' id='pills-${value}-tab' data-toggle='pill' href='#pills-${value}' role='tab' aria-controls='pills-${value}' aria-selected='true'>${key}</a>
            </li>
            `;
            toggle = false;
          } else {
            htmls += `
            <li class='nav-item'>
              <a class='nav-link' id='pills-${value}-tab' data-toggle='pill' href='#pills-${value}' role='tab' aria-controls='pills-${value}' aria-selected='false'>${key}</a>
            </li>
            `;
          }
        });

        htmls += `</ul>`;

        toggle = true;

        htmls += `<div class='tab-content' id='pills-template'>`;

        let populateHtml = (key) => {

          htmls += `<ul class='theme-ul' style='height: 0;' data-key='${JSON.stringify(imageArray)}'>`

          for (var i = 0; i < templates.length; i++) {
            if (templates[i].tag === key) {
              htmls +=
                "<li id='" +
                templates[i].image +
                "'><img src='" +
                templates[i].image +
                "'>";
              htmls += "<div class='text'>" + templates[i].tag + '</div></li>';
            }
          }
          htmls += '</ul>';
        };

        Object.keys(imageTags).forEach(function(key){
          let value = imageTags[key];
          if (toggle) {
            htmls += `<div class='tab-pane fade show active in' id='pills-${value}' role='tabpanel' aria-labelledby='pills-${value}-tab'>`;
            populateHtml(key);
            htmls += `</div>`;
            toggle = false;
          } else {
            htmls += `<div class='tab-pane fade' id='pills-${value}' role='tabpanel' aria-labelledby='pills-${value}-tab'>`;
            populateHtml(key);
            htmls += `</div>`;
          }
        });

        htmls += `</div>`;


        $('#theme-list').css('height', '750px');
        $('#theme-list').html(htmls);

        // $('.ExampleText').addClass("hidden");
        $('#image-wrapper').empty();
        var node = document.createElement('div');
        node.classList.add('flex-container');
        node.innerHTML = html;
        $('#image-wrapper').show();
        // document.querySelector('#image-wrapper').appendChild(node);
        // var targets = document.querySelectorAll('#image-wrapper .item img');
        // for (var i = 0; i < targets.length; i++) {
        //   targets[i].addEventListener('click', function(event) {
        //     this.dataset.url = this.dataset.url;
        //     var data = {
        //       url: this.dataset.url
        //     };
        //     f_file.file_open_url_handler(data, '');
        //   });
        // }
      }
    );
    // setTimeout(function(){
    //   $('#first_section').hide();
    // }, 200);
  });
});




$('.searchbtn2').click(function() {
  //search.search();
  //$('#template').addClass("active");
  var cookieData = JSON.parse(Cookies.get('accountAuth'));
  var d = new Object();
  d.text = $('#search-text').val().toLowerCase() + " " + cookieData['_id'];
  console.log(d)

  //$.post("http://54.186.153.173:9000/n3n/cloud/tags/themes", JSON.stringify(d), function(result){
  $.post(
    'http://34.216.224.153:9000/n3n/cloud/syntax',
    JSON.stringify(d),
    function(result) {
      //console.log(result);
      //var obj = JSON.parse(result);
      var templates = JSON.parse(result).templates;
      var images = JSON.parse(result).images;
      var html = '';
      var imageArray = [];
      if (images.length > 0) {
        for (var i in images) {
          imageArray.push(images[i].webformatURL);
          html += '<div class="item pointer">';
          html +=
            '<img class="displayBlock" alt="" src="' +
            images[i].previewURL +
            '" data-url="' +
            images[i].webformatURL +
            '" />';
          html += '</div>';
        }
        //fix for last line
        html += '<div class="item"></div>';
        html += '<div class="item"></div>';
        html += '<div class="item"></div>';
        html += '<div class="item"></div>';
      }

      // Function to take the tag retrieved from the backend and make it parseable for html tags.
      //(i.e. "Father's Day" => "Fathers-Day" for <a id="Fathers-Day"><a/>)

      let modifyWord = (word) => {
        word = word.replace(/ /g, '-');
        return word.replace(/'/g, '');
      };

      // Function to sort templates in ascending order to fix a css rendering issue with whitespace.
      let sortAscending = (array) => {
        let counter = {};
        for (var i = 0; i < array.length; i++) {
          let tag = array[i].tag;
          if (!counter[tag]) {
            counter[tag] = 1;
          } else {
            counter[tag]++;
          }
        }
        return Object.keys(counter).sort(function(a, b){
          return counter[a] - counter[b];
        });
      };

      let sortedTemplates = sortAscending(templates);

      let createLookup = (array) => {
        let lookup = {};
        for (var i = 0; i < array.length; i++) {
          let element = array[i];
          let tag = modifyWord(element);
          if (!lookup[element]) {
            lookup[element] = tag;
          }
        }
        return lookup;
      };

      let imageTags = createLookup(sortedTemplates);

      //$('#theme-list').html('');
      var htmls = `<span>TEMPLATES</span>`;

      let toggle = true;

      htmls += `<ul class='nav nav-pills' id='pills-tab' role='tablist'>`;

      Object.keys(imageTags).forEach(function(key){
        let value = imageTags[key];
        if (toggle) {
          htmls += `
          <li class='nav-item'>
            <a class='nav-link active' id='pills-${value}-tab' data-toggle='pill' href='#pills-${value}' role='tab' aria-controls='pills-${value}' aria-selected='true'>${key}</a>
          </li>
          `;
          toggle = false;
        } else {
          htmls += `
          <li class='nav-item'>
            <a class='nav-link' id='pills-${value}-tab' data-toggle='pill' href='#pills-${value}' role='tab' aria-controls='pills-${value}' aria-selected='false'>${key}</a>
          </li>
          `;
        }
      });

      htmls += `</ul>`;

      toggle = true;

      htmls += `<div class='tab-content' id='pills-template'>`;

      let populateHtml = (key) => {

        htmls += `<ul class='theme-ul' style='height: 0;' data-key='${JSON.stringify(imageArray)}'>`

        for (var i = 0; i < templates.length; i++) {
          if (templates[i].tag === key) {
            htmls +=
              "<li id='" +
              templates[i].image +
              "'><img src='" +
              templates[i].image +
              "'>";
            htmls += "<div class='text'>" + templates[i].tag + '</div></li>';
          }
        }
        htmls += '</ul>';
      };

      Object.keys(imageTags).forEach(function(key){
        let value = imageTags[key];
        if (toggle) {
          htmls += `<div class='tab-pane fade show active in' id='pills-${value}' role='tabpanel' aria-labelledby='pills-${value}-tab'>`;
          populateHtml(key);
          htmls += `</div>`;
          toggle = false;
        } else {
          htmls += `<div class='tab-pane fade' id='pills-${value}' role='tabpanel' aria-labelledby='pills-${value}-tab'>`;
          populateHtml(key);
          htmls += `</div>`;
        }
      });

      htmls += `</div>`;


      $('#theme-list').css('height', '750px');
      $('#theme-list').html(htmls);

      $('.ExampleText').addClass("hidden");
      $('#image-wrapper').empty();
      var node = document.createElement('div');
      node.classList.add('flex-container');
      node.innerHTML = html;
      $('#image-wrapper').show();
      document.querySelector('#image-wrapper').appendChild(node);
      var targets = document.querySelectorAll('#image-wrapper .item img');
      for (var i = 0; i < targets.length; i++) {
        targets[i].addEventListener('click', function(event) {
          //window.State.save();
          //this.dataset.url = this.dataset.url.replace('_640.', '_960.');
          this.dataset.url = this.dataset.url;
          var data = {
            url: this.dataset.url
          };
          f_file.file_open_url_handler(data, '');
        });
      }
    }
  );
});
