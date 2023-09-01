
$("#menu_bar_voyage").click(function(e){
  var target_element = e.target.innerText;
  var data_teu = df_to_javascript_teu[0][target_element]
  var data_ton = df_to_javascript_ton[0][target_element]

  var actual_voyage = document.getElementById('voyage_management_title');
  actual_voyage.innerHTML = `Voyage ${target_element} Follow-Up`;
  


  var div_teu_plot = document.getElementById('bar_chart_teu');
  div_teu_plot.remove()
  var div_ton_plot = document.getElementById('bar_chart_ton');
  div_ton_plot.remove()

  var element_bar_chart_teu = document.createElement("div");
  element_bar_chart_teu.setAttribute("id","bar_chart_teu" );

  var element_bar_chart_ton = document.createElement("div");
  element_bar_chart_ton.setAttribute("id","bar_chart_ton" );


  document.getElementById('teu_content_widget').appendChild(element_bar_chart_teu);
  document.getElementById('ton_content_widget').appendChild(element_bar_chart_ton);

 

  am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("bar_chart_teu");
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout
      })
    );
    
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal"
      })
    );
    
    var data = data_teu;
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "day_current",
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    
    xAxis.data.setAll(data);
    
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );
    
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    
    var series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Bookado Teus",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "bookado_teus",
        categoryXField: "day_current",
        tooltip:am5.Tooltip.new(root, {
          pointerOrientation:"horizontal",
          labelText:"{name} in {categoryX}: {valueY} {info}"
        })
      })
    );
    
    series1.columns.template.setAll({
      tooltipY: am5.percent(10),
      templateField: "columnSettings"
    });
    
    series1.data.setAll(data);
    
    var series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Hist: Bookado Teus",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "bookado_teus_historic",
        categoryXField: "day_current",
        tooltip:am5.Tooltip.new(root, {
          pointerOrientation:"horizontal",
          labelText:"{name} in {categoryX}: {valueY} {info}"
        })    
      })
    );
    
    series2.strokes.template.setAll({
      strokeWidth: 3,
      templateField: "strokeSettings"
    });
    
    
    series2.data.setAll(data);
    
    series2.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          strokeWidth: 3,
          stroke: series2.get("stroke"),
          radius: 5,
          fill: root.interfaceColors.get("background")
        })
      });
    });
    
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );
    legend.data.setAll(chart.series.values);
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    series1.appear();
    
    });
    am5.ready(function() {

      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      var root = am5.Root.new("bar_chart_ton");
      
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);
      
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
          layout: root.verticalLayout
        })
      );
      
      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set(
        "scrollbarX",
        am5.Scrollbar.new(root, {
          orientation: "horizontal"
        })
      );
      
      var data = data_ton;
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "day_current",
          renderer: am5xy.AxisRendererX.new(root, {}),
          tooltip: am5.Tooltip.new(root, {})
        })
      );
      
      xAxis.data.setAll(data);
      
      var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          min: 0,
          extraMax: 0.1,
          renderer: am5xy.AxisRendererY.new(root, {})
        })
      );
      
      
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      
      var series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Bookado Tons",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "bookado_tons",
          categoryXField: "day_current",
          tooltip:am5.Tooltip.new(root, {
            pointerOrientation:"horizontal",
            labelText:"{name} in {categoryX}: {valueY} {info}"
          })
        })
      );
      
      series1.columns.template.setAll({
        tooltipY: am5.percent(10),
        templateField: "columnSettings"
      });
      
      series1.data.setAll(data);
      
      var series2 = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Hist: Bookado Tons",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "bookado_tons_historic",
          categoryXField: "day_current",
          tooltip:am5.Tooltip.new(root, {
            pointerOrientation:"horizontal",
            labelText:"{name} in {categoryX}: {valueY} {info}"
          })    
        })
      );
      
      series2.strokes.template.setAll({
        strokeWidth: 3,
        templateField: "strokeSettings"
      });
      
      
      series2.data.setAll(data);
      
      series2.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            strokeWidth: 3,
            stroke: series2.get("stroke"),
            radius: 5,
            fill: root.interfaceColors.get("background")
          })
        });
      });
      
      chart.set("cursor", am5xy.XYCursor.new(root, {}));
      
      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50
        })
      );
      legend.data.setAll(chart.series.values);
      
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
      series1.appear();
      
      });
}
)
$("#menu_dropdown_voyage").click(function(e) {
  //script para pegar o texto do li clicado pelo usuário
  var target_element = e.target.innerText;
  //pegar o conteudo do dataframe tratado no python para aquele li (voyage)
  var element_number_list = df_to_plot_voyages[0][target_element]
  //splitar os ratios separados por virgula e transforma-los em numeros
  var list_of_ratios = element_number_list.split(',')
  var list_of_ratios = list_of_ratios.map(Number);

  //apagar a div atualmente existente para o gráfico de TEU e TON
  var div_teu_plot = document.getElementById('gauge_above');
  div_teu_plot.remove()
  var div_ton_plot = document.getElementById('gauge_below');
  div_ton_plot.remove()

  //criacao de um novo elemento, setando id a ele e appendando na div principal
  var element_gauge_above = document.createElement("div");
  element_gauge_above.setAttribute("id","gauge_above" );

  var element_gauge_below = document.createElement("div");
  element_gauge_below.setAttribute("id","gauge_below" );

  document.getElementById('teu_content_widget').appendChild(element_gauge_above);
  document.getElementById('ton_content_widget').appendChild(element_gauge_below);

 //filtrando pra caso o filto passe de 100, ele setar o valor maior do medidor como o valor
  if (list_of_ratios[0]>100) {
    var max_ratio_teu = list_of_ratios[0]

  } else{
    var max_ratio_teu = 115
  }
  if (list_of_ratios[1]>100) {
    var max_ratio_ton = list_of_ratios[1]

  } else{
    var max_ratio_ton = 115
  }
  //inputar no html da div que mostra qual voyage esta aparecendo no medidor
  var actual_voyage = document.getElementById('actual_voyage');
  actual_voyage.innerHTML = target_element;

  
  //javascript para criacao do grafico
  am5.ready(function() {
    var root = am5.Root.new("gauge_above");
    
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    var chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      startAngle: 180,
      endAngle: 360
    }));
    
    
    // Create axis and its renderer
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
    var axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -40
    });
    
    axisRenderer.grid.template.setAll({
      stroke: root.interfaceColors.get("background"),
      visible: true,
      strokeOpacity: 0.8
    });
    
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      max: max_ratio_teu,
      strictMinMax: true,
      renderer: axisRenderer
    }));
    
    
    // Add clock hand
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
    var axisDataItem = xAxis.makeDataItem({});
    
    var clockHand = am5radar.ClockHand.new(root, {
      pinRadius: am5.percent(20),
      radius: am5.percent(100),
      bottomWidth: 20
    })
    
    var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: clockHand
    }));
    
    xAxis.createAxisRange(axisDataItem);
    
    var label = chart.radarContainer.children.push(am5.Label.new(root, {
      fill: am5.color(0xffffff),
      centerX: am5.percent(50),
      textAlign: "center",
      centerY: am5.percent(50),
      fontSize: "1.5em"
    }));
    
    axisDataItem.set("value", 0);
    bullet.get("sprite").on("rotation", function () {
      var value = axisDataItem.get("value");
      var text = Math.round(axisDataItem.get("value")).toString();
      var fill = am5.color(0x000000);
      xAxis.axisRanges.each(function (axisRange) {
        if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
          fill = axisRange.get("axisFill").get("fill");
        }
      })
    
      label.set("text", Math.round(value).toString());
    
      clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
      clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
    });
    setInterval(function () {
        axisDataItem.animate({
          key: "value",
          to: list_of_ratios[0],
          duration: 1300,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }, 1500)
    
    
    chart.bulletsContainer.set("mask", undefined);
    
    
    // Create axis ranges bands
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
    var bandsData = [ {
      title: "Baixa",
      color: "#c0c0c0",
      lowScore: 0,
      highScore: 33
    }, {
      title: "Média",
      color: "#3b3f5c",
      lowScore: 33,
      highScore: 66
    }, {
      title: "Alta",
      color: "#0251D3",
      lowScore: 66,
      highScore: 100
    }, {
      title: "Cap. Acima",
      color: "#000",
      lowScore: 100,
      highScore: max_ratio_teu
    }];
    
    am5.array.each(bandsData, function (data) {
      var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));
    
      axisRange.setAll({
        value: data.lowScore,
        endValue: data.highScore
      });
    
      axisRange.get("axisFill").setAll({
        visible: true,
        fill: am5.color(data.color),
        fillOpacity: 0.8
      });
    
      axisRange.get("label").setAll({
        text: data.title,
        inside: true,
        radius: 15,
        fontSize: "0.78em",
        fill: root.interfaceColors.get("background")
      });
    });
    
    
    // Make stuff animate on load
    chart.appear(1000, 100);
    });
  am5.ready(function() {
    var root = am5.Root.new("gauge_below");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    var chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      startAngle: 180,
      endAngle: 360
    }));
    
    
    // Create axis and its renderer
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
    var axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -40
    });
    
    axisRenderer.grid.template.setAll({
      stroke: root.interfaceColors.get("background"),
      visible: true,
      strokeOpacity: 0.8
    });
    
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      max: max_ratio_ton,
      strictMinMax: true,
      renderer: axisRenderer
    }));
    
    
    // Add clock hand
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
    var axisDataItem = xAxis.makeDataItem({});
    
    var clockHand = am5radar.ClockHand.new(root, {
      pinRadius: am5.percent(20),
      radius: am5.percent(100),
      bottomWidth: 20
    })
    
    var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: clockHand
    }));
    
    xAxis.createAxisRange(axisDataItem);
    
    var label = chart.radarContainer.children.push(am5.Label.new(root, {
      fill: am5.color(0xffffff),
      centerX: am5.percent(50),
      textAlign: "center",
      centerY: am5.percent(50),
      fontSize: "1.5em"
    }));
    
    axisDataItem.set("value", 0);
    bullet.get("sprite").on("rotation", function () {
      var value = axisDataItem.get("value");
      var text = Math.round(axisDataItem.get("value")).toString();
      var fill = am5.color(0x000000);
      xAxis.axisRanges.each(function (axisRange) {
        if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
          fill = axisRange.get("axisFill").get("fill");
        }
      })
    
      label.set("text", Math.round(value).toString());
    
      clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
      clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
    });
    setInterval(function () {
        axisDataItem.animate({
          key: "value",
          to: list_of_ratios[1],
          duration: 1300,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }, 1500)
    
    
    chart.bulletsContainer.set("mask", undefined);
    
    
    // Create axis ranges bands
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
    var bandsData = [ {
      title: "Baixa",
      color: "#c0c0c0",
      lowScore: 0,
      highScore: 66
    }, {
      title: "Média",
      color: "#3b3f5c",
      lowScore: 33,
      highScore: 66
    }, {
      title: "Alta",
      color: "#0251D3",
      lowScore: 66,
      highScore: 100
    }, {
      title: "Cap. Acima",
      color: "#000",
      lowScore: 100,
      highScore: max_ratio_ton
    }];
    
    am5.array.each(bandsData, function (data) {
      var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));
    
      axisRange.setAll({
        value: data.lowScore,
        endValue: data.highScore
      });
    
      axisRange.get("axisFill").setAll({
        visible: true,
        fill: am5.color(data.color),
        fillOpacity: 0.8
      });
    
      axisRange.get("label").setAll({
        text: data.title,
        inside: true,
        radius: 15,
        fontSize: "0.78em",
        fill: root.interfaceColors.get("background")
      });
    });
    
    
    // Make stuff animate on load
    chart.appear(1000, 100);
    });



 });

