"use strict";
/* Shared kana data + tokenizer — used by index.html and wallpaper.html */
/* ---------------- kana reading map ---------------- */
const ROMA={
 "あ":"a","い":"i","う":"u","え":"e","お":"o","か":"ka","き":"ki","く":"ku","け":"ke","こ":"ko",
 "さ":"sa","し":"shi","す":"su","せ":"se","そ":"so","た":"ta","ち":"chi","つ":"tsu","て":"te","と":"to",
 "な":"na","に":"ni","ぬ":"nu","ね":"ne","の":"no","は":"wa*","ひ":"hi","ふ":"fu","へ":"he","ほ":"ho",
 "ま":"ma","み":"mi","む":"mu","め":"me","も":"mo","や":"ya","ゆ":"yu","よ":"yo",
 "ら":"ra","り":"ri","る":"ru","れ":"re","ろ":"ro","わ":"wa","を":"o","ん":"n",
 "が":"ga","ぎ":"gi","ぐ":"gu","げ":"ge","ご":"go","ざ":"za","じ":"ji","ず":"zu","ぜ":"ze","ぞ":"zo",
 "だ":"da","ぢ":"ji","づ":"zu","で":"de","ど":"do","ば":"ba","び":"bi","ぶ":"bu","べ":"be","ぼ":"bo",
 "ぱ":"pa","ぴ":"pi","ぷ":"pu","ぺ":"pe","ぽ":"po",
 "ア":"a","イ":"i","ウ":"u","エ":"e","オ":"o","カ":"ka","キ":"ki","ク":"ku","ケ":"ke","コ":"ko",
 "サ":"sa","シ":"shi","ス":"su","セ":"se","ソ":"so","タ":"ta","チ":"chi","ツ":"tsu","テ":"te","ト":"to",
 "ナ":"na","ニ":"ni","ヌ":"nu","ネ":"ne","ノ":"no","ハ":"ha","ヒ":"hi","フ":"fu","ヘ":"he","ホ":"ho",
 "マ":"ma","ミ":"mi","ム":"mu","メ":"me","モ":"mo","ヤ":"ya","ユ":"yu","ヨ":"yo",
 "ラ":"ra","リ":"ri","ル":"ru","レ":"re","ロ":"ro","ワ":"wa","ヲ":"o","ン":"n",
 "ガ":"ga","ギ":"gi","グ":"gu","ゲ":"ge","ゴ":"go","ザ":"za","ジ":"ji","ズ":"zu","ゼ":"ze","ゾ":"zo",
 "ダ":"da","ヂ":"ji","ヅ":"zu","デ":"de","ド":"do","バ":"ba","ビ":"bi","ブ":"bu","ベ":"be","ボ":"bo",
 "パ":"pa","ピ":"pi","プ":"pu","ペ":"pe","ポ":"po","ヴ":"vu"
};
// は is "wa" only as the topic particle; standalone word-internal は is "ha".
// The kana strings below mark particle-は by surrounding spaces, so we resolve:
function romaOf(c,isParticle){if(c==="は")return isParticle?"wa":"ha";const r=ROMA[c];return r==="wa*"?"ha":r}
const SMALLY={"ゃ":"ya","ゅ":"yu","ょ":"yo","ャ":"ya","ュ":"yu","ョ":"yo"};
const SMALLV={"ぁ":"a","ぃ":"i","ぅ":"u","ぇ":"e","ぉ":"o","ァ":"a","ィ":"i","ゥ":"u","ェ":"e","ォ":"o"};
const PUNCT="、。！？!?「」・…（）()";

/* Tokenize a kana string into [{k,r}] clusters; spaces become gaps.
   Particle detection: は/へ standing alone between spaces reads wa/e. */
