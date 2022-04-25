import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { COLORS } from '../constants/Colors';
import { FONT_TYPES } from '../constants/Enums';
import WebView from 'react-native-webview';
import { DEFAULT_VIDEO_CARD_LINK, IVideoCardProps } from '../constants/Cards';

const VideoCard = (props: IVideoCardProps) => {
  return (
    <TouchableHighlight
      style={styles.cardContainer}
      activeOpacity={0.5}
      underlayColor={COLORS.primaryDark}
      onPress={() => {}}
    >
      <View style={{ flex: 1 }}>
        <WebView
          style={styles.cardContainer}
          javaScriptEnabled={true}
          automaticallyAdjustContentInsets={false}
          source={{ uri: `${DEFAULT_VIDEO_CARD_LINK}${props.videoId}` }}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 325,
    height: 200,
    borderRadius: 13,
    backgroundColor: COLORS.white,
  },
});

export default VideoCard;
