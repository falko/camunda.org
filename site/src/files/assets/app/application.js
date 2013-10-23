!function ($) {
  $(function() {

    /*
     =======================================
     Scroll Spy for Docs
     =======================================
     */
    var $window = $(window),
        $body = $(document.body),
        path = window.location.pathname,
        base = $("base").attr('app-base');

    // refresh scrollspy on load
    $window.on('load', function () {
      $body.scrollspy('refresh');
    });

    // refresh scrollspy on resize
    $window.resize(function() {
      $body.scrollspy('refresh');
      $body.scrollspy('process');
    });

    /*
      =======================================
      Set active class at navbar
      =======================================
     */
    $('header nav ul li').each(function () {
      var current = $(this),
          link = current.attr('data-active-link');

      if (link) {

        if (path.indexOf(link) !== -1) {
          current.addClass('active');
        }

      }

    });

    /*
     =======================================
     Navigation ID generation for docs
     =======================================
     */
    $("h1[id], h2[id], h3[id], h4[id]").each(function() {
      var current = $(this),
          id = current.attr('id');

      if (!current.text()) {
        return;
      }

      current.append(
          '<a class="anchor" href="#' + id + '" title="Link to current section">¶</a>'
      );
    });

    /*
     =======================================
     draw bpmn diagrams or symbols with our renderer
     =======================================
     */
    var bpmnDiagram = $('[data-bpmn-diagram]');
    var accordionDiagram = $('.panel-group [data-bpmn-diagram] tspan');
    var bpmnSymbol =  $('[data-bpmn-symbol]');
    if(bpmnDiagram.length > 0) {
      bpmnDiagram.each(function() {
        var element = $(this),
            name = element.attr('data-bpmn-diagram'),
            uri = base + "assets/bpmn/" + name;

        element.addClass('bpmn-diagram-container');
        bpmn(uri, element);

        // TODO: Workaround for RaphaelJS calculation of text items
        element.on("diagram-ready", function() {
          if(element.parent().hasClass("panel-body")) {
            var tspanElements = element.find("text");
            tspanElements.each(function() {
              var element = $(this);
              var textAttr = parseFloat(element.attr("y"));
              element.attr("y", (textAttr * 0.01));
            })
          }
        })
      });
    }

    // TODO: Workaround for renderer bug
    $(document).ready(function() {
      if(accordionDiagram.length > 0) {
        accordionDiagram.each(function() {
          var element = $(this);
          var dyValue = parseFloat(element.attr("dy"));
          element.attr("dy", (dyValue - 72));
        })
      }
    });

    if(bpmnSymbol.length > 0) {
      bpmnSymbol.each(function(){
        var element = $(this),
            symbol = element.attr('data-bpmn-symbol'),
            symbolName = element.attr('data-bpmn-symbol-name');

        element.addClass('bpmn-symbol-container');
        drawBpmnSymbol(symbol, symbolName, element);
      });
    }

    /*
     =======================================
     Popovers for vision and docs
     =======================================
     */
    $('.tutPop').popover({
      "trigger": "hover",
      "placement": "bottom",
      "container": "body"
    });

    $('#explainScalable').popover({
      "title":"Scalable Business Model",
      "placement": "bottom",
      "trigger": "hover",
      "content": "<div class='explain' ><p>BPM can <b>not</b> help you inventing a great product or persuading your customers to buy it.</p><p>But if you do have the right product and a market to conquer, BPM can provide you with the infrastructure you need to turn a corner shop into a big yet profitable business.</p><p>Why BPM? To scale up your business model!</p></div>",
      "html": true
    });

    $('#explainBPM').popover({
      "title":"BPM",
      "placement": "bottom",
      "trigger": "hover",
      "content": "<div class='explain' ><p>Business Process Management (BPM) is about the daily doing of your company, how to organize it in a smart and efficient way, and how to support it appropriately with IT solutions.</p><p>If you like it when things run smoothly, you are a potential BPM addict.</p></div>",
      "html": true
    });

    $('#explainAlign').popover({
      "title":"Business-IT-Alignment",
      "placement": "bottom",
      "trigger": "hover",
      "content": "<div class='explain' ><p>Aligning people does not mean that one party commands and the other obeys. It neither means that one party gets rid of the other, thanks to fancy tools that suggest they could implement a complex application without programming.</p><p>Aligning is about communication. And if it comes to business processes, we can count on BPMN 2.0 as an excellent global standard for process diagrams that can serve both business people and software developers.</p><p>This is why BPMN 2.0 is a central element in our stack.</p></div>",
      "html": true
    });

    $('#explainIndividual').popover({
      "title":"Individual Process Applications",
      "trigger": "hover",
      "placement":"bottom",
      "content": "<div class='explain' ><p>We talk about scaling up your business model. Did you get your business model off-the-shelf?</p><p>So how could you possibly implement the process applications that actually execute your business model in some off-the-shelf BPM suite? Did the BPM vendor foresee all the software requirements that your business model demands?</p><p>We believe in the power of an open, flexible framework that allows your developers to implement what ever you need, and in what ever way you need.</p></div>",
      "html": true
    });

    /*
     =======================================
     Testimonials
     =======================================
     */
    if($('[data-camunda-users]').length > 0) {
      if (document.URL.indexOf('#') > 0) {
        var id = document.URL.substr(document.URL.indexOf('#') + 2);
        var user = $('#' + id);
        var userQuote = $('#' + id + "Quote");
        $(".col-md-2").removeClass("selected");
        user.find("col-md-2").addClass("selected");
        $('#testimonialLogo').attr("src", user.find("img").attr("src"));
        $('#testimonialIndustry').text(user.find("h4").text());
        $('#testimonialQuote').html (userQuote.html() );
      }

      $('[data-camunda-user]').click(function() {
        var user = $(this);
        $(".col-md-2").removeClass("selected");
        user.find(".col-md-2").addClass ("selected");

        var testimonialLogo = $('#testimonialLogo');
        testimonialLogo.fadeOut(300, function() {
          testimonialLogo.attr("src",user.find("img").attr("src"));
          $('#testimonialIndustry').text(user.find("h4").text());
          testimonialLogo.fadeIn(900);
        });

        var testimonialQuote = $('#testimonialQuote');
        testimonialQuote.fadeOut(300, function() {
          testimonialQuote.html($('#' + user.attr("id")  + "Quote").html());
          testimonialQuote.fadeIn(900);
        });
        $('html,body').scrollTop(0);
      });
    }

    /*
     =======================================
     Modals for contributors
     =======================================
     */
    if($('[data-camunda-contributors]').length > 0) {
      if (document.URL.indexOf('#') > 0) {
        var contributor = document.URL.substr(document.URL.indexOf('#') + 1);
        $('#' + contributor).modal();
      }

      // Show Modal when Link has been clicked
      $('.media > a').click(function() {
        var link = $(this).attr('href');
        var contributor = link.substr(link.indexOf('#') + 1);
        $('#' + contributor).modal();
      });
    }

    /*
     =======================================
     Roadmap
     =======================================
     */
    var CSV = {
      /**
       * splitCSV function (c) 2009 Brian Huisman, see http://www.greywyvern.com/?post=258
       * Works by spliting on seperators first, then patching together quoted values
       */
      splitCSV : function(string, seperator) {
        for (var value = string.split(seperator = seperator || ","), x = value.length - 1, tl; x >= 0; x--) {
          if (value[x].replace(/"\s+$/, '"').charAt(value[x].length - 1) == '"') {
            if ((tl = value[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
              value[x] = value[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
            } else if (x) {
              value.splice(x - 1, 2, [value[x - 1], value[x]].join(sep));
            } else value = value.shift().split(seperator).concat(value);
          } else value[x].replace(/""/g, '"');
        } return value;
      },

      /**
       * Converts from CSV formatted data (as a string) to JSON returning
       *  an object.
       * @required csvdata {string} The CSV data, formatted as a string.
       * @param args.delim {string} The delimiter used to seperate CSV
       *  items. Defauts to ','.
       * @param args.textdelim {string} The delimiter used to wrap text in
       *  the CSV data. Defaults to nothing (an empty string).
       */
      csv2json : function(csvData, args) {
        args = args || {};
        var delim = null;

        if(typeof args.delim === "undefined") {
          delim = ",";
        } else {
          delim = args.delim;
        }

        // Linux line ending check
        var csvLines = (csvData.search("\r\n") != -1) ? csvData.split("\r\n") : csvData.split("\n");
        var csvHeaders = this.splitCSV(csvLines[0], delim);
        var csvRows = csvLines.slice(1, csvLines.length);

        var returnValue = {};
        returnValue.rows = [];

        for(var r in csvRows) {
          if (csvRows.hasOwnProperty(r)) {
            var row = csvRows[r];
            var rowItems = this.splitCSV(row, delim);

            // Break if we're at the end of the file
            if(row.length == 0) break;

            var rowObj = {};
            for(var i in rowItems) {
              if (rowItems.hasOwnProperty(i)) {
                rowObj[csvHeaders[i]] = rowItems[i];
              }
            }
            returnValue.rows.push(rowObj);
          }
        }
        return returnValue;
      }
    };

    if($('[data-roadmap]').length > 0) {
      var roadmapTable = '';
      $.ajax({ url: "../assets/csv/roadmap.csv" })
          .done(function(data) {
            var roadmapItems = CSV.csv2json(data, { delim: ';', textdelim: '"'}).rows;
            $.each( roadmapItems, function( key, value ) {
              roadmapTable += '<tr>';

              roadmapTable += '<td>' + value['Priority'] + '</td>';
              if(value['URL'].length > 0) {
                roadmapTable += '<td><a href="' + value['URL'] + '" target="_blank">' + value['Topic'] + '</a></td>';
              } else {
                roadmapTable += '<td>' + value['Topic'] + '</td>';
              }
              roadmapTable += '<td>' + value['Component'] + '</td>';
              roadmapTable += '<td>' + value['OSS/EE'] + '</td>';
              roadmapTable += '<td>' + value['Status'] + '</td>';
              roadmapTable += '<td>' + value['Release'].substr(1) + '</td>';
              roadmapTable += '<td>' + value['Contributor'] + '</td>';

              roadmapTable += '</tr>';
            });
            $('[data-roadmap]').append(roadmapTable);
          })
          .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request failed: " + err);
          });
    }

    /*
     =======================================
     Meetings
     =======================================
     */
    var currentEvents = $('[data-camunda-events]');
    var pastEvents = $('[data-camunda-events-past]');
    var homeEvents = $('[data-camunda-events-home]');
    var meetingSubscription = $('[data-meetings-subscribe]');
    var meetingsService = window.location.protocol + "//" + window.location.hostname + '/php/meeting.php';

    var eventsTable = function(element, base, data) {
      $.each( data.events, function( key, value ) {
        // Organize data
        var meetingContent = [];
        meetingContent.details = '<a href="' + base + 'community/meetings/register.html?id=' + value.meeting.id +'" role="button" class="btn btn-default">Details</a>';
        meetingContent.date = value.meeting.date;
        meetingContent.country = '<img src="' + base + 'assets/img/app/community/meetings/' +value.meeting.country + '.png" /> '+value.meeting.country;
        meetingContent.place = value.meeting.city;
        meetingContent.topic = value.meeting.subject;
        meetingContent.seats = parseInt(value.meeting.seats-value.meeting.attendees) + ' seats left';
        meetingContent.attendees = 0;
        if (!value.meeting.registerText) {
          meetingContent.attendees =  value.meeting.attendees ;
        }
        meetingContent.attendees += ' Attendees';

        // Build table structure
        var myRow = '<tr>';
        myRow += '<td>'+ meetingContent.details +'</td>';
        myRow += '<td>'+ meetingContent.date +'</td>';
        myRow += '<td>'+ meetingContent.country +'</td>';
        myRow += '<td>'+ meetingContent.place +'</td>';
        myRow += '<td>'+ meetingContent.topic +'</td>';
        myRow += '<td>'+ meetingContent.attendees +'</td>';
        myRow += '<td>'+ meetingContent.seats +'</td>';
        myRow += '</tr>';

        element.append(myRow);
      });
    };

    if(currentEvents.length > 0) {
      $.getJSON(meetingsService, function(data) {
        eventsTable(currentEvents, base, data);
      });
    }

    if(pastEvents.length > 0) {
      $.getJSON(meetingsService + '?past=true', function(data) {
        eventsTable(pastEvents, base, data);
      });
    }

    /*

     */
    if(homeEvents.length > 0) {
      $.getJSON(meetingsService + '?limit=7', function(data) {
        // Headline
        var myRow = '<tr>';
        myRow += '<th>Date</th>';
        myRow += '<th>Topic</th>';
        myRow += '<th>Place</th>';
        myRow += '</tr>';
        homeEvents.append(myRow);

        // Content
        $.each( data.events, function( key, value ) {
          // organize data
          var meetingContent = [];
          meetingContent.date = value.meeting.date.substring(0,6).replace(/\-/, '&#8209;'); // For INFO: the replacement replaces the hyphen with a non breaking hyphen!
          meetingContent.topic = '<a href="./community/meetings/register.html?id=' + value.meeting.id + '">' + value.meeting.subject + '</a>';
          meetingContent.place = '';
          if(value.meeting.place != null) {
            meetingContent.place = value.meeting.city;
          }

          // build table structure
          myRow = '<tr>';
          myRow += '<td>'+ meetingContent.date +'</td>';
          myRow += '<td>'+ meetingContent.topic +'</td>';
          myRow += '<td>'+ meetingContent.place +'</td>';
          myRow += '</tr>';
          homeEvents.append(myRow);
        });
      });
    }

    /*
     meeting subscription
     */
    if(meetingSubscription.length > 0) {
      jQuery.validator.setDefaults({
        debug: false,
        onsubmit: true,
        success: "valid"
      });

      $("#subscribeForm").validate({
        rules: {
          email: "required email"
        }
      });

      $('#submit').on('click', function() {
        if ($("#subscribeForm").valid()) {
          var myEmail = $('#email').val();

          $.post(window.location.protocol + "//" + window.location.hostname + "/php/subscribeMeetings.php", {email: myEmail})
              .done(function(data) {
                $('#status').text(data);
                $('#email').val('');
              })
              .fail(function() {
                $('#status').text("There was an error. Please try again later!");
              });
        }
      });
    }

    /*
     Metting details & registration
     */
    var meetingUtil = {};
    meetingUtil.convertFromDateToTimestamp = function(dateString) {
      var dateArray = [];
      var d = dateString.match(/[0-9A-Za-z]{2,4}/g);
      // Current Date
      dateArray[0] = new Date(d[1] + ' ' + d[0] + ', ' + d[2] + ' ' + d[3] + ':' + d[4] + ':00');
      // Next day date
      dateArray[1] = new Date(d[1] + ' ' + d[0] + ', ' + d[2] + ' 00:00:01').getTime();
      return dateArray;
    };

    meetingUtil.updateAttendees = function(meetingId) {
      jQuery.support.cors = true; // IE8 FTW!
      $.getJSON(window.location.protocol + "//" + window.location.hostname + '/php/meeting.php?id=' + meetingId)
          .done(function(data) {
            $.each( data.events, function( key, value ) {
              var freeSeats = parseInt(value.meeting.seats - value.meeting.attendees);
              if (freeSeats < 1) {
                $('.mSeats').text ('Sorry, there are no seats left :-(');
                $('#mSubmit').attr('disabled', 'true');
              } else {
                $('.mSeats').text('Currently we have ' + value.meeting.attendees + ' attendees. There are still ' + parseInt(value.meeting.seats - value.meeting.attendees) + ' seats left!');
              }
            });
          })
          .fail(function() {
            $('.mSeats').text('Sorry, we\'ve hitted a glitch. Please try again later');
          });
    };

    meetingUtil.getParameterHelper = function() {
      var HTTP_GET_VARS=[];
      var strGET=document.location.search.substr(1,document.location.search.length);
      if(strGET!='')
      {
        var gArr=strGET.split('&');
        for(var i=0;i<gArr.length;++i)
        {
          var v='', vArr=gArr[i].split('=');
          if(vArr.length>1) {
            v=vArr[1];
          }
          HTTP_GET_VARS[unescape(vArr[0])]=unescape(v);
        }
      }
      return HTTP_GET_VARS;
    };

    /* Meeting Details */
    var meeting = $('[data-meeting]');
    if(meeting.length > 0) {
      var meetingId = meetingUtil.getParameterHelper()['id'];
      $.getJSON(window.location.protocol + "//" + window.location.hostname + '/php/meeting.php?id=' + meetingId)
          .done(function(data) {
            $.each( data.events, function( key, value ) {
              $('.mCountry').append(value.meeting.country);
              $('.mCity').text(value.meeting.place);
              $('.mDate').text(value.meeting.date);
              $('.mSubject').append(value.meeting.subject);

              // We don't need a googlemaps link if we have a webinar (or someone shows me the place called internet on the worldmap)
              var meetingSpace = '';
              if(value.meeting.isWebinar !== true) {
                // need to filter some meeting addresses because of address changes
                // so first we use a new syntax for google-Links - happy welcome BBCODE style [L] and [/L]
                var filteredByMatch = value.meeting.place.match(/\[L].*\[\/L]/);
                if(filteredByMatch != null) {
                  filteredByMatch = filteredByMatch[0].replace(/\[L]/, "").replace(/\[\/L]/, "");
                }

                // if we found our [L] we slice it out of our meeting place text (we doesn't want to see the L in the text)
                var location = value.meeting.place;
                var meetingPlace = value.meeting.place;
                if(filteredByMatch != null && 0 < filteredByMatch[0].length) {
                  location = filteredByMatch;
                  meetingPlace = value.meeting.place.substring(0, value.meeting.place.indexOf("[L]"));
                }

                // Additional <a href> filter - without some of the googlemaps-links would be very ... not so fine
                var filteredMeetingPlace = location.replace(/<a href=".*">/, "");
                filteredMeetingPlace = filteredMeetingPlace.replace(/<\/a>/, "");
                meetingSpace = meetingPlace + ' (<a target="_blank" href="https://maps.google.de/maps?q=' + filteredMeetingPlace + '">Google Maps</a>)';
              } else {
                meetingSpace = value.meeting.place;
              }

              $('.mPlace').append(meetingSpace);

              // if there is a text for external Registration
              if (value.meeting.registerText) {
                $('#registerInternal').hide();
                $('#registerPast').hide();
                $('#registerExternal').show();
                $('.mRegisterText').append(value.meeting.registerText);
              } else {
                $('#registerExternal').hide();
                $('#registerPast').hide();
                $('#registerInternal').show();
              }

              // if this is a past meeting

              // if there is a German Version of the Text
              if (value.meeting.textDe) {
                $('.mText').append('<p id="info">Please note that the predominant language of the meeting is German, however, all speakers are proficient in English.</p>' +
                    '<ul class="nav nav-tabs">' +
                    '<li class="active"><a href="#deutsch" data-toggle="tab">Deutsch</a></li>' +
                    '<li><a href="#english" data-toggle="tab">English</a></li>' +
                    '</ul>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="deutsch">' + value.meeting.textDe + '</div>' +
                    '<div class="tab-pane" id="english">' + value.meeting.text + '</div>' +
                    '</div>');
              } else {
                $('.mText').append(value.meeting.text);
              }

              var dateArray = meetingUtil.convertFromDateToTimestamp(value.meeting.date);
              var now = $.now();
              if (now > dateArray[0]) {
                $('#registerInternal').hide();
                $('#registerExternal').hide();
                $('#registerPast').show();

                $('#whyCome').text("Meeting's Topic");
                // remove speaker text and add retrospective
                $('#info').remove();
                $('.mText').after('<h3 class="meeting-headline" id="retro">Retrospective</h3><div class="retroText"></div>');
                if (now > dateArray[1]) {
                  $('.retroText').append(value.meeting.retro);
                }
              }
              var submitButton = $('#mSubmit');
              if(parseInt(value.meeting.seats - value.meeting.attendees) < 1) {
                $('.mSeats').text ('Sorry, there are no seats left :-(');
                submitButton.attr('disabled', 'true');
              } else {
                $('.mSeats').text('Currently we have ' + value.meeting.attendees + ' attendees. There are still ' + parseInt(value.meeting.seats - value.meeting.attendees) + ' seats left!');
              }

              jQuery.validator.setDefaults({
                debug: false,
                onsubmit: true,
                success: "valid"
              });

              $("#registerForm_1").validate({
                rules: {
                  mName: "required",
                  mEmail: "required email"
                }
              });


              submitButton.on('click', function() {
                if ($("#registerForm_1").valid()) {
                  var myName =  $('#mName').val();
                  var myEmail = $('#mEmail').val();

                  $('#formContainer').append('<p id="status">Processing...</p>');
                  $.post(window.location.protocol + "//" + window.location.hostname + "/php/register.php", {id: value.meeting.id, name: myName, email: myEmail})
                      .done(function(data) {
                        $('#status').text(data);
                        $('#mName').val("");
                        $('#mEmail').val("");
                        meetingUtil.updateAttendees(meetingId);
                      })
                      .fail(function() {
                        $('#status').text("There was a Problem with your Request. Please try again later!");
                      });
                }
              });
            });
          })
          .fail(function() {
            $('.mText').text("There was a Problem with the Request. Please try again later!");
          });
    }


    /*
     =======================================
     Blog-Posts
     =======================================
     */
    var blogPosts = $('[data-pipe]');
    var blogError = $('#blogError');
    blogError.hide();
    if(blogPosts.length > 0) {
      var blogAttr = [];
      blogAttr.trunc = blogPosts.attr('data-truncate');
      blogAttr.url = blogPosts.attr('data-pipe-url');

      // Strip out all html elements
      var strip = function(html) {
        html = html.replace(/<[^>]*>/g, '\n');

        var tmp = $('<div/>').html(html).get(0);
        return tmp.textContent || tmp.innerText;
      };

      var decode = function (theText) {
        return strip(theText).substr(0, blogAttr.trunc) + " ...";
      };

      $.getJSON(blogAttr.url + "&_callback=?")
          .done(function(data) {
            for(var i = 0; i < 6; i++) {
              var item = data.value.items[i];

              //build div structure
              var myRow = '<div class="content-blog">';
              myRow += '<a target="_blank" href="'+ item.link +'">' + item.title + '</a>';
              myRow += '<p>' + decode(item.description) + '</p>';
              myRow += '</div>';
              $('.blog-list').append(myRow);
            }
          })
          .fail(function() {
            blogError.append("Unable to load the cool camunda BPM blog posts, try refreshing the page!");
            blogError.show();
          });
    }

    /*
     =======================================
     modal generation for thumbnails to big picture
     =======================================
     */
    var imgThumb = $('[data-img-thumb]'),
        running = 0;
    if(imgThumb.length > 0) {
      imgThumb.each(function () {
        var element = $(this),
            id = 'dialog-' + (element.attr('id') || ('generated-id-' + (running++))),
            selector = '#' + id,
            image = element.attr('src');

        var container = element.parent();

        element.wrap('<a data-toggle="modal" href="' + selector + '" class="thumbnail"></a>');

        var parent = element.parent();

        parent.appendTo(container);

        container.append(
            '<div class="link-img-thumb-enlarge">' +
                '  <a data-toggle="modal" href="' + selector + '">' +
                '    <i class="glyphicon glyphicon-zoom-in"></i> click to enlarge' +
                '  </a>' +
                '</div>');

        container.append(
            '<div class="modal" id="' + id +'" tabindex="-1" role="dialog" aria-hidden="true">' +
                '  <div class="modal-dialog">' +
                '    <div class="modal-content">' +
                '      <div class="modal-body">' +
                '        <img class="img-responsive" src="' + image + '" />' +
                '      </div>' +
                '      <div class="modal-footer">' +
                '        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>');
      });
    }

    /*
     =======================================
     Display source code and popover explanations
     =======================================
     */
    var appSource = $('[data-source-code]');
    if(appSource.length > 0) {
      var indent = function(text, spaces) {
        if (!text) return text;
        var lines = text.split(/\r?\n/);
        var prefix = '      '.substr(0, spaces || 0);
        var i;

        // remove any leading blank lines
        while (lines.length && lines[0].match(/^\s*$/)) lines.shift();
        // remove any trailing blank lines
        while (lines.length && lines[lines.length - 1].match(/^\s*$/)) lines.pop();
        var minIndent = 999;
        for (i = 0; i < lines.length; i++) {
          var line = lines[0];
          var indent = line.match(/^\s*/)[0];
          if (indent !== line && indent.length < minIndent) {
            minIndent = indent.length;
          }
        }

        for (i = 0; i < lines.length; i++) {
          lines[i] = prefix + lines[i].substring(minIndent);
        }
        lines.push('');
        return lines.join('\n');
      };

      var escape = function(text) {
        return text.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/"/g, '&quot;');
      };

      var fetchCode = function(elementId) {
        var escapedElementId = elementId.replace(/\./, '\\\.');
        return indent($('#' + escapedElementId).html(), 0);
      };

      appSource.each(function() {
        var element = $(this),
            filename = element.attr('data-source-code'),
            content = fetchCode(filename),
            annotation = element.attr('annotate') && JSON.parse(fetchCode(element.attr('annotate'))) || {};


        // hack around incorrect tokenization
        content = content.replace('.done-true', 'doneTrue');
        if(filename.indexOf('Project-Layout')==-1) {
          content = prettyPrintOne(escape(content), undefined, true);
        }

        // hack around incorrect tokenization
        content = content.replace('doneTrue', '.done-true');

        var popovers = {},
            counter = 0;

        //Object length check with alternative for IE8 and below
        var annotationObjectLength = 0;
        if(typeof Object.keys == 'function') {
          if(Object.keys(annotation).length > 0) {
            if(typeof annotation[filename] != "undefined") {
              annotationObjectLength = Object.keys(annotation[filename]).length;
            }
          }
        } else {
          var count = 0;
          var i;
          for (i in annotation) {
            if (annotation.hasOwnProperty(i)) {
              count++;
            }
          }
          if(count > 0) {
            for(i in annotation[filename]) {
              if(annotation[filename].hasOwnProperty(i)) {
                annotationObjectLength++
              }
            }
          }
        }

        if(annotationObjectLength > 0) {
          $.each(annotation[filename], function(key, text) {
            // search for key-words and add explanation popover
            var regexp = new RegExp('(\\W|^)(' + key.replace(/([\W\-])/g, '\\$1') + ')(\\W|$)');
            content = content.replace(regexp, function(_, before, token, after) {
              token = "__" + (counter++) + "__";
              popovers[token] =
                  '<code class="nocode" rel="popover" data-trigger="hover" title="' + escape('<code>' + key + '</code>') +
                      '" data-content="' + escape(text) + '" data-html=\"true\">' + escape(key) + '</code>';
              return before + token + after;
            });
          });
        }

        $.each(popovers, function(token, text) {
          content = content.replace(token, text);
        });

        element.html('<pre class="linenums nocode">' + content +'</pre>');
        element.find('[rel=popover]').popover();
      });
    }
  });
}(window.jQuery);