function showPlotLast3Weeks(){
                    
  Swal.fire({
title: '<strong style="color:#0251D3;">POL Historic</strong>',
confirmButtonColor: '#0251D3',
icon: 'info',
html:`<div class="notification-container">
<h3>Histórico dos POLs nas últimas 3 semanas
<i class="material-icons dp48 right"></i>
</h3>
<h5>O Gráfico apresenta o embarcado final de cada um dos POLs nas últimas 3 vezes em que tiveram algum booking entregue, junto com informação do nome da Voyage.
</h5>
<p>
</p>
</div>`,
showCloseButton: true,
showCancelButton: false,
focusConfirm: false,
confirmButtonText:
'OK',

})
}

function showPlotPerEQSize(){
                    
  Swal.fire({
title: '<strong  style="color:#0251D3;">POL EQ Size</strong>',
confirmButtonColor: '#0251D3',
icon: 'info',
html:`<div class="notification-container">
<h3>Divisão dos POLs por eq size
<i class="material-icons dp48 right"></i>
</h3>
<h5>Gráfico de barras para cada pol dividido por Eq Size.
</h5>
<p>
</p>
</div>`,
showCloseButton: true,
showCancelButton: false,
focusConfirm: false,
confirmButtonText:
'OK',

})
}

function showTable(id) {
var elemento_status = document.getElementById(id).style.display
function wait(ms){
var start = new Date().getTime();
var end = start;
while(end < start + ms) {
end = new Date().getTime();
}
}
if (elemento_status=='none'){
document.getElementById(id).style.display = "block";
document.getElementById(id).style.webkitAnimation = "fade-in 4s 1";


}
else{
document.getElementById(id).style.webkitAnimation = "fade-out 2s 1";

setTimeout(() => {
    document.getElementById(id).style.display = "none";
    
}, 1800);
}


}


//graficos da pagina painel POL

    //grafico de sentimento com probabilidade media da pagina
    

    //grafico interativo e combinado de barra e donut



if (templateUsed=='daily_probability'){


    am5.ready(function() {

        // Set up data
    var data = df_to_graph_interactive;

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("interactive_combinated_chart");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Create wrapper container
    var container = root.container.children.push(am5.Container.new(root, {
        width: am5.p100,
        height: am5.p100,
        layout: root.horizontalLayout
    }));


    // ==============================================
    // Column chart
    // ==============================================

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var columnChart = container.children.push(am5xy.XYChart.new(root, {
        width: am5.p50,
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout
    }));

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var yAxis = columnChart.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {})
    }));

    //xAxis.data.setAll(data);

    var xAxis = columnChart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {})
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var columnSeries = columnChart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "value",
        categoryYField: "category"
    }));

    columnSeries.columns.template.setAll({
        tooltipText: "{categoryY}: {valueX}"
    });

    //series.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    columnChart.appear(1000, 100);


    // ==============================================
    // Column chart
    // ==============================================

    var pieChart = container.children.push( 
        am5percent.PieChart.new(root, {
        width: am5.p50,
        innerRadius: am5.percent(50)
        }) 
    );

    // Create series
    var pieSeries = pieChart.series.push(
        am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
        })
    );

    pieSeries.slices.template.setAll({
        templateField: "sliceSettings",
        strokeOpacity: 0
    });

    var currentSlice;
    pieSeries.slices.template.on("active", function(active, slice) {
        if (currentSlice && currentSlice != slice && active) {
        
        currentSlice.set("active", false)
        }
        
        var color = slice.get("fill");

        label1.setAll({
        fill: color,
        text: root.numberFormatter.format(slice.dataItem.get("valuePercentTotal"), "#.'%'")
        });
        
        label2.set("text", slice.dataItem.get("category"));
        
        columnSeries.columns.template.setAll({
        fill: slice.get("fill"),
        stroke: slice.get("fill")
        });
        
        columnSeries.data.setAll(slice.dataItem.dataContext.breakdown);
        yAxis.data.setAll(slice.dataItem.dataContext.breakdown);
        
        currentSlice = slice;
    });

    pieSeries.labels.template.set("forceHidden", true);
    pieSeries.ticks.template.set("forceHidden", true);

    pieSeries.data.setAll(data);

    // Add label
    var label1 = pieChart.seriesContainer.children.push(am5.Label.new(root, {
        text: "",
        fontSize: 35,
        fontweight: "bold",
        centerX: am5.p50,
        centerY: am5.p50
    }));

    var label2 = pieChart.seriesContainer.children.push(am5.Label.new(root, {
        text: "",
        fontSize: 12,
        centerX: am5.p50,
        centerY: am5.p50,
        dy: 30
    }));

    // Pre-select first slice
    pieSeries.events.on("datavalidated", function() {
        pieSeries.slices.getIndex(0).set("active", true);
    });

    
        
        });
    
    am5.ready(function() {    
        var root = am5.Root.new("chart_widget_2");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  layout: root.verticalLayout
}));

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

