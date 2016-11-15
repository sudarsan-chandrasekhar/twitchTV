$(document).ready(function () {
  getTwitchData();
});

function getTwitchData() {
  
  var users = [
    'ESL_SC2',
    'OgamingSC2',
    'cretetion',
    'freecodecamp',
    'storbeck',
    'habathcx',
    'RobotCaleb',
    'noobs2ninjas',
    'comster404',
    'brunofin',
  ];

  
  users.forEach(function (user) {
    var callback = '?client_id=8jdth56qkbaukrtdnpfbaljp8qsbbm1&callback=?',
        twitchChannel = 'https://api.twitch.tv/kraken/channels/' + user + callback,
        twitchStream = 'https://api.twitch.tv/kraken/streams/' + user + callback;

    $.getJSON(twitchStream).done(function (stream) {
      if (stream.error) { 
        var userUrl = '#',
            userStatus = 'closed',
            userLogo = 'https://web-cdn.ttvnw.net/images/xarth/dead_glitch.png',
            displayName = user,
            streaming = stream.message,
            icon = 'event_busy';

        printData(userUrl, userStatus, userLogo, displayName, streaming, icon);

      } else if (!stream.stream) {
        $.getJSON(twitchChannel).done(function (channel) {
          var userUrl = channel.url,
              userStatus = 'offline',
              userLogo = channel.logo,
              displayName = channel.display_name,
              streaming = userStatus,
              icon = 'event';

          printData(userUrl, userStatus, userLogo, displayName, streaming, icon);
        });

      } else { 
        var stream = stream.stream.channel,
            userUrl = stream.url,
            userStatus = 'online',
            userLogo = stream.logo,
            displayName = stream.display_name,
            streaming = stream.status,
            icon = 'event_available';

        printData(userUrl, userStatus, userLogo, displayName, streaming, icon);
      }
    });
  });
}

function printData(userUrl, userStatus, userLogo, displayName, streaming, icon) {
  $('#' + userStatus).append(
    '<div id="' + displayName.toLowerCase() + '" class="users">' +
      '<div class="card-panel hoverable ' + userStatus + '">' +
        '<div class="row content-row">' +
          '<div class="col s12 m3 center">' +
            '<img class="responsive-img circle logo" src="' + userLogo + '">' +
          '</div>' +
          '<div class="col s12 m9 details-col">' +
            '<div class="row info-row">' +
              '<span>' +
                '<i class="material-icons">person</i>&nbsp;&nbsp;' +
                '<span style="font-weight: bold">' + displayName + '</span>' +
             '</span>' +
            '</div>' +
            '<div class="row info-row">' +
              '<span>' +
                '<i class="material-icons right-align">' + icon + '</i>&nbsp;&nbsp;' +
                streaming +
              '</span>' +
            '</div>' +
            '<div class="row info-row channel-link">' +
              '<span>' +
                '<i class="material-icons">visibility</i>&nbsp;&nbsp;' +
                '<a href="' + userUrl + '" target="_blank">' +
                  'Visit ' + displayName + ' on Twitch.tv' +
                '</a>' +
              '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
  if (userStatus === 'closed') {
    $('#' + displayName.toLowerCase() + ' .logo').removeClass('circle');
    $('#' + displayName.toLowerCase() + ' .channel-link').remove();
  }
}


$('#filter-offline').click(function () {
  $('#online').hide();
  $('#closed').hide();
  $('#offline').show();
});

$('#filter-online').click(function () {
  $('#online').show();
  $('#closed').hide();
  $('#offline').hide();
});

$('#filter-all').click(function () {
  $('#online').show();
  $('#closed').show();
  $('#offline').show();
});

$('#search-input').click(function () {
  $(this).val('');
  $('.users').show();
});

$('#search-input').on('change keyup paste', function (e) {
  var key = e.keyCode || e.which;
  if (key === 13) $(this).blur();  
  
  var searchTerm = $('#search-input').val().toLowerCase();
  
  $('.users').show();
  $('.users').not('[id*=' + searchTerm + ']').hide();
  $('.users [id*=' + searchTerm + ']').show();
});
