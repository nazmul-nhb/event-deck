import { OctagonAlert } from 'lucide-react';

const NotFound = () => {
	return (
		<section className="mb-6 mt-12 h-screen flex flex-col items-center justify-center select-none">
			<div className="relative w-20 h-20 mb-4">
				<div className="absolute inset-0 rounded-full border-8 border-red-200 border-t-red-600 animate-spin"></div>
				<span className="absolute inset-0 text-5xl font-black text-red-600 flex items-center justify-center animate-pulse">
					!
				</span>
			</div>
			<h1 className="text-2xl lg:text-3xl font-bold text-red-700 mb-2 animate-pulse">
				Page Not Found!
			</h1>
			<OctagonAlert size={60} className="text-red-600 animate-bounce my-8" />
		</section>
	);
};

export default NotFound;
