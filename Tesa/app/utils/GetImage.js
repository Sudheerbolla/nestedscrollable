export default function GetImage(value) {
  res = ''
  if (value) {
    if (value === 'AC')
      res = ICONS.C_ICON_0
    else if (value === '+/-')
      res = ICONS.C_ICON_3
    else if (value === '%')
      res = ICONS.C_ICON_1
    else if (value === '/')
      res = ICONS.C_ICON_9
    else if (value === '*')
      res = ICONS.C_ICON_6
    else if (value === '-')
      res = ICONS.C_ICON_5
    else if (value === '+')
      res = ICONS.C_ICON_2
    else if (value === '=')
      res = ICONS.C_ICON_4
    else if (value === '+/-')
      res = ICONS.C_ICON_3
  }
  return res;
}
