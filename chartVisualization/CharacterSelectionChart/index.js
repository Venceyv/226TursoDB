const ctx = document.querySelector('.radar-chart');

const selectMenu = document.querySelector('#character');

const cardTitle = document.querySelector('.title');
const cardGender = document.querySelector('.gender');
const cardEntertainment = document.querySelector('.entertainment');
const cardDob = document.querySelector('.dob');
const cardAge = document.querySelector('.age');
const cardPhysical = document.querySelector('.physical');
const cardPotential = document.querySelector('.potential');
const cardDefense = document.querySelector('.defense');
const cardIntelligence = document.querySelector('.intelligence');
const cardMagic = document.querySelector('.magic');
const cardAgility = document.querySelector('.agility');

const tempData = [
  {
    CharacterId: '515f03c9c09ddb83093b47cccab8e6fc0d5ea81b',
    ActorId: 'ccb0ed6abcba5639749e60573cc84ea744293ea9',
    name: 'Luka',
    actor: 'Erica Mendez',
    gender: 'female',
    dob: '2003-10-26T10:37:29.249Z',
    age: 20,
    EntertainmentId: 'Honkai: Star Rail',
    physical: null,
    potential: null,
    defense: null,
    intelligence: null,
    magic: null,
    agility: null,
  },
  {
    CharacterId: '4f8365364d1a146585621c676f077f78218d90fd',
    ActorId: 'badaa39ba1c01abcb6d8913f6011ae2bfbbc2d7e',
    name: 'Lynette',
    actor: 'Brianna Knickerbocker',
    gender: 'female',
    dob: '1991-03-06T12:59:04.711Z',
    age: 32,
    EntertainmentId: 'Genshin Impact',
    physical: null,
    potential: null,
    defense: null,
    intelligence: null,
    magic: null,
    agility: null,
  },
  {
    CharacterId: '35ca1b689c490939324abeaef96715f285533b31',
    ActorId: 'ec91f09d649ceec15c13138bbe50cd3314538b2c',
    name: 'Barbara',
    actor: 'Josey Montana McCoy',
    gender: 'male',
    dob: '1992-02-03T18:58:11.330Z',
    age: 31,
    EntertainmentId: 'Genshin Impact',
    physical: null,
    potential: null,
    defense: null,
    intelligence: null,
    magic: null,
    agility: null,
  },
  {
    CharacterId: '145592e2f5f971e7c84c7a9c71e95624e0f6ef36',
    ActorId: '8b82bf194463f53172cc042bfa717b4ed74af0fa',
    name: 'Jean',
    actor: 'Nazeeh Tarsha',
    gender: 'female',
    dob: '1963-09-23T12:32:04.230Z',
    age: 60,
    EntertainmentId: 'Genshin Impact',
    physical: null,
    potential: null,
    defense: null,
    intelligence: null,
    magic: null,
    agility: null,
  },
  {
    CharacterId: 'bc3060d1f37960fca2fb6c3bf72fa39fc82c3326',
    ActorId: '7918c0408cd930a283ccd6bf8f796378bf999fc8',
    name: 'Amber',
    actor: 'Su Ling Chan',
    gender: 'female',
    dob: '1956-10-17T12:10:53.762Z',
    age: 67,
    EntertainmentId: 'Genshin Impact',
    physical: null,
    potential: null,
    defense: null,
    intelligence: null,
    magic: null,
    agility: null,
  },
];

genOptions();
cardTitle.innerText = tempData[0].name;
cardGender.innerText = `Gender: ${tempData[0].gender}`;
cardEntertainment.innerText = `From: ${tempData[0].EntertainmentId}`;
cardDob.innerText = `Dob: ${dateFormat(tempData[0].dob)}`;
cardAge.innerText = `Age: ${tempData[0].age}`;
cardPhysical.innerText = `Physical: ${
  tempData[0].physical === null ? Math.floor(Math.random() * 101) : tempData[0].physical
}`;
cardPotential.innerText = `Potential: ${
  tempData[0].potential === null ? Math.floor(Math.random() * 101) : tempData[0].potential
}`;
cardDefense.innerText = `Defense: ${
  tempData[0].defense === null ? Math.floor(Math.random() * 101) : tempData[0].defense
}`;
cardIntelligence.innerText = `Intelligence: ${
  tempData[0].intelligence === null ? Math.floor(Math.random() * 101) : tempData[0].intelligence
}`;
cardMagic.innerText = `Magic: ${
  tempData[0].magic === null ? Math.floor(Math.random() * 101) : tempData[0].magic
}`;
cardAgility.innerText = `Agility: ${
  tempData[0].agility === null ? Math.floor(Math.random() * 101) : tempData[0].agility
}`;

selectMenu.addEventListener('change', (e) => {
  const val = e.target.value;

  const entertainmentData = tempData.find((e) => e.name === val);
  cardTitle.innerText = entertainmentData.name;
  cardGender.innerText = `Gender: ${entertainmentData.gender}`;
  cardEntertainment.innerText = `From: ${entertainmentData.EntertainmentId}`;
  cardDob.innerText = `Dob: ${dateFormat(entertainmentData.dob)}`;
  cardAge.innerText = `Age: ${entertainmentData.age}`;
  cardPhysical.innerText = `Physical: ${
    tempData[0].physical === null ? Math.floor(Math.random() * 101) : tempData[0].physical
  }`;
  cardPotential.innerText = `Potential: ${
    tempData[0].potential === null ? Math.floor(Math.random() * 101) : tempData[0].potential
  }`;
  cardDefense.innerText = `Defense: ${
    tempData[0].defense === null ? Math.floor(Math.random() * 101) : tempData[0].defense
  }`;
  cardIntelligence.innerText = `Intelligence: ${
    tempData[0].intelligence === null ? Math.floor(Math.random() * 101) : tempData[0].intelligence
  }`;
  cardMagic.innerText = `Magic: ${
    tempData[0].magic === null ? Math.floor(Math.random() * 101) : tempData[0].magic
  }`;
  cardAgility.innerText = `Agility: ${
    tempData[0].agility === null ? Math.floor(Math.random() * 101) : tempData[0].agility
  }`;
});

function genOptions() {
  tempData.forEach((el) => {
    const opt = document.createElement('option');
    opt.value = el.name;
    opt.text = el.name;
    selectMenu.appendChild(opt);
  });
}

function dateFormat(d) {
  const date = new Date(d);
  return (
    ('0' + (date.getUTCMonth() + 1)).slice(-2) +
    '-' +
    ('0' + date.getUTCDate()).slice(-2) +
    '-' +
    date.getUTCFullYear()
  );
}
