$(document).ready(function () {
    data.load("./res/data/data.csv");
});

var data = (function () {
    var t = function (t, a) {
            var n = e(t, a);
            $("#billions").text(n.valueBillions), $("#percent").text(n.valuePercent), $("#employment").text(util.numberWithCommas(n.employment)), $("#compensation").text(n.compensation + "B");
        },
        e = function (t, e) {
            for (var a = JSON.parse(localStorage.getItem("dataGlobal")), n = 0; n < a.length; n++) if (a[n][t] === e) return a[n];
        };
    return {
        load: function (e) {
            d3.csv(e)
                .row(function (t) {
                    d3.select("#state-list")
                        .append("li")
                        .append("a")
                        .attr("role", "button")
                        .attr("data-state", t.State)
                        .on("click", function () {
                            map.handleClick(t.State);
                        })
                        .text(t.State);
                    var e = "Value added to the state's economy by the arts B",
                        a = "Arts' value-added as a share of the state's economy",
                        n = "Arts worker compensation B",
                        o = "Number of arts-related workers";
                    return { state: t.State, valueBillions: t[e], valuePercent: t[a], compensation: t[n], employment: t[o] };
                })
                .get(function (e, a) {
                    if (e) throw e;
                    localStorage.setItem("dataGlobal", JSON.stringify(a)), map.draw(".map"), t("state", "Alabama");
                });
        },
        render: function (e, a) {
            t(e, a);
        },
    };
})();
var map = (function () {
    var t = function (t) {
        var e = $(".svg-state");
        e.removeClass("selected"), e.filter('[data-name="' + t + '"]').addClass("selected"), d3.select("#dropdownMenu1 .active-item").text(t), data.render("state", t);
    };
    return {
        draw: function (e) {
            var a = 980,
                r = 610,
                s = d3
                    .select(e)
                    .append("svg")
                    .attr("width", "100%")
                    .attr("viewBox", "0 0 " + a + " " + r)
                    .attr("preserveAspectRatio", "xMidYMid meet")
                    .attr("id", "svg-us")
                    .attr("data-name", "U.S."),
                n = d3
                    .geoAlbersUsa()
                    .translate([a / 2, r / 2])
                    .scale([1350]),
                d = d3.geoPath(n);
            d3.json("res/data/us-states.json", function (e) {
                s.selectAll("path")
                    .data(e.features)
                    .enter()
                    .append("path")
                    .attr("data-name", function (t) {
                        return t.properties.name;
                    })
                    .attr("class", function (t) {
                        var e = "";
                        return (e = "Alabama" === t.properties.name ? "svg-state selected" : "svg-state");
                    })
                    .attr("d", d)
                    .on("click", function (e) {
                        t(e.properties.name);
                    });
            });
        },
        handleClick: function (e) {
            t(e);
        },
    };
})();
var util = (function () {
    return {
        numberWithCommas: function (n) {
            var r = n.toString().split(".");
            return (r[0] = r[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")), r.join(".");
        },
    };
})();