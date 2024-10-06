export const RACE_DISTANCES = [
    {value: 'FIVE_K', label: '5k'},
    {value: 'TEN_K', label: '10k'},
    {value: 'HALF_MARATHON', label: 'Half Marathon'},
    {value: 'MARATHON', label: 'Marathon'},
];

export const getDistanceLabel = (distanceValue) => {
    const distance = RACE_DISTANCES.find(d => d.value === distanceValue);
    return distance ? distance.label : distanceValue;
};