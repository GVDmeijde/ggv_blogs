# Gijs Grote Verbouwing

De Gijs Grote Verbouwing reeks startte als een grap. Vlak na het kopen van ons eerste huis kregen we regelmatig vragen over hoe de verbouwing ging. Er waren veel foto’s, en in plaats van iedere keer hetzelfde verhaal te vertellen besloot ik een blog te schrijven.

Jaren later wordt deze blog reeks nog altijd gebruikt, en uitgebreid.

## Docusaurus
De eerste versie van deze blogs is geschreven in WordPress, helaas bleek dit geen ideale tool.
Ondersteuning voor versiebeheer was minimaal, en door de grote hoeveelheid foto's reageerde de website traag. 

Deze repository gebruikt [Docusaurus](https://docusaurus.io/) voor het bouwen van de blogs. Doordat de gegenereerde website statisch is, kan deze worden gehost met GitHub of CloudFlare pages. Dit is een stuk goedkoper dan de orginele webhost.

Om de website lokaal te bouwen, zorg dat node.js geinstaleerd is en run het volgende commando:

```cmd
npx create-docusaurus@latest my-website classic
```

Hierna kunnen de bestanden uit deze repository gekopieerd worden in de nieuwe `my-website` folder, en met de volgende commandos wordt de website lokaal gebouwd:

```cmd
cd my-website
npm run start
```

Een GitHub pipeline zorgt voor het bouwen en publiceren van de website als wijzigingen gepushed worden naar de main branch.

Voor we docusaurus kunnen starten, moeten de volgende packages worden geinstalleerd in de `my-website` folder:

```cmd
npm install react-image-gallery
```

## Packages
Voor de foto gallerijen gebruiken we [deze](https://www.npmjs.com/package/react-image-gallery) package.

## Cloudinary
Omdat deze website via GitHub pages wordt gehost, hebben we een opslaglimiet van 2GB. Door het gebruik van veel foto's op deze site, lopen we al snel tegen dit limiet aan. Om dit op te lossen hosten we onze foto's op een externe service: [Cloudinary](https://console.cloudinary.com/app/c-c5d4df323eceb4eabd572da3dd3a5c/assets/media_library/folders/ce644c7e270960ab2cdeca0924bf772e64?view_mode=mosaic).

Cloudinary stelt ons ook in staat om kleinere thumbnails te genereren op basis van de volwaardige foto's. Hiermee kunnen we de laadtijden van de website ernstig verbeteren. Cloudinary genereert automatisch kleinere afbeeldingen door de juiste parameters aan de URL toe te voegen. Hiermee kunnen we een formaat forceren en een zoom/focus voor de nieuwe resolutie defineren.

'''
https://res.cloudinary.com/kingtech/image/upload/mijn/foto.jpg
https://res.cloudinary.com/kingtech/image/upload/c_fill,g_auto,w_250,h_150,q_auto,f_auto/mijn/foto.jpg
'''