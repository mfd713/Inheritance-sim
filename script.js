let Fiona = {
    traitList: [{
        phenotype : "Slob",
        genotype : "Aa"
    },{
        phenotype : "Athletic",
        genotype : "Aa"
    },{
        phenotype : "Music Lover",
        genotype : "Aa"
    }]
};

let Shrek = { 
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
    options = [{name: "Athletic", probability: 20}, {name: "Ambitious", probability: 20}, 
{name: "Cheerful", probability: 20}, {name: "Loner", probability: 20},
{name : "Music Lover", probability : 20}, {name: "Self-Assured", probability : 20},
{name: "Slob", probability : 20}];
    genePool = [];
    let offspring = {
        traitList: []
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

    offspring.traitList = Array.from(offspringTraits);
    return offspring;
};

function getGamete(trait){
    return {
        name : trait.phenotype,
        allele : trait.genotype[Math.round(Math.random())]
    }
}