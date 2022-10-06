import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../constants/movies';
import { Movie } from '../typings';

interface Props {
	netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
	const [movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {
		setMovie(
			netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
		);
	}, [netflixOriginals]);

	console.log(movie);
	return (
		<div>
			<div className="absolute top-0 left-0 h-[95vh] -z-10 w-screen">
				<Image
					src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
					layout="fill"
					objectFit="cover"
				/>
			</div>
		</div>
	);
};

export default Banner;
