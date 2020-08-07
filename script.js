//fiona and shrek are 2 built-in sims. Good for testing
let fiona = {
    traitList: [{
        phenotype : "Slob",
        genotype : "Aa"
    },{
        phenotype : "Active",
        genotype : "Aa"
    },{
        phenotype : "Music Lover",
        genotype : "Aa"
    }]
};

let shrek = { 
    traitList: [{
        phenotype : "Slob",
        genotype : "Aa"
    },{
        phenotype : "Loner",
        genotype : "Aa"
    },{
        phenotype : "Self-Assured",
        genotype : "Aa"
    }]
};


let options = [];
let genePool =[];
let optionArray = [];

function makeSim(sim1, sim2){
    options = [{name: "Active", probability: 17}, {name: "Cheerful", probability: 17}, 
{name: "Gloomy", probability: 17}, {name: "Genius", probability: 17},
{name : "Goofball", probability : 17}, {name: "Hot-Headed", probability : 17},
{name: "Romantic", probability : 17}, {name: "Self-Assured", probability : 17},
{name: "Unflirty", probability : 17}, {name: "Art Lover", probability : 17},
{name: "Book Worm", probability : 17}, {name: "Foodie", probability : 17},
{name: "Geek", probability : 17}, {name: "Music Lover", probability : 17},
{name: "Perfectionist", probability : 17},{name: "Ambitious", probability : 17},
{name: "Cat Lover", probability : 17},{name: "Child of the Islands", probability : 17},
{name: "Child of the Oceans", probability : 17}, {name: "Childish", probability : 17},
{name: "Clumsy", probability : 17},{name: "Dance Machine", probability : 17},
{name: "Dog Lover", probability : 17},{name: "Erratic", probability : 17},
{name: "Glutton", probability : 17}, {name: "Kleptomaniac", probability : 17},
{name: "Lazy", probability : 17},{name: "Loves Outdors", probability : 17},
{name: "Materialistic", probability : 17},{name: "Neat", probability : 17},
{name: "Slob", probability : 17},{name: "Snob", probability : 17},
{name: "Squeamish", probability : 17},{name: "Vegetarian", probability : 17},
{name: "Bro", probability : 17}, {name: "Evil", probability : 17},
{name: "Family-Oriented", probability : 17},{name: "Good", probability : 17},
{name: "Hates Children", probability : 17},{name: "Insider", probability : 17},
{name: "Jealous", probability : 17},{name: "Loner", probability : 17},
{name: "Mean", probability : 17},{name: "Noncommittal", probability : 17},
{name: "Outgoing", probability : 17},{name: "Paranoid", probability : 17},
{name: "Self-Absorbed", probability : 17},{name: "Creative", probability : 17}];
    genePool = [];
    optionArray = [];
    let offspring = {
        traitList: [{
            phenotype: "",
            genotype: ""
        },
        {
            phenotype: "",
            genotype: ""
        },
        {
            phenotype: "",
            genotype: ""
        }]
    };
    let offspringTraits = new Set();

    //these two 'for' calls create a collection of alleles
    for(let i =0;i<3;i++){
        genePool.push(getGamete(sim1.traitList[i]));
    }
    for(let i =0;i<3;i++){
        genePool.push(getGamete(sim2.traitList[i]));
    }

    //adjusts the probability of each trait depending on the gene pool. Dominant alleles have a stronger impact on trait probabilities
    for(let i =0; i<genePool.length; i++){
        for(let j =0; j<options.length;j++)
        {
            if(genePool[i].name===options[j].name && genePool[i].allele==="A"){
                options[j].probability+=3;
            }
            if(genePool[i].name===options[j].name && genePool[i].allele==="a"){
                options[j].probability+=2;
            }
            if(genePool[i].name!==options[j].name && genePool[i].allele==="A"){
                options[j].probability-=3;
            }
            if(genePool[i].name!==options[j].name && genePool[i].allele==="a"){
                options[j].probability-=2;
            }
        }
    }

    //Fills an array based on the relative probablities of each trait
    for(let i = 0; i<options.length; i++){
        for(let j=0; j<options[i].probability; j++)
            optionArray.push(options[i].name);
    }

    //randomly selects traits from the array of options
    //offsrpingTraits is a Set so that only 1 of each trait is added
    while(offspringTraits.size<3)
        offspringTraits.add(optionArray[Math.floor(Math.random()*optionArray.length)]);

    //transforms the Set into an array and assigns it to the offspring object
    for(let i=0; i<3;i++)
        offspring.traitList[i].phenotype = Array.from(offspringTraits)[i];

    //this loop assigns a genotype to the new sim
    for(let i =0; i<offspring.traitList.length;i++){
        for(let j=0;j<genePool.length;j++){
            //if one or both of the parents have the trait, then the offsping will take allele(s) the parent(s) gave
            if(offspring.traitList[i].phenotype===genePool[j].name)
                offspring.traitList[i].genotype+=genePool[j].allele;
        }
        //if the offspring's alleles aren't filled, randomly fills them with either a dominant or recessive allele
        while(offspring.traitList[i].genotype.length<2)
            offspring.traitList[i].genotype+="Aa"[Math.round(Math.random())];
    }


    return offspring;
};

//creates a gamete based on a sim's trait
//gametes object: {name: "traitName" allele: "A"}
//name is the name of a trait
//allele is a char, A or a. 'A' represents a dominant allele, 'a' represents a recessive allele
function getGamete(trait){
    return {
        name : trait.phenotype,
        allele : trait.genotype[Math.round(Math.random())]
    };
};
//parses the inputs from the webpage
//returns an array of 2 sims
function parseInputs(){
    let s1t1 = document.getElementsByTagName("option")
    [document.getElementById("sim1trait1").selectedIndex].value;
    let s1t2 = document.getElementsByTagName("option")
    [document.getElementById("sim1trait2").selectedIndex].value;
    let s1t3 = document.getElementsByTagName("option")
    [document.getElementById("sim1trait3").selectedIndex].value;
    let s2t1 = document.getElementsByTagName("option")
    [document.getElementById("sim2trait1").selectedIndex].value;
    let s2t2 = document.getElementsByTagName("option")
    [document.getElementById("sim2trait2").selectedIndex].value;
    let s2t3 = document.getElementsByTagName("option")
    [document.getElementById("sim2trait3").selectedIndex].value;

    let sim1 ={traitList:[{phenotype: s1t1, genotype: "Aa"},
    {phenotype: s1t2, genotype: "Aa"},{phenotype: s1t3, genotype: "Aa"}]};
    let sim2 ={traitList:[{phenotype: s2t1, genotype: "Aa"},
    {phenotype: s2t2, genotype: "Aa"},{phenotype: s2t3, genotype: "Aa"}]};

    return [sim1, sim2];
}

function displayGeneration(){
    let x = parseInputs();
    let sim = makeSim(x[0], x[1]);
    document.getElementById("result").innerText = 
    `Trait 1: ${sim.traitList[0].phenotype}, ${sim.traitList[0].genotype}
    Trait 2: ${sim.traitList[1].phenotype}, ${sim.traitList[1].genotype}
    Trait 3: ${sim.traitList[2].phenotype}, ${sim.traitList[2].genotype}`;
}

let btn = document.querySelector('button');
btn.addEventListener('click', displayGeneration);