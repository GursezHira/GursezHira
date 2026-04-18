// ─────────────────────────────────────────────
//  Ranjeet Kaur's Family Line
//  Includes: Par-Dadi's parents & all siblings/descendants
// ─────────────────────────────────────────────

export const RANJEET_SIDE_NODES = [

  // ── Generation 1: Bakhtaur Singh & Harnam Kaur ──
  {"id":"aaaEJwnF","data":{"name":"Bakhtaur Singh","relation":"Par-Par-Dada (Ranjeet's Father)","side":"Ranjeet-Side","emoji":"👴","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Bakhtaur Singh — Par-Dadi Ranjeet Kaur's father, whose strength and blessings flow through the generations all the way to little Gursez.","gender":"M"},"rels":{"spouses":["aaaEJwnG"],"parents":[],"children":["aaaEJwnr","aaaRSd001","aaaRSl001","aaaRSp001","aaaRSs001"]}},
  {"id":"aaaEJwnG","data":{"name":"Harnam Kaur","relation":"Par-Par-Dadi (Ranjeet's Mother)","side":"Ranjeet-Side","emoji":"👵","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Harnam Kaur — Par-Dadi Ranjeet Kaur's mother, a woman of warmth and grace whose love quietly echoes through every generation.","gender":"F"},"rels":{"spouses":["aaaEJwnF"],"parents":[],"children":["aaaEJwnr","aaaRSd001","aaaRSl001","aaaRSp001","aaaRSs001"]}},

  // ── Generation 2: Bakhtaur & Harnam's Children (siblings of Ranjeet Kaur) ──

  // Daljeet Kaur + Piara Singh
  {"id":"aaaRSd001","data":{"name":"Daljeet Kaur","relation":"Ranjeet's Sister","side":"Ranjeet-Side","emoji":"👩","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Daljeet Kaur — sister of Par-Dadi Ranjeet Kaur, carrying the warmth of the Bakhtaur family forward.","gender":"F"},"rels":{"spouses":["aaaRSd002"],"parents":["aaaEJwnF","aaaEJwnG"],"children":[]}},
  {"id":"aaaRSd002","data":{"name":"Piara Singh","relation":"Ranjeet's Brother-in-Law","side":"Ranjeet-Side","emoji":"👨","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Piara Singh — husband of Daljeet Kaur, a welcomed addition to the family.","gender":"M"},"rels":{"spouses":["aaaRSd001"],"parents":[],"children":[]}},

  // Labh Singh (unmarried / no children listed)
  {"id":"aaaRSl001","data":{"name":"Labh Singh","relation":"Ranjeet's Brother","side":"Ranjeet-Side","emoji":"👨","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Labh Singh — brother of Par-Dadi Ranjeet Kaur, a proud member of the Bakhtaur family line.","gender":"M"},"rels":{"spouses":[],"parents":["aaaEJwnF","aaaEJwnG"],"children":[]}},

  // Preet Kaur + 2 children
  {"id":"aaaRSp001","data":{"name":"Preet Kaur","relation":"Ranjeet's Sister","side":"Ranjeet-Side","emoji":"👩","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Preet Kaur — sister of Par-Dadi Ranjeet Kaur, whose own family continues the legacy.","gender":"F"},"rels":{"spouses":[],"parents":["aaaEJwnF","aaaEJwnG"],"children":["aaaRSp002","aaaRSp003"]}},
  {"id":"aaaRSp002","data":{"name":"Kulwinder Singh","relation":"Ranjeet's Nephew","side":"Ranjeet-Side","emoji":"👨","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Kulwinder Singh — son of Preet Kaur, part of the next generation of the Bakhtaur family.","gender":"M"},"rels":{"spouses":[],"parents":["aaaRSp001"],"children":[]}},
  {"id":"aaaRSp003","data":{"name":"Paramjeet Kaur","relation":"Ranjeet's Niece","side":"Ranjeet-Side","emoji":"👩","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Paramjeet Kaur — daughter of Preet Kaur, married into the family with love.","gender":"F"},"rels":{"spouses":["aaaRSp004"],"parents":["aaaRSp001"],"children":[]}},
  {"id":"aaaRSp004","data":{"name":"Mukhtiyar Singh","relation":"Ranjeet's Niece's Husband","side":"Ranjeet-Side","emoji":"👨","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Mukhtiyar Singh — husband of Paramjeet Kaur, a cherished part of the extended family.","gender":"M"},"rels":{"spouses":["aaaRSp003"],"parents":[],"children":[]}},

  // Shingara Singh + Gurcharan Kaur + 3 children
  {"id":"aaaRSs001","data":{"name":"Shingara Singh","relation":"Ranjeet's Brother","side":"Ranjeet-Side","emoji":"👨","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Shingara Singh — brother of Par-Dadi Ranjeet Kaur, whose family grew into a wonderful branch of the tree.","gender":"M"},"rels":{"spouses":["aaaRSs002"],"parents":["aaaEJwnF","aaaEJwnG"],"children":["aaaRSs003","aaaRSs006","aaaRSs011"]}},
  {"id":"aaaRSs002","data":{"name":"Gurcharan Kaur","relation":"Ranjeet's Sister-in-Law","side":"Ranjeet-Side","emoji":"👵","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Gurcharan Kaur — wife of Shingara Singh, a pillar of warmth and love in the family.","gender":"F"},"rels":{"spouses":["aaaRSs001"],"parents":[],"children":["aaaRSs003","aaaRSs006","aaaRSs011"]}},

  // ── Generation 3: Shingara's Children ──

  // Palwinder Singh + Amrit Kaur
  {"id":"aaaRSs003","data":{"name":"Palwinder Singh","relation":"Shingara's Son","side":"Ranjeet-Side","emoji":"👨","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Palwinder Singh — son of Shingara Singh and Gurcharan Kaur, continuing the family with pride.","gender":"M"},"rels":{"spouses":["aaaRSs004"],"parents":["aaaRSs001","aaaRSs002"],"children":["aaaRSs005a","aaaRSs005b"]}},
  {"id":"aaaRSs004","data":{"name":"Amrit Kaur","relation":"Palwinder's Wife","side":"Ranjeet-Side","emoji":"👩","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Amrit Kaur — wife of Palwinder Singh, bringing grace and love to the family.","gender":"F"},"rels":{"spouses":["aaaRSs003"],"parents":[],"children":["aaaRSs005a","aaaRSs005b"]}},

  // ── Generation 4: Palwinder's Children ──
  {"id":"aaaRSs005a","data":{"name":"Maninder Singh","relation":"Palwinder's Son","side":"Ranjeet-Side","emoji":"👨","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Maninder Singh — son of Palwinder Singh and Amrit Kaur, married and carrying the family story forward.","gender":"M"},"rels":{"spouses":["aaaRSs005c"],"parents":["aaaRSs003","aaaRSs004"],"children":[]}},
  {"id":"aaaRSs005c","data":{"name":"Mandeep Kaur","relation":"Maninder's Wife","side":"Ranjeet-Side","emoji":"👩","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Mandeep Kaur — wife of Maninder Singh, a loving addition to the family.","gender":"F"},"rels":{"spouses":["aaaRSs005a"],"parents":[],"children":[]}},
  {"id":"aaaRSs005b","data":{"name":"Sukhdeep Singh","relation":"Palwinder's Son","side":"Ranjeet-Side","emoji":"👨","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Sukhdeep Singh — son of Palwinder Singh and Amrit Kaur.","gender":"M"},"rels":{"spouses":[],"parents":["aaaRSs003","aaaRSs004"],"children":[]}},

  // Baljeet Kaur + Nirbhai Singh
  {"id":"aaaRSs006","data":{"name":"Baljeet Kaur","relation":"Shingara's Daughter","side":"Ranjeet-Side","emoji":"👩","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Baljeet Kaur — daughter of Shingara Singh and Gurcharan Kaur, whose family carries on with love.","gender":"F"},"rels":{"spouses":["aaaRSs007"],"parents":["aaaRSs001","aaaRSs002"],"children":["aaaRSs008","aaaRSs009"]}},
  {"id":"aaaRSs007","data":{"name":"Nirbhai Singh","relation":"Baljeet's Husband","side":"Ranjeet-Side","emoji":"👨","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Nirbhai Singh — husband of Baljeet Kaur, a steadfast presence in the family.","gender":"M"},"rels":{"spouses":["aaaRSs006"],"parents":[],"children":["aaaRSs008","aaaRSs009"]}},

  // ── Generation 4: Baljeet's Children ──
  {"id":"aaaRSs008","data":{"name":"Gurmeet Kaur","relation":"Baljeet's Daughter","side":"Ranjeet-Side","emoji":"👩","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Gurmeet Kaur — daughter of Baljeet Kaur and Nirbhai Singh.","gender":"F"},"rels":{"spouses":[],"parents":["aaaRSs006","aaaRSs007"],"children":[]}},
  {"id":"aaaRSs009","data":{"name":"Malkeet Singh","relation":"Baljeet's Son","side":"Ranjeet-Side","emoji":"👨","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Malkeet Singh — son of Baljeet Kaur and Nirbhai Singh, whose family continues to flourish.","gender":"M"},"rels":{"spouses":["aaaRSs010"],"parents":["aaaRSs006","aaaRSs007"],"children":["aaaRSs010a","aaaRSs010b","aaaRSs010c"]}},
  {"id":"aaaRSs010","data":{"name":"Kamalpreet Kaur","relation":"Malkeet's Wife","side":"Ranjeet-Side","emoji":"👩","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Kamalpreet Kaur — wife of Malkeet Singh, bringing joy and warmth to the family.","gender":"F"},"rels":{"spouses":["aaaRSs009"],"parents":[],"children":["aaaRSs010a","aaaRSs010b","aaaRSs010c"]}},

  // ── Generation 5: Malkeet's Children ──
  {"id":"aaaRSs010a","data":{"name":"Dilpreet Kaur","relation":"Malkeet's Daughter","side":"Ranjeet-Side","emoji":"👧","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Dilpreet Kaur — daughter of Malkeet Singh and Kamalpreet Kaur.","gender":"F"},"rels":{"spouses":[],"parents":["aaaRSs009","aaaRSs010"],"children":[]}},
  {"id":"aaaRSs010b","data":{"name":"Manraj Kaur","relation":"Malkeet's Daughter","side":"Ranjeet-Side","emoji":"👧","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Manraj Kaur — daughter of Malkeet Singh and Kamalpreet Kaur.","gender":"F"},"rels":{"spouses":[],"parents":["aaaRSs009","aaaRSs010"],"children":[]}},
  {"id":"aaaRSs010c","data":{"name":"Gurbaj Singh","relation":"Malkeet's Son","side":"Ranjeet-Side","emoji":"👦","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Gurbaj Singh — son of Malkeet Singh and Kamalpreet Kaur.","gender":"M"},"rels":{"spouses":[],"parents":["aaaRSs009","aaaRSs010"],"children":[]}},

  // Jasvir Kaur + Gurjeet Singh
  {"id":"aaaRSs011","data":{"name":"Jasvir Kaur","relation":"Shingara's Daughter","side":"Ranjeet-Side","emoji":"👩","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Jasvir Kaur — daughter of Shingara Singh and Gurcharan Kaur, whose family carries love forward.","gender":"F"},"rels":{"spouses":["aaaRSs012"],"parents":["aaaRSs001","aaaRSs002"],"children":["aaaRSs013"]}},
  {"id":"aaaRSs012","data":{"name":"Gurjeet Singh","relation":"Jasvir's Husband","side":"Ranjeet-Side","emoji":"👨","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Gurjeet Singh — husband of Jasvir Kaur, a loving addition to the Shingara family branch.","gender":"M"},"rels":{"spouses":["aaaRSs011"],"parents":[],"children":["aaaRSs013"]}},

  // ── Generation 4: Jasvir's Child ──
  {"id":"aaaRSs013","data":{"name":"Manjinder Singh","relation":"Jasvir's Son","side":"Ranjeet-Side","emoji":"👦","color":"linear-gradient(135deg, #fde8f0, #fce4ee)","note":"Manjinder Singh — son of Jasvir Kaur and Gurjeet Singh.","gender":"M"},"rels":{"spouses":[],"parents":["aaaRSs011","aaaRSs012"],"children":[]}},

];