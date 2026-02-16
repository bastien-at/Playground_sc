# URLs compte client localisées (Alltricks)

Ce document centralise les URLs "Mon compte" par locale pour alimenter les agents.

> Note: les URLs FR sont confirmées dans les prompts actuels. Les autres locales suivent la convention de localisation du slug et doivent être validées en production.

## FR (`fr`)

- Espace client (racine): `https://www.alltricks.fr/mon-compte`
- Mes commandes: `https://www.alltricks.fr/mon-compte/mes-commandes`
- Mes commandes & retours: `https://www.alltricks.fr/mon-compte/mes-commandes`
- Mes avoirs: `https://www.alltricks.fr/mon-compte/mes-avoirs`
- Connexion: `https://www.alltricks.fr/connexion`
- Mot de passe oublié: `https://www.alltricks.fr/mot-de-passe-oublie`

## EN (`en`)

- My account (root): `https://www.alltricks.com/my-account`
- My orders: `https://www.alltricks.com/my-account/my-orders`
- Orders & returns: `https://www.alltricks.com/my-account/my-orders`
- My credits: `https://www.alltricks.com/my-account/my-credits`
- Login: `https://www.alltricks.com/login`
- Forgot password: `https://www.alltricks.com/forgot-password`

## ES (`es`)

- Mi cuenta (raíz): `https://www.alltricks.es/mi-cuenta`
- Mis pedidos: `https://www.alltricks.es/mi-cuenta/mis-pedidos`
- Pedidos y devoluciones: `https://www.alltricks.es/mi-cuenta/mis-pedidos`
- Mis vales: `https://www.alltricks.es/mi-cuenta/mis-vales`
- Iniciar sesión: `https://www.alltricks.es/iniciar-sesion`
- Olvidé mi contraseña: `https://www.alltricks.es/contrasena-olvidada`

## DE (`de`)

- Mein Konto: `https://www.alltricks.de/mein-konto`
- Meine Bestellungen: `https://www.alltricks.de/mein-konto/meine-bestellungen`
- Bestellungen & Rücksendungen: `https://www.alltricks.de/mein-konto/meine-bestellungen`
- Meine Guthaben: `https://www.alltricks.de/mein-konto/meine-guthaben`
- Anmelden: `https://www.alltricks.de/anmelden`
- Passwort vergessen: `https://www.alltricks.de/passwort-vergessen`

## IT (`it`)

- Il mio account: `https://www.alltricks.it/il-mio-account`
- I miei ordini: `https://www.alltricks.it/il-mio-account/i-miei-ordini`
- Ordini e resi: `https://www.alltricks.it/il-mio-account/i-miei-ordini`
- I miei crediti: `https://www.alltricks.it/il-mio-account/i-miei-crediti`
- Accedi: `https://www.alltricks.it/accedi`
- Password dimenticata: `https://www.alltricks.it/password-dimenticata`

## NL (`nl`)

- Mijn account: `https://www.alltricks.nl/mijn-account`
- Mijn bestellingen: `https://www.alltricks.nl/mijn-account/mijn-bestellingen`
- Bestellingen en retouren: `https://www.alltricks.nl/mijn-account/mijn-bestellingen`
- Mijn tegoeden: `https://www.alltricks.nl/mijn-account/mijn-tegoeden`
- Inloggen: `https://www.alltricks.nl/inloggen`
- Wachtwoord vergeten: `https://www.alltricks.nl/wachtwoord-vergeten`

## PT (`pt`)

- Minha conta: `https://www.alltricks.pt/minha-conta`
- Meus pedidos: `https://www.alltricks.pt/minha-conta/meus-pedidos`
- Pedidos e devoluções: `https://www.alltricks.pt/minha-conta/meus-pedidos`
- Meus créditos: `https://www.alltricks.pt/minha-conta/meus-creditos`
- Iniciar sessão: `https://www.alltricks.pt/iniciar-sessao`
- Esqueci a palavra-passe: `https://www.alltricks.pt/palavra-passe-esquecida`

---

## Utilisation dans les prompts

- Lire la locale depuis `langue` (ISO 639-1)
- Utiliser l'URL de la section correspondante
- Fallback recommandé: `fr`
