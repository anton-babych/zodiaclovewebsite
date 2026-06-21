// quiz.js - Logjika e funnelit të chat-it interaktiv (Versioni Shqip)

// Gjurmo hyrjen në faqen e kuizit
document.addEventListener('DOMContentLoaded', () => {
  window.track && window.track('quiz_page_viewed');
});

const state = {
  userName: '',
  userSign: '',
  crushSign: '',
  timeTalking: '',
  goal: '',
  progress: 0,
  currentTurn: 0,
  chatOutcome: 'fail'
};

const signNames = {
  Aries: 'Dashi',
  Taurus: 'Demi',
  Gemini: 'Binjakët',
  Cancer: 'Gaforrja',
  Leo: 'Luani',
  Virgo: 'Virgjëresha',
  Libra: 'Peshorja',
  Scorpio: 'Akrepi',
  Sagittarius: 'Shigjetari',
  Capricorn: 'Bricjapi',
  Aquarius: 'Ujori',
  Pisces: 'Peshqit'
};

const signNamesGenitive = {
  Aries: 'Dashit',
  Taurus: 'Demit',
  Gemini: 'Binjakëve',
  Cancer: 'Gaforres',
  Leo: 'Luanit',
  Virgo: 'Virgjëreshës',
  Libra: 'Peshorës',
  Scorpio: 'Akrepit',
  Sagittarius: 'Shigjetarit',
  Capricorn: 'Bricjapit',
  Aquarius: 'Ujorit',
  Pisces: 'Peshqve'
};

function getSignName(sign) {
  return signNames[sign] || sign || 'Ai';
}

function getSignGenitive(sign) {
  return signNamesGenitive[sign] || getSignName(sign);
}

