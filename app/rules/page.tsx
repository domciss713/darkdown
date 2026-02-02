import { Card } from "@/components/ui/card";

const rules = [
  "Každý hráč je povinen chovat se slušně a s respektem k ostatním hráčům i admin týmu. Úmyslné provokace, toxicita nebo narušování pohody na serveru nejsou tolerovány.",
  "Je zakázáno používat jakékoliv cheaty, hacky, klienty nebo úpravy, které dávají herní výhodu. Povolené jsou pouze běžné klientské módy bez vlivu na gameplay (např. OptiFine, minimapy bez entity radarů apod.).",
  "Zneužívání bugů, glitchů nebo chyb serveru je přísně zakázáno. Každý nalezený bug má být nahlášen admin týmu. Zneužití = trest.",
  "Je zakázáno jakýmkoliv způsobem obcházet tresty, vytvářet alternativní účty (alt účty) za účelem vyhnutí se banu, mute nebo jinému postihu.",
  "Vydávání se za člena admin týmu nebo šíření nepravdivých informací o serveru je zakázáno."
];

const rules1 = [
  "Spam, flood, opakování zpráv, zbytečné CAPS LOCK zprávy nebo zahlcování chatu nejsou povoleny.",
  "Vulgarity jsou tolerovány v rozumné míře, ale urážky, rasismus, diskriminace, vyhrožování nebo osobní útoky jsou přísně zakázány.",
  "Reklama na jiné servery, weby, Discordy nebo projekty bez povolení vedení serveru je zakázána.",
  "Zveřejňování osobních údajů (doxxing) je absolutně zakázáno a vede k okamžitému permanentnímu banu.",
  "Používání nevhodných jmen, skinů nebo emotikonů, které mohou urážet ostatní hráče nebo porušovat pravidla serveru, je zakázáno."
];

const rules2 = [
  "Ničení cizích staveb, krádeže z cizích chestek nebo úmyslný griefing jsou zakázány, pokud herní režim výslovně nepovoluje jinak.",
  "Farmy, stroje a mechaniky, které způsobují lagy serveru, mohou být omezeny nebo odstraněny bez náhrady.",
  "AFK farmy, automatizace a redstone konstrukce musí být používány s rozumem. Admin tým má právo zasáhnout, pokud ovlivňují výkon serveru.",
  "Úmyslné zabíjení hráčů, trollení nebo obtěžování ostatních hráčů mimo povolené PvP zóny je zakázáno."
];

const rules3 = [
  "Ticket systém slouží k řešení problémů, bugů a dotazů. Zneužívání ticketů, spam nebo trollení v ticketech povede k omezení přístupu.",
  "Rozhodnutí admin týmu jsou konečná. Ve výjimečných případech lze podat slušný a věcný appeal.",
  "Ban appeal musí být napsán pravdivě, slušně a bez lží. Pokus o obelhání admin týmu situaci pouze zhorší.",
  "Admin tým si vyhrazuje právo trestat i chování, které není výslovně uvedeno v pravidlech, pokud poškozuje server nebo komunitu."
];

const rules4 = [
  "Neznalost pravidel neomlouvá. Každý hráč je povinen se s pravidly seznámit.",
  "Pravidla mohou být kdykoliv změněna nebo aktualizována. Aktuální verze pravidel je vždy k dispozici na webových stránkách serveru.",
  "Připojením na server automaticky souhlasíš se všemi uvedenými pravidly."
];

export default function RulesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Pravidla serveru</h1>
      <Card>
        <h1 className="text-xl font-semibold mb-2">Obecná pravidla serveru</h1>
        <ol className="space-y-2 text-sm text-dd-muted list-decimal list-inside">
          {rules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </Card>
      <Card>
        <h1 className="text-xl font-semibold mb-2">Chat a komunikace</h1>
        <ol className="space-y-2 text-sm text-dd-muted list-decimal list-inside">
          {rules1.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </Card>
      <Card>
        <h1 className="text-xl font-semibold mb-2">Gameplay a herní chování</h1>
        <ol className="space-y-2 text-sm text-dd-muted list-decimal list-inside">
          {rules2.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </Card>
      <Card>
        <h1 className="text-xl font-semibold mb-2">Tickety, ban appealy a admin team</h1>
        <ol className="space-y-2 text-sm text-dd-muted list-decimal list-inside">
          {rules3.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </Card>
      <Card>
        <h1 className="text-xl font-semibold mb-2">Závěr</h1>
        <ol className="space-y-2 text-sm text-dd-muted list-decimal list-inside">
          {rules4.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
