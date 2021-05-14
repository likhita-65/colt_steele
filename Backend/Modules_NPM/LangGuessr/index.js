const franc = require("franc");
const langs = require("langs");
const colors = require("colors");
const input = process.argv[2];

// console.log(franc('Alle menslike wesens word vry'))
// const langCode = franc('Alle menslike wesens word vry')
const langCode = franc(input)
if(langCode === 'und'){
    console.log("SORRY, COULDN'T FIGURE IT OUT! TRY AGAIN!".red);
}
else{
    const language = langs.where("3", langCode);
    console.log(`Our best guess is : ${language.name}`.green)
    // console.log("Our best guess is : "+ language.name);

}