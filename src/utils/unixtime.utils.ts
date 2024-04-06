// Unix time converter function
export function unixTimeConverter(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
    return date.toUTCString(); // Convert to UTC string
}

// Function to get current Unix time
export function getCurrentUnixTime() {
    return Math.floor(Date.now() / 1000); // Get current time in milliseconds and convert to Unix time
}

export function dateToUnixTime(dateString) {
    const unixTime = Math.floor(new Date(dateString).getTime() / 1000); // Convert milliseconds to seconds
    return unixTime;
}

export function addMinutesToUnixTime(unixTimestamp, minutesToAdd) {
    const millisecondsToAdd = minutesToAdd * 60 * 1000; // Convert minutes to milliseconds
    const newUnixTimestamp = unixTimestamp + (millisecondsToAdd / 1000); // Convert milliseconds to seconds
    return newUnixTimestamp;
}

export function checkunixtimeUnderMinutes(startTime,minutesToAdd){
    const evaltime =  addMinutesToUnixTime(startTime,minutesToAdd)
    const currentTime  =  getCurrentUnixTime()
    if(currentTime < evaltime) return true;
    return false
}
// Usage
// const unixTimestamp = 1617690000; // Example Unix timestamp
// console.log("Converted time:", unixTimeConverter(unixTimestamp));

// console.log("Current Unix time:", getCurrentUnixTime());
