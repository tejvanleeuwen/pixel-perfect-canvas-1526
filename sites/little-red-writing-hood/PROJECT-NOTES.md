# Little Red Writing Hood

Zelfstandige Sites-website met D1-opslag; Lovable en Supabase zijn niet nodig. De eerste publicatie is geslaagd op 9 oktober 2026. Het bestaande Site-ID blijft behouden.

## Beheer

/admin vereist ChatGPT-aanmelding plus een servercontrole tegen ADMIN_EMAIL. Ook /api/admin/signups en de CSV-export controleren de eigenaar. JSON en CSV hebben private/no-store caching. /admin/email toont het welkomstmailontwerp. De website is openbaar; de beheerpagina en gegevens blijven alleen voor de eigenaar toegankelijk.

## E-mail

De Resend-koppeling is geactiveerd. De runtimeconfiguratie MAIL_ENABLED=true, RESEND_API_KEY, MAIL_FROM, MAIL_REPLY_TO en NOTIFY_EMAIL staat uitsluitend in Sites. ADMIN_EMAIL is de geverifieerde eigenaar van deze Site. Nooit geheimen in de broncode opslaan.

Nieuwe inschrijvingen krijgen afzonderlijke verzendstatussen voor de welkomstmail en melding aan de eigenaar. Alleen pending berichten kunnen atomair worden geclaimd. Dubbele inschrijvingen sturen geen extra mail. accepted betekent aangenomen door de maildienst, niet afgeleverd. failed, unknown en langdurig sending moeten in de maildienst worden onderzocht; er is bewust geen blinde automatische herverzending. Eerder opgeslagen inschrijvingen worden bij activering niet automatisch alsnog gemaild.

De welkomstmail is een eenmalige bevestiging. Antwoorden gaan naar MAIL_REPLY_TO. Toekomstige nieuwsbrieven en afmeldbeheer vragen een afzonderlijke mailinglijstintegratie. Een echte inschrijvingstest heeft de welkomstmail en de melding verstuurd; beide zijn door Resend als afgeleverd bevestigd op 9 oktober 2026.

## Controles

node scripts/test-signup.mjs
node scripts/test-admin-mail.mjs
node node_modules/typescript/bin/tsc --noEmit

Genereer nieuwe migraties met npm run db:generate. Bestaande migraties niet wijzigen. Publiceer met het ondersteunde Sites-workflowprogramma; Sites past de migraties toe. De tests gebruiken tijdelijke lokale SQLite-opslag en nagebootste mailresponses, geen echte e-mailadressen of maildienst.