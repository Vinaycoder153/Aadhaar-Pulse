import { promises as fs } from 'fs';
import path from 'path';
import DashboardClient from '@/components/DashboardClient';
import Navbar from '@/components/Navbar';
import { DashboardData } from '@/types';

async function getDashboardData(): Promise<DashboardData> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'summary.json');
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (e) {
    console.error("Failed to read data", e);
    // Return empty structure to prevent crashes
    return {
      trends: [],
      heatmap: [],
      topDistricts: [],
      predictions: [],
      insights: [],
      recommendations: []
    };
  }
}

export default async function Home() {
  const data = await getDashboardData();

  return (
    <main>
      <Navbar />
      <DashboardClient data={data} />
    </main>
  );
}
