import { runners6kmMen } from "./runners_6km_men";
import { runners6kmWomen } from "./runners_6km_women";
import { runners6kmMenRelay } from "./runners_6km_men_relay";
import { runners6kmWomenRelay } from "./runners_6km_women_relay";
import { runners6kmMixRelay } from "./runners_6km_mix_relay";
import { runnersParentAndChildRelay } from "./runners_parent_and_child_relay";

export const allRunners = [
  ...runners6kmMen,
  ...runners6kmWomen,
  ...runners6kmMenRelay,
  ...runners6kmWomenRelay,
  ...runners6kmMixRelay,
  ...runnersParentAndChildRelay
];
