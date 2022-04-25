import CardCarousel from './CardCarousel';
import { textStyles } from '../constants/TextStyle';
import { StyleSheet, Text, View } from 'react-native';
import { SCREEN_SIZE } from '../constants/Layout';
import { ICardProps } from '../constants/Cards';
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
        {subtitle && <Text style={textStyles.subtitle}>{subtitle}</Text>}
      </View>
      <CardCarousel {...{ items }} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginVertical: 12,
  },
  rowHeadings: {
    paddingLeft: 15,
    paddingBottom: 5,
    width: SCREEN_SIZE.width - 15,
  },
});
export default TitleRow;
