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
    options = [{name: "Active", probability: 19}, {name: "Cheerful", probability: 19}, 
{name: "Gloomy", probability: 19}, {name: "Genius", probability: 19},
{name : "Goofball", probability : 19}, {name: "Hot-Headed", probability : 19},
{name: "Romantic", probability : 19}, {name: "Self-Assured", probability : 19},
{name: "Unflirty", probability : 19}, {name: "Art Lover", probability : 19},
{name: "Book Worm", probability : 19}, {name: "Foodie", probability : 19},
{name: "Geek", probability : 19}, {name: "Music Lover", probability : 19},
{name: "Perfectionist", probability : 19},{name: "Ambitious", probability : 19},
{name: "Cat Lover", probability : 19},{name: "Child of the Islands", probability : 19},
{name: "Child of the Oceans", probability : 19}, {name: "Childish", probability : 19},
{name: "Clumsy", probability : 19},{name: "Dance Machine", probability : 19},
{name: "Dog Lover", probability : 19},{name: "Erratic", probability : 19},
{name: "Glutton", probability : 19}, {name: "Kleptomaniac", probability : 19},
{name: "Lazy", probability : 19},{name: "Loves Outdors", probability : 19},
{name: "Materialistic", probability : 19},{name: "Neat", probability : 19},
{name: "Slob", probability : 19},{name: "Snob", probability : 19},
{name: "Squeamish", probability : 19},{name: "Vegetarian", probability : 19},
{name: "Bro", probability : 19}, {name: "Evil", probability : 19},
{name: "Family-Oriented", probability : 19},{name: "Good", probability : 19},
{name: "Hates Children", probability : 19},{name: "Insider", probability : 19},
{name: "Jealous", probability : 19},{name: "Loner", probability : 19},
{name: "Mean", probability : 19},{name: "Noncommittal", probability : 19},
{name: "Outgoing", probability : 19},{name: "Paranoid", probability : 19},
{name: "Self-Absorbed", probability : 19},{name: "Creative", probability : 19}];
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

    for (let trait of sim1.traitList){
        genePool.push(getGamete(trait));
    }

    for (let trait of sim2.traitList){
        genePool.push(getGamete(trait));
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
    let st1t1Genes = getGeneChoice("s1t1Genes");

    let s1t2 = document.getElementsByTagName("option")
    [document.getElementById("sim1trait2").selectedIndex].value;
    let st1t2Genes = getGeneChoice("s1t2Genes");

    let s1t3 = document.getElementsByTagName("option")
    [document.getElementById("sim1trait3").selectedIndex].value;
    let st1t3Genes = getGeneChoice("s1t3Genes");

    let s2t1 = document.getElementsByTagName("option")
    [document.getElementById("sim2trait1").selectedIndex].value;
    let st2t1Genes = getGeneChoice("s2t1Genes");

    let s2t2 = document.getElementsByTagName("option")
    [document.getElementById("sim2trait2").selectedIndex].value;
    let st2t2Genes = getGeneChoice("s2t2Genes");

    let s2t3 = document.getElementsByTagName("option")
    [document.getElementById("sim2trait3").selectedIndex].value;
    let st2t3Genes = getGeneChoice("s2t3Genes");

    let sim1 ={traitList:[{phenotype: s1t1, genotype: st1t1Genes},
    {phenotype: s1t2, genotype: st1t2Genes},{phenotype: s1t3, genotype: st1t3Genes}]};
    let sim2 ={traitList:[{phenotype: s2t1, genotype: st2t1Genes},
    {phenotype: s2t2, genotype: st2t2Genes},{phenotype: s2t3, genotype: st2t3Genes}]};

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

//getGeneChoice will return the value of the chosen gene radio button
//input: the name of a group of radio buttons a string
//output: the value of the chosen radio button as a string (AA, aa, or Aa)
//returns "Aa" if user hasn't made choice.
function getGeneChoice(eleName){
    for(let choice of document.getElementsByName(eleName)){
        if(choice.checked){
            return choice.value;
            break;
        }
    }
    return "Aa"; 
}

let btn = document.querySelector('button');
btn.addEventListener('click', displayGeneration);