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

function show_section(element) {
    console.log(element.index());
    $("#content .wrap:visible:not(#" + element.attr("id") + ")").animate({
        left: "-100%",
        opacity: 0
    },
    1000, 'swing',
    function() {
        $(this).hide();
        $(this).css({
            left: "100%"
        });
    });
    element.not(":visible").show().css({
        left: '100%',
        opacity: 0
    }).animate({
        left: 0,
        opacity: 1
    },
    1000, 'swing',
    function() {
        // $(this).hide();
        });
}

$(document).ready(function() {

    $("header, .pocket").animate({
        left:0
    },1000,'swing',function(){
        $("nav",this).show().css({
            opacity:0
        }).animate({
            opacity:1
        },1000,'swing',function(){
            $(this).show();
            $(this).find("a").each(function(i,val){
                var element = $(this);
                setTimeout(function(){
                    element.animate({
                        marginRight:'0px'
                    });  
                },i*100);
            });
            show_section($("#portfolio"));
        });
    });
    (function() {
        var schemes = ["black", "pink", "blue", "green"],
        div = $("<div>", {
            'class': 'colorSchemes'
        });

        $.each(schemes,
        function(i, scheme) {
            // var scheme = value;
            link = $("<a>", {
                text: scheme,
                'class': scheme + " ir",
                href: "#" + scheme
            }).bind("click",
            function(e) {
                e.preventDefault();
                $("html, header").removeAttr('class').addClass(scheme);
                return false;
            });
            link.hide();
            div.append(link);
        });
        
        $("body").append(div);
        
        $("body .colorSchemes a").each(function(i,val){
           var element = $(this);
           setTimeout(function(){
               element.fadeIn();
           },i*100);
            
        });
    })();

    (function() {
        $("a[href='#work']").click(function() {
            show_section($("#portfolio"));
        });
        $("a[href='#mac']").click(function() {
            show_section($("#portfolio_mac"));
        });
        $("a[href='#iphone']").click(function() {
            show_section($("#portfolio_iphone"));
        });
        $("a[href='#goodies']").click(function() {
            show_section($("#goodies"));
        });
        $("a[href='#about']").click(function() {
            show_section($("#about"));
        });
        $("a[href='#contact']").click(function() {
            show_section($("#contact"));
        });
    })();

    (function() {
        var portfolio = $("<div>", {
            id: 'portfolio',
            'class': 'wrap'
        }),
        portfolio_mac = $("<div>", {
            id: 'portfolio_mac',
            'class': 'wrap'
        }),
        portfolio_iphone = $("<div>", {
            id: 'portfolio_iphone',
            'class': 'wrap'
        }),
        goodies = $("<div>", {
            id: 'goodies',
            'class': 'wrap'
        });
        if (window.tumblr_api_read) {
            $.each(tumblr_api_read.posts,
            function() {
                if(this.type === "photo"){
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
                        'class': 'ir ' + detect_service(photoURL).toLowerCase(),
                        text: detect_service(photoURL)
                    });
                    figure.append(image);
                    if (photoURL) {
                        figcaption.append(a);
                    }
                    figure.append(figcaption);
                    element.append(figure);
                    $.each(this.tags,
                    function(i, value) {
                        el = element.clone();
                        if (value === "portfolio") {
                            portfolio.append(el);
                        } else if (value === "mac") {
                            portfolio_mac.append(el);
                        } else if (value === "iphone") {
                            portfolio_iphone.append(el);
                        } else if (value === "goodies"){
                            goodies.append(el);
                        }
                    });
                }
            });
            $("#content").append(portfolio);
            $("#content").append(portfolio_mac);
            $("#content").append(portfolio_iphone);
            $("#content").append(goodies);
            
            
        } else {
            (function() {
                var notice = $("<div>", {
                    'class': 'notice'
                }),
                header = $("<h2>", {
                    text: "Oh fuck!"
                }),
                message = $("<p>", {
                    text: "Tumblr has just shit it's self. My awesome content will not be viewable just yet. Bring yo' self back later."
                });
                notice.css({
                    right: -notice.width()
                });
                notice.append(header);
                notice.append(message);
                $("body").append(notice);
                notice.animate({
                    right: 0
                },
                2000, 'swing');

                show_section($("#contact"));
            })();
        }
    })();
});