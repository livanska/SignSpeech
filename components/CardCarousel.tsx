import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Card, { ICardProps } from './Card';
import { SCREEN_SIZE } from '../constants/Layout';
export interface ICardCarouselProps {
  items: ICardProps[];
}
const _renderItem = ({ item }: { item: ICardProps; index: number }) => <Card {...item}></Card>;

const CardCarousel = ({ items }: ICardCarouselProps) => {
  return (
    <View>
      <Carousel
        layout={'default'}
        data={items}
        renderItem={_renderItem.bind(this)}
        sliderWidth={SCREEN_SIZE.width}
        sliderHeight={220}
        itemWidth={335}
        centerContent={false}
        inactiveSlideShift={0}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        activeAnimationType={'timing'}
        activeSlideAlignment={'start'}
        style={{ paddingRight: 0 }}
        contentContainerCustomStyle={{
          marginTop: 15,
          marginBottom: 15,
          marginLeft: 10,
          overflow: 'hidden',
          width: 335 * items.length + 10,
        }}
        activeSlideOffset={1}
      ></Carousel>
    </View>
  );
};
export default CardCarousel;
