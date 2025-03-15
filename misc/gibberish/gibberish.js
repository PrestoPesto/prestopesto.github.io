var gibberish = document.getElementById('totalGibberish');
let collections = [
  " an array of ",
  " a series of ",
  " a styrang of ",
  " fields of ",
  " various",
  " several different",
  " countless",
  " gobs of",
  " pillars of",
  " numerous different",
  " multiple"
]

let adjectivesOrig = [
  " subinfitacious",
  " hydrostoic",
  " hypocerebral",
  " quantoanitypical",
  " corefluctuous",
  " nautastrobioenergetic",
  " micropothecaric",
  " quantum",
  " quiantitypographic",
  " xynogeogic",
  " polycellular",
  " stupelious",
  " megasegmented",
  " cylindrical",
  " supadhesive",
  " free",
  " stable",
  " dangerously unstable",
  " erotic",
  " multisegmented",
  " multiple",
  " random",
  " colorful",
  " presidential",
  " resident",
  " executive",
  " synthetic"
]
let adjectives = adjectivesOrig;

let nounsPluralOrig = [
  "particles",
  "fluctuations",
  "hypotheses",
  "junnections",
  "microchondria",
  "velapsuations",
  "quasianecdotes",
  "thoughtforms",
  "superpositions",
  "supanmesifluoracs",
  "pyroantoxygi",
  "profectiles",
  "juxtapositions",
  "monelectrospirals",
  "sinflashations",
  "protobiases",
  "likozygremes",
  "hypersections",
  "cabinets",
  "branches",
  "stews", 
  "primaries",
  "reanimations",
  "containers",
  "micropelecli",
  "questrizations",
  "viangeli",
  "zoxypolenia",
  "roxiomin",
  "cyclotechs",
  "hyptotechnologies",
  "suboperations",
  "pyrotechnicities",
  "genders",
  "phylia"
]
let nounsPlural = nounsPluralOrig;

let nounsSingleOrig = [
  "particle",
  "fluctuation",
  "hypothesis",
  "junnection",
  "microchondrion",
  "velapsuation",
  "quasianecdote",
  "thoughtform",
  "superposition",
  "supanmesifluorac",
  "pyroantoxygum",
  "profectile",
  "juxtaposition",
  "monelectrospiral",
  "sinflashation",
  "protobias",
  "likozygreme",
  "hypersection",
  "cabinet",
  "branch",
  "stew", 
  "primary",
  "reanimation",
  "container",
  "micropeleclum",
  "questrization",
  "viangelac",
  "zoxypoleniam",
  "roxiomia",
  "cyclotech",
  "hyptotechnology",
  "suboperation",
  "pyrotechnicity",
  "gender",
  "phylium"
]
let nounsSingle = nounsSingleOrig;

let verbs = [
  " create",
  " generate",
  " atomize",
  " decimate",
  " lock",
  " assemble",
  " study",
  " understand",
  " document",
  " pressurize",
  " randomize",
  " scramble",
  " depressurize",
  " purify",
  " hydrate",
  " dehydrate",
  " simulate"
]

let prefixes = [
  "sub-",
  "quantum ",
  "kilo-",
  "mega-",
  "mono-",
  "poly-",
  "homo-",
  "multi-",
  "hetero-",
  "neo-",
  "trans-",
  "terro-",
  "thermo-",
  "pino-",
  "photo-",
  "hydro-",
  "chem-",
  "re-",
  "micro-",
  "giga-",
  "fracto-",
  "gyno-"
]

let exclamations = [
  " Cool",
  " Zany",
  " Tubular",
  " Radical",
  " Wacky",
  " Silly",
  " Nifty",
  " Neat",
  " Boring, honestly"
]

//Random collection (e.g. "a series of...")
function randomCollection() {
  return collections[Math.floor(Math.random()*collections.length)];
}

function randomPrefix() {
  return prefixes[Math.floor(Math.random()*prefixes.length)];
}

//Random adjective
//If "chance" is true, it only has a random chance of including one
function randomAdj(chance) {
  if (adjectives.length < 1) {
    adjectives = adjectivesOrig;
  }
  let random = Math.floor(Math.random()*adjectives.length);
  let word = adjectives[random];
  if (chance) {
    if (Math.random() <= 0.4) {
      adjectives.splice(random, 1);
      return word;
    } else {
      return "";
    }
  } else {
    adjectives.splice(random, 1);
    return word;
  }
}

//Random singular noun
function randomNounSingle() {
  if (nounsSingle.length < 1) {
    nounsSingle = nounsSingleOrig;
  }
  let random = Math.floor(Math.random()*nounsSingle.length);
  let word = " ";
  if (Math.random() <= 0.4) {
    word += randomPrefix();
  }
  word += nounsSingle[random];
  nounsSingle.splice(random, 1);
  nounsPlural.splice(random, 1);
  return word;
}

//Random plural noun
function randomNounPlural() {
  if (nounsPlural.length < 1) {
    nounsPlural = nounsPluralOrig;
  }
  let random = Math.floor(Math.random()*nounsPlural.length);
  let word = " ";
  if (Math.random() <= 0.2) {
    word += randomPrefix();
  }
  word += nounsPlural[random];
  nounsSingle.splice(random, 1);
  nounsPlural.splice(random, 1);
  return word;
}

