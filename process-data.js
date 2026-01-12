const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const outputDir = path.join(__dirname, 'public', 'data');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function processData() {
    const files = fs.readdirSync(dataDir).filter(f => f.startsWith('api_data_aadhar_demographic') && f.endsWith('.csv'));

    let allData = [];

    // 1. Read and Parse (Simplified for memory - streaming would be better but 100MB fits in memory usually)
    // We will parse line by line to be safe.

    const stats = {
        byDate: {},
        byState: {},
        byDistrict: {}
    };

    console.log(`Found ${files.length} files. Processing...`);

    files.forEach(file => {
        console.log(`Processing ${file}...`);
        const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
        const lines = content.split('\n');

        // Skip header
        const startIndex = 1;

        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // CSV: date,state,district,pincode,demo_age_5_17,demo_age_17_
            const parts = line.split(',');
            if (parts.length < 6) continue;

            const date = parts[0];
            const state = parts[1];
            const district = parts[2];
            const val1 = parseInt(parts[4]) || 0; // 5-17
            const val2 = parseInt(parts[5]) || 0; // 17+
            const total = val1 + val2;

            // Date Aggregation
            if (!stats.byDate[date]) stats.byDate[date] = { count: 0 };
            stats.byDate[date].count += total;

            // State Aggregation
            if (!stats.byState[state]) stats.byState[state] = { count: 0 };
            stats.byState[state].count += total;

            // District Aggregation (for Heatmap/Anomaly)
            if (!stats.byDistrict[district]) {
                stats.byDistrict[district] = {
                    state: state,
                    count: 0,
                    dates: {}
                };
            }
            stats.byDistrict[district].count += total;

            // Track district daily spikes
            if (!stats.byDistrict[district].dates[date]) stats.byDistrict[district].dates[date] = 0;
            stats.byDistrict[district].dates[date] += total;
        }
    });

    // 2. Format for Frontend

    // Sort Dates
    const trends = Object.keys(stats.byDate).map(d => ({
        date: d,
        value: stats.byDate[d].count
    })).sort((a, b) => new Date(a.date.split('-').reverse().join('-')) - new Date(b.date.split('-').reverse().join('-')));

    // Sort States for Heatmap
    const heatmap = Object.keys(stats.byState).map(s => ({
        id: s,
        value: stats.byState[s].count
    })).sort((a, b) => b.value - a.value);

    // Find Anomalies (Top 5 districts with highest single-day spikes)
    const anomalies = [];
    Object.keys(stats.byDistrict).forEach(d => {
        const districtData = stats.byDistrict[d];
        const dates = Object.keys(districtData.dates);
        // consistent high volume or sudden spike? 
        // Let's just pick top 10 highest volume districts for now to show "Hotspots"
        // And maybe calculate variance later.

        anomalies.push({
            district: d,
            state: districtData.state,
            total: districtData.count
        });
    });

    const topDistricts = anomalies.sort((a, b) => b.total - a.total).slice(0, 10);

    const result = {
        trends,
        heatmap,
        topDistricts
    };

    fs.writeFileSync(path.join(outputDir, 'summary.json'), JSON.stringify(result, null, 2));
    console.log('✅ Data processing complete. Saved to public/data/summary.json');
}

processData();
