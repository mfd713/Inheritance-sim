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
    options = [{name: "Active", probability: 15}, {name: "Cheerful", probability: 15}, 
{name: "Gloomy", probability: 15}, {name: "Genius", probability: 15},
{name : "Goofball", probability : 15}, {name: "Hot-Headed", probability : 15},
{name: "Romantic", probability : 15}, {name: "Self-Assured", probability : 15},
{name: "Unflirty", probability : 15}, {name: "Art Lover", probability : 15},
{name: "Book Worm", probability : 15}, {name: "Foodie", probability : 15},
{name: "Geek", probability : 15}, {name: "Music Lover", probability : 15},
{name: "Perfectionist", probability : 15},{name: "Ambitoius", probability : 15},
{name: "Cat Lover", probability : 15},{name: "Child of the Islands", probability : 15},
{name: "Child of the Oceans", probability : 15}, {name: "Childish", probability : 15},
{name: "Clumsy", probability : 15},{name: "Dance Machine", probability : 15},
{name: "Dog Lover", probability : 15},{name: "Erratic", probability : 15},
{name: "Glutton", probability : 15}, {name: "Kleptomaniac", probability : 15},
{name: "Lazy", probability : 15},{name: "Loves Outdors", probability : 15},
{name: "Materialistic", probability : 15},{name: "Neat", probability : 15},
{name: "Slob", probability : 15},{name: "Snob", probability : 15},
{name: "Squeamish", probability : 15},{name: "Vegetarian", probability : 15},
{name: "Bro", probability : 15}, {name: "Evil", probability : 15},
{name: "Family-Oriented", probability : 15},{name: "Good", probability : 15},
{name: "Hates Children", probability : 15},{name: "Insider", probability : 15},
{name: "Jealous", probability : 15},{name: "Loner", probability : 15},
{name: "Mean", probability : 15},{name: "Noncommittal", probability : 15},
{name: "Outgoing", probability : 15},{name: "Paranoid", probability : 15},
{name: "Self-Absorbed", probability : 15}];
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

    for(let i =0;i<3;i++){
        genePool.push(getGamete(sim1.traitList[i]));
    }
    for(let i =0;i<3;i++){
        genePool.push(getGamete(sim2.traitList[i]));
    }
    for(let i =0; i<genePool.length; i++){
        for(let j =0; j<options.length;j++)
        {
            if(genePool[i].name===options[j].name && genePool[i].allele==="A"){
                options[j].probability+=2;
            }
            if(genePool[i].name===options[j].name && genePool[i].allele==="a"){
                options[j].probability++;
            }
            if(genePool[i].name!==options[j].name && genePool[i].allele==="A"){
                options[j].probability-=2;
            }
            if(genePool[i].name!==options[j].name && genePool[i].allele==="a"){
                options[j].probability--;
            }
        }
    }

    for(let i = 0; i<options.length; i++){
        for(let j=0; j<options[i].probability; j++)
            optionArray.push(options[i].name);
    }
    while(offspringTraits.size<3)
        offspringTraits.add(optionArray[Math.floor(Math.random()*optionArray.length)]);

    for(let i=0; i<3;i++)
        offspring.traitList[i].phenotype = Array.from(offspringTraits)[i];

    for(let i =0; i<offspring.traitList.length;i++){
        for(let j=0;j<genePool.length;j++){
            if(offspring.traitList[i].phenotype===genePool[j].name)
                offspring.traitList[i].genotype+=genePool[j].allele;
        }
        while(offspring.traitList[i].genotype.length<2)
            offspring.traitList[i].genotype+="Aa"[Math.round(Math.random())];
    }


    return offspring;
};

function getGamete(trait){
    return {
        name : trait.phenotype,
        allele : trait.genotype[Math.round(Math.random())]
    }
}
