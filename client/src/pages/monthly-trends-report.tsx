import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from "recharts";
import {
  TrendingUp, AlertCircle, Package, Monitor, Download, FileSpreadsheet,
  Filter, Search
} from "lucide-react";
import * as XLSX from "xlsx";
import { format, subMonths, parseISO } from "date-fns";

// ─── Real Asset Statuses from schema ────────────────────────────────────────
const ASSET_STATUS = {
  AVAILABLE: "available",
  DEPLOYED: "Deployed",
  PENDING: "pending",
  ON_HAND: "On-Hand",
  RESERVED: "Reserved",
};

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

// ─── Helpers ────────────────────────────────────────────────────────────────
/**
 * Parse a date from either camelCase createdAt or snake_case created_at.
 * Returns undefined if unparseable.
 */
function parseItemDate(item: any): Date | undefined {
  const raw = item.createdAt ?? item.created_at;
  if (!raw) return undefined;
  try {
    return parseISO(raw);
  } catch {
    return undefined;
  }
}

function matchesMonthYear(item: any, month: number, year: number): boolean {
  const d = parseItemDate(item);
  if (!d) return false;
  return d.getMonth() === month && d.getFullYear() === year;
}

function safeFormatDate(raw: string | undefined | null): string {
  if (!raw) return "—";
  try {
    return format(parseISO(raw), "MMM dd, yyyy");
  } catch {
    return raw;
  }
}

// ─── Types ──────────────────────────────────────────────────────────────────
interface Alert {
  type: "warning" | "info" | "error";
  title: string;
  message: string;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function MonthlyTrendsReport() {
  const { toast } = useToast();

  // Filters
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filters — Monthly Deployed Trend
  const [deployedCatFilter, setDeployedCatFilter] = useState("all");
  const [deployedNameFilter, setDeployedNameFilter] = useState("");

  // Filters — IT Equipment Assignment Trend
  const [equipCatFilter, setEquipCatFilter] = useState("all");
  const [equipNameFilter, setEquipNameFilter] = useState("");

  // Filters — Monitor Trend
  const [monitorModelFilter, setMonitorModelFilter] = useState("all");
  const [monitorDeptFilter, setMonitorDeptFilter] = useState("all");

  const itemsPerPage = 10;

  // ── Data Fetching ──────────────────────────────────────────────────────────
  const { data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await fetch("/api/assets", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch assets");
      return res.json();
    },
  });

