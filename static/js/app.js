// var dropdown = d3.select("#selDataset");

// d3.json("./data/samples.json").then((data) =>{
//     console.log(data);

//     // get the selected Human Sample
//     data.names.forEach(function(name) {
//         dropdown.append("option").text(name).property("value");
//     });
// });
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
    
    // otu id's 
    var otuID = otuTop10.map(d => "OTU " + d)
        console.log(`OTU IDS: ${otuID}`)    
    });
}

function optionChanged(newSubject) {
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



