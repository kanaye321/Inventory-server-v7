import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon, EditIcon, TrashIcon, SearchIcon, DownloadIcon, UploadIcon, ArrowUpDown, ArrowUp, ArrowDown, FilterIcon, HistoryIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GcpInventoryForm from "@/components/gcp-inventory/gcp-inventory-form";
import { queryClient } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function GcpInventory() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [columnFilters, setColumnFilters] = useState({
    resourceType: '',
    projectId: '',
    displayName: '',
    location: '',
    status: '',
    remarks: ''
  });
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedChangeType, setSelectedChangeType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { toast } = useToast();

  const { data: historicalData = [] } = useQuery({
    queryKey: ['/api/gcp-inventory/historical'],
    queryFn: async () => {
      const response = await fetch('/api/gcp-inventory/historical', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch historical data');
      return response.json();
    },
  });

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        resourceType: "Compute Engine",
        projectId: "my-project-123456",
        displayName: "Example Production Instance",
        location: "us-central1",
        status: "active",
        remarks: "Production server - Contact: admin@example.com, IP: 10.0.0.1"
      },
      {
        resourceType: "Cloud Storage",
        projectId: "my-project-123456",
        displayName: "Example Storage Bucket",
        location: "us-east1",
        status: "active",
        remarks: "Storage for backups: data.backup@company.com"
      }
    ];

    const headers = ['resourceType', 'projectId', 'displayName', 'location', 'status', 'remarks'];
    const csvContent = [
      headers.join(','),
      ...templateData.map(row => 
        headers.map(header => {
          const value = row[header] || '';
          // Escape values containing commas, quotes, or special characters
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "gcp_inventory_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Template Downloaded",
      description: "GCP inventory import template has been downloaded successfully."
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setColumnFilters({
      resourceType: '',
      projectId: '',
      displayName: '',
      location: '',
      status: '',
      remarks: ''
    });
    toast({
      title: "Filters Cleared",
      description: "All search and column filters have been cleared."
    });
  };

  const handleExportCSV = () => {
    if (resources.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no GCP resources to export.",
        variant: "destructive"
      });
      return;
    }

    const headers = ['resourceType', 'projectId', 'displayName', 'location', 'status', 'remarks'];
    const csvContent = [
      headers.join(','),
      ...resources.map(resource => 
        headers.map(header => {
          const value = resource[header] || '';
          // Escape values containing commas, quotes, or special characters
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gcp_inventory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());

        if (lines.length < 2) {
          throw new Error('CSV file must contain at least a header row and one data row');
        }

        const parseCsvLine = (line: string): string[] => {
          const values: string[] = [];
          let currentVal = '';
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"' && i + 1 < line.length && line[i + 1] === '"') {
              currentVal += '"';
              i++;
            } else if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              values.push(currentVal.trim());
              currentVal = '';
            } else {
              currentVal += char;
            }
          }
          values.push(currentVal.trim());
          return values;
        };

        const headers = parseCsvLine(lines[0]).map(h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
        const resources = lines.slice(1).map(line => {
          const values = parseCsvLine(line);
          const resource: any = {};
          headers.forEach((header, index) => {
            const value = (values[index] || '').trim().replace(/^"|"$/g, '');
            if (header === 'resourcetype' || header === 'type') {
              resource.resourceType = value;
            } else if (header === 'projectid' || header === 'project') {
              resource.projectId = value;
            } else if (header === 'displayname' || header === 'name') {
              resource.displayName = value;
            } else if (header === 'location' || header === 'region' || header === 'zone') {
              resource.location = value;
            } else if (header === 'status' || header === 'state') {
              resource.status = value.toLowerCase() || 'active';
            } else if (header === 'remarks' || header === 'notes' || header === 'description') {
              resource.remarks = value;
            }
          });
          // Ensure name is set for consistency with backend expectations if needed, 
          // though backend uses displayName for uniqueness check
          resource.name = resource.displayName || resource.name;
          return resource;
        }).filter(r => (r.resourceType || r.type) && (r.projectId || r.project));

        if (resources.length === 0) {
          throw new Error('No valid resources found in CSV file');
        }

        const response = await fetch('/api/gcp-inventory/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ resources })
        });

        const result = await response.json();

        queryClient.invalidateQueries({ queryKey: ['/api/gcp-inventory'] });
        queryClient.invalidateQueries({ queryKey: ['/api/gcp-inventory/historical'] });
        setIsImportDialogOpen(false);

        toast({
          title: "Import completed",
          description: `${result.successful} resources processed (${result.updated || 0} updated). ${result.deleted || 0} marked as deleted. ${result.failed} failed.`,
        });
      } catch (error) {
        toast({
          title: "Import failed",
          description: error.message,
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['/api/gcp-inventory'],
    queryFn: async () => {
      const response = await fetch('/api/gcp-inventory', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch GCP inventory');
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      // Ensure timestamps are strings, not Date objects
      const payload = {
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt).toISOString() : new Date().toISOString(),
        updatedAt: data.updatedAt ? new Date(data.updatedAt).toISOString() : new Date().toISOString()
      };
      const response = await fetch('/api/gcp-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to create resource');
      return response.json();
    },
    onSuccess: (data) => {
      setIsDialogOpen(false);
      setEditingResource(null);
      queryClient.invalidateQueries({ queryKey: ['/api/gcp-inventory'] });

      // Send email notification
      fetch('/api/send-modification-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action: 'created',
          itemType: 'GCP Resource',
          itemName: data.name || 'New Resource',
          details: `GCP resource created: ${data.name}, Type: ${data.resourceType}, Project: ${data.projectId}, Location: ${data.location}`
        })
      }).catch(err => console.error('Failed to send email notification:', err));

      toast({ title: "Resource added", description: "GCP resource has been added successfully." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      // Ensure timestamps are strings
      const payload = {
        ...data,
        updatedAt: new Date().toISOString()
      };
      const response = await fetch(`/api/gcp-inventory/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to update resource');
      return response.json();
    },
    onSuccess: (data) => {
      setIsDialogOpen(false);
      setEditingResource(null);
      queryClient.invalidateQueries({ queryKey: ['/api/gcp-inventory'] });

      // Send email notification
      fetch('/api/send-modification-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action: 'updated',
          itemType: 'GCP Resource',
          itemName: data.name || 'Resource',
          details: `GCP resource updated: ${data.name}, Status: ${data.status}, Type: ${data.resourceType}`
        })
      }).catch(err => console.error('Failed to send email notification:', err));

      toast({ title: "Resource updated", description: "GCP resource has been updated successfully." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/gcp-inventory/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete resource');
      return response.status === 204 ? { success: true } : response.json();
    },
    onSuccess: () => {
      setResourceToDelete(null);
      queryClient.invalidateQueries({ queryKey: ['/api/gcp-inventory'] });
      toast({ title: "Resource deleted", description: "GCP resource has been deleted successfully." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const handleResourceSubmit = (data: any) => {
    if (editingResource) {
      updateMutation.mutate({ id: editingResource.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
      if (sortDirection === 'desc') {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setColumnFilters(prev => ({ ...prev, [field]: value }));
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3" />;
    if (sortDirection === 'asc') return <ArrowUp className="h-3 w-3" />;
    if (sortDirection === 'desc') return <ArrowDown className="h-3 w-3" />;
    return <ArrowUpDown className="h-3 w-3" />;
  };

  const uniqueStatuses = [...new Set(resources.map(r => r.status).filter(Boolean))].sort();
  const uniqueResourceTypes = [...new Set(resources.map(r => r.resourceType).filter(Boolean))].sort();

  const allFilteredResources = resources
    .filter((resource) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch = (
        resource?.name?.toLowerCase().includes(search) ||
        resource?.resourceType?.toLowerCase().includes(search) ||
        resource?.projectId?.toLowerCase().includes(search) ||
        resource?.displayName?.toLowerCase().includes(search) ||
        resource?.location?.toLowerCase().includes(search)
      );

      const matchesFilters = (
        (columnFilters.resourceType === '' || resource?.resourceType === columnFilters.resourceType) &&
        (resource?.projectId || '').toLowerCase().includes(columnFilters.projectId.toLowerCase()) &&
        (resource?.displayName || '').toLowerCase().includes(columnFilters.displayName.toLowerCase()) &&
        (resource?.location || '').toLowerCase().includes(columnFilters.location.toLowerCase()) &&
        (columnFilters.status === '' || resource?.status === columnFilters.status) &&
        (resource?.remarks || '').toLowerCase().includes(columnFilters.remarks.toLowerCase())
      );

      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      if (!sortField || !sortDirection) return 0;

      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(allFilteredResources.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const filteredResources = allFilteredResources.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-600",
      stopped: "bg-yellow-600",
      suspended: "bg-orange-600",
      deleted: "bg-red-600",
    };
    return <Badge className={statusColors[status] || "bg-gray-600"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">GCP Inventory</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage Google Cloud Platform resources - Current Month: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => { setEditingResource(null); setIsDialogOpen(true); }} className="bg-primary hover:bg-primary/90">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
          <Button variant="outline" onClick={handleDownloadTemplate}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download Template
          </Button>
          <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}>
            <UploadIcon className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button variant="outline" onClick={handleExportCSV}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex gap-2 items-center max-w-2xl">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, resource type, project ID, display name, or location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={handleClearFilters}
          disabled={!searchTerm && !Object.values(columnFilters).some(v => v !== '')}
        >
          Clear Filters
        </Button>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Inventory</TabsTrigger>
          <TabsTrigger value="historical">
            <HistoryIcon className="mr-2 h-4 w-4" />
            Historical Data
          </TabsTrigger>
          <TabsTrigger value="charts">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Charts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>GCP Resources</CardTitle>
              <CardDescription>Track and manage Google Cloud Platform infrastructure</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>Resource Type</span>
                        <Button variant="ghost" size="sm" onClick={() => handleSort('resourceType')} className="h-6 w-6 p-0">
                          {getSortIcon('resourceType')}
                        </Button>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <FilterIcon className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56" align="end">
                          <Select
                            value={columnFilters.resourceType || "all"}
                            onValueChange={(value) => handleFilterChange('resourceType', value === "all" ? "" : value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              {uniqueResourceTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>Project ID</span>
                        <Button variant="ghost" size="sm" onClick={() => handleSort('projectId')} className="h-6 w-6 p-0">
                          {getSortIcon('projectId')}
                        </Button>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <FilterIcon className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56" align="end">
                          <Input
                            placeholder="Filter project IDs..."
                            value={columnFilters.projectId}
                            onChange={(e) => handleFilterChange('projectId', e.target.value)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>Display Name</span>
                        <Button variant="ghost" size="sm" onClick={() => handleSort('displayName')} className="h-6 w-6 p-0">
                          {getSortIcon('displayName')}
                        </Button>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <FilterIcon className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56" align="end">
                          <Input
                            placeholder="Filter display names..."
                            value={columnFilters.displayName}
                            onChange={(e) => handleFilterChange('displayName', e.target.value)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>Location</span>
                        <Button variant="ghost" size="sm" onClick={() => handleSort('location')} className="h-6 w-6 p-0">
                          {getSortIcon('location')}
                        </Button>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <FilterIcon className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56" align="end">
                          <Input
                            placeholder="Filter locations..."
                            value={columnFilters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>Status</span>
                        <Button variant="ghost" size="sm" onClick={() => handleSort('status')} className="h-6 w-6 p-0">
                          {getSortIcon('status')}
                        </Button>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <FilterIcon className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56" align="end">
                          <Select
                            value={columnFilters.status || "all"}
                            onValueChange={(value) => handleFilterChange('status', value === "all" ? "" : value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              {uniqueStatuses.map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>Remarks</span>
                        <Button variant="ghost" size="sm" onClick={() => handleSort('remarks')} className="h-6 w-6 p-0">
                          {getSortIcon('remarks')}
                        </Button>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <FilterIcon className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56" align="end">
                          <Input
                            placeholder="Filter remarks..."
                            value={columnFilters.remarks}
                            onChange={(e) => handleFilterChange('remarks', e.target.value)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading GCP resources...
                    </TableCell>
                  </TableRow>
                ) : filteredResources.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {resources.length === 0 ? 'No GCP resources found' : 'No resources match the current search'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium truncate">{resource.resourceType || '-'}</TableCell>
                      <TableCell className="truncate">{resource.projectId || '-'}</TableCell>
                      <TableCell className="truncate">{resource.displayName || '-'}</TableCell>
                      <TableCell className="truncate">{resource.location || '-'}</TableCell>
                      <TableCell>{getStatusBadge(resource.status)}</TableCell>
                      <TableCell className="truncate">{resource.remarks || '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingResource(resource);
                              setIsDialogOpen(true);
                            }}
                          >
                            <EditIcon className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setResourceToDelete(resource)}
                          >
                            <TrashIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {allFilteredResources.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 px-6 pb-4 gap-4">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, allFilteredResources.length)} of {allFilteredResources.length} resources
              </div>
              <div className="flex items-center gap-4">
                <Select value={pageSize.toString()} onValueChange={(value) => {
                  setPageSize(parseInt(value));
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Page size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="25">25 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                    <SelectItem value="100">100 per page</SelectItem>
                  </SelectContent>
                </Select>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <span className="text-sm px-4">
                        Page {currentPage} of {totalPages}
                      </span>
                    </PaginationItem>
                    <PaginationItem>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="historical">
          <Card>
            <CardHeader>
              <CardTitle>Historical Data</CardTitle>
              <CardDescription>Track monthly changes, deletions, and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Months</SelectItem>
                      {[...new Set(historicalData.map(d => d.monthYear))].sort().reverse().map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedChangeType} onValueChange={setSelectedChangeType}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by change type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Changes</SelectItem>
                      <SelectItem value="imported">Imported</SelectItem>
                      <SelectItem value="updated">Updated</SelectItem>
                      <SelectItem value="deleted">Deleted</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="outline" 
                    onClick={() => {
                      const filtered = historicalData.filter(d => 
                        (selectedMonth === 'all' || d.monthYear === selectedMonth) &&
                        (selectedChangeType === 'all' || d.changeType === selectedChangeType)
                      );

                      if (filtered.length === 0) {
                        toast({
                          title: "No data to export",
                          description: "No historical data matches the current filters.",
                          variant: "destructive"
                        });
                        return;
                      }

                      const headers = ['Month', 'Change Type', 'Name', 'Resource Type', 'Project ID', 'Display Name', 'Location', 'Status', 'Remarks', 'Date'];
                      const csvContent = [
                        headers.join(','),
                        ...filtered.map(d => [
                          d.monthYear,
                          d.changeType,
                          d.name,
                          d.resourceType,
                          d.projectId,
                          d.displayName,
                          d.location,
                          d.status,
                          d.remarks || '',
                          new Date(d.createdAt).toLocaleDateString()
                        ].map(v => typeof v === 'string' && v.includes(',') ? `"${v}"` : v).join(','))
                      ].join('\n');

                      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.setAttribute("href", url);
                      link.setAttribute("download", `gcp_historical_${selectedMonth}_${selectedChangeType}_${new Date().toISOString().split('T')[0]}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Export Filtered Data
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Change Type</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Resource Type</TableHead>
                        <TableHead>Project ID</TableHead>
                        <TableHead>Display Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Remarks</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(() => {
                        const filtered = historicalData.filter(d => 
                          (selectedMonth === 'all' || d.monthYear === selectedMonth) &&
                          (selectedChangeType === 'all' || d.changeType === selectedChangeType)
                        );
                        const histStartIndex = (currentPage - 1) * pageSize;
                        const histEndIndex = histStartIndex + pageSize;
                        const paginatedHistorical = filtered.slice(histStartIndex, histEndIndex);

                        return paginatedHistorical.length > 0 ? (
                          paginatedHistorical.map((record) => (
                            <TableRow key={record.id}>
                              <TableCell>{record.monthYear}</TableCell>
                              <TableCell>
                                <Badge className={
                                  record.changeType === 'deleted' ? 'bg-red-600' :
                                  record.changeType === 'updated' ? 'bg-blue-600' :
                                  'bg-green-600'
                                }>
                                  {record.changeType}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">{record.name}</TableCell>
                              <TableCell>{record.resourceType}</TableCell>
                              <TableCell>{record.projectId}</TableCell>
                              <TableCell>{record.displayName}</TableCell>
                              <TableCell>{record.location}</TableCell>
                              <TableCell>
                                <Badge className={
                                  record.status === 'active' ? 'bg-green-600' :
                                  record.status === 'stopped' ? 'bg-yellow-600' :
                                  record.status === 'suspended' ? 'bg-orange-600' :
                                  'bg-red-600'
                                }>
                                  {record.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="max-w-xs truncate">{record.remarks || '-'}</TableCell>
                              <TableCell>{new Date(record.createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                              No historical data found for selected filters
                            </TableCell>
                          </TableRow>
                        );
                      })()}
                    </TableBody>
                  </Table>
                </div>
                {(() => {
                  const filtered = historicalData.filter(d => 
                    (selectedMonth === 'all' || d.monthYear === selectedMonth) &&
                    (selectedChangeType === 'all' || d.changeType === selectedChangeType)
                  );
                  const histTotalPages = Math.ceil(filtered.length / pageSize);
                  const histStartIndex = (currentPage - 1) * pageSize;
                  const histEndIndex = histStartIndex + pageSize;

                  return filtered.length > 0 ? (
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                      <div className="text-sm text-gray-500">
                        Showing {histStartIndex + 1} to {Math.min(histEndIndex, filtered.length)} of {filtered.length} records
                      </div>
                      <div className="flex items-center gap-4">
                        <Select value={pageSize.toString()} onValueChange={(value) => {
                          setPageSize(parseInt(value));
                          setCurrentPage(1);
                        }}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Page size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10 per page</SelectItem>
                            <SelectItem value="25">25 per page</SelectItem>
                            <SelectItem value="50">50 per page</SelectItem>
                            <SelectItem value="100">100 per page</SelectItem>
                          </SelectContent>
                        </Select>
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                              >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Previous
                              </Button>
                            </PaginationItem>
                            <PaginationItem>
                              <span className="text-sm px-4">
                                Page {currentPage} of {histTotalPages}
                              </span>
                            </PaginationItem>
                            <PaginationItem>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(histTotalPages, prev + 1))}
                                disabled={currentPage === histTotalPages}
                              >
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <div className="space-y-6">

            {/* Last Import Summary Cards + Changelog */}
            {(() => {
              const sortedMonths = [...new Set(historicalData.map((r: any) => r.monthYear))].sort((a: string, b: string) => b.localeCompare(a));
              const latestMonth = sortedMonths[0];
              const latestRecords = latestMonth ? historicalData.filter((r: any) => r.monthYear === latestMonth) : [];
              const newCount = latestRecords.filter((r: any) => r.changeType === 'imported').length;
              const updatedCount = latestRecords.filter((r: any) => r.changeType === 'updated').length;
              const deletedCount = latestRecords.filter((r: any) => r.changeType === 'deleted').length;
              return (
                <>
                  <div>
                    <div className="mb-3">
                      <h2 className="text-lg font-semibold">Last Import Summary</h2>
                      {latestMonth
                        ? <p className="text-sm text-gray-500">Most recent import: <span className="font-medium text-gray-700 dark:text-gray-300">{latestMonth}</span></p>
                        : <p className="text-sm text-gray-500">No imports yet. Import a CSV to start tracking changes.</p>
                      }
                    </div>
                    {latestMonth ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="border-l-4 border-l-green-500">
                          <CardContent className="pt-5 pb-4">
                            <div className="text-3xl font-bold text-green-600">{newCount}</div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">New Resources</div>
                            <div className="text-xs text-gray-400 mt-0.5">Added this import</div>
                          </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-blue-500">
                          <CardContent className="pt-5 pb-4">
                            <div className="text-3xl font-bold text-blue-600">{updatedCount}</div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Updated</div>
                            <div className="text-xs text-gray-400 mt-0.5">Changed from previous</div>
                          </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-red-500">
                          <CardContent className="pt-5 pb-4">
                            <div className="text-3xl font-bold text-red-600">{deletedCount}</div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Removed</div>
                            <div className="text-xs text-gray-400 mt-0.5">Not in latest import</div>
                          </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-gray-400">
                          <CardContent className="pt-5 pb-4">
                            <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">{newCount + updatedCount + deletedCount}</div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Total Changes</div>
                            <div className="text-xs text-gray-400 mt-0.5">This import cycle</div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="flex items-center justify-center py-10 text-gray-500 text-sm">
                          No import history available yet. Import a CSV to see change tracking.
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {latestMonth && latestRecords.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          Import Changelog
                          <span className="text-sm font-normal text-gray-500">— {latestMonth}</span>
                        </CardTitle>
                        <CardDescription>
                          Every resource that changed in the most recent import, sorted by change type.
                          <span className="ml-2 inline-flex gap-3 text-xs mt-1">
                            <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>New</span>
                            <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Updated</span>
                            <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>Removed</span>
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-gray-50 dark:bg-gray-800/60">
                                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300 w-24">Change</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Name</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Resource Type</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Project</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Location</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[...latestRecords]
                                .sort((a: any, b: any) => {
                                  const order: Record<string, number> = { deleted: 0, updated: 1, imported: 2 };
                                  return (order[a.changeType] ?? 3) - (order[b.changeType] ?? 3);
                                })
                                .map((record: any) => {
                                  const rowClass = record.changeType === 'imported'
                                    ? 'bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30'
                                    : record.changeType === 'updated'
                                    ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30'
                                    : 'bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30';
                                  const badgeClass = record.changeType === 'imported'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                                    : record.changeType === 'updated'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
                                  const label = record.changeType === 'imported' ? 'New' : record.changeType === 'updated' ? 'Updated' : 'Removed';
                                  const statusClass = record.status === 'active'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : record.status === 'stopped' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    : record.status === 'suspended' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
                                  return (
                                    <tr key={record.id} className={`border-b ${rowClass}`}>
                                      <td className="px-4 py-2.5">
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${badgeClass}`}>{label}</span>
                                      </td>
                                      <td className="px-4 py-2.5 font-medium">{record.name || record.displayName}</td>
                                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{record.resourceType}</td>
                                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{record.projectId}</td>
                                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{record.location}</td>
                                      <td className="px-4 py-2.5">
                                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>{record.status}</span>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              );
            })()}

            {/* Monthly Trend Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Changes Trend</CardTitle>
                <CardDescription>Visual breakdown of new, updated, and removed resources per import cycle</CardDescription>
              </CardHeader>
              <CardContent>
                {(() => {
                  const monthlyMap: Record<string, { month: string; New: number; Updated: number; Removed: number }> = {};
                  historicalData.forEach((record: any) => {
                    const m = record.monthYear;
                    if (!monthlyMap[m]) monthlyMap[m] = { month: m, New: 0, Updated: 0, Removed: 0 };
                    if (record.changeType === 'imported') monthlyMap[m].New++;
                    if (record.changeType === 'updated') monthlyMap[m].Updated++;
                    if (record.changeType === 'deleted') monthlyMap[m].Removed++;
                  });
                  const chartData = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));
                  return chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                        <Legend />
                        <Bar dataKey="New" fill="#16a34a" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="Updated" fill="#2563eb" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="Removed" fill="#dc2626" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-gray-500 text-sm">
                      No historical data available. Import CSV data to see trends.
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Full History Summary Table */}
            {historicalData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Import History by Month</CardTitle>
                  <CardDescription>Aggregated totals for each import cycle</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50 dark:bg-gray-800/60">
                          <th className="text-left px-4 py-3 font-medium">Month</th>
                          <th className="text-center px-4 py-3 font-medium text-green-700 dark:text-green-400">New</th>
                          <th className="text-center px-4 py-3 font-medium text-blue-700 dark:text-blue-400">Updated</th>
                          <th className="text-center px-4 py-3 font-medium text-red-700 dark:text-red-400">Removed</th>
                          <th className="text-center px-4 py-3 font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const months: Record<string, { new: number; updated: number; deleted: number }> = {};
                          historicalData.forEach((r: any) => {
                            if (!months[r.monthYear]) months[r.monthYear] = { new: 0, updated: 0, deleted: 0 };
                            if (r.changeType === 'imported') months[r.monthYear].new++;
                            if (r.changeType === 'updated') months[r.monthYear].updated++;
                            if (r.changeType === 'deleted') months[r.monthYear].deleted++;
                          });
                          return Object.entries(months)
                            .sort(([a], [b]) => b.localeCompare(a))
                            .map(([month, data]) => (
                              <tr key={month} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/40">
                                <td className="px-4 py-3 font-medium">{month}</td>
                                <td className="px-4 py-3 text-center">
                                  <span className="inline-block px-2.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold">{data.new}</span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <span className="inline-block px-2.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold">{data.updated}</span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <span className="inline-block px-2.5 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-semibold">{data.deleted}</span>
                                </td>
                                <td className="px-4 py-3 text-center font-semibold">{data.new + data.updated + data.deleted}</td>
                              </tr>
                            ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Distribution Charts */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>By Resource Type</CardTitle>
                  <CardDescription>Current inventory distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const counts: Record<string, number> = {};
                    resources.forEach((r: any) => { const k = r.resourceType || 'Unknown'; counts[k] = (counts[k] || 0) + 1; });
                    const total = Object.values(counts).reduce((s, c) => s + c, 0);
                    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a).slice(0, 8);
                    const colors = ['bg-blue-500','bg-purple-500','bg-teal-500','bg-orange-500','bg-pink-500','bg-indigo-500','bg-cyan-500','bg-amber-500'];
                    return sorted.length > 0 ? (
                      <div className="space-y-3 mt-1">
                        {sorted.map(([key, count], i) => (
                          <div key={key}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium truncate max-w-[140px]" title={key}>{key}</span>
                              <span className="text-xs text-gray-500">{count} ({total > 0 ? ((count/total)*100).toFixed(0) : 0}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                              <div className={`h-2 rounded-full ${colors[i % colors.length]}`} style={{ width: `${total > 0 ? (count/total)*100 : 0}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : <div className="text-center text-gray-500 py-8 text-sm">No data</div>;
                  })()}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>By Project</CardTitle>
                  <CardDescription>Current inventory distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const counts: Record<string, number> = {};
                    resources.forEach((r: any) => { const k = r.projectId || 'Unknown'; counts[k] = (counts[k] || 0) + 1; });
                    const total = Object.values(counts).reduce((s, c) => s + c, 0);
                    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a).slice(0, 8);
                    const colors = ['bg-emerald-500','bg-cyan-500','bg-violet-500','bg-rose-500','bg-amber-500','bg-blue-500','bg-teal-500','bg-orange-500'];
                    return sorted.length > 0 ? (
                      <div className="space-y-3 mt-1">
                        {sorted.map(([key, count], i) => (
                          <div key={key}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium truncate max-w-[140px]" title={key}>{key}</span>
                              <span className="text-xs text-gray-500">{count} ({total > 0 ? ((count/total)*100).toFixed(0) : 0}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                              <div className={`h-2 rounded-full ${colors[i % colors.length]}`} style={{ width: `${total > 0 ? (count/total)*100 : 0}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : <div className="text-center text-gray-500 py-8 text-sm">No data</div>;
                  })()}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>By Status</CardTitle>
                  <CardDescription>Current resource health overview</CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const counts: Record<string, number> = {};
                    resources.forEach((r: any) => { const k = r.status || 'Unknown'; counts[k] = (counts[k] || 0) + 1; });
                    const total = Object.values(counts).reduce((s, c) => s + c, 0);
                    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
                    const statusColor: Record<string, string> = { active: 'bg-green-500', stopped: 'bg-yellow-500', suspended: 'bg-orange-500', deleted: 'bg-red-500' };
                    return sorted.length > 0 ? (
                      <div className="space-y-3 mt-1">
                        {sorted.map(([key, count]) => (
                          <div key={key}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium capitalize">{key}</span>
                              <span className="text-xs text-gray-500">{count} ({total > 0 ? ((count/total)*100).toFixed(0) : 0}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                              <div className={`h-2 rounded-full ${statusColor[key] || 'bg-gray-500'}`} style={{ width: `${total > 0 ? (count/total)*100 : 0}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : <div className="text-center text-gray-500 py-8 text-sm">No data</div>;
                  })()}
                </CardContent>
              </Card>
            </div>

          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) setEditingResource(null);
      }}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingResource ? 'Edit Resource' : 'Add Resource'}</DialogTitle>
            <DialogDescription>
              {editingResource ? 'Update the GCP resource details' : 'Enter the details for the GCP resource'}
            </DialogDescription>
          </DialogHeader>
          <GcpInventoryForm 
            onSubmit={handleResourceSubmit} 
            isLoading={createMutation.isPending || updateMutation.isPending}
            defaultValues={editingResource}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import GCP Resources</DialogTitle>
            <DialogDescription>Upload a CSV file with GCP resource data</DialogDescription>
          </DialogHeader>
          <Input
            type="file"
            accept=".csv"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImportCSV(file);
            }}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        open={!!resourceToDelete}
        onClose={() => setResourceToDelete(null)}
        onConfirm={() => resourceToDelete && deleteMutation.mutate(resourceToDelete.id)}
        itemType="GCP resource"
        itemName={resourceToDelete ? resourceToDelete.name : ""}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}