// --- FJALORI I TË DHËNAVE ---
// Logjika e Trap-it dhe Roast-it bazuar në shenjën e Zodiakut
const zodiacData = {
  Aries: {
    script: [
      { r: "o vlla, më fal që s'u ktheva, isha i mbytur me punë 💀", c: [{t: "s'ka gjë, edhe unë isha bërë lëmsh", i: 20}, {t: "ti asnjëherë s'ke kohë për mua", i: -10}] },
      { r: "po marr i frymë pak. ca bone sot?", c: [{t: "qetë, dola me gocat mbrm 🥂", i: 15}, {t: "tu t'prit ty, si gjithmon", i: -5}] },
      { r: "bukur. edhe unë thashë të dal pak", c: [{t: "shijoje! plot njerëz ka sonte", i: 25}, {t: "më merr edhe mua!", i: -15}] },
      { r: "shofim. du me bo najsen bashk shpejt", c: [{t: "ma bo i dmt kur t'lirohesh 💅", i: 20}, {t: "kur fiks? ca dite?", i: -10}] }
    ],
    trapQuestion: "nuk di, sonte rehat nshpi. herës tjetër",
    trapChoices: [ "po serjoz? po anulove prap?", "si t'dush. mos mshkruj m'herë tjetër." ],
    roast: "Dashi dëshiron energji dhe guxim, jo pasivitet dhe ankth. Ai tërhiqet nga gratë që janë të gjalla dhe direkte. Nëse luaj lojëra ose sillesh e nevojshme, shkëndija shuhet menjëherë.",
    solution: "Dërgoji diçka të shkurtër, guximtare dhe pak sfidante. Bëre të ndjejë se gjahu ka filluar sërish — por me kushtet e tua."
  },
  Taurus: {
    script: [
      { r: "më fal, kisha rënë në gjumë si 12 orë 😭", c: [{t: "e kuptoj, edhe unë doja me fjet", i: 20}, {t: "flini shume ju, u bo zakon", i: -10}] },
      { r: "ma duhej. mora i ushqim, tu pa najsen n'divan", c: [{t: "shijoje qetësinë ✨", i: 15}, {t: "mund t'vi dhe unë?", i: -15}] },
      { r: "haha ndoshta. dua i natë qetë sonte", c: [{t: "e kuptoj, shihemi herës tjetër", i: 25}, {t: "po dhe unë qetë jom!", i: -15}] },
      { r: "po, do gjejmë kohë këtë javë", c: [{t: "ok, ma bo ti i dmt", i: 20}, {t: "ok po kur fiks?", i: -10}] }
    ],
    trapQuestion: "po mendoj me u relaks pak, rri vetëm tani",
    trapChoices: [ "pse? po flet me naj tjetër?", "domethënë po m'humbiste kohën gjithë këtë kohë?" ],
    roast: "Demi vlerëson qetësinë dhe ritmin e vet. Mos e shty për përgjigje të menjëhershme. Kur e detyron të vendosë në moment, ai ndihet i rrethuar dhe mbyllet.",
    solution: "Tërhiqu pak por mbetu e ngrohtë. Lëre ta ndjejë mungesën tënde pa drama. Kur Demi ndjen se nuk po e pret, fillon ai të nisë."
  },
  Gemini: {
    script: [
      { r: "o hej! më fal, koka m'u bë lëmsh sot", c: [{t: "haha e njëjta energji, moti ka faj 😂", i: 20}, {t: "e kam bërë zakon tashmë", i: -10}] },
      { r: "fillova 5 projekte s'mbarova asnji 🤡", c: [{t: "klasike 😂 ca po boje?", i: 15}, {t: "duhet me u fokusu", i: -10}] },
      { r: "gjithçka e asgjë. ndoshta dal sonte", c: [{t: "oh çmë foto!", i: 25}, {t: "pse s'm'ftove?", i: -15}] },
      { r: "nqs s'shpërndahem rrugës lol. duhet me u pa shpejt", c: [{t: "sigurt, bojm plan", i: 20}, {t: "t lutem, po t lutem le t takohemi", i: -10}] }
    ],
    trapQuestion: "hej po zhdukem pak, dua një fundjavë pa etiketa",
    trapChoices: [ "ca jemi ne atëherë? dua i etiketë.", "pse sillesh kshu? thjesht përgjigju." ],
    roast: "Binjakët kanë nevojë për lëvizje mendore dhe liri. Mos i bëj presion për siguri të menjëhershme ose ktheje çdo bisedë në gjyq serioz. Ata i tremben mërzisë dhe presionit.",
    solution: "Dërgoji diçka tërësisht ndryshe — një meme, një fakt të çuditshëm, një shaka. Ndryshoje energjinë. Nëse angazhon mendjen e tij pa presion, ai kthehet vetë."
  },
  Cancer: {
    script: [
      { r: "hej... më fal që s'u ktheva. isha bo shum lemsh n'mendime", c: [{t: "s'ka gjë, merre kohën tënde 🤍", i: 20}, {t: "ca ke prap?", i: -10}] },
      { r: "hallet e familjes. lodhje", c: [{t: "jam këtu nqs do me fol", i: 15}, {t: "oh, keq", i: -5}] },
      { r: "faleminderit. rri n'shpi tu pa naj film", c: [{t: "natë perfekte. ca filmi?", i: 25}, {t: "mos u mbylle brenda", i: -15}] },
      { r: "ndoshta najsen nostalgjike. t'shkruaj kur t'jem ok", c: [{t: "merre gjith kohën", i: 20}, {t: "ok do t'pres", i: -10}] }
    ],
    trapQuestion: "po, edhe ex-i im e donte këtë film... gjithsesi po fle",
    trapChoices: [ "po sillesh shum dramatik.", "cool. po ca ke nesër?" ],
    roast: "Gaforrja do siguri emocionale. Ai mban mend detajet dhe e ndien menjëherë ftohtësinë ose ironinë. Kur ia trajton ndjenjat si bezdi, besimi ftohet.",
    solution: "Pranoje ndryshimin me butësi. 'E ndjeva që diçka ndryshoi. Nuk dua të të shtyj, thjesht jam këtu.' Butësia pa presion është çelësi."
  },
  Leo: {
    script: [
      { r: "më fal, humba! isha në palestër, dukesha shumë mirë për të parë telefonin 💅", c: [{t: "haha e dua këtë vetëbesim", i: 20}, {t: "sa i mbytur në vete", i: -10}] },
      { r: "e di 😂 sot ishte si film", c: [{t: "energji protagonisteje ✨", i: 15}, {t: "ok qetësohu pak", i: -10}] },
      { r: "fjalë për fjalë. mora një xhaketë të re, më rri shumë mirë", c: [{t: "dua ta shoh foton tani", i: 25}, {t: "besoj se të rri mirë", i: -15}] },
      { r: "e vesh herës tjetër. kur t'kem kohë lol", c: [{t: "nqs je me fat", i: 20}, {t: "kur o hera tjetër?", i: -10}] }
    ],
    trapQuestion: "[Dërgon foto] kjo veshje më rri shumë mirë sinqerisht",
    trapChoices: [ "po provon shum me atë veshje.", "nuk do t'ushqej egon për këtë." ],
    roast: "Luani dëshiron të dashurohet bukur dhe të admirojë. Atij i duhen vëmendje dhe njohje. Ta bësh të ndihesh i zakonshëm ose ta turpërosh është mënyra e garantuar për ta humbur.",
    solution: "Jepi një kompliment specifik dhe cilësor. Jo thjesht 'duket mirë', por 'ajo ngjyrë ty të shkon shumë'. Jepi vlerësim, pastaj mbaj pak mister."
  },
  Virgo: {
    script: [
      { r: "më fal për vonesën, po organizoja jetën se humba kohën", c: [{t: "mbret produktiv 👑", i: 20}, {t: "e ke kthyer punën në arratisje", i: -10}] },
      { r: "duhej. orari kësaj jave ishte kaos", c: [{t: "e kuptoj, duhet t'jesh n'krye", i: 15}, {t: "mërzitshme", i: -10}] },
      { r: "po, saktësi. marr i kafe me vazhdu", c: [{t: "mos u lodh shum!", i: 25}, {t: "ma bjen dhe mu?", i: -15}] },
      { r: "i di limitet lol. do gjejmë kohë së shpejti", c: [{t: "tingëllon si plan", i: 20}, {t: "kurrë s'ke kohë", i: -10}] }
    ],
    trapQuestion: "mënyra si e trajtove situatën s'ka logjikë. e rregulloj vetë.",
    trapChoices: [ "mos u mundo me kontrollu çdo gje.", "je i lodhshëm kur sillesh kshu." ],
    roast: "Virgjëresha lidhet me besim, qartësi dhe respekt. Kaosi emocional nuk i duket romancë. Nuk duhet të pranosh kritika të ashpra, por reagimi i çrregullt e bën të largohet.",
    solution: "Vendos një kufi të qetë, pa emocione. 'E vlerësoj mendimin tënd, por nuk u përgjigjem kur flitet teposhtë me mua.' Virgjëresha respekton strukturën dhe autoritetin e qetë."
  },
  Libra: {
    script: [
      { r: "o hej! më fal, duke menduar për ty harrova të kthej përgjigje 😅", c: [{t: "s'ka gjë, jam e lajthitur 😏", i: 20}, {t: "sigurisht që po", i: -10}] },
      { r: "bëj be! vrap tu vendos ca me vesh sonte", c: [{t: "ca janë opsionet?", i: 15}, {t: "thjesht zgjidh i gje", i: -10}] },
      { r: "këmishën e zezë apo atë vintage. s'di", c: [{t: "vintage gjithmonë fiton", i: 25}, {t: "pse është kaq e vështirë?", i: -15}] },
      { r: "ke t'drejtë. dalim n'at vendin estetik shpejt?", c: [{t: "veç nqs paguan ti 💅", i: 20}, {t: "po t'lutem!", i: -10}] }
    ],
    trapQuestion: "nuk di ku me shku, stres, zgjidh ti ose po anulloj",
    trapChoices: [ "zgjidh i gje, lodhje o kjo.", "nqs anullon, mos shkruaj prap." ],
    roast: "Peshorja dëshiron bukuri, ekuilibër dhe harmoni. Presioni e bën të pavendosur. Ngritja e zërit ose detyrimi për vendime të menjëhershme shkatërron estetikën elegante që i nevojitet në lidhje.",
    solution: "Hiq presionin por merr drejtimin me hijeshi. 'Le të shkojmë në restorant shqiptar. Di një vend.' Do të ndihet i lehtësuar dhe i tërhequr nga vendosmëria jote e butë."
  },
  Scorpio: {
    script: [
      { r: "hej. më fal që s'u ktheva. desha me u shkyç.", c: [{t: "kuptoj. shpresoj jesh mirë", i: 20}, {t: "ku ishe?", i: -10}] },
      { r: "mirë. vëzhgoj njerëz. observoj. e di.", c: [{t: "misterioze si gjithmonë 🦇", i: 15}, {t: "kjo o çuditshme", i: -10}] },
      { r: "s'po mundohem. s'dua me dit të gjithë punët e mia", c: [{t: "sekretet e tua t'sigurta", i: 25}, {t: "ca po fsheh?", i: -15}] },
      { r: "shofim. lidhemi sonte. ndoshta.", c: [{t: "ma bo dmt nëse mbijetove", i: 20}, {t: "pse ndoshta?", i: -10}] }
    ],
    trapQuestion: "po, telefoni im o bllokuar me arsye. mos u mundoni me pa.",
    trapChoices: [ "pse je sekret? ca po fsheh?", "mirë, mbaj dhe unë sekretet e mia." ],
    roast: "Akrepi dëshiron thellësi, të vërtetë dhe besim të thellë. Mos provoko xhelozi ose kërko të qenë i cenueshëm menjëherë para se të ketë besim. Nëse luani lojëra sipërfaqësore me Akrepin, do të ta presë përgjithmonë.",
    solution: "Përputhe privatësinë e tij me pavarësinë tënde misterioze. Fokusohu te jeta jote. Kur Akrepi kupton se nuk ta kontrollon dot qetësinë, fillon të të marrë shumë më seriozisht."
  },
  Sagittarius: {
    script: [
      { r: "yooo më fal, sapo rezervova fluturim për Tiranë këtë fundjavë ✈️", c: [{t: "omg je çmendur, shijoje!", i: 20}, {t: "prit, pa mua?", i: -10}] },
      { r: "duhej! jeta ishte bo rutine", c: [{t: "respektoj spontanitetin 🌴", i: 15}, {t: "po ikën nga problemet", i: -10}] },
      { r: "ndoshta. gjithsesi do jem larg telefonit", c: [{t: "shijoje atmosferën! mos më harro", i: 25}, {t: "s'më shkruan kurrë", i: -15}] },
      { r: "kurrë! festojmë kur t'kthehem. ndonjëherë.", c: [{t: "s'mund ta pres 💅", i: 20}, {t: "kur kthehesh?", i: -10}] }
    ],
    trapQuestion: "po mendoj me zgjat udhëtimin, s'dua me u lidh tani",
    trapChoices: [ "gjithmonë ikën kur bohet serioze.", "domethënë duhet me prit?" ],
    roast: "Shigjetari ka nevojë për liri, aventurë dhe horizont më të gjerë. Mos kërko rutinë ose mundohu ta kontrollosh. Nëse ia ngushton botën, do të ikë.",
    solution: "Tregoi se nuk të duhet ai për të qenë e lumtur. 'Kaloje mirë! Unë po dal me shoqet fundjavën e ardhshme gjithsesi.' Liria i tërheq ata."
  },
  Capricorn: {
    script: [
      { r: "hej, më fal për vonesën. takim pas takimi gjithë ditën 📈", c: [{t: "siguro paratë 💰", i: 20}, {t: "a ndalon ndonjëherë?", i: -10}] },
      { r: "kurrë. grind-i s'ndalet. arrij qëllimet", c: [{t: "e du ambicien", i: 15}, {t: "shumë mërzitshme", i: -10}] },
      { r: "ka rezultate. mund të vonohem sonte, kam dok", c: [{t: "mos u lodh! merr pushim", i: 25}, {t: "prap? kishe premtu", i: -15}] },
      { r: "e di, do t'kompensoj. planifikoj kohën tënde", c: [{t: "t'dërgoj faturën 😂", i: 20}, {t: "s'jam takim biznesi", i: -10}] }
    ],
    trapQuestion: "duhet me anullu takimin, puna vazhdoi. më fal.",
    trapChoices: [ "puna o më e rendesishme se unë.", "nqs do, do gjeje kohë." ],
    roast: "Bricjapi vlerëson respektin, qëllimet dhe strukturën. Mos përqesh ambicien e tij ose krijo skena kaotike emocionale. Ai dashuron nëpërmjet përgjegjësisë, dhe mosrespektimi i kohës së tij e prish menjëherë besimin.",
    solution: "Përgjigju me profesionalizëm të qetë. 'S'ka problem, më njofto kur të lirohesh.' Pastaj hesht. Ata respektojnë njerëzit a të cilëve koha është po aq e vlefshme."
  },
  Aquarius: {
    script: [
      { r: "hej më fal, 3 orë duke lexuar për civilizime antike 👽", c: [{t: "haha sigurisht", i: 20}, {t: "je kaq çuditshme", i: -10}] },
      { r: "fascinuese. njerëzimi është simulim", c: [{t: "pilula e kuqe apo blu? 💊", i: 15}, {t: "flasim për gjëra normale?", i: -10}] },
      { r: "normale o konstrukt. shof yjet sonte", c: [{t: "tingëllon paqësor", i: 25}, {t: "pa mu?", i: -15}] },
      { r: "po dua hapësirë. flasim vonë.", c: [{t: "merre qetë, flasim më vonë", i: 20}, {t: "pse gjithmonë hapësirë?", i: -10}] }
    ],
    trapQuestion: "sinqerisht nuk i dua etiketat. më duket sikur e prishin gjënë.",
    trapChoices: [ "duhet me definu këtë tani.", "kjo o justifikim infantil." ],
    roast: "Ujori ka nevojë për liri, miqësi dhe origjinalitet. Kapja kur kërkon hapësirë ose kërkimi i etiketave standarde e largon menjëherë. Duhet ta respektosh hapësirën personale.",
    solution: "Mos e ndiq për etiketë. Jepi hapësirë, por tërhiq edhe përfitimet e lidhjes. 'Dakord, e mbajmë të lehtë. Atëherë edhe unë do ta marr më lehtë.' Kjo e zgjon pa e shtyrë."
  },
  Pisces: {
    script: [
      { r: "hej... më fal që s'u ktheva. rashë n'gjum, pashë ëndrrën më të çmendur 🌊", c: [{t: "tregomë tani", i: 20}, {t: "gjithë kohën n'gjum", i: -10}] },
      { r: "si jeta e mëparshme. kaq real", c: [{t: "e du këtë. ca ndodhi?", i: 15}, {t: "s'o realitet", i: -10}] },
      { r: "tregom vonë. energjia ime o shteruar", c: [{t: "mbro paqen! pushon", i: 25}, {t: "mos bo justifikime", i: -15}] },
      { r: "thx që e kupton 🥺 lidhemi shpejt", c: [{t: "gjithmonë 🤍", i: 20}, {t: "më mirë", i: -10}] }
    ],
    trapQuestion: "po e prish magjinë, po sillesh ashper.",
    trapChoices: [ "po sillesh dramatik. s'o film.", "s'bohem përgjegjëse per ndjenjat e tua." ],
    roast: "Peshqit dëshirojnë magji, butësi dhe thellësi emocionale. Ata duan simbole dhe botë private. Të tallesh me ndjeshmërinë e tyre ose ta shkatërrosh magjinë me cinizëm shkatërron lidhjen.",
    solution: "Hidhju imagjinatës por mbaj kufijtë e tua të fortë. Validoja ndjenjat e tij pa u bërë terapistja e tij emocionale."
  }
};

