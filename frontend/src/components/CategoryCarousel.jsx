// ...existing code...
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full flex flex-col items-center justify-center my-8 sm:my-16 px-2"
        >
            <Carousel className="w-full max-w-xs xs:max-w-md sm:max-w-2xl">
                <CarouselContent>
                    {category.map((cat, idx) => (
                        <motion.div
                            key={cat}
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: 0.1 * idx, duration: 0.4 }}
                            className="w-full"
                        >
                            <CarouselItem className="basis-full xs:basis-1/2 lg:basis-1/3 flex justify-center">
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="rounded-full px-4 xs:px-8 py-2 xs:py-3 font-semibold text-sm xs:text-lg border-2 border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 shadow-sm w-full"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        </motion.div>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </motion.section>
    )
}

export default CategoryCarousel