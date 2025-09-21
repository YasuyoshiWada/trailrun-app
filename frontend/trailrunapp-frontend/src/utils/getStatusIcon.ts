import type { SvgIconComponent } from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const iconMap: Record<string, SvgIconComponent> = {
  HelpOutline: HelpOutlineIcon,
  PersonAddAlt1: PersonAddAlt1Icon,
  DirectionsRun: DirectionsRunIcon,
  LocationOn: LocationOnIcon,
  RemoveCircleOutline: RemoveCircleOutlineIcon,
  NotInterested: NotInterestedIcon,
  HighlightOff: HighlightOffIcon,
  EmojiEvents: EmojiEventsIcon,
};

export function getStatusIcon(iconName: string): SvgIconComponent {
  const normalizedName = iconName.trim();
  return iconMap[normalizedName] ?? HelpOutlineIcon;
}
