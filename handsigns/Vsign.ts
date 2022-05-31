import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const vSign = new GestureDescription('V');

//Thumb
vSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
vSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.7);

//Index
vSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
vSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);

//Middle
vSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
vSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7);

//Ring
vSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
vSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.7);

//Pinky
vSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
vSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.7);
