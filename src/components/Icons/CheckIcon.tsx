import Svg, { Path } from "react-native-svg";

type CheckIconProps = {
  width?: string;
  height?: string;
  fill?: string;
};

export default function CheckIcon({
  width = "15",
  height = "11",
  fill = "#fff",
}: CheckIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 15 11"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M14.6855 0.513695C15.104 0.930418 15.104 1.60384 14.6855 2.02057L6.11408 10.555C5.69556 10.9718 5.01922 10.9718 4.60069 10.555L0.314039 6.28781C-0.104354 5.87108 -0.104354 5.19766 0.314039 4.78094C0.732499 4.36421 1.41085 4.36421 1.82937 4.78094L5.32725 8.29141L13.1721 0.513695C13.5906 0.0963057 14.267 0.0963057 14.6855 0.513695Z" />
    </Svg>
  );
}
