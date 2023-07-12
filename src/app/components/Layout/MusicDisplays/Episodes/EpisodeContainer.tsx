import EpisodeRow from "./EpisodeRow";

type Props = {
  episodes: SpotifyApi.EpisodeObjectSimplified[];
};

export default function EpisodeContainer(props: Props) {
  return (
    <div className="flex flex-col justify-start items-start w-full h-full">
      {
        // map each episode to an EpisodeRow component
        props.episodes.map((episode, index) => {
          return <EpisodeRow key={index} episode={episode} />;
        })
      }
    </div>
  );
}