const genericData = {
  script: [
    { r: "hej, më fal për vonesën. kam qenë shumë i zënë", c: [{t: "s'ka gjë, edhe unë", i: 20}, {t: "gjithmonë kështu", i: -10}] },
    { r: "si po t'shkon dita?", c: [{t: "mirë, tu u relaksu", i: 15}, {t: "horrible, tu t'prit ty", i: -15}] },
    { r: "bukur. dal sonte", c: [{t: "kaloje mirë!", i: 25}, {t: "mund t'vi?", i: -15}] },
    { r: "shofim. le t'takhemi shpejt", c: [{t: "sigurt", i: 20}, {t: "ok kur?", i: -10}] }
  ],
  trapQuestion: "nuk di, mund t'anulloj. ndoshta javën tjetër.",
  trapChoices: [
    "po m'injoron?",
    "mirë, jeto jetën."
  ],
  roast: "Mesazhet e dyfishta nga ankthi e shtojnë distancën. Pa dashje, i tregon se humori yt varet nga përgjigjja e tij.",
  solution: "Vëre telefonin në modalitet 'mos shqetëso' dhe shko të jetosh. Heshtja është mesazhi më i fuqishëm kur ai tërhiqet."
};

const goalChatData = {
  // QËLLIMI 1: T'ia kaloj egon ballkanike
  ego: {
    script: [
      { r: "oj, ca bëre me atë gjë? e zgjidha vetë, mos u merak", c: [{t: "e di, ke kokë. ca vendose?", i: 22}, {t: "pse s'u konsultove me mua?", i: -12}] },
      { r: "nuk ka nevojë. i di punët e mia", c: [{t: "e kuptoj. di që je i zgjuar me to.", i: 20}, {t: "po ti gjithmonë mendon se di gjithçka", i: -15}] },
      { r: "sepse di. gjithsesi, si u zgjidh puna jote?", c: [{t: "shkoi mirë, po mendon vetë tani", i: 25}, {t: "mos ndërro temën", i: -10}] },
      { r: "mirë. duhet me u pa, kam diçka t'tregoj", c: [{t: "kur t'dush, jam. nuk ngut", i: 20}, {t: "tani! ca ke?!", i: -10}] }
    ],
    trapQuestion: "po ti s'e kupton si funksionojnë gjërat, mos u fut",
    trapChoices: [
      { t: "po unë po t'ndihmoj, pse je kaq i vrazhdë?", i: -35 },
      { t: "ok, bëj si të duash. do ta shohësh vetë.", i: -35 }
    ],
    roast: "Burri ballkanik nuk pranon kritikë direkte — e percepton si sulm ndaj krenarisë. Kur e sfidove frontalisht ose u dorëzove plotësisht, humbe të dyja. Egoja e tij u aktivizua ose e humbi respektin.",
    solution: "Te burri me krenari, ideja duhet t'i tingëllojë si përfundim i vet. Mos ia përplas. Thuaje qetë, me respekt, derisa ta shohë si zbulim personal. Kjo nuk është lojë — është inteligjencë emocionale."
  },
  // QËLLIMI 2: Xhelozia → besnikëri
  jealousy: {
    script: [
      { r: "kush ishte ai tipi me ty sonte?", c: [{t: "kolegu i punës. pse?", i: 20}, {t: "çfarë, po më spiunon?", i: -12}] },
      { r: "thjesht pyeta. nuk m'pëlqen", c: [{t: "e kuptoj. po ai s'ka lidhje, ti ke.", i: 22}, {t: "nuk ke të drejtë të pyesësh kështu", i: -15}] },
      { r: "ok ok. s'dua grindje. ti je e imja", c: [{t: "jam me ty. po nuk jam pronë e askujt.", i: 25}, {t: "po jam jotja, relaksohu", i: -12}] },
      { r: "e dua atë që kemi, po ti e shtrembëron kur flas seriozisht", c: [{t: "sepse dashuria s'është kontroll. është besim.", i: 22}, {t: "nuk po flas seriozisht, po bën dramë", i: -10}] }
    ],
    trapQuestion: "mos dil me ato shoqet t'reja, s'i njoh",
    trapChoices: [
      { t: "ok, s'dal nqs s'të pëlqen", i: -35 },
      { t: "s'e pranoj të më vendosësh kufij nga frika jote", i: -35 }
    ],
    roast: "Me burrin xheloz, dy gabime prishin gjithçka: dorëzimi total ia rrit kontrollin; sulmi frontal ia ndez mbrojtjen. Asnjëra nuk të jep siguri.",
    solution: "Xhelozia e tij shpesh vjen nga frika e humbjes, jo nga dashuria e pjekur. Kur i tregon qartë se je e lirë dhe prapë po zgjedh të jesh me të, frika mund të kthehet në siguri. Duhet fjalia e duhur."
  },
  // QËLLIMI 3: Motivim financiar
  money: {
    script: [
      { r: "s'ka punë normale këtu, çfarë të bësh", c: [{t: "po, koha është e vështirë. po ti ke aftësi, ke mundësi", i: 22}, {t: "pse s'kërkon punë tjetër?", i: -12}] },
      { r: "thashë po mundohem. s'o aq e thjeshtë", c: [{t: "e di. njëri te miku po bënte mirë me atë fushë, të intereson?", i: 20}, {t: "të tjerët gjejnë, pse jo ti?", i: -15}] },
      { r: "ndoshta. po kush më ndihmon?", c: [{t: "ti e di vetë. thjesht po e ul shumë veten tani", i: 25}, {t: "unë të ndihmoj, eja", i: -10}] },
      { r: "hm. ndoshta ke t'drejtë. le ta shoh", c: [{t: "shoh kur ia nis. s'nxitoj", i: 22}, {t: "kur fillon? tani!", i: -10}] }
    ],
    trapQuestion: "s'ia vlen mundimi, gjithçka është sistemi",
    trapChoices: [
      { t: "ke të drejtë, gjithçka është e korruptuar", i: -35 },
      { t: "kjo është justifikim, duhet të punosh", i: -35 }
    ],
    roast: "Shumë burra ballkanikë e marrin ndihmën nga gruaja si turp, edhe kur në të vërtetë kanë nevojë për drejtim. Kur i dhe të drejtë tepër, i mbylle rrugën; kur e kritikove, ia bllokove krenarinë.",
    solution: "Mos ia thuaj si urdhër. Jepja si ide që ruan krenarinë e tij dhe e bën të ndihet burrë që po merr vendim. Guida ka tekstet e sakta për çdo shenjë."
  },
  // QËLLIMI 4: Angazhim
  commit: {
    script: [
      { r: "e du ca kemi. s'dua presion", c: [{t: "as unë. po dua qartësi.", i: 22}, {t: "ok, pres sa t'dush", i: -12}] },
      { r: "qartësi si?", c: [{t: "ose e bëjmë serioze, ose e mbajmë të lehtë. ndryshon mënyra si sillemi.", i: 20}, {t: "si... më do apo jo?", i: -15}] },
      { r: "s'e kisha mendu kshu", c: [{t: "normale. s'jom bo zemëru, thjesht s'bëj 'të paqartë'.", i: 24}, {t: "duhet me vendos tani", i: -12}] },
      { r: "s'dua me t'humb. lëviz ngadalë", c: [{t: "ngadalë o ok. i papërcaktuar s'o.", i: 22}, {t: "provoje tani", i: -10}] }
    ],
    trapQuestion: "mund ta mbajmë pa etiketë po t'vazhdojmë njëjtë?",
    trapChoices: [
      { t: "ok, s'dua me t'humb", i: -35 },
      { t: "jo, vendos tani ca jemi", i: -35 }
    ],
    roast: "Burri ballkanik bën angazhimin kur ndjen se po humb diçka të vlefshme — jo kur i bëhet presion. Kur u dorëzove ose e shtrënge, asnjëra s'funksionoi.",
    solution: "Vendos strukturë të qetë, pa ultimatum. Mos i jep përfitimet e një lidhjeje serioze derisa ai të vendosë vetë. Duhet fjalia e saktë."
  }
};

