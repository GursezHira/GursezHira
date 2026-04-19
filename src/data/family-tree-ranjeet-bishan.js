// ─────────────────────────────────────────────
//  Bishan Singh — Root Node
//  + Bakhtaur Singh's line (Ranjeet Kaur's
//    immediate family & her siblings)
//  Color: Soft Teal / Mint
// ─────────────────────────────────────────────

export const RANJEET_BISHAN_NODES = [

  // ── Root ──
  {"id":"aaaRSb000","data":{"name":"Bishan Singh","relation":"Par-Par-Par-Dada (Ranjeet's Grandfather)","side":"Ranjeet-Bishan","emoji":"👴","color":"linear-gradient(135deg, #d4f5ef, #a8ebe0)","note":"Bishan Singh — the root of Ranjeet Kaur's family line, whose legacy flows through the generations all the way to little Gursez.","gender":"M"},"rels":{"spouses":[],"parents":[],"children":["aaaEJwnF","aaaRSh001"]}},

  // ── Bakhtaur Singh + Harnam Kaur ──
  {"id":"aaaEJwnF","data":{"name":"Bakhtaur Singh","relation":"Par-Par-Dada (Ranjeet's Father)","side":"Ranjeet-Bishan","emoji":"👴","color":"linear-gradient(135deg, #d4f5ef, #a8ebe0)","note":"Bakhtaur Singh — Par-Dadi Ranjeet Kaur's father, whose strength and blessings flow through the generations all the way to little Gursez.","gender":"M"},"rels":{"spouses":["aaaEJwnG"],"parents":["aaaRSb000"],"children":["aaaEJwnr","aaaRSd001","aaaRSl001","aaaRSp001","aaaRSs001","aaaRSs002","aaaRSrt002","aaaRSbv002"]}},
  {"id":"aaaEJwnG","data":{"name":"Harnam Kaur","relation":"Par-Par-Dadi (Ranjeet's Mother)","side":"Ranjeet-Bishan","emoji":"👵","color":"linear-gradient(135deg, #d4f5ef, #a8ebe0)","note":"Harnam Kaur — Par-Dadi Ranjeet Kaur's mother, a woman of warmth and grace whose love quietly echoes through every generation.","gender":"F"},"rels":{"spouses":["aaaEJwnF"],"parents":[],"children":["aaaEJwnr","aaaRSd001","aaaRSl001","aaaRSp001","aaaRSs001","aaaRSs002","aaaRSrt002","aaaRSbv002"]}},

  // ── Ranjeet Kaur (connects to paternal tree) ──
  // Note: aaaEJwnr is defined in family-tree-paternal.js — listed here only as a child reference

  // ── Daljeet Kaur + Piara Singh ──
  {"id":"aaaRSd001","data":{"name":"Daljeet Kaur","relation":"Ranjeet's Sister","side":"Ranjeet-Bishan","emoji":"👩","color":"linear-gradient(135deg, #d4f5ef, #a8ebe0)","note":"Daljeet Kaur — sister of Par-Dadi Ranjeet Kaur.","gender":"F"},"rels":{"spouses":["aaaRSd002"],"parents":["aaaEJwnF","aaaEJwnG"],"children":[]}},
  {"id":"aaaRSd002","data":{"name":"Piara Singh","relation":"Daljeet's Husband","side":"Ranjeet-Bishan","emoji":"👨","color":"linear-gradient(135deg, #d4f5ef, #a8ebe0)","note":"Piara Singh — husband of Daljeet Kaur.","gender":"M"},"rels":{"spouses":["aaaRSd001"],"parents":[],"children":[]}},

  // ── Labh Singh ──
  {"id":"aaaRSl001","data":{"name":"Labh Singh","relation":"Ranjeet's Brother","side":"Ranjeet-Bishan","emoji":"👨","color":"linear-gradient(135deg, #d4f5ef, #a8ebe0)","note":"Labh Singh — brother of Par-Dadi Ranjeet Kaur.","gender":"M"},"rels":{"spouses":[],"parents":["aaaEJwnF","aaaEJwnG"],"children":[]}},

  // ── Preet Kaur ──
  {"id":"aaaRSp001","data":{"name":"Preet Kaur","relation":"Ranjeet's Sister","side":"Ranjeet-Bishan","emoji":"👩","color":"linear-gradient(135deg, #d4f5ef, #a8ebe0)","note":"Preet Kaur — sister of Par-Dadi Ranjeet Kaur.","gender":"F"},"rels":{"spouses":[],"parents":["aaaEJwnF","aaaEJwnG"],"children":["aaaRSp002","aaaRSp003"]}},
  {"id":"aaaRSp002","data":{"name":"Kulwinder Singh","relation":"Preet's Son","side":"Ranjeet-Bishan","emoji":"👨","color":"linear-gradient(135deg, #d4f5ef, #a8ebe0)","note":"Kulwinder Singh — son of Preet Kaur.","gender":"M"},"rels":{"spouses":[],"parents":["aaaRSp001"],"children":[]}},
  {"id":"aaaRSp003","data":{"name":"Paramjeet Kaur","relation":"Preet's Daughter","side":"Ranjeet-Bishan","emoji":"👩","color":"linear-gradient(135deg, #d4f5ef, #a8ebe0)","note":"Paramjeet Kaur — daughter of Preet Kaur.","gender":"F"},"rels":{"spouses":["aaaRSp004"],"parents":["aaaRSp001"],"children":[]}},
  {"id":"aaaRSp004","data":{"name":"Mukhtiyar Singh","relation":"Paramjeet's Husband","side":"Ranjeet-Bishan","emoji":"👨","color":"linear-gradient(135deg, #d4f5ef, #a8ebe0)","note":"Mukhtiyar Singh — husband of Paramjeet Kaur.","gender":"M"},"rels":{"spouses":["aaaRSp003"],"parents":[],"children":[]}},

];
