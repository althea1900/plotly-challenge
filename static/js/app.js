
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
        // console.log(`OTU IDS: ${otuID}`)  
        
    // Use top 10 labels for chart
    var chartlabels = subjectData.otu_labels.slice(0, 10);
 
    // Make the Trace variable for the chart
    var trace = {
        x: subjectValues,
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

    //Make the bubble chart
     
        var bubbleTrace = {
          x: subjectData.otu_ids,
          y: subjectData.sample_values,
          text: subjectData.otu_labels,
          mode: `markers`,
          marker: {
            size: subjectData.sample_values,
            color: subjectData.otu_ids
          }
        };
    
        // set the bubble layout
        var data = [bubbleTrace];
        var layout = {
          title: "Belly Button Bacteria",
          xaxis: {title: "OTU ID"},
          height: 600, 
          width:  1000
        };
        Plotly.newPlot("bubble", data, layout);

    });
}

function demoInfo(id) {
    d3.json("../data/samples.json").then((data) => {

        // Store the metadata 
        var metadata = data.metadata;
            console.log(metadata);

        // Get the metadata for the current id 
        var subjectInfo = metadata.filter(meta => meta.id.toString()=== id)[0];
        
        // Put Demographs info onto page
        var demochart = d3.select("#sample-metadata");
        demochart.html("");
        Object.entries(subjectInfo).forEach((key) => {
            demochart.append("p").text(key[0].toUpperCase() + ": " + key[1] + "\n"); 
        });
    });
}

function optionChanged(newSubject) {
    buildPlot(newSubject);
    console.log("changed")
    demoInfo(newSubject);
}


function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("../data/samples.json").then((data) => {
        console.log(data)
    // });

        // Fill the Subject ID No dropdown
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        buildPlot(data.names[0]);
        demoInfo(data.names[0]);
    });
}

init();



