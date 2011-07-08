function detect_service(url) {
    var label;
    if (RegExp('dribbble.com|drbl.in').test(url)) {
        label = "Dribbble";
    } else if (RegExp('twitter.com').test(url)) {
        label = "Twitter";
    } else {
        label = "Link";
    }
    return label;
}

$(document).ready(function() {
    (function() {
        var schemes = ["pink", "blue", "green"],
        div = $("<div>", {
            'class': 'colorSchemes'
        });

        $.each(schemes,
        function(i, scheme) {
            // var scheme = value;
            link = $("<a>", {
                text: scheme,
                href: "#" + scheme
            }).bind("click",
            function(e) {
                e.preventDefault();
                $("html, header").removeAttr('class').addClass(scheme);
                return false;
            });
            div.append(link);
        });

        $("body").append(div);
    })();

    $("#wrap").empty();
    $.each(tumblr_api_read.posts,
    function() {
        var element = $("<article>", {
            id: "post_" + this.id
        }),
        figure = $("<figure>"),
        figcaption = $("<figcaption>", {
            html: this['photo-caption']
        }),
        image = $("<img>", {
            src: this['photo-url-250']
        }),
        photoURL = this['photo-link-url'],
        a = $("<a>", {
            href: photoURL,
            'class': detect_service(photoURL).toLowerCase(),
            text: detect_service(photoURL)
        });
        figure.append(image);
        figcaption.append(a);
        figure.append(figcaption);
        element.append(figure);

        $("#wrap").append(element);
    });
});