import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  RefreshCw,
  Settings,
  Kanban,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  User,
  Clock,
  Tag,
  MessageSquare,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "jira-kanban-credentials";

interface JiraCredentials {
  email: string;
  token: string;
  jiraUrl: string;
  projectKey: string;
}

interface JiraIssue {
  id: string;
  key: string;
  summary: string;
  description?: string;
  status: {
    name: string;
    statusCategory: {
      name: string;
      colorName: string;
      key: string;
    };
  };
  priority?: {
    name: string;
    iconUrl?: string;
  };
  issuetype: {
    name: string;
    iconUrl?: string;
  };
  assignee?: {
    displayName: string;
    emailAddress: string;
  };
  reporter?: {
    displayName: string;
    emailAddress: string;
  };
  created: string;
  updated: string;
  labels: string[];
  commentCount: number;
}

const PRIORITY_COLORS: Record<string, string> = {
  Critical: "bg-red-100 text-red-800 border-red-200",
  Highest: "bg-red-100 text-red-800 border-red-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Low: "bg-blue-100 text-blue-800 border-blue-200",
  Lowest: "bg-gray-100 text-gray-800 border-gray-200",
};

const PRIORITY_DOT: Record<string, string> = {
  Critical: "bg-red-500",
  Highest: "bg-red-500",
  High: "bg-orange-500",
  Medium: "bg-yellow-500",
  Low: "bg-blue-400",
  Lowest: "bg-gray-400",
};