// --- ELEMENTET DOM ---
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const step4 = document.getElementById('step-4');
const step5 = document.getElementById('step-5');

const form = document.getElementById('onboarding-form');
const chatWindow = document.getElementById('chat-window');
const choicesContainer = document.getElementById('choices-container');
const choicesList = document.getElementById('choices-list');
const progressBar = document.getElementById('progress-bar');
const progressTextValue = document.getElementById('progress-text-value');
const chatTitle = document.getElementById('chat-title');
const progressLabel = document.getElementById('progress-label');

const goalLabels = {
  ego:      'Sa fort po mban krenarinë',
  jealousy: 'Sa shumë po e ha xhelozia',
  money:    'Sa po zgjohet',
  commit:   'Sa afër seriozitetit është'
};

// --- HAPI 1: LOGJIKA E FORMULARIT ME HAPA ---
const formSteps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const onboardingProgress = document.getElementById('onboarding-progress');
let currentFormStep = 0;

function updateFormProgress() {
  const percent = ((currentFormStep + 1) / formSteps.length) * 100;
  onboardingProgress.style.width = `${percent}%`;
}

function advanceFormStep() {
  const currentStepEl = formSteps[currentFormStep];
  const stepNum = currentFormStep + 1;
  
  const stepData = { step: stepNum };
  const signInput = document.getElementById('user-sign');
  const crushInput = document.getElementById('crush-sign');
  const vibeInput = document.getElementById('vibe');
  const goalInput = document.getElementById('goal');
  if (signInput && signInput.value) stepData.user_sign = signInput.value;
  if (crushInput && crushInput.value) stepData.crush_sign = crushInput.value;
  if (vibeInput && vibeInput.value) stepData.vibe = vibeInput.value;
  if (goalInput && goalInput.value) stepData.goal = goalInput.value;
  window.track('quiz_step_completed', stepData);

  formSteps[currentFormStep].classList.remove('active');
  formSteps[currentFormStep].classList.add('hidden');
  
  currentFormStep++;
  
  if (currentFormStep < formSteps.length) {
    formSteps[currentFormStep].classList.remove('hidden');
    formSteps[currentFormStep].classList.add('active');
    updateFormProgress();
  }
}

nextBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = formSteps[currentFormStep].querySelector('input');
    if (!input.value) {
      input.style.borderColor = 'red';
      return;
    }
    input.style.borderColor = '#ddd';
    advanceFormStep();
  });
});

const optionBtns = document.querySelectorAll('.option-btn');
optionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const container = btn.closest('.options-grid, .options-list');
    const targetId = container.dataset.target;
    const input = document.getElementById(targetId);
    
    container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    input.value = btn.dataset.value;
    
    setTimeout(() => {
      advanceFormStep();
    }, 150);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  state.userName = document.getElementById('user-name').value;
  state.userSign = document.getElementById('user-sign').value;
  state.crushSign = document.getElementById('crush-sign').value;
  state.vibe = document.getElementById('vibe').value;
  state.goal = document.getElementById('goal').value;

  if (state.userName && state.userName.trim().toLowerCase() === 'joe') {
    if (window.posthog) {
      window.posthog.stopSessionRecording();
    }
  }

  window.identifyUser(state.userName);
  window.track('quiz_submitted', {
    user_sign: state.userSign,
    crush_sign: state.crushSign,
    vibe: state.vibe,
    goal: state.goal,
    name_provided: !!state.userName,
  });

  chatTitle.innerText = `${getSignName(state.crushSign)} 🔮`;
  progressLabel.innerText = goalLabels[state.goal] || 'Sa shumë po afrohet';
  
  const loading = document.getElementById('loading-overlay');
  loading.classList.remove('hidden');

  setTimeout(() => {
    loading.classList.add('hidden');
    switchStep(step1, step2);
    window.track('chat_simulation_started', {
      crush_sign: state.crushSign,
      goal: state.goal,
    });
    startChatSimulation();
  }, 1500);
});

// --- MOTORI I CHAT-IT ---
function switchStep(from, to) {
  from.classList.remove('active');
  from.classList.add('hidden');
  to.classList.remove('hidden');
  to.classList.add('active');
}

function updateProgress(value) {
  state.progress = value;
  progressBar.style.width = `${value}%`;
  progressTextValue.innerText = `${value}%`;
}

function getActiveChatData() {
  const signData = zodiacData[state.crushSign] || genericData;
  const goalData = goalChatData[state.goal];
  return goalData ? { ...signData, ...goalData } : signData;
}

function getGoalPaywallCopy() {
  const goal = state.goal || 'ego';
  const sign = state.crushSign;
  const matrix = egoCopy[goal] || egoCopy.ego;
  return matrix[sign] || matrix._default;
}

function applyGoalCtaCopy() {
  const goal = state.goal || 'ego';
  const copy = getGoalPaywallCopy();
  const roastTease = document.getElementById('roast-tease');
  const roastCtaText = document.getElementById('roast-cta-text');
  if (roastTease) roastTease.innerText = roastTeaseCopy[goal] || roastTeaseCopy.ego;
  if (roastCtaText) roastCtaText.innerText = copy.cta;
}

function appendMessage(text, type, status = '') {
  const wrapper = document.createElement('div');
  wrapper.className = `msg-wrapper ${type}`;
  
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  if (status === 'error') bubble.classList.add('failed');
  bubble.innerText = text;
  
  wrapper.appendChild(bubble);

  if (status) {
    const statusEl = document.createElement('div');
    statusEl.className = `msg-status ${status === 'error' ? 'error' : ''}`;
    statusEl.innerText = status === 'error' ? 'Nuk u Dorëzua' : status;
    wrapper.appendChild(statusEl);
  }

  chatWindow.appendChild(wrapper);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator() {
  const wrapper = document.createElement('div');
  wrapper.className = 'msg-wrapper received typing-indicator-wrapper';
  wrapper.id = 'typing-indicator';
  
  const bubble = document.createElement('div');
  bubble.className = 'typing-indicator';
  bubble.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  
  wrapper.appendChild(bubble);
  chatWindow.appendChild(wrapper);
  window.scrollTo(0, document.body.scrollHeight);
}

function removeTypingIndicator() {
  const ind = document.getElementById('typing-indicator');
  if (ind) ind.remove();
}

function renderChoices(choices, callback) {
  choicesList.innerHTML = '';
  choices.forEach(choiceObj => {
    const text = typeof choiceObj === 'string' ? choiceObj : (choiceObj.text || choiceObj.t);
    const impact = typeof choiceObj === 'string' ? 0 : (choiceObj.impact || choiceObj.i || 0);
    
    const btn = document.createElement('div');
    btn.className = 'choice-btn';
    btn.innerText = text;
    btn.onclick = () => {
      choicesContainer.classList.remove('active');
      appendMessage(text, 'sent');
      window.track('chat_choice_made', {
        choice_text: text,
        impact: impact,
        crush_sign: state.crushSign,
        goal: state.goal,
        is_good_choice: impact > 0,
      });
      callback(impact, choiceObj, text);
    };
    choicesList.appendChild(btn);
  });
  choicesContainer.classList.remove('hidden');
  
  setTimeout(() => {
    choicesContainer.classList.add('active');
  }, 50);
}

// --- LOGJIKA E SKRIPTIT TË CHAT-IT ---
function startChatSimulation() {
  state.progress = 15;
  updateProgress(state.progress);
  setTimeout(() => playDynamicTurn(0), 1000);
}

function playDynamicTurn(turnIndex) {
  const data = getActiveChatData();
  const turnData = data.script[turnIndex];

  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage(turnData.r, 'received');
    
    setTimeout(() => {
      renderChoices(turnData.c, (impact) => {
        let newProg = Math.max(0, Math.min(100, state.progress + impact));
        updateProgress(newProg);
        
        if (turnIndex === 3) {
          document.querySelector('.progress-container').classList.add('pulse');
          setTimeout(() => playTurn5(), 1500);
        } else {
          setTimeout(() => playDynamicTurn(turnIndex + 1), 1000);
        }
      });
    }, 1000);
  }, 2000);
}

