// tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

// question accordion
$('#accordion_questions .card').on('shown.bs.collapse', function () {
    $('#accordion_questions .card').removeClass("c_collapse");
    $(this).addClass("c_collapse");
});
$('#accordion_questions .card').on('hidden.bs.collapse', function () {
    $('#accordion_questions .card').removeClass("c_collapse");
});

//forecast slider  >7den
var owl_forecast = $('.owl_forecast');
if (owl_forecast.length) {
    owl_forecast.owlCarousel({
        nav: true,
        dots: true,
        autoWidth: true,
        loop: false,
        autoplay: true,
        autoplayTimeout: 3000,
        navContainer: '.owl-nav-forecast',
        responsive : {
            0 : {
                margin: 20
            },
            1201 : {
                margin: 40
            }
        }
    });
}

//news slider
var owl_news = $('.owl_news');
if (owl_news.length) {
    owl_news.owlCarousel({
        nav: true,
        dots: true,
        autoWidth: true,
        loop: true,
        autoplay: false,
        autoplayTimeout: 3000,
        navContainer: '.owl-nav-news',
        responsive : {
            0 : {
                margin: 13,
                center: false,
            },
            768 : {
                margin: 20,
                center: true,
            }
        }
    });
}

//main slider
var owl_main = $('.owl_main');
if (owl_main.length) {
    owl_main.on('initialized.owl.carousel', function(event) {
        $(".identificators .page[data-id="+event.item.index+"]").addClass("active");
    })
    owl_main.owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        callbacks: true,
        URLhashListener:true,
        startPosition: 'URLHash',
        responsive : {
            0 : {
                dots: true
            },
            768 : {
                dots: false
            }
        }
    });
    owl_main.on('changed.owl.carousel', function(event) {

        $(".identificators .page").removeClass("active");
        $(".identificators .page[data-id="+event.item.index+"]").addClass("active");

        if (event.item.index == 7) {
            setTimeout(function() {
                $(".identificators .page[data-id="+0+"]").addClass("active");
                $('.owl_main').trigger("to.owl.carousel", [0, 200]);
            }, 5000);

        }
    });

    $(document).on("click",".identificators .page",function() {
        var dId = parseInt($(this).attr("data-id"));
        $(".identificators .page").removeClass("active");
        $(this).addClass("active");
        $('.owl_main').trigger("to.owl.carousel", [dId, 300]);
    });
}

$(document).ready(function() {
    if ($(".datepicker").length) {
        $('.datepicker').datepicker();
    }
});

//responsive menu
$(document).on("click",".rp_menu",function() {
    $(".sidebar_part").addClass("opened");
});


$(document).on("click",".sidebar_part.opened .has-sub",function() {
    $(".sidebar_part.opened .has-sub").removeClass("opened");
    $(this).addClass("opened");
});

$(document).on("click",".sidebar_part.opened .close",function() {
    $(".sidebar_part").removeClass("opened");
});

if ($(".wheel_container").length > 0) {
    // wheel lucky spin
    if (($(window).width() < 992) && ($(window).width() >375)) {
        var w = 300,
            h = 300
    }
    else if ($(window).width() < 375) {
        var w = 260,
            h = 260
    }
    else {
        var w = 380,
            h = 380
    }

    var padding = {top:0, right:0, bottom:0, left:0},
        r = Math.min(w, h)/2,
        rotation = 0,
        oldrotation = 0,
        picked = 100000,
        oldpick = [],
        color = d3.scale.category20();//category20c()
//http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results
    var data = [
        {"label":"Erik",  "value":1},
        {"label":"Ali",  "value":2},
        {"label":"Beatriz",  "value":3},
        {"label":"Beatriz",  "value":4},
        {"label":"Charles",  "value":5},
        {"label":"Diya",  "value":6},
        {"label":"Eric",  "value":7},
        {"label":"Fatima",  "value":8},
        {"label":"Gabriel",  "value":9},
        {"label":"Hanna", "value":10}
    ];
    var svg = d3.select('#chart')
        .append("svg")
        .data([data])
        .attr("width",  w + padding.left + padding.right)
        .attr("height", h + padding.top + padding.bottom);
    var container = svg.append("g")
        .attr("class", "chartholder")
        .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
    var vis = container
        .append("g");

    var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
// declare an arc generator function
    var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("g")
        .attr("class", "slice");

    arcs.append("path")
        .attr("fill", function(d, i){ return color(i); })
        .attr("d", function (d) { return arc(d); });
// add the text
    arcs.append("text").attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle)/2;
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
    })
        .attr("text-anchor", "end")
        .text( function(d, i) {
            return data[i].label;
        });
    container.on("click", spin);
    function spin(d){

        container.on("click", null);
        //all slices have been seen, all done
        if(oldpick.length == data.length){
            container.on("click", null);
            return;
        }
        var  ps       = 360/data.length,
            pieslice = Math.round(1440/data.length),
            rng      = Math.floor((Math.random() * 1440) + 360);

        rotation = (Math.round(rng / ps) * ps);

        picked = Math.round(data.length - (rotation % 360)/ps);
        picked = picked >= data.length ? (picked % data.length) : picked;
        if(oldpick.indexOf(picked) !== -1){
            d3.select(this).call(spin);
            return;
        } else {
            oldpick.push(picked);
        }
        rotation += 90 - Math.round(ps/2);
        vis.transition()
            .duration(5000)
            .attrTween("transform", rotTween)
            .each("end", function(){
                oldrotation = rotation;

                /* Get the result value from object "data" */

                $("#winnerModal").modal("hide");
                $("#winnerSuccessModal").modal("show");

                /* Comment the below line for restrict spin to sngle time */
                container.on("click", spin);

            });
    }
