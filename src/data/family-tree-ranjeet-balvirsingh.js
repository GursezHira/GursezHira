// ─────────────────────────────────────────────
//  Balvir Singh's Line
//  (Son of Harnam Singh × Naseeb Kaur,
//   married Gurmel Kaur — daughter of Bakhtaur Singh)
//  Color: Soft Indigo / Periwinkle
// ─────────────────────────────────────────────

export const RANJEET_BALVIRSINGH_NODES = [

  // ── Balvir Singh + Gurmel Kaur ──
  {"id":"aaaRSbv001","data":{"name":"Balvir Singh","relation":"Harnam's Son","side":"Ranjeet-BalvirSingh","emoji":"👨","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Balvir Singh — son of Harnam Singh and Naseeb Kaur, married Gurmel Kaur, daughter of Bakhtaur Singh.","gender":"M"},"rels":{"spouses":["aaaRSbv002"],"parents":["aaaRSh001","aaaRSh002"],"children":["aaaRSbv003","aaaRSbv007","aaaRSbv012","aaaRSbv018"]}},
  {"id":"aaaRSbv002","data":{"name":"Gurmel Kaur","relation":"Balvir Singh's Wife / Bakhtaur's Daughter","side":"Ranjeet-BalvirSingh","emoji":"👩","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Gurmel Kaur — wife of Balvir Singh and daughter of Bakhtaur Singh and Harnam Kaur, sister of Ranjeet Kaur.","gender":"F"},"rels":{"spouses":["aaaRSbv001"],"parents":["aaaEJwnF","aaaEJwnG"],"children":["aaaRSbv003","aaaRSbv007","aaaRSbv012","aaaRSbv018"]}},

  // ── Daljeet Kaur + Jasvir Singh ──
  {"id":"aaaRSbv003","data":{"name":"Daljeet Kaur","relation":"Balvir Singh's Daughter","side":"Ranjeet-BalvirSingh","emoji":"👩","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Daljeet Kaur — daughter of Balvir Singh and Gurmel Kaur.","gender":"F"},"rels":{"spouses":["aaaRSbv004"],"parents":["aaaRSbv001","aaaRSbv002"],"children":["aaaRSbv005"]}},
  {"id":"aaaRSbv004","data":{"name":"Jasvir Singh","relation":"Daljeet's Husband","side":"Ranjeet-BalvirSingh","emoji":"👨","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Jasvir Singh — husband of Daljeet Kaur (Balvir Singh's daughter).","gender":"M"},"rels":{"spouses":["aaaRSbv003"],"parents":[],"children":["aaaRSbv005"]}},
  {"id":"aaaRSbv005","data":{"name":"Telwinder Singh","relation":"Daljeet's Son","side":"Ranjeet-BalvirSingh","emoji":"👨","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Telwinder Singh — son of Daljeet Kaur and Jasvir Singh.","gender":"M"},"rels":{"spouses":["aaaRSbv006"],"parents":["aaaRSbv003","aaaRSbv004"],"children":["aaaRSbv006a"]}},
  {"id":"aaaRSbv006","data":{"name":"Jaspreet Kaur","relation":"Telwinder's Wife","side":"Ranjeet-BalvirSingh","emoji":"👩","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Jaspreet Kaur — wife of Telwinder Singh.","gender":"F"},"rels":{"spouses":["aaaRSbv005"],"parents":[],"children":["aaaRSbv006a"]}},
  {"id":"aaaRSbv006a","data":{"name":"Teghveer Singh","relation":"Telwinder's Son","side":"Ranjeet-BalvirSingh","emoji":"👦","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Teghveer Singh — son of Telwinder Singh and Jaspreet Kaur.","gender":"M"},"rels":{"spouses":[],"parents":["aaaRSbv005","aaaRSbv006"],"children":[]}},

  // ── Sarbjeet Kaur + Kuldeep Singh ──
  {"id":"aaaRSbv007","data":{"name":"Sarbjeet Kaur","relation":"Balvir Singh's Daughter","side":"Ranjeet-BalvirSingh","emoji":"👩","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Sarbjeet Kaur — daughter of Balvir Singh and Gurmel Kaur.","gender":"F"},"rels":{"spouses":["aaaRSbv008"],"parents":["aaaRSbv001","aaaRSbv002"],"children":["aaaRSbv009"]}},
  {"id":"aaaRSbv008","data":{"name":"Kuldeep Singh","relation":"Sarbjeet's Husband","side":"Ranjeet-BalvirSingh","emoji":"👨","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Kuldeep Singh — husband of Sarbjeet Kaur.","gender":"M"},"rels":{"spouses":["aaaRSbv007"],"parents":[],"children":["aaaRSbv009"]}},
  {"id":"aaaRSbv009","data":{"name":"Gurwinder Singh","relation":"Sarbjeet's Son","side":"Ranjeet-BalvirSingh","emoji":"👨","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Gurwinder Singh — son of Sarbjeet Kaur and Kuldeep Singh.","gender":"M"},"rels":{"spouses":["aaaRSbv010"],"parents":["aaaRSbv007","aaaRSbv008"],"children":[]}},
  {"id":"aaaRSbv010","data":{"name":"Gurmat Kaur","relation":"Gurwinder's Wife","side":"Ranjeet-BalvirSingh","emoji":"👩","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Gurmat Kaur — wife of Gurwinder Singh.","gender":"F"},"rels":{"spouses":["aaaRSbv009"],"parents":[],"children":[]}},

  // ── Gurjeet Singh + Karamjeet Kaur ──
  {"id":"aaaRSbv012","data":{"name":"Gurjeet Singh","relation":"Balvir Singh's Son","side":"Ranjeet-BalvirSingh","emoji":"👨","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Gurjeet Singh — son of Balvir Singh and Gurmel Kaur.","gender":"M"},"rels":{"spouses":["aaaRSbv013"],"parents":["aaaRSbv001","aaaRSbv002"],"children":["aaaRSbv014","aaaRSbv015","aaaRSbv016"]}},
  {"id":"aaaRSbv013","data":{"name":"Karamjeet Kaur","relation":"Gurjeet Singh's Wife","side":"Ranjeet-BalvirSingh","emoji":"👩","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Karamjeet Kaur — wife of Gurjeet Singh.","gender":"F"},"rels":{"spouses":["aaaRSbv012"],"parents":[],"children":["aaaRSbv014","aaaRSbv015","aaaRSbv016"]}},
  {"id":"aaaRSbv014","data":{"name":"Gaganjeet Kaur","relation":"Gurjeet Singh's Daughter","side":"Ranjeet-BalvirSingh","emoji":"👩","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Gaganjeet Kaur — daughter of Gurjeet Singh and Karamjeet Kaur.","gender":"F"},"rels":{"spouses":["aaaRSbv014s"],"parents":["aaaRSbv012","aaaRSbv013"],"children":[]}},
  {"id":"aaaRSbv014s","data":{"name":"Satwinder Singh","relation":"Gaganjeet's Husband","side":"Ranjeet-BalvirSingh","emoji":"👨","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Satwinder Singh — husband of Gaganjeet Kaur.","gender":"M"},"rels":{"spouses":["aaaRSbv014"],"parents":[],"children":[]}},
  {"id":"aaaRSbv015","data":{"name":"Hasandeep Singh","relation":"Gurjeet Singh's Son","side":"Ranjeet-BalvirSingh","emoji":"👦","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Hasandeep Singh — son of Gurjeet Singh and Karamjeet Kaur.","gender":"M"},"rels":{"spouses":[],"parents":["aaaRSbv012","aaaRSbv013"],"children":[]}},
  {"id":"aaaRSbv016","data":{"name":"Dilpreet Singh","relation":"Gurjeet Singh's Son","side":"Ranjeet-BalvirSingh","emoji":"👦","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Dilpreet Singh — son of Gurjeet Singh and Karamjeet Kaur.","gender":"M"},"rels":{"spouses":[],"parents":["aaaRSbv012","aaaRSbv013"],"children":[]}},

  // ── Ranjeet Singh + Charanjeet Kaur ──
  {"id":"aaaRSbv018","data":{"name":"Ranjeet Singh","relation":"Balvir Singh's Son","side":"Ranjeet-BalvirSingh","emoji":"👨","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Ranjeet Singh — son of Balvir Singh and Gurmel Kaur.","gender":"M"},"rels":{"spouses":["aaaRSbv019"],"parents":["aaaRSbv001","aaaRSbv002"],"children":["aaaRSbv020","aaaRSbv022"]}},
  {"id":"aaaRSbv019","data":{"name":"Charanjeet Kaur","relation":"Ranjeet Singh's Wife","side":"Ranjeet-BalvirSingh","emoji":"👩","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Charanjeet Kaur — wife of Ranjeet Singh.","gender":"F"},"rels":{"spouses":["aaaRSbv018"],"parents":[],"children":["aaaRSbv020","aaaRSbv022"]}},
  {"id":"aaaRSbv020","data":{"name":"Babneet Kaur","relation":"Ranjeet Singh's Daughter","side":"Ranjeet-BalvirSingh","emoji":"👩","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Babneet Kaur — daughter of Ranjeet Singh and Charanjeet Kaur.","gender":"F"},"rels":{"spouses":["aaaRSbv021"],"parents":["aaaRSbv018","aaaRSbv019"],"children":[]}},
  {"id":"aaaRSbv021","data":{"name":"Gurinder Singh","relation":"Babneet's Husband","side":"Ranjeet-BalvirSingh","emoji":"👨","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Gurinder Singh — husband of Babneet Kaur.","gender":"M"},"rels":{"spouses":["aaaRSbv020"],"parents":[],"children":[]}},
  {"id":"aaaRSbv022","data":{"name":"Harmeet Singh","relation":"Ranjeet Singh's Son","side":"Ranjeet-BalvirSingh","emoji":"👨","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Harmeet Singh — son of Ranjeet Singh and Charanjeet Kaur.","gender":"M"},"rels":{"spouses":["aaaRSbv023"],"parents":["aaaRSbv018","aaaRSbv019"],"children":[]}},
  {"id":"aaaRSbv023","data":{"name":"Simran Kaur","relation":"Harmeet's Wife","side":"Ranjeet-BalvirSingh","emoji":"👩","color":"linear-gradient(135deg, #e0e7ff, #c7d2fe)","note":"Simran Kaur — wife of Harmeet Singh.","gender":"F"},"rels":{"spouses":["aaaRSbv022"],"parents":[],"children":[]}},

];