function groupByKanban(issues: JiraIssue[]) {
  const columns: Record<string, JiraIssue[]> = {
    "To Do": [],
    "In Progress": [],
    "In Review": [],
    Done: [],
  };

  issues.forEach((issue) => {
    const cat = issue.status?.statusCategory?.key ?? "";
    const name = issue.status?.name ?? "";

    if (cat === "done" || name.toLowerCase().includes("done") || name.toLowerCase().includes("closed") || name.toLowerCase().includes("resolved")) {
      columns["Done"].push(issue);
    } else if (
      name.toLowerCase().includes("review") ||
      name.toLowerCase().includes("testing") ||
      name.toLowerCase().includes("qa")
    ) {
      columns["In Review"].push(issue);
    } else if (
      cat === "indeterminate" ||
      name.toLowerCase().includes("progress") ||
      name.toLowerCase().includes("development") ||
      name.toLowerCase().includes("started")
    ) {
      columns["In Progress"].push(issue);
    } else {
      columns["To Do"].push(issue);
    }
  });

  return columns;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function IssueCard({ issue, jiraUrl }: { issue: JiraIssue; jiraUrl: string }) {
  const priorityName = issue.priority?.name ?? "Medium";
  const priorityClass = PRIORITY_COLORS[priorityName] ?? "bg-gray-100 text-gray-800 border-gray-200";
  const dotClass = PRIORITY_DOT[priorityName] ?? "bg-gray-400";
  const issueUrl = `${jiraUrl.replace(/\/$/, "")}/browse/${issue.key}`;

  return (
    <Card className="mb-2 hover:shadow-md transition-shadow cursor-pointer group">
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <a
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-blue-600 hover:underline flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {issue.key}
            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <span className={`text-xs px-1.5 py-0.5 rounded border flex items-center gap-1 ${priorityClass}`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotClass}`} />
            {priorityName}
          </span>
        </div>

        <p className="text-sm font-medium leading-snug line-clamp-2">{issue.summary}</p>

        {issue.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {issue.labels.slice(0, 3).map((label) => (
              <span key={label} className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">
                <Tag className="inline h-2.5 w-2.5 mr-0.5" />
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {issue.assignee?.displayName ?? "Unassigned"}
          </span>
          <div className="flex items-center gap-2">
            {issue.commentCount > 0 && (
              <span className="flex items-center gap-0.5">
                <MessageSquare className="h-3 w-3" />
                {issue.commentCount}
              </span>
            )}
            <span className="flex items-center gap-0.5">
              <Clock className="h-3 w-3" />
              {timeAgo(issue.updated)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const COLUMN_COLORS: Record<string, string> = {
  "To Do": "border-t-gray-400",
  "In Progress": "border-t-blue-500",
  "In Review": "border-t-purple-500",
  Done: "border-t-green-500",
};

const COLUMN_BADGE: Record<string, string> = {
  "To Do": "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "In Review": "bg-purple-100 text-purple-700",
  Done: "bg-green-100 text-green-700",
};

export default function JiraKanban() {
  const { toast } = useToast();

  const [creds, setCreds] = useState<JiraCredentials>({
    email: "",
    token: "",
    jiraUrl: "",
    projectKey: "",
  });
  const [showToken, setShowToken] = useState(false);
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState("credentials");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: JiraCredentials = JSON.parse(saved);
        setCreds(parsed);
        if (parsed.email && parsed.token && parsed.jiraUrl && parsed.projectKey) {
          setActiveTab("kanban");
        }
      }
    } catch {
    }
  }, []);

  const saveCreds = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
    toast({ title: "Credentials saved", description: "Your Jira credentials have been saved locally." });
  };

  const testMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/jira/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: creds.email, token: creds.token, jiraUrl: creds.jiraUrl }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Connection successful",
        description: `Connected as ${data.displayName} (${data.emailAddress})`,
      });
    },
    onError: (err: Error) => {
      toast({ title: "Connection failed", description: err.message, variant: "destructive" });
    },
  });

  const fetchMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/jira/kanban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(creds),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }
      return res.json();
    },
    onSuccess: (data) => {
      setIssues(data.issues);
      setLastFetched(new Date());
      toast({ title: "Board updated", description: `Loaded ${data.issues.length} tickets from Jira.` });
    },
    onError: (err: Error) => {
      toast({ title: "Failed to fetch tickets", description: err.message, variant: "destructive" });
    },
  });

  const handleConnect = () => {
    if (!creds.email || !creds.token || !creds.jiraUrl || !creds.projectKey) {
      toast({ title: "Missing fields", description: "Please fill in all credential fields.", variant: "destructive" });
      return;
    }
    saveCreds();
    setActiveTab("kanban");
    fetchMutation.mutate();
  };

  const columns = groupByKanban(issues);

  const filtered = useCallback(() => {
    if (!searchQuery.trim()) return issues;
    const q = searchQuery.toLowerCase();
    return issues.filter(
      (i) =>
        i.summary.toLowerCase().includes(q) ||
        i.key.toLowerCase().includes(q) ||
        i.assignee?.displayName.toLowerCase().includes(q) ||
        i.status?.name.toLowerCase().includes(q)
    );
  }, [issues, searchQuery]);

  const filteredColumns = useCallback(() => {
    const f = filtered();
    return groupByKanban(f);
  }, [filtered]);

  const credentialsComplete = creds.email && creds.token && creds.jiraUrl && creds.projectKey;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Kanban className="h-6 w-6 text-blue-600" />
              Jira Kanban Board
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Connect to your internal Jira and view tickets as a Kanban board
            </p>
          </div>
          {activeTab === "kanban" && issues.length > 0 && (
            <div className="flex items-center gap-3">
              {lastFetched && (
                <span className="text-xs text-muted-foreground">
                  Last updated: {lastFetched.toLocaleTimeString()}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchMutation.mutate()}
                disabled={fetchMutation.isPending}
              >
                {fetchMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-1.5" />
                )}
                Refresh
              </Button>
            </div>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-6 pt-2">
          <TabsList>
            <TabsTrigger value="credentials" className="flex items-center gap-1.5">
              <Settings className="h-4 w-4" />
              Credentials
            </TabsTrigger>
            <TabsTrigger value="kanban" className="flex items-center gap-1.5" disabled={!credentialsComplete}>
              <Kanban className="h-4 w-4" />
              Kanban Board
              {issues.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {issues.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ── Credentials Tab ─────────────────────────────────── */}
        <TabsContent value="credentials" className="flex-1 px-6 py-4">
          <div className="max-w-lg space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Jira Connection Settings</CardTitle>
                <CardDescription>
                  Enter your Jira credentials. Use your account email and a personal API token.
                  Credentials are stored locally in your browser.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jiraUrl">Jira URL</Label>
                  <Input
                    id="jiraUrl"
                    placeholder="https://yourcompany.atlassian.net"
                    value={creds.jiraUrl}
                    onChange={(e) => setCreds((p) => ({ ...p, jiraUrl: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    The base URL of your Jira instance (e.g. https://company.atlassian.net or http://jira.internal)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={creds.email}
                    onChange={(e) => setCreds((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token">Personal API Token</Label>
                  <div className="relative">
                    <Input
                      id="token"
                      type={showToken ? "text" : "password"}
                      placeholder="Your Jira API token"
                      value={creds.token}
                      onChange={(e) => setCreds((p) => ({ ...p, token: e.target.value }))}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowToken((v) => !v)}
                    >
                      {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Generate from: Jira Profile → Security → API tokens. For on-premise Jira, use your password.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectKey">Project Key</Label>
                  <Input
                    id="projectKey"
                    placeholder="e.g. PROJ, IT, DEV"
                    value={creds.projectKey}
                    onChange={(e) => setCreds((p) => ({ ...p, projectKey: e.target.value.toUpperCase() }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    The Jira project key (the short code shown in ticket numbers like PROJ-123).
                  </p>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => testMutation.mutate()}
                    disabled={testMutation.isPending || !creds.email || !creds.token || !creds.jiraUrl}
                  >
                    {testMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                    )}
                    Test Connection
                  </Button>

                  <Button onClick={handleConnect} disabled={!credentialsComplete || fetchMutation.isPending}>
                    {fetchMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Kanban className="h-4 w-4 mr-2" />
                    )}
                    Connect & Open Board
                  </Button>
                </div>

                {testMutation.isSuccess && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>
                      Connected as <strong>{testMutation.data?.displayName}</strong>
                    </AlertDescription>
                  </Alert>
                )}
                {testMutation.isError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{(testMutation.error as Error).message}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">How to get an API token</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>
                  <strong>Jira Cloud (Atlassian):</strong> Go to{" "}
                  <a
                    href="https://id.atlassian.com/manage-profile/security/api-tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Atlassian account settings → API tokens
                  </a>
                  , create a new token and paste it above.
                </p>
                <p>
                  <strong>Jira Server / Data Center:</strong> Use your regular password, or go to{" "}
                  Profile → Personal Access Tokens to create one.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Kanban Tab ─────────────────────────────────────── */}
        <TabsContent value="kanban" className="flex-1 flex flex-col px-6 pb-4 overflow-hidden">
          {fetchMutation.isPending && issues.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3">
                <Loader2 className="h-10 w-10 animate-spin mx-auto text-blue-600" />
                <p className="text-muted-foreground">Fetching tickets from Jira…</p>
              </div>
            </div>
          ) : issues.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3">
                <Kanban className="h-12 w-12 mx-auto text-muted-foreground/40" />
                <p className="text-muted-foreground">No tickets loaded yet.</p>
                <Button onClick={() => fetchMutation.mutate()} disabled={fetchMutation.isPending}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Load Tickets
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 py-3">
                <div className="relative flex-1 max-w-xs">
                  <Input
                    placeholder="Search tickets…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-3"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {filtered().length} of {issues.length} tickets
                </span>
              </div>

              <div className="flex-1 flex gap-4 overflow-x-auto pb-2 min-h-0">
                {Object.entries(filteredColumns()).map(([column, columnIssues]) => (
                  <div
                    key={column}
                    className={`flex-shrink-0 w-72 flex flex-col rounded-lg border border-t-4 ${COLUMN_COLORS[column]} bg-muted/30`}
                  >
                    <div className="px-3 py-2.5 flex items-center justify-between">
                      <span className="font-semibold text-sm">{column}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${COLUMN_BADGE[column]}`}>
                        {columnIssues.length}
                      </span>
                    </div>
                    <Separator />
                    <ScrollArea className="flex-1 p-2">
                      {columnIssues.length === 0 ? (
                        <p className="text-xs text-center text-muted-foreground py-6">No tickets</p>
                      ) : (
                        columnIssues.map((issue) => (
                          <IssueCard key={issue.id} issue={issue} jiraUrl={creds.jiraUrl} />
                        ))
                      )}
                    </ScrollArea>
                  </div>
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
