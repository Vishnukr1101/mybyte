import fs from 'fs'
import path from 'path';

export const helloViseme = [
  {
    time: 125,
    type: "viseme",
    value: "k",
  },
  {
    time: 200,
    type: "viseme",
    value: "@",
  },
  {
    time: 250,
    type: "viseme",
    value: "t",
  },
  {
    time: 412,
    type: "viseme",
    value: "@",
  },
  {
    time: 562,
    type: "viseme",
    value: "sil",
  },
  {
    time: 750,
    type: "viseme",
    value: "k",
  },
  {
    time: 1062,
    type: "viseme",
    value: "a",
  },
  {
    time: 1312,
    type: "viseme",
    value: "k",
  },
  {
    time: 1375,
    type: "viseme",
    value: "a",
  },
  {
    time: 1400,
    type: "viseme",
    value: "t",
  },
  {
    time: 1562,
    type: "viseme",
    value: "a",
  },
  {
    time: 1625,
    type: "viseme",
    value: "k",
  },
  {
    time: 1750,
    type: "viseme",
    value: "E",
  },
  {
    time: 1812,
    type: "viseme",
    value: "t",
  },
  {
    time: 1875,
    type: "viseme",
    value: "p",
  },
  {
    time: 2037,
    type: "viseme",
    value: "i",
  },
  {
    time: 2125,
    type: "viseme",
    value: "u",
  },
  {
    time: 2462,
    type: "viseme",
    value: "sil",
  },
];

export const audioFileStream = fs.createReadStream(path.join(__dirname, 'hello.mp3'));