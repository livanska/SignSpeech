import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const cSign = new GestureDescription('C');

//Thumb
cSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
cSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);

//Index
cSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
cSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);

//Middle
cSign.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1);
cSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.7);

//Ring
cSign.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1);
cSign.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.7);

//Pinky
cSign.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1);
cSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.7);
