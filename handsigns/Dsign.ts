import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const dSign = new GestureDescription('D');

//Thumb
dSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
dSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7);

//Index
dSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
dSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7);

//Middle
dSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
dSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7);

//Ring
dSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
dSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.7);

//Pinky
dSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
dSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.7);
