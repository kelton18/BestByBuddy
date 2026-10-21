import { FoodItem } from '../models/FoodItem';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseLocalDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function daysUntilExpiration(item: FoodItem): number {
  const expiration = parseLocalDate(item.expirationDate);
  return Math.round((expiration.getTime() - startOfToday().getTime()) / MS_PER_DAY);
}

export function isExpired(item: FoodItem): boolean {
  return daysUntilExpiration(item) < 0;
}

export function isExpiringSoon(item: FoodItem, thresholdDays: number = 3): boolean {
  const days = daysUntilExpiration(item);
  return days >= 0 && days <= thresholdDays;
}