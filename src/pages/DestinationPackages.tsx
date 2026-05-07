import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  MapPin, 
  Star, 
  Search, 
  SlidersHorizontal, 
  RotateCcw,
  LayoutGrid,
  List
} from 'lucide-react';
import { cn } from '../utils/cn';
import AdventureCard from '../components/AdventureCard';
import Button from '../components/Button';
import { DestinationRepository } from '../services/DestinationRepository';
import { DestinationFilter } from '../services/DestinationFilter';
import { SortContext, SortType } from '../strategies/SortStrategy';

const repository = DestinationRepository.getInstance();
const locations = repository.getLocations();

const DestinationPackages: React.FC = () => {
  const { destination } = useParams<{ destination: string }>();
  const navigate = useNavigate();

  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (destination) {
      const match = locations.find(loc => loc.toLowerCase().replace(/\s+/g, '-') === destination.toLowerCase());
      if (match) setSelectedLocation(match);
    }
  }, [destination]);

  const filteredData = useMemo(() => {
    const filter = new DestinationFilter()
      .setLocation(selectedLocation)
      .setPriceRange([priceRange[0], priceRange[1]])
      .setRating(minRating);

    const sortStrategy = SortContext.getStrategy(sortBy as SortType);
    return repository.getDestinations(filter, sortStrategy);
  }, [priceRange, selectedLocation, minRating, sortBy]);

  const handleBuy = (item: any) => {
    navigate('/buy', { state: item });
  };

  const resetFilters = () => {
    setPriceRange([0, 2000]);
    setSelectedLocation('All');
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-accent/5 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold font-poppins text-white mb-6">
              Find Your Next <span className="text-gradient">Experience</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Browse our curated selection of adventures and activities around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outlined" 
              size="sm" 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn("rounded-xl gap-2", isFilterOpen && "bg-primary-accent/10")}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              { (selectedLocation !== 'All' || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 2000) && (
                <span className="w-2 h-2 bg-primary-accent rounded-full" />
              )}
            </Button>
            <span className="text-text-muted text-sm border-l border-white/10 pl-4">
              Showing {filteredData.length} adventures
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary-accent transition-colors" />
              <input 
                type="text" 
                placeholder="Search..."
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary-accent transition-all w-48 focus:w-64"
              />
            </div>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary-accent"
            >
              <option value="popularity">Popularity</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filter Sidebar (Desktop) / Dropdown (Mobile) */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lg:w-72 shrink-0 space-y-8"
              >
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-8 sticky top-40">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold flex items-center gap-2">
                      <Filter className="w-4 h-4 text-primary-accent" />
                      Refine
                    </h3>
                    <button onClick={resetFilters} className="text-xs text-text-muted hover:text-primary-accent flex items-center gap-1 transition-colors">
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  </div>

                  {/* Location */}
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-white uppercase tracking-wider">Location</label>
                    <div className="space-y-2">
                      {locations.map(loc => (
                        <button
                          key={loc}
                          onClick={() => setSelectedLocation(loc)}
                          className={cn(
                            "w-full text-left px-4 py-2 rounded-xl text-sm transition-all border",
                            selectedLocation === loc 
                              ? "bg-primary-accent/10 border-primary-accent/30 text-primary-accent" 
                              : "bg-white/5 border-transparent text-text-muted hover:bg-white/10"
                          )}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Slider Placeholder */}
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-white uppercase tracking-wider">Price Range</label>
                    <div className="px-2">
                      <input 
                        type="range" 
                        min="0" 
                        max="2000" 
                        value={priceRange[1]} 
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-primary-accent"
                      />
                      <div className="flex justify-between mt-2 text-xs text-text-muted">
                        <span>$0</span>
                        <span>Up to ${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-white uppercase tracking-wider">Rating</label>
                    <div className="flex gap-2">
                      {[0, 4.0, 4.5, 4.8].map(r => (
                        <button
                          key={r}
                          onClick={() => setMinRating(r)}
                          className={cn(
                            "flex-1 py-2 rounded-xl text-xs font-bold transition-all border",
                            minRating === r 
                              ? "bg-secondary-accent/10 border-secondary-accent/30 text-secondary-accent" 
                              : "bg-white/5 border-transparent text-text-muted hover:bg-white/10"
                          )}
                        >
                          {r === 0 ? "All" : `${r}+`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Grid Area */}
          <main className="flex-1">
            {filteredData.length === 0 ? (
              <div className="text-center py-24 bg-white/5 border border-white/10 rounded-[3rem]">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-text-muted" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No adventures found</h3>
                <p className="text-text-muted">Try adjusting your filters or search terms.</p>
                <Button variant="primary" onClick={resetFilters} className="mt-8">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredData.map((item, idx) => (
                  <AdventureCard
                    key={item.id || idx}
                    image={item.image}
                    title={item.title || item.name || 'Adventure'}
                    location={item.location || 'Unknown'}
                    price={item.price}
                    rating={item.rating}
                    onExplore={() => handleBuy(item)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DestinationPackages;