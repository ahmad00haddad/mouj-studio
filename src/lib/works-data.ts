import mixing from "@/assets/work-mixing.jpg";
import recording from "@/assets/work-recording.jpg";
import film from "@/assets/work-film.jpg";
import soundDesign from "@/assets/work-sounddesign.jpg";
import foley from "@/assets/work-foley.jpg";
import podcast from "@/assets/work-podcast.jpg";

export type Category =
  | "all"
  | "film"
  | "mixing"
  | "recording"
  | "sound-design"
  | "foley"
  | "podcast";

export const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "film", label: "Film Scoring" },
  { id: "mixing", label: "Mixing & Mastering" },
  { id: "recording", label: "Recording" },
  { id: "sound-design", label: "Sound Design" },
  { id: "foley", label: "Foley" },
  { id: "podcast", label: "Podcast" },
];

export interface Work {
  id: string;
  title: string;
  client: string;
  year: number;
  category: Exclude<Category, "all">;
  image: string;
}

export const works: Work[] = [
  { id: "1", title: "Echoes of the Dune", client: "Lumen Pictures", year: 2025, category: "film", image: film },
  { id: "2", title: "Midnight Sessions Vol. III", client: "Indie Artist EP", year: 2024, category: "mixing", image: mixing },
  { id: "3", title: "The Vocal Booth", client: "Anya Rose Album", year: 2024, category: "recording", image: recording },
  { id: "4", title: "Neon Drift — Game OST", client: "Hollowpoint Studios", year: 2025, category: "sound-design", image: soundDesign },
  { id: "5", title: "Footsteps in Rain", client: "Short Film Foley", year: 2023, category: "foley", image: foley },
  { id: "6", title: "Frequencies Podcast", client: "Weekly Show — Season 2", year: 2024, category: "podcast", image: podcast },
  { id: "7", title: "Aurora Trailer Score", client: "Brand Campaign", year: 2025, category: "film", image: film },
  { id: "8", title: "Analog Warmth Mix", client: "Vinyl Release", year: 2024, category: "mixing", image: mixing },
  { id: "9", title: "Lo-fi Booth Sessions", client: "EP Recording", year: 2023, category: "recording", image: recording },
];
