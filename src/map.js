import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";


export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // add data for Covid19
            data: []
        }
    }

    componentDidMount() {
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("chartdiv", am4maps.MapChart);

        chart.geodata = am4geodata_usaLow;

        chart.projection = new am4maps.projections.AlbersUsa();

        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        polygonSeries.heatRules.push({
        property: "fill",
        target: polygonSeries.mapPolygons.template,
        min: chart.colors.getIndex(9).brighten(1),
        max: chart.colors.getIndex(9).brighten(-0.3),
        logarithmic: true
        });

        polygonSeries.useGeodata = true;

        // Set heatmap values for each state
        // Replace with pulled data for Covid19
        polygonSeries.data = [
        {
            id: "US-AL",
            value: 44471
        },
        {
            id: "US-AK",
            value: 62693
        },
        {
            id: "US-AZ",
            value: 51306
        },
        {
            id: "US-AR",
            value: 26734
        },
        {
            id: "US-CA",
            value: 238710
        },
        {
            id: "US-CO",
            value: 43012
        },
        {
            id: "US-CT",
            value: 34055
        },
        {
            id: "US-DE",
            value: 78360
        },
        {
            id: "US-FL",
            value: 159823
        },
        {
            id: "US-GA",
            value: 81864
        },
        {
            id: "US-HI",
            value: 121153
        },
        {
            id: "US-ID",
            value: 129395
        },
        {
            id: "US-IL",
            value: 124192
        },
        {
            id: "US-IN",
            value: 60804
        },
        {
            id: "US-IA",
            value: 29263
        },
        {
            id: "US-KS",
            value: 26884
        },
        {
            id: "US-KY",
            value: 40417
        },
        {
            id: "US-LA",
            value: 44689
        },
        {
            id: "US-ME",
            value: 12749
        },
        {
            id: "US-MD",
            value: 52964
        },
        {
            id: "US-MA",
            value: 63490
        },
        {
            id: "US-MI",
            value: 99384
        },
        {
            id: "US-MN",
            value: 49194
        },
        {
            id: "US-MS",
            value: 28446
        },
        {
            id: "US-MO",
            value: 55952
        },
        {
            id: "US-MT",
            value: 90219
        },
        {
            id: "US-NE",
            value: 17112
        },
        {
            id: "US-NV",
            value: 19982
        },
        {
            id: "US-NH",
            value: 12357
        },
        {
            id: "US-NJ",
            value: 84143
        },
        {
            id: "US-NM",
            value: 18190
        },
        {
            id: "US-NY",
            value: 189764
        },
        {
            id: "US-NC",
            value: 80493
        },
        {
            id: "US-ND",
            value: 64220
        },
        {
            id: "US-OH",
            value: 113531
        },
        {
            id: "US-OK",
            value: 34506
        },
        {
            id: "US-OR",
            value: 34213
        },
        {
            id: "US-PA",
            value: 122810
        },
        {
            id: "US-RI",
            value: 104831
        },
        {
            id: "US-SC",
            value: 40120
        },
        {
            id: "US-SD",
            value: 75484
        },
        {
            id: "US-TN",
            value: 56892
        },
        {
            id: "US-TX",
            value: 20851
        },
        {
            id: "US-UT",
            value: 22331
        },
        {
            id: "US-VT",
            value: 60882
        },
        {
            id: "US-VA",
            value: 70785
        },
        {
            id: "US-WA",
            value: 58941
        },
        {
            id: "US-WV",
            value: 18083
        },
        {
            id: "US-WI",
            value: 53636
        },
        {
            id: "US-WY",
            value: 49378
        }
        ];

        let heatLegend = chart.createChild(am4maps.HeatLegend);
        heatLegend.series = polygonSeries;
        heatLegend.align = "right";
        heatLegend.valign = "bottom";
        heatLegend.height = am4core.percent(60);
        heatLegend.orientation = "vertical";
        heatLegend.valign = "middle";
        heatLegend.marginRight = am4core.percent(4);
        heatLegend.valueAxis.renderer.opposite = true;
        heatLegend.valueAxis.renderer.dx = -25;
        heatLegend.valueAxis.strictMinMax = false;
        heatLegend.valueAxis.fontSize = 9;
        heatLegend.valueAxis.logarithmic = false;

        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {value}";
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.strokeWidth = 0.5;

        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#cf2d2d");

        polygonSeries.mapPolygons.template.events.on("over", function (event) {
        handleHover(event.target);
        })

        polygonSeries.mapPolygons.template.events.on("hit", function (event) {
        handleHover(event.target);
        })

        function handleHover(column) {
        if (!isNaN(column.dataItem.value)) {
            heatLegend.valueAxis.showTooltipAt(column.dataItem.value)
        }
        else {
            heatLegend.valueAxis.hideTooltip();
        }
        }

        polygonSeries.mapPolygons.template.events.on("out", function (event) {
        heatLegend.valueAxis.hideTooltip();
        })

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
    }

    render() {
        return (
            <div className={'mapPage'}>
                <h1>COVID-19 Heatmap</h1>
                <div id="chartdiv" style={{ width: "100%", height: "700px" }}></div>
            </div>
        );
    }
}