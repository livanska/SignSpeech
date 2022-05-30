import defaultImgPink from '../assets/images/default-card-pink.png';
import defaultImgViolet from '../assets/images/default-card-violet.png';
import min3Img from '../assets/images/speed-card-3.png';
import min5Img from '../assets/images/speed-card-5.png';
import min7Img from '../assets/images/speed-card-7.png';
import min10Img from '../assets/images/speed-card-10.png';
import min15Img from '../assets/images/speed-card-15.png';
import easyImg from '../assets/images/level-card-easy.png';
import mediumImg from '../assets/images/level-card-medium.png';
import hardImg from '../assets/images/level-card-hard.png';

export interface ICardProps {
  type: CARD_TYPE;
}
export interface IExerciseCardProps extends ICardProps {
  title: string;
  image?: string;
  translation: TRANSLATION_TYPE;
  exerciseType: EXERCISE_TYPE;
  timeLimit?: TIME_LIMIT;
  level?: LEVEL;
  sentence?: string;
}

export interface IVideoCardProps extends ICardProps {
  videoId: string;
}

export enum CARD_TYPE {
  exercise = 'exercise',
  video = 'video',
}

export enum EXERCISE_TYPE {
  speedTest = 'Speed Test',
  stepByStep = 'Step By Step',
  dailyChallenge = 'Daily Challenge',
}

export enum TRANSLATION_TYPE {
  signsToText = 'Signs learning',
  textToSign = 'Signs translating',
}

export enum TIME_LIMIT {
  min3 = 3,
  min5 = 5,
  min7 = 7,
  min10 = 10,
  min15 = 15,
}

export enum LEVEL {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

export type CARD_IMAGE = SPEED_CARD_IMAGE | LEVEL_CARD_IMAGE;

export enum SPEED_CARD_IMAGE {
  min3 = min3Img,
  min5 = min5Img,
  min7 = min7Img,
  min10 = min10Img,
  min15 = min15Img,
}

export enum LEVEL_CARD_IMAGE {
  easy = easyImg,
  medium = mediumImg,
  hard = hardImg,
}

export const getCardImage = ({ exerciseType, ...params }: IExerciseCardProps): CARD_IMAGE => {
  switch (exerciseType) {
    case EXERCISE_TYPE.speedTest:
      return SPEED_CARD_IMAGE[TIME_LIMIT[params.timeLimit]];
    case EXERCISE_TYPE.stepByStep:
      return LEVEL_CARD_IMAGE[LEVEL[params.level]];
    default:
      return params.translation === TRANSLATION_TYPE.signsToText
        ? defaultImgPink
        : defaultImgViolet;
  }
};

export const DEFAULT_VIDEO_CARD_LINK = 'https://www.youtube.com/embed/';
