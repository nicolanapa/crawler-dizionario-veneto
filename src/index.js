import querySite from "./querySite.js";

// Uncomment this line to start the whole crawling process
// The output directory should weight around 16.4 MB
// querySite(39820);

querySite(39820);

// This Project is a type of Web Crawler that gets data from "https://www.elgalepin.com/linguaveneta-vec.asp"
// It makes a local copy of the of that page, that is, the Venetian Dictionary.
// The main code was completed by the end of December 2025.

// Instead of using a DB I'm using the File System to save useful Data in files
// Should I migrate the Project to an API and DB System to enhance data output and analysis?
// The whole Project can be easily refactored into an Express Server (API) if wanted

/* Requirements of the Project:
A word, or a venetian word (unicode characters), is made of an ID which is used to find the respective translation in italian/english.
It also has a grammar structure, which can be empty sometimes.
There can be multiple same words, they can also be similar.
A venetian word has an italian and an english variant, which are connected by the word's ID.
A venetian word is used in one, or more, specific parts of Veneto (one or multiple localizations):
    Venezia
    Veneto Centrale o Bassa Padovana
    Veneto Orientale
    Veronexe
    Alto Visentin
    Feltrin-Belunexe
    Trentin Orientale
    IstroVeneto-Dàlmata
    Dolomìtega
*/

// Self-host FontGentiumBasic_110 (for a better font rendering)? (http://digilander.libero.it/cssc/scarica/FontGentiumBasic_110.zip)