var data = df_to_clustered_bar;


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "ddl_number",
  renderer: am5xy.AxisRendererX.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function makeSeries(name, fieldName) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    stacked: true,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: fieldName,
    categoryXField: "ddl_number"
  }));

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}: {valueY}",
    tooltipY: am5.percent(10)
  });
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  legend.data.push(series);
}
makeSeries("Prob Predict (0%-40%)", "Prob Predict (0%-40%)");
makeSeries("Prob Predict (40%-70%)", "Prob Predict (40%-70%)");
makeSeries("Prob Predict (70%-100%)", "Prob Predict (70%-100%)");


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);

});
am5.ready(function() {
  var options55 = {
      series: [{
          name: "Prob. Média",
          data: df_score_modal
      }],
      chart: {
          height: 280,
          type: "bar",
          toolbar: {
              show: false,
          }
      },
      plotOptions: {
          bar: {
              horizontal: false,
              columnWidth: "38%",
              startingShape: "rounded",
              endingShape: "rounded",
              colors: {
                  backgroundBarColors: ["#e5edef"],
                  backgroundBarOpacity: 1,
                  backgroundBarRadius: 9
              }
          },
      },
      stroke: {
          show: false,
      },
      dataLabels: {
          enabled: false
      },
      fill: {
          opacity: 1
      },
      xaxis: {
          // type: "datetime",
          axisBorder: {
              show: false
          },
          labels: {
              show: true,
          },
          axisTicks: {
              show: false,
          },
      },
      yaxis: {
          labels: {
              show: true,
          }
      },
      colors: ['#0251D3']
      };
      var chart55 = new ApexCharts(document.querySelector("#pol_score_table"), options55);
      chart55.render();
  
  });
  am5.ready(function() {

    function arrayFiltering(value){
      return (value.x!='VAZIO') ;
    };
  
    var df_tabela = df_tabela_modal.filter(arrayFiltering);
    
    for (i = 0; i < df_tabela.length; i++) {
      if ((df_tabela[i].x=='PA/PA')||(df_tabela[i].x=='PA/PO')) {
        df_tabela[i].fillColor='#007bff'
      } else if (df_tabela[i].x=='FEEDER'){
        df_tabela[i].fillColor='#0251D3'
      } else{
        df_tabela[i].fillColor='#c0c0c0'
      }
  
  
    };
    var options55 = {
        series: [{
            name: "Prob. Média",
            data: df_tabela,
        }],
        chart: {
            height: 280,
            type: "bar",
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                columnWidth: "38%",
                startingShape: "rounded",
                endingShape: "rounded",
                colors: {
                    backgroundBarColors: ["#e5edef"],
                    backgroundBarOpacity: 1,
                    backgroundBarRadius: 9
                }
            },
        },
        stroke: {
            show: false,
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1
        },
        xaxis: {
            // type: "datetime",
            axisBorder: {
                show: true
            },
            labels: {
                show: true,
            },
            axisTicks: {
                show: true,
            },
        },
        yaxis: {
            labels: {
                show: true,
            }
        },
        colors: ['#fff']
        };
        
        var chart55 = new ApexCharts(document.querySelector("#modal_score_table"), options55);
       
        chart55.render();
    
    });


am5.ready(function() {
  
      
  var root = am5.Root.new("about_even_chart");
  
  
  root.setThemes([
      am5themes_Animated.new(root)
  ]);
  
  
  var chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      innerRadius: am5.percent(20),
      startAngle: -90,
      endAngle: 180
  }));
  
  
  // Data
  var data = solid_gauge_data_about_even;
  for (var x in data){
      data[x].columnSettings = {
  fill: chart.get("colors").getIndex(data.length-x)
  } ;
  };
  
  
  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
  var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
      behavior: "zoomX"
  }));
  
  cursor.lineY.set("visible", false);
  
  // Create axes and their renderers
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
  var xRenderer = am5radar.AxisRendererCircular.new(root, {
      //minGridDistance: 50
  });
  
  xRenderer.labels.template.setAll({
      radius: 10
  });
  
  xRenderer.grid.template.setAll({
      forceHidden: true
  });
  
  var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: xRenderer,
      min: 0,
      max: 100,
      strictMinMax: true,
      numberFormat: "#'%'",
      tooltip: am5.Tooltip.new(root, {})
  }));
  
  
  var yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 2
  });
  
  yRenderer.labels.template.setAll({
      centerX: am5.p100,
      fontWeight: "500",
      fontSize: 18,
      templateField: "columnSettings"
  });
  
  yRenderer.grid.template.setAll({
      forceHidden: true
  });
  
  var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: yRenderer
  }));
  
  yAxis.data.setAll(data);
  
  
  // Create series
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
  var series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "full",
      categoryYField: "category",
      fill: root.interfaceColors.get("alternativeBackground")
  }));
  
  series1.columns.template.setAll({
      width: am5.p100,
      fillOpacity: 0.08,
      strokeOpacity: 0,
      cornerRadius: 20
  });
  
  series1.data.setAll(data);
  
  
  var series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "value",
      categoryYField: "category"
  }));
  
  series2.columns.template.setAll({
      width: am5.p100,
      strokeOpacity: 0,
      tooltipText: "{category}: {valueX}%",
      cornerRadius: 20,
      templateField: "columnSettings"
  });
  
  series2.data.setAll(data);
  
  // Animate chart and series in
  // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
  series1.appear(1000);
  series2.appear(1000);
  chart.appear(1000, 100);
  
  }); 
am5.ready(function() {

    
  var root = am5.Root.new("better_than_even_chart");
  
  
  root.setThemes([
      am5themes_Animated.new(root)
  ]);
  
  
  var chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      innerRadius: am5.percent(20),
      startAngle: -90,
      endAngle: 180
  }));
  
  
  // Data
  var data = solid_gauge_data_better_than_even;
  for (var x in data){
      data[x].columnSettings = {
  fill: chart.get("colors").getIndex(data.length-x)
  } ;
  };
  
  
  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
  var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
      behavior: "zoomX"
  }));
  
  cursor.lineY.set("visible", false);
  
  // Create axes and their renderers
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
  var xRenderer = am5radar.AxisRendererCircular.new(root, {
      //minGridDistance: 50
  });
  
  xRenderer.labels.template.setAll({
      radius: 10
  });
  
  xRenderer.grid.template.setAll({
      forceHidden: true
  });
  
  var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: xRenderer,
      min: 0,
      max: 100,
      strictMinMax: true,
      numberFormat: "#'%'",
      tooltip: am5.Tooltip.new(root, {})
  }));
  
  
  var yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 2
  });
  
  yRenderer.labels.template.setAll({
      centerX: am5.p100,
      fontWeight: "500",
      fontSize: 18,
      templateField: "columnSettings"
  });
  
  yRenderer.grid.template.setAll({
      forceHidden: true
  });
  
  var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: yRenderer
  }));
  
  yAxis.data.setAll(data);
  
  
  // Create series
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
  var series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "full",
      categoryYField: "category",
      fill: root.interfaceColors.get("alternativeBackground")
  }));
  
  series1.columns.template.setAll({
      width: am5.p100,
      fillOpacity: 0.08,
      strokeOpacity: 0,
      cornerRadius: 20
  });
  
  series1.data.setAll(data);
  
  
  var series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "value",
      categoryYField: "category"
  }));
  
  series2.columns.template.setAll({
      width: am5.p100,
      strokeOpacity: 0,
      tooltipText: "{category}: {valueX}%",
      cornerRadius: 20,
      templateField: "columnSettings"
  });
  
  series2.data.setAll(data);
  
  // Animate chart and series in
  // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
  series1.appear(1000);
  series2.appear(1000);
  chart.appear(1000, 100);
  
  }); 
