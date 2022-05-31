import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const nSign = new GestureDescription('N');

//Thumb
nSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
nSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.7);

//Index
nSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
nSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);

//Middle
nSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
nSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7);

//Ring
nSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
nSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.7);

//Pinky
nSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
nSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.7);
