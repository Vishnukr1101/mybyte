export interface VisemeMapType {
  [key: number]: string;
}

// mapping from Microsoft viseme IDs to custom viseme IDs
export const visemeMap: { [phoneme: string]: string } = {
  // Silence
  sil: "viseme_sil",
  // Stops and Nasals
  p: "viseme_PP",
  b: "viseme_PP",
  m: "viseme_PP",
  t: "viseme_DD",
  d: "viseme_DD",
  n: "viseme_nn",
  k: "viseme_DD",
  g: "viseme_DD",
  ng: "viseme_nn",

  // Labio-dentals
  f: "viseme_FF",
  v: "viseme_FF",

  // Interdentals
  th: "viseme_TH",
  dh: "viseme_DD",

  // Fricatives
  s: "viseme_SS",
  z: "viseme_SS",
  sh: "viseme_SS",
  zh: "viseme_SS",

  // Affricates
  ch: "viseme_CH",
  jh: "viseme_CH",

  // Approximants
  l: "viseme_nn",
  r: "viseme_RR",
  w: "viseme_U",
  y: "viseme_E",

  // Back Vowels
  aa: "viseme_AA",
  ah: "viseme_AA",
  ao: "viseme_O",
  uh: "viseme_U",
  uw: "viseme_U",

  // Front Vowels
  ih: "viseme_I",
  ix: "viseme_I",
  eh: "viseme_E",
  ey: "viseme_E",
  ae: "viseme_AA",

  // Rounded Vowels
  ow: "viseme_U",
  aw: "viseme_U",
  oy: "viseme_U",
  ay: "viseme_AA",

  // Mid and Central Vowels
  er: "viseme_I",
  ax: "viseme_I",
  // uh: "viseme_U",
  // Miscellaneous
  h: "viseme_SS",
};

export const animationActions = [
  "acknowledging",
  "angry_gesture",
  "angry_point",
  "annoyed_head_shake",
  "being_cocky",
  "disappointed",
  "dismissing_gesture",
  "happy_hand_gesture",
  "happy_idle",
  "hard_head_nod",
  "head_nod_yes",
  "idle",
  "lengthy_head_nod",
  "look_away_gesture",
  "pointing",
  "pointing_1_",
  "quick_formal_bow",
  "relieved_sigh",
  "salute",
  "sarcastic_head_nod",
  "shaking_head_no",
  "talking",
  "talking_1_",
  "thoughtful_head_shake",
  "walking",
  "waving",
  "waving_1_",
  "weight_shift",
];
