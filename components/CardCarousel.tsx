import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Card from './Card';
import { SCREEN_SIZE } from '../constants/Layout';
import { CARD_TYPE, ICardProps, IExerciseCardProps, IVideoCardProps } from '../constants/Cards';
import VideoCard from './VideoCard';
export interface ICardCarouselProps {
  items: ICardProps[];
}

const renderItem = ({ item }: { item: ICardProps; index: number }) => {
  return item.type === CARD_TYPE.video ? (
    <VideoCard {...(item as IVideoCardProps)} />
  ) : (
    <Card {...(item as IExerciseCardProps)} />
  );
};

const CardCarousel = ({ items }: ICardCarouselProps) => {
  return (
    <View>
      <Carousel
        layout={'default'}
        data={items}
        renderItem={renderItem.bind(this)}
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
          paddingVertical: 5,
          paddingLeft: 10,
          overflow: 'hidden',
          width: 335 * items.length + 10,
        }}
        activeSlideOffset={1}
      ></Carousel>
    </View>
  );
};
export default CardCarousel;