//Random verb
function randomVerb() {
  let random = Math.floor(Math.random()*verbs.length);
  let word = verbs[random];
  verbs.splice(random, 1);
  return word;
}

//Random exclamation
function randomExclaim() {
  let random = Math.floor(Math.random()*exclamations.length);
  let word = exclamations[random];
  exclamations.splice(random, 1);
  return word;
}


//Sentence pieces
function buildFirstClause() {
  let output = ""; //Empty string for the sentence
  
  let random = Math.floor(Math.random()*16); //Choses a random response
  if (random === 0) {
    output += " It's" + randomCollection() + randomAdj(true) + randomNounPlural();
  } else if (random == 1) {
    output += " It uses" + randomAdj(true) + randomNounPlural() + " to" + randomVerb() + randomNounPlural();
  } else if (random == 2) {
    output += " With this, it can " + randomAdj(false) + "ly" + randomVerb() + " its" + randomNounPlural();
  } else if (random == 3) {
    output += " It includes" + randomCollection() + randomAdj(true) + randomNounPlural();
  } else if (random == 4) {
    output += " Using" + randomCollection() + randomAdj(true) + randomNounPlural() + ", it " + randomVerb() + "s its necessary" + randomNounPlural();
  } else if (random == 5) {
    output += " It " + randomVerb() + "s a" + randomNounSingle() + ", ultimately leading to" + randomCollection() + randomNounPlural();
  } else if (random == 6) {
    output += " Additionally, it often" + randomAdj(false) + "ly" + randomVerb() + "s a" + randomAdj(true) + randomNounSingle();
  } else if (random == 7) {
    output += " It even has" + randomNounPlural();
  } else if (random == 8) {
    output += " Despite this, it's still" + randomAdj(false);
  } else if (random == 9) {
    output += " Out of all of the" + randomNounPlural() + ", it picks one" + randomAdj(true) + randomNounSingle();
  } else if (random == 10) {
    output += " Many different" + randomNounPlural() + " are used to" + randomVerb() + " further" + randomNounPlural();
  } else if (random == 11) {
    output += " Multiple" + randomNounPlural() + ", a type of" + randomAdj(true) + randomNounSingle() + ", are included";
  } else if (random == 12) {
    output += " To add on to that, it" + randomVerb() + "s" + randomCollection() + randomNounPlural();
  } else if (random == 13) {
    output += " Several" + randomNounPlural() +  " are put through" + randomAdj(true) + randomCollection() + randomNounPlural() + " to" + randomVerb() + " them";
  } else if (random == 14) {
    output += " How does this work? Lots and lots of" + randomNounPlural();
  } else if (random == 15) {
    output += " It can" + randomVerb() + randomCollection() + randomAdj(true) + randomNounPlural();
  }
  return output;
}

function buildSecondClause() {
  let output = ""; //Empty string for the sentence
  
  let random = Math.floor(Math.random()*11); //Choses a random response
  if (random === 0) {
    output += ", and it then" + randomVerb() + "s" + randomAdj(true) + randomNounPlural();
  } else if (random == 1) {
    output += ", and" + randomVerb() + " an entire" + randomAdj(true) + randomNounSingle();
  } else if (random == 2) {
    output += ", but it doesn't always work with" + randomNounPlural();
  } else if (random == 3) {
    output += " in order to" + randomVerb() + randomNounPlural();
  } else if (random == 4) {
    output += ", which can consequentially lead to" + randomCollection() + randomNounPlural() + " getting" + randomVerb();
  } else if (random == 5) {
    output += "." + randomExclaim();
  } else if (random == 6) {
    output += ". How" + randomExclaim().toLowerCase();
  } else if (random == 7) {
    output += ", which is pretty" + randomExclaim().toLowerCase();
  } else if (random == 8) {
    output += ", which leads to" + randomAdj(true) + randomNounPlural();
  } else if (random == 9) {
    output += ", which is used to" + randomVerb() + " a" + randomAdj(true) + randomNounSingle();
  } else if (random == 10) {
    output += "—it even has" + randomAdj(true) + randomCollection() + randomNounPlural();
  }
  return output;
}

//Creates a full sentence
function buildSentence() {
  let output = buildFirstClause();
  //Chance of adding a second clause to the sentence
  if (Math.random() <= 0.3) {
    output += buildSecondClause();
  }
  output += "."
  return output;
}

//Creates the full paragraph
function buildParagraph() {
  let paragraph = "";
  paragraph += "Hidden Spaces is a" + randomAdj(false) + randomNounSingle() + ".";
  let maxSentences = 50 + Math.floor(Math.random() * 3); //Maximum sentences in a paragraph
  
  for (let i = 0; i < maxSentences; i++) {
    paragraph += buildSentence();
  }
  
  paragraph += " Have fun reading!"
  return paragraph;
}
let output = buildParagraph();
gibberish.innerHTML = output;
