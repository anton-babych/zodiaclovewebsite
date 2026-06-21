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

// --- FJALORI I TË DHËNAVE ---
// Logjika e Trap-it dhe Roast-it bazuar në shenjën e Zodiakut
const zodiacData = {
  Aries: {
    script: [
      { r: "oj, falje që nuk u përgjigja, puna ishte e çmendur 💀", c: [{t: "s'ka gjë, edhe unë isha e zënë", i: 20}, {t: "ti kurrë nuk ke kohë për mua", i: -10}] },
      { r: "po marr frymë pak. si je ti sot?", c: [{t: "mirë, dola me shoqet sonte 🥂", i: 15}, {t: "duke pritur ty, si gjithmonë", i: -5}] },
      { r: "oh bukur. edhe unë mund të dal diku", c: [{t: "enjoy! është plot njerëz atje", i: 25}, {t: "merre edhe mua!", i: -15}] },
      { r: "do shohim. dua të bëjmë diçka bashkë shpejt", c: [{t: "ma njoft kur të lirohesh 💅", i: 20}, {t: "kur? çfarë dite?", i: -10}] }
    ],
    trapQuestion: "nuk di, sonte rri në shtëpi. herën tjetër",
    trapChoices: [ "po seriozo? po anullove sërish?", "siç të duket. mos më shkruaj herën tjetër." ],
    roast: "Dashi dëshiron energji dhe guxim, jo pasivitet dhe ankth. Ai tërhiqet nga gratë që janë të gjalla dhe direkte. Nëse luaj lojëra ose sillesh e nevojshme, shkëndija shuhet menjëherë.",
    solution: "Dërgoji diçka të shkurtër, guximtare dhe pak sfidante. Bëre të ndjejë se gjahu ka filluar sërish — por me kushtet e tua."
  },
  Taurus: {
    script: [
      { r: "oj, fal, po flija si 12 orë 😭", c: [{t: "e kuptoj, edhe unë doja të flinim", i: 20}, {t: "fle shumë, i kemi bërë zakon", i: -10}] },
      { r: "ma duhej. urdherova ushqim, po rri në divan", c: [{t: "enjoy qetësinë ✨", i: 15}, {t: "mund të vij unë?", i: -15}] },
      { r: "haha ndoshta. dua një natë të qetë sonte", c: [{t: "e kuptoj, të shihemi herën tjetër", i: 25}, {t: "mund të jem e qetë edhe unë!", i: -15}] },
      { r: "po, do gjejmë kohë gjatë kësaj jave", c: [{t: "mirë, më njofto ti", i: 20}, {t: "ok por kur saktësisht?", i: -10}] }
    ],
    trapQuestion: "po mendoj të ngadalësohem pak, rri me veten tani",
    trapChoices: [ "pse? po flet me dikë tjetër?", "domethënë po më humbiste kohën gjithë këtë kohë?" ],
    roast: "Demi vlerëson rehatinë dhe ngadalësinë. Mos e grush për përgjigje të menjëhershme. Kur e shtyn ta vendosë menjëherë, ai ndihet i kontrolluar dhe mbyllet plotësisht.",
    solution: "Tërhiqu pak por mbetu e ngrohtë. Lëre ta ndjejë mungesën tënde pa drama. Kur Demi ndjen se nuk po e pret, fillon ai të nisë."
  },
  Gemini: {
    script: [
      { r: "oj hej! fal, koka ime ka qenë komplet e shpërndarë sot", c: [{t: "haha njëjtë, moti ka faj 😂", i: 20}, {t: "e kam zakon tashmë", i: -10}] },
      { r: "fillova 5 projekte dhe nuk mbarova asnjë 🤡", c: [{t: "klasike 😂 çfarë po bëje?", i: 15}, {t: "duhet të fokusohesh", i: -10}] },
      { r: "gjithçka e asgjë. mund të shkoj në ndonjë event sonte", c: [{t: "oh dërgom foto!", i: 25}, {t: "pse nuk m'invite?", i: -15}] },
      { r: "nëse nuk shpërdahem rrugës lol. duhet të takohemi shpejt", c: [{t: "sigurisht, le të planifikojmë", i: 20}, {t: "lushtu, po të lutem le të takohemi", i: -10}] }
    ],
    trapQuestion: "hej po zhdukem pak, dua një fundjavë pa etiketa",
    trapChoices: [ "çfarë jemi ne atëherë? dua një etiketë.", "pse po sillesh kështu? thjesht përgjigju." ],
    roast: "Binjakët kanë nevojë për lëvizje mendore dhe liri. Mos i bëj presion për siguri të menjëhershme ose ktheje çdo bisedë në gjyq serioz. Ata i tremben mërzisë dhe presionit.",
    solution: "Dërgoji diçka tërësisht ndryshe — një meme, një fakt të çuditshëm, një shaka. Ndryshoje energjinë. Nëse angazhon mendjen e tij pa presion, ai kthehet vetë."
  },
  Cancer: {
    script: [
      { r: "hej... fal që u zhdukëm. kam qenë shumë në mendime kohët e fundit", c: [{t: "s'ka gjë, merre kohën tënde 🤍", i: 20}, {t: "çfarë ke sërish?", i: -10}] },
      { r: "po merrem me probleme familjare. është e lodhshme", c: [{t: "jam këtu nëse do të flasësh", i: 15}, {t: "oh, keq", i: -5}] },
      { r: "faleminderit, e çmoj. mund të qëndroj dhe të shoh filma", c: [{t: "natë perfekte. çfarë filmi?", i: 25}, {t: "mos u mbylle brenda vetes", i: -15}] },
      { r: "ndoshta diçka nostalgji. do të kontaktoj kur të ndihem mirë", c: [{t: "merre gjithë kohën që të duhet", i: 20}, {t: "ok do të pres", i: -10}] }
    ],
    trapQuestion: "po, edhe ex-i im e donte këtë film... gjithsesi po shkoj të fle",
    trapChoices: [ "po sillesh shumë i ndjeshëm për këtë.", "cool. po çfarë ke nesër?" ],
    roast: "Gaforrja dëshiron siguri emocionale. Ata kujtojnë detajet dhe janë të ndjeshëm ndaj ftohtësisë ose talljes. Heqja e ndjenjave të tij si problem shkatërron besimin.",
    solution: "Njoh ndryshimin me butësi. 'Hej, e ndeva ndryshimin. Nuk duhet ta flasim, por jam këtu.' Dobësia pa presion është çelësi."
  },
  Leo: {
    script: [
      { r: "fal humbja e tekstit! isha në palestër duke dukur shumë mirë për të kontrolluar telefonin 💅", c: [{t: "lol e dua besimin", i: 20}, {t: "sa i mbytur me veten", i: -10}] },
      { r: "e di 😂 sot ka qenë si film", c: [{t: "energji protagonisteje ✨", i: 15}, {t: "ok qetësohu pak", i: -10}] },
      { r: "literalisht. bleva një xhaketë të re dhe është sensational", c: [{t: "duhet të shoh foton menjëherë", i: 25}, {t: "jam sigurë është mirë", i: -15}] },
      { r: "do e vesh herën tjetër që takohemi. kur të kem kohë lol", c: [{t: "nëse je me fat të mjaftueshëm", i: 20}, {t: "kur është hera tjetër?", i: -10}] }
    ],
    trapQuestion: "[Dërgon foto] me hëngra këtë look sinqerisht",
    trapChoices: [ "po provon shumë me atë veshje.", "nuk do t'ushqej egon tënde për këtë." ],
    roast: "Luani dëshiron të dashurohet bukur dhe të admirojë. Atij i duhen vëmendje dhe njohje. Ta bësh të ndihesh i zakonshëm ose ta turpërosh është mënyra e garantuar për ta humbur.",
    solution: "Jepi një kompliment specifik dhe cilësor. Jo 'duket mirë' por 'ajo ngjyrë ty të shkon fantastikisht'. Ushqeje egon, pastaj bëhu e pakjashëm."
  },
  Virgo: {
    script: [
      { r: "fal vonesën, po organizoja gjithë jetën time dhe humbura kohën", c: [{t: "mbret produktiv 👑", i: 20}, {t: "je shumë i obsesionuar me punën", i: -10}] },
      { r: "duhej bërë. orari im kësaj jave ishte kaos", c: [{t: "e kuptoj, duhet të qëndrosh në krye të gjërave", i: 15}, {t: "mërzitëse", i: -10}] },
      { r: "po, me saktësi. mund të marr kafe për të vazhduar", c: [{t: "mos e lodh veten shumë!", i: 25}, {t: "ma sill edhe mua?", i: -15}] },
      { r: "i di kufijtë e mi lol. do gjejmë kohë së shpejti", c: [{t: "tingëllon si plan", i: 20}, {t: "kurrë nuk ke kohë për mua", i: -10}] }
    ],
    trapQuestion: "mënyra si e trajtove atë situatë nuk ka sens logjik. do ta rregulloj vetë.",
    trapChoices: [ "mos u përpiq të kontrollosh gjithçka.", "je i lodhshëm kur sillesh kështu." ],
    roast: "Virgjëresha dashurohet nëpërmjet besimit, dobishmërisë dhe qartësisë. Mos krijoni kaos dhe quajeni romancë. Ndërsa nuk duhet të pranosh kritika të ashpra, të reagosh me kaos bën Virgjëreshën të largohet.",
    solution: "Vendos një kufi të qetë, pa emocione. 'E vlerësoj mendimin tënd, por nuk u përgjigjem kur flitet teposhtë me mua.' Virgjëresha respekton strukturën dhe autoritetin e qetë."
  },
  Libra: {
    script: [
      { r: "oj hej! fal, po mendoja për ty dhe harrova t'i përgjigjesha 😅", c: [{t: "s'ka gjë, jam e lajthitur 😏", i: 20}, {t: "sigurisht që po", i: -10}] },
      { r: "bëj be! kam vrapuar duke vendosur çfarë të vesh sonte", c: [{t: "cilat janë opsionet?", i: 15}, {t: "thjesht zgjidh diçka", i: -10}] },
      { r: "midis këmishës së zezë ose asaj vintage. jam kaq e pavendosur", c: [{t: "vintage gjithmonë fiton", i: 25}, {t: "pse është kaq e vështirë kjo?", i: -15}] },
      { r: "ke të drejtë. ndoshta shkojmë në atë vend estetik shpejt?", c: [{t: "vetëm nëse ti paguan 💅", i: 20}, {t: "po ju lutem!", i: -10}] }
    ],
    trapQuestion: "nuk mund të vendos ku të shkoj sonte, jam stresuar, zgjidhni ti ose po anulloj",
    trapChoices: [ "thjesht zgjidh diçka, kjo është e lodhshme.", "nëse anullo, mos shkruaj sërish." ],
    roast: "Peshorja dëshiron bukuri, ekuilibër dhe harmoni. Presioni e bën të pavendosur. Ngritja e zërit ose detyrimi për vendime të menjëhershme shkatërron estetikën elegante që i nevojitet në lidhje.",
    solution: "Hiq presionin por merr drejtimin me hijeshi. 'Le të shkojmë në restorant shqiptar. Di një vend.' Do të ndihet i lehtësuar dhe i tërhequr nga vendosmëria jote e butë."
  },
  Scorpio: {
    script: [
      { r: "hej. fal u zhdukëm. deshta pak të shkyçem.", c: [{t: "e kuptoj. shpresoj je mirë", i: 20}, {t: "ku ishe?", i: -10}] },
      { r: "jam mirë. thjesht po vëzhgoj njerëz. po observoj. e di.", c: [{t: "misterioze si gjithmonë 🦇", i: 15}, {t: "kjo është e çuditshme", i: -10}] },
      { r: "nuk po mundohem. thjesht nuk dua që të gjithë të dinë punët e mia", c: [{t: "sekretet e tua janë të sigurta me mua", i: 25}, {t: "çfarë po fsheh?", i: -15}] },
      { r: "do shohim. le të lidhemi sonte. ndoshta.", c: [{t: "më njofto nëse mbijetove ditën", i: 20}, {t: "pse ndoshta?", i: -10}] }
    ],
    trapQuestion: "po, telefoni im është i bllokuar me arsye. mos u mundoni të shikoni mbi supet e mia.",
    trapChoices: [ "pse je kaq sekret? çfarë po fsheh?", "mirë, do mbaj edhe unë sekretet e mia." ],
    roast: "Akrepi dëshiron thellësi, të vërtetë dhe besim të thellë. Mos provoko xhelozi ose kërko të qenë i cenueshëm menjëherë para se të ketë besim. Nëse luani lojëra sipërfaqësore me Akrepin, do të ta presë përgjithmonë.",
    solution: "Përputhe privatësinë e tij me pavarësinë tënde misterioze. Fokusohu te jeta jote. Kur Akrepi kupton se nuk ta kontrollon plotësisht, obsesioni i tij nis."
  },
  Sagittarius: {
    script: [
      { r: "yooo fal u zhdukëm, sapo rezervova fluturim në Tiranë për fundjavë lol ✈️", c: [{t: "omg je e çmendur, enjoy!", i: 20}, {t: "prit pa mua?", i: -10}] },
      { r: "duhej të ikja! jeta po bëhej shumë rutinë", c: [{t: "e respektoj spontanitetin 🌴", i: 15}, {t: "po ikësh nga problemet", i: -10}] },
      { r: "ndoshta. gjithsesi do jem larg telefonit kryesisht", c: [{t: "enjoy vibe-in! mos më harro", i: 25}, {t: "kurrë nuk ma shkruan", i: -15}] },
      { r: "kurrë! do festojmë kur të kthehem. kur të jetë.", c: [{t: "nuk mund ta pres 💅", i: 20}, {t: "kur kthehesh?", i: -10}] }
    ],
    trapQuestion: "po mendoj të zgjat udhëtimin, nuk dua t'u lidhëm shumë tani",
    trapChoices: [ "gjithmonë iki kur gjërat bëhen serioze.", "domethënë duhet të pres?" ],
    roast: "Shigjetari ka nevojë për liri, aventurë dhe horizont më të gjerë. Mos kërko rutinë ose mundohu ta kontrollosh. Nëse ia ngushton botën, do të ikë.",
    solution: "Tregoi se nuk të duhet ai për të qenë e lumtur. 'Kaloje mirë! Unë po dal me shoqet fundjavën e ardhshme gjithsesi.' Liria i tërheq ata."
  },
  Capricorn: {
    script: [
      { r: "hej, fal vonesën. takime pas takimesh gjithë ditën 📈", c: [{t: "siguro paratë 💰", i: 20}, {t: "a ndalon ndonjëherë duke punuar?", i: -10}] },
      { r: "kurrë. grind-i nuk ndalet. po mundohem të arrij qëllimet e muajit", c: [{t: "e dua ambicien sinqerisht", i: 15}, {t: "kjo është shumë e mërzitshme", i: -10}] },
      { r: "ka rezultate. mund të vonohem sonte, kam dokumente për të rishikuar", c: [{t: "mos u lodh shumë! merr pak pushim", i: 25}, {t: "sërish? kishte premtuar", i: -15}] },
      { r: "e di, do ta kompensoj. po planifikoj kohën tënde së shpejti.", c: [{t: "do të dërgoj faturën për kohën time 😂", i: 20}, {t: "nuk jam takim biznesi", i: -10}] }
    ],
    trapQuestion: "po, duhet të anulloj takimin sonte, puna vazhdoi vonë. fal.",
    trapChoices: [ "puna është qartësisht më e rëndësishme se unë.", "nëse do, do gjeje kohë." ],
    roast: "Bricjapi vlerëson respektin, qëllimet dhe strukturën. Mos përqesh ambicien e tij ose krijo skena kaotike emocionale. Ai dashuron nëpërmjet përgjegjësisë, dhe mosrespektimi i kohës së tij është dealbreaker.",
    solution: "Përgjigju me profesionalizëm të qetë. 'S'ka problem, më njofto kur të lirohesh.' Pastaj hesht. Ata respektojnë njerëzit a të cilëve koha është po aq e vlefshme."
  },
  Aquarius: {
    script: [
      { r: "hej fal, shkova 3 orë duke lexuar për civilizime antike 👽", c: [{t: "lmao sigurisht që po", i: 20}, {t: "je kaq e çuditshme", i: -10}] },
      { r: "është fascinuese. gjithsesi njerëzimi është simulim", c: [{t: "pilulë e kuqe apo e kaltër? 💊", i: 15}, {t: "mund të flasim për gjëra normale?", i: -10}] },
      { r: "normale është konstrukt shoqëror. mund të shikoj yjet sonte", c: [{t: "prit kjo tingëllon kaq paqësorësh", i: 25}, {t: "pa mua?", i: -15}] },
      { r: "po dua pak hapësirë për të menduar. do flasim me vonë.", c: [{t: "merre hapësirën! ci ri", i: 20}, {t: "pse gjithmonë ke nevojë për hapësirë?", i: -10}] }
    ],
    trapQuestion: "sinqerisht urrej etiketat. mendoj se lidhjet janë kurth kapitalist.",
    trapChoices: [ "duhet të definosh këtë tani menjëherë.", "kjo është justifikim shumë infantil." ],
    roast: "Ujori ka nevojë për liri, miqësi dhe origjinalitet. Kapja kur kërkon hapësirë ose kërkimi i etiketave standarde e largon menjëherë. Duhet ta respektosh hapësirën personale.",
    solution: "Bie dakord me të dhe tërhiq privilegjet e lidhjes. 'Jam plotësisht dakord, etiketat janë kufizuese. Le ta mbajmë casual.' Ai do të panikosë kur kupton se po humbet ekskluzivitetin."
  },
  Pisces: {
    script: [
      { r: "hej... fal u zhdukëm. rashë fjete dhe kisha ëndërrën më të çmendur 🌊", c: [{t: "omg tregom", i: 20}, {t: "gjithmonë jeni duke fjetur", i: -10}] },
      { r: "ishte sikur jemi në një jetë të mëparshme. ishte kaq reale", c: [{t: "e dua këtë. çfarë ndodhi?", i: 15}, {t: "kjo nuk është realitet", i: -10}] },
      { r: "do të tregoj me vonë. energjia ime sot është shumë e harxhuar", c: [{t: "mbro paqen tënde! pushon", i: 25}, {t: "mos bëj justifikime", i: -15}] },
      { r: "faleminderit që e kupton 🥺 do të lidhemi shpejt", c: [{t: "gjithmonë 🤍", i: 20}, {t: "më mirë", i: -10}] }
    ],
    trapQuestion: "po e prish magjinë, po sillesh shumë ashpër me mua.",
    trapChoices: [ "po sillesh dramatik. kjo nuk është film.", "mos më bëj përgjegjëse për ndjenjat e tua." ],
    roast: "Peshqit dëshirojnë magji, butësi dhe thellësi emocionale. Ata duan simbole dhe botë private. Të tallesh me ndjeshmërinë e tyre ose ta shkatërrosh magjinë me cinizëm shkatërron lidhjen.",
    solution: "Hidhju imagjinatës por mbaj kufijtë e tua të fortë. Validoja ndjenjat e tij pa u bërë terapistja e tij emocionale."
  }
};

