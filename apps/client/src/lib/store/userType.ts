import { writable } from 'svelte/store';

export const userType = writable<'FRESH' | 'SOPHOMORE'>('FRESH');
