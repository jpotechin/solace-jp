import { db } from './index';
import { count } from 'drizzle-orm';
import { advocates } from './schema';

export const healthCheck = async (
  timeoutMs: number = 5000
): Promise<boolean> => {
  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Health check timeout')), timeoutMs);
    });

    await Promise.race([db.select().from(advocates).limit(1), timeoutPromise]);
    return true;
  } catch (error) {
    console.warn('Health check failed:', error);
    return false;
  }
};

export const getAdvocatesCount = async (
  timeoutMs: number = 5000
): Promise<number> => {
  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(
        () => reject(new Error('Database operation timeout')),
        timeoutMs
      );
    });

    const result = await Promise.race([
      db.select({ count: count() }).from(advocates),
      timeoutPromise,
    ]);

    return result[0]?.count || 0;
  } catch (error) {
    console.warn('Failed to get advocates count:', error);
    return 0;
  }
};
