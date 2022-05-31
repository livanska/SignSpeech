import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const hSign = new GestureDescription('H');

//Thumb
hSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
hSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.7);

//Index
hSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
hSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.7);

//Middle
hSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
hSign.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 0.7);

//Ring
hSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
hSign.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 0.7);

//Pinky
hSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
hSign.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 0.7);
