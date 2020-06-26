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



let gamete1 = new Object();
let gamete2 = new Object();
let gamete3 = new Object();
let gamete4 = new Object();
let gamete5 = new Object();
let gamete6 = new Object();
let genePool = [gamete1, gamete2, gamete3, gamete4, gamete5, gamete6];


function makeSim(sim1, sim2){
    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            if(sim1.traitList[i].phenotype === sim2.traitList[j].phenotype)
               console.log("match");}
            }
};

function getGamete(trait){
    return {
        name : trait.phenotype,
        allele : trait.genotype[Math.round(Math.random())]
    }
}