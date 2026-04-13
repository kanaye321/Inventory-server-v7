import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusIcon, EditIcon, TrashIcon, SearchIcon, DownloadIcon, UploadIcon, ArrowUpDown, ArrowUp, ArrowDown, FilterIcon, HistoryIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AwsInventoryForm from "@/components/aws-inventory/aws-inventory-form";
import { queryClient } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AwsInventory() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [columnFilters, setColumnFilters] = useState({
    name: '',
    identifier: '',
    service: '',
    type: '',
    region: '',
    accountName: '',
    accountId: '',
    status: '',
    remarks: ''
  });
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedChangeType, setSelectedChangeType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { toast } = useToast();

  const { data: historicalData = [] } = useQuery({
    queryKey: ['/api/aws-inventory/historical'],
    queryFn: async () => {
      const response = await fetch('/api/aws-inventory/historical', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch historical data');
      return response.json();
    },
  });

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        identifier: "i-1234567890abcdef0",
        service: "EC2",
        type: "t3.medium",
        region: "us-east-1",
        accountName: "Production Account",
        accountId: "123456789012",
        status: "active",
        remarks: "Production web server - Contact: admin@example.com"
      },
      {
        identifier: "db-instance-1",
        service: "RDS",
        type: "db.t3.micro",
        region: "us-west-2",
        accountName: "Production Account",
        accountId: "123456789012",
        status: "active",
        remarks: "Database instance for application"
      }
    ];

    const headers = ['identifier', 'service', 'type', 'region', 'accountName', 'accountId', 'status', 'remarks'];
    const csvContent = [
      headers.join(','),
      ...templateData.map(row => 
        headers.map(header => {
          const value = row[header] || '';
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
    link.setAttribute("download", "aws_inventory_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Template Downloaded",
      description: "AWS inventory import template has been downloaded successfully."
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setColumnFilters({
      identifier: '',
      service: '',
      type: '',
      region: '',
      accountName: '',
      accountId: '',
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
        description: "There are no AWS resources to export.",
        variant: "destructive"
      });
      return;
    }

    // Match template format exactly - 8 columns only
    const headers = ['identifier', 'service', 'type', 'region', 'accountName', 'accountId', 'status', 'remarks'];
    const csvContent = [
      headers.join(','),
      ...resources.map(resource => 
        headers.map(header => {
          let value = resource[header];

          // Convert any non-string values to string
          if (value === null || value === undefined) {
            value = '';
          } else if (typeof value === 'object') {
            value = String(value);
          } else if (typeof value !== 'string') {
            value = String(value);
          }

          // Escape values that contain special characters
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
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
    link.setAttribute("download", `aws_inventory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export completed",
      description: `${resources.length} AWS resources exported successfully.`
    });
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

        const headers = parseCsvLine(lines[0]).map(h => h.trim().toLowerCase());
        const resources = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = parseCsvLine(line);
            const resource: any = {};

            headers.forEach((header, index) => {
              const value = (values[index] || '').trim().replace(/^"|"$/g, '');
              const cleanedHeader = header.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

              // Map header variations to correct field names
              if (cleanedHeader === 'identifier' || cleanedHeader === 'resourceidentifier') {
                resource.identifier = value;
              } else if (cleanedHeader === 'service' || cleanedHeader === 'awsservice') {
                resource.service = value;
              } else if (cleanedHeader === 'type' || cleanedHeader === 'resourcetype') {
                resource.type = value;
              } else if (cleanedHeader === 'region' || cleanedHeader === 'awsregion') {
                resource.region = value;
              } else if (cleanedHeader === 'accountname' || cleanedHeader === 'account_name') {
                resource.accountName = value;
              } else if (cleanedHeader === 'accountid' || cleanedHeader === 'account_id') {
                resource.accountId = value;
              } else if (cleanedHeader === 'status') {
                resource.status = value || 'active';
              } else if (cleanedHeader === 'remarks' || cleanedHeader === 'notes' || cleanedHeader === 'description') {
                resource.remarks = value;
              }
            });

            // Validate required fields
            if (!resource.identifier || !resource.service || !resource.type || 
                !resource.region || !resource.accountName || !resource.accountId) {
              console.warn('Skipping row with missing required fields:', resource);
              return null;
            }

            return resource;
          })
          .filter(r => r !== null);

        if (resources.length === 0) {
          throw new Error('No valid resources found in CSV file');
        }

        const response = await fetch('/api/aws-inventory/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ resources })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Import failed');
        }

        const result = await response.json();

        queryClient.invalidateQueries({ queryKey: ['/api/aws-inventory'] });
        queryClient.invalidateQueries({ queryKey: ['/api/aws-inventory/historical'] });
        setIsImportDialogOpen(false);

        toast({
          title: "Import completed",
          description: `${result.successful} resources imported, ${result.updated || 0} updated, ${result.deleted || 0} marked as deleted. ${result.failed || 0} failed.`,
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
    queryKey: ['/api/aws-inventory'],
    queryFn: async () => {
      const response = await fetch('/api/aws-inventory', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch AWS inventory');
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/aws-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create resource');
      return response.json();
    },
    onSuccess: (data) => {
      setIsDialogOpen(false);
      setEditingResource(null);
      queryClient.invalidateQueries({ queryKey: ['/api/aws-inventory'] });

      fetch('/api/send-modification-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action: 'created',
          itemType: 'AWS Resource',
          itemName: data.identifier,
          details: `AWS resource created: ${data.identifier}, Service: ${data.service}, Type: ${data.type}, Region: ${data.region}`
        })
      }).catch(err => console.error('Failed to send email notification:', err));

      toast({ title: "Resource added", description: "AWS resource has been added successfully." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await fetch(`/api/aws-inventory/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update resource');
      return response.json();
    },
    onSuccess: (data) => {
      setIsDialogOpen(false);
      setEditingResource(null);
      queryClient.invalidateQueries({ queryKey: ['/api/aws-inventory'] });

      fetch('/api/send-modification-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action: 'updated',
          itemType: 'AWS Resource',
          itemName: data.identifier,
          details: `AWS resource updated: ${data.identifier}, Status: ${data.status}, Service: ${data.service}`
        })
      }).catch(err => console.error('Failed to send email notification:', err));

      toast({ title: "Resource updated", description: "AWS resource has been updated successfully." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/aws-inventory/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete resource');
      return response.status === 204 ? { success: true } : response.json();
    },
    onSuccess: () => {
      setResourceToDelete(null);
      queryClient.invalidateQueries({ queryKey: ['/api/aws-inventory'] });
      toast({ title: "Resource deleted", description: "AWS resource has been deleted successfully." });
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
  const uniqueServices = [...new Set(resources.map(r => r.service).filter(Boolean))].sort();

  const allFilteredResources = resources
    .filter((resource) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch = (
        resource?.identifier?.toLowerCase().includes(search) ||
        resource?.service?.toLowerCase().includes(search) ||
        resource?.type?.toLowerCase().includes(search) ||
        resource?.region?.toLowerCase().includes(search) ||
        resource?.accountName?.toLowerCase().includes(search) ||
        resource?.accountId?.toLowerCase().includes(search)
      );

      const matchesFilters = (
        (resource?.identifier || '').toLowerCase().includes(columnFilters.identifier.toLowerCase()) &&
        (columnFilters.service === '' || resource?.service === columnFilters.service) &&
        (resource?.type || '').toLowerCase().includes(columnFilters.type.toLowerCase()) &&
        (resource?.region || '').toLowerCase().includes(columnFilters.region.toLowerCase()) &&
        (resource?.accountName || '').toLowerCase().includes(columnFilters.accountName.toLowerCase()) &&
        (resource?.accountId || '').toLowerCase().includes(columnFilters.accountId.toLowerCase()) &&
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
      terminated: "bg-orange-600",
      deleted: "bg-red-600",
    };
    return <Badge className={statusColors[status] || "bg-gray-600"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">AWS Inventory</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage Amazon Web Services resources - Current Month: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
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
            placeholder="Search by identifier, service, type, region, account name, or account ID..."
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
              <CardTitle>AWS Resources</CardTitle>
              <CardDescription>Track and manage Amazon Web Services infrastructure</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>Identifier</span>
                            <Button variant="ghost" size="sm" onClick={() => handleSort('identifier')} className="h-6 w-6 p-0">
                              {getSortIcon('identifier')}
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
                                placeholder="Filter identifiers..."
                                value={columnFilters.identifier}
                                onChange={(e) => handleFilterChange('identifier', e.target.value)}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>Service</span>
                            <Button variant="ghost" size="sm" onClick={() => handleSort('service')} className="h-6 w-6 p-0">
                              {getSortIcon('service')}
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
                                value={columnFilters.service || "all"}
                                onValueChange={(value) => handleFilterChange('service', value === "all" ? "" : value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Filter by service" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Services</SelectItem>
                                  {uniqueServices.map(service => (
                                    <SelectItem key={service} value={service}>{service}</SelectItem>
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
                            <span>Type</span>
                            <Button variant="ghost" size="sm" onClick={() => handleSort('type')} className="h-6 w-6 p-0">
                              {getSortIcon('type')}
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
                                placeholder="Filter types..."
                                value={columnFilters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>Region</span>
                            <Button variant="ghost" size="sm" onClick={() => handleSort('region')} className="h-6 w-6 p-0">
                              {getSortIcon('region')}
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
                                placeholder="Filter regions..."
                                value={columnFilters.region}
                                onChange={(e) => handleFilterChange('region', e.target.value)}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>Account Name</span>
                            <Button variant="ghost" size="sm" onClick={() => handleSort('accountName')} className="h-6 w-6 p-0">
                              {getSortIcon('accountName')}
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
                                placeholder="Filter account names..."
                                value={columnFilters.accountName}
                                onChange={(e) => handleFilterChange('accountName', e.target.value)}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>Account ID</span>
                            <Button variant="ghost" size="sm" onClick={() => handleSort('accountId')} className="h-6 w-6 p-0">
                              {getSortIcon('accountId')}
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
                                placeholder="Filter account IDs..."
                                value={columnFilters.accountId}
                                onChange={(e) => handleFilterChange('accountId', e.target.value)}
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
                        <TableCell colSpan={9} className="text-center py-8">
                          Loading AWS resources...
                        </TableCell>
                      </TableRow>
                    ) : filteredResources.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                          {resources.length === 0 ? 'No AWS resources found' : 'No resources match the current search'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredResources.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell className="font-medium truncate">{resource.identifier || '-'}</TableCell>
                          <TableCell className="truncate">{resource.service || '-'}</TableCell>
                          <TableCell className="truncate">{resource.type || '-'}</TableCell>
                          <TableCell className="truncate">{resource.region || '-'}</TableCell>
                          <TableCell className="truncate">{resource.accountName || '-'}</TableCell>
                          <TableCell className="truncate">{resource.accountId || '-'}</TableCell>
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

                      const headers = ['Month', 'Change Type', 'Identifier', 'Service', 'Type', 'Region', 'Account Name', 'Account ID', 'Status', 'Remarks', 'Date'];
                      const csvContent = [
                        headers.join(','),
                        ...filtered.map(d => [
                          d.monthYear,
                          d.changeType,
                          d.identifier,
                          d.service,
                          d.type,
                          d.region,
                          d.accountName,
                          d.accountId,
                          d.status,
                          d.remarks || '',
                          new Date(d.createdAt).toLocaleDateString()
                        ].map(v => typeof v === 'string' && v.includes(',') ? `"${v}"` : v).join(','))
                      ].join('\n');

                      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.setAttribute("href", url);
                      link.setAttribute("download", `aws_historical_${selectedMonth}_${selectedChangeType}_${new Date().toISOString().split('T')[0]}.csv`);
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
                        <TableHead>Identifier</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Account Name</TableHead>
                        <TableHead>Account ID</TableHead>
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
                              <TableCell className="font-medium">{record.identifier}</TableCell>
                              <TableCell>{record.service}</TableCell>
                              <TableCell>{record.type}</TableCell>
                              <TableCell>{record.region}</TableCell>
                              <TableCell>{record.accountName}</TableCell>
                              <TableCell>{record.accountId}</TableCell>
                              <TableCell>{getStatusBadge(record.status)}</TableCell>
                              <TableCell className="max-w-xs truncate">{record.remarks || '-'}</TableCell>
                              <TableCell>{new Date(record.createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                              No historical data found for selected filters
                            </TableCell>
                          </TableRow>
                        );
                      })()}
                    </TableBody>
                  </Table>
                </div>
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
                                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Identifier</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Service</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Type</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Region</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Account</th>
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
                                    : record.status === 'terminated' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
                                  return (
                                    <tr key={record.id} className={`border-b ${rowClass}`}>
                                      <td className="px-4 py-2.5">
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${badgeClass}`}>{label}</span>
                                      </td>
                                      <td className="px-4 py-2.5 font-medium font-mono text-xs">{record.identifier || record.name}</td>
                                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{record.service}</td>
                                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{record.type}</td>
                                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{record.region}</td>
                                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{record.accountName}</td>
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
                  <CardTitle>By Service</CardTitle>
                  <CardDescription>Current inventory distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const counts: Record<string, number> = {};
                    resources.forEach((r: any) => { const k = r.service || 'Unknown'; counts[k] = (counts[k] || 0) + 1; });
                    const total = Object.values(counts).reduce((s, c) => s + c, 0);
                    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a).slice(0, 8);
                    const colors = ['bg-orange-500','bg-blue-500','bg-purple-500','bg-teal-500','bg-pink-500','bg-indigo-500','bg-cyan-500','bg-amber-500'];
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
                  <CardTitle>By Account</CardTitle>
                  <CardDescription>Current inventory distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const counts: Record<string, number> = {};
                    resources.forEach((r: any) => { const k = r.accountName || 'Unknown'; counts[k] = (counts[k] || 0) + 1; });
                    const total = Object.values(counts).reduce((s, c) => s + c, 0);
                    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a).slice(0, 8);
                    const colors = ['bg-indigo-500','bg-emerald-500','bg-cyan-500','bg-violet-500','bg-rose-500','bg-amber-500','bg-blue-500','bg-teal-500'];
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
                    const statusColor: Record<string, string> = { active: 'bg-green-500', stopped: 'bg-yellow-500', terminated: 'bg-orange-500', deleted: 'bg-red-500' };
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
              {editingResource ? 'Update the AWS resource details' : 'Enter the details for the AWS resource'}
            </DialogDescription>
          </DialogHeader>
          <AwsInventoryForm 
            onSubmit={handleResourceSubmit} 
            isLoading={createMutation.isPending || updateMutation.isPending}
            defaultValues={editingResource}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import AWS Resources</DialogTitle>
            <DialogDescription>Upload a CSV file with AWS resource data</DialogDescription>
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
        itemType="AWS resource"
        itemName={resourceToDelete ? resourceToDelete.identifier : ""}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}