# Crawler Dizionario Veneto

This Project is a Web Crawler that fetches/crawls data from "***https://www.elgalepin.com/linguaveneta-vec.asp***".
<br>
It makes a local copy of the of the **Venetian Dictionary** and includes both **italian** and **english** **_translations_** along the usual zone in which words are used (which I call "**_localizations_**").

The output directory should weight around 16.4 MB with 39809 words (as of last testing, 24/11/2026, probably won't change).

## How to run the Crawler

1. **Clone the Repo**
    - The usual: `git clone https://github.com/nicolanapa/crawler-dizionario-veneto.git`
2. **Run** **`npm install`**
3. (**optional**) If needed you can change the **numberOfWordsToFetch parameter** of **querySite** found inside `./src/index.js (line 6)`
    - The default number (39820) is the current maximum number of words that it can fetch (39809 actually in the data).
    - Offset [_39820_](https://www.elgalepin.com/linguaveneta-vec.asp?offset=39820) is the maximum since offset [_39840_](https://www.elgalepin.com/linguaveneta-vec.asp?offset=39840) and above keeps repeating.
4. **Choose** your preferred way:
    - **`npm run startWatch`**
    - **`node run ./src/index.js`** if you're on the absolute path of the repo
5. **Wait** until it is finished (may take a long time if the parameter numberOfWordsToFetch is a high number)
    - Some console logs will appear to label every stage (fetching offset 0, 20, 40...).
    - At the end everything is also printed in the console.
6. You'll **find** everything in **./output/**

### Running Example | Requirements

If querySite(39820):

Phase 1 (fetching through using the offset field):

```
Offset: 0 | 2026-11-24T00:5:24.775Z
Offset: 20 | 2026-11-24T00:5:25.525Z
Offset: 40 | 2026-11-24T00:5:26.205Z
...
Offset: 39760 | 2026-11-24T00:36:03.490Z
Offset: 39780 | 2026-11-24T00:36:04.535Z
Offset: 39800 | 2026-11-24T00:36:05.580Z
```
Near the end of Phase 1, RAM usage got near 3 GB (2.9 GB).
As soon as Phase 2 started, when bodyInstance was emptied, RAM usage got down to around 210 MB and didn't change much afterwards.
One possible solution is to handle the DOM as soon as an offset is fetched, instead of doing it at the end by using a large Array in one single for loop.

Phase 2 (fetching every single word to get its translation and zones):

```
Offset: 0 | 2026-11-24T00:36:07.020Z
Offset: 20 | 2026-11-24T00:36:08.342Z
Offset: 40 | 2026-11-24T00:36:09.644Z
...
Offset: 39760 | 2026-11-24T01:19:44.811Z
Offset: 39780 | 2026-11-24T01:19:46.109Z
Offset: 39800 | 2026-11-24T01:19:47.394Z
```

_fetchIdsBody_: **43:40.952** (m:ss.mmm).

_fullProcess_: **1:14:23.268** (h:mm:ss.mmm).

**39809** _elements_.

## Features and changes from Sourced/Crawled Data

- Crawled Data is saved directly on the _File System_ using node's **fs/promises**.
    - Less complexity over using a DBMS like PostgreSQL and at the same time more portability.
- Everything is under one directory (**./output/**) and each time the Crawler creates both **JSON files** containing certain values (everything, only words, only translations, etc..) and a **HTML page** containing everything that it has fetched.
    - The HTML page may be useful for viewing certain words quickly (you can search for words using the usual browser's search word feature)
- Only **one external dependency** has to be installed using `npm install`: **jsdom**. The Project is less complex.
    - jsdom handles easily the DOM

### Output Directory ./output/

An example of an Output Directory (the first [page](https://www.elgalepin.com/linguaveneta-vec.asp?offset=0) of the dictionary has been included as a sample) can be found in **./outputSample/**.

| File                     | Description                                        |
| :----------------------- | -------------------------------------------------- |
| data.html                | Internal CSS, one paragraph (\<p>) per word        |
| data.json                | JSON Object representation of data.html            |
| words.json               | JSON Array of venetian words                       |
| localizations.json       | JSON Matrix of one or multiple "zones" per word    |
| translations.json        | JSON Object made of "italian" and "english" arrays |
| italianTranslations.json | JSON Array of italian translations per word        |
| englishTranslations.json | JSON Array of english translations per word        |

**More in details:**

<details> <summary>data.html</summary>
One paragraph includes a word, grammar structures, italian translations, english translations and localizations.
</details>

<details> <summary>data.json</summary>
An Object consisting of words.json, localizations.json and translations.json
<br><br>
Structure:

```js
{
    "words": ["word1", "word2", ...],
    "grammarStructures": ["structure of word1", "structure of word2", ...],
    "translations":
        {
            "italian":["(italian) translation of word1", "translation of word2", ...],
            "english":["(english) translation of word1", "translation of word2", ...]
        },
    "localizations":[["zone1 of word1", "zone2 of word1"], ["zone3 of word 2"], ...]
}
```

</details>

<details> <summary>words.json</summary>
Structure:

```js
["word1", "word2", ...]
```

</details>

<details> <summary>localizations.json</summary>
Structure:

```js
[["zone1 of word1", "zone2 of word1"], ["zone3 of word 2"], ...]
```

</details>

<details> <summary>translations.json, italianTranslations.json and englishTranslations.json</summary>
Structure of translations.json:

```js
{
    "italian":["(italian) translation of word1", "translation of word2", ...],
    "english":["(english) translation of word1", "translation of word2", ...]
}
```

Structure of italianTranslations.json and englishTranslations.json:

```js
["(insert here correct language) translation of word1", "translation of word2", ...]
```

</details>

## <br>

_The main code was completed by the end of December 2025. Further maintenance around November 2026 (git repo, proper README, upgrades to dependencies, etc...)._

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

## Copyright and the end of the README...

The fetched data is publicly available on [elgalepin](https://www.elgalepin.com/) and it's theirs.
This Project was made for the preservation of this great Dictionary. There are other similar Venetian dictionaries but those ones aren't as "deep" and large as this one.

No AI was used for the code and this README.
