(function($) {
    $.fn.jCoolTube = function() {
        return this.each(function() {
            //this.id = getUrlParameter($(this).attr("href"), "v");
            loadPlayer(this.id, $(this).attr('href'), $(this).attr('width'), $(this).attr('height'), this.title);
        });

        // The "main method" of this sample. Called when someone clicks "Run".
        function loadPlayer(playerId, videoSrc, width, height, thetitle) {
            // Lets Flash from another domain call JavaScript
            var params = { allowScriptAccess: "always",
                           wmode: "transparent"
                         };
            // The element id of the Flash embed
            var atts = { id: playerId,
                         src: videoSrc,
                         title: thetitle,
                         "class": "jCoolPlayers"
                        };
            // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
            swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
                           "&enablejsapi=1&playerapiid=" + playerId,
                           playerId, width, height, "8", null, null, params, atts);
        }
    }
})(jQuery);

function playVideo(playerId) {
    ytplayer = document.getElementById(playerId);
    $("#" + ytplayer.id + "link img").fadeOut("def");
    PauseAll();
    if (ytplayer.getDuration) {
        if (ytplayer.getDuration() > 0)
            ytplayer.playVideo();
        else {
            ytplayer.loadVideoById(getUrlParameter($(ytplayer).attr("src"), "v"));
            $("#" + ytplayer.id + "preview").html(ytplayer.getVideoEmbedCode());
            $("#" + ytplayer.id + "preview object embed").attr("src", $("#" + ytplayer.id + "preview object embed").attr('src') + "&autoplay=1");
            $("#" + ytplayer.id + "link").fancybox({
                hideOnContentClick: true,
                frameWidth: parseInt($("#" + ytplayer.id + "preview object").attr('width')),
                frameHeight: parseInt($("#" + ytplayer.id + "preview object").attr('height')),
                overlayColor: "#000",
                overlayOpacity: 0.6 
            });
        }
    }
}

function pauseVideo(playerId) {
    ytplayer = document.getElementById(playerId);
    $("#" + ytplayer.id + "link img").fadeIn("def");
    if (ytplayer && ytplayer.getDuration)
        ytplayer.pauseVideo();
}

function PauseAll()
{
    $(".jCoolPlayers").each(function() {
        if (this) this.pauseVideo;
    });
}

// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
    ytplayer = document.getElementById(playerId);
    if (!document.getElementById(playerId + "link")) {
        $(ytplayer).parent().prepend("<a id='" + playerId + "link' title='" + ytplayer.title + "' href='#" + playerId + "preview' style='z-index: 1; position: absolute; width: " + parseInt($(ytplayer).width()) + "px; height: " + $(ytplayer).height() + "px; color: #FFF; text-decoration: none; background: url(/App_Themes/til/images/bgnds/blank.png);'><span style='position: absolute; left: 5px;'>" + ytplayer.title + "</span><img src='http://img.youtube.com/vi/" + getUrlParameter($(ytplayer).attr("src"), "v") + "/2.jpg' style='width: 100%; height: 100%'/></a>");
        $("#" + playerId + "link").hover(
            function() {
                playVideo(playerId);
            },
            function() {
                pauseVideo(playerId);
            }
        );
        $(ytplayer).parent().parent().attr("onmouseover", "StopAll()");
        $("body").append("<div id='" + playerId + "preview' style='display:none'></div>");
    }
}

function getUrlParameter(source, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(source);
    if (results == null)
        return "";
    else
        return results[1];
}