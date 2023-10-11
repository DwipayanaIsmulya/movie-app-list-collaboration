import HeroSlider from "../Components/Home-1/HeroSlider";
import PopularMovie from "./PopularMovie";
import TopRatedMovies from "./TopRatedMovies";
import UpComingMovies from "./UpComingMovies";

function HomePage() {
  return (
    <>
      <HeroSlider />
      <PopularMovie />
      <TopRatedMovies />
      <UpComingMovies />
    </>
  );
}

export default HomePage;
