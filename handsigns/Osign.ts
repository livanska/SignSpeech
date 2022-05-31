import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const oSign = new GestureDescription('O');

//Thumb
oSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
oSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);

//Index
oSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 1);
oSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);

//Middle
oSign.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1);
oSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.7);

//Ring
oSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
oSign.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.7);

//Pinky
oSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
oSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.7);
