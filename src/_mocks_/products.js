import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgProduct } from '../utils/mockImages';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  '당신의 이름을 지어다가 며칠은 먹었다',
  '우리가 함께 장마를 볼 수도 있겠습니다',
  '그대 고양이는 다정할게요',
  '입 속의 검은 잎',
  '바다는 잘 있습니다',
  '서랍에 저녁을 넣어 두었다',
  '능소화가 피면서 악기를 창가에 걸어둘 수 있게 되었다',
  '그리하여 흘려 쓴 것들',
  '당신은 첫눈입니까',
  '왜냐하면 우리는 우리를 모르고',
  '나는 천사에게 말을 배웠지',
  '재와 사랑의 미래',
  '당신은 언제 노래가 되지',
  '백야의 소문으로 영원히',
  '이별이 오늘 만나자고 한다',
  '끝과 시작',
  '이 시대의 사랑',
  '밤의 팔레트',
  '어떤 사랑도 기록하지 말기를',
  '누구도 기억하지 않는 역에서',
  '숲의 소실점을 향해',
  '거인',
  '내일 아침에는 정말 괜찮을 거에요',
  '너를 생각하는 것이 나의 일생이었지'
];
const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];

// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    index : index,
    id: faker.datatype.uuid(),
    cover: mockImgProduct(setIndex),
    name: PRODUCT_NAME[index],
    price: faker.datatype.number({ min: 10000, max: 50000, precision: 1000 }),
    priceSale: faker.datatype.number({ min: 5000, max: 30000, precision: 1000 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', '', ''])
  };
});

export default products;
