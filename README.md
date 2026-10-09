# Little Red Writing Hood

De huidige, zelfstandige website staat in **[sites/little-red-writing-hood](sites/little-red-writing-hood)**. Die bevat het goedgekeurde ontwerp, alle afbeeldingen, het privébeheer, de CSV-export, inschrijvingenopslag, databasemigraties en automatische welkomstmails via Resend.

- Website: https://littleredwritinghood.shop
- Beheer: https://little-red-writing-hood.chirpycoot16.chatgpt.site/admin
- Mailvoorbeeld: https://little-red-writing-hood.chirpycoot16.chatgpt.site/admin/email

De laatste tekstwijziging in de welkomstmail is opgenomen in deze broncode. De publicatie daarvan bij Sites moet nog worden afgerond; opslaan op GitHub publiceert deze zelfstandige Site niet automatisch.

Geheime API-sleutels staan uitsluitend in Sites. Deze repository bevat geen export van de inschrijvingen of mailboxgegevens. Een broncodeback-up bevat niet de live database en instellingen van externe diensten.

## Huidige website ontwikkelen

Ga naar `sites/little-red-writing-hood`. Gebruik Node.js 22.13 of nieuwer en installeer met `npm ci`. Zie de projectnotities in die map voor checks en hosting.

## Oorspronkelijke Lovable-versie

De bestanden in de hoofdmap blijven de eerdere TanStack/Lovable-versie. De ontwerp- en tekstwijzigingen uit deze sessie zijn daarin eveneens opgeslagen. De huidige beheer- en mailfuncties bevinden zich in de zelfstandige Site-map hierboven.