function playTurn5() {
  const data = getActiveChatData();
  
  const timeJump = document.createElement('div');
  timeJump.style.textAlign = 'center';
  timeJump.style.color = '#888';
  timeJump.style.fontSize = '11px';
  timeJump.style.margin = '16px 0';
  timeJump.innerText = 'Sot 16:12';
  chatWindow.appendChild(timeJump);

  appendMessage(data.trapQuestion, 'received');

  setTimeout(() => {
    renderChoices(data.trapChoices, () => {
      setTimeout(() => {
        state.chatOutcome = 'fail';
        updateProgress(0);

        const lastSent = chatWindow.lastChild;
        progressBar.classList.add('critical');
        progressTextValue.classList.add('critical');
        lastSent.querySelector('.msg-bubble').classList.add('failed');
        const err = document.createElement('div');
        err.className = 'msg-status error';
        err.innerText = 'Lexuar 16:15 - U Injorua';
        lastSent.appendChild(err);

        setTimeout(() => {
          prepareInterstitial();
          switchStep(step2, step3);
          window.track('trap_triggered', {
            crush_sign: state.crushSign,
            goal: state.goal,
            outcome: state.chatOutcome,
            progress_at_trap: state.progress,
          });
        }, 2000);
      }, 500);
    });
  }, 1500);
}

function prepareInterstitial() {
  const title = document.querySelector('#step-3 h2');
  const body = document.querySelector('#step-3 p');
  const button = document.getElementById('btn-panic');

  if (title) title.innerText = 'Gabim. Lidhja u pre.';
  if (body) body.innerText = 'Mesazhi yt i fundit aktivizoi mekanizmin e shmangies së tij.';
  if (button) button.innerText = 'Prit... çfarë bëra gabim?!';
}

// --- HAPAT 3 & 4: PANIKU DHE ROAST ---
document.getElementById('btn-panic').addEventListener('click', () => {
  window.track('roast_generation_started', { crush_sign: state.crushSign, goal: state.goal, outcome: state.chatOutcome });
  const loading = document.getElementById('roast-loading');
  const loadingText = document.getElementById('roast-loading-text');
  loading.classList.remove('hidden');
  
  setTimeout(() => loadingText.innerText = `Duke analizuar psikologjinë e ${getSignGenitive(state.crushSign)}...`, 1500);
  setTimeout(() => loadingText.innerText = "Duke identifikuar modelin e lidhjes...", 3000);
  setTimeout(() => loadingText.innerText = "Duke lidhur shenjat e sjelljes...", 4500);
  setTimeout(() => loadingText.innerText = "Duke gjeneruar Raportin e Gabimit...", 6000);

  const data = getActiveChatData();
  const roastHeader = document.querySelector('#step-4 .roast-header h2');
  const insightTitle = document.querySelector('#roast-insight')?.closest('.insight-card')?.querySelector('h3');
  const solutionTitle = document.querySelector('#roast-solution')?.closest('.insight-card')?.querySelector('h3');

  if (roastHeader) roastHeader.innerHTML = `Moj... këtë nuk e bëjmë, <span id="roast-name"></span>.`;
  if (insightTitle) insightTitle.innerText = 'E vërteta:';
  if (solutionTitle) solutionTitle.innerText = 'Çfarë funksionon më mirë:';

  document.getElementById('roast-name').innerText = state.userName;
  document.getElementById('roast-insight').innerText = data.roast;
  document.getElementById('roast-solution').innerText = data.solution;
  applyGoalCtaCopy();

  setTimeout(() => {
    loading.classList.add('hidden');
    switchStep(step3, step4);
    window.track('roast_revealed', { crush_sign: state.crushSign, goal: state.goal, outcome: state.chatOutcome });
    window.scrollTo(0,0);
  }, 7500);
});