function tokenize(kana){
  const out=[];let i=0;
  while(i<kana.length){
    const c=kana[i];
    if(c===" "||c==="　"){out.push({gap:true});i++;continue}
    if(PUNCT.includes(c)){out.push({k:c,r:""});i++;continue}
    if(c==="ー"){
      if(out.length){const p=out[out.length-1];if(!p.gap){p.k+="ー";const v=p.r.slice(-1);p.r+=v;i++;continue}}
      out.push({k:c,r:""});i++;continue}
    if(c==="っ"||c==="ッ"){
      let j=i+1,k=c,r="";
      if(j<kana.length&&ROMA[kana[j]]){
        let base=kana[j],br=romaOf(base,false);j++;k+=base;
        if(j<kana.length&&SMALLY[kana[j]]){const sy=SMALLY[kana[j]];const pre=br.slice(0,-1);br=pre+(["sh","ch","j"].includes(pre)?sy.slice(1):sy);k+=kana[j];j++;}
        r=(br.startsWith("ch")?"t":br[0])+br;
      }
      out.push({k,r});i=j;continue}
    if(ROMA[c]){
      // particle wa/e: は at the end of a word (before space/punct) reads wa,
      // which also covers こんにちは; へ needs space on both sides.
      const prevCh=i===0?" ":kana[i-1], nextCh=i+1>=kana.length?"。":kana[i+1];
      const nextEnds=(nextCh===" "||nextCh==="　"||PUNCT.includes(nextCh));
      const prevSpace=(prevCh===" "||prevCh==="　");
      let r=(c==="は"&&nextEnds)?"wa":(c==="へ"&&prevSpace&&nextEnds)?"e":romaOf(c,false);
      let k=c,j=i+1;
      if(j<kana.length&&SMALLY[kana[j]]){const sy=SMALLY[kana[j]];const pre=r.slice(0,-1);r=pre+(["sh","ch","j"].includes(pre)?sy.slice(1):sy);k+=kana[j];j++;}
      else if(j<kana.length&&SMALLV[kana[j]]){const v=SMALLV[kana[j]];r=(c==="ウ"||c==="う")?"w"+v:r.slice(0,-1)+v;k+=kana[j];j++;}
      out.push({k,r});i=j;continue}
    out.push({k:c,r:""});i++;
  }
  return out;
}

/* [char, romaji, example word, meaning] — word chosen for real-life frequency
   (menus, stations, golf). Rows after ん/ン are the voiced (dakuten ゛/handakuten ゜)
   variants — same shapes as the base row, with dots. */
const HIRA=[
 ["あ","a","ありがとう","thanks"],["い","i","いち","one"],["う","u","うどん","udon"],["え","e","えき","station"],["お","o","おいしい","delicious"],
 ["か","ka","かんぱい","cheers!"],["き","ki","きょう","today"],["く","ku","くるま","car"],["け","ke","けいたい","mobile phone"],["こ","ko","ここ","here"],
 ["さ","sa","さけ","sake"],["し","shi","しゃしん","photo"],["す","su","すし","sushi"],["せ","se","せん","1,000"],["そ","so","そば","soba"],
 ["た","ta","たまご","egg"],["ち","chi","ちかてつ","subway"],["つ","tsu","つぎ","next (stop)"],["て","te","てんき","weather"],["と","to","とうきょう","Tokyo"],
 ["な","na","なま","draft beer"],["に","ni","にほん","Japan"],["ぬ","nu","いぬ","dog"],["ね","ne","ねこ","cat"],["の","no","のみもの","drinks"],
 ["は","ha","はい","yes"],["ひ","hi","ひだり","left"],["ふ","fu","ふたつ","two (items)"],["へ","he","へや","room"],["ほ","ho","ほんとう","really?!"],
 ["ま","ma","まっすぐ","straight ahead"],["み","mi","みず","water"],["む","mu","むり","no way"],["め","me","めがね","glasses"],["も","mo","もういちど","one more time"],
 ["や","ya","やきとり","yakitori"],[null,null],["ゆ","yu","ゆっくり","slowly"],[null,null],["よ","yo","よやく","reservation"],
 ["ら","ra","らいねん","next year"],["り","ri","りょうり","cuisine"],["る","ru","たべる","to eat"],["れ","re","これ","this"],["ろ","ro","ろく","six"],
 ["わ","wa","わたし","I"],[null,null],["を","wo",null,"object marker only"],[null,null],["ん","n","うん","yeah (casual)"],
 ["が","ga","がんばって","good luck!"],["ぎ","gi","みぎ","right (side)"],["ぐ","gu","すぐ","right away"],["げ","ge","げんき","lively, well"],["ご","go","ごはん","rice, meal"],
 ["ざ","za","ざんねん","too bad!"],["じ","ji","じかん","time"],["ず","zu","ちず","map"],["ぜ","ze","ぜんぶ","everything"],["ぞ","zo","どうぞ","here you go"],
 ["だ","da","だめ","no good"],[null,null],[null,null],["で","de","でんしゃ","train"],["ど","do","どこ","where?"],
 ["ば","ba","かばん","bag"],["び","bi","えび","shrimp"],["ぶ","bu","ぶた","pork"],["べ","be","べんり","convenient"],["ぼ","bo","ぼく","I (casual)"],
 ["ぱ","pa","いっぱい","a lot, full"],["ぴ","pi","ぴったり","perfect fit"],["ぷ","pu","てんぷら","tempura"],["ぺ","pe","ぺこぺこ","starving"],["ぽ","po","さんぽ","a walk"]];
