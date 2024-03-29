import { InformationCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { baseUrl } from '../constants/movies';
import { useAppDispatch } from '../hooks/store';
import { modalShowed } from '../store/ui/HomePage';
import { Movie } from '../typings';

interface Props {
	netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
	const [movie, setMovie] = useState<Movie | null>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
	}, [netflixOriginals]);

	const handleOpenMoviePreviewModal = () => {
		dispatch(modalShowed());
	};

	return (
		<div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
			<div className="absolute top-0 left-0 h-[95vh] -z-10 w-screen">
				<Image
					src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
					layout="fill"
					objectFit="cover"
				/>
			</div>

			<h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
				{movie?.title || movie?.name || movie?.original_name}
			</h1>
			<p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
				{movie?.overview}
			</p>

			<div className="flex space-x-3">
				<button className="bannerButton text-black bg-white ">
					<FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
				</button>
				<button className="bannerButton bg-[gray]/70" onClick={handleOpenMoviePreviewModal}>
					More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
				</button>
			</div>
		</div>
	);
};

export default Banner;