// --- MATRICA E KOPJES (qëllim × shenjë) ---
const egoCopy = {
  // ── QËLLIMI: ego — T'ia kaloj egon ballkanike ────────────────────────
  ego: {
    Aries:       { eyebrow: "Sekreti i Dashit",          headline: "Si t'ia thuash idenë <span id='paywall-sign'>Dashit</span> pa ia ndezur menjëherë mbrojtjen.",                         subline: "Ai do të ndihet se vendosi vetë. Ti thjesht ia hape rrugën.", tease: "Dashi ballkanik do të drejtojë. Kur di si t'ia flasësh krenarisë, ai lëviz pa e kthyer gjithçka në luftë.",                 cta: "Më trego sekretin e Dashit →",   note: "Fjalia e duhur është në guidë." },
    Taurus:      { eyebrow: "Arti i Demit",              headline: "Si t'i flasësh <span id='paywall-sign'>Demit</span> që të lëvizë pa ia prekur kokëfortësinë.",                          subline: "Durimi yt është forcë. Jo dobësi.",                         tease: "Demi ballkanik nuk lëviz me urdhër. Lëviz kur ndjen siguri, respekt dhe dëshirë të vetën.",                                   cta: "Më trego artin e Demit →",      note: "Fjalia e duhur është në guidë." },
    Gemini:      { eyebrow: "Çelësi i Binjakëve",        headline: "Si ta çosh <span id='paywall-sign'>Binjakun</span> drejt idesë tënde pa e mbytur me seriozitet.",                       subline: "Mendon shpejt. Fol me ritmin e tij.",                       tease: "Binjakët mendon se është gjithmonë ai me idetë. Fjalia e duhur e bën bisedën të lehtë, por drejtimi mbetet në dorën tënde.", cta: "Më trego çelësin e Binjakut →", note: "Fjalia e duhur është në guidë." },
    Cancer:      { eyebrow: "Hapi i Gaforres",           headline: "Si ta bësh <span id='paywall-sign'>Gaforrën</span> të marrë iniciativë duke u ndjerë i nevojshëm, jo i shtyrë.",       subline: "Ai s'pranon urdhra — pranon të kujdeset.",                 tease: "Burri Gaforr ballkanik duhet të ndihet mbrojtës. Kur ia lidh veprimin me kujdesin, ai lëviz vetë.",                           cta: "Më trego hapin e Gaforres →",   note: "Fjalia e duhur është në guidë." },
    Leo:         { eyebrow: "Kurora e Luanit",           headline: "Si t'i flasësh <span id='paywall-sign'>Luanit</span> që të dëgjojë pa u ndjerë i ulur.",                                subline: "Ai do respekt. Ti do qartësi.",                             tease: "Luani ballkanik do të ndihet hero. Kur ia njeh krenarinë pa e harruar veten, ai bëhet më i hapur.",                           cta: "Më trego kurorën e Luanit →",  note: "Fjalia e duhur është në guidë." },
    Virgo:       { eyebrow: "Logjika e Virgjëreshës",    headline: "Si ta çosh <span id='paywall-sign'>Virgjëreshën</span> drejt qartësisë pa e kthyer bisedën në debat.",                  subline: "Analiza e tij. Qetësia jote.",                              tease: "Virgjëresha ballkanik respekton logjikën dhe strukturën. Fjalia e duhur e bën të dëgjojë pa u ndjerë i sulmuar.",             cta: "Më trego logjikën e Virgjëreshës →", note: "Fjalia e duhur është në guidë." },
    Libra:       { eyebrow: "Balanca e Peshorës",        headline: "Si ta ndihmosh <span id='paywall-sign'>Peshorën</span> të vendosë pa e shtyrë me presion.",                              subline: "Ai peshon gjithçka. Ti sjell qartësi.",                     tease: "Peshorja ballkanik nuk vendos lehtë. Kur opsionet i vendosen qartë, ai e sheh vetë rrugën më të mirë.",                       cta: "Më trego balancën e Peshorës →", note: "Fjalia e duhur është në guidë." },
    Scorpio:     { eyebrow: "Lëvizja e Akrepit",         headline: "Si ta lexosh <span id='paywall-sign'>Akrepin</span> pa e bërë të ndihet i kontrolluar.",                              subline: "Ai kontrollon shumë. Ti ruan qetësinë.",                    tease: "Akrepi ballkanik mendon se lexon gjithçka. Kur ti flet shkurt, qartë dhe pa frikë, ai të merr seriozisht.",                   cta: "Më trego lëvizjen e Akrepit →", note: "Fjalia e duhur është në guidë." },
    Sagittarius: { eyebrow: "Liria e Shigjetarit",       headline: "Si t'i flasësh <span id='paywall-sign'>Shigjetarit</span> pa e bërë të ndihet i mbyllur.",                               subline: "Ai ikën nga kafazet. Bëhu horizont, jo mur.",               tease: "Shigjetari ballkanik ka frikë nga rutina. Kur biseda ndihet si mundësi, jo si presion, ai afrohet.",                         cta: "Më trego lirinë e Shigjetarit →", note: "Fjalia e duhur është në guidë." },
    Capricorn:   { eyebrow: "Investimi i Bricjapit",     headline: "Si ta bësh <span id='paywall-sign'>Bricjapin</span> ta shohë idenë tënde si zgjedhje të mençur.",                       subline: "Ai mendon gjatë. Jepi arsye të forta.",                     tease: "Bricjapi ballkanik vendos me logjikë dhe respekt. Kur ia vendos bisedën si vendim të pjekur, ai lëviz më lehtë.",             cta: "Më trego investimin e Bricjapit →", note: "Fjalia e duhur është në guidë." },
    Aquarius:    { eyebrow: "Filozofia e Ujorit",        headline: "Si ta bësh <span id='paywall-sign'>Ujorin</span> ta shohë idenë tënde si zbulim të vetin.",                            subline: "Ai mendon ndryshe nga të gjithë. Fol në gjuhën e tij.",      tease: "Ujori ballkanik do të ndihet i lirë dhe i veçantë. Kur ideja jote tingëllon si parim, ai e merr seriozisht.",                cta: "Më trego filozofinë e Ujorit →", note: "Fjalia e duhur është në guidë." },
    Pisces:      { eyebrow: "Ëndrra e Peshqve",          headline: "Si t'i flasësh <span id='paywall-sign'>Peshqve</span> që ta ndiejë idenë si diçka të përbashkët.",                      subline: "Ai beson në shenja. Jepi kuptim, jo presion.",              tease: "Peshqit ballkanik jeton me simbole dhe ndjesi. Kur fjalia jote prek emocionin, ai hapet pa u mbrojtur.",                      cta: "Më trego ëndrrën e Peshqve →",  note: "Fjalia e duhur është në guidë." },
    _default:    { eyebrow: "Arti i ndikimit",           headline: "Si ta thuash atë që do — pa ia ndezur egon dhe pa e ulur veten.",                                                     subline: "Qetësi. Standard. Drejtim.",                               tease: "Burri ballkanik rrallë pranon të komandohet. Por kur kupton gjuhën e krenarisë së tij, ti e drejton bisedën pa u bërë e ashpër.", cta: "Më trego artin e ndikimit →",   note: "Fjalia e duhur është në guidë." },
  },
  // ── QËLLIMI: jealousy — Xhelozia → besnikëri ──────────────────────────
  jealousy: {
    Aries:       { eyebrow: "Zjarri i Dashit",           headline: "Si ta kthesh xhelozinë e <span id='paywall-sign'>Dashit</span> në siguri, jo në grindje.",                              subline: "Ai reagon shpejt kur ka frikë të humbasë.",                 tease: "Dashi ballkanik ndizet kur ndihet i pasigurt. Fjalia e duhur i tregon se je e lirë, por po zgjedh me vetëdije.",              cta: "Më trego zjarrin e Dashit →",  note: "Fjalia e duhur është në guidë." },
    Taurus:      { eyebrow: "Besimi i Demit",            headline: "Si ta bësh <span id='paywall-sign'>Demin</span> të ndihet i sigurt pa të kufizuar ty.",                                  subline: "Ai qetësohet kur ndjen stabilitet, jo kur merr kontroll.",   tease: "Demi ballkanik mban fort atë që vlerëson. Kur flet me qetësi dhe standard, ai e kupton se besimi është më i fortë se kontrolli.", cta: "Më trego besimin e Demit →",   note: "Fjalia e duhur është në guidë." },
    Gemini:      { eyebrow: "Besnikëria e Binjakut",     headline: "Si ta bësh <span id='paywall-sign'>Binjakun</span> të zgjedhë ty pa ia mbyllur frymën.",                                subline: "Ai s'mbahet me presion. Fitohet me lehtësi dhe siguri.",    tease: "Binjakët ballkanik bëhet i paqetë kur ndihet i pasigurt. Trego pavarësi pa dramë dhe ai afrohet vetë.",                      cta: "Më trego besnikërinë e Binjakut →", note: "Fjalia e duhur është në guidë." },
    Cancer:      { eyebrow: "Kujdesi i Gaforres",        headline: "Si t'ia kthesh <span id='paywall-sign'>Gaforres</span> xhelozinë në kujdes të qetë.",                                    subline: "Ai dëshiron të mbrojë, jo të të zotërojë.",                 tease: "Gaforrja ballkanik ngatërron shpesh kujdesin me zotërimin. Fjalia e saktë e çon nga 'ku ishe?' te 'a je mirë?'.",             cta: "Më trego kujdesin e Gaforres →", note: "Fjalia e duhur është në guidë." },
    Leo:         { eyebrow: "Krenaria e Luanit",         headline: "Si ta bësh <span id='paywall-sign'>Luanin</span> të ndihet i sigurt me ty pa u bërë e vogël.",                           subline: "Ai qetësohet kur ndihet i zgjedhur, jo kur ti dorëzohesh.", tease: "Luani ballkanik ashpërsohet kur i preket egoja. Një frazë e saktë i jep siguri pa ta marrë lirinë.",                      cta: "Më trego krenarinë e Luanit →", note: "Fjalia e duhur është në guidë." },
    Virgo:       { eyebrow: "Qartësia e Virgjëreshës",   headline: "Si t'i japësh <span id='paywall-sign'>Virgjëreshës</span> arsye për besim, jo arsye për dyshim.",                       subline: "Ai analizon rrezikun. Jepi qartësi.",                       tease: "Virgjëresha ballkanik qetësohet kur gjërat janë të qarta. Fjalia e duhur vendos kufi dhe jep siguri pa u ulur poshtë.",       cta: "Më trego qartësinë e Virgjëreshës →", note: "Fjalia e duhur është në guidë." },
    Libra:       { eyebrow: "Harmonia e Peshorës",       headline: "Si ta kthesh tensionin e <span id='paywall-sign'>Peshorës</span> në dialog të qetë dashurie.",                           subline: "Ai urren konfliktin, por shpesh e krijon vetë.",             tease: "Peshorja ballkanik xhelozohet, por nuk e duron dramën. Fjalia e duhur hap bisedë pa e bërë skenë.",                          cta: "Më trego harmoninë e Peshorës →", note: "Fjalia e duhur është në guidë." },
    Scorpio:     { eyebrow: "Besimi i Akrepit",          headline: "Si ta kthesh frikën e <span id='paywall-sign'>Akrepit</span> në besim të thellë.",                                        subline: "Ai mban fort kur ka frikë. Ti mban standardin.",             tease: "Akrepi ballkanik bëhet intensiv kur i trembet humbjes. Fjalia e duhur i tregon siguri pa i dorëzuar kontrollin.",             cta: "Më trego besimin e Akrepit →",  note: "Fjalia e duhur është në guidë." },
    Sagittarius: { eyebrow: "Liria e Shigjetarit",       headline: "Si ta bësh <span id='paywall-sign'>Shigjetarin</span> të besojë pa u ndjerë i mbyllur.",                                  subline: "Ai afrohet kur lidhja nuk i duket kafaz.",                  tease: "Shigjetari ballkanik bëhet i paqetë kur ndihet i zënë ngushtë. Tregoji se nuk je kafaz, por zgjedhje.",                       cta: "Më trego lirinë e Shigjetarit →", note: "Fjalia e duhur është në guidë." },
    Capricorn:   { eyebrow: "Respekti i Bricjapit",      headline: "Si ta bësh <span id='paywall-sign'>Bricjapin</span> të të respektojë aq shumë sa nuk ka nevojë për kontroll.",           subline: "Ai qetësohet kur sheh vlerë dhe qëndrueshmëri.",             tease: "Bricjapi ballkanik kontrollon kur nuk ka besim të plotë. Fjalia e saktë ndërton respekt, dhe respekti ul xhelozinë.",          cta: "Më trego respektin e Bricjapit →", note: "Fjalia e duhur është në guidë." },
    Aquarius:    { eyebrow: "Besimi i Ujorit",           headline: "Si ta bësh <span id='paywall-sign'>Ujorin</span> të zgjedhë besimin si parim të vetin.",                                 subline: "Ai urren posesivitetin, edhe kur i del vetë.",              tease: "Ujori ballkanik do të ndihet i drejtë dhe modern. Kur ia vendos besimin si vlerë, ai e mbron vetë atë ide.",                  cta: "Më trego besimin e Ujorit →",  note: "Fjalia e duhur është në guidë." },
    Pisces:      { eyebrow: "Magjia e Peshqve",          headline: "Si ta kthesh frikën e <span id='paywall-sign'>Peshqve</span> nga humbja në kujdes të thellë.",                           subline: "Ai xhelozohet kur ndihet emocionalisht i pasigurt.",        tease: "Peshqit ballkanik ka nevojë për siguri emocionale. Fjalia e duhur e qetëson pa të mbyllur ty.",                              cta: "Më trego magjinë e Peshqve →",  note: "Fjalia e duhur është në guidë." },
    _default:    { eyebrow: "Kthesa e xhelozisë",        headline: "Si ta kthesh xhelozinë e tij në siguri dhe besnikëri të pjekur.",                                                        subline: "Frika nuk duhet të bëhet kafaz.",                           tease: "Çdo burrë ballkanik xhelozohet ndryshe, sipas krenarisë dhe frikës së tij. Guida të jep fjalinë që vendos kufi dhe jep siguri.", cta: "Më trego kthesën e xhelozisë →", note: "Fjalia e duhur është në guidë." },
  },
  // ── QËLLIMI: money — Motivim financiar ────────────────────────────────
  money: {
    Aries:       { eyebrow: "Fitorja e Dashit",           headline: "Si ta bësh <span id='paywall-sign'>Dashin</span> të dojë të fitojë më shumë — pa i thënë 'duhet'.",                    subline: "Dashi lufton. Tregoji betejën që ia vlen.",                 tease: "Dashi ballkanik reagon ndaj sfidës. Kur fjalia jote i prek krenarinë në mënyrë të zgjuar, ai vepron vetë.",                  cta: "Më trego fitoren e Dashit →",   note: "Fjalia e duhur është në guidë." },
    Taurus:      { eyebrow: "Rehatia e Demit",            headline: "Si ta bësh <span id='paywall-sign'>Demin</span> të mendojë për të ardhmen pa u ndjerë i kritikuar.",                   subline: "Ai do stabilitet. Tregoji çfarë mund të ndërtoni.",         tease: "Demi ballkanik lëviz kur e sheh qartë rehatinë dhe sigurinë që po ndërtohet.",                                                cta: "Më trego rehatinë e Demit →",  note: "Fjalia e duhur është në guidë." },
    Gemini:      { eyebrow: "Inovacioni i Binjakut",      headline: "Si ta bësh <span id='paywall-sign'>Binjakun</span> t'i shohë mundësitë si diçka të re, jo si presion.",                 subline: "Ai nuk do leksion. Do ide që e zgjojnë.",                   tease: "Binjakët ballkanik mërzitet nga rutina. Kur mundësia duket interesante dhe e lehtë, ai hapet më shpejt.",                     cta: "Më trego inovacionin e Binjakut →", note: "Fjalia e duhur është në guidë." },
    Cancer:      { eyebrow: "Familja e Gaforres",         headline: "Si ta motivosh <span id='paywall-sign'>Gaforrën</span> duke ia lidhur rritjen me kujdesin dhe familjen.",              subline: "Ai lëviz për njerëzit që do.",                              tease: "Gaforrja ballkanik shpesh nuk lëviz për veten, por lëviz për ata që i do. Fjalia e duhur e lidh ambicien me dashurinë.",      cta: "Më trego familjen e Gaforres →", note: "Fjalia e duhur është në guidë." },
    Leo:         { eyebrow: "Statusi i Luanit",           headline: "Si ta bësh <span id='paywall-sign'>Luanin</span> ta shohë suksesin si pjesë të krenarisë së tij.",                      subline: "Ai do të admirohet. Suksesi ia jep atë ndjesi.",             tease: "Luani ballkanik kujdeset shumë për imazhin. Kur rritja lidhet me respektin, ai e merr më seriozisht.",                       cta: "Më trego statusin e Luanit →",  note: "Fjalia e duhur është në guidë." },
    Virgo:       { eyebrow: "Plani i Virgjëreshës",       headline: "Si ta ndihmosh <span id='paywall-sign'>Virgjëreshën</span> të kalojë nga analizimi në veprim.",                         subline: "Ai ka planin. I duhet qartësi për hapin tjetër.",            tease: "Virgjëresha ballkanik mund të analizojë pafund. Fjalia e duhur i jep strukturë pa e bërë të ndihet i shtyrë.",                cta: "Më trego planin e Virgjëreshës →", note: "Fjalia e duhur është në guidë." },
    Libra:       { eyebrow: "Ekuilibri i Peshorës",       headline: "Si ta bësh <span id='paywall-sign'>Peshorën</span> të vendosë për mundësinë — pa u bllokuar nga dyshimet.",             subline: "Ai peshon gjithmonë. Jepi njërës anë peshën e duhur.",      tease: "Peshorja ballkanik bllokohet nga frika e vendimit të gabuar. Fjalia e saktë ia zbut frikën dhe ia kthen qartësinë.",          cta: "Më trego ekuilibrin e Peshorës →", note: "Fjalia e duhur është në guidë." },
    Scorpio:     { eyebrow: "Fuqia e Akrepit",            headline: "Si ta bësh <span id='paywall-sign'>Akrepin</span> ta shohë rritjen financiare si fuqi të qetë.",                        subline: "Ai dëshiron të ndihet i fortë, jo i shtyrë.",               tease: "Akrepi ballkanik reagon ndaj fuqisë dhe respektit. Kur suksesi paraqitet si pavarësi e vërtetë, ai aktivizohet pa u ndjerë i komanduar.", cta: "Më trego fuqinë e Akrepit →",   note: "Fjalia e duhur është në guidë." },
    Sagittarius: { eyebrow: "Aventura e Shigjetarit",    headline: "Si ta bësh <span id='paywall-sign'>Shigjetarin</span> ta shohë suksesin si liri, jo si barrë.",                          subline: "Ai ikën nga rutina. Liria e motivon.",                      tease: "Shigjetari ballkanik i frikësohet ngecjes. Kur rritja lidhet me liri dhe aventurë, ai e sheh ndryshe.",                       cta: "Më trego aventurën e Shigjetarit →", note: "Fjalia e duhur është në guidë." },
    Capricorn:   { eyebrow: "Ambicia e Bricjapit",        headline: "Si ta zgjojësh ambicien e <span id='paywall-sign'>Bricjapit</span> pa e bërë të ndihet i shtyrë.",                      subline: "Ai ka ambicie. I duhet drejtim i qartë.",                    tease: "Bricjapi ballkanik ka plan afatgjatë, por ndonjëherë ngec. Fjalia e duhur e rinis si vendim të tij.",                        cta: "Më trego ambicien e Bricjapit →", note: "Fjalia e duhur është në guidë." },
    Aquarius:    { eyebrow: "Ndryshimi i Ujorit",         headline: "Si ta bësh <span id='paywall-sign'>Ujorin</span> ta shohë suksesin si rrugë personale, jo si sistem.",                  subline: "Ai kundërshton presionin. Jepi alternativë.",               tease: "Ujori ballkanik refuzon rrugën klasike. Kur mundësia tingëllon si zgjedhje e tij, jo si urdhër, ai hapet.",                  cta: "Më trego ndryshimin e Ujorit →", note: "Fjalia e duhur është në guidë." },
    Pisces:      { eyebrow: "Ëndrra e Peshqve",           headline: "Si ta ndihmosh <span id='paywall-sign'>Peshqit</span> ta kthejë ëndrrën në hap real.",                                  subline: "Ai ëndërron shumë. I duhet një shenjë e qartë.",            tease: "Peshqit ballkanik jeton me ndjesi. Fjalia e duhur e lidh ëndrrën me një hap të vogël, pa ia vrarë magjinë.",                  cta: "Më trego ëndrrën e Peshqve →",  note: "Fjalia e duhur është në guidë." },
    _default:    { eyebrow: "Motivimi i tij",             headline: "Si ta ndihmosh të dëshirojë të rritet pa ia prekur krenarinë.",                                                         subline: "Burri ballkanik s'pranon shtyrje. Pranon drejtim me respekt.", tease: "Çdo shenjë ka shtysën e vet. Guida të jep fjalinë që e kthen justifikimin në hap konkret.",                           cta: "Më trego motivimin e tij →",    note: "Fjalia e duhur është në guidë." },
  },
  // ── QËLLIMI: commit ──────────────────────────────────────────────────
  commit: {
    Aries:       { eyebrow: "Lëvizja e qartësisë",        headline: "Si ta bësh <span id='paywall-sign'>Dashin</span> të kërkojë angazhim pa e ndjerë si ultimatum.",                       subline: "Ai lëviz kur ndien vlerë dhe rrezik real humbjeje.",         tease: "Dashi angazhohet kur kupton se nuk je gjithmonë e disponueshme. Fjalia e duhur vendos standard pa skenë.",                   cta: "Më trego lëvizjen e Dashit →",  note: "Fjalia e duhur është në guidë." },
    Taurus:      { eyebrow: "Sinjali i sigurisë",          headline: "Fjalia që e bën <span id='paywall-sign'>Demin</span> ta shohë angazhimin si siguri, jo si presion.",                  subline: "Ai dëshiron qëndrueshmëri. Tregoji çfarë rrezikon të humbasë.", tease: "Demi angazhohet kur kupton se stabiliteti nuk është i garantuar pa zgjedhje të qartë.",                                  cta: "Më trego kthesën e sigurisë →",   note: "Fjalia e duhur është në guidë." },
    Gemini:      { eyebrow: "Risia e Binjakut",            headline: "Si të bëhesh arsyeja që <span id='paywall-sign'>Binjakët</span> e sheh angazhimin si gjë të gjallë, jo rutinë.",      subline: "Ai i trembet mërzisë më shumë se angazhimit.",              tease: "Binjakët shmang angazhimin kur mendon se do humbasë opsione. Fjalia e duhur e bën lidhjen të ndihet si zgjedhja më interesante.", cta: "Më trego lëvizjen e risisë →", note: "Fjalia e duhur është në guidë." },
    Cancer:      { eyebrow: "Sinjali i shtëpisë",          headline: "Fjalia që i tregon <span id='paywall-sign'>Gaforres</span> se me ty mund të ndërtojë diçka reale.",                  subline: "Ai dëshiron shtëpi. Tregoji si mund të duket.",              tease: "Gaforrja angazhohet kur ndihet emocionalisht i sigurt dhe kur e kupton vlerën e asaj sigurie.",                              cta: "Më trego sinjalin e Gaforres →", note: "Fjalia e duhur është në guidë." },
    Leo:         { eyebrow: "Çmimi ekskluziv",             headline: "Si ta bësh <span id='paywall-sign'>Luanin</span> ta shohë angazhimin si zgjedhje që e nderon.",                       subline: "Ai dëshiron të fitojë diçka me vlerë.",                      tease: "Luani angazhohet kur ndihet se ka përballë një grua me vlerë, jo dikë që lutet për vendin e saj.",                            cta: "Më trego lëvizjen e çmimit →",    note: "Fjalia e duhur është në guidë." },
    Virgo:       { eyebrow: "Mbyllja e sigurisë",          headline: "Fjalia që i jep <span id='paywall-sign'>Virgjëreshës</span> qartësi të mjaftueshme për të vendosur.",                subline: "Ai e mbianalizon. Jepi një sinjal të pastër.",              tease: "Virgjëresha ndalon kur ka shumë pasiguri. Fjalia e duhur ul zhurmën dhe vendos standard.",                                   cta: "Më trego tekstin e mbylljes →",   note: "Fjalia e duhur është në guidë." },
    Libra:       { eyebrow: "Forca e vendimit",            headline: "Si ta bësh pavendosmërinë e <span id='paywall-sign'>Peshorës</span> të kthehet në zgjedhje të qartë.",               subline: "Ka peshuar opsionet. Ti vendos standardin.",                tease: "Peshorja shmang vendimet sepse i trembet pendesës. Një kufi i qetë e ndal zvarritjen pa krijuar dramë.",                     cta: "Më trego mbylljen e qetë →",    note: "Fjalia e duhur është në guidë." },
    Scorpio:     { eyebrow: "Zbllokimi i besimit",        headline: "Fjalia që e bën <span id='paywall-sign'>Akrepin</span> ta shohë angazhimin si vend të sigurt.",                        subline: "Ai i frikësohet cenueshmërisë. Jepi siguri pa e ndjekur.",   tease: "Akrepi ndalon derisa besimi të ndihet real. Fjalia e duhur tregon që je e besueshme dhe me standard.",                       cta: "Më trego zbllokimin e besimit →", note: "Fjalia e duhur është në guidë." },
    Sagittarius: { eyebrow: "Ftesa e aventurës",          headline: "Si ta bësh <span id='paywall-sign'>Shigjetarin</span> ta shohë angazhimin si liri, jo kafaz.",                          subline: "Ai i ikën etiketave kur ato duken si kufizim.",             tease: "Shigjetari shmang angazhimin kur ndihet i mbyllur. Fjalia e duhur e riformulon lidhjen si aventurë të përbashkët.",           cta: "Më trego riformulimin →",       note: "Fjalia e duhur është në guidë." },
    Capricorn:   { eyebrow: "Lëvizja afatgjatë",          headline: "Fjalia që e bën <span id='paywall-sign'>Bricjapin</span> të të shohë si zgjedhje serioze.",                            subline: "Ai mendon afatgjatë. Tregoji vlerën tënde pa u shitur.",    tease: "Bricjapi angazhohet kur sheh qëndrueshmëri, respekt dhe vlerë afatgjatë. Fjalia e duhur ia bën të qartë këtë pa presion.",     cta: "Më trego tekstin e investimit →", note: "Fjalia e duhur është në guidë." },
    Aquarius:    { eyebrow: "Partnerja e barabartë",      headline: "Si ta bësh <span id='paywall-sign'>Ujorin</span> të angazhohet sepse ndihet me të barabartën e vet.",                   subline: "Ai nuk do presion. Do ekip dhe hapësirë.",                  tease: "Ujori angazhohet kur lidhja ndihet si partneritet, jo kufizim. Fjalia e duhur i tregon se je ekip, jo kontroll.",             cta: "Më trego tekstin e ekipit →",     note: "Fjalia e duhur është në guidë." },
    Pisces:      { eyebrow: "Sinjali i shpirtit",          headline: "Fjalia që e bën <span id='paywall-sign'>Peshqit</span> ta ndiejë lidhjen si diçka që s'do ta humbasë.",               subline: "Ai beson në shenja. Jepi kuptim dhe qartësi.",              tease: "Peshqit angazhohet kur ndjen lidhje të thellë dhe siguri emocionale. Fjalia e duhur e thellon atë pa e ndjekur.",             cta: "Më trego sinjalin e shpirtit →",  note: "Fjalia e duhur është në guidë." },
    _default:    { eyebrow: "Aktivizuesi i angazhimit",    headline: "Lëvizja që e kthen 'po flasim' në diçka reale.",                                                                      subline: "Pa lutje. Pa presion. Vetëm standard i qartë.",             tease: "Angazhimi nuk merret me panik. Një fjali e qetë e bën paqartësinë të mos jetë më komode për të.",                            cta: "Më trego aktivizuesin e angazhimit →", note: "Fjalia e duhur është në guidë." },
  },
};

// ── Kopja e roast tease për çdo qëllim ──────────────────────────────────
const roastTeaseCopy = {
  ego:      "Por egoja ballkanike ka çelësin e saj — dhe ai ndryshon me çdo shenjë. Fjalia e duhur ia ul mbrojtjen pa e ulur ty.",
  jealousy: "Por xhelozia e tij zakonisht nuk është dashuri e pastër — është frikë e fshehur. Fjalia e saktë e kthen frikën në siguri pa të futur ty në kafaz.",
  money:    "Por burri ballkanik s'pranon të shtyhet. Pranon të zgjohet vetë. Fjalia e saktë ia lidh ambicien me krenarinë e tij — dhe ai niset.",
  commit:   "Por angazhimi ballkanik nuk merret me lutje. Ndodh kur ai e ndjen qartë vlerën tënde dhe kupton se paqartësia ka kosto.",
};

// ── HAPI 5: PAYWALL — lidhja me kopjen dinamike ────────────────────────
document.getElementById('btn-show-paywall').addEventListener('click', () => {
  window.track('paywall_viewed', { crush_sign: state.crushSign, goal: state.goal, user_sign: state.userSign });

  const goal = state.goal || 'ego';
  const sign = state.crushSign;

  const matrix = egoCopy[goal] || egoCopy.ego;
  const copy   = matrix[sign]  || matrix._default;

  const roastTease = document.getElementById('roast-tease');
  const roastCtaText = document.getElementById('roast-cta-text');
  if (roastTease) roastTease.innerText = roastTeaseCopy[goal] || roastTeaseCopy.ego;
  if (roastCtaText) roastCtaText.innerText = copy.cta;

  const elEyebrow   = document.getElementById('paywall-eyebrow');
  const elHeadline  = document.getElementById('paywall-headline');
  const elSubline   = document.getElementById('paywall-subline');
  const elFloatNote = document.getElementById('paywall-float-note');

  if (elEyebrow)   elEyebrow.innerText = copy.eyebrow;
  if (elHeadline)  elHeadline.innerHTML = copy.headline;
  if (elSubline)   elSubline.innerText  = copy.subline;
  if (elFloatNote) elFloatNote.innerText = copy.note;

  switchStep(step4, step5);
  window.scrollTo(0, 0);
});
