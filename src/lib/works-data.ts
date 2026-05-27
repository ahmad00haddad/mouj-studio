import mixing from "@/assets/work-mixing.jpg";
import recording from "@/assets/work-recording.jpg";
import film from "@/assets/work-film.jpg";
import soundDesign from "@/assets/work-sounddesign.jpg";
import foley from "@/assets/work-foley.jpg";
import podcast from "@/assets/work-podcast.jpg";

export type Category =
  | "all"
  | "featured"
  | "advertising"
  | "supervision"
  | "sound-mix"
  | "film-tv"
  | "radio-podcasts"
  | "game-trailers";

export const categories: { id: Category; label: string }[] = [
  { id: "all", label: "Show All" },
  { id: "featured", label: "Featured" },
  { id: "advertising", label: "Music For Advertising" },
  { id: "supervision", label: "Music Supervision" },
  { id: "sound-mix", label: "Sound & Mix" },
  { id: "film-tv", label: "Music For Film & TV" },
  { id: "radio-podcasts", label: "Radio & Podcasts" },
  { id: "game-trailers", label: "Game Trailers" },
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
  { id: "1", title: "Featured Ad Campaign", client: "Brand Spot", year: 2025, category: "advertising", image: film },
  { id: "2", title: "Echoes of the Dune", client: "Feature Film", year: 2025, category: "film-tv", image: film },
  { id: "3", title: "Midnight Sessions Vol. III", client: "Indie EP", year: 2024, category: "sound-mix", image: mixing },
  { id: "4", title: "Music Supervision — Series", client: "Streaming Show", year: 2024, category: "supervision", image: recording },
  { id: "5", title: "Neon Drift — Game Trailer", client: "Hollowpoint Studios", year: 2025, category: "game-trailers", image: soundDesign },
  { id: "6", title: "Foley & Mix", client: "Short Film", year: 2023, category: "sound-mix", image: foley },
  { id: "7", title: "Frequencies Podcast", client: "Weekly Show", year: 2024, category: "radio-podcasts", image: podcast },
  { id: "8", title: "Aurora Trailer Score", client: "Brand Campaign", year: 2025, category: "featured", image: film },
  { id: "9", title: "Analog Warmth Mix", client: "Vinyl Release", year: 2024, category: "sound-mix", image: mixing },
];
