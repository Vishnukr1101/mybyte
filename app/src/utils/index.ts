export interface VisemeMapType {
  [key: number]: string;
}

// mapping from Microsoft viseme IDs to custom viseme IDs
export const visemeMap: VisemeMapType = {
  0: "viseme_sil", // Silence
  1: "viseme_PP", // p, b, m
  2: "viseme_PP", // p, b, m
  3: "viseme_FF", // f, v
  4: "viseme_I", // ih, ix
  5: "viseme_E", // eh
  6: "viseme_SS", // s, z
  7: "viseme_AA", // ae
  8: "viseme_AA", // aa
  9: "viseme_AA", // ah
  10: "viseme_O", // ao
  11: "viseme_E", // ey
  12: "viseme_U", // aw
  13: "viseme_U", // ow
  14: "viseme_U", // uh
  15: "viseme_U", // uw
  16: "viseme_I", // er
  17: "viseme_I", // ax
  18: "viseme_CH", // ch, jh
  19: "viseme_DD", // dh, t, d
  20: "viseme_nn", // n, l
  21: "viseme_RR", // r
  22: "viseme_TH", // th
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
