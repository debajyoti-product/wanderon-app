import re

with open('src/screens/TripDetail.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add state
content = content.replace(
    'const [activePolicy, setActivePolicy] = useState(trip.policies?.[0]?.id || \'\');',
    'const [activePolicy, setActivePolicy] = useState(trip.policies?.[0]?.id || \'\');\n  const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false);'
)

# 2. Modify Similar Trips
similar_old = r'<div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-4 gap-6">\s*\{similarTrips\.map\(similarTrip => \(\s*<TripCard key=\{similarTrip\.id\} trip=\{similarTrip\} />\s*\)\)\}\s*</div>'
similar_new = '''<div className="flex overflow-x-auto hide-scrollbar pl-4 pr-4 pb-2 gap-3 snap-x">
              {similarTrips.map(similarTrip => (
                <div key={similarTrip.id} className="w-[220px] shrink-0 snap-start">
                  <TripCard trip={similarTrip} layout="compact" />
                </div>
              ))}
            </div>'''
content = re.sub(similar_old, similar_new, content, flags=re.MULTILINE)

# 3. Replace right column desktop booking panel
# We'll just hide the right column completely by replacing its div with nothing
content = re.sub(r'\{\/\* Right Column - Booking Panel \*\/\}.*?<div className="hidden @lg:block @lg:w-\[35\%\] relative">.*?<\/div>\s*<\/div>\s*<\/div>', '</div>\n          </div>', content, flags=re.DOTALL)
# The above regex might be tricky, let's just make the hidden class 'hidden' period.
content = content.replace('hidden @lg:block @lg:w-[35%] relative', 'hidden')

# 4. Replace Mobile Sticky Bottom Bar
bottom_bar_old = r'\{\/\* Mobile Sticky Bottom Bar \*\/\}.*?<\/Button>\s*<\/div>\s*\)\}'
bottom_bar_new = '''{/* Sticky Bottom Bar */}
        {selectedStyle && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-40 pb-[env(safe-area-inset-bottom)] bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-gray-500 font-medium mb-0.5">Starting from</p>
              <p className="text-xl font-bold text-brand-cyan">
                ?{(selectedStyle.price || trip.price).toLocaleString('en-IN')}
              </p>
            </div>
            <Button variant="primary" onClick={() => setIsBookingSheetOpen(true)}>
              View dates & book
            </Button>
          </div>
        )}

        {/* Booking Bottom Sheet Modal */}
        <AnimatePresence>
          {isBookingSheetOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-black/50 z-50 backdrop-blur-sm"
                onClick={() => setIsBookingSheetOpen(false)}
              />
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-x-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[60] bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto flex flex-col pb-[env(safe-area-inset-bottom)]"
              >
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-display font-bold text-lg">Select Dates & Style</h3>
                  <button onClick={() => setIsBookingSheetOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 active:scale-95">
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div className="p-5">
                  <BookingPanel
                    trip={trip}
                    selectedStyle={selectedStyle!}
                    onStyleChange={(id) => { const style = trip.travelStyles!.find(s => s.id === id); if(style) setSelectedStyle(style); }}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>'''

content = re.sub(bottom_bar_old, bottom_bar_new, content, flags=re.DOTALL)

with open('src/screens/TripDetail.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
