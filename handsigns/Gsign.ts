import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const gSign = new GestureDescription('G');

//Thumb
gSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
gSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);

//Index
gSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
gSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.7);

//Middle
gSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
gSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.7);

//Ring
gSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
gSign.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 0.7);

//Pinky
gSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
gSign.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 0.7);