am5.ready(function() {

  
  var root = am5.Root.new("almost_certainly_chart");
  
  
  root.setThemes([
      am5themes_Animated.new(root)
  ]);
  
  
  var chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      innerRadius: am5.percent(20),
      startAngle: -90,
      endAngle: 180
  }));
  
  
  // Data
  var data = solid_gauge_data_almost_certainly;
  for (var x in data){
      data[x].columnSettings = {
  fill: chart.get("colors").getIndex(data.length-x)
  } ;
  };
  
  
  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
  var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
      behavior: "zoomX"
  }));
  
  cursor.lineY.set("visible", false);
  
  // Create axes and their renderers
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
  var xRenderer = am5radar.AxisRendererCircular.new(root, {
      //minGridDistance: 50
  });
  
  xRenderer.labels.template.setAll({
      radius: 10
  });
  
  xRenderer.grid.template.setAll({
      forceHidden: true
  });
  
  var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: xRenderer,
      min: 0,
      max: 100,
      strictMinMax: true,
      numberFormat: "#'%'",
      tooltip: am5.Tooltip.new(root, {})
  }));
  
  
  var yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 2
  });
  
  yRenderer.labels.template.setAll({
      centerX: am5.p100,
      fontWeight: "500",
      fontSize: 18,
      templateField: "columnSettings"
  });
  
  yRenderer.grid.template.setAll({
      forceHidden: true
  });
  
  var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: yRenderer
  }));
  
  yAxis.data.setAll(data);
  
  
  // Create series
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
  var series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "full",
      categoryYField: "category",
      fill: root.interfaceColors.get("alternativeBackground")
  }));
  
  series1.columns.template.setAll({
      width: am5.p100,
      fillOpacity: 0.08,
      strokeOpacity: 0,
      cornerRadius: 20
  });
  
  series1.data.setAll(data);
  
  
  var series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "value",
      categoryYField: "category"
  }));
  
  series2.columns.template.setAll({
      width: am5.p100,
      strokeOpacity: 0,
      tooltipText: "{category}: {valueX}%",
      cornerRadius: 20,
      templateField: "columnSettings"
  });
  
  series2.data.setAll(data);
  
  // Animate chart and series in
  // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
  series1.appear(1000);
  series2.appear(1000);
  chart.appear(1000, 100);
  
  }); 


} else if (templateUsed=='score_analysis'){
  

am5.ready(function() {
  var root = am5.Root.new("gauge_frequency_daily");
  
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/radar-chart/
  var chart = root.container.children.push(am5radar.RadarChart.new(root, {
    panX: false,
    panY: false,
    startAngle: 180,
    endAngle: 360
  }));
  
  
  // Create axis and its renderer
  // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
  var axisRenderer = am5radar.AxisRendererCircular.new(root, {
    innerRadius: -40
  });
  
  axisRenderer.grid.template.setAll({
    stroke: root.interfaceColors.get("background"),
    visible: true,
    strokeOpacity: 0.8
  });
  
  var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    max: 100,
    strictMinMax: true,
    renderer: axisRenderer
  }));
  
  
  // Add clock hand
  // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
  var axisDataItem = xAxis.makeDataItem({});
  
  var clockHand = am5radar.ClockHand.new(root, {
    pinRadius: am5.percent(20),
    radius: am5.percent(100),
    bottomWidth: 20
  })
  
  var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
    sprite: clockHand
  }));
  
  xAxis.createAxisRange(axisDataItem);
  
  var label = chart.radarContainer.children.push(am5.Label.new(root, {
    fill: am5.color(0xffffff),
    centerX: am5.percent(50),
    textAlign: "center",
    centerY: am5.percent(50),
    fontSize: "1.5em"
  }));
  
  axisDataItem.set("value", 0);
  bullet.get("sprite").on("rotation", function () {
    var value = axisDataItem.get("value");
    var text = Math.round(axisDataItem.get("value")).toString();
    var fill = am5.color(0x000000);
    xAxis.axisRanges.each(function (axisRange) {
      if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
        fill = axisRange.get("axisFill").get("fill");
      }
    })
  
    label.set("text", Math.round(value).toString());
  
    clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
    clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
  });
  setInterval(function () {
      axisDataItem.animate({
        key: "value",
        to: volume_score_medium,
        duration: 1300,
        easing: am5.ease.out(am5.ease.cubic)
      });
    }, 1500)
  
  
  chart.bulletsContainer.set("mask", undefined);
  
  
  // Create axis ranges bands
  // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
  var bandsData = [ {
    title: "Baixa",
    color: "#c0c0c0",
    lowScore: 0,
    highScore: 33
  }, {
    title: "Média",
    color: "#3b3f5c",
    lowScore: 33,
    highScore: 66
  }, {
    title: "Alta",
    color: "#0251D3",
    lowScore: 66,
    highScore: 100
  }];
  
  am5.array.each(bandsData, function (data) {
    var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));
  
    axisRange.setAll({
      value: data.lowScore,
      endValue: data.highScore
    });
  
    axisRange.get("axisFill").setAll({
      visible: true,
      fill: am5.color(data.color),
      fillOpacity: 0.8
    });
  
    axisRange.get("label").setAll({
      text: data.title,
      inside: true,
      radius: 15,
      fontSize: "0.78em",
      fill: root.interfaceColors.get("background")
    });
  });
  
  
  // Make stuff animate on load
  chart.appear(1000, 100);
});

am5.ready(function() {
    var root = am5.Root.new("gauge_performance_daily");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    var chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      startAngle: 180,
      endAngle: 360
    }));
    
    
    // Create axis and its renderer
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
    var axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -40
    });
    
    axisRenderer.grid.template.setAll({
      stroke: root.interfaceColors.get("background"),
      visible: true,
      strokeOpacity: 0.8
    });
    
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      max: 100,
      strictMinMax: true,
      renderer: axisRenderer
    }));
    
    
    // Add clock hand
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
    var axisDataItem = xAxis.makeDataItem({});
    
    var clockHand = am5radar.ClockHand.new(root, {
      pinRadius: am5.percent(20),
      radius: am5.percent(100),
      bottomWidth: 20
    })
    
    var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: clockHand
    }));
    
    xAxis.createAxisRange(axisDataItem);
    
    var label = chart.radarContainer.children.push(am5.Label.new(root, {
      fill: am5.color(0xffffff),
      centerX: am5.percent(50),
      textAlign: "center",
      centerY: am5.percent(50),
      fontSize: "1.5em"
    }));
    
    axisDataItem.set("value", 0);
    bullet.get("sprite").on("rotation", function () {
      var value = axisDataItem.get("value");
      var text = Math.round(axisDataItem.get("value")).toString();
      var fill = am5.color(0x000000);
      xAxis.axisRanges.each(function (axisRange) {
        if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
          fill = axisRange.get("axisFill").get("fill");
        }
      })
    
      label.set("text", Math.round(value).toString());
    
      clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
      clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
    });
    setInterval(function () {
        axisDataItem.animate({
          key: "value",
          to: mean_score_performance,
          duration: 1300,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }, 1500)
    
    
    chart.bulletsContainer.set("mask", undefined);
    
    
    // Create axis ranges bands
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
    var bandsData = [ {
      title: "Baixa",
      color: "#c0c0c0",
      lowScore: 0,
      highScore: 33
    }, {
      title: "Média",
      color: "#3b3f5c",
      lowScore: 33,
      highScore: 66
    }, {
      title: "Alta",
      color: "#0251D3",
      lowScore: 66,
      highScore: 100
    }];
    
    am5.array.each(bandsData, function (data) {
      var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));
    
      axisRange.setAll({
        value: data.lowScore,
        endValue: data.highScore
      });
    
      axisRange.get("axisFill").setAll({
        visible: true,
        fill: am5.color(data.color),
        fillOpacity: 0.8
      });
    
      axisRange.get("label").setAll({
        text: data.title,
        inside: true,
        radius: 15,
        fontSize: "0.78em",
        fill: root.interfaceColors.get("background")
      });
    });
    
    
    // Make stuff animate on load
    chart.appear(1000, 100);
});
am5.ready(function() {
    var root = am5.Root.new("gauge_rentability_daily");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    var chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      startAngle: 180,
      endAngle: 360
    }));
    
    
    // Create axis and its renderer
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
    var axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -40
    });
    
    axisRenderer.grid.template.setAll({
      stroke: root.interfaceColors.get("background"),
      visible: true,
      strokeOpacity: 0.8
    });
    
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      max: 100,
      strictMinMax: true,
      renderer: axisRenderer
    }));
    
    
    // Add clock hand
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
    var axisDataItem = xAxis.makeDataItem({});
    
    var clockHand = am5radar.ClockHand.new(root, {
      pinRadius: am5.percent(20),
      radius: am5.percent(100),
      bottomWidth: 20
    })
    
    var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: clockHand
    }));
    
    xAxis.createAxisRange(axisDataItem);
    
    var label = chart.radarContainer.children.push(am5.Label.new(root, {
      fill: am5.color(0xffffff),
      centerX: am5.percent(50),
      textAlign: "center",
      centerY: am5.percent(50),
      fontSize: "1.5em"
    }));
    
    axisDataItem.set("value", 0);
    bullet.get("sprite").on("rotation", function () {
      var value = axisDataItem.get("value");
      var text = Math.round(axisDataItem.get("value")).toString();
      var fill = am5.color(0x000000);
      xAxis.axisRanges.each(function (axisRange) {
        if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
          fill = axisRange.get("axisFill").get("fill");
        }
      })
    
      label.set("text", Math.round(value).toString());
    
      clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
      clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
    });
    setInterval(function () {
        axisDataItem.animate({
          key: "value",
          to: mean_score_rentabilidade,
          duration: 1300,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }, 1500)
    
    
    chart.bulletsContainer.set("mask", undefined);
    
    
    // Create axis ranges bands
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
    var bandsData = [ {
      title: "Baixa",
      color: "#c0c0c0",
      lowScore: 0,
      highScore: 33
    }, {
      title: "Média",
      color: "#3b3f5c",
      lowScore: 33,
      highScore: 66
    }, {
      title: "Alta",
      color: "#0251D3",
      lowScore: 66,
      highScore: 100
    }];
    
    am5.array.each(bandsData, function (data) {
      var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));
    
      axisRange.setAll({
        value: data.lowScore,
        endValue: data.highScore
      });
    
      axisRange.get("axisFill").setAll({
        visible: true,
        fill: am5.color(data.color),
        fillOpacity: 0.8
      });
    
      axisRange.get("label").setAll({
        text: data.title,
        inside: true,
        radius: 15,
        fontSize: "0.78em",
        fill: root.interfaceColors.get("background")
      });
    });
    
    
    // Make stuff animate on load
    chart.appear(1000, 100);
});



} else if (templateUsed=='daily_score'){
  am5.ready(function() {

    // Set up data
var data = df_to_graph_interactive;

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("interactive_combinated_chart");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
    am5themes_Animated.new(root)
]);

// Create wrapper container
var container = root.container.children.push(am5.Container.new(root, {
    width: am5.p100,
    height: am5.p100,
    layout: root.horizontalLayout
}));


// ==============================================
// Column chart
// ==============================================

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var columnChart = container.children.push(am5xy.XYChart.new(root, {
    width: am5.p50,
    panX: false,
    panY: false,
    wheelX: "none",
    wheelY: "none",
    layout: root.verticalLayout
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yAxis = columnChart.yAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererY.new(root, {})
}));

//xAxis.data.setAll(data);

var xAxis = columnChart.xAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var columnSeries = columnChart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "value",
    categoryYField: "category"
}));

