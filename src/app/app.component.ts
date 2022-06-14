import { Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { zoom } from 'd3';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'd3-withimage';
  @ViewChild('area')
  someInput!: ElementRef;

   img = "https://www.gravatar.com/avatar/904fd39461599f72d580fadf3a73115b?s=128&d=identicon&r=PG&f=1";

  constructor(){
    

    // this.line_chart( 'diameter',document.getElementById('area'));

  }
  ngAfterViewInit() {
    console.log(this.someInput.nativeElement);
    this.line_chart( 'diameter',this.someInput.nativeElement);
  }

  line_chart(field:any,el:any){ 
    var svg:any;
    var img = "https://www.gravatar.com/avatar/904fd39461599f72d580fadf3a73115b?s=128&d=identicon&r=PG&f=1";

var data = [{"item":1,"diameter":"15.00","img":img},{"item":2,"diameter":"10.00","img":img},
{"item":3,"diameter":"25.00","img":img},{"item":4,"diameter":"7.00","img":img},
{"item":5,"diameter":"35.00","img":img},{"item":6,"diameter":"15.00","img":img},
{"item":7,"diameter":"12.00","img":img},{"item":8,"diameter":"10.00","img":img},
{"item":9,"diameter":"17.00","img":img},{"item":10,"diameter":"13.00","img":img},
{"item":11,"diameter":"5.00","img":img},{"item":12,"diameter":"10.00","img":img},
];
    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 45
    },
    tickno = 10,
    
    width = 960 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom,
    x = d3.scaleLinear().domain([0, data.length]).range([0, width]),
    ymax = d3.max(data,function(d:any){
      return (parseInt(d[field])+1);
  }),
    ymin = d3.min(data,function(d:any){
      return d[field];
  }),
  
    xmax = d3.max(data,function(d:any){
      return d.name;
  }),
    y = d3.scaleLinear()
      .domain([ymin,ymax])
      .range([height, 0]);
  
  var line = d3.line()
      .x(function (d:any) {
      return x(d.item);
  })
      .y(function (d:any) {
      return y(d[field]);
  });
  
  d3.zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on("zoom", zoom);

  
  svg = d3.select(el)
      .append("svg:svg")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append("svg:g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);
  
  
  
  svg.append("svg:rect")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "plot")
      .attr("fill", "none")
  
  var make_x_axis = function () {
      return d3.axisBottom(x)
          .ticks(tickno)

          
  };
  
  var make_y_axis = function () {
      return d3.axisLeft(y)
          .ticks(tickno);
  };
  
  var xAxis = d3.axisBottom(x)
      .ticks(tickno)
  
  
  svg.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxis);
  
  
  
  /*
      .selectAll(".tick").each(function(data){       
        var tick = d3.select(this);
        var transform = d3.transform(tick.attr("transform")).translate;
        
        var g = document.createElement('g');
            g.setAttribute("transform",'translate('+transform[0]+','+transform[1]+')')
        var r = document.createElement('image')
            r.setAttribute('x',0)
            r.setAttribute('y',0)
            r.setAttribute('xlink:href','https://www.gravatar.com/avatar/904fd39461599f72d580fadf3a73115b?s=32&d=identicon&r=PG&f=1')
            r.setAttribute('width',50)
            r.setAttribute('height',50)
            g.appendChild(r);
            this.parentNode.insertBefore(g,this.nextSibling);
      })
  */
  var yAxis = d3.axisLeft(y)
      .ticks(tickno);
  
  svg.append("svg:g")
      .attr("class", "y axis")
      .call(yAxis)
      .selectAll(".tick").each(function(d:any,i:any){   
          d3.select('text').attr('x',-10)
            .append('image')
            .attr('xlink:href', img)
            .attr('x',0 - 128)
            .attr('y',0 - 128)
            .attr('width',50)
            .attr('height',50)
            .attr('fill','none');
      });
  
  // svg.append("g")
  //     .attr("class", "x grid")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(make_x_axis()
  //         .tickSize(-height, 0, 0)
  //         .tickFormat("")
  //   );
  
  // svg.append("g")
  //     .attr("class", "y grid")
  //     .call(make_y_axis()
  //     .tickSize(-width))
      
  
  
  var clip = svg.append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height);
  
  
  var chartBody = svg.append("g")
      .attr("clip-path", "url(#clip)");
  
  chartBody.append("svg:path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
  
  svg.append('g').attr('class','dots').selectAll(".dot").data(data).enter().append("circle").attr("r",3.5)
  .attr("cx",function(d:any){return x(d.item);})
  .attr("cy",function(d:any){return y(d[field]);})
  
  // function zoomed() {
  //     console.log(d3.event.translate);
  //     console.log(d3.event.scale);
  
  //     svg.select(".dots")
  //         .attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      
  //     svg.selectAll(".dots circle").attr("r", function(){
  //        return (3.5  * d3.event.scale);
  //     });
  
  //     svg.select(".x.axis").call(xAxis);
  //     svg.select(".y.axis").call(yAxis);
  //     svg.select(".x.grid")
  //         .call(make_x_axis()
  //         .tickSize(-height, 0, 0)
  //         .tickFormat(""));
  //     svg.select(".y.grid")
  //         .call(make_y_axis()
  //         .tickSize(-width, 0, 0)
  //         .tickFormat(""));
  //     svg.select(".line")
  //         .attr("class", "line")
  //         .attr("d", line);
  //     svg.selectAll(".dots circle").attr("r", function(){
  //      return (3.5  * d3.event.scale);
  // });
  // }
  }
  
}
