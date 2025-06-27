import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;
const scaleSize = (size: any) => (width / BASE_WIDTH) * size;
const verticalScaleSize = (size: any) => (height / BASE_HEIGHT) * size;
const responsiveFontSize = (size: any) => {
  const scaleFactor = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
  return Math.round(size * scaleFactor);
};

const responsive = {
  width: (size: any) => scaleSize(size),
  height: (size: any) => verticalScaleSize(size),
  fontSize: (size: any) => responsiveFontSize(size),
  margin: (size: any) => scaleSize(size),
  padding: (size: any) => scaleSize(size),
  borderRadius: (size: any) => scaleSize(size),
};

export default responsive;