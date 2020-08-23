# Inheritance-sim

## Summary
This project was inspired by the [Sims 4 Legacy Challenge](https://simslegacychallenge.com/the-sims-4-legacy-challenge-rules/). Its main purpose is to generate a child of two sims that will have 3 semi-randomly, semi-genetically generated traits. These traits can have a dominant, recessive, or mixed genotype, whcih will affect their likelihood of being passed on. In the majority of cases, the child will share at least one trait from at least one parent.

## Quickstart
1. Open up main.html
1. Use the dropdown menu to choose traits for each parent.
1. *Optional:* use the buttons next to each trait to assign its genotype
1. Click "Generate Child"
1. The child's traits and genotype will appear in the space below the button.

## Data structures: sim and trait objects
### trait
A `trait` object contains two key-value pairs: `phenotype` and `geneotype`.
```javascript
  let trait = {
   phenotype: "traitName",
   genotype: "Aa"
  }
```
The `phenotype` is a string that represents the name of the trait as it appears in sims, such as "Active".
The `genotype` is a string of two chars, either 'A' or 'a.' 'A' is dominant and 'a' is recessive.*
<br>
**I know the way I use these terms is not the same as their use in actual genetics. I took some creative liberties*
### sim
A `sim` object has one key-value pair: an array called `traitList` containing three `trait` objects.
```javascript
  let sim = {
  traitList: [trait1, trait2, trait3]
  }
```
