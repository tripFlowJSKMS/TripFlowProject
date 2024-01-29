export function groupItineraryByDate(itinerary) {
    return itinerary.reduce((acc, item) => {
      const date = item.stringDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
};
  