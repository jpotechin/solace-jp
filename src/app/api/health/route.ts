import { NextResponse } from 'next/server';
import { healthCheck, getAdvocatesCount } from '@/db/utils';

export async function GET() {
  try {
    const [isHealthy, advocateCount] = await Promise.all([
      healthCheck(5000),
      getAdvocatesCount(5000),
    ]);

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: isHealthy,
        advocateCount,
      },
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: {
          connected: false,
          advocateCount: 0,
        },
        environment: process.env.NODE_ENV || 'development',
        error: 'Health check failed',
      },
      { status: 500 }
    );
  }
}