  // Consumables = IT Equipment (user requirement)
  const { data: itEquipment = [] } = useQuery({
    queryKey: ["it-equipment"],
    queryFn: async () => {
      const res = await fetch("/api/it-equipment", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch IT equipment");
      return res.json();
    },
  });

  const { data: monitors = [] } = useQuery({
    queryKey: ["monitors"],
    queryFn: async () => {
      const res = await fetch("/api/monitor-inventory", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch monitors");
      return res.json();
    },
  });

  // ── KPI Summary ────────────────────────────────────────────────────────────
  const kpi = useMemo(() => {
    const monthAssets = assets.filter((a: any) => matchesMonthYear(a, selectedMonth, selectedYear));
    const monthEquip = itEquipment.filter((e: any) => matchesMonthYear(e, selectedMonth, selectedYear));
    const monthMonitors = monitors.filter((m: any) => matchesMonthYear(m, selectedMonth, selectedYear));

    return {
      assetsAdded: monthAssets.length,
      assetsDeployed: monthAssets.filter((a: any) => a.status === ASSET_STATUS.DEPLOYED).length,
      assetsOnHand: monthAssets.filter((a: any) => a.status === ASSET_STATUS.ON_HAND).length,
      assetsPending: monthAssets.filter((a: any) => a.status === ASSET_STATUS.PENDING).length,
      assetsAvailable: monthAssets.filter((a: any) => a.status === ASSET_STATUS.AVAILABLE).length,
      assetsReserved: monthAssets.filter((a: any) => a.status === ASSET_STATUS.RESERVED).length,
      // IT Equipment as consumables
      equipmentTotal: monthEquip.reduce((sum: number, e: any) => sum + (e.totalQuantity || 0), 0),
      equipmentAssigned: monthEquip.reduce((sum: number, e: any) => sum + (e.assignedQuantity || 0), 0),
      equipmentAvailable: monthEquip.reduce(
        (sum: number, e: any) => sum + Math.max(0, (e.totalQuantity || 0) - (e.assignedQuantity || 0)),
        0
      ),
      // Monitors (no status field — count total added this month)
      monitorsAdded: monthMonitors.length,
    };
  }, [assets, itEquipment, monitors, selectedMonth, selectedYear]);

  // ── 12-Month Trend Data ────────────────────────────────────────────────────
  const trendData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const monthDate = subMonths(new Date(), 11 - i);
      const month = monthDate.getMonth();
      const year = monthDate.getFullYear();
      const label = format(monthDate, "MMM yy");

      const ma = assets.filter((a: any) => matchesMonthYear(a, month, year));
      const me = itEquipment.filter((e: any) => matchesMonthYear(e, month, year));
      const mm = monitors.filter((m: any) => matchesMonthYear(m, month, year));

      return {
        month: label,
        assetsAdded: ma.length,
        available: ma.filter((a: any) => a.status === ASSET_STATUS.AVAILABLE).length,
        deployed: ma.filter((a: any) => a.status === ASSET_STATUS.DEPLOYED).length,
        pending: ma.filter((a: any) => a.status === ASSET_STATUS.PENDING).length,
        onHand: ma.filter((a: any) => a.status === ASSET_STATUS.ON_HAND).length,
        reserved: ma.filter((a: any) => a.status === ASSET_STATUS.RESERVED).length,
        equipmentAssigned: me.reduce((sum: number, e: any) => sum + (e.assignedQuantity || 0), 0),
        equipmentTotal: me.reduce((sum: number, e: any) => sum + (e.totalQuantity || 0), 0),
        monitorsAdded: mm.length,
      };
    });
  }, [assets, itEquipment, monitors]);

  // ── Deployed Trend Data (filtered by category + name) ─────────────────────
  const deployedTrendData = useMemo(() => {
    const filtered = assets.filter((a: any) => {
      if (a.status !== ASSET_STATUS.DEPLOYED) return false;
      if (deployedCatFilter !== "all" && a.category !== deployedCatFilter) return false;
      if (deployedNameFilter.trim() && !a.name?.toLowerCase().includes(deployedNameFilter.trim().toLowerCase())) return false;
      return true;
    });

    return Array.from({ length: 12 }, (_, i) => {
      const monthDate = subMonths(new Date(), 11 - i);
      const month = monthDate.getMonth();
      const year = monthDate.getFullYear();
      return {
        month: format(monthDate, "MMM yy"),
        deployed: filtered.filter((a: any) => matchesMonthYear(a, month, year)).length,
      };
    });
  }, [assets, deployedCatFilter, deployedNameFilter]);

  // ── Unique asset categories (for deployed chart filter) ────────────────────
  const assetCategories = useMemo(() =>
    Array.from(new Set(assets.map((a: any) => a.category).filter(Boolean))).sort(),
    [assets]
  );

  // ── IT Equipment Assignment Trend (filtered) ───────────────────────────────
  const equipTrendData = useMemo(() => {
    const filtered = itEquipment.filter((e: any) => {
      if (equipCatFilter !== "all" && e.category !== equipCatFilter) return false;
      if (equipNameFilter.trim() && !e.name?.toLowerCase().includes(equipNameFilter.trim().toLowerCase())) return false;
      return true;
    });

    return Array.from({ length: 12 }, (_, i) => {
      const monthDate = subMonths(new Date(), 11 - i);
      const month = monthDate.getMonth();
      const year = monthDate.getFullYear();
      const me = filtered.filter((e: any) => matchesMonthYear(e, month, year));
      return {
        month: format(monthDate, "MMM yy"),
        assigned: me.reduce((sum: number, e: any) => sum + (e.assignedQuantity || 0), 0),
        total: me.reduce((sum: number, e: any) => sum + (e.totalQuantity || 0), 0),
      };
    });
  }, [itEquipment, equipCatFilter, equipNameFilter]);

  // ── Monitor Trend (filtered) ───────────────────────────────────────────────
  const monitorTrendData = useMemo(() => {
    const filtered = monitors.filter((m: any) => {
      if (monitorModelFilter !== "all" && m.model !== monitorModelFilter) return false;
      if (monitorDeptFilter !== "all" && m.department !== monitorDeptFilter) return false;
      return true;
    });

    return Array.from({ length: 12 }, (_, i) => {
      const monthDate = subMonths(new Date(), 11 - i);
      const month = monthDate.getMonth();
      const year = monthDate.getFullYear();
      return {
        month: format(monthDate, "MMM yy"),
        monitors: filtered.filter((m: any) => matchesMonthYear(m, month, year)).length,
      };
    });
  }, [monitors, monitorModelFilter, monitorDeptFilter]);

  // ── Unique IT Equipment categories ─────────────────────────────────────────
  const equipCategories = useMemo(() =>
    Array.from(new Set(itEquipment.map((e: any) => e.category).filter(Boolean))).sort(),
    [itEquipment]
  );

  // ── Unique Monitor models & departments ────────────────────────────────────
  const monitorModels = useMemo(() =>
    Array.from(new Set(monitors.map((m: any) => m.model).filter(Boolean))).sort(),
    [monitors]
  );
  const monitorDepartments = useMemo(() =>
    Array.from(new Set(monitors.map((m: any) => m.department).filter(Boolean))).sort(),
    [monitors]
  );

  // ── Alerts ─────────────────────────────────────────────────────────────────
  const alerts: Alert[] = useMemo(() => {
    const list: Alert[] = [];

    // Low stock IT Equipment (available < 3)
    const lowStock = itEquipment.filter(
      (e: any) => Math.max(0, (e.totalQuantity || 0) - (e.assignedQuantity || 0)) < 3
    );
    if (lowStock.length > 0) {
      list.push({
        type: "warning",
        title: "Low Stock IT Equipment",
        message: `${lowStock.length} item(s) have fewer than 3 units available.`,
      });
    }

    // Most common asset category
    const catCount: Record<string, number> = {};
    assets.forEach((a: any) => {
      if (a.category) catCount[a.category] = (catCount[a.category] || 0) + 1;
    });
    const topCat = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0];
    if (topCat) {
      list.push({
        type: "info",
        title: "Most Common Asset Category",
        message: `"${topCat[0]}" has the highest count with ${topCat[1]} asset(s).`,
      });
    }

    // Most assigned IT Equipment
    const topEquip = [...itEquipment].sort(
      (a: any, b: any) => (b.assignedQuantity || 0) - (a.assignedQuantity || 0)
    )[0];
    if (topEquip) {
      list.push({
        type: "info",
        title: "Most Assigned IT Equipment",
        message: `"${topEquip.name}" has ${topEquip.assignedQuantity || 0} unit(s) assigned.`,
      });
    }

    return list;
  }, [assets, itEquipment]);

  // ── IT Equipment Category Pie ──────────────────────────────────────────────
  const equipCategoryData = useMemo(() => {
    const cats: Record<string, number> = {};
    itEquipment.forEach((e: any) => {
      if (e.category) cats[e.category] = (cats[e.category] || 0) + (e.totalQuantity || 0);
    });
    return Object.entries(cats).map(([name, value]) => ({ name, value }));
  }, [itEquipment]);

  // ── Asset Status pie (all-time) ────────────────────────────────────────────
  const assetStatusData = useMemo(() => {
    const counts: Record<string, number> = {};
    assets.forEach((a: any) => {
      if (a.status) counts[a.status] = (counts[a.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [assets]);

  // ── Table Filters ──────────────────────────────────────────────────────────
  const filteredAssets = useMemo(() => {
    return assets
      .filter((a: any) => {
        if (selectedDepartment !== "all" && a.department !== selectedDepartment) return false;
        if (selectedCategory !== "all" && a.category !== selectedCategory) return false;
        if (selectedStatus !== "all" && a.status !== selectedStatus) return false;
        if (searchQuery && !a.name?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      })
      .sort((a: any, b: any) => {
        const da = parseItemDate(a);
        const db = parseItemDate(b);
        return (db?.getTime() ?? 0) - (da?.getTime() ?? 0);
      });
  }, [assets, selectedDepartment, selectedCategory, selectedStatus, searchQuery]);

  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / itemsPerPage));

  const uniqueDepts = useMemo(() =>
    Array.from(new Set(assets.map((a: any) => a.department).filter(Boolean))),
    [assets]
  );
  const uniqueCats = useMemo(() =>
    Array.from(new Set(assets.map((a: any) => a.category).filter(Boolean))),
    [assets]
  );

  // ── Export Helpers ─────────────────────────────────────────────────────────
  const exportCSV = (rows: any[], filename: string) => {
    if (!rows.length) {
      toast({ description: "No data to export.", variant: "destructive" });
      return;
    }
    const header = Object.keys(rows[0]).join(",");
    const body = rows.map((r) =>
      Object.values(r).map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")
    );
    const blob = new Blob([[header, ...body].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportExcel = (rows: any[], filename: string) => {
    if (!rows.length) {
      toast({ description: "No data to export.", variant: "destructive" });
      return;
    }
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, filename);
  };

  const assetRows = () =>
    assets.map((a: any) => ({
      "Asset Name": a.name,
      "Asset Tag": a.assetTag,
      Category: a.category,
      Department: a.department ?? "—",
      Status: a.status,
      "Assigned To": a.assignedTo ?? "—",
      "Date Added": safeFormatDate(a.createdAt),
    }));

  const equipRows = () =>
    itEquipment.map((e: any) => ({
      Name: e.name,
      Category: e.category,
      "Total Qty": e.totalQuantity ?? 0,
      "Assigned Qty": e.assignedQuantity ?? 0,
      "Available Qty": Math.max(0, (e.totalQuantity ?? 0) - (e.assignedQuantity ?? 0)),
      Status: e.status ?? "—",
      Location: e.location ?? "—",
      "Date Added": safeFormatDate(e.created_at),
    }));

  const monitorRows = () =>
    monitors.map((m: any) => ({
      Name: m.name,
      Status: m.status,
      Location: m.location ?? "—",
      "Date Added": safeFormatDate(m.createdAt ?? m.created_at),
    }));

  // ── Status Badge ───────────────────────────────────────────────────────────
  const statusVariant = (status: string) => {
    switch (status) {
      case "Deployed": return "default";
      case "available": return "secondary";
      case "pending": return "outline";
      case "On-Hand": return "secondary";
      case "Reserved": return "outline";
      default: return "outline";
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Deployed": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "available": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "On-Hand": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Reserved": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Monthly Trends Report</h1>
        <p className="text-muted-foreground mt-1">
          Analytics and insights for assets, IT equipment, and monitors
        </p>
      </div>

      {/* ── Filters ── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Month */}
          <div className="space-y-1">
            <Label className="text-xs">Month</Label>
            <Select value={selectedMonth.toString()} onValueChange={(v) => { setSelectedMonth(parseInt(v)); setCurrentPage(1); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {format(new Date(2024, i), "MMMM")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year */}
          <div className="space-y-1">
            <Label className="text-xs">Year</Label>
            <Select value={selectedYear.toString()} onValueChange={(v) => { setSelectedYear(parseInt(v)); setCurrentPage(1); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                  <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Department */}
          <div className="space-y-1">
            <Label className="text-xs">Department</Label>
            <Select value={selectedDepartment} onValueChange={(v) => { setSelectedDepartment(v); setCurrentPage(1); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {uniqueDepts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <Label className="text-xs">Category</Label>
            <Select value={selectedCategory} onValueChange={(v) => { setSelectedCategory(v); setCurrentPage(1); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCats.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <Label className="text-xs">Asset Status</Label>
            <Select value={selectedStatus} onValueChange={(v) => { setSelectedStatus(v); setCurrentPage(1); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.values(ASSET_STATUS).map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ── KPI Summary Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-1 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">Assets Added</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold">{kpi.assetsAdded}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">Deployed</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{kpi.assetsDeployed}</div>
            <p className="text-xs text-muted-foreground">Assets deployed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">Available</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{kpi.assetsAvailable}</div>
            <p className="text-xs text-muted-foreground">Assets available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">IT Equip Assigned</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{kpi.equipmentAssigned}</div>
            <p className="text-xs text-muted-foreground">Units assigned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">IT Equip Available</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{kpi.equipmentAvailable}</div>
            <p className="text-xs text-muted-foreground">Units available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">Monitors</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{kpi.monitorsAdded}</div>
            <p className="text-xs text-muted-foreground">Added this month</p>
          </CardContent>
        </Card>
      </div>

      {/* ── Row 1: Asset Added + Deployed Trend ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets Added — Line */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Assets Added (12 Months)</CardTitle>
            <CardDescription>Monthly asset addition trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="assetsAdded" name="Assets Added" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Deployed Trend — filtered Line */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Deployed Trend</CardTitle>
            <CardDescription>Assets with Deployed status per month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <div className="flex-1 min-w-[130px]">
                <Select value={deployedCatFilter} onValueChange={setDeployedCatFilter}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {assetCategories.map((cat: string) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[150px] relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input className="h-8 text-xs pl-6" placeholder="Search by name…" value={deployedNameFilter} onChange={(e) => setDeployedNameFilter(e.target.value)} />
              </div>
              {(deployedCatFilter !== "all" || deployedNameFilter) && (
                <Button variant="ghost" size="sm" className="h-8 text-xs px-2" onClick={() => { setDeployedCatFilter("all"); setDeployedNameFilter(""); }}>Clear</Button>
              )}
            </div>
            <ResponsiveContainer width="100%" height={248}>
              <LineChart data={deployedTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip formatter={(value: any) => [value, "Deployed"]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="deployed" name="Deployed" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: "#10b981" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── Row 2: Asset Status Distribution + All-Time Donut ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Asset Status Distribution (12 Months)</CardTitle>
            <CardDescription>Available · Deployed · Pending · On-Hand · Reserved</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="available" name="Available" stackId="s" fill="#10b981" />
                <Bar dataKey="deployed" name="Deployed" stackId="s" fill="#3b82f6" />
                <Bar dataKey="pending" name="Pending" stackId="s" fill="#f59e0b" />
                <Bar dataKey="onHand" name="On-Hand" stackId="s" fill="#8b5cf6" />
                <Bar dataKey="reserved" name="Reserved" stackId="s" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">All-Time Asset Status</CardTitle>
            <CardDescription>Current distribution across all assets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={assetStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={2} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                  {assetStatusData.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── Row 3: IT Equipment Assignment Trend (filtered) + IT Equipment Usage ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IT Equipment Assignment Trend — filtered Area */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">IT Equipment Assignment Trend</CardTitle>
            <CardDescription>Monthly assigned unit count</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <div className="flex-1 min-w-[130px]">
                <Select value={equipCatFilter} onValueChange={setEquipCatFilter}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {equipCategories.map((cat: string) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[150px] relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input className="h-8 text-xs pl-6" placeholder="Search by name…" value={equipNameFilter} onChange={(e) => setEquipNameFilter(e.target.value)} />
              </div>
              {(equipCatFilter !== "all" || equipNameFilter) && (
                <Button variant="ghost" size="sm" className="h-8 text-xs px-2" onClick={() => { setEquipCatFilter("all"); setEquipNameFilter(""); }}>Clear</Button>
              )}
            </div>
            <ResponsiveContainer width="100%" height={248}>
              <AreaChart data={equipTrendData}>
                <defs>
                  <linearGradient id="equip-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="assigned" name="Assigned" stroke="#8b5cf6" fill="url(#equip-grad)" />
                <Area type="monotone" dataKey="total" name="Total" stroke="#ec4899" fill="none" strokeDasharray="4 2" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* IT Equipment Category Donut */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">IT Equipment Categories</CardTitle>
            <CardDescription>Distribution by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={295}>
              <PieChart>
                <Pie
                  data={equipCategoryData.length ? equipCategoryData : [{ name: "No data", value: 1 }]}
                  cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={2} dataKey="value"
                  label={({ name, value }) => equipCategoryData.length ? `${name}: ${value}` : ""}
                  labelLine={false}
                >
                  {(equipCategoryData.length ? equipCategoryData : [{ name: "No data", value: 1 }]).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── Row 4: Monitor Trend (filtered) + Alerts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monitor Trend — filtered Line */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monitor Trend (12 Months)</CardTitle>
            <CardDescription>Monitors added per month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <div className="flex-1 min-w-[130px]">
                <Select value={monitorModelFilter} onValueChange={setMonitorModelFilter}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="All Models" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Models</SelectItem>
                    {monitorModels.map((m: string) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[130px]">
                <Select value={monitorDeptFilter} onValueChange={setMonitorDeptFilter}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {monitorDepartments.map((d: string) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {(monitorModelFilter !== "all" || monitorDeptFilter !== "all") && (
                <Button variant="ghost" size="sm" className="h-8 text-xs px-2" onClick={() => { setMonitorModelFilter("all"); setMonitorDeptFilter("all"); }}>Clear</Button>
              )}
            </div>
            <ResponsiveContainer width="100%" height={248}>
              <LineChart data={monitorTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip formatter={(value: any) => [value, "Monitors"]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="monitors" name="Monitors" stroke="#ec4899" strokeWidth={2.5} dot={{ r: 4, fill: "#ec4899" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ── Monitoring & Alerts ── */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              Monitoring & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No alerts at this time.</p>
            ) : alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-sm ${
                  alert.type === "warning"
                    ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-700"
                    : alert.type === "error"
                      ? "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-700"
                      : "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-700"
                }`}
              >
                <p className="font-semibold">{alert.title}</p>
                <p className="text-muted-foreground mt-0.5">{alert.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── Export Options ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Download className="h-4 w-4" />
            Export Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button variant="outline" className="gap-2" onClick={() => {
            exportCSV(assetRows(), `asset-report-${format(new Date(), "yyyy-MM-dd")}.csv`);
            toast({ description: "Asset report exported as CSV." });
          }}>
            <FileSpreadsheet className="h-4 w-4" /> Assets CSV
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => {
            exportExcel(assetRows(), `asset-report-${format(new Date(), "yyyy-MM-dd")}.xlsx`);
            toast({ description: "Asset report exported as Excel." });
          }}>
            <FileSpreadsheet className="h-4 w-4" /> Assets Excel
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => {
            exportCSV(equipRows(), `it-equipment-report-${format(new Date(), "yyyy-MM-dd")}.csv`);
            toast({ description: "IT Equipment report exported as CSV." });
          }}>
            <FileSpreadsheet className="h-4 w-4" /> IT Equipment CSV
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => {
            exportCSV(monitorRows(), `monitor-report-${format(new Date(), "yyyy-MM-dd")}.csv`);
            toast({ description: "Monitor report exported as CSV." });
          }}>
            <FileSpreadsheet className="h-4 w-4" /> Monitors CSV
          </Button>
        </CardContent>
      </Card>

      {/* ── Asset Data Table ── */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Package className="h-4 w-4" /> Asset Inventory
              </CardTitle>
              <CardDescription>
                Showing {paginatedAssets.length} of {filteredAssets.length} assets
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Date Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAssets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                      No assets match the current filters.
                    </TableCell>
                  </TableRow>
                ) : paginatedAssets.map((asset: any) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.department ?? "—"}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </TableCell>
                    <TableCell>{asset.assignedTo ? "Assigned" : "Unassigned"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {safeFormatDate(asset.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
