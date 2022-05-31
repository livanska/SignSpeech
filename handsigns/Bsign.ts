import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const bSign = new GestureDescription('B');

//Thumb
bSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
bSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.7);
bSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);

//Index
bSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
bSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7);

//Middle
bSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
bSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7);

//Ring
bSign.addCurl(Finger.Ring, FingerCurl.NoCurl, 1);
bSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.7);

//Pinky
bSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1);
bSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.7);
