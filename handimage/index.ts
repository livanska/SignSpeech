import A_sign from './A.svg';
import B_sign from './B.svg';
import C_sign from './C.svg';
import D_sign from './D.svg';
import E_sign from './E.svg';
import F_sign from './F.svg';
import G_sign from './G.svg';
import H_sign from './H.svg';
import I_sign from './I.svg';
import J_sign from './J.svg';
import K_sign from './K.svg';
import L_sign from './L.svg';
import M_sign from './M.svg';
import N_sign from './N.svg';
import O_sign from './O.svg';
import P_sign from './P.svg';
import Q_sign from './Q.svg';
import R_sign from './R.svg';
import S_sign from './S.svg';
import T_sign from './T.svg';
import U_sign from './U.svg';
import V_sign from './V.svg';
import W_sign from './W.svg';
import X_sign from './X.svg';
import Y_sign from './Y.svg';
import Z_sign from './Z.svg';

import A_hand from './Ahand.svg';
import B_hand from './Bhand.svg';
import C_hand from './Chand.svg';
import D_hand from './Dhand.svg';
import E_hand from './Ehand.svg';
import F_hand from './Fhand.svg';
import G_hand from './Ghand.svg';
import H_hand from './Hhand.svg';
import I_hand from './Ihand.svg';
import J_hand from './Jhand.svg';
import K_hand from './Khand.svg';
import L_hand from './Lhand.svg';
import M_hand from './Mhand.svg';
import N_hand from './Nhand.svg';
import O_hand from './Ohand.svg';
import P_hand from './Phand.svg';
import Q_hand from './Qhand.svg';
import R_hand from './Rhand.svg';
import S_hand from './Shand.svg';
import T_hand from './Thand.svg';
import U_hand from './Uhand.svg';
import V_hand from './Vhand.svg';
import W_hand from './Whand.svg';
import X_hand from './Xhand.svg';
import Y_hand from './Yhand.svg';
import Z_hand from './Zhand.svg';
import HandGesture from '../handsigns';
import { SvgProps } from 'react-native-svg';

export const LetterImages = {
  A: A_sign,
  B: B_sign,
  C: C_sign,
  D: D_sign,
  E: E_sign,
  F: F_sign,
  G: G_sign,
  H: H_sign,
  I: I_sign,
  J: J_sign,
  K: K_sign,
  L: L_sign,
  M: M_sign,
  N: N_sign,
  O: O_sign,
  P: P_sign,
  Q: Q_sign,
  R: R_sign,
  S: S_sign,
  T: T_sign,
  U: U_sign,
  V: V_sign,
  W: W_sign,
  X: X_sign,
  Y: Y_sign,
  Z: Z_sign,
};

export interface ISign {
  letterImage: any;
  signImage: React.FC<SvgProps>;
  letter: string;
  gesture: any;
}

