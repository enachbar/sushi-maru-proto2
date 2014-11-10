(function() {
  $(document).ready(function() {
    return $(".gallery").gallery();
  });

  $.fn.gallery = function(options) {
    var galleries;
    galleries = Array();
    return this.each(function(key) {
      var animate, b, btn, buttons, buttons_width, current;
      current = key;
      galleries[current] = $.extend({
        speed: 5000,
        object: this,
        width: $(this).width(),
        height: $(this).height(),
        images: $("img", this).length,
        current_image: 0,
        interval: ""
      }, options);
      $.each($("img", this), function(key, value) {
        var image;
        image = new Image();
        image.src = $(this).attr("src");
        return image.onload = function() {
          var new_height, new_width, offset_left, offset_top;
          new_width = galleries[current].width;
          new_height = this.height / this.width * new_width;
          if (new_height < galleries[current].height) {
            new_height = galleries[current].height;
            new_width = this.width / this.height * new_height;
          }
          offset_top = ((new_height - galleries[current].height) / 2) * -1;
          offset_left = ((new_width - galleries[current].width) / 2) * -1;
          $("img:eq(" + key + ")", galleries[current].object).css("top", offset_top + "px");
          $("img:eq(" + key + ")", galleries[current].object).css("left", offset_left + "px");
          $("img:eq(" + key + ")", galleries[current].object).css("width", new_width + "px");
          return $("img:eq(" + key + ")", galleries[current].object).css("height", new_height + "px");
        };
      });
      b = 0;
      buttons = $("<div class='gallery-buttons'></div>");
      while (b < galleries[current].images) {
        btn = $("<div class='gallery-btn' data-image='" + b + "'></div>");
        if (b === 0) {
          btn.addClass("active");
        }
        buttons.append(btn);
        b++;
      }
      buttons_width = (b * 20) + ((b - 1) * 10);
      buttons.css("width", buttons_width + "px");
      $(this).append(buttons);
      $(".gallery-btn", galleries[current].object).on("click", function(e) {
        e.preventDefault();
        if (galleries[current].current_image !== $(this).data("image")) {
          clearInterval(galleries[current].interval);
          return animate($(this).data("image"));
        }
      });
      galleries[current].interval = setInterval(function() {
        return animate();
      }, galleries[current].speed);
      return animate = function(image) {
        if (image == null) {
          image = "";
        }
        $("img:eq(" + galleries[current].current_image + ")", galleries[current].object).removeClass("active");
        $(".gallery-buttons .gallery-btn:eq(" + galleries[current].current_image + ")", galleries[current].object).removeClass("active");
        galleries[current].current_image++;
        if (image === "") {
          if (galleries[current].current_image === galleries[current].images) {
            galleries[current].current_image = 0;
          }
        } else {
          galleries[current].current_image = image;
        }
        $("img:eq(" + galleries[current].current_image + ")", galleries[current].object).addClass("active");
        return $(".gallery-buttons .gallery-btn:eq(" + galleries[current].current_image + ")", galleries[current].object).addClass("active");
      };
    });
  };

}).call(this);
