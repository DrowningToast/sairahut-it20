import { writable } from 'svelte/store';

export const secretMode = writable(false);
export const ambientSound = writable<undefined | HTMLAudioElement>(undefined);
