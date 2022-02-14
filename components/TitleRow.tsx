import CardCarousel from './CardCarousel';
import { textStyles } from '../constants/TextStyle';
import { StyleSheet, Text, View } from 'react-native';
import { SCREEN_SIZE } from '../constants/Layout';
import { ICardProps } from './Card';
export interface ITitleRowProps {
  title: string;
  subtitle?: string;
  items: ICardProps[];
}
const TitleRow = ({ items, title, subtitle }: ITitleRowProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.rowHeadings}>
        <Text style={textStyles.rowHeading}>{title}</Text>
        <Text style={textStyles.rowSubtitle}>{subtitle}</Text>
      </View>
      <CardCarousel {...{ items }} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginTop: 15,
    marginBottom: 15,
  },
  rowHeadings: {
    marginLeft: 15,
    width: SCREEN_SIZE.width - 15,
  },
});
export default TitleRow;
