// var dropdown = d3.select("#selDataset");

// d3.json("./data/samples.json").then((data) =>{
//     console.log(data);

//     // get the selected Human Sample
//     data.names.forEach(function(name) {
//         dropdown.append("option").text(name).property("value");
//     });
// });

function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("./data/samples.json").then((data) => {
        console.log(data)
    // });

    // get the selected Human Sample
    data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
    });

    });
}

init();
// function getHumanSample(data) {

// }

