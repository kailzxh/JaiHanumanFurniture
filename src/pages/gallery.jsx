import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Image, Play, Truck, X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [activeStory, setActiveStory] = useState(null);
  const [storyProgress, setStoryProgress] = useState(0);

  // Fetch stories from separate table
  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase.from('stories').select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching stories:', error);
        return;
      }

      const processedStories = await Promise.all(
        data.map(async (story) => {
          let mediaUrl = story.media;
          if (!mediaUrl.startsWith('http')) {
            const { data: publicURL } = supabase.storage
              .from('product-images')
              .getPublicUrl(mediaUrl);
            mediaUrl = publicURL.publicUrl;
          }
          return { ...story, media: mediaUrl };
        })
      );

      setStories(processedStories);
    };

    fetchStories();
  }, []);

  // Fetch gallery items
  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase.from('gallery').select('*');
      if (error) {
        console.error('Error fetching gallery:', error);
        return;
      }

      const updatedItems = await Promise.all(
        data.map(async (item) => {
          let mediaData = item.media;
          if (!mediaData) {
            mediaData = [];
          } else if (typeof mediaData === 'string') {
            if (mediaData.startsWith('http') || mediaData.endsWith('.jpg') || mediaData.endsWith('.png') || mediaData.endsWith('.mp4')) {
              mediaData = [mediaData];
            } else {
              try {
                mediaData = JSON.parse(mediaData);
              } catch (e) {
                console.error('Media parsing error:', e);
                mediaData = [];
              }
            }
          }

          const mediaURLs = await Promise.all(
            mediaData.map(async (mediaFile) => {
              if (mediaFile.startsWith('http')) return mediaFile;
              const { data: publicURL } = supabase.storage.from('product-images').getPublicUrl(mediaFile);
              return publicURL.publicUrl;
            })
          );

          return { ...item, media: mediaURLs };
        })
      );

      setGalleryItems(updatedItems);
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    let timer;
    if (activeStory !== null) {
      timer = setInterval(() => {
        setStoryProgress((prev) => {
          if (prev >= 100) {
            // Move to next story
            if (activeStory < stories.length - 1) {
              setActiveStory(activeStory + 1);
              return 0;
            } else {
              setActiveStory(null);
              return 0;
            }
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [activeStory, stories.length]);

  const navigateGallery = (direction) => {
    if (!selectedItem) return;
    let newIndex = direction === 'prev' ? selectedIndex - 1 : selectedIndex + 1;
    if (newIndex < 0) newIndex = galleryItems.length - 1;
    if (newIndex >= galleryItems.length) newIndex = 0;
    setSelectedItem(galleryItems[newIndex]);
    setSelectedIndex(newIndex);
    setMediaIndex(0);
  };

  const navigateMedia = (direction) => {
    if (!selectedItem || !selectedItem.media) return;
    let newMediaIndex = direction === 'prev' ? mediaIndex - 1 : mediaIndex + 1;
    if (newMediaIndex < 0) newMediaIndex = selectedItem.media.length - 1;
    if (newMediaIndex >= selectedItem.media.length) newMediaIndex = 0;
    setMediaIndex(newMediaIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      {/* <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Jaihanuman Furniture Gallery</h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Discover our collection of handcrafted furniture
          </p>
        </div>
      </header> */}

      {/* Stories Section */}
      {stories.length > 0 && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto">
            <div className="flex space-x-4">
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  onClick={() => {
                    setActiveStory(index);
                    setStoryProgress(0);
                  }}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-2 ring-offset-2 ring-purple-500 p-1">
                    <img
                      src={story.media}
                      alt={story.title}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="mt-1 text-xs truncate max-w-[80px] text-center">
                    {story.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gallery Grid
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedItem(item);
                setSelectedIndex(index);
                setMediaIndex(0);
              }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer
                transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                ${item.size === 'large' ? 'col-span-2 row-span-2' : ''}
                ${item.size === 'medium' ? 'row-span-2' : ''}`}
            >
              <div className="relative overflow-hidden aspect-square">
                {item.media[0].endsWith('.mp4') ? (
                  <div className="relative bg-gray-900 flex items-center justify-center h-full">
                    <Play className="w-12 h-12 text-white opacity-80" />
                  </div>
                ) : (
                  <img
                    src={item.media[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                {item.media.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                    +{item.media.length - 1}
                  </div>
                )}
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-lg font-semibold truncate">{item.title}</h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main> */}

<main className="max-w-7xl mx-auto px-4 py-6 sm:py-12">
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 auto-rows-[minmax(200px,_auto)]">
    {galleryItems.map((item) => (
      <div
        key={item.id} // ✅ Keeps React's rendering stable
        onClick={() => {
          setSelectedItem(item);
          setSelectedIndex(galleryItems.findIndex((i) => i.id === item.id));
          setMediaIndex(0);
        }}
        className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer
          transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
          ${item.size === 'large' ? 'col-span-2 row-span-2' : ''}
          ${item.size === 'medium' ? 'row-span-2' : ''}`}
      >
        <div className="relative overflow-hidden aspect-square">
          {item.media[0].endsWith('.mp4') ? (
            <div className="relative bg-gray-900 flex items-center justify-center h-full">
              <Play className="w-12 h-12 text-white opacity-80" />
            </div>
          ) : (
            <img
              src={item.media[0]}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
          {item.media.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
              +{item.media.length - 1}
            </div>
          )}
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="text-sm sm:text-lg font-semibold truncate">{item.title}</h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 line-clamp-2">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
</main>


      {/* Story Modal */}
      {activeStory !== null && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-full h-full relative">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: `${storyProgress}%` }}
              />
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-4 right-4 text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (activeStory > 0) {
                  setActiveStory(activeStory - 1);
                  setStoryProgress(0);
                }
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (activeStory < stories.length - 1) {
                  setActiveStory(activeStory + 1);
                  setStoryProgress(0);
                }
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Content */}
            <div className="h-full flex items-center justify-center p-4">
              {stories[activeStory]?.media.endsWith('.mp4') ? (
                <video
                  autoPlay
                  controls
                  className="max-h-full max-w-full object-contain"
                >
                  <source src={stories[activeStory]?.media} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={stories[activeStory]?.media}
                  alt={stories[activeStory]?.title}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            {/* Story Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-white text-xl font-bold">
                {stories[activeStory]?.title}
              </h2>
              <p className="text-white/80 mt-2">
                {stories[activeStory]?.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Media Viewer Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative">
              {selectedItem.media[mediaIndex].endsWith('.mp4') ? (
                <video controls className="w-full rounded-lg">
                  <source src={selectedItem.media[mediaIndex]} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={selectedItem.media[mediaIndex]}
                  alt={selectedItem.title}
                  className="w-full h-auto rounded-lg"
                />
              )}

              {/* Media Navigation */}
              {selectedItem.media.length > 1 && (
                <>
                  <button
                    onClick={() => navigateMedia('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => navigateMedia('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Media Counter */}
              {selectedItem.media.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {mediaIndex + 1} / {selectedItem.media.length}
                </div>
              )}
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
              <p className="mt-2 text-gray-700">{selectedItem.description}</p>
            </div>

            {/* Gallery Navigation */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button
                onClick={() => navigateGallery('prev')}
                className="bg-white/80 p-2 rounded-full hover:bg-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateGallery('next')}
                className="bg-white/80 p-2 rounded-full hover:bg-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;