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
            value: 444710
        },
        {
            id: "US-AK",
            value: 626932
        },
        {
            id: "US-AZ",
            value: 5130632
        },
        {
            id: "US-AR",
            value: 2673400
        },
        {
            id: "US-CA",
            value: 33871648
        },
        {
            id: "US-CO",
            value: 4301261
        },
        {
            id: "US-CT",
            value: 3405565
        },
        {
            id: "US-DE",
            value: 783600
        },
        {
            id: "US-FL",
            value: 15982378
        },
        {
            id: "US-GA",
            value: 8186453
        },
        {
            id: "US-HI",
            value: 1211537
        },
        {
            id: "US-ID",
            value: 1293953
        },
        {
            id: "US-IL",
            value: 12419293
        },
        {
            id: "US-IN",
            value: 6080485
        },
        {
            id: "US-IA",
            value: 2926324
        },
        {
            id: "US-KS",
            value: 2688418
        },
        {
            id: "US-KY",
            value: 4041769
        },
        {
            id: "US-LA",
            value: 4468976
        },
        {
            id: "US-ME",
            value: 1274923
        },
        {
            id: "US-MD",
            value: 5296486
        },
        {
            id: "US-MA",
            value: 6349097
        },
        {
            id: "US-MI",
            value: 9938444
        },
        {
            id: "US-MN",
            value: 4919479
        },
        {
            id: "US-MS",
            value: 2844658
        },
        {
            id: "US-MO",
            value: 5595211
        },
        {
            id: "US-MT",
            value: 902195
        },
        {
            id: "US-NE",
            value: 1711263
        },
        {
            id: "US-NV",
            value: 1998257
        },
        {
            id: "US-NH",
            value: 1235786
        },
        {
            id: "US-NJ",
            value: 8414350
        },
        {
            id: "US-NM",
            value: 1819046
        },
        {
            id: "US-NY",
            value: 18976457
        },
        {
            id: "US-NC",
            value: 8049313
        },
        {
            id: "US-ND",
            value: 642200
        },
        {
            id: "US-OH",
            value: 11353140
        },
        {
            id: "US-OK",
            value: 3450654
        },
        {
            id: "US-OR",
            value: 3421399
        },
        {
            id: "US-PA",
            value: 12281054
        },
        {
            id: "US-RI",
            value: 1048319
        },
        {
            id: "US-SC",
            value: 4012012
        },
        {
            id: "US-SD",
            value: 754844
        },
        {
            id: "US-TN",
            value: 5689283
        },
        {
            id: "US-TX",
            value: 20851820
        },
        {
            id: "US-UT",
            value: 2233169
        },
        {
            id: "US-VT",
            value: 608827
        },
        {
            id: "US-VA",
            value: 7078515
        },
        {
            id: "US-WA",
            value: 5894121
        },
        {
            id: "US-WV",
            value: 1808344
        },
        {
            id: "US-WI",
            value: 5363675
        },
        {
            id: "US-WY",
            value: 493782
        }
        ];

        let heatLegend = chart.createChild(am4maps.HeatLegend);
        heatLegend.series = polygonSeries;
        heatLegend.align = "right";
        heatLegend.valign = "bottom";
        heatLegend.height = am4core.percent(80);
        heatLegend.orientation = "vertical";
        heatLegend.valign = "middle";
        heatLegend.marginRight = am4core.percent(4);
        heatLegend.valueAxis.renderer.opposite = true;
        heatLegend.valueAxis.renderer.dx = - 25;
        heatLegend.valueAxis.strictMinMax = false;
        heatLegend.valueAxis.fontSize = 9;
        heatLegend.valueAxis.logarithmic = true;

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