columnSeries.columns.template.setAll({
    tooltipText: "{categoryY}: {valueX}"
});

//series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
columnChart.appear(1000, 100);


// ==============================================
// Column chart
// ==============================================

var pieChart = container.children.push( 
    am5percent.PieChart.new(root, {
    width: am5.p50,
    innerRadius: am5.percent(50)
    }) 
);

// Create series
var pieSeries = pieChart.series.push(
    am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category"
    })
);

pieSeries.slices.template.setAll({
    templateField: "sliceSettings",
    strokeOpacity: 0
});

var currentSlice;
pieSeries.slices.template.on("active", function(active, slice) {
    if (currentSlice && currentSlice != slice && active) {
    
    currentSlice.set("active", false)
    }
    
    var color = slice.get("fill");

    label1.setAll({
    fill: color,
    text: root.numberFormatter.format(slice.dataItem.get("valuePercentTotal"), "#.'%'")
    });
    
    label2.set("text", slice.dataItem.get("category"));
    
    columnSeries.columns.template.setAll({
    fill: slice.get("fill"),
    stroke: slice.get("fill")
    });
    
    columnSeries.data.setAll(slice.dataItem.dataContext.breakdown);
    yAxis.data.setAll(slice.dataItem.dataContext.breakdown);
    
    currentSlice = slice;
});

pieSeries.labels.template.set("forceHidden", true);
pieSeries.ticks.template.set("forceHidden", true);

pieSeries.data.setAll(data);

// Add label
var label1 = pieChart.seriesContainer.children.push(am5.Label.new(root, {
    text: "",
    fontSize: 35,
    fontweight: "bold",
    centerX: am5.p50,
    centerY: am5.p50
}));

var label2 = pieChart.seriesContainer.children.push(am5.Label.new(root, {
    text: "",
    fontSize: 12,
    centerX: am5.p50,
    centerY: am5.p50,
    dy: 30
}));

// Pre-select first slice
pieSeries.events.on("datavalidated", function() {
    pieSeries.slices.getIndex(0).set("active", true);
});


    
    });

am5.ready(function() {    
    var root = am5.Root.new("chart_widget_2");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
panX: false,
panY: false,
wheelX: "panX",
wheelY: "zoomX",
layout: root.verticalLayout
}));

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
orientation: "horizontal"
}));

var data = df_to_clustered_bar;


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
categoryField: "ddl_number",
renderer: am5xy.AxisRendererX.new(root, {}),
tooltip: am5.Tooltip.new(root, {})
}));

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
min: 0,
renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
centerX: am5.p50,
x: am5.p50
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function makeSeries(name, fieldName) {
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
name: name,
stacked: true,
xAxis: xAxis,
yAxis: yAxis,
valueYField: fieldName,
categoryXField: "ddl_number"
}));

series.columns.template.setAll({
tooltipText: "{name}, {categoryX}: {valueY}",
tooltipY: am5.percent(10)
});
series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();

series.bullets.push(function () {
return am5.Bullet.new(root, {
  sprite: am5.Label.new(root, {
    text: "{valueY}",
    fill: root.interfaceColors.get("alternativeText"),
    centerY: am5.p50,
    centerX: am5.p50,
    populateText: true
  })
});
});

legend.data.push(series);
}
makeSeries("Sem Score", "Sem Score");
makeSeries("Score (0-40)", "Score (0-40)");
makeSeries("Score (40-70)", "Score (40-70)");
makeSeries("Score (70-100)", "Score (70-100)");


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);

});
am5.ready(function() {
var options55 = {
  series: [{
      name: "Score Médio",
      data: df_score_modal
  }],
  chart: {
      height: 280,
      type: "bar",
      toolbar: {
          show: false,
      }
  },
  plotOptions: {
      bar: {
          horizontal: false,
          columnWidth: "38%",
          startingShape: "rounded",
          endingShape: "rounded",
          colors: {
              backgroundBarColors: ["#e5edef"],
              backgroundBarOpacity: 1,
              backgroundBarRadius: 9
          }
      },
  },
  stroke: {
      show: false,
  },
  dataLabels: {
      enabled: false
  },
  fill: {
      opacity: 1
  },
  xaxis: {
      // type: "datetime",
      axisBorder: {
          show: false
      },
      labels: {
          show: true,
      },
      axisTicks: {
          show: false,
      },
  },
  yaxis: {
      labels: {
          show: true,
      }
  },
  colors: ['#0251D3']
  };
  var chart55 = new ApexCharts(document.querySelector("#pol_score_table"), options55);
  chart55.render();

});
am5.ready(function() {

function arrayFiltering(value){
  return (value.x!='VAZIO') ;
};

var df_tabela = df_tabela_modal.filter(arrayFiltering);

for (i = 0; i < df_tabela.length; i++) {
  if ((df_tabela[i].x=='PA/PA')||(df_tabela[i].x=='PA/PO')) {
    df_tabela[i].fillColor='#007bff'
  } else if (df_tabela[i].x=='FEEDER'){
    df_tabela[i].fillColor='#0251D3'
  } else{
    df_tabela[i].fillColor='#c0c0c0'
  }


};
var options55 = {
    series: [{
        name: "Score Médio",
        data: df_tabela,
    }],
    chart: {
        height: 280,
        type: "bar",
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: true,
            columnWidth: "38%",
            startingShape: "rounded",
            endingShape: "rounded",
            colors: {
                backgroundBarColors: ["#e5edef"],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 9
            }
        },
    },
    stroke: {
        show: false,
    },
    dataLabels: {
        enabled: false
    },
    fill: {
        opacity: 1
    },
    xaxis: {
        // type: "datetime",
        axisBorder: {
            show: true
        },
        labels: {
            show: true,
        },
        axisTicks: {
            show: true,
        },
    },
    yaxis: {
        labels: {
            show: true,
        }
    },
    colors: ['#fff']
    };
    
    var chart55 = new ApexCharts(document.querySelector("#modal_score_table"), options55);
    chart55.render();

});


am5.ready(function() {

  
var root = am5.Root.new("about_even_chart");


root.setThemes([
  am5themes_Animated.new(root)
]);


var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  innerRadius: am5.percent(20),
  startAngle: -90,
  endAngle: 180
}));


// Data
var data = solid_gauge_data_about_even;
for (var x in data){
  data[x].columnSettings = {
fill: chart.get("colors").getIndex(data.length-x)
} ;
};


// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX"
}));

cursor.lineY.set("visible", false);

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  //minGridDistance: 50
});

xRenderer.labels.template.setAll({
  radius: 10
});

xRenderer.grid.template.setAll({
  forceHidden: true
});

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: xRenderer,
  min: 0,
  max: 100,
  strictMinMax: true,
  numberFormat: "#'%'",
  tooltip: am5.Tooltip.new(root, {})
}));


var yRenderer = am5radar.AxisRendererRadial.new(root, {
  minGridDistance: 2
});

yRenderer.labels.template.setAll({
  centerX: am5.p100,
  fontWeight: "500",
  fontSize: 18,
  templateField: "columnSettings"
});

yRenderer.grid.template.setAll({
  forceHidden: true
});

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: yRenderer
}));

yAxis.data.setAll(data);


// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
var series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  clustered: false,
  valueXField: "full",
  categoryYField: "category",
  fill: root.interfaceColors.get("alternativeBackground")
}));

series1.columns.template.setAll({
  width: am5.p100,
  fillOpacity: 0.08,
  strokeOpacity: 0,
  cornerRadius: 20
});

series1.data.setAll(data);


var series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  clustered: false,
  valueXField: "value",
  categoryYField: "category"
}));

series2.columns.template.setAll({
  width: am5.p100,
  strokeOpacity: 0,
  tooltipText: "{category}: {valueX}%",
  cornerRadius: 20,
  templateField: "columnSettings"
});

series2.data.setAll(data);

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
series1.appear(1000);
series2.appear(1000);
chart.appear(1000, 100);

}); 
am5.ready(function() {


var root = am5.Root.new("better_than_even_chart");


root.setThemes([
  am5themes_Animated.new(root)
]);


var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  innerRadius: am5.percent(20),
  startAngle: -90,
  endAngle: 180
}));


