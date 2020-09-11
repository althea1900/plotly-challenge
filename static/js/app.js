
function buildPlot(id) {
    d3.json("./data/samples.json").then((data) => {
        console.log(data);

    // filter sample values by id 
    var subjectData = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(subjectData);

    // Getting the top 10 
    var subjectValues = subjectData.sample_values.slice(0, 10).reverse();

    // Reverse the top 10 otu ids
    var otuTop10 = (subjectData.otu_ids.slice(0, 10)).reverse();
    
    // display otu id's 
    var otuID = otuTop10.map(d => "OTU " + d)
        console.log(`OTU IDS: ${otuID}`)  
        
    // Use top 10 labels for chart
    var chartlabels = subjectData.otu_labels.slice(0, 10);
 
    // Make the Trace variable for the chart
    var trace = {
        x: subjectData,
        y: otuID,
        text: chartlabels,
        marker: {
            color: 'rgb(0, 0, 204)'},
        type: "bar",
        orientation: "h",
    };

    // Create the data variable
    var data = [trace];

    //Make the chart layout variables
    var layout = {
        title: "Top 10 Belly Button OTUs", 
        yaxiz: {tickmode:"Linear"},
        margin: {
            l: 100, 
            r: 100, 
            t: 100, 
            b: 50
        }
    };

    //Make the bar chart
    Plotly.newPlot("bar", data, layout);

    });
}

function optionChanged(newSubject) {
    buildPlot(newSubject);
    console.log("changed")
}


function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("/data/samples.json").then((data) => {
        console.log(data)
    // });

        // Fill the Subject ID No dropdown
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        buildPlot(data.names[0]);
    });
}

init();



