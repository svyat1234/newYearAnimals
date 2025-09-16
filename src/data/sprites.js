const img = (name) => new URL(`../assets/images/${name
}`,
 import.meta.url).toString()

export const sprites = [
  { id: 'couple-with-dog',
    src: img('couple-with-dog.svg'),
    top: 552,
    left: 1095,
    width: 542,
    z: 10,
    mobile: { top: 377.23, left: 21, width: 222 }
  },

  { id: 'family',
    src: img('family.svg'),
    top: 728,
    left: 382,
    width: 360,
    z: 10,
    mobile: { hidden: true }
  },

  { id: 'boy-with-snowballs',
    src: img('boy-with-snowballs.svg'),
    top: 1103,
    left: 127,
    width: 299,
    z: 10,
    mobile: { top: 727, left: -12, width: 101 }
  },

  { id: 'flowers',
    src: img('flowers.svg'),
    top: 1229,
    left: 925,
    width: 209,
    z: 10,
    mobile: { top: 726, left: 185, width: 116 }
  },

  { id: 'hedgehog',
    src: img('hedgehog.svg'),
    top: 1321,
    left: 960,
    width: 154,
    z: 10,
    mobile: { top: 783, left: 196, width: 63 }
  },

  { id: 'boy',
    src: img('boy.svg'),
    top: 1159,
    left: 1138,
    width: 276,
    z: 10,
    mobile: { hidden: true }
  },

  { id: 'girl-and-snowman',
    src: img('girl-and-snowman.svg'),
    top: 1081,
    left: 1414,
    width: 342,
    z: 10,
    mobile: { top: 618, left: 159, width: 134 }
  },

  { id: 'lamp-post',
    src: img('lamp-post.svg'),
    top: 1198,
    left: 510,
    width: 254,
    z: 10,
    mobile: { top: 590, left: -19, width: 96 }
  },

  { id: 'pigeon',
    src: img('pigeon.svg'),
    top: 1567,
    left: 428,
    width: 254,
    z: 10,
    mobile: { top: 955, left: 17, width: 77 }
  },

  { id: 'trees',
    src: img('trees.svg'),
    top: 1410,
    left: 1441,
    width: 391,
    z: 10,
    mobile: { top: 840, left: 150, width: 173 }
  },

  { id: 'lapm-post-2',
    src: img('lamp-post-2.svg'),
    top: 1841,
    left: 156,
    width: 256,
    z: 11,
    mobile: { top: 1026, left: 14, width: 101 }
  },

  { id: 'man-with-dog',
    src: img('man-with-dog.svg'),
    top: 1872,
    left: 747,
    width: 210,
    z: 11,
    mobile: { top: 1190, left: 62, width: 100 }
  },

  { id: 'sign',
    src: img('sign.svg'),
    top: 1823,
    left: 885,
    width: 118,
    z: 10,
    mobile: { top: 1011, left: 242, width: 56 }
  },

  { id: 'bush-3',
    src: img('bush-3.svg'),
    top: 1715,
    left: 1012,
    width: 235,
    z: 10,
    mobile: { top: 1300, left: 221, width: 93 }
  },

  { id: 'pond',
    src: img('pond.svg'),
    top: 1814,
    left: 980,
    width: 1300,
    z: 10,
    mobile: { top: 1085, left: 65, width: 445 }
  },

  { id: 'girl-with-phone',
    src: img('girl-with-phone.svg'),
    top: 2172,
    left: 948,
    width: 130,
    z: 10,
    mobile: { top: 1144, left: 31, width: 61 }
  },

  { id: 'bush',
    src: img('bush.svg'),
    top: 2258,
    left: 1309,
    width: 235,
    z: 10,
    mobile: { top: 1031, left: 160, width: 91 }
  },

  { id: 'bush-2',
    src: img('bush-2.svg'),
    top: 2259,
    left: 1641,
    width: 235,
    z: 10,
    mobile: { top: 1331, left: -12, width: 111 }
  },

  { id: 'forest-and-fox',
    src: img('forest-and-fox.svg'),
    top: 2463,
    left: 151,
    width: 900,
    z: 10,
    mobile: { top: 1613, left: 25, width: 325 }
  },

  { id: 'dog',
    src: img('dog.svg'),
    top: 2613,
    left: 1383,
    width: 527,
    z: 10,
    mobile: { top: 1504, left: 23, width: 181 }
  },

  { id: 'lamp-post-3',
    src: img('lamp-post-3.svg'),
    top: 2469,
    left: 1213,
    width: 243,
    z: 10,
    mobile: { top: 1491, left: 197, width: 88 }
  },

  { id: 'snowman',
    src: img('snowman.svg'),
    top: 3026,
    left: 1392,
    width: 313,
    z: 10,
    mobile: { top: 1372, left: 175, width: 124 }
  },

  { id: 'girl',
    src: img('girl.svg'),
    top: 3248,
    left: 1555,
    width: 322,
    z: 10,
    mobile: { top: 2356, left: 178, width: 115 }
  },

  { id: 'house',
    src: img('house.svg'),
    top: 3382,
    left: -764,
    width: 1981,
    z: 10,
    mobile: { top: 1969, left: -246, width: 551 }
  },

  { id: 'lamp-post-4',
    src: img('lamp-post-4.svg'),
    top: 3478,
    left: 1307,
    width: 246,
    z: 10,
    mobile: { top: 2519, left: 45, width: 103 }
  },

  { id: 'girl-skiing',
    src: img('girl-skiing.svg'),
    top: 4353,
    left: 1563,
    width: 281,
    z: 10,
    mobile: { hidden: true }
  },

  { id: 'cars',
    src: img('cars.svg'),
    top: 4702,
    left: 1541,
    width: 662,
    z: 10,
    mobile: { top: 2646, left: 161, width: 233 }
  },

  { id: 'cat',
    src: img('cat.svg'),
    top: 4804,
    left: 840,
    width: 253,
    z: 10,
    mobile: { top: 2512, left: 170.1, width: 75 }
  },

  { id: 'snowdrift',
    src: img('snowdrift.svg'),
    top: 4885,
    left: 720,
    width: 134,
    z: 10,
    mobile: { top: 2544, left: 207.89, width: 53 }
  },

];