export const easySigns = [
  {
    letterImage: LetterImages['A'],
    signImage: A_hand,
    letter: 'A',
    gesture: HandGesture.aSign,
  },
  {
    letterImage: LetterImages['B'],
    signImage: B_hand,
    letter: 'B',
    gesture: HandGesture.bSign,
  },
  {
    letterImage: LetterImages['C'],
    signImage: C_hand,
    letter: 'C',
    gesture: HandGesture.cSign,
  },
  {
    letterImage: LetterImages['D'],
    signImage: D_hand,
    letter: 'D',
    gesture: HandGesture.dSign,
  },
  {
    letterImage: LetterImages['E'],
    signImage: E_hand,
    letter: 'E',
    gesture: HandGesture.eSign,
  },
  {
    letterImage: LetterImages['K'],
    signImage: K_hand,
    letter: 'K',
    gesture: HandGesture.kSign,
  },
  {
    letterImage: LetterImages['L'],
    signImage: L_hand,
    letter: 'L',
    gesture: HandGesture.lSign,
  },
  {
    letterImage: LetterImages['V'],
    signImage: V_hand,
    letter: 'V',
    gesture: HandGesture.vSign,
  },
  {
    letterImage: LetterImages['W'],
    signImage: W_hand,
    letter: 'W',
    gesture: HandGesture.wSign,
  },
];
export const mediumSigns = [
  ...easySigns,
  {
    letterImage: LetterImages['F'],
    signImage: F_hand,
    letter: 'F',
    gesture: HandGesture.fSign,
  },
  {
    letterImage: LetterImages['I'],
    signImage: I_hand,
    letter: 'I',
    gesture: HandGesture.iSign,
  },
  {
    letterImage: LetterImages['U'],
    signImage: U_hand,
    letter: 'U',
    gesture: HandGesture.uSign,
  },
  {
    letterImage: LetterImages['R'],
    signImage: R_hand,
    letter: 'R',
    gesture: HandGesture.rSign,
  },
  {
    letterImage: LetterImages['S'],
    signImage: S_hand,
    letter: 'S',
    gesture: HandGesture.sSign,
  },
  {
    letterImage: LetterImages['Y'],
    signImage: Y_hand,
    letter: 'Y',
    gesture: HandGesture.ySign,
  },
];
export const Signs = [
  {
    letterImage: LetterImages['A'],
    signImage: A_hand,
    letter: 'A',
    gesture: HandGesture.aSign,
  },
  {
    letterImage: LetterImages['B'],
    signImage: B_hand,
    letter: 'B',
    gesture: HandGesture.bSign,
  },
  {
    letterImage: LetterImages['C'],
    signImage: C_hand,
    letter: 'C',
    gesture: HandGesture.cSign,
  },
  {
    letterImage: LetterImages['D'],
    signImage: D_hand,
    letter: 'D',
    gesture: HandGesture.dSign,
  },
  {
    letterImage: LetterImages['E'],
    signImage: E_hand,
    letter: 'E',
    gesture: HandGesture.eSign,
  },
  {
    letterImage: LetterImages['F'],
    signImage: F_hand,
    letter: 'F',
    gesture: HandGesture.fSign,
  },
  {
    letterImage: LetterImages['G'],
    signImage: G_hand,
    letter: 'G',
    gesture: HandGesture.gSign,
  },
  {
    letterImage: LetterImages['H'],
    signImage: H_hand,
    letter: 'H',
    gesture: HandGesture.hSign,
  },
  {
    letterImage: LetterImages['I'],
    signImage: I_hand,
    letter: 'I',
    gesture: HandGesture.iSign,
  },
  {
    letterImage: LetterImages['J'],
    signImage: J_hand,
    letter: 'J',
    gesture: HandGesture.jSign,
  },
  {
    letterImage: LetterImages['K'],
    signImage: K_hand,
    letter: 'K',
    gesture: HandGesture.kSign,
  },
  {
    letterImage: LetterImages['L'],
    signImage: L_hand,
    letter: 'L',
    gesture: HandGesture.lSign,
  },
  {
    letterImage: LetterImages['M'],
    signImage: M_hand,
    letter: 'M',
    gesture: HandGesture.mSign,
  },
  {
    letterImage: LetterImages['N'],
    signImage: N_hand,
    letter: 'N',
    gesture: HandGesture.nSign,
  },
  {
    letterImage: LetterImages['O'],
    signImage: O_hand,
    letter: 'O',
    gesture: HandGesture.oSign,
  },
  {
    letterImage: LetterImages['P'],
    signImage: P_hand,
    letter: 'P',
    gesture: HandGesture.pSign,
  },
  {
    letterImage: LetterImages['Q'],
    signImage: Q_hand,
    letter: 'Q',
    gesture: HandGesture.qSign,
  },
  {
    letterImage: LetterImages['R'],
    signImage: R_hand,
    letter: 'R',
    gesture: HandGesture.rSign,
  },
  {
    letterImage: LetterImages['S'],
    signImage: S_hand,
    letter: 'S',
    gesture: HandGesture.sSign,
  },
  {
    letterImage: LetterImages['T'],
    signImage: T_hand,
    letter: 'T',
    gesture: HandGesture.tSign,
  },
  {
    letterImage: LetterImages['U'],
    signImage: U_hand,
    letter: 'U',
    gesture: HandGesture.uSign,
  },
  {
    letterImage: LetterImages['V'],
    signImage: V_hand,
    letter: 'V',
    gesture: HandGesture.vSign,
  },
  {
    letterImage: LetterImages['W'],
    signImage: W_hand,
    letter: 'W',
    gesture: HandGesture.wSign,
  },
  {
    letterImage: LetterImages['X'],
    signImage: X_hand,
    letter: 'X',
    gesture: HandGesture.xSign,
  },
  {
    letterImage: LetterImages['Y'],
    signImage: Y_hand,
    letter: 'Y',
    gesture: HandGesture.ySign,
  },
  {
    letterImage: LetterImages['Z'],
    signImage: Z_hand,
    letter: 'Z',
    gesture: HandGesture.zSign,
  },
];
