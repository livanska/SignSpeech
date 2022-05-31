import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const zSign = new GestureDescription('Z');

//Thumb
zSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.8);
zSign.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.7);

//Index
zSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
zSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.7);

//Middle
zSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
zSign.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 0.7);

//Ring
zSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
zSign.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 0.7);

//Pinky
zSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
zSign.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 0.7);
