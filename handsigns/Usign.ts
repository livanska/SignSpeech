import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const uSign = new GestureDescription('U');

//Thumb
uSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
uSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.7);

//Index
uSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
uSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7);

//Middle
uSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
uSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7);

//Ring
uSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
uSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.7);

//Pinky
uSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
uSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.7);
