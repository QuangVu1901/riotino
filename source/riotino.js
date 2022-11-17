// create spec
var spec1 = { 
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    description: "A plot of task",
    width: 800,
    height: 700,
    padding: 50,
    signals: [
        {
            name: "mousehover",
            value: {},
            on: [
                {
                    events: "rect:mouseover", 
                    update: "datum"
                },
                {
                    events: "rect:mouseout",  
                    update: "{}"
                }
            ]
        },
        {
            name: "Shift",
            value: "All",
            bind: {
                input: "radio",
                element: "#selector",
                options: ["D", "N", "All"],
                labels: ["Day", "Night", "All"]
            }
          }
    ],
    data: [
        {
            name: "average",
            url: "https://raw.githubusercontent.com/QuangVu1901/riotino/main/newset1.csv",
            format: { type: "csv" },
            transform: [
                {
                    type: "filter",
                    expr: "datum.Shift == Shift || Shift == 'All'"
                },
                {
                    type: "aggregate",
                    groupby: ["TimeCodeDesc"],
                    fields: ["Duration"],
                    ops: ["average"],
                    as: ["mean"]
                },
                {
                    type: "collect",
                    sort: { field: "mean", order: "descending" }
                }
            ]
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "linear",
            domain: { data: "average", field: "mean" },
            range: "width",
            padding: 5
        },
        {
            name: "yScale",
            type: "band",
            domain: { data: "average", field: "TimeCodeDesc" },
            range: "height",
            padding: 0.3
        }
    ],
    marks: [
        {
            type: "rect",
            from: { data: "average"},
            encode: {
                update: {
                    x: { field: "mean", scale: "xScale"},
                    x2: { value: 0, scale: "xScale"},
                    y: { field: "TimeCodeDesc", scale: "yScale"},
                    height: { value: 10},
                    fillOpacity: { value: .8 },
                    stroke: { value: "black" },
                    fill: { value: "dimgray" }
                },
                hover: {
                    fill: { value: "black" }
                }
            }
        },
        {
            type: "text",
            encode: {
                update: {
                    align: { value: "center" },
                    dx: { value: 20 },
                    dy: { value: 10 },
                    fill: { value: "dimgray" },
                    x: { signal: "mousehover.mean", scale: "xScale" },
                    y: { signal: "mousehover.TimeCodeDesc", scale: "yScale" },
                    text: { signal: "round(mousehover.mean)" }
                }
            }
        }
    ],
    axes: [
        { 
            scale: "xScale",
            orient: "bottom",
            title: "Average Time (Second)"
        },
        {
            scale: "yScale",
            orient: "left",
            title: "Type of Work"
        }
    ],
    title: {
        text: "Average time of task (Dataset #1)"
    }
};

// create runtime
var runtime1 = vega.parse(spec1);

// create view
var view1 = new vega.View(runtime1)
                   .logLevel(vega.Error)
                   .renderer("svg")
                   .initialize("#view1")
                   .hover();

// run it
view1.run();

// create spec
var spec2 = { 
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    description: "A plot of material",
    width: 800,
    height: 200,
    padding: 50,
    signals: [
        {
            name: "mousehover",
            value: {},
            on: [
                {
                    events: "rect:mouseover", 
                    update: "datum"
                },
                {
                    events: "rect:mouseout",  
                    update: "{}"
                }
            ]
        },
        {
            name: "Shift",
            value: "All",
            bind: {
                input: "radio",
                element: "#selector",
                options: ["D", "N", "All"],
                labels: ["Day", "Night", "All"]
            }
          }
    ],
    data: [
        {
            name: "average",
            url: "https://raw.githubusercontent.com/QuangVu1901/riotino/main/set2.csv",
            format: { type: "csv" },
            transform: [
                {
                    type: "filter",
                    expr: "datum.ShiftID == Shift || Shift == 'All'"
                },
                {
                    type: "aggregate",
                    groupby: ["MaterialDesc"],
                    fields: ["PayLoadWeight"],
                    ops: ["sum"],
                    as: ["mean"]
                },
                {
                    type: "collect",
                    sort: { field: "mean", order: "descending" }
                }
            ]
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "linear",
            domain: { data: "average", field: "mean" },
            range: "width",
            padding: 10
        },
        {
            name: "yScale",
            type: "band",
            domain: { data: "average", field: "MaterialDesc" },
            range: "height",
            padding: 0.2
        }
    ],
    marks: [
        {
            type: "rect",
            from: { data: "average"},
            encode: {
                update: {
                    x: { field: "mean", scale: "xScale"},
                    x2: { value: 0, scale: "xScale"},
                    y: { field: "MaterialDesc", scale: "yScale"},
                    height: { value: 40},
                    fillOpacity: { value: .8 },
                    stroke: { value: "black" },
                    fill: { value: "dimgray" }
                },
                hover: {
                    fill: { value: "black" }
                }
            }
        },
        {
            type: "text",
            encode: {
                update: {
                    align: { value: "center" },
                    dx: { value: 20 },
                    dy: { value: 22 },
                    fill: { value: "dimgray" },
                    x: { signal: "mousehover.mean", scale: "xScale" },
                    y: { signal: "mousehover.MaterialDesc", scale: "yScale" },
                    text: { signal: "ceil(mousehover.mean)" }
                }
            }
        }
    ],
    axes: [
        { 
            scale: "xScale",
            orient: "bottom",
            title: "Weight"
        },
        {
            scale: "yScale",
            orient: "left",
            title: "Material"
        }
    ],
    title: {
        text: "Total Weight of Material (Dataset #2)"
    }
};

// create runtime
var runtime2 = vega.parse(spec2);

// create view
var view2 = new vega.View(runtime2)
                   .logLevel(vega.Error)
                   .renderer("svg")
                   .initialize("#view2")
                   .hover();

// run it
view2.run();