const genericData = {
  script: [
    { r: "hej, fal vonesën. kam qenë shumë e zënë", c: [{t: "s'ka gjë, edhe unë", i: 20}, {t: "gjithmonë kështu", i: -10}] },
    { r: "si po kalon ditën gjithsesi?", c: [{t: "mirë, thjesht po relakohem", i: 15}, {t: "horrible, duke pritur ty", i: -15}] },
    { r: "bukur. mund të dal sonte", c: [{t: "kaloje mirë!", i: 25}, {t: "mund të vij?", i: -15}] },
    { r: "po shohim. le të takohemi shpejt", c: [{t: "sigurisht", i: 20}, {t: "ok kur?", i: -10}] }
  ],
  trapQuestion: "nuk di, mund të anulloj sonte. ndoshta javën tjetër.",
  trapChoices: [
    "po më injoroni?",
    "mirë, kalje mirë jetën."
  ],
  roast: "Dërgimi i mesazheve të dyfishta nervozë nga insiguria aktivizon distancën. Po i tregon se ata kontrollojnë gjendjen tënde emocionale.",
  solution: "Vëre telefonin në modalitet 'mos shqetëso' dhe shko të jetosh. Heshtja është mesazhi më i fuqishëm kur ai tërhiqet."
};

const goalChatData = {
  apologize: {
    script: [
      { r: "hej... e di që u tërhoqa pas asaj që ndodhi. duhej hapësirë", c: [{t: "respektoj hapësirën, por zhdukja pas lëndimit nuk ishte mirë.", i: 22}, {t: "s'ka gjë, harro", i: -12}] },
      { r: "nuk synova të të injoroja. thjesht urrej konfliktet", c: [{t: "e kuptoj. por gjithsesi duhet të marr pronësinë e asaj që ndodhi.", i: 18}, {t: "s'ka gjë, mendoj", i: -8}] },
      { r: "e kam menduar shumë. e di u solla në mbrojtje", c: [{t: "Faleminderit që e thua. Çfarë dua është riparimi, jo distanca.", i: 25}, {t: "gjithmonë e bën kështu", i: -15}] },
      { r: "ke të drejtë. Duhej ta trajtoja ndryshe", c: [{t: "E çmoj. Por dua vazhdimësi nga tani.", i: 20}, {t: "kështu je i penduar apo jo?", i: -10}] }
    ],
    trapQuestion: "Thashë e trajtova keq. A mund ta lëmë këtë?",
    trapChoices: [
      { t: "ke të drejtë, fal që e nisa", i: -35 },
      { t: "kështu je vërtet i penduar apo po shmangesh?", i: -35 }
    ],
    roast: "Zgjodhe qëllimin e faljes, prandaj kujdesi i pastër funksionon kundër teje. Nëse e rehatosh nga momenti i pakëndshëm, fajësia e tij zhduket para se të kthehet në llogaridhënie.",
    solution: "Përdor llogaridhënie të ngrohtë: validoja ndjenjat, emërtoje sjelljen një herë dhe kërko riparim pa ndjekje ose sulm."
  },
  chase: {
    script: [
      { r: "fal që kam qenë i largët. kam pasur shumë gjëra", c: [{t: "s'ka gjë, edhe unë isha e zënë", i: 22}, {t: "kam pritur që ti të shkruaje", i: -12}] },
      { r: "po? çfarë ke bërë ti?", c: [{t: "plane, shoqe, jetë. javë surprizuese e mirë", i: 18}, {t: "kryesisht duke pyetur pse u bëre i çuditshëm", i: -10}] },
      { r: "duket si po kalon mirë pa mua lol", c: [{t: "po. mund të arrish nëse mundesh", i: 25}, {t: "jo ende të mungon shumë", i: -15}] },
      { r: "ok ok, ndoshta duhet ta gjej kohën", c: [{t: "ndoshta. dërgom plan të vërtetë kur ta kesh.", i: 20}, {t: "po, kur mund të takohem?", i: -10}] }
    ],
    trapQuestion: "ose mund ta mbajmë casual dhe të shohim çfarë ndodh",
    trapChoices: [
      { t: "sigurisht, çfarë të duash", i: -35 },
      { t: "pse gjithmonë duhet të pranoj më pak?", i: -35 }
    ],
    roast: "Zgjodhe qëllimin e gjahut, por disponueshmëria vret ndjekjen. Kur duket si do të pranosh çdo gjë, nuk ka asgjë për të lëvizur drejt.",
    solution: "Mbete e lehtë, por bëje hyrjen conditional. Ai duhet të ndjejë ngrohtësinë tënde dhe standardet tua njëkohësisht."
  },
  commit: {
    script: [
      { r: "e dua çfarë kemi. thjesht nuk dua presion tani", c: [{t: "As unë nuk kam nevojë presion. Por kam nevojë qartësi.", i: 22}, {t: "ok, mund të pres sa të duash", i: -12}] },
      { r: "qartësi si?", c: [{t: "Ose po ndërtojmë diçka, ose mbajmë casual. Të dy kanë hyrje të ndryshme tek unë.", i: 20}, {t: "si... a më do apo jo?", i: -15}] },
      { r: "nuk e kam menduar kështu", c: [{t: "Normale. Nuk jam e zemëruar, thjesht nuk bëj 'të paqartë' përgjithmonë.", i: 24}, {t: "duhet të vendosësh tani", i: -12}] },
      { r: "nuk dua ta humbas këtë. thjesht lëviz ngadalë", c: [{t: "Ngadalë është mirë. I papërcaktuar nuk.", i: 22}, {t: "atëherë provoje menjëherë", i: -10}] }
    ],
    trapQuestion: "mund ta mbajmë pa etiketë por të vazhdojmë njëjtë?",
    trapChoices: [
      { t: "ok, thjesht nuk dua të të humbas", i: -35 },
      { t: "jo, duhet të vendosësh çfarë jemi tani", i: -35 }
    ],
    roast: "Zgjodhe qëllimin e angazhimit, prandaj të sillesh si situationship i pakufizuar është kontradikta. Nëse merr përfitimet e angazhimit pa zgjedhur ty, nuk ka arsye të zgjedhë.",
    solution: "Vendos strukturë të qetë. Mos kërko etiketë si lëvizje paniku; hiq hyrjen në nivelin e lidhjes deri sa të vendosë."
  },
  obsess: {
    script: [
      { r: "ke qenë në mendjet e mia shumë kohë kohët e fundit", c: [{t: "interesante. çfarë mendove?", i: 22}, {t: "edhe unë po mendoja për ty", i: -12}] },
      { r: "vetëm gjëra të mira besoj. si je ti?", c: [{t: "mirë, shumë e zënë por e kënaqshme", i: 18}, {t: "mirë tani që dëgjova prej teje", i: -10}] },
      { r: "bukur. duhet të takohemi", c: [{t: "ndoshta. shih orarin tënd dhe më njofto", i: 25}, {t: "po, dua shumë!", i: -15}] },
      { r: "po planifikoj. do të dërgoj diçka konkrete", c: [{t: "mirë, do shohim", i: 20}, {t: "shumë nuk mund ta pres!", i: -10}] }
    ],
    trapQuestion: "apo ndoshta thjesht duhet t'i lëmë gjërat natyrshëm",
    trapChoices: [
      { t: "po, çfarë të duash", i: -35 },
      { t: "nuk jam e gatshme vetëm 'të shoh çfarë ndodh'", i: -35 }
    ],
    roast: "Kur jep shumë emocion, ai humbet interesin. Obsesioni nuk vjen nga disponueshmëria — vjen nga misteri.",
    solution: "Paso prapa me qetësi. Pak distancë e kontrolluar është ajo që e bën mendjen e tij të shtrihet drejt teje."
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
  obsess:    'Niveli i Obsesionit të Tij',
  apologize: 'Niveli i Fajësisë së Tij',
  chase:     'Instinkti i Gjahut të Tij',
  commit:    'Dëshira e Angazhimit të Tij'
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

  chatTitle.innerText = `${state.crushSign} 🔮`;
  progressLabel.innerText = goalLabels[state.goal] || 'Niveli i Obsesionit të Tij';
  
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
  const goal = state.goal || 'obsess';
  const sign = state.crushSign;
  const matrix = egoCopy[goal] || egoCopy.obsess;
  return matrix[sign] || matrix._default;
}

function applyGoalCtaCopy() {
  const goal = state.goal || 'obsess';
  const copy = getGoalPaywallCopy();
  const roastTease = document.getElementById('roast-tease');
  const roastCtaText = document.getElementById('roast-cta-text');
  if (roastTease) roastTease.innerText = roastTeaseCopy[goal] || roastTeaseCopy.obsess;
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
  
  setTimeout(() => loadingText.innerText = `Duke analizuar psikologjinë e ${state.crushSign}...`, 1500);
  setTimeout(() => loadingText.innerText = "Duke identifikuar modelin e lidhjes...", 3000);
  setTimeout(() => loadingText.innerText = "Duke kryqëzuar flamujt e sjelljes...", 4500);
  setTimeout(() => loadingText.innerText = "Duke gjeneruar Raportin e Gabimit...", 6000);

  const data = getActiveChatData();
  const roastHeader = document.querySelector('#step-4 .roast-header h2');
  const insightTitle = document.querySelector('#roast-insight')?.closest('.insight-card')?.querySelector('h3');
  const solutionTitle = document.querySelector('#roast-solution')?.closest('.insight-card')?.querySelector('h3');

  if (roastHeader) roastHeader.innerHTML = `Moj... këtë nuk e bëjmë, <span id="roast-name"></span>.`;
  if (insightTitle) insightTitle.innerText = 'E Vërteta:';
  if (solutionTitle) solutionTitle.innerText = 'Çfarë DUHEJ të kishe bërë:';

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

// --- MATRICA E KOPJES EGO-STRIKE (qëllim × shenjë) ---
const egoCopy = {
  // ── QËLLIMI: obsess ──────────────────────────────────────────────────
  obsess: {
    Aries:       { eyebrow: "Kthesa e fuqisë",          headline: "Si ta thyesh egon e <span id='paywall-sign'>Dashit</span> aq thellë sa nuk mund të ndalojë të mendojë për ty.",         subline: "Një mesazh. Krenaria e tij thyhet. Obsesioni fillon.",        tease: "Dashi funksionon me gjah dhe fitore. Çasti kur ndalon ndjekjen, truri i tij degeneron. Të duhet fraza e saktë që aktivizon panikun e tij të gjahtar.",    cta: "Më trego çelësin e Dashit →",    note: "Teksti i saktë është në guidë." },
    Taurus:      { eyebrow: "Kthesa e kontrollit",       headline: "Mesazhi i vetëm që e bën <span id='paywall-sign'>Demin</span> të kuptojë se po humbet kontrollin mbi ty.",              subline: "I qetë. I ftohtë. Shkatërrues për zonën e tij të rehatisë.",   tease: "Demi është i programuar të posedojë. Hiq sigurinë, dhe qetësia e tij çahet. Teksti është kirurgjik — pa lutje, pa dramë.",                  cta: "Më trego çelësin e Demit →",     note: "Teksti i saktë është në guidë." },
    Gemini:      { eyebrow: "Prerja e vëmendjes",         headline: "Si të bëhesh gjëja e vetme që <span id='paywall-sign'>Binjakët</span> mendon — duke u bërë e heshtur.",                subline: "Pa ndjekje. Pa panik. Thjesht zhdukje nga truri i tij.",       tease: "Ego e Binjakëve ushqehet me stimulim të vazhdueshëm. Hiq prizën dhe shiko mendjen e tij të kthehet spirale tek ti.",          cta: "Më trego trukun e Binjakëve →",  note: "Teksti i saktë është në guidë." },
    Cancer:      { eyebrow: "Kthesa emocionale",          headline: "Mesazhi që e bën <span id='paywall-sign'>Gaforrën</span> të ndihet si ai që gaboi.",                                  subline: "I butë. Shkatërrues. Nuk do e presë.",                        tease: "Gaforrja funksionon me faj emocional. Teksti i duhur nuk sulmon — e bën të ndjejë peshën e asaj që po humb. Në heshtje.",           cta: "Më trego kthesën e Gaforres →",  note: "Teksti i saktë është në guidë." },
    Leo:         { eyebrow: "Heqja e reflektorit",        headline: "Si ta shkatërrosh egon e <span id='paywall-sign'>Luanit</span> duke e bërë të padukshëm.",                             subline: "Ai ka nevojë për duartrokitjet e tua. Hiqja. Shiko panikun.", tease: "Identiteti i Luanit shembet çastin kur ndalon ta admirosh. Një fjali heq reflektorin e tij — dhe të vë ty brenda tij.",            cta: "Më trego çelësin e Luanit →",    note: "Teksti i saktë është në guidë." },
    Virgo:       { eyebrow: "Goditja e kompetencës",      headline: "Teksti që e bën <span id='paywall-sign'>Virgjëreshën</span> të vë në dyshim vetë-imazhin e tij.",                     subline: "Preciz. I qetë. E godet ku fshihet.",                        tease: "Ego e Virgjëreshës ndërtohet mbi të qenët njeriu më i zgjuar në dhomë. Një rresht i formuluar saktë, i patrazuar, e shkatërron atë identitet.",         cta: "Më trego goditjen e Virgjëreshës →", note: "Teksti i saktë është në guidë." },
    Libra:       { eyebrow: "Thyerja e ekuilibrit",       headline: "Si ta thyesh egon e <span id='paywall-sign'>Peshorës</span> duke hequr fuqinë e tij për t'të magjepsur.",              subline: "Ai lulëzon kur zgjidhesh. Ndale zgjedhjen. Ai shpërbëhet.",  tease: "Besimi i Peshorës jeton në reagimin tënd ndaj tij. Çasti kur bëhesh indiferente, i gjithë qëndrimi i tij shembet.",              cta: "Më trego çelësin e Peshorës →",  note: "Teksti i saktë është në guidë." },
    Scorpio:     { eyebrow: "Kthesa e kontrollit",        headline: "Teksti i saktë që e bën <span id='paywall-sign'>Akrepin</span> të kuptojë se nuk është më në kontroll.",               subline: "Ai mendoi të të kishte. Një tekst e ndryshon.",               tease: "Ego e Akrepit ndërtohet mbi fuqi. Hiqja me qetësi — pa dramë, pa reagim — dhe obsesioni i tij nis me shpejtësi të egër.",               cta: "Më trego kthesën e Akrepit →",   note: "Teksti i saktë është në guidë." },
    Sagittarius: { eyebrow: "Kurtha e lirisë",            headline: "Si ta bësh <span id='paywall-sign'>Shigjetarin</span> të panikosë duke mos u interesuar nëse largohet.",               subline: "Ai pret të ndjekësh. Mos ndjek. Ego e tij thyhet.",          tease: "Shigjetari është i varur nga thrilli i të qenët i dëshiruar. Çasti kur ndalon ta dëshirosh vërtet, mendja e tij degeneron.",            cta: "Më trego kurthën e Shigjetarit →", note: "Teksti i saktë është në guidë." },
    Capricorn:   { eyebrow: "Kërcënimi i statusit",       headline: "Mesazhi që e bën <span id='paywall-sign'>Bricjapin</span> të ndjejë se po humb dikë me vlerë.",                       subline: "Ai respekton vlerën. Tregoji tën — duke u larguar.",          tease: "Bricjapi lëviz vetëm për gjëra që ia vlen të luftojë. Një mesazh komunikon se koha jote është burim që nuk mund ta marrë si të mirëqenë.",  cta: "Më trego lëvizjen e Bricjapit →", note: "Teksti i saktë është në guidë." },
    Aquarius:    { eyebrow: "Pasqyra e shkëputjes",       headline: "Si ta kalosh <span id='paywall-sign'>Ujorin</span> në shkëputje dhe ta bësh egon e tij të çahet.",                     subline: "Ai mendon se ai është i patrazuar. Ktheje.",                  tease: "Ujori krenohet me lirinë emocionale. Kur vërtet nuk ke nevojë për të, gjithë identiteti i tij si 'shpirti i lirë' rrezikohet.", cta: "Më trego kthesën e Ujorit →",    note: "Teksti i saktë është në guidë." },
    Pisces:      { eyebrow: "Tërheqja e magjisë",         headline: "Teksti që e bën <span id='paywall-sign'>Peshqit</span> të kuptojë se shkatërroi diçka që nuk zëvendësohet.",          subline: "Do ta ndjejë humbjen para se ta emërtojë.",                   tease: "Ego e Peshqve ndërtohet mbi të qenët ëndrra e dikujt. Çasti kur e heq nga ai piedestal, me qetësi, bota e tij humbet ngjyrën.",            cta: "Më trego aktivizuesin e Peshqve →", note: "Teksti i saktë është në guidë." },
    _default:    { eyebrow: "Kthesa e fuqisë",            headline: "Teksti i saktë që e kthen dinamikën — dhe e thyeh egon e tij gjatë.",                                                  subline: "Një fjali. Kontrolli i tij zhduk. Mendja tek ti.",            tease: "Teksti i duhur nuk lut. Ai heq diçka nga ai që nuk e dinte se kishte nevojë.",                                                  cta: "Më trego çelësin e egos →",      note: "Teksti i saktë është në guidë." },
  },
  // ── QËLLIMI: apologize ───────────────────────────────────────────────
  apologize: {
    Aries:       { eyebrow: "Aktivizuesi i fajit",        headline: "Si ta bësh <span id='paywall-sign'>Dashin</span> të ndjejë peshën e asaj që bëri — pa thënë asnjë fjalë.",            subline: "Pa konfront. Vetëm heshtje që djeg.",                         tease: "Dashi urren të gabojë. Një përgjigje e qetë, e patrazuar aktivizon refleksin e fajit të tij dhe ego kërkon ta rregullojë.",                  cta: "Më trego lëvizjen e fajit të Dashit →", note: "Teksti i saktë është në guidë." },
    Taurus:      { eyebrow: "Heqja e rehatisë",           headline: "Mesazhi që aktivizon ndërgjegjën e <span id='paywall-sign'>Demit</span>.",                                             subline: "Hiq rehatinë. Faji i tij bën pjesën tjetër.",                tease: "Demi urren të humbasë diçka të ngrohtë dhe stabile. Tërhiq atë ngrohtësi me qetësi, dhe mekanizmi i fajit aktivizohet vetë.",             cta: "Më trego aktivizuesin e fajit të Demit →", note: "Teksti i saktë është në guidë." },
    Gemini:      { eyebrow: "Kthesa e narrativës",        headline: "Si ta rishkruash historinë që <span id='paywall-sign'>Binjakët</span> të bëhet fajtor në mendjen e tij.",             subline: "Ai është i shkëlqyer në rrotullim historish — derisa e jotja është më mirë.", tease: "Binjakët kanë nevojë të jenë të zgjuarit, simpatikët. Një mesazh e riformatëson situatën kështu që ai e sheh veten si gabimtarin.",          cta: "Më trego kthesën e Binjakëve →",  note: "Teksti i saktë është në guidë." },
    Cancer:      { eyebrow: "Pasqyra emocionale",         headline: "Teksti që e detyron <span id='paywall-sign'>Gaforrën</span> të qëndrojë me atë që theu.",                             subline: "Ai krenohet me thellësinë emocionale. Shfrytëzoje.",          tease: "Ndërgjegjja e Gaforres është cenia e tij më e madhe. Fjalët e duhura mbajnë pasqyrën — me butësi, pa agresion — dhe nuk mundet t'i shmangë.", cta: "Më trego tekstin-pasqyrë të Gaforres →", note: "Teksti i saktë është në guidë." },
    Leo:         { eyebrow: "Goditja e reputacionit",     headline: "Si ta bësh <span id='paywall-sign'>Luanin</span> të ndihet keqbërës në historinë që të gjithë do ta dinë.",           subline: "Imazhi i tij është gjithçka. Shfrytëzoje.",                   tease: "Ego e Luanit nuk mundet të mbijetojë si fajtor. Një mesazh e kërcënon atë narrativë me hollësi — dhe ai nxiton ta rregullojë.",           cta: "Më trego aktivizuesin e turpit të Luanit →", note: "Teksti i saktë është në guidë." },
    Virgo:       { eyebrow: "Kurtha e logjikës",          headline: "Mesazhi që e bën <span id='paywall-sign'>Virgjëreshën</span> të konkludojë — logjikisht — se të detyrohet falje.",   subline: "Ai e do të ketë të drejtë. Tregoji që nuk e ka.",             tease: "Virgjëresha analizon gjithçka. Një tekst faktual, jo-emocional e paraqet atë që ndodhi aq qartë sa truri i tij e detyron të pranojë fajin.", cta: "Më trego kurthën e logjikës →",   note: "Teksti i saktë është në guidë." },
    Libra:       { eyebrow: "Apeli i drejtësisë",         headline: "Si ta bësh obsesionin e <span id='paywall-sign'>Peshorës</span> për drejtësi të funksionojë kundër tij.",            subline: "Ai urren padrejtësinë. Kujto se ai e krijoi.",               tease: "Peshorja nuk toleron të jetë ajo e padrejtë. Një mesazh i qetë aktivizon nevojën e tij për të rivendosur ekuilibrin — duke filluar me falje.", cta: "Më trego lëvizjen e fajit të Peshorës →", note: "Teksti i saktë është në guidë." },
    Scorpio:     { eyebrow: "Karta e besimit",            headline: "Teksti që e bën <span id='paywall-sign'>Akrepin</span> të ndjejë dëmin që i bëri diçkaje që nuk mund ta rindërtojë.", subline: "Ai theu besimin. Tregoji koston. Me qetësi.",                 tease: "Akrepi vlerëson besnikërinë mbi të gjitha. Një mesazh komunikon se ai shkel diçka të shenjtë — pa dramë, pa lutje.",            cta: "Më trego goditjen e besimit të Akrepit →", note: "Teksti i saktë është në guidë." },
    Sagittarius: { eyebrow: "Kontrolli i integritetit",   headline: "Si ta bësh <span id='paywall-sign'>Shigjetarin</span> të ndihet hipokrit për trajtimin tënd.",                       subline: "Pretendon të jetë i lirë dhe i ndershëm. Thirre bixhozin.", tease: "Shigjetari krenohet me ndershmërinë dhe karakterin e mirë. Një mesazh e bën të balancojë midis kush thotë se është dhe çfarë bëri.", cta: "Më trego goditjen e integritetit →", note: "Teksti i saktë është në guidë." },
    Capricorn:   { eyebrow: "Lëvizja e respektit",        headline: "Mesazhi që e bën <span id='paywall-sign'>Bricjapin</span> të kuptojë se dështoi standardet e tij.",                  subline: "Ai ka kodin e tij. Kujto se e theu.",                        tease: "Ego e Bricjapit është e lidhur me të qenët burrë me fjalë. Një mesazh mban atë standard — dhe e lë të matet me të.",                        cta: "Më trego aktivizuesin e kodit →", note: "Teksti i saktë është në guidë." },
    Aquarius:    { eyebrow: "Kurtha e parimeve",          headline: "Si ta bësh <span id='paywall-sign'>Ujorin</span> të ndjejë se tradhtoi vlerat e tij.",                               subline: "Ai mendon se është i avancuar. Tregoji që nuk.",             tease: "Ujori e do të jetë ai i ndriçuari, etiku. Një mesazh zbulon hendekun midis ideologjisë dhe sjelljes — dhe e mundon.", cta: "Më trego kthesën e vlerave →",    note: "Teksti i saktë është në guidë." },
    Pisces:      { eyebrow: "Arma e ndjesisë",            headline: "Teksti që e detyron <span id='paywall-sign'>Peshqit</span> të ndjejë saktësisht çfarë të bëri të ndihesh.",          subline: "Ai ka ndjenja për të gjithë — deri kur janë tuat.",          tease: "Peshqit thithin emocionet si sfungjer. Një mesazh i shkruar me peshën e duhur emocionale e bën ndërgjegjën e tij ta dënojë vetë.",           cta: "Më trego aktivizuesin e ndjeshmërisë →", note: "Teksti i saktë është në guidë." },
    _default:    { eyebrow: "Lëvizja e ndërgjegjës",      headline: "Teksti që e bën fajin e tij të bëjë punën për ty.",                                                                   subline: "Pa dramë. Pa lutje. Vetëm pasqyrë e vendosur mirë.",          tease: "Qëllimi nuk është të bërtasësh. Është të thuash gjënë e vetme që e bën të pamundur ta justifikojë sjelljen e tij.",                          cta: "Më trego aktivizuesin e fajit →", note: "Teksti i saktë është në guidë." },
  },
  // ── QËLLIMI: chase ───────────────────────────────────────────────────
  chase: {
    Aries:       { eyebrow: "Ktheje gjahun",              headline: "Si ta bësh trurin e <span id='paywall-sign'>Dashit</span> të kalojë nga pre në çmim.",                                 subline: "Ndaloja gjahu. Bëje të vrasen pas teje.",                    tease: "Dashi është i programuar të ndjekë atë që largohet. Sekonda kur bëhesh e padisponueshme, instinkti i tij i gjahut aktivisohet.",         cta: "Më trego çelësin e gjahut të Dashit →", note: "Teksti i saktë është në guidë." },
    Taurus:      { eyebrow: "Kërcënimi i rehatisë",       headline: "Lëvizja e vetme që e bën <span id='paywall-sign'>Demin</span> të veprojë para se të të humbasë.",                    subline: "I ngadalshëm dhe i qëndrueshëm — deri kur ndien se po rrëshqasësh.", tease: "Demi lëviz vetëm kur rehatia e tij është në rrezik real. Një lëvizje sinjalizon se dritarja po mbyllet, dhe nevoja e tij të të sigurojë nis.", cta: "Më trego lëvizjen e urgjencës →", note: "Teksti i saktë është në guidë." },
    Gemini:      { eyebrow: "Kurtha e kuriozitetit",      headline: "Si të bëhesh misteri më interesant në mendjen e <span id='paywall-sign'>Binjakëve</span>.",                           subline: "Ai ndjek çfarë nuk mund ta lexojë plotësisht. Bëhu e palexueshme.", tease: "Binjakët ndjekin stimulimin. Çasti kur bëhesh pak e paparashikueshme dhe më pak e disponueshme, kurioziteti i tij bllokohet tek ti.", cta: "Më trego lëvizjen e misterit →",  note: "Teksti i saktë është në guidë." },
    Cancer:      { eyebrow: "Tërheqja e ngrohtësisë",     headline: "Mesazhi që e bën <span id='paywall-sign'>Gaforrën</span> të dëshirojë me desparat ngrohtësinë tënde emocionale.",    subline: "U komodua. Tërhiq ngrohtësinë. Do ndjekë.",                  tease: "Gaforrja ndjek sigurinë emocionale. Një tërheqje e vogël e ngrohtësisë — jo e ftohtë, vetëm neutrale — aktivizon frikën e thellë të humbjes.", cta: "Më trego tërheqjen e Gaforres →", note: "Teksti i saktë është në guidë." },
    Leo:         { eyebrow: "Loja e admirimit",           headline: "Si ta bësh <span id='paywall-sign'>Luanin</span> të punojë për vëmendjen tënde në vend të ta marrë si të mirëqenë.", subline: "Jepi më pak. Do dëshirojë më shumë.",                        tease: "Luani ndjek admirimin. Bëhu pak më pak e disponueshme me duartrokitjet dhe ai do performojë më shumë, me zë, specifikisht për ty.",         cta: "Më trego tërheqjen e vëmendjes →", note: "Teksti i saktë është në guidë." },
    Virgo:       { eyebrow: "Sinjali i vlerës",           headline: "Teksti që e bën <span id='paywall-sign'>Virgjëreshën</span> të kuptojë se ti je saktësisht çfarë nuk arriti ta sigurojë.", subline: "Ai humbiste kohë duke analizuar. Ti lëvize. Tani ai është i shpejtë.", tease: "Virgjëresha ndjek gjërat me vlerë të provuar. Një mesazh komunikon standardet tua qartë sa truri i tij analitik konkludon: 'Duhet të lëviz.'", cta: "Më trego sinjalin e vlerës →",    note: "Teksti i saktë është në guidë." },
    Libra:       { eyebrow: "Tregimi i opsionit tjetër",  headline: "Si ta bësh pavendosmërinë e <span id='paywall-sign'>Peshorës</span> të shembet në urgjencë.",                         subline: "Gjëja e vetme që shëron pavendosmërinë e tij është konkurrenca.", tease: "Peshorja zgjat sepse ndihet e sigurt. Një sinjal i hollë se ke opsione tjera thyeh ndalimin — dhe ai papritur di saktësisht çfarë dëshiron.", cta: "Më trego tekstin e urgjencës →",  note: "Teksti i saktë është në guidë." },
    Scorpio:     { eyebrow: "Levërtitja e misterit",      headline: "Lëvizja që e bën obsesionin e <span id='paywall-sign'>Akrepit</span> të kthehet në modalitet ndjekjeje.",             subline: "Ai mendoi se të kishte kuptuar. Nuk të ka.",                  tease: "Akrepi ndjek çfarë nuk mund të kontrollojë ose posedojë plotësisht. Bëhu pak më misterioze dhe më pak e aksesshme — obsesioni aktivizohet.", cta: "Më trego kthesën e obsesionit →", note: "Teksti i saktë është në guidë." },
    Sagittarius: { eyebrow: "Pasqyra e lirisë",           headline: "Si ta bësh <span id='paywall-sign'>Shigjetarin</span> të të ndjekë duke u bërë aq i lirë sa ai.",                    subline: "Ndaloja pritjen. Do vërejë kur ndalosh.",                    tease: "Shigjetari ndjek njerëzit që nuk kanë nevojë për ta. Një lëvizje komunikon se ke aventurën tënde — dhe papritur ai dëshiron të bëjë pjesë.", cta: "Më trego pasqyrën e lirisë →",    note: "Teksti i saktë është në guidë." },
    Capricorn:   { eyebrow: "Pasoja e ambicies",          headline: "Teksti që e bën <span id='paywall-sign'>Bricjapin</span> të të shohë si qëllim që ia vlen të ndjekë.",               subline: "Ai ndjek vetëm gjëra që ia vlen. Bëhu ajo.",                 tease: "Bricjapi motivohet nga cilësia dhe rrallësia. Një mesazh të riformatëson si mundësi të vlerës së lartë me datë skadence.",             cta: "Më trego tekstin e qëllimit →",   note: "Teksti i saktë është në guidë." },
    Aquarius:    { eyebrow: "Fleksibiliteti i pavarësisë", headline: "Si ta bësh <span id='paywall-sign'>Ujorin</span> të ndjekë duke qenë më e pavarur se ai.",                           subline: "Ai mendoi se ai ishte i liri. Surprizoje.",                  tease: "Ujori tërhiqet nga njerëzit që vërtet nuk kanë nevojë për ta. Një akt autentik pavarësie e bën të kuptojë se po humb diçka.",            cta: "Më trego fleksibilitetin e pavarësisë →", note: "Teksti i saktë është në guidë." },
    Pisces:      { eyebrow: "Prerja e magjisë",           headline: "Lëvizja që e bën <span id='paywall-sign'>Peshqit</span> të ndjekë versionin ëndërr të teje që ka anashkaluar.",      subline: "Ai romantikëzon nga larg. Jepi atë largësi.",                tease: "Peshqit ndjekin poezinë emocionale. Hiqe pak, ruaje misterinë dhe shiko si romantikëzon idenë e teje deri sa duhet ta ketë.", cta: "Më trego aktivizuesin e ëndrrave →", note: "Teksti i saktë është në guidë." },
    _default:    { eyebrow: "Kthesa e ndjekjes",          headline: "Lëvizja e saktë që e bën të kuptojë se po të humbasë — dhe ta ndjekë.",                                               subline: "Ndaloja disponueshmërinë. Do vërejë menjëherë.",             tease: "Psikologjia e ndjekjes është e thjeshtë: njerëzit dëshirojnë atë që po humbasin. Një tekst e bën atë humbje reale.",                         cta: "Më trego aktivizuesin e gjahut →", note: "Teksti i saktë është në guidë." },
  },
  // ── QËLLIMI: commit ──────────────────────────────────────────────────
  commit: {
    Aries:       { eyebrow: "Lëvizja e rrezikut",         headline: "Si ta bësh egon e <span id='paywall-sign'>Dashit</span> të kërkojë të të lidhë para se dikush tjetër ta bëjë.",      subline: "Bëje rrezikun real. Ai do lëvizë shpejt.",                   tease: "Dashi angazhohet vetëm kur nis instinkti konkurrues. Një lëvizje sinjalizon rrallësi — dhe nevoja e tij për të fituar merr kontrollin.",    cta: "Më trego lëvizjen e rrezikut →",  note: "Teksti i saktë është në guidë." },
    Taurus:      { eyebrow: "Sinjali i sigurisë",          headline: "Teksti që e bën nevojën e <span id='paywall-sign'>Demit</span> për siguri të kapërcejë frikën e tij nga angazhimi.", subline: "Ai dëshiron përherësinë. Tregoji çfarë rrezikon.",           tease: "Demi angazhohet ndaj stabilitetit. Një lëvizje ndryshon mendimin e tij nga 'kam kohë' në 'mund ta humbas vërtet' — dhe vendos.",           cta: "Më trego kthesën e sigurisë →",   note: "Teksti i saktë është në guidë." },
    Gemini:      { eyebrow: "Bllokimi i risisë",           headline: "Si të bëhesh gjëja e vetme që <span id='paywall-sign'>Binjakët</span> nuk dëshiron të ndalojë ta eksplorojë.",      subline: "Ai i trembet mërzisë më shumë se angazhimit. Ji e paparashikueshme.", tease: "Binjakët shmangë angazhimin sepse i trembet humbjes së opsioneve. Bëhu opsioni më interesant — dhe papritur ti je ajo që dëshiron ta ruajë.", cta: "Më trego lëvizjen e bllokimit →",  note: "Teksti i saktë është në guidë." },
    Cancer:      { eyebrow: "Sinjali i folës",             headline: "Teksti që aktivizon nevojën e thellë të <span id='paywall-sign'>Gaforres</span> për të ndërtuar diçka me ty.",      subline: "Ai dëshiron shtëpi. Tregoji si mund të duket.",              tease: "Gaforrja angazhohet kur ndihet emocionalisht e sigurt DHE frikësohet ta humbasë atë siguri. Një mesazh balancon të dyja — dhe instinkti i tij nis.", cta: "Më trego aktivizuesin e Gaforres →", note: "Teksti i saktë është në guidë." },
    Leo:         { eyebrow: "Çmimi ekskluziv",             headline: "Si ta bësh <span id='paywall-sign'>Luanin</span> të angazhohet duke e bërë të ndihet fitimtari që të fitoi.",       subline: "Ai dëshiron të fitojë. Lëre — me kushtet e tua.",            tease: "Luani angazhohet me njerëzit që e bëjnë të ndihet se ka siguruar diçka të jashtëzakonshme. Një lëvizje riformatëson angazhimin si fitoren e tij.", cta: "Më trego lëvizjen e çmimit →",    note: "Teksti i saktë është në guidë." },
    Virgo:       { eyebrow: "Mbyllja e sigurisë",          headline: "Mesazhi që i jep <span id='paywall-sign'>Virgjëreshës</span> mjaftueshëm të dhëna për të vendosur — dhe të vendosë për ty.", subline: "Ai e mbinanalizon. Jepi një sinjal të qartë, të fundit.",   tease: "Virgjëresha ndalon sepse i trembet vendimit të gabuar. Një mesazh eliminon pasigurinë dhe i jep leje trurit të tij të angazhohet.",          cta: "Më trego tekstin e mbylljes →",   note: "Teksti i saktë është në guidë." },
    Libra:       { eyebrow: "Forca e vendimit",            headline: "Si ta bësh pavendosmërinë e <span id='paywall-sign'>Peshorës</span> të shembet dhe ta detyrojë të zgjedhë ty — ose të të humbasë.", subline: "Ka bërë balancë opsioneve. Hiq opsionin.",      tease: "Peshorja shmang vendimet sepse i trembet pendesës. Një ultimatum i qetë, i drejtë heq mundësinë e tij të vazhdojë — pa dramë.",             cta: "Më trego mbylljen me forcë →",    note: "Teksti i saktë është në guidë." },
    Scorpio:     { eyebrow: "Zbllokimi i besimit",         headline: "Teksti që thyen muret e <span id='paywall-sign'>Akrepit</span> dhe e bën angazhimin të ndihet i sigurt — për një herë.", subline: "Ai i frikësohet të qenët i cenueshëm. Jepi arsye të mos jetë.", tease: "Akrepi ndalon angazhimin deri kur besimi është absolut. Një mesazh komunikon se je e besueshme dhe ia vlen rrezikun — pa ndjekje.", cta: "Më trego zbllokimin e besimit →",  note: "Teksti i saktë është në guidë." },
    Sagittarius: { eyebrow: "Pitchi i aventurës",          headline: "Si ta bësh <span id='paywall-sign'>Shigjetarin</span> të shohë angazhimin si liri, jo kafaz.",                       subline: "Ai i ikën etiketave. Riformatëso etiketën.",                 tease: "Shigjetari shmang angazhimin sepse ndihet si mur. Një mesazh riformatëson lidhjen tuaj si aventurën më të madhe — jo kufizim.",              cta: "Më trego riformatësimin →",       note: "Teksti i saktë është në guidë." },
    Capricorn:   { eyebrow: "Lëvizja afatgjatë",          headline: "Teksti që e bën <span id='paywall-sign'>Bricjapin</span> të të shohë si investimin e vetëm që ia vlen.",             subline: "Ai mendon afatgjatë. Tregoji ROI-n tënd.",                  tease: "Bricjapi angazhohet kur sheh vlerë afatgjatë dhe rrezik të ulët. Një mesazh të pozicionon saktësisht si atë — dhe e lë mendjen e tij strategjike të bëjë llogarinë.", cta: "Më trego tekstin e investimit →", note: "Teksti i saktë është në guidë." },
    Aquarius:    { eyebrow: "Lëvizja e partnerit të barabartë", headline: "Si ta bësh <span id='paywall-sign'>Ujorin</span> të angazhohet duke e bërë të ndihet se gjeti barabarësinë e tij intelektuale.", subline: "Ai nuk dëshiron partner. Dëshiron bashkëkomplotisin.", tease: "Ujori angazhohet me njerëzit që ndihen si ekip. Një mesazh sinjalizon se ti je ajo person — dhe ai lëviz.", cta: "Më trego tekstin e ekipit →",     note: "Teksti i saktë është në guidë." },
    Pisces:      { eyebrow: "Sinjali i shpirtit",          headline: "Teksti që e bën <span id='paywall-sign'>Peshqit</span> të ndjejë se të lësh do ishte kozmikisht gabim.",            subline: "Ai beson në shenja. Bëhu shenjë.",                           tease: "Peshqit angazhohen me njerëzit me të cilët ndjejnë lidhje të fatit. Një mesazh thellëson atë ndjesi — dhe largimi ndihet si gabim shpirtëror.", cta: "Më trego sinjalin e shpirtit →",  note: "Teksti i saktë është në guidë." },
    _default:    { eyebrow: "Aktivizuesi i angazhimit",    headline: "Lëvizja që kthen 'po flasim' në diçka reale.",                                                                         subline: "Pa ultimatume. Pa presion. Vetëm sinjali i duhur.",           tease: "Angazhimi nuk detyrohet. Aktivizohet. Një tekst e bën koston e MOS angazhimit papritur shumë reale për të.",                                 cta: "Më trego aktivizuesin e angazhimit →", note: "Teksti i saktë është në guidë." },
  },
};

// ── Kopja e roast tease për çdo qëllim ──────────────────────────────────
const roastTeaseCopy = {
  obsess:    "Por ja ku është gjëja — egoja e tij ka një çarje specifike. Thjesht ende nuk e ke gjetur. Teksti i duhur nuk lutet. Ai thyen diçka brenda tij.",
  apologize: "Por faji nuk vjen nga bërtima. Vjen nga fjalia e vetme që e bën ndërgjegjën e tij të bëjë punën. Të duhet ajo fjali.",
  chase:     "Por ndjekja nuk fillon me presion. Fillon çastin kur kupton se ndalove së prituri. Të duhet teksti i saktë që sinjalizon atë.",
  commit:    "Por angazhimi nuk detyrohet — aktivizohet. Të duhet lëvizja e vetme që e bën koston e MOS zgjedhjes tënde papritur shumë reale.",
};

// ── HAPI 5: PAYWALL — lidhja me kopjen dinamike ────────────────────────
document.getElementById('btn-show-paywall').addEventListener('click', () => {
  window.track('paywall_viewed', { crush_sign: state.crushSign, goal: state.goal, user_sign: state.userSign });

  const goal = state.goal || 'obsess';
  const sign = state.crushSign;

  const matrix = egoCopy[goal] || egoCopy.obsess;
  const copy   = matrix[sign]  || matrix._default;

  const roastTease = document.getElementById('roast-tease');
  const roastCtaText = document.getElementById('roast-cta-text');
  if (roastTease) roastTease.innerText = roastTeaseCopy[goal] || roastTeaseCopy.obsess;
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
