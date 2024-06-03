import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
} from "@mui/material/colors";

export const colors = [
  red[500],
  pink[500],
  purple[500],
  deepPurple[500],
  indigo[500],
  blue[500],
  lightBlue[500],
  cyan[500],
  teal[500],
  green[500],
  lightGreen[500],
  lime[500],
  yellow[500],
  amber[500],
  orange[500],
  deepOrange[500],
];

export function getColor(letter: string) {
  const hash = letter.charCodeAt(0) - 65;
  return colors[hash % colors.length];
}