const KATA=[
 ["ア","a","アプリ","app"],["イ","i","イヤホン","earphones"],["ウ","u","ウイスキー","whisky"],["エ","e","エアコン","AC"],["オ","o","オススメ","recommended"],
 ["カ","ka","カート","(golf) cart"],["キ","ki","キャディー","caddie"],["ク","ku","クラブ","club"],["ケ","ke","ケーキ","cake"],["コ","ko","コーヒー","coffee"],
 ["サ","sa","サービス","on the house"],["シ","shi","ショット","shot"],["ス","su","スコア","score"],["セ","se","セット","set (meal)"],["ソ","so","ソース","sauce"],
 ["タ","ta","タクシー","taxi"],["チ","chi","チケット","ticket"],["ツ","tsu","ツアー","tour"],["テ","te","テレビ","TV"],["ト","to","トイレ","toilet"],
 ["ナ","na","ナイスショット","nice shot!"],["ニ","ni","ニュース","news"],["ヌ","nu","ヌードル","noodles"],["ネ","ne","ネット","internet"],["ノ","no","ノート","notebook"],
 ["ハ","ha","ハーフ","half (9 holes)"],["ヒ","hi","ヒント","hint"],["フ","fu","フロント","front desk"],["ヘ","he","ヘルメット","helmet"],["ホ","ho","ホテル","hotel"],
 ["マ","ma","マナー","etiquette"],["ミ","mi","ミルク","milk"],["ム","mu","チーム","team"],["メ","me","メニュー","menu"],["モ","mo","モーニング","breakfast set"],
 ["ヤ","ya","ヤバイ","crazy! (slang)"],[null,null],["ユ","yu","ユニクロ","Uniqlo"],[null,null],["ヨ","yo","ヨガ","yoga"],
 ["ラ","ra","ラーメン","ramen"],["リ","ri","リモコン","remote"],["ル","ru","ルール","rules"],["レ","re","レシート","receipt"],["ロ","ro","ロッカー","locker"],
 ["ワ","wa","ワイン","wine"],[null,null],[null,null],[null,null],["ン","n","パン","bread"],
 ["ガ","ga","ガイド","guide"],["ギ","gi","ギター","guitar"],["グ","gu","グリーン","the green"],["ゲ","ge","ゲーム","game"],["ゴ","go","ゴルフ","golf"],
 ["ザ","za","ピザ","pizza"],["ジ","ji","ジュース","juice"],["ズ","zu","サイズ","size"],["ゼ","ze","ゼロ","zero"],["ゾ","zo","ゾーン","zone"],
 ["ダ","da","ダブル","double (eagle!)"],[null,null],[null,null],["デ","de","デザート","dessert"],["ド","do","ドライバー","driver (club)"],
 ["バ","ba","バーディー","birdie"],["ビ","bi","ビール","beer"],["ブ","bu","ブランド","brand"],["ベ","be","ベッド","bed"],["ボ","bo","ボギー","bogey"],
 ["パ","pa","パー","par"],["ピ","pi","ピン","pin"],["プ","pu","プレー","a round, play"],["ペ","pe","ペン","pen"],["ポ","po","ポイント","points"]];
