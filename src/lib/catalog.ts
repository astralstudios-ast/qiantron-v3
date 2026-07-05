import excavator from "@/assets/excavator.asset.json";
import loader from "@/assets/loader.asset.json";
import hauler from "@/assets/hauler.asset.json";
import crane from "@/assets/crane.asset.json";
import drill from "@/assets/drill.asset.json";
import roller from "@/assets/roller.asset.json";
import truck from "@/assets/truck.asset.json";
import factory from "@/assets/factory.asset.json";

export type Category = {
  slug: string;
  name: string;
  spec: string;
  img: string;
  count: string;
  tonnage: string;
  origin: string;
  applications: string[];
  blurb: string;
};

export const CATALOG: Category[] = [
  {
    slug: "excavators",
    name: "Excavators",
    spec: "20t – 90t · Hydraulic",
    img: excavator.url,
    count: "24 models",
    tonnage: "20 – 90 t",
    origin: "China · Japan · EU",
    applications: ["Mining", "Site prep", "Trenching"],
    blurb:
      "High-precision hydraulic excavators tuned for African terrain and continuous-duty cycles.",
  },
  {
    slug: "wheel-loaders",
    name: "Wheel Loaders",
    spec: "3.0 – 6.5 m³ bucket",
    img: loader.url,
    count: "18 models",
    tonnage: "12 – 35 t",
    origin: "China · Germany",
    applications: ["Aggregates", "Port handling", "Stockpiling"],
    blurb: "Fuel-optimized wheel loaders with reinforced Z-bar linkage for volumetric bulk handling.",
  },
  {
    slug: "haulage-trucks",
    name: "Haulage Trucks",
    spec: "40t – 100t payload",
    img: hauler.url,
    count: "12 models",
    tonnage: "40 – 100 t",
    origin: "China · Sweden",
    applications: ["Open-pit mining", "Quarrying"],
    blurb: "Rigid and articulated haulers engineered for high-tonnage cycles on unpaved corridors.",
  },
  {
    slug: "cranes",
    name: "Cranes",
    spec: "50t – 750t lift",
    img: crane.url,
    count: "9 models",
    tonnage: "50 – 750 t",
    origin: "Germany · Japan",
    applications: ["Infrastructure", "Energy", "Ports"],
    blurb: "All-terrain and crawler cranes deployed on grid, port and civil megaprojects.",
  },
  {
    slug: "mining-drills",
    name: "Mining Drills",
    spec: "Track · Rotary · Down-hole",
    img: drill.url,
    count: "7 models",
    tonnage: "15 – 50 t",
    origin: "Sweden · China",
    applications: ["Hard-rock", "Blasthole", "Exploration"],
    blurb: "Autonomy-ready drill rigs with telemetry hooks for real-time bench planning.",
  },
  {
    slug: "compaction-rollers",
    name: "Compaction Rollers",
    spec: "Tandem · Single · Pneumatic",
    img: roller.url,
    count: "11 models",
    tonnage: "8 – 25 t",
    origin: "China · Italy",
    applications: ["Highways", "Airports", "Landfills"],
    blurb: "Vibratory rollers calibrated for asphalt, subbase and cohesive earth compaction.",
  },
  {
    slug: "prime-movers",
    name: "Prime Movers",
    spec: "6×4 · 8×4 · Heavy tractor",
    img: truck.url,
    count: "15 models",
    tonnage: "70 – 250 t GCW",
    origin: "China · EU",
    applications: ["Low-bed transport", "Escorted convoys"],
    blurb: "Heavy prime movers with dual-clutch retarders spec'd for African inland corridors.",
  },
  {
    slug: "bulldozers",
    name: "Bulldozers",
    spec: "D6 – D11 class",
    img: factory.url,
    count: "8 models",
    tonnage: "18 – 105 t",
    origin: "USA · Japan · China",
    applications: ["Land clearing", "Mining", "Reclamation"],
    blurb: "Crawler dozers with SU and semi-U blades for high-volume push and dozing cycles.",
  },
];