//make arrow
//draw spin circle
    container.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 30)
        .style({"fill":"white","cursor":"pointer"});
//draw spin circle
    container.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 15)
        .style({"fill":"#CFCDD9","cursor":"pointer"});


    function rotTween(to) {
        var i = d3.interpolate(oldrotation % 360, rotation);
        return function(t) {
            return "rotate(" + i(t) + ")";
        };
    }

    function getRandomNumbers(){
        var array = new Uint16Array(1000);
        var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
        if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
            window.crypto.getRandomValues(array);
        } else {
            //no support for crypto, get crappy random numbers
            for(var i=0; i < 1000; i++){
                array[i] = Math.floor(Math.random() * 100000) + 1;
            }
        }
        return array;
    }



}

jQuery("document").ready(function($){
    var nav = $('.sidebar_part');
    var side_part = $('.section_panel .sideNav');
    var main_part = $('.section_panel .main_content');
    if (side_part.height() > $('.section_panel .main_part').height()) {
        $('.section_panel .main_part').css('height', side_part.height());
    }

    function rightSticky() {
        if ($(window).width() > 768) {
            if (($(".item_1").length > 0) && ($(".item_1").css("display") !== "none")) {
                if ($(this).scrollTop() >= 170) {
                    side_part.addClass("inFixed");
                    if ($(window).width() < 992) {
                        side_part.css('right', $(window).width() - (main_part.width() + main_part.position().left));
                    }
                    else {
                        side_part.css('right', $(window).width() - (nav.width() + main_part.width() + 35 + main_part.position().left));
                    }
                }
                else {
                    side_part.removeClass("inFixed");
                    side_part.css('right', 'unset');
                }

                if ($(this).scrollTop() >= $('.section_panel').outerHeight() - side_part.outerHeight()) {
                    side_part.addClass("inBottom");
                    side_part.removeClass("inFixed");
                }
                else {
                    side_part.removeClass("inBottom");
                }
            }
            else {
                if ($(this).scrollTop() >= 70) {
                    side_part.addClass("inFixed");
                    if ($(window).width() < 992) {
                        side_part.css('right', $(window).width() - (main_part.width() + main_part.position().left));
                    }
                    else {
                        side_part.css('right', $(window).width() - (nav.width() + main_part.width() + 35 + main_part.position().left));
                    }
                }
                else {
                    side_part.removeClass("inFixed");
                    side_part.css('right', 'unset');
                }

                if ($(this).scrollTop() >= $('.section_panel').outerHeight() - side_part.outerHeight()) {
                    side_part.addClass("inBottom");
                    side_part.removeClass("inFixed");
                }
                else {
                    side_part.removeClass("inBottom");
                }
            }
        }
    }

    function navSticky() {
        if ($(".item_1").length > 0) {
            if ($(this).scrollTop() >= 170) {
                nav.addClass("inFixed");
                main_part.addClass("inFixed");
            }
            else {
                nav.removeClass("inFixed");
                main_part.removeClass("inFixed");
            }


            if (($(this).scrollTop() >= $('.section_panel').outerHeight() - $('.sidebar_part').outerHeight())) {
                nav.removeClass("inFixed")
                nav.addClass("inBottom");
            }
            else {
                nav.removeClass("inBottom");
            }
        }
        else {
            if ($(this).scrollTop() >= 70) {
                nav.addClass("inFixed");
                main_part.addClass("inFixed");
            }
            else {
                nav.removeClass("inFixed");
                main_part.removeClass("inFixed");
            }


            if (($(this).scrollTop() >= $('.section_panel').outerHeight() - $('.sidebar_part').outerHeight())) {
                nav.removeClass("inFixed")
                nav.addClass("inBottom");
            }
            else {
                nav.removeClass("inBottom");
            }
        }
    }
    navSticky();
    rightSticky();
    $( window ).resize(function() {
        rightSticky();
    });
    $(window).scroll(function () {
        navSticky();
        rightSticky();
    });
});

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.location = $(this).attr("data-href");
    });
});

if ($(".opinion_info").length > 0) {
    $(".opinion_info table").addClass("table table-striped table_type_2")
    $(".opinion_info table").wrapAll('<div class="table-responsive"></div>')
}

// chart js
$( ".myChart" ).each(function() {
    var dId = $(this).attr("data-id");
    var dPercentage = $(this).attr("data-percentage");
    var dColor = $(this).attr("data-color");
    var dThickness = $(this).attr("data-thickness");

    if ($(".myChart"+dId).length) {
        var yValues5 = [dPercentage, (100 - dPercentage)];
        var barColors5 = [
            dColor,
            "#F1F2F2",
        ];
        new Chart($(".myChart"+dId), {
            type: "doughnut",
            data: {
                labels: "",
                datasets: [{
                    backgroundColor: barColors5,
                    data: yValues5
                }],
            },
            options: {
                cutout: dThickness,
                aspectRatio: 1,
            }
        });
    }
});

// chart main
if ($("#myChartMain").length) {
    const data4 = {
        datasets: [
            {
                backgroundColor: ['#479E4A', '#D43A30', '#479E4A', '#D43A30', '#D43A30'],
                data: [10, 30, 20, 30, 10]
            },
            {
                backgroundColor: ['#B0B53A', '#F8D859', '#50B5AD'],
                data: [40, 50, 10]
            },
            {
                backgroundColor: ['hsl(100, 100%, 60%)', 'hsl(100, 100%, 35%)'],
                data: [0, 0]
            }
        ]
    };
    new Chart("myChartMain", {
        type: "pie",
        data: data4,
        options: {
            cutout: 50,
            verticalAlign: 'middle',
        }
    });
}

// expand table row
$('.expand_row').click(function(){
    console.log("asasas");
    $(this).nextUntil(".expand_row").toggleClass('open');
});