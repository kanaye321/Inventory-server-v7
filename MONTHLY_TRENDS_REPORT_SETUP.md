# Monthly Trends Report - Integration Guide

## Overview
The Monthly Trends Report is a new comprehensive analytics dashboard for tracking IT asset trends, consumables usage, and monitor assignments over time.

## File Location
```
client/src/pages/monthly-trends-report.tsx
```

## Features Included

### 1. **KPI Summary Cards (Top Section)**
- Total Assets Added (This Month)
- Assets Assigned
- Assets Retired
- Consumables Used
- Consumables Restocked
- Monitors Assigned
- Available Monitors

### 2. **Monthly Trend Charts (Last 12 Months)**

**Assets:**
- Line Chart: Assets added per month
- Stacked Bar Chart: Asset status distribution (Active, In Repair, Retired)

**Consumables:**
- Bar Chart: Consumables usage per month
- Area Chart: Restock trends
- Donut Chart: Consumable categories distribution

**Monitors:**
- Line Chart: Monitor assignment trend
- Pie Chart: Assigned vs Available monitors

### 3. **Filters**
- Month (January - December)
- Year (Current year - 4 previous years)
- Department (Auto-populated from assets)
- Category (Auto-populated from assets)
- Status (Auto-populated from assets)

### 4. **Monitoring & Alerts Section**
Automatically displays:
- Low stock consumables (< 5 units)
- Most assigned asset type
- Highest consumable usage

### 5. **Export Reports**
Download options:
- Assets CSV
- Assets Excel
- Consumables CSV
- Monitor CSV

### 6. **Data Table**
Detailed asset inventory with:
- Search functionality
- Pagination (10 items per page)
- Sortable columns:
  - Asset Name
  - Category
  - Department
  - Status
  - Assigned To
  - Date Added

## How to Add the Route

To make this page accessible in your application, add the following to `client/src/main.tsx`:

### Step 1: Add the import (around line 57, after other page imports)
```typescript
import MonthlyTrendsReport from "@/pages/monthly-trends-report";
```

### Step 2: Add the route (in the Switch section, around line 324-325)
```typescript
<Route path="/monthly-trends-report" component={MonthlyTrendsReport} />
```

### Example (from main.tsx):
```typescript
// Around line 57 - after other imports
import MonthlyTrendsReport from "@/pages/monthly-trends-report";

// Around line 324 - in the Routes section
<Route path="/reports" component={Reports} />
<Route path="/reports-secondary" component={ReportsSecondary} />
<Route path="/monthly-trends-report" component={MonthlyTrendsReport} />  // <- Add this line
```

## Navigation Setup

To add this to your sidebar navigation, update `client/src/components/layout/sidebar.tsx` with a new menu item:

```typescript
{
  icon: TrendingUp,
  label: "Monthly Trends",
  href: "/monthly-trends-report",
}
```

## API Dependencies

The component uses the following API endpoints (already available in your system):
- `GET /api/assets` - Fetches all assets
- `GET /api/consumables` - Fetches all consumables
- `GET /api/monitor-inventory` - Fetches all monitors

## Data Requirements

The component expects data in the following format:

### Assets
```typescript
{
  id: number;
  name: string;
  category: string;
  status: string; // "active", "retired", "in repair", etc.
  department: string;
  assignedTo: number | null;
  createdAt: ISO8601 timestamp string;
}
```

### Consumables
```typescript
{
  id: number;
  name: string;
  category: string;
  quantity: number;
  status: string;
  createdAt: ISO8601 timestamp string;
}
```

### Monitors
```typescript
{
  id: number;
  name: string;
  status: string; // "assigned", "available"
  location: string;
  createdAt: ISO8601 timestamp string;
}
```

## Technologies Used

- **React 18**: UI framework
- **Recharts**: Interactive charts and visualizations
- **TanStack React Query**: Data fetching and caching
- **TailwindCSS**: Styling
- **XLSX**: Excel export functionality
- **date-fns**: Date utilities
- **Lucide React**: Icons

## Dark Mode Support

The component fully supports dark mode through the existing theme provider. All colors and styles adapt automatically.

## Testing the Page

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5000/monthly-trends-report`
3. Try different filters to see data change
4. Test export functionality
5. Verify pagination works correctly

## Example Data

The page automatically generates analytics from your existing database data:
- Filters assets by creation date
- Calculates month-over-month trends
- Aggregates consumable usage
- Tracks monitor assignments

No manual data seeding is required - the page uses your live data.

## Performance Notes

- Charts render responsively with proper scaling
- Table uses pagination to limit DOM elements
- Queries are optimized with React Query caching
- Filters apply client-side for instant feedback

## File Structure

```
client/src/
├── pages/
│   └── monthly-trends-report.tsx  <- NEW FILE (this page)
├── components/
│   ├── ui/                        (uses existing components)
│   └── layout/                    (sidebar, header)
└── lib/
    └── utils.ts                   (uses existing utilities)
```

## Troubleshooting

### Page not loading?
1. Ensure the route is added to `main.tsx`
2. Check that API endpoints are accessible: `/api/assets`, `/api/consumables`, `/api/monitor-inventory`
3. Verify no console errors in browser DevTools

### Charts not rendering?
1. Ensure Recharts is installed: `npm install recharts`
2. Check that data is being fetched (React Query DevTools)
3. Verify date format is ISO8601 (YYYY-MM-DDTHH:mm:ss.SSSZ)

### Export not working?
1. Verify XLSX is installed: `npm install xlsx`
2. Check browser console for errors
3. Ensure file-saver is available: `npm install file-saver`

## Future Enhancements

Possible additions:
- PDF export with custom styling
- Scheduled report generation
- Email report distribution
- Advanced filters (warranty expiration, etc.)
- Budget tracking and cost analysis
- Custom date ranges (not just month/year)
