# Crawler Dizionario Veneto

This Project is a Web Crawler that fetches/crawls data from "***https://www.elgalepin.com/linguaveneta-vec.asp***".
<br>
It makes a local copy of the of the **Venetian Dictionary** and includes both **italian** and **english** **_translations_** along the usual zone in which words are used (which I call "**_localizations_**").

The output directory should weight around 16.4 MB with 39809 words (as of last testing, last year, probably hasn't changed).

## Features and changes from Sourced/Crawled Data

#### Output Directory
- data.html
- - ...
- data.json
- words.json
- localizations.json
- translations.json
- italianTranslations.json
- englishTranslations.json

---

_The main code was completed by the end of December 2025. Further maintenance around November 2026 (git repo, proper README, upgrades to dependencies, etc...)._

---


Instead of using a DB I'm using the File System to save useful Data in files
Should I migrate the Project to an API and DB System to enhance data output and analysis?
The whole Project can be easily refactored into an Express Server (API) if wanted

---

## Requirements of the Project based on "https://www.elgalepin.com/linguaveneta-vec.asp":

A word, or a venetian word, is made of an ID which is used to find the respective translation in italian/english.
There can be multiple same words or similar ones.

Example:

- The first word of the dictionary [_*`a`*_](https://www.elgalepin.com/linguaveneta-detalio.asp?ID=37758) which has ID 37758. Found at [offset 0](https://www.elgalepin.com/linguaveneta-vec.asp?offset=0).
- [_`àbaco`_](https://www.elgalepin.com/linguaveneta-detalio.asp?ID=2) with ID 2

A word also has a grammar structure, which can be empty sometimes.

Example:

- [_*`abiàndo - `*_](https://www.elgalepin.com/linguaveneta-detalio.asp?ID=26)
- [_*`a - N.ma. sing.`*_](https://www.elgalepin.com/linguaveneta-detalio.asp?ID=37758)

A venetian word has an italian and an english variant, which are connected by the word's ID. That is, they are found in their respective page (https://www.elgalepin.com/linguaveneta-detalio.asp?ID=...)

A venetian word is used in one, or more, specific parts of Veneto (one or multiple localizations) and are found in their respective page:

- Venezia
- Veneto Centrale o Bassa Padovana
- Veneto Orientale
- Veronexe
- Alto Visentin
- Feltrin-Belunexe
- Trentin Orientale
- IstroVeneto-Dàlmata
- Dolomìtega

---
