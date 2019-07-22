// Returns a promise that resolves after the given `time` in milliseconds
export default async (time) => new Promise (r => setTimeout(r, time));