// Data
var data = solid_gauge_data_better_than_even;
for (var x in data){
  data[x].columnSettings = {
fill: chart.get("colors").getIndex(data.length-x)
} ;
};


// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX"
}));

cursor.lineY.set("visible", false);

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  //minGridDistance: 50
});

xRenderer.labels.template.setAll({
  radius: 10
});

xRenderer.grid.template.setAll({
  forceHidden: true
});

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: xRenderer,
  min: 0,
  max: 100,
  strictMinMax: true,
  numberFormat: "#'%'",
  tooltip: am5.Tooltip.new(root, {})
}));


var yRenderer = am5radar.AxisRendererRadial.new(root, {
  minGridDistance: 2
});

yRenderer.labels.template.setAll({
  centerX: am5.p100,
  fontWeight: "500",
  fontSize: 18,
  templateField: "columnSettings"
});

yRenderer.grid.template.setAll({
  forceHidden: true
});

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: yRenderer
}));

yAxis.data.setAll(data);


// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
var series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  clustered: false,
  valueXField: "full",
  categoryYField: "category",
  fill: root.interfaceColors.get("alternativeBackground")
}));

series1.columns.template.setAll({
  width: am5.p100,
  fillOpacity: 0.08,
  strokeOpacity: 0,
  cornerRadius: 20
});

series1.data.setAll(data);


var series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  clustered: false,
  valueXField: "value",
  categoryYField: "category"
}));

series2.columns.template.setAll({
  width: am5.p100,
  strokeOpacity: 0,
  tooltipText: "{category}: {valueX}%",
  cornerRadius: 20,
  templateField: "columnSettings"
});

series2.data.setAll(data);

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
series1.appear(1000);
series2.appear(1000);
chart.appear(1000, 100);

}); 
am5.ready(function() {


var root = am5.Root.new("almost_certainly_chart");


root.setThemes([
  am5themes_Animated.new(root)
]);


var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  innerRadius: am5.percent(20),
  startAngle: -90,
  endAngle: 180
}));


// Data
var data = solid_gauge_data_almost_certainly;
for (var x in data){
  data[x].columnSettings = {
fill: chart.get("colors").getIndex(data.length-x)
} ;
};


// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX"
}));

cursor.lineY.set("visible", false);

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  //minGridDistance: 50
});

xRenderer.labels.template.setAll({
  radius: 10
});

xRenderer.grid.template.setAll({
  forceHidden: true
});

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: xRenderer,
  min: 0,
  max: 100,
  strictMinMax: true,
  numberFormat: "#'%'",
  tooltip: am5.Tooltip.new(root, {})
}));


var yRenderer = am5radar.AxisRendererRadial.new(root, {
  minGridDistance: 2
});

yRenderer.labels.template.setAll({
  centerX: am5.p100,
  fontWeight: "500",
  fontSize: 18,
  templateField: "columnSettings"
});

yRenderer.grid.template.setAll({
  forceHidden: true
});

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: yRenderer
}));

yAxis.data.setAll(data);


// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
var series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  clustered: false,
  valueXField: "full",
  categoryYField: "category",
  fill: root.interfaceColors.get("alternativeBackground")
}));

series1.columns.template.setAll({
  width: am5.p100,
  fillOpacity: 0.08,
  strokeOpacity: 0,
  cornerRadius: 20
});

series1.data.setAll(data);


var series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  clustered: false,
  valueXField: "value",
  categoryYField: "category"
}));

series2.columns.template.setAll({
  width: am5.p100,
  strokeOpacity: 0,
  tooltipText: "{category}: {valueX}%",
  cornerRadius: 20,
  templateField: "columnSettings"
});

