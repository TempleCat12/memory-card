import image0 from '../images/image0.png'
import image1 from '../images/image1.png'
import image2 from '../images/image2.png'
import image3 from '../images/image3.png'
import image4 from '../images/image4.png'
import image5 from '../images/image5.png'
import image6 from '../images/image6.png'
import image7 from '../images/image7.png'
import image8 from '../images/image8.png'
import image9 from '../images/image9.png'
import image10 from '../images/image10.png'
import image11 from '../images/image11.png'
import image12 from '../images/image12.png'
import image13 from '../images/image13.png'
import image14 from '../images/image14.png'
import image15 from '../images/image15.png'
import image16 from '../images/image16.png'
import image17 from '../images/image17.png'

export  const cardsFactory = (gameLevel) => {
  if (gameLevel <= 0) return [];

  const source = imageFactory(gameLevel);
  const cards = [];
  for (let i = 0; i < source.length; i++) {
    while (true) {
      let random = Number.parseInt(Math.random() * source.length);
      if (!cards[random]) {
        cards[random] = source[i];
        cards[random].index = i;
        break;
      }
    }
  }
  return cards;
}

const imageFactory = (level) => {
    const list = images.slice(0, level)
    const deepCopy = list.map(a => Object.assign({},a))
  return list.concat(deepCopy)
  
};
const images = [
    {id: 0,
        index: 0,
        src: image0,
    },
    {id: 1,
        index: 0,
        src: image1,
    },
    {id: 2,
        index: 0,
        src: image2,
    },
    {id: 3,
        index: 0,
        src: image3,
    },
    {id: 4,
        index: 0,
        src: image4,
    },
    {id: 5,
        index: 0,
        src: image5,
    },
    {id: 6,
        index: 0,
        src: image6,
    },
    {id: 7,
        index: 0,
        src: image7,
    },
    {id: 8,
        index: 0,
        src: image8,
    },
    {id: 9,
        index: 0,
        src: image9,
    },
    {id: 10,
        index: 0,
        src: image10,
    },
    {id: 11,
        index: 0,
        src: image11,
    },
    {id: 12,
        index: 0,
        src: image12,
    },
    {id: 13,
        index: 0,
        src: image13,
    },
    {id: 14,
        index: 0,
        src: image14,
    },
    {id: 15,
        index: 0,
        src: image15,
    },
    {id: 16,
        index: 0,
        src: image16,
    },
    {id: 17,
        index: 0,
        src: image17,
    },
  ];

