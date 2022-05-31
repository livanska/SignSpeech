import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const fSign = new GestureDescription('F');

//Thumb
fSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
fSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);

//Index
fSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
fSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);

//Middle
fSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
fSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7);

//Ring
fSign.addCurl(Finger.Ring, FingerCurl.NoCurl, 1);
fSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.7);

//Pinky
fSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1);
fSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.7);