series2.data.setAll(data);

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
series1.appear(1000);
series2.appear(1000);
chart.appear(1000, 100);

}); 

} else if (templateUsed=='controle_embarque'){
 
  if (df_to_plot_voyages.length>0){
  var element_number_list = df_to_plot_voyages[0][voyages_capacity_list[0]]
  var list_of_ratios = element_number_list.split(',')
  var list_of_ratios = list_of_ratios.map(Number);


  var div_teu_plot = document.getElementById('gauge_above');
  div_teu_plot.remove()
  var div_ton_plot = document.getElementById('gauge_below');
  div_ton_plot.remove()

  var element_gauge_above = document.createElement("div");
  element_gauge_above.setAttribute("id","gauge_above" );

  var element_gauge_below = document.createElement("div");
  element_gauge_below.setAttribute("id","gauge_below" );


  document.getElementById('teu_content_widget').appendChild(element_gauge_above);
  document.getElementById('ton_content_widget').appendChild(element_gauge_below);

  if (list_of_ratios[0]>100) {
    var max_ratio_teu = list_of_ratios[0]

  } else{
    var max_ratio_teu = 115
  }
  if (list_of_ratios[1]>100) {
    var max_ratio_ton = list_of_ratios[1]

  } else{
    var max_ratio_ton = 115
  }
  var actual_voyage = document.getElementById('actual_voyage');
  actual_voyage.innerHTML = voyages_capacity_list[0];

  
  
  am5.ready(function() {
    var root = am5.Root.new("gauge_above");
    
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    var chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      startAngle: 180,
      endAngle: 360
    }));
    
    
    // Create axis and its renderer
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
    var axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -40
    });
    
    axisRenderer.grid.template.setAll({
      stroke: root.interfaceColors.get("background"),
      visible: true,
      strokeOpacity: 0.8
    });
    
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      max: max_ratio_teu,
      strictMinMax: true,
      renderer: axisRenderer
    }));
    
    
    // Add clock hand
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
    var axisDataItem = xAxis.makeDataItem({});
    
    var clockHand = am5radar.ClockHand.new(root, {
      pinRadius: am5.percent(20),
      radius: am5.percent(100),
      bottomWidth: 20
    })
    
    var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: clockHand
    }));
    
    xAxis.createAxisRange(axisDataItem);
    
    var label = chart.radarContainer.children.push(am5.Label.new(root, {
      fill: am5.color(0xffffff),
      centerX: am5.percent(50),
      textAlign: "center",
      centerY: am5.percent(50),
      fontSize: "1.5em"
    }));
    
    axisDataItem.set("value", 0);
    bullet.get("sprite").on("rotation", function () {
      var value = axisDataItem.get("value");
      var text = Math.round(axisDataItem.get("value")).toString();
      var fill = am5.color(0x000000);
      xAxis.axisRanges.each(function (axisRange) {
        if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
          fill = axisRange.get("axisFill").get("fill");
        }
      })
    
      label.set("text", Math.round(value).toString());
    
      clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
      clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
    });
    setInterval(function () {
        axisDataItem.animate({
          key: "value",
          to: list_of_ratios[0],
          duration: 1300,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }, 1500)
    
    
    chart.bulletsContainer.set("mask", undefined);
    
    
    // Create axis ranges bands
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
    var bandsData = [ {
      title: "Baixa",
      color: "#c0c0c0",
      lowScore: 0,
      highScore: 33
    }, {
      title: "Média",
      color: "#3b3f5c",
      lowScore: 33,
      highScore: 66
    }, {
      title: "Alta",
      color: "#0251D3",
      lowScore: 66,
      highScore: 100
    }, {
      title: "Cap. Acima",
      color: "#000",
      lowScore: 100,
      highScore: max_ratio_teu
    }];
    
    am5.array.each(bandsData, function (data) {
      var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));
    
      axisRange.setAll({
        value: data.lowScore,
        endValue: data.highScore
      });
    
      axisRange.get("axisFill").setAll({
        visible: true,
        fill: am5.color(data.color),
        fillOpacity: 0.8
      });
    
      axisRange.get("label").setAll({
        text: data.title,
        inside: true,
        radius: 15,
        fontSize: "0.78em",
        fill: root.interfaceColors.get("background")
      });
    });
    
    
    // Make stuff animate on load
    chart.appear(1000, 100);
    });
  am5.ready(function() {
    var root = am5.Root.new("gauge_below");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    var chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      startAngle: 180,
      endAngle: 360
    }));
    
    
    // Create axis and its renderer
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
    var axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -40
    });
    
    axisRenderer.grid.template.setAll({
      stroke: root.interfaceColors.get("background"),
      visible: true,
      strokeOpacity: 0.8
    });
    
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      max: max_ratio_ton,
      strictMinMax: true,
      renderer: axisRenderer
    }));
    
    
    // Add clock hand
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
    var axisDataItem = xAxis.makeDataItem({});
    
    var clockHand = am5radar.ClockHand.new(root, {
      pinRadius: am5.percent(20),
      radius: am5.percent(100),
      bottomWidth: 20
    })
    
    var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: clockHand
    }));
    
    xAxis.createAxisRange(axisDataItem);
    
    var label = chart.radarContainer.children.push(am5.Label.new(root, {
      fill: am5.color(0xffffff),
      centerX: am5.percent(50),
      textAlign: "center",
      centerY: am5.percent(50),
      fontSize: "1.5em"
    }));
    
    axisDataItem.set("value", 0);
    bullet.get("sprite").on("rotation", function () {
      var value = axisDataItem.get("value");
      var text = Math.round(axisDataItem.get("value")).toString();
      var fill = am5.color(0x000000);
      xAxis.axisRanges.each(function (axisRange) {
        if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
          fill = axisRange.get("axisFill").get("fill");
        }
      })
    
      label.set("text", Math.round(value).toString());
    
      clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
      clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
    });
    setInterval(function () {
        axisDataItem.animate({
          key: "value",
          to: list_of_ratios[1],
          duration: 1300,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }, 1500)
    
    
    chart.bulletsContainer.set("mask", undefined);
    
    
    // Create axis ranges bands
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
    var bandsData = [ {
      title: "Baixa",
      color: "#c0c0c0",
      lowScore: 0,
      highScore: 66
    }, {
      title: "Média",
      color: "#3b3f5c",
      lowScore: 33,
      highScore: 66
    }, {
      title: "Alta",
      color: "#0251D3",
      lowScore: 66,
      highScore: 100
    }, {
      title: "Cap. Acima",
      color: "#000",
      lowScore: 100,
      highScore: max_ratio_ton
    }];
    
    am5.array.each(bandsData, function (data) {
      var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));
    
      axisRange.setAll({
        value: data.lowScore,
        endValue: data.highScore
      });
    
      axisRange.get("axisFill").setAll({
        visible: true,
        fill: am5.color(data.color),
        fillOpacity: 0.8
      });
    
      axisRange.get("label").setAll({
        text: data.title,
        inside: true,
        radius: 15,
        fontSize: "0.78em",
        fill: root.interfaceColors.get("background")
      });
    });
    
    
    // Make stuff animate on load
    chart.appear(1000, 100);
    });
  
  }

  am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("historic_pol_voyage");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));
    
    
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );
    

    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
      }));



    var data = df_to_graph_pol_voyage;

    for (let index = 0; index < data.length; index++) {
      var actual_data = data[index];
      var keys_list_objects = Object.keys(actual_data)
      
      for (let i = 0; i < keys_list_objects.length; i++) {
        if (keys_list_objects[i]!='pol') {
          Object.defineProperty(data[index], keys_list_objects[i].split('|')[1],
          Object.getOwnPropertyDescriptor(data[index], keys_list_objects[i]));
          Object.defineProperty(data[index], 'voyage_'+ keys_list_objects[i].split('|')[1],{
            value: keys_list_objects[i].split('|')[0],
            writable: true,
            enumerable: true,
            configurable: true
          });
          delete data[index][keys_list_objects[i]];
          
        }
        
      }
      
      
    }
   
    
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "pol",
      renderer: am5xy.AxisRendererX.new(root, {
        cellStartLocation: 0.1,
        cellEndLocation: 0.9
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    xAxis.data.setAll(data);
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    
    
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
      // var attributes_list = name.split('|')
      // var voyage_cod = attributes_list[0]
      // var day_number = attributes_list[1]
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: fieldName,
        categoryXField: "pol"
      }));
      var string_to_tooltip = `Voyage: {name}\n{categoryX}: {valueY}\nVoyage: {voyage_${name}}`
      
      series.columns.template.setAll({
        tooltipText: string_to_tooltip,
        width: am5.percent(90),
        tooltipY: 0
      });
    
      series.data.setAll(data);
    
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();
    
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: 0,
            centerX: am5.p50,
            populateText: true
          })
        });
      });
    
      legend.data.push(series);
    }
    var list_weeks = [-1,-2,-3]
    for (i = 0; i < list_weeks.length; i++) {
      makeSeries(list_weeks[i], list_weeks[i]);
     
  
    };
    
    
  
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    
    });
    am5.ready(function() {

      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      var root = am5.Root.new("historic_pol_voyage_ton");
      
      
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);
      
      
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout
      }));
      
      
      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50
        })
      );
      
  
      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
        }));
  
  
  
      var data = df_to_graph_pol_voyage_ton;
  
      for (let index = 0; index < data.length; index++) {
        var actual_data = data[index];
        var keys_list_objects = Object.keys(actual_data)
        
        for (let i = 0; i < keys_list_objects.length; i++) {
          if (keys_list_objects[i]!='pol') {
            Object.defineProperty(data[index], keys_list_objects[i].split('|')[1],
            Object.getOwnPropertyDescriptor(data[index], keys_list_objects[i]));
            Object.defineProperty(data[index], 'voyage_'+ keys_list_objects[i].split('|')[1],{
              value: keys_list_objects[i].split('|')[0],
              writable: true,
              enumerable: true,
              configurable: true
            });
            delete data[index][keys_list_objects[i]];
            
          }
          
        }
        
        
      }
     
      
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "pol",
        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9
        }),
        tooltip: am5.Tooltip.new(root, {})
      }));
      
      xAxis.data.setAll(data);
      
      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));
  
      
      
      
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      function makeSeries(name, fieldName) {
        // var attributes_list = name.split('|')
        // var voyage_cod = attributes_list[0]
        // var day_number = attributes_list[1]
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "pol"
        }));
        var string_to_tooltip = `Voyage: {name}\n{categoryX}: {valueY}\nVoyage: {voyage_${name}}`
        
        series.columns.template.setAll({
          tooltipText: string_to_tooltip,
          width: am5.percent(90),
          tooltipY: 0
        });
      
        series.data.setAll(data);
      
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();
      
        series.bullets.push(function () {
          return am5.Bullet.new(root, {
            locationY: 0,
            sprite: am5.Label.new(root, {
              text: "{valueY}",
              fill: root.interfaceColors.get("alternativeText"),
              centerY: 0,
              centerX: am5.p50,
              populateText: true
            })
          });
        });
      
        legend.data.push(series);
      }
      var list_weeks = [-1,-2,-3]
      for (i = 0; i < list_weeks.length; i++) {
        makeSeries(list_weeks[i], list_weeks[i]);
       
    
      };
      
      
    
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
      
      });
    am5.ready(function() {    
      var root = am5.Root.new("chart_widget_2");
  
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
  am5themes_Animated.new(root)
  ]);
  
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  layout: root.verticalLayout
  }));
  
  // Add scrollbar
  // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
  chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
  }));
  
  var data = df_to_clustered_bar;
  
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "pol",
  renderer: am5xy.AxisRendererX.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
  }));
  
  xAxis.data.setAll(data);
  
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
  
  // Add legend
  // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
  var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50
  }));
  
  
  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  function makeSeries(name, fieldName) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: name,
  stacked: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: fieldName,
  categoryXField: "pol"
  }));
  
  series.columns.template.setAll({
  tooltipText: `Size: {name}\nPOL: {categoryX}\nBookado: {valueY} ([bold]{ratio_${name}}%[/])`,
  tooltipY: am5.percent(10)
  });
  series.data.setAll(data);
  
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();
  
  series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{valueY}",
      fill: root.interfaceColors.get("alternativeText"),
      centerY: am5.p50,
      centerX: am5.p50,
      populateText: true
    })
  });
  });
  
  legend.data.push(series);
  
  }
  
  for ( var i = 0; i<list_container_types.length; i++){
    var chave = list_container_types[i]
    var column_name = "counts_"+chave
    makeSeries(chave, column_name);
  }
  
  
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  chart.appear(1000, 100);
  
  });
  
} else if (templateUsed=='booking_evolution'){
  var data_teu = df_to_javascript_teu[0][list_voyages_active[0]]
  var data_ton = df_to_javascript_ton[0][list_voyages_active[0]]
 

  var div_teu_plot = document.getElementById('bar_chart_teu');
  div_teu_plot.remove()
  var div_ton_plot = document.getElementById('bar_chart_ton');
  div_ton_plot.remove()

  var element_bar_chart_teu = document.createElement("div");
  element_bar_chart_teu.setAttribute("id","bar_chart_teu" );

  var element_bar_chart_ton = document.createElement("div");
  element_bar_chart_ton.setAttribute("id","bar_chart_ton" );


  document.getElementById('teu_content_widget').appendChild(element_bar_chart_teu);
  document.getElementById('ton_content_widget').appendChild(element_bar_chart_ton);

 

  am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("bar_chart_teu");
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout
      })
    );
    
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal"
      })
    );
    
    var data = data_teu;
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "day_current",
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    
    xAxis.data.setAll(data);
    
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );
    
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    
    var series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Bookado Teus",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "bookado_teus",
        categoryXField: "day_current",
        tooltip:am5.Tooltip.new(root, {
          pointerOrientation:"horizontal",
          labelText:"{categoryX}\n{name}: {valueY}"
        })
      })
    );
    
    series1.columns.template.setAll({
      tooltipY: am5.percent(10),
      templateField: "columnSettings"
    });
    
    series1.data.setAll(data);

    var series3 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Predict Teus",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "predict_teus",
        categoryXField: "day_current",
        tooltip:am5.Tooltip.new(root, {
          pointerOrientation:"horizontal",
          labelText:"{categoryX}\n{name}: {valueY}"
        })
      })
    );
    
    series3.columns.template.setAll({
      tooltipY: am5.percent(10),
      templateField: "columnSettings"
    });
    
    series3.data.setAll(data);
    
    var series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Hist: Bookado Teus",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "bookado_teus_historic",
        categoryXField: "day_current",
        tooltip:am5.Tooltip.new(root, {
          pointerOrientation:"horizontal",
          labelText:"{categoryX}\n{name}: {valueY}"
        })    
      })
    );
    
    series2.strokes.template.setAll({
      strokeWidth: 3,
      templateField: "strokeSettings"
    });
    
    
    series2.data.setAll(data);
    
    series2.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          strokeWidth: 3,
          stroke: series2.get("stroke"),
          radius: 5,
          fill: root.interfaceColors.get("background")
        })
      });
    });
    var filteredData = data.filter(function(item) {
      return item.final_embarcado_teus > 0;
    });
    var series4 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Hist: Final Embarcado Teus",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "final_embarcado_teus",
        categoryXField: "day_current",
        tooltip:am5.Tooltip.new(root, {
          pointerOrientation:"horizontal",
          labelText:"{name}: {valueY}"
        })    
      })
    );
    
    series4.strokes.template.setAll({
      strokeWidth: 3,
      templateField: "strokeSettings"
    });
    
    
    series4.data.setAll(filteredData);
    
    series4.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          strokeWidth: 6,
          stroke: '#46295A',
          radius: 8,
          fill: '#46295A'
        })
      });
    });
    
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );
    legend.data.setAll(chart.series.values);
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    series1.appear();
    series3.appear();
    
    });
  am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("bar_chart_ton");
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout
      })
    );
    
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal"
      })
    );
    
    var data = data_ton;
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "day_current",
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    
    xAxis.data.setAll(data);
    
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );
    
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    
    var series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Bookado Tons",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "bookado_tons",
        categoryXField: "day_current",
        tooltip:am5.Tooltip.new(root, {
          pointerOrientation:"horizontal",
          labelText:"{categoryX}\n{name}: {valueY}"
        })
      })
    );
    
    series1.columns.template.setAll({
      tooltipY: am5.percent(10),
      templateField: "columnSettings"
    });
    
    series1.data.setAll(data);

    var series3 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Predict Tons",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "predict_tons",
        categoryXField: "day_current",
        tooltip:am5.Tooltip.new(root, {
          pointerOrientation:"horizontal",
          labelText:"{categoryX}\n{name}: {valueY}"
        })
      })
    );
    
    series3.columns.template.setAll({
      tooltipY: am5.percent(10),
      templateField: "columnSettings"
    });
    
    series3.data.setAll(data);
    
    var series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Hist: Bookado Tons",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "bookado_tons_historic",
        categoryXField: "day_current",
        tooltip:am5.Tooltip.new(root, {
          pointerOrientation:"horizontal",
          labelText:"{categoryX}\n{name}: {valueY}"
        })    
      })
    );
    
    series2.strokes.template.setAll({
      strokeWidth: 3,
      templateField: "strokeSettings"
    });
    
    
    series2.data.setAll(data);
    
    series2.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          strokeWidth: 3,
          stroke: series2.get("stroke"),
          radius: 5,
          fill: root.interfaceColors.get("background")
        })
      });
    });
    var filteredData = data.filter(function(item) {
      return item.final_embarcado_tons > 0;
    });
    var series4 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Hist: Final Embarcado Tons",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "final_embarcado_tons",
        categoryXField: "day_current",
        tooltip:am5.Tooltip.new(root, {
          pointerOrientation:"horizontal",
          labelText:"{name}: {valueY}"
        })    
      })
    );
    
    series4.strokes.template.setAll({
      strokeWidth: 3,
      templateField: "strokeSettings"
    });
    
    
    series4.data.setAll(filteredData);
    series4.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          strokeWidth: 6,
          stroke: "#46295A",
          radius: 8,
          fill: "#46295A"
        })
      });
    });
    
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );
    legend.data.setAll(chart.series.values);
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    series1.appear();
    series3.appear();
    
    });

} else if (templateUsed=='prontidao'){

  am5.ready(function() {


    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("low_prob_plot");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));
    
    
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    }))
    
    
    // Data
    var data = [{
      year: "",
      bookings: bookings_quantity_0_33,
      TEUs: teus_quantity_0_33
    }];
    
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "year",
      renderer: am5xy.AxisRendererY.new(root, {
        inversed: true,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9
      })
    }));
    
    yAxis.data.setAll(data);
    
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {
        strokeOpacity: 0.1
      }),
      min: 0
    }));
    
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function createSeries(field, name) {
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: field,
        categoryYField: "year",
        sequencedInterpolation: true,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "[bold]{name}[/]\n0%-50%: {valueX}"
        })
      }));
    
      series.columns.template.setAll({
        height: am5.p100,
        strokeOpacity: 0
      });
    
    
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerY: am5.p50,
            text: "{valueX}",
            populateText: true
          })
        });
      });
    
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerX: am5.p100,
            centerY: am5.p50,
            text: "{name}",
            fill: am5.color(0xffffff),
            populateText: true
          })
        });
      });
    
      series.data.setAll(data);
      series.appear();
    
      return series;
    }
    
    createSeries("TEUs", "TEUs");
    createSeries("bookings", "Bookings");
    
    
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    }));
    
    legend.data.setAll(chart.series.values);
    
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomY"
    }));
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("forceHidden", true);
    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    
    });

  am5.ready(function() {


    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("medium_prob_plot");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));
    
    
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    }))
    
    
    // Data
    var data = [{
      year: "",
      bookings: bookings_quantity_33_66,
      TEUs: teus_quantity_33_66
    }];
    
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "year",
      renderer: am5xy.AxisRendererY.new(root, {
        inversed: true,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9
      })
    }));
    
    yAxis.data.setAll(data);
    
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {
        strokeOpacity: 0.1
      }),
      min: 0
    }));
    
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function createSeries(field, name) {
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: field,
        categoryYField: "year",
        sequencedInterpolation: true,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "[bold]{name}[/]\n50%-80%: {valueX}"
        })
      }));
    
      series.columns.template.setAll({
        height: am5.p100,
        strokeOpacity: 0
      });
    
    
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerY: am5.p50,
            text: "{valueX}",
            populateText: true
          })
        });
      });
    
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerX: am5.p100,
            centerY: am5.p50,
            text: "{name}",
            fill: am5.color(0xffffff),
            populateText: true
          })
        });
      });
    
      series.data.setAll(data);
      series.appear();
    
      return series;
    }
    
    createSeries("TEUs", "TEUs");
    createSeries("bookings", "Bookings");
    
    
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    }));
    
    legend.data.setAll(chart.series.values);
    
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomY"
    }));
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("forceHidden", true);
    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    
    });

    am5.ready(function() {


      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      var root = am5.Root.new("high_prob_plot");
      
      
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);
      
      
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout
      }));
      
      
      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      }))
      
      
      // Data
      var data = [{
        year: "",
        bookings: bookings_quantity_66_100,
        TEUs: teus_quantity_66_100
      }];
      
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellStartLocation: 0.1,
          cellEndLocation: 0.9
        })
      }));
      
      yAxis.data.setAll(data);
      
      var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1
        }),
        min: 0
      }));
      
      
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      function createSeries(field, name) {
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: field,
          categoryYField: "year",
          sequencedInterpolation: true,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n80%-100%: {valueX}"
          })
        }));
      
        series.columns.template.setAll({
          height: am5.p100,
          strokeOpacity: 0
        });
      
      
        series.bullets.push(function() {
          return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              centerY: am5.p50,
              text: "{valueX}",
              populateText: true
            })
          });
        });
      
        series.bullets.push(function() {
          return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              centerX: am5.p100,
              centerY: am5.p50,
              text: "{name}",
              fill: am5.color(0xffffff),
              populateText: true
            })
          });
        });
      
        series.data.setAll(data);
        series.appear();
      
        return series;
      }
      
      createSeries("TEUs", "TEUs");
      createSeries("bookings", "Bookings");
      
      
      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      }));
      
      legend.data.setAll(chart.series.values);
      
      
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomY"
      }));
      cursor.lineY.set("forceHidden", true);
      cursor.lineX.set("forceHidden", true);
      
      
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
      
      });
}
