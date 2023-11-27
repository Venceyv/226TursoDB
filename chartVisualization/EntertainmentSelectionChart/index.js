const ctx = document.querySelector('.radar-chart');

const selectMenu = document.querySelector('#character');

const cardTitle = document.querySelector('.title');
const cardDescription = document.querySelector('.description');
const cardType = document.querySelector('.type');
const cardStatus = document.querySelector('.status');
const cardGenre = document.querySelector('.genre');

const tempData = [
  {
    EntertainmentId: 'cac75146f47ac5929094d285deabb256bd6fe833',
    type: 'game',
    name: 'Honkai: Star Rail',
    status: 'active',
    description:
      "Honkai: Star Rail is a role-playing gacha video game developed by miHoYo, published by miHoYo in mainland China and worldwide by Cognosphere. The first closed beta test was launched on October 27, 2021. It was publicly released internationally on April 26, 2023,[2] for Windows and mobile devices; with the PlayStation 5 port released on October 11, 2023. The PlayStation 4 version is still yet to be announced, as revealed at the latest Summer Game Fest with a trailer.[3] It is the fourth installment in the Honkai series, drawing on characters from Honkai Impact 3rd and gameplay elements from Genshin Impact (although with significant adjustments to the characters' background and personality and changes to the gameplay elements). It is miHoYo's first turn-based game.",
    genres: 'Role-playing',
  },
  {
    EntertainmentId: 'f0d1e91c0074c56efd3e9f2797f0f46aa976bc8b',
    type: 'game',
    name: 'Genshin Impact',
    status: 'active',
    description:
      'Genshin Impact[a] is an action role-playing game developed by miHoYo, published by miHoYo in mainland China and worldwide by Cognosphere, d/b/a HoYoverse. It was released for Android, iOS, PlayStation 4, and Windows in 2020, on PlayStation 5 in 2021. The game features an anime-style open-world environment and an action-based battle system using elemental magic and character-switching. A free-to-play game monetized through gacha game mechanics, Genshin Impact is expanded regularly through patches using the games as a service model',
    genres: 'Action role-playing',
  },
  {
    EntertainmentId: '69c9df000941cd3cf6ee379be73bef2ee24c0e74',
    type: 'game',
    name: 'League of Legends',
    status: 'active',
    description:
      "League of Legends (LoL), commonly referred to as League, is a 2009 multiplayer online battle arena video game developed and published by Riot Games. Inspired by Defense of the Ancients, a custom map for Warcraft III, Riot's founders sought to develop a stand-alone game in the same genre. Since its release in October 2009, League has been free-to-play and is monetized through purchasable character customization. The game is available for Microsoft Windows and macOS.",
    genres: 'MOBA',
  },
  {
    EntertainmentId: 'a1b2c3d4e5f6g7h8i9j0',
    type: 'anime',
    name: 'Attack on Titan',
    status: 'completed',
    description:
      'Attack on Titan is a Japanese manga series written and illustrated by Hajime Isayama. It is set in a world where humanity resides within enormous walled cities to protect themselves from gigantic man-eating humanoids referred to as Titans.',
    genres: 'Action, Dark Fantasy, Post-Apocalyptic',
  },
  {
    EntertainmentId: 'b2c3d4e5f6g7h8i9j0k1',
    type: 'anime',
    name: 'Naruto',
    status: 'completed',
    description:
      'Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.',
    genres: 'Adventure, Fantasy',
  },
  {
    EntertainmentId: 'c3d4e5f6g7h8i9j0k1l2',
    type: 'manga',
    name: 'Death Note',
    status: 'completed',
    description:
      "Death Note is a Japanese manga series written by Tsugumi Ohba and illustrated by Takeshi Obata. The story follows Light Yagami, a teen genius who stumbles across a mysterious otherworldly notebook: the 'Death Note', which belonged to the Shinigami Ryuk, and grants the user the supernatural ability to kill anyone whose name is written in its pages.",
    genres: 'Mystery, Thriller',
  },
  {
    EntertainmentId: 'd4e5f6g7h8i9j0k1l2m3',
    type: 'anime',
    name: 'My Hero Academia',
    status: 'ongoing',
    description:
      'My Hero Academia is a Japanese superhero manga series written and illustrated by Kōhei Horikoshi. It follows a boy named Izuku Midoriya who was born without superpowers in a world where they are common, but who still dreams of becoming a superhero himself.',
    genres: 'Superhero, Action',
  },
];

genOptions();
cardTitle.innerText = tempData[0].name;
cardDescription.innerText = tempData[0].description;
cardStatus.innerText = `Status: ${tempData[0].status}`;
cardType.innerText = `Type: ${tempData[0].type}`;
cardGenre.innerText = `Genre: ${tempData[0].genres}`;

selectMenu.addEventListener('change', (e) => {
  const val = e.target.value;

  const entertainmentData = tempData.find((e) => e.name === val);
  cardTitle.innerText = entertainmentData.name;
  cardDescription.innerText = entertainmentData.description;
  cardStatus.innerText = `Status: ${entertainmentData.status}`;
  cardType.innerText = `Type: ${entertainmentData.type}`;
  cardGenre.innerText = `Genre: ${entertainmentData.genres}`;
});

function genOptions() {
  tempData.forEach((el) => {
    const opt = document.createElement('option');
    opt.value = el.name;
    opt.text = el.name;
    selectMenu.appendChild(opt);
  });
}
