import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const eSign = new GestureDescription('E');

//Thumb
eSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
eSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7);

//Index
eSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
eSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7);

//Middle
eSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
eSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7);

//Ring
eSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
eSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.7);

//Pinky
eSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
eSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.7);
