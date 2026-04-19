// ─────────────────────────────────────────────
//  Shingara Singh's Line
//  (Son of Bakhtaur Singh × Harnam Kaur,
//   married Gurcharan Kaur — also Bakhtaur's daughter)
//  Color: Warm Amber / Gold
// ─────────────────────────────────────────────

export const RANJEET_SHINGARA_NODES = [

  // ── Shingara Singh + Gurcharan Kaur ──
  {"id":"aaaRSs001","data":{"name":"Shingara Singh","relation":"Ranjeet's Brother","side":"Ranjeet-Shingara","emoji":"👨","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Shingara Singh — brother of Par-Dadi Ranjeet Kaur, son of Bakhtaur Singh and Harnam Kaur.","gender":"M"},"rels":{"spouses":["aaaRSs002"],"parents":["aaaEJwnF","aaaEJwnG"],"children":["aaaRSs003","aaaRSs006","aaaRSs011"]}},
  {"id":"aaaRSs002","data":{"name":"Gurcharan Kaur","relation":"Shingara's Wife / Bakhtaur's Daughter","side":"Ranjeet-Shingara","emoji":"👩","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Gurcharan Kaur — wife of Shingara Singh and also daughter of Bakhtaur Singh and Harnam Kaur, sister of Ranjeet Kaur.","gender":"F"},"rels":{"spouses":["aaaRSs001"],"parents":["aaaEJwnF","aaaEJwnG"],"children":["aaaRSs003","aaaRSs006","aaaRSs011"]}},

  // ── Palwinder Singh + Amrit Kaur ──
  {"id":"aaaRSs003","data":{"name":"Palwinder Singh","relation":"Shingara's Son","side":"Ranjeet-Shingara","emoji":"👨","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Palwinder Singh — son of Shingara Singh and Gurcharan Kaur.","gender":"M"},"rels":{"spouses":["aaaRSs004"],"parents":["aaaRSs001","aaaRSs002"],"children":["aaaRSs005a","aaaRSs005b"]}},
  {"id":"aaaRSs004","data":{"name":"Amrit Kaur","relation":"Palwinder's Wife","side":"Ranjeet-Shingara","emoji":"👩","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Amrit Kaur — wife of Palwinder Singh.","gender":"F"},"rels":{"spouses":["aaaRSs003"],"parents":[],"children":["aaaRSs005a","aaaRSs005b"]}},
  {"id":"aaaRSs005a","data":{"name":"Maninder Singh","relation":"Palwinder's Son","side":"Ranjeet-Shingara","emoji":"👨","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Maninder Singh — son of Palwinder Singh and Amrit Kaur.","gender":"M"},"rels":{"spouses":["aaaRSs005c"],"parents":["aaaRSs003","aaaRSs004"],"children":[]}},
  {"id":"aaaRSs005c","data":{"name":"Mandeep Kaur","relation":"Maninder's Wife","side":"Ranjeet-Shingara","emoji":"👩","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Mandeep Kaur — wife of Maninder Singh.","gender":"F"},"rels":{"spouses":["aaaRSs005a"],"parents":[],"children":[]}},
  {"id":"aaaRSs005b","data":{"name":"Sukhdeep Singh","relation":"Palwinder's Son","side":"Ranjeet-Shingara","emoji":"👨","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Sukhdeep Singh — son of Palwinder Singh and Amrit Kaur.","gender":"M"},"rels":{"spouses":[],"parents":["aaaRSs003","aaaRSs004"],"children":[]}},

  // ── Baljeet Kaur + Nirbhai Singh ──
  {"id":"aaaRSs006","data":{"name":"Baljeet Kaur","relation":"Shingara's Daughter","side":"Ranjeet-Shingara","emoji":"👩","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Baljeet Kaur — daughter of Shingara Singh and Gurcharan Kaur.","gender":"F"},"rels":{"spouses":["aaaRSs007"],"parents":["aaaRSs001","aaaRSs002"],"children":["aaaRSs008","aaaRSs009"]}},
  {"id":"aaaRSs007","data":{"name":"Nirbhai Singh","relation":"Baljeet's Husband","side":"Ranjeet-Shingara","emoji":"👨","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Nirbhai Singh — husband of Baljeet Kaur.","gender":"M"},"rels":{"spouses":["aaaRSs006"],"parents":[],"children":["aaaRSs008","aaaRSs009"]}},
  {"id":"aaaRSs008","data":{"name":"Gurmeet Kaur","relation":"Baljeet's Daughter","side":"Ranjeet-Shingara","emoji":"👩","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Gurmeet Kaur — daughter of Baljeet Kaur and Nirbhai Singh.","gender":"F"},"rels":{"spouses":[],"parents":["aaaRSs006","aaaRSs007"],"children":[]}},
  {"id":"aaaRSs009","data":{"name":"Malkeet Singh","relation":"Baljeet's Son","side":"Ranjeet-Shingara","emoji":"👨","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Malkeet Singh — son of Baljeet Kaur and Nirbhai Singh.","gender":"M"},"rels":{"spouses":["aaaRSs010"],"parents":["aaaRSs006","aaaRSs007"],"children":["aaaRSs010a","aaaRSs010b","aaaRSs010c"]}},
  {"id":"aaaRSs010","data":{"name":"Kamalpreet Kaur","relation":"Malkeet's Wife","side":"Ranjeet-Shingara","emoji":"👩","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Kamalpreet Kaur — wife of Malkeet Singh.","gender":"F"},"rels":{"spouses":["aaaRSs009"],"parents":[],"children":["aaaRSs010a","aaaRSs010b","aaaRSs010c"]}},
  {"id":"aaaRSs010a","data":{"name":"Dilpreet Kaur","relation":"Malkeet's Daughter","side":"Ranjeet-Shingara","emoji":"👧","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Dilpreet Kaur — daughter of Malkeet Singh and Kamalpreet Kaur.","gender":"F"},"rels":{"spouses":[],"parents":["aaaRSs009","aaaRSs010"],"children":[]}},
  {"id":"aaaRSs010b","data":{"name":"Manraj Kaur","relation":"Malkeet's Daughter","side":"Ranjeet-Shingara","emoji":"👧","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Manraj Kaur — daughter of Malkeet Singh and Kamalpreet Kaur.","gender":"F"},"rels":{"spouses":[],"parents":["aaaRSs009","aaaRSs010"],"children":[]}},
  {"id":"aaaRSs010c","data":{"name":"Gurbaj Singh","relation":"Malkeet's Son","side":"Ranjeet-Shingara","emoji":"👦","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Gurbaj Singh — son of Malkeet Singh and Kamalpreet Kaur.","gender":"M"},"rels":{"spouses":[],"parents":["aaaRSs009","aaaRSs010"],"children":[]}},

  // ── Jasvir Kaur + Gurjeet Singh ──
  {"id":"aaaRSs011","data":{"name":"Jasvir Kaur","relation":"Shingara's Daughter","side":"Ranjeet-Shingara","emoji":"👩","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Jasvir Kaur — daughter of Shingara Singh and Gurcharan Kaur.","gender":"F"},"rels":{"spouses":["aaaRSs012"],"parents":["aaaRSs001","aaaRSs002"],"children":["aaaRSs013"]}},
  {"id":"aaaRSs012","data":{"name":"Gurjeet Singh","relation":"Jasvir's Husband","side":"Ranjeet-Shingara","emoji":"👨","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Gurjeet Singh — husband of Jasvir Kaur.","gender":"M"},"rels":{"spouses":["aaaRSs011"],"parents":[],"children":["aaaRSs013"]}},
  {"id":"aaaRSs013","data":{"name":"Manjinder Singh","relation":"Jasvir's Son","side":"Ranjeet-Shingara","emoji":"👦","color":"linear-gradient(135deg, #fef3d0, #fde68a)","note":"Manjinder Singh — son of Jasvir Kaur and Gurjeet Singh.","gender":"M"},"rels":{"spouses":[],"parents":["aaaRSs011","aaaRSs012"],"children":[]}},

];
