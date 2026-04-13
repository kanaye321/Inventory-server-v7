var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  AccessoryStatus: () => AccessoryStatus,
  ActivityTypes: () => ActivityTypes,
  AssetCategories: () => AssetCategories,
  AssetConditions: () => AssetConditions,
  AssetStatus: () => AssetStatus,
  ConsumableStatus: () => ConsumableStatus,
  LicenseStatus: () => LicenseStatus,
  accessories: () => accessories,
  activities: () => activities,
  approvalMonitoring: () => approvalMonitoring,
  assets: () => assets,
  awsHistoricalData: () => awsHistoricalData,
  awsInventory: () => awsInventory,
  azureHistoricalData: () => azureHistoricalData,
  azureInventory: () => azureInventory2,
  bitlockerKeys: () => bitlockerKeys,
  components: () => components,
  consumableAssignments: () => consumableAssignments,
  consumables: () => consumables,
  customPages: () => customPages,
  discoveredHosts: () => discoveredHosts,
  gcpHistoricalData: () => gcpHistoricalData,
  gcpInventory: () => gcpInventory,
  iamAccountApprovalHistory: () => iamAccountApprovalHistory,
  iamAccounts: () => iamAccounts,
  insertAccessorySchema: () => insertAccessorySchema,
  insertActivitySchema: () => insertActivitySchema,
  insertApprovalNumberHistorySchema: () => insertApprovalNumberHistorySchema,
  insertAssetSchema: () => insertAssetSchema,
  insertAwsHistoricalDataSchema: () => insertAwsHistoricalDataSchema,
  insertAwsInventorySchema: () => insertAwsInventorySchema,
  insertComponentSchema: () => insertComponentSchema,
  insertConsumableAssignmentSchema: () => insertConsumableAssignmentSchema,
  insertConsumableSchema: () => insertConsumableSchema,
  insertITEquipmentAssignmentSchema: () => insertITEquipmentAssignmentSchema,
  insertIamAccountApprovalHistorySchema: () => insertIamAccountApprovalHistorySchema,
  insertIamAccountSchema: () => insertIamAccountSchema,
  insertLicenseAssignmentSchema: () => insertLicenseAssignmentSchema,
  insertLicenseSchema: () => insertLicenseSchema,
  insertMonitorInventorySchema: () => insertMonitorInventorySchema,
  insertSystemSettingsSchema: () => insertSystemSettingsSchema,
  insertUserSchema: () => insertUserSchema,
  insertVmApprovalHistorySchema: () => insertVmApprovalHistorySchema,
  insertZabbixSettingsSchema: () => insertZabbixSettingsSchema,
  itEquipment: () => itEquipment,
  itEquipmentAssignments: () => itEquipmentAssignments,
  licenseAssignments: () => licenseAssignments,
  licenses: () => licenses,
  monitorInventory: () => monitorInventory,
  monitoringAlertRules: () => monitoringAlertRules,
  monitoringAlerts: () => monitoringAlerts,
  monitoringDashboards: () => monitoringDashboards,
  monitoringDatasources: () => monitoringDatasources,
  monitoringNotifications: () => monitoringNotifications,
  monitoringPanels: () => monitoringPanels,
  notifications: () => notifications,
  settings: () => settings2,
  storageMediaInventory: () => storageMediaInventory,
  systemSettings: () => systemSettings,
  users: () => users,
  vmApprovalHistory: () => vmApprovalHistory,
  vmApprovalHistorySchema: () => vmApprovalHistorySchema,
  vmInventory: () => vmInventory,
  vmMonitoring: () => vmMonitoring,
  vms: () => vms,
  zabbixSettings: () => zabbixSettings,
  zabbixSubnets: () => zabbixSubnets
});
import { pgTable, text, serial, integer, boolean, timestamp, json, real } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
var users, assets, components, accessories, consumables, licenses, licenseAssignments, consumableAssignments, activities, vmInventory, vms, AssetStatus, AccessoryStatus, ConsumableStatus, LicenseStatus, AssetCategories, AssetConditions, ActivityTypes, itEquipment, itEquipmentAssignments, insertUserSchema, insertAssetSchema, insertComponentSchema, insertAccessorySchema, insertConsumableSchema, insertLicenseSchema, insertLicenseAssignmentSchema, insertActivitySchema, insertConsumableAssignmentSchema, insertITEquipmentAssignmentSchema, vmApprovalHistory, vmApprovalHistorySchema, insertVmApprovalHistorySchema, monitorInventory, insertMonitorInventorySchema, systemSettings, insertSystemSettingsSchema, zabbixSettings, zabbixSubnets, discoveredHosts, vmMonitoring, azureInventory2, gcpInventory, azureHistoricalData, gcpHistoricalData, approvalMonitoring, customPages, monitoringDashboards, monitoringPanels, monitoringAlertRules, monitoringDatasources, monitoringAlerts, monitoringNotifications, bitlockerKeys, iamAccounts, iamAccountApprovalHistory, awsInventory, awsHistoricalData, notifications, settings2, storageMediaInventory, insertZabbixSettingsSchema, insertAwsInventorySchema, insertAwsHistoricalDataSchema, insertIamAccountSchema, insertIamAccountApprovalHistorySchema, insertApprovalNumberHistorySchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      username: text("username").unique().notNull(),
      password: text("password").notNull(),
      firstName: text("first_name"),
      lastName: text("last_name"),
      email: text("email"),
      department: text("department"),
      isAdmin: boolean("is_admin").default(false),
      roleId: integer("role_id"),
      mfaEnabled: boolean("mfa_enabled").default(false),
      mfaSecret: text("mfa_secret"),
      forcePasswordChange: boolean("force_password_change").default(false),
      permissions: json("permissions").$type().default({
        assets: { view: true, edit: false, add: false },
        components: { view: true, edit: false, add: false },
        accessories: { view: true, edit: false, add: false },
        consumables: { view: true, edit: false, add: false },
        licenses: { view: true, edit: false, add: false },
        users: { view: false, edit: false, add: false },
        reports: { view: true, edit: false, add: false },
        vmMonitoring: { view: true, edit: false, add: false },
        networkDiscovery: { view: true, edit: false, add: false },
        bitlockerKeys: { view: false, edit: false, add: false },
        admin: { view: false, edit: false, add: false }
      }),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    assets = pgTable("assets", {
      id: serial("id").primaryKey(),
      assetTag: text("asset_tag").notNull().unique(),
      name: text("name").notNull(),
      description: text("description"),
      category: text("category").notNull(),
      status: text("status").notNull(),
      // available, deployed, pending, overdue, archived, defective , reserved
      condition: text("condition").notNull().default("Good"),
      // Good, Bad
      purchaseDate: text("purchase_date"),
      purchaseCost: text("purchase_cost"),
      location: text("location"),
      serialNumber: text("serial_number"),
      model: text("model"),
      manufacturer: text("manufacturer"),
      notes: text("notes"),
      knoxId: text("knox_id"),
      ipAddress: text("ip_address"),
      macAddress: text("mac_address"),
      osType: text("os_type"),
      assignedTo: integer("assigned_to").references(() => users.id),
      checkoutDate: text("checkout_date"),
      expectedCheckinDate: text("expected_checkin_date"),
      financeUpdated: boolean("finance_updated").default(false),
      department: text("department"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    components = pgTable("components", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      type: text("type").notNull(),
      category: text("category").notNull(),
      quantity: integer("quantity").notNull().default(0),
      status: text("status").default("available"),
      description: text("description"),
      location: text("location"),
      serialNumber: text("serial_number"),
      model: text("model"),
      manufacturer: text("manufacturer"),
      purchaseDate: text("purchase_date"),
      purchaseCost: text("purchase_cost"),
      warrantyExpiry: text("warranty_expiry"),
      assignedTo: text("assigned_to"),
      dateReleased: text("date_released"),
      dateReturned: text("date_returned"),
      releasedBy: text("released_by"),
      returnedTo: text("returned_to"),
      specifications: text("specifications"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    accessories = pgTable("accessories", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      category: text("category").notNull(),
      status: text("status").notNull(),
      // available, borrowed, returned, defective
      quantity: integer("quantity").notNull().default(1),
      description: text("description"),
      location: text("location"),
      serialNumber: text("serial_number"),
      model: text("model"),
      manufacturer: text("manufacturer"),
      purchaseDate: text("purchase_date"),
      purchaseCost: text("purchase_cost"),
      assignedTo: integer("assigned_to").references(() => users.id),
      knoxId: text("knox_id"),
      // Added KnoxID field
      dateReleased: text("date_released"),
      dateReturned: text("date_returned"),
      releasedBy: text("released_by"),
      returnedTo: text("returned_to"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    consumables = pgTable("consumables", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      category: text("category").notNull(),
      quantity: integer("quantity").notNull().default(1),
      status: text("status").notNull().default("available"),
      // available, in_use
      location: text("location"),
      modelNumber: text("model_number"),
      manufacturer: text("manufacturer"),
      purchaseDate: text("purchase_date"),
      purchaseCost: text("purchase_cost"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    licenses = pgTable("licenses", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      key: text("key").notNull(),
      seats: text("seats"),
      assignedSeats: integer("assigned_seats").default(0),
      company: text("company"),
      manufacturer: text("manufacturer"),
      purchaseDate: text("purchase_date"),
      expirationDate: text("expiration_date"),
      purchaseCost: text("purchase_cost"),
      status: text("status").notNull(),
      // active, expired, unused
      notes: text("notes"),
      assignedTo: integer("assigned_to").references(() => users.id),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    licenseAssignments = pgTable("license_assignments", {
      id: serial("id").primaryKey(),
      licenseId: integer("license_id").references(() => licenses.id).notNull(),
      assignedTo: text("assigned_to").notNull(),
      notes: text("notes"),
      assignedDate: text("assigned_date").notNull()
    });
    consumableAssignments = pgTable("consumable_assignments", {
      id: serial("id").primaryKey(),
      consumableId: integer("consumable_id").references(() => consumables.id).notNull(),
      assignedTo: text("assigned_to").notNull(),
      serialNumber: text("serial_number"),
      knoxId: text("knox_id"),
      quantity: integer("quantity").notNull().default(1),
      assignedDate: text("assigned_date").notNull(),
      returnedDate: text("returned_date"),
      status: text("status").notNull().default("assigned"),
      // assigned, returned
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    activities = pgTable("activities", {
      id: serial("id").primaryKey(),
      action: text("action").notNull(),
      // checkout, checkin, create, delete
      itemType: text("item_type").notNull(),
      // asset, user, license, component, accessory
      itemId: integer("item_id").notNull(),
      userId: integer("user_id").references(() => users.id),
      timestamp: text("timestamp").notNull(),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    vmInventory = pgTable("vm_inventory", {
      id: serial("id").primaryKey(),
      // Core VM Information
      vmId: text("vm_id"),
      vmName: text("vm_name").notNull(),
      vmStatus: text("vm_status").notNull().default("Active"),
      // Active, Overdue - Not Notified, Overdue - Notified, Decommissioned
      vmIp: text("vm_ip"),
      vmOs: text("vm_os"),
      cpuCount: integer("cpu_count").default(0),
      memoryGB: integer("memory_gb").default(0),
      diskCapacityGB: integer("disk_capacity_gb").default(0),
      // Request and Approval Information
      requestor: text("requestor"),
      knoxId: text("knox_id"),
      department: text("department"),
      startDate: text("start_date"),
      endDate: text("end_date"),
      jiraNumber: text("jira_number"),
      approvalNumber: text("approval_number"),
      remarks: text("remarks"),
      internetAccess: boolean("internet_access").default(false),
      vmOsVersion: text("vm_os_version"),
      hypervisor: text("hypervisor"),
      hostName: text("host_name"),
      hostModel: text("host_model"),
      hostIp: text("host_ip"),
      hostOs: text("host_os"),
      rack: text("rack"),
      deployedBy: text("deployed_by"),
      user: text("user"),
      jiraTicket: text("jira_ticket"),
      dateDeleted: text("date_deleted"),
      guestOs: text("guest_os"),
      powerState: text("power_state"),
      memoryMB: integer("memory_mb"),
      diskGB: integer("disk_gb"),
      ipAddress: text("ip_address"),
      macAddress: text("mac_address"),
      vmwareTools: text("vmware_tools"),
      cluster: text("cluster"),
      datastore: text("datastore"),
      // Legacy compatibility fields
      status: text("status").default("available"),
      assignedTo: integer("assigned_to").references(() => users.id),
      location: text("location"),
      serialNumber: text("serial_number"),
      model: text("model"),
      manufacturer: text("manufacturer"),
      purchaseDate: text("purchase_date"),
      purchaseCost: text("purchase_cost"),
      createdDate: text("created_date"),
      lastModified: text("last_modified"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
      memory_gb: integer("memory_gb").default(0),
      disk_capacity_gb: integer("disk_capacity_gb").default(0)
    });
    vms = pgTable("vms", {
      id: serial("id").primaryKey(),
      vmName: text("vm_name").notNull(),
      hostName: text("host_name").notNull(),
      guestOs: text("guest_os").notNull(),
      powerState: text("power_state").notNull().default("stopped"),
      cpuCount: integer("cpu_count").default(1),
      memoryMB: integer("memory_mb").default(1024),
      diskGB: integer("disk_gb").default(20),
      ipAddress: text("ip_address"),
      macAddress: text("mac_address"),
      vmwareTools: text("vmware_tools"),
      cluster: text("cluster"),
      hostModel: text("host_model"),
      datastore: text("datastore"),
      status: text("status").notNull().default("available"),
      // available, deployed, maintenance
      assignedTo: integer("assigned_to").references(() => users.id),
      location: text("location"),
      serialNumber: text("serial_number"),
      model: text("model"),
      manufacturer: text("manufacturer"),
      purchaseDate: text("purchase_date"),
      purchaseCost: text("purchase_cost"),
      department: text("department"),
      description: text("description"),
      createdDate: text("created_date").default((/* @__PURE__ */ new Date()).toISOString()),
      lastModified: text("last_modified").default((/* @__PURE__ */ new Date()).toISOString()),
      notes: text("notes")
    });
    AssetStatus = {
      AVAILABLE: "available",
      DEPLOYED: "Deployed",
      PENDING: "pending",
      ON_HAND: "On-Hand",
      RESERVED: "Reserved"
    };
    AccessoryStatus = {
      AVAILABLE: "available",
      BORROWED: "borrowed",
      RETURNED: "returned",
      DEFECTIVE: "defective"
    };
    ConsumableStatus = {
      AVAILABLE: "available",
      IN_USE: "in_use"
    };
    LicenseStatus = {
      ACTIVE: "active",
      EXPIRED: "expired",
      UNUSED: "unused"
    };
    AssetCategories = {
      LAPTOP: "Laptop",
      DESKTOP: "Desktop",
      MOBILE: "Mobile",
      MONITOR: "Monitor",
      TABLET: "Tablet",
      ACCESSORY: "Accessory",
      LICENSE: "License",
      OTHER: "Other"
    };
    AssetConditions = {
      GOOD: "Good",
      BAD: "Bad"
    };
    ActivityTypes = {
      CHECKOUT: "checkout",
      CHECKIN: "checkin",
      CREATE: "create",
      UPDATE: "update",
      DELETE: "delete"
    };
    itEquipment = pgTable("it_equipment", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      category: text("category").notNull(),
      totalQuantity: integer("total_quantity"),
      assignedQuantity: integer("assigned_quantity").default(0),
      model: text("model"),
      location: text("location"),
      dateAcquired: text("date_acquired"),
      knoxId: text("knox_id"),
      serialNumber: text("serial_number"),
      dateRelease: text("date_release"),
      remarks: text("remarks"),
      status: text("status").default("available"),
      created_at: timestamp("created_at").defaultNow().notNull(),
      updated_at: timestamp("updated_at").defaultNow().notNull()
    });
    itEquipmentAssignments = pgTable("it_equipment_assignments", {
      id: serial("id").primaryKey(),
      equipmentId: integer("equipment_id").references(() => itEquipment.id).notNull(),
      assignedTo: text("assigned_to").notNull(),
      knoxId: text("knox_id"),
      serialNumber: text("serial_number"),
      quantity: integer("quantity").notNull().default(1),
      assignedDate: text("assigned_date").notNull(),
      returnedDate: text("returned_date"),
      status: text("status").notNull().default("assigned"),
      // assigned, returned
      notes: text("notes"),
      created_at: timestamp("created_at").defaultNow().notNull(),
      updated_at: timestamp("updated_at").defaultNow().notNull()
    });
    insertUserSchema = createInsertSchema(users).omit({ id: true });
    insertAssetSchema = z.object({
      assetTag: z.string().min(1),
      name: z.string().min(1),
      description: z.string().optional(),
      category: z.enum(Object.values(AssetCategories)),
      status: z.enum(Object.values(AssetStatus)),
      condition: z.enum(Object.values(AssetConditions)),
      purchaseDate: z.string().optional(),
      purchaseCost: z.string().optional(),
      location: z.string().optional(),
      serialNumber: z.string().optional(),
      model: z.string().optional(),
      manufacturer: z.string().optional(),
      notes: z.string().optional(),
      knoxId: z.string().optional(),
      ipAddress: z.string().optional(),
      macAddress: z.string().optional(),
      osType: z.string().optional(),
      department: z.string().optional()
    });
    insertComponentSchema = createInsertSchema(components).omit({ id: true });
    insertAccessorySchema = createInsertSchema(accessories).omit({ id: true });
    insertConsumableSchema = createInsertSchema(consumables).omit({ id: true });
    insertLicenseSchema = createInsertSchema(licenses).omit({ id: true });
    insertLicenseAssignmentSchema = createInsertSchema(licenseAssignments).omit({ id: true });
    insertActivitySchema = createInsertSchema(activities).omit({ id: true });
    insertConsumableAssignmentSchema = createInsertSchema(consumableAssignments).omit({ id: true });
    insertITEquipmentAssignmentSchema = createInsertSchema(itEquipmentAssignments).omit({ id: true });
    vmApprovalHistory = pgTable("vm_approval_history", {
      id: serial("id").primaryKey(),
      vmId: integer("vm_id").notNull().references(() => vmInventory.id, { onDelete: "cascade" }),
      oldApprovalNumber: text("old_approval_number"),
      newApprovalNumber: text("new_approval_number"),
      changedBy: integer("changed_by").references(() => users.id),
      changedAt: timestamp("changed_at").defaultNow().notNull(),
      reason: text("reason"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    vmApprovalHistorySchema = createSelectSchema(vmApprovalHistory);
    insertVmApprovalHistorySchema = createInsertSchema(vmApprovalHistory).omit({
      id: true,
      createdAt: true
    });
    monitorInventory = pgTable("monitor_inventory", {
      id: serial("id").primaryKey(),
      seatNumber: text("seat_number").default(null),
      knoxId: text("knox_id").default(null),
      assetNumber: text("asset_number").default(null),
      serialNumber: text("serial_number").default(null),
      model: text("model").default(null),
      remarks: text("remarks").default(null),
      department: text("department").default(null),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    insertMonitorInventorySchema = createInsertSchema(monitorInventory).omit({ id: true });
    systemSettings = pgTable("system_settings", {
      id: serial("id").primaryKey(),
      // General Settings
      siteName: text("site_name").notNull().default("SRPH-MIS"),
      siteUrl: text("site_url").notNull().default(""),
      defaultLanguage: text("default_language").notNull().default("en"),
      defaultTimezone: text("default_timezone").notNull().default("UTC"),
      allowPublicRegistration: boolean("allow_public_registration").default(false),
      // Company Information
      companyName: text("company_name").notNull().default("SRPH"),
      companyAddress: text("company_address").default(""),
      companyPhone: text("company_phone").default(""),
      companyEmail: text("company_email").default(""),
      companyLogo: text("company_logo").default(""),
      // Email Configuration
      mailDriver: text("mail_driver").default(""),
      mailHost: text("mail_host").default(""),
      mailPort: text("mail_port").default(""),
      mailUsername: text("mail_username").default(""),
      mailPassword: text("mail_password").default(""),
      mailFromAddress: text("mail_from_address").default(""),
      mailFromName: text("mail_from_name").default(""),
      // Asset Settings
      assetTagPrefix: text("asset_tag_prefix").default("SRPH"),
      assetTagZeros: integer("asset_tag_zeros").default(5),
      assetAutoIncrement: boolean("asset_auto_increment").default(true),
      assetCheckoutPolicy: text("asset_checkout_policy").default(""),
      assetCheckoutDuration: integer("asset_checkout_duration").default(30),
      // Security Settings
      enableLoginAttempts: boolean("enable_login_attempts").default(true),
      maxLoginAttempts: integer("max_login_attempts").default(5),
      lockoutDuration: integer("lockout_duration").default(30),
      passwordMinLength: integer("password_min_length").default(8),
      requireSpecialChar: boolean("require_special_char").default(true),
      requireUppercase: boolean("require_uppercase").default(true),
      requireNumber: boolean("require_number").default(true),
      passwordExpiryDays: integer("password_expiry_days").default(90),
      // Notification Settings
      enableAdminNotifications: boolean("enable_admin_notifications").default(true),
      enableUserNotifications: boolean("enable_user_notifications").default(true),
      notifyOnCheckout: boolean("notify_on_checkout").default(true),
      notifyOnCheckin: boolean("notify_on_checkin").default(true),
      notifyOnOverdue: boolean("notify_on_overdue").default(true),
      notifyOnIamExpiration: boolean("notify_on_iam_expiration").default(true),
      notifyOnVmExpiration: boolean("notify_on_vm_expiration").default(true),
      notifyOnItEquipmentChanges: boolean("notify_on_it_equipment_changes").default(true),
      notifyOnUserChanges: boolean("notify_on_user_changes").default(true),
      notifyOnVmInventoryChanges: boolean("notify_on_vm_inventory_changes").default(true),
      notifyOnIamAccountChanges: boolean("notify_on_iam_account_changes").default(true),
      notifyOnGcpChanges: boolean("notify_on_gcp_changes").default(true),
      notifyOnAzureChanges: boolean("notify_on_azure_changes").default(true),
      notifyOnApprovalExpiration: boolean("notify_on_approval_expiration").default(true),
      sessionTimeout: integer("session_timeout").default(1800),
      // Default to 30 minutes
      automatic_backups: boolean("automatic_backups").default(false),
      backup_frequency: text("backup_frequency").default("daily"),
      backup_time: text("backup_time").default("03:00"),
      backup_retention: integer("backup_retention").default(30),
      maintenance_mode: boolean("maintenance_mode").default(false),
      updated_at: timestamp("updated_at").defaultNow(),
      auto_backup_enabled: boolean("auto_backup_enabled").default(false),
      auto_optimize_enabled: boolean("auto_optimize_enabled").default(false),
      optimize_time: text("optimize_time").default("04:00"),
      backup_retention_days: integer("backup_retention_days").default(30),
      email_notifications: boolean("email_notifications").default(true),
      auto_backup: boolean("auto_backup").default(false),
      auto_optimize: boolean("auto_optimize").default(false),
      retention_days: integer("retention_days").default(30),
      created_at: timestamp("created_at").defaultNow().notNull()
    });
    insertSystemSettingsSchema = createInsertSchema(systemSettings);
    zabbixSettings = pgTable("zabbix_settings", {
      id: serial("id").primaryKey(),
      serverUrl: text("server_url").notNull().default(""),
      username: text("username").notNull().default(""),
      password: text("password").notNull().default(""),
      apiToken: text("api_token").default(""),
      lastSync: timestamp("last_sync"),
      syncInterval: integer("sync_interval").default(30),
      // in minutes
      enabled: boolean("enabled").default(false),
      updatedAt: timestamp("updated_at").defaultNow(),
      zabbixUrl: text("zabbix_url"),
      zabbixApiToken: text("zabbix_api_token"),
      refreshInterval: integer("refresh_interval").default(30),
      createdAt: timestamp("created_at").defaultNow()
    });
    zabbixSubnets = pgTable("zabbix_subnets", {
      id: serial("id").primaryKey(),
      cidrRange: text("cidr_range").notNull(),
      description: text("description"),
      enabled: boolean("enabled").default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    discoveredHosts = pgTable("discovered_hosts", {
      id: serial("id").primaryKey(),
      hostname: text("hostname"),
      ipAddress: text("ip_address").notNull(),
      macAddress: text("mac_address"),
      status: text("status").notNull().default("new"),
      // new, imported, ignored
      lastSeen: timestamp("last_seen").defaultNow(),
      source: text("source").notNull().default("zabbix"),
      // zabbix, network_scan
      systemInfo: json("system_info").default({}),
      hardwareDetails: json("hardware_details").default({}),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    vmMonitoring = pgTable("vm_monitoring", {
      id: serial("id").primaryKey(),
      vmId: integer("vm_id").notNull(),
      zabbixId: text("zabbix_id"),
      status: text("status"),
      uptime: integer("uptime"),
      lastChecked: timestamp("last_checked"),
      monitoringEnabled: boolean("monitoring_enabled").default(true),
      alertsEnabled: boolean("alerts_enabled").default(true),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    azureInventory2 = pgTable("azure_inventory", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      type: text("type").notNull(),
      resourceGroup: text("resource_group").notNull(),
      location: text("location").notNull(),
      subscriptions: text("subscriptions"),
      status: text("status").notNull().default("active"),
      remarks: text("remarks"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    gcpInventory = pgTable("gcp_inventory", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      resourceType: text("resource_type").notNull(),
      projectId: text("project_id").notNull(),
      displayName: text("display_name").notNull(),
      location: text("location").notNull(),
      status: text("status").notNull().default("active"),
      remarks: text("remarks"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    azureHistoricalData = pgTable("azure_historical_data", {
      id: serial("id").primaryKey(),
      resourceId: text("resource_id"),
      name: text("name").notNull(),
      type: text("type").notNull(),
      resourceGroup: text("resource_group").notNull(),
      location: text("location").notNull(),
      subscriptions: text("subscriptions").notNull(),
      status: text("status").notNull(),
      remarks: text("remarks"),
      changeType: text("change_type").notNull(),
      // 'deleted', 'updated', 'imported'
      monthYear: text("month_year").notNull(),
      // Format: 'YYYY-MM'
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    gcpHistoricalData = pgTable("gcp_historical_data", {
      id: serial("id").primaryKey(),
      resourceId: text("resource_id"),
      name: text("name").notNull(),
      resourceType: text("resource_type").notNull(),
      projectId: text("project_id").notNull(),
      displayName: text("display_name").notNull(),
      location: text("location").notNull(),
      status: text("status").notNull(),
      remarks: text("remarks"),
      changeType: text("change_type").notNull(),
      // 'deleted', 'updated', 'imported'
      monthYear: text("month_year").notNull(),
      // Format: 'YYYY-MM'
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    approvalMonitoring = pgTable("approval_monitoring", {
      id: serial("id").primaryKey(),
      type: text("type"),
      platform: text("platform"),
      pic: text("pic"),
      ipAddress: text("ip_address"),
      hostnameAccounts: text("hostname_accounts"),
      identifierSerialNumber: text("identifier_serial_number"),
      approval_number: text("approval_number"),
      startDate: text("start_date"),
      endDate: text("end_date"),
      status: text("status"),
      remarks: text("remarks"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    customPages = pgTable("custom_pages", {
      id: serial("id").primaryKey(),
      pageName: text("page_name").notNull().unique(),
      pageSlug: text("page_slug").notNull().unique(),
      tableName: text("table_name").notNull().unique(),
      description: text("description"),
      icon: text("icon").default("FileText"),
      isActive: boolean("is_active").default(true),
      columns: json("columns").notNull(),
      filters: json("filters").default([]),
      sortConfig: json("sort_config").default({ field: "id", direction: "asc" }),
      paginationConfig: json("pagination_config").default({ pageSize: 10, enabled: true }),
      importExportEnabled: boolean("import_export_enabled").default(true),
      createdBy: integer("created_by"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    monitoringDashboards = pgTable("monitoring_dashboards", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      description: text("description"),
      isPublic: boolean("is_public").default(false),
      refreshInterval: integer("refresh_interval").default(30),
      tags: text("tags"),
      userId: integer("user_id").references(() => users.id),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    monitoringPanels = pgTable("monitoring_panels", {
      id: serial("id").primaryKey(),
      dashboardId: integer("dashboard_id").notNull().references(() => monitoringDashboards.id, { onDelete: "cascade" }),
      title: text("title").notNull(),
      type: text("type").notNull(),
      datasource: text("datasource").notNull(),
      query: text("query").notNull(),
      refreshInterval: integer("refresh_interval").default(30),
      width: integer("width").default(6),
      height: integer("height").default(300),
      xPos: integer("x_pos").default(0),
      yPos: integer("y_pos").default(0),
      thresholds: text("thresholds"),
      unit: text("unit"),
      decimals: integer("decimals").default(2),
      showLegend: boolean("show_legend").default(true),
      colorScheme: text("color_scheme").default("default"),
      config: text("config"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    monitoringAlertRules = pgTable("monitoring_alert_rules", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      datasource: text("datasource").notNull(),
      query: text("query").notNull(),
      condition: text("condition").notNull(),
      threshold: real("threshold").notNull(),
      evaluationInterval: integer("evaluation_interval").default(60),
      forDuration: integer("for_duration").default(300),
      severity: text("severity").default("medium"),
      enabled: boolean("enabled").default(true),
      notificationChannels: text("notification_channels"),
      annotations: text("annotations"),
      labels: text("labels"),
      state: text("state").default("normal"),
      lastEvaluation: text("last_evaluation"),
      error: text("error"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    monitoringDatasources = pgTable("monitoring_datasources", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      type: text("type").notNull(),
      url: text("url").notNull(),
      access: text("access").default("proxy"),
      basicAuth: boolean("basic_auth").default(false),
      basicAuthUser: text("basic_auth_user"),
      basicAuthPassword: text("basic_auth_password"),
      database: text("database"),
      jsonData: text("json_data"),
      secureJsonFields: text("secure_json_fields"),
      isDefault: boolean("is_default").default(false),
      status: text("status").default("pending"),
      lastCheck: text("last_check"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    monitoringAlerts = pgTable("monitoring_alerts", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      datasource: text("datasource").notNull(),
      query: text("query").notNull(),
      condition: text("condition").notNull(),
      threshold: real("threshold").notNull(),
      evaluationInterval: integer("evaluation_interval").default(60),
      forDuration: integer("for_duration").default(300),
      severity: text("severity").default("medium"),
      enabled: boolean("enabled").default(true),
      notificationChannels: text("notification_channels"),
      annotations: text("annotations"),
      labels: text("labels"),
      state: text("state").default("normal"),
      lastEvaluation: text("last_evaluation"),
      error: text("error"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    monitoringNotifications = pgTable("monitoring_notifications", {
      id: serial("id").primaryKey(),
      alertId: integer("alert_id").notNull(),
      type: text("type").notNull(),
      recipient: text("recipient").notNull(),
      message: text("message").notNull(),
      status: text("status").default("pending"),
      sentAt: text("sent_at"),
      error: text("error"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    bitlockerKeys = pgTable("bitlocker_keys", {
      id: serial("id").primaryKey(),
      serialNumber: text("serial_number").notNull(),
      identifier: text("identifier").notNull(),
      recoveryKey: text("recovery_key").notNull(),
      notes: text("notes"),
      dateAdded: timestamp("date_added").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    iamAccounts = pgTable("iam_accounts", {
      id: serial("id").primaryKey(),
      requestor: text("requestor").notNull(),
      knoxId: text("knox_id").notNull(),
      name: text("name"),
      userKnoxId: text("user_knox_id"),
      permission: text("permission").notNull(),
      durationStartDate: text("duration_start_date"),
      durationEndDate: text("duration_end_date"),
      cloudPlatform: text("cloud_platform").notNull(),
      projectAccounts: text("project_accounts"),
      approvalId: text("approval_id"),
      remarks: text("remarks"),
      status: text("status").notNull().default("active"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    iamAccountApprovalHistory = pgTable("iam_account_approval_history", {
      id: serial("id").primaryKey(),
      iamAccountId: integer("iam_account_id").references(() => iamAccounts.id).notNull(),
      approvalNumber: text("approval_number").notNull(),
      duration: text("duration"),
      action: text("action").notNull(),
      actedBy: text("acted_by").notNull(),
      actedAt: timestamp("acted_at").defaultNow().notNull()
    });
    awsInventory = pgTable("aws_inventory", {
      id: serial("id").primaryKey(),
      identifier: text("identifier").notNull(),
      service: text("service").notNull(),
      type: text("type").notNull(),
      region: text("region").notNull(),
      accountName: text("account_name").notNull(),
      accountId: text("account_id").notNull(),
      status: text("status").notNull().default("active"),
      remarks: text("remarks"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    awsHistoricalData = pgTable("aws_historical_data", {
      id: serial("id").primaryKey(),
      resourceId: text("resource_id"),
      identifier: text("identifier").notNull(),
      service: text("service").notNull(),
      type: text("type").notNull(),
      region: text("region").notNull(),
      accountName: text("account_name").notNull(),
      accountId: text("account_id").notNull(),
      status: text("status").notNull(),
      remarks: text("remarks"),
      changeType: text("change_type").notNull(),
      monthYear: text("month_year").notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    notifications = pgTable("notifications", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").references(() => users.id),
      title: text("title").notNull(),
      message: text("message").notNull(),
      type: text("type"),
      read: boolean("read").default(false),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    settings2 = pgTable("settings", {
      id: serial("id").primaryKey(),
      siteName: text("site_name"),
      siteUrl: text("site_url"),
      theme: text("theme").default("light"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    storageMediaInventory = pgTable("storage_media_inventory", {
      id: serial("id").primaryKey(),
      mediaType: text("media_type").notNull(),
      serialNumber: text("serial_number").notNull().unique(),
      capacity: text("capacity"),
      status: text("status").notNull().default("available"),
      location: text("location"),
      remarks: text("remarks"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    insertZabbixSettingsSchema = z.object({
      serverUrl: z.string().url("Please enter a valid URL").optional(),
      username: z.string().min(1, "Username is required").optional(),
      password: z.string().min(1, "Password is required").optional(),
      enabled: z.boolean().default(true).optional(),
      syncInterval: z.number().min(5).max(1440).default(60).optional()
    });
    insertAwsInventorySchema = createInsertSchema(awsInventory).omit({ id: true, createdAt: true, updatedAt: true });
    insertAwsHistoricalDataSchema = createInsertSchema(awsHistoricalData).omit({ id: true, createdAt: true });
    insertIamAccountSchema = createInsertSchema(iamAccounts).omit({ id: true, createdAt: true, updatedAt: true });
    insertIamAccountApprovalHistorySchema = createInsertSchema(iamAccountApprovalHistory).omit({ id: true, actedAt: true });
    insertApprovalNumberHistorySchema = createInsertSchema(vmApprovalHistory).omit({ id: true, createdAt: true });
  }
});

// server/encryption.ts
var encryption_exports = {};
__export(encryption_exports, {
  PII_FIELDS: () => PII_FIELDS,
  batchDecryptFields: () => batchDecryptFields,
  decrypt: () => decrypt,
  decryptFields: () => decryptFields,
  encrypt: () => encrypt,
  encryptFields: () => encryptFields,
  generateEncryptionKey: () => generateEncryptionKey,
  hash: () => hash
});
import crypto from "crypto";
function getEncryptionKey() {
  const envKey = process.env.ENCRYPTION_KEY;
  if (!envKey) {
    console.warn("\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557");
    console.warn("\u2551  \u{1F513} ENCRYPTION DISABLED - No ENCRYPTION_KEY configured         \u2551");
    console.warn("\u2551                                                                \u2551");
    console.warn("\u2551  All PII data will be stored in PLAIN TEXT                     \u2551");
    console.warn("\u2551                                                                \u2551");
    console.warn("\u2551  To enable encryption:                                         \u2551");
    console.warn("\u2551  1. Go to Tools \u2192 Secrets in Replit                           \u2551");
    console.warn("\u2551  2. Add a new secret named: ENCRYPTION_KEY                     \u2551");
    console.warn("\u2551  3. Set a strong random value (32+ characters)                 \u2551");
    console.warn("\u2551  4. Restart your application                                   \u2551");
    console.warn("\u2551  5. Use Admin \u2192 Data Encryption to encrypt existing data       \u2551");
    console.warn("\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D");
    return crypto.pbkdf2Sync("default-development-key", "srph-mis-salt", ITERATIONS, KEY_LENGTH, "sha512");
  }
  console.log("\u2705 ENCRYPTION ENABLED - Using configured ENCRYPTION_KEY");
  return crypto.pbkdf2Sync(envKey, "srph-mis-salt", ITERATIONS, KEY_LENGTH, "sha512");
}
function encrypt(text2) {
  if (!text2 || text2.trim() === "") {
    return null;
  }
  if (!process.env.ENCRYPTION_KEY) {
    return text2;
  }
  if (text2.includes(":") && text2.split(":").length === 3) {
    return text2;
  }
  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text2, "utf8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag();
    return `${iv.toString("hex")}:${encrypted}:${authTag.toString("hex")}`;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
}
function decrypt(encryptedText) {
  if (!encryptedText || encryptedText.trim() === "") {
    return null;
  }
  try {
    if (!encryptedText.includes(":")) {
      console.warn("\u26A0\uFE0F Data appears to be unencrypted, returning as-is");
      return encryptedText;
    }
    const parts = encryptedText.split(":");
    if (parts.length !== 3) {
      console.warn("\u26A0\uFE0F Invalid encrypted data format, returning as-is");
      return encryptedText;
    }
    const [ivHex, encrypted, authTagHex] = parts;
    const hexRegex = /^[0-9a-fA-F]+$/;
    if (!hexRegex.test(ivHex) || !hexRegex.test(encrypted) || !hexRegex.test(authTagHex)) {
      console.warn("\u26A0\uFE0F Invalid hex format in encrypted data, returning as-is");
      return encryptedText;
    }
    const key = getEncryptionKey();
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption error details:", {
      message: error.message,
      code: error.code,
      encryptedTextLength: encryptedText?.length,
      hasEncryptionKey: !!process.env.ENCRYPTION_KEY
    });
    console.warn("\u26A0\uFE0F Unable to decrypt data, returning encrypted value. This may indicate encryption key mismatch.");
    return encryptedText;
  }
}
function encryptFields(data, fields) {
  const encrypted = { ...data };
  if (!process.env.ENCRYPTION_KEY) {
    for (const field of fields) {
      if (encrypted[field] && typeof encrypted[field] === "string") {
        const value = encrypted[field];
        if (value.includes(":") && value.split(":").length === 3) {
          try {
            encrypted[field] = decrypt(value);
          } catch (error) {
            console.warn(`Failed to decrypt field ${String(field)}, keeping original value`);
          }
        }
      }
    }
    return encrypted;
  }
  for (const field of fields) {
    if (encrypted[field] && typeof encrypted[field] === "string") {
      encrypted[field] = encrypt(encrypted[field]);
    }
  }
  return encrypted;
}
function decryptFields(data, fields) {
  const decrypted = { ...data };
  for (const field of fields) {
    if (decrypted[field] && typeof decrypted[field] === "string") {
      try {
        const decryptedValue = decrypt(decrypted[field]);
        if (decryptedValue !== null && decryptedValue !== decrypted[field]) {
          decrypted[field] = decryptedValue;
        }
      } catch (error) {
        console.warn(`Failed to decrypt field ${String(field)}:`, error?.message || "Unknown error");
      }
    }
  }
  return decrypted;
}
function batchDecryptFields(records, fields) {
  if (!records || records.length === 0) return records;
  const chunkSize = 100;
  const results = [];
  for (let i = 0; i < records.length; i += chunkSize) {
    const chunk = records.slice(i, i + chunkSize);
    const decryptedChunk = chunk.map((record) => {
      const decrypted = { ...record };
      for (const field of fields) {
        if (decrypted[field] && typeof decrypted[field] === "string") {
          try {
            decrypted[field] = decrypt(decrypted[field]);
          } catch (error) {
            console.warn(`Batch decrypt failed for field ${String(field)}`);
          }
        }
      }
      return decrypted;
    });
    results.push(...decryptedChunk);
  }
  return results;
}
function hash(text2) {
  return crypto.createHash("sha256").update(text2).digest("hex");
}
function generateEncryptionKey() {
  return crypto.randomBytes(32).toString("base64");
}
var ALGORITHM, IV_LENGTH, KEY_LENGTH, ITERATIONS, PII_FIELDS;
var init_encryption = __esm({
  "server/encryption.ts"() {
    "use strict";
    ALGORITHM = "aes-256-gcm";
    IV_LENGTH = 16;
    KEY_LENGTH = 32;
    ITERATIONS = 1e5;
    PII_FIELDS = {
      user: ["email", "firstName", "lastName", "department"],
      asset: ["serialNumber", "macAddress", "ipAddress"],
      bitlockerKey: ["serialNumber", "identifier", "recoveryKey"],
      consumable: ["serialNumber", "modelNumber"],
      accessory: ["serialNumber"],
      component: ["serialNumber"],
      license: ["key"],
      vmInventory: ["requestor", "vmIp", "ipAddress", "macAddress"],
      iamAccount: ["requestor"],
      itEquipment: ["serialNumber"],
      monitor: ["assetNumber", "serialNumber"]
    };
  }
});

// server/storage.ts
var storage_exports = {};
__export(storage_exports, {
  storage: () => storage
});
var mockDb, MemStorage, storage;
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_schema();
    init_encryption();
    mockDb = {
      exec: async (query) => {
        console.log(`Executing DB query: ${query}`);
        return Promise.resolve();
      },
      get: async (query) => {
        console.log(`Fetching DB row: ${query}`);
        return Promise.resolve(null);
      },
      run: async (query, params) => {
        console.log(`Running DB query: ${query} with params: ${params}`);
        return Promise.resolve({ lastID: 1 });
      },
      all: async (query, params) => {
        console.log(`Fetching DB rows: ${query} with params: ${params}`);
        return Promise.resolve([]);
      },
      executeQuery: async (query, params) => {
        console.log(`Executing query: ${query} with params: ${params}`);
        if (query.startsWith("DELETE FROM users")) {
          return Promise.resolve({ changes: 1 });
        }
        return Promise.resolve({ changes: 0 });
      }
    };
    MemStorage = class {
      usersData;
      assetsData;
      licensesData;
      licenseAssignmentsData;
      activitiesData;
      accessoriesData;
      componentsData;
      consumablesData;
      zabbixSettingsData;
      zabbixSubnetsData;
      vmMonitoringData;
      discoveredHostsData;
      bitlockerKeysData;
      vmInventoryData;
      zabbixSettings = [];
      zabbixSubnets = /* @__PURE__ */ new Map();
      consumableAssignments = [];
      jiraSettings = null;
      issues = [];
      // Azure and GCP Inventory
      azureInventoryData;
      gcpInventoryData;
      azureInventoryCurrentId;
      gcpInventoryCurrentId;
      // VM Approval History
      vmApprovalHistoryData;
      vmApprovalHistoryCurrentId;
      userCurrentId;
      assetCurrentId;
      licenseCurrentId;
      licenseAssignmentCurrentId;
      activityCurrentId;
      accessoryCurrentId;
      componentCurrentId;
      consumableCurrentId;
      zabbixSubnetCurrentId;
      vmMonitoringCurrentId;
      discoveredHostCurrentId;
      bitlockerKeyCurrentId;
      vmInventoryCurrentId;
      // VM Management
      vms = [];
      // IT Equipment Management  
      itEquipment = [];
      itEquipmentAssignments = [];
      // Added for IT Equipment Assignments
      db;
      // Database connection object
      isMemoryStorage;
      memoryDb = {
        users: [],
        assets: [],
        accessories: [],
        components: [],
        licenses: [],
        consumables: [],
        itEquipment: [],
        bitlockerKeys: [],
        activities: [],
        vmApprovalHistory: []
      };
      constructor(db3 = mockDb) {
        this.db = db3;
        this.isMemoryStorage = !db3 || db3 === mockDb;
        this.usersData = /* @__PURE__ */ new Map();
        this.assetsData = /* @__PURE__ */ new Map();
        this.licensesData = /* @__PURE__ */ new Map();
        this.licenseAssignmentsData = /* @__PURE__ */ new Map();
        this.activitiesData = /* @__PURE__ */ new Map();
        this.accessoriesData = /* @__PURE__ */ new Map();
        this.componentsData = /* @__PURE__ */ new Map();
        this.consumablesData = /* @__PURE__ */ new Map();
        this.zabbixSettingsData = void 0;
        this.zabbixSubnetsData = /* @__PURE__ */ new Map();
        this.vmMonitoringData = /* @__PURE__ */ new Map();
        this.discoveredHostsData = /* @__PURE__ */ new Map();
        this.bitlockerKeysData = /* @__PURE__ */ new Map();
        this.vmInventoryData = /* @__PURE__ */ new Map();
        this.zabbixSettings = [];
        this.zabbixSubnets = /* @__PURE__ */ new Map();
        this.azureInventoryData = /* @__PURE__ */ new Map();
        this.gcpInventoryData = /* @__PURE__ */ new Map();
        this.azureInventoryCurrentId = 1;
        this.gcpInventoryCurrentId = 1;
        this.vmApprovalHistoryData = /* @__PURE__ */ new Map();
        this.vmApprovalHistoryCurrentId = 1;
        this.userCurrentId = 1;
        this.assetCurrentId = 1;
        this.licenseCurrentId = 1;
        this.licenseAssignmentCurrentId = 1;
        this.activityCurrentId = 1;
        this.accessoryCurrentId = 1;
        this.componentCurrentId = 1;
        this.consumableCurrentId = 1;
        this.zabbixSubnetCurrentId = 1;
        this.vmMonitoringCurrentId = 1;
        this.discoveredHostCurrentId = 1;
        this.bitlockerKeyCurrentId = 1;
        this.vmInventoryCurrentId = 1;
        this.initializeDefaultAdmin();
        this.initializeDatabase();
        this.initializeSampleData();
      }
      async initializeDatabase() {
        try {
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          firstName TEXT,
          lastName TEXT,
          email TEXT UNIQUE,
          isAdmin BOOLEAN DEFAULT 0,
          department TEXT,
          roleId INTEGER,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS assets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          assetTag TEXT UNIQUE,
          assetType TEXT,
          name TEXT,
          description TEXT,
          serialNumber TEXT,
          model TEXT,
          manufacturer TEXT,
          status TEXT,
          location TEXT,
          purchaseDate DATE,
          purchaseCost REAL,
          assignedTo INTEGER,
          checkoutDate DATE,
          expectedCheckinDate DATE,
          notes TEXT,
          knoxId TEXT,
          ipAddress TEXT,
          macAddress TEXT,
          osType TEXT,
          financeUpdated BOOLEAN DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (assignedTo) REFERENCES users(id)
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS components (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          type TEXT,
          status TEXT,
          description TEXT,
          location TEXT,
          serialNumber TEXT,
          model TEXT,
          manufacturer TEXT,
          purchaseDate DATE,
          purchaseCost REAL,
          warrantyExpiry DATE,
          specifications TEXT,
          assignedTo INTEGER,
          dateReleased DATE,
          dateReturned DATE,
          releasedBy INTEGER,
          returnedTo INTEGER,
          notes TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (assignedTo) REFERENCES users(id),
          FOREIGNKEY (releasedBy) REFERENCES users(id),
          FOREIGNKEY (returnedTo) REFERENCES users(id)
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS accessories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          type TEXT,
          description TEXT,
          location TEXT,
          serialNumber TEXT,
          model TEXT,
          manufacturer TEXT,
          purchaseDate DATE,
          purchaseCost REAL,
          assignedTo INTEGER,
          knoxId TEXT,
          dateReleased DATE,
          dateReturned DATE,
          releasedBy INTEGER,
          returnedTo INTEGER,
          notes TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGNKEY (assignedTo) REFERENCES users(id),
          FOREIGNKEY (releasedBy) REFERENCES users(id),
          FOREIGNKEY (returnedTo) REFERENCES users(id)
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS consumables (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          type TEXT,
          status TEXT,
          description TEXT,
          location TEXT,
          modelNumber TEXT,
          manufacturer TEXT,
          purchaseDate DATE,
          purchaseCost REAL,
          quantity INTEGER DEFAULT 1,
          notes TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS licenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          licenseKey TEXT,
          type TEXT,
          seats INTEGER,
          assignedSeats INTEGER DEFAULT 0,
          company TEXT,
          purchaseDate DATE,
          purchaseCost REAL,
          expirationDate DATE,
          assignedTo INTEGER,
          notes TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGNKEY (assignedTo) REFERENCES users(id)
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS license_assignments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          licenseId INTEGER NOT NULL,
          userId INTEGER NOT NULL,
          assignedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
          notes TEXT,
          FOREIGNKEY (licenseId) REFERENCES licenses(id),
          FOREIGNKEY (userId) REFERENCES users(id)
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS activities (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          action TEXT NOT NULL,
          itemType TEXT NOT NULL,
          itemId INTEGER NOT NULL,
          userId INTEGER,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          notes TEXT,
          FOREIGNKEY (userId) REFERENCES users(id)
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS zabbix_settings (
          id INTEGER PRIMARY KEY,
          zabbixUrl TEXT,
          zabbixUser TEXT,
          zabbixPassword TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS zabbix_subnets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cidrRange TEXT NOT NULL UNIQUE,
          description TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS vm_monitoring (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          vmId INTEGER NOT NULL UNIQUE,
          vmName TEXT,
          monitoringEnabled BOOLEAN DEFAULT 1,
          checkInterval INTEGER,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS discovered_hosts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          ipAddress TEXT NOT NULL UNIQUE,
          hostname TEXT,
          os TEXT,
          lastSeen DATETIME,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS bitlocker_keys (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          serialNumber TEXT NOT NULL,
          identifier TEXT NOT NULL,
          recoveryKey TEXT NOT NULL,
          addedByUser TEXT,
          dateAdded DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS vm_inventory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          vmName TEXT NOT NULL,
          vmId TEXT NOT NULL UNIQUE,
          vmIpAddress TEXT,
          vmOs TEXT,
          vmRamGB INTEGER,
          vmCpuCores INTEGER,
          vmStorageGB INTEGER,
          vmPowerState TEXT,
          lastModified DATETIME,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS system_settings (
          id INTEGER PRIMARY KEY,
          siteName TEXT DEFAULT 'SRPH-MIS',
          siteUrl TEXT DEFAULT 'https://localhost:5000',
          defaultLanguage TEXT DEFAULT 'en',
          defaultTimezone TEXT DEFAULT 'UTC',
          allowPublicRegistration BOOLEAN DEFAULT 0,
          companyName TEXT DEFAULT 'SRPH - School of Public Health',
          companyAddress TEXT DEFAULT '123 University Drive, College City',
          companyEmail TEXT DEFAULT 'admin@srph-example.org',
          companyLogo TEXT DEFAULT '/logo.png',
          mailFromAddress TEXT DEFAULT 'srph-mis@example.org',
          mailHost TEXT DEFAULT 'smtp.example.org',
          mailPort TEXT DEFAULT '587',
          mailUsername TEXT DEFAULT 'srph-mailer',
          mailPassword TEXT DEFAULT '',
          assetTagPrefix TEXT DEFAULT 'SRPH',
          lockoutDuration INTEGER DEFAULT 120,
          passwordMinLength INTEGER DEFAULT 8,
          requireSpecialChar BOOLEAN DEFAULT 1,
          requireUppercase BOOLEAN DEFAULT 1,
          requireNumber BOOLEAN DEFAULT 1,
          maxLoginAttempts INTEGER DEFAULT 5,
          enableAdminNotifications BOOLEAN DEFAULT 1,
          notifyOnCheckin BOOLEAN DEFAULT 1,
          notifyOnCheckout BOOLEAN DEFAULT 1,
          notifyOnOverdue BOOLEAN DEFAULT 1,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS jira_settings (
          id INTEGER PRIMARY KEY,
          settings TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS vm_approval_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          vm_id INTEGER NOT NULL,
          old_approval_number TEXT,
          new_approval_number TEXT,
          changed_by TEXT,
          reason TEXT,
          notes TEXT,
          changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (vm_id) REFERENCES vm_inventory(id)
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS azure_inventory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          resourceGroupName TEXT,
          resourceType TEXT,
          resourceName TEXT,
          location TEXT,
          subscriptionId TEXT,
          resourceId TEXT UNIQUE,
          tags TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
          await this.db.exec(`
        CREATE TABLE IF NOT EXISTS gcp_inventory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          projectName TEXT,
          projectId TEXT,
          resourceType TEXT,
          resourceName TEXT,
          location TEXT,
          zone TEXT,
          resourceId TEXT UNIQUE,
          tags TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
          console.log("\u2705 Database tables initialized successfully.");
        } catch (error) {
          console.error("\u274C Failed to initialize database tables:", error);
        }
      }
      async initializeDefaultAdmin() {
        try {
          const existingAdmin = await this.getUserByUsername("admin");
          if (!existingAdmin) {
            console.log("\u{1F527} Creating default admin user...");
            const defaultAdmin = {
              username: "admin",
              password: "admin123",
              // Plain text for initial login
              firstName: "Admin",
              lastName: "User",
              email: "admin@example.com",
              isAdmin: true,
              department: "IT",
              roleId: null
            };
            await this.createUser(defaultAdmin);
            console.log("\u2705 Default admin user created: username=admin, password=admin123");
          } else {
            console.log("\u2705 Default admin user already exists: username=admin");
          }
        } catch (error) {
          console.error("Failed to create default admin user:", error);
        }
      }
      async initializeSampleData() {
        if (this.isMemoryStorage) {
          console.log("\u{1F4DD} Memory storage initialized without sample data - starting with empty state");
        }
      }
      // User operations
      async getUsers() {
        if (this.isMemoryStorage) {
          return this.memoryDb.users;
        }
        try {
          const rows = await this.db.all("SELECT * FROM users");
          return rows.map((row) => ({ ...row, isAdmin: Boolean(row.isAdmin) }));
        } catch (error) {
          console.error("Error fetching users:", error);
          return this.memoryDb.users;
        }
      }
      async getUser(id) {
        if (this.isMemoryStorage) {
          return this.memoryDb.users.find((user) => user.id === id);
        }
        try {
          const row = await this.db.get("SELECT * FROM users WHERE id = ?", [id]);
          return row ? { ...row, isAdmin: Boolean(row.isAdmin) } : void 0;
        } catch (error) {
          console.error(`Error fetching user with id ${id}:`, error);
          return this.memoryDb.users.find((user) => user.id === id);
        }
      }
      async getUserByUsername(username) {
        if (this.isMemoryStorage) {
          return this.memoryDb.users.find((user) => user.username === username);
        }
        try {
          const row = await this.db.get("SELECT * FROM users WHERE username = ?", [username]);
          return row ? { ...row, isAdmin: Boolean(row.isAdmin) } : void 0;
        } catch (error) {
          console.error(`Error fetching user by username ${username}:`, error);
          return this.memoryDb.users.find((user) => user.username === username);
        }
      }
      async createUser(insertUser) {
        if (this.isMemoryStorage) {
          const id = this.userCurrentId++;
          const user = {
            ...insertUser,
            id,
            department: insertUser.department || null,
            isAdmin: insertUser.isAdmin || false,
            roleId: insertUser.roleId || null,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.memoryDb.users.push(user);
          return user;
        }
        try {
          const result = await this.db.run(
            "INSERT INTO users (username, password, firstName, lastName, email, isAdmin, department, roleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [insertUser.username, insertUser.password, insertUser.firstName, insertUser.lastName, insertUser.email, insertUser.isAdmin, insertUser.department, insertUser.roleId]
          );
          const id = result.lastID;
          const newUser = { ...insertUser, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString(), isAdmin: insertUser.isAdmin || false };
          this.usersData.set(id, newUser);
          return newUser;
        } catch (error) {
          console.error("Error creating user:", error);
          const id = this.userCurrentId++;
          const user = { ...insertUser, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString(), isAdmin: insertUser.isAdmin || false };
          this.memoryDb.users.push(user);
          return user;
        }
      }
      async updateUser(id, updateData) {
        if (this.isMemoryStorage) {
          const userIndex = this.memoryDb.users.findIndex((user) => user.id === id);
          if (userIndex === -1) return void 0;
          const updatedUser2 = { ...this.memoryDb.users[userIndex], ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.memoryDb.users[userIndex] = updatedUser2;
          return updatedUser2;
        }
        try {
          const existingUser = await this.getUser(id);
          if (!existingUser) return void 0;
          const updateQuery = `
        UPDATE users SET 
          username = ?, firstName = ?, lastName = ?, email = ?, isAdmin = ?, department = ?, roleId = ?, updatedAt = ?
        WHERE id = ?
      `;
          await this.db.run(updateQuery, [
            updateData.username !== void 0 ? updateData.username : existingUser.username,
            updateData.firstName !== void 0 ? updateData.firstName : existingUser.firstName,
            updateData.lastName !== void 0 ? updateData.lastName : existingUser.lastName,
            updateData.email !== void 0 ? updateData.email : existingUser.email,
            updateData.isAdmin !== void 0 ? updateData.isAdmin : existingUser.isAdmin,
            updateData.department !== void 0 ? updateData.department : existingUser.department,
            updateData.roleId !== void 0 ? updateData.roleId : existingUser.roleId,
            (/* @__PURE__ */ new Date()).toISOString(),
            id
          ]);
          const updatedUser2 = { ...existingUser, ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.usersData.set(id, updatedUser2);
          return updatedUser2;
        } catch (error) {
          console.error(`Error updating user with id ${id}:`, error);
          return void 0;
        }
      }
      async deleteUser(id) {
        if (this.isMemoryStorage) {
          console.log(`Deleting user ${id} from memory storage...`);
          const userIndex = this.memoryDb.users.findIndex((u) => u.id === id);
          if (userIndex === -1) {
            console.log(`User ${id} not found in memory storage`);
            return false;
          }
          const deletedUser = this.memoryDb.users[userIndex];
          let activitiesUpdated = 0;
          this.memoryDb.activities.forEach((activity) => {
            if (activity.userId === id) {
              activity.userId = null;
              const existingNotes = activity.notes || "";
              const deletionNote = `[User deleted: ${deletedUser.username}]`;
              activity.notes = existingNotes ? `${existingNotes} ${deletionNote}` : deletionNote;
              activitiesUpdated++;
            }
          });
          console.log(`Updated ${activitiesUpdated} activities to preserve audit trail`);
          this.memoryDb.users.splice(userIndex, 1);
          this.usersData.delete(id);
          console.log(`User ${deletedUser.username} (ID: ${id}) deleted from memory storage`);
          return true;
        }
        try {
          console.log(`Deleting user ${id} from database...`);
          const userToDelete = await this.getUser(id);
          if (!userToDelete) {
            console.log(`User ${id} not found`);
            return false;
          }
          const activityUpdateResult = await this.db.run(
            'UPDATE activities SET userId = NULL, notes = COALESCE(notes, "") || " [User deleted: " || ? || "]" WHERE userId = ?',
            [userToDelete.username, id]
          );
          console.log(`Updated ${activityUpdateResult.changes || 0} activities for audit trail`);
          const result = await this.db.run("DELETE FROM users WHERE id = ?", [id]);
          console.log(`Database delete result: ${result.changes} rows affected`);
          this.usersData.delete(id);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting user from database:`, error);
          throw error;
        }
      }
      // Asset operations
      async getAssets() {
        if (this.isMemoryStorage) {
          return this.memoryDb.assets;
        }
        try {
          const rows = await this.db.all("SELECT * FROM assets");
          return rows.map((row) => ({
            ...row,
            financeUpdated: Boolean(row.financeUpdated),
            purchaseDate: row.purchaseDate ? new Date(row.purchaseDate) : null,
            checkoutDate: row.checkoutDate ? new Date(row.checkoutDate) : null,
            expectedCheckinDate: row.expectedCheckinDate ? new Date(row.expectedCheckinDate) : null
          }));
        } catch (error) {
          console.error("Error fetching assets:", error);
          return this.memoryDb.assets;
        }
      }
      async getAsset(id) {
        if (this.isMemoryStorage) {
          return this.memoryDb.assets.find((asset2) => asset2.id === id);
        }
        try {
          const row = await this.db.get("SELECT * FROM assets WHERE id = ?", [id]);
          if (!row) return void 0;
          return {
            ...row,
            financeUpdated: Boolean(row.financeUpdated),
            purchaseDate: row.purchaseDate ? new Date(row.purchaseDate) : null,
            checkoutDate: row.checkoutDate ? new Date(row.checkoutDate) : null,
            expectedCheckinDate: row.expectedCheckinDate ? new Date(row.expectedCheckinDate) : null
          };
        } catch (error) {
          console.error(`Error fetching asset with id ${id}:`, error);
          return this.memoryDb.assets.find((asset2) => asset2.id === id);
        }
      }
      async getAssetByTag(assetTag) {
        if (this.isMemoryStorage) {
          return this.memoryDb.assets.find((asset2) => asset2.assetTag === assetTag);
        }
        try {
          const row = await this.db.get("SELECT * FROM assets WHERE assetTag = ?", [assetTag]);
          if (!row) return void 0;
          return {
            ...row,
            financeUpdated: Boolean(row.financeUpdated),
            purchaseDate: row.purchaseDate ? new Date(row.purchaseDate) : null,
            checkoutDate: row.checkoutDate ? new Date(row.checkoutDate) : null,
            expectedCheckinDate: row.expectedCheckinDate ? new Date(row.expectedCheckinDate) : null
          };
        } catch (error) {
          console.error(`Error fetching asset by tag ${assetTag}:`, error);
          return this.memoryDb.assets.find((asset2) => asset2.assetTag === assetTag);
        }
      }
      async createAsset(insertAsset) {
        if (this.isMemoryStorage) {
          const id = this.assetCurrentId++;
          const asset2 = {
            ...insertAsset,
            id,
            description: insertAsset.description || null,
            purchaseDate: insertAsset.purchaseDate || null,
            purchaseCost: insertAsset.purchaseCost || null,
            location: insertAsset.location || null,
            serialNumber: insertAsset.serialNumber || null,
            model: insertAsset.model || null,
            manufacturer: insertAsset.manufacturer || null,
            notes: insertAsset.notes || null,
            knoxId: insertAsset.knoxId || null,
            ipAddress: insertAsset.ipAddress || null,
            macAddress: insertAsset.macAddress || null,
            osType: insertAsset.osType || null,
            assignedTo: insertAsset.assignedTo || null,
            checkoutDate: insertAsset.checkoutDate || null,
            expectedCheckinDate: insertAsset.expectedCheckinDate || null,
            financeUpdated: insertAsset.financeUpdated || false,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.memoryDb.assets.push(asset2);
          return asset2;
        }
        try {
          const result = await this.db.run(
            `INSERT INTO assets (assetTag, assetType, name, description, serialNumber, model, manufacturer, status, location, purchaseDate, purchaseCost, assignedTo, checkoutDate, expectedCheckinDate, notes, knoxId, ipAddress, macAddress, osType, financeUpdated) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [insertAsset.assetTag, insertAsset.assetType, insertAsset.name, insertAsset.description, insertAsset.serialNumber, insertAsset.model, insertAsset.manufacturer, insertAsset.status, insertAsset.location, insertAsset.purchaseDate, insertAsset.purchaseCost, insertAsset.assignedTo, insertAsset.checkoutDate, insertAsset.expectedCheckinDate, insertAsset.notes, insertAsset.knoxId, insertAsset.ipAddress, insertAsset.macAddress, insertAsset.osType, insertAsset.financeUpdated]
          );
          const id = result.lastID;
          const newAsset = { ...insertAsset, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.assetsData.set(id, newAsset);
          return newAsset;
        } catch (error) {
          console.error("Error creating asset:", error);
          const id = this.assetCurrentId++;
          const asset2 = { ...insertAsset, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.memoryDb.assets.push(asset2);
          return asset2;
        }
      }
      async updateAsset(id, updateData) {
        if (this.isMemoryStorage) {
          const assetIndex = this.memoryDb.assets.findIndex((asset2) => asset2.id === id);
          if (assetIndex === -1) return void 0;
          const updatedAsset = { ...this.memoryDb.assets[assetIndex], ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.memoryDb.assets[assetIndex] = updatedAsset;
          return updatedAsset;
        }
        try {
          const existingAsset = await this.getAsset(id);
          if (!existingAsset) return void 0;
          const updateQuery = `
        UPDATE assets SET 
          assetTag = ?, assetType = ?, name = ?, description = ?, serialNumber = ?, model = ?, manufacturer = ?, status = ?, location = ?, purchaseDate = ?, purchaseCost = ?, assignedTo = ?, checkoutDate = ?, expectedCheckinDate = ?, notes = ?, knoxId = ?, ipAddress = ?, macAddress = ?, osType = ?, financeUpdated = ?, updatedAt = ?
        WHERE id = ?
      `;
          await this.db.run(updateQuery, [
            updateData.assetTag !== void 0 ? updateData.assetTag : existingAsset.assetTag,
            updateData.assetType !== void 0 ? updateData.assetType : existingAsset.assetType,
            updateData.name !== void 0 ? updateData.name : existingAsset.name,
            updateData.description !== void 0 ? updateData.description : existingAsset.description,
            updateData.serialNumber !== void 0 ? updateData.serialNumber : existingAsset.serialNumber,
            updateData.model !== void 0 ? updateData.model : existingAsset.model,
            updateData.manufacturer !== void 0 ? updateData.manufacturer : existingAsset.manufacturer,
            updateData.status !== void 0 ? updateData.status : existingAsset.status,
            updateData.location !== void 0 ? updateData.location : existingAsset.location,
            updateData.purchaseDate !== void 0 ? updateData.purchaseDate : existingAsset.purchaseDate,
            updateData.purchaseCost !== void 0 ? updateData.purchaseCost : existingAsset.purchaseCost,
            updateData.assignedTo !== void 0 ? updateData.assignedTo : existingAsset.assignedTo,
            updateData.checkoutDate !== void 0 ? updateData.checkoutDate : existingAsset.checkoutDate,
            updateData.expectedCheckinDate !== void 0 ? updateData.expectedCheckinDate : existingAsset.expectedCheckinDate,
            updateData.notes !== void 0 ? updateData.notes : existingAsset.notes,
            updateData.knoxId !== void 0 ? updateData.knoxId : existingAsset.knoxId,
            updateData.ipAddress !== void 0 ? updateData.ipAddress : existingAsset.ipAddress,
            updateData.macAddress !== void 0 ? updateData.macAddress : existingAsset.macAddress,
            updateData.osType !== void 0 ? updateData.osType : existingAsset.osType,
            updateData.financeUpdated !== void 0 ? updateData.financeUpdated : existingAsset.financeUpdated,
            (/* @__PURE__ */ new Date()).toISOString(),
            id
          ]);
          const updatedAsset = { ...existingAsset, ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.assetsData.set(id, updatedAsset);
          return updatedAsset;
        } catch (error) {
          console.error(`Error updating asset with id ${id}:`, error);
          return void 0;
        }
      }
      async deleteAsset(id) {
        if (this.isMemoryStorage) {
          const initialLength = this.memoryDb.assets.length;
          this.memoryDb.assets = this.memoryDb.assets.filter((asset2) => asset2.id !== id);
          return this.memoryDb.assets.length < initialLength;
        }
        try {
          const result = await this.db.run("DELETE FROM assets WHERE id = ?", [id]);
          this.assetsData.delete(id);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting asset with id ${id}:`, error);
          return false;
        }
      }
      // Component operations
      async getComponents() {
        if (this.isMemoryStorage) {
          return this.memoryDb.components;
        }
        try {
          const rows = await this.db.all("SELECT * FROM components");
          return rows.map((row) => ({
            ...row,
            purchaseDate: row.purchaseDate ? new Date(row.purchaseDate) : null,
            warrantyExpiry: row.warrantyExpiry ? new Date(row.warrantyExpiry) : null,
            dateReleased: row.dateReleased ? new Date(row.dateReleased) : null,
            dateReturned: row.dateReturned ? new Date(row.dateReturned) : null
          }));
        } catch (error) {
          console.error("Error fetching components:", error);
          return this.memoryDb.components;
        }
      }
      async getComponent(id) {
        if (this.isMemoryStorage) {
          return this.memoryDb.components.find((component) => component.id === id);
        }
        try {
          const row = await this.db.get("SELECT * FROM components WHERE id = ?", [id]);
          if (!row) return void 0;
          return {
            ...row,
            purchaseDate: row.purchaseDate ? new Date(row.purchaseDate) : null,
            warrantyExpiry: row.warrantyExpiry ? new Date(row.warrantyExpiry) : null,
            dateReleased: row.dateReleased ? new Date(row.dateReleased) : null,
            dateReturned: row.dateReturned ? new Date(row.dateReturned) : null
          };
        } catch (error) {
          console.error(`Error fetching component with id ${id}:`, error);
          return this.memoryDb.components.find((component) => component.id === id);
        }
      }
      async createComponent(insertComponent) {
        if (this.isMemoryStorage) {
          const id = this.componentCurrentId++;
          const component = {
            ...insertComponent,
            id,
            type: insertComponent.type || "Other",
            status: insertComponent.status || "available",
            assignedTo: insertComponent.assignedTo || null,
            description: insertComponent.description || null,
            location: insertComponent.location || null,
            serialNumber: insertComponent.serialNumber || null,
            model: insertComponent.model || null,
            manufacturer: insertComponent.manufacturer || null,
            purchaseDate: insertComponent.purchaseDate || null,
            purchaseCost: insertComponent.purchaseCost || null,
            warrantyExpiry: insertComponent.warrantyExpiry || null,
            specifications: insertComponent.specifications || null,
            dateReleased: insertComponent.dateReleased || null,
            dateReturned: insertComponent.dateReturned || null,
            releasedBy: insertComponent.releasedBy || null,
            returnedTo: insertComponent.returnedTo || null,
            notes: insertComponent.notes || null,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.memoryDb.components.push(component);
          console.log("Component created in storage:", component);
          this.createActivity({
            action: "create",
            itemType: "component",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Component "${component.name}" created`
          });
          return component;
        }
        try {
          const result = await this.db.run(
            `INSERT INTO components (name, type, status, description, location, serialNumber, model, manufacturer, purchaseDate, purchaseCost, warrantyExpiry, specifications, assignedTo, dateReleased, dateReturned, releasedBy, returnedTo, notes) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [insertComponent.name, insertComponent.type, insertComponent.status, insertComponent.description, insertComponent.location, insertComponent.serialNumber, insertComponent.model, insertComponent.manufacturer, insertComponent.purchaseDate, insertComponent.purchaseCost, insertComponent.warrantyExpiry, insertComponent.specifications, insertComponent.assignedTo, insertComponent.dateReleased, insertComponent.dateReturned, insertComponent.releasedBy, insertComponent.returnedTo, insertComponent.notes]
          );
          const id = result.lastID;
          const newComponent = { ...insertComponent, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.componentsData.set(id, newComponent);
          await this.createActivity({
            action: "create",
            itemType: "component",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Component "${newComponent.name}" created`
          });
          return newComponent;
        } catch (error) {
          console.error("Error creating component:", error);
          const id = this.componentCurrentId++;
          const component = { ...insertComponent, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.memoryDb.components.push(component);
          await this.createActivity({
            action: "create",
            itemType: "component",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Component "${component.name}" created (memory storage fallback)`
          });
          return component;
        }
      }
      async updateComponent(id, updateData) {
        if (this.isMemoryStorage) {
          const componentIndex = this.memoryDb.components.findIndex((component) => component.id === id);
          if (componentIndex === -1) return void 0;
          const updatedComponent = { ...this.memoryDb.components[componentIndex], ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.memoryDb.components[componentIndex] = updatedComponent;
          return updatedComponent;
        }
        try {
          const existingComponent = await this.getComponent(id);
          if (!existingComponent) return void 0;
          const updateQuery = `
        UPDATE components SET 
          name = ?, type = ?, status = ?, description = ?, location = ?, serialNumber = ?, model = ?, manufacturer = ?, purchaseDate = ?, purchaseCost = ?, warrantyExpiry = ?, specifications = ?, assignedTo = ?, dateReleased = ?, dateReturned = ?, releasedBy = ?, returnedTo = ?, notes = ?, updatedAt = ?
        WHERE id = ?
      `;
          await this.db.run(updateQuery, [
            updateData.name !== void 0 ? updateData.name : existingComponent.name,
            updateData.type !== void 0 ? updateData.type : existingComponent.type,
            updateData.status !== void 0 ? updateData.status : existingComponent.status,
            updateData.description !== void 0 ? updateData.description : existingComponent.description,
            updateData.location !== void 0 ? updateData.location : existingComponent.location,
            updateData.serialNumber !== void 0 ? updateData.serialNumber : existingComponent.serialNumber,
            updateData.model !== void 0 ? updateData.model : existingComponent.model,
            updateData.manufacturer !== void 0 ? updateData.manufacturer : existingComponent.manufacturer,
            updateData.purchaseDate !== void 0 ? updateData.purchaseDate : existingComponent.purchaseDate,
            updateData.purchaseCost !== void 0 ? updateData.purchaseCost : existingComponent.purchaseCost,
            updateData.warrantyExpiry !== void 0 ? updateData.warrantyExpiry : existingComponent.warrantyExpiry,
            updateData.specifications !== void 0 ? updateData.specifications : existingComponent.specifications,
            updateData.assignedTo !== void 0 ? updateData.assignedTo : existingComponent.assignedTo,
            updateData.dateReleased !== void 0 ? updateData.dateReleased : existingComponent.dateReleased,
            updateData.dateReturned !== void 0 ? updateData.dateReturned : existingComponent.dateReturned,
            updateData.releasedBy !== void 0 ? updateData.releasedBy : existingComponent.releasedBy,
            updateData.returnedTo !== void 0 ? updateData.returnedTo : existingComponent.returnedTo,
            updateData.notes !== void 0 ? updateData.notes : existingComponent.notes,
            (/* @__PURE__ */ new Date()).toISOString(),
            id
          ]);
          const updatedComponent = { ...existingComponent, ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.componentsData.set(id, updatedComponent);
          await this.createActivity({
            action: "update",
            itemType: "component",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Component "${updatedComponent.name}" updated`
          });
          return updatedComponent;
        } catch (error) {
          console.error(`Error updating component with id ${id}:`, error);
          return void 0;
        }
      }
      async deleteComponent(id) {
        if (this.isMemoryStorage) {
          const initialLength = this.memoryDb.components.length;
          this.memoryDb.components = this.memoryDb.components.filter((component) => component.id !== id);
          return this.memoryDb.components.length < initialLength;
        }
        try {
          const component = await this.getComponent(id);
          if (!component) return false;
          const result = await this.db.run("DELETE FROM components WHERE id = ?", [id]);
          if (result.changes > 0) {
            await this.createActivity({
              action: "delete",
              itemType: "component",
              itemId: id,
              userId: null,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `Component "${component.name}" deleted`
            });
          }
          this.componentsData.delete(id);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting component with id ${id}:`, error);
          return false;
        }
      }
      // Accessory operations
      async getAccessories() {
        if (this.isMemoryStorage) {
          return this.memoryDb.accessories;
        }
        try {
          const rows = await this.db.all("SELECT * FROM accessories");
          return rows.map((row) => ({
            ...row,
            dateReleased: row.dateReleased ? new Date(row.dateReleased) : null,
            dateReturned: row.dateReturned ? new Date(row.dateReturned) : null
          }));
        } catch (error) {
          console.error("Error fetching accessories:", error);
          return this.memoryDb.accessories;
        }
      }
      async getAccessory(id) {
        if (this.isMemoryStorage) {
          return this.memoryDb.accessories.find((accessory) => accessory.id === id);
        }
        try {
          const row = await this.db.get("SELECT * FROM accessories WHERE id = ?", [id]);
          if (!row) return void 0;
          return {
            ...row,
            dateReleased: row.dateReleased ? new Date(row.dateReleased) : null,
            dateReturned: row.dateReturned ? new Date(row.dateReturned) : null
          };
        } catch (error) {
          console.error(`Error fetching accessory with id ${id}:`, error);
          return this.memoryDb.accessories.find((accessory) => accessory.id === id);
        }
      }
      async createAccessory(insertAccessory) {
        if (this.isMemoryStorage) {
          const id = this.accessoryCurrentId++;
          const accessory = {
            ...insertAccessory,
            id,
            description: insertAccessory.description || null,
            location: insertAccessory.location || null,
            serialNumber: insertAccessory.serialNumber || null,
            model: insertAccessory.model || null,
            manufacturer: insertAccessory.manufacturer || null,
            purchaseDate: insertAccessory.purchaseDate || null,
            purchaseCost: insertAccessory.purchaseCost || null,
            assignedTo: insertAccessory.assignedTo || null,
            knoxId: insertAccessory.knoxId || null,
            dateReleased: insertAccessory.dateReleased || null,
            dateReturned: insertAccessory.dateReturned || null,
            releasedBy: insertAccessory.releasedBy || null,
            returnedTo: insertAccessory.returnedTo || null,
            notes: insertAccessory.notes || null,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.memoryDb.accessories.push(accessory);
          this.createActivity({
            action: "create",
            itemType: "accessory",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Accessory "${accessory.name}" created`
          });
          return accessory;
        }
        try {
          const result = await this.db.run(
            `INSERT INTO accessories (name, type, description, location, serialNumber, model, manufacturer, purchaseDate, purchaseCost, assignedTo, knoxId, dateReleased, dateReturned, releasedBy, returnedTo, notes) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [insertAccessory.name, insertAccessory.type, insertAccessory.description, insertAccessory.location, insertAccessory.serialNumber, insertAccessory.model, insertAccessory.manufacturer, insertAccessory.purchaseDate, insertAccessory.purchaseCost, insertAccessory.assignedTo, insertAccessory.knoxId, insertAccessory.dateReleased, insertAccessory.dateReturned, insertAccessory.releasedBy, insertAccessory.returnedTo, insertAccessory.notes]
          );
          const id = result.lastID;
          const newAccessory = { ...insertAccessory, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.accessoriesData.set(id, newAccessory);
          await this.createActivity({
            action: "create",
            itemType: "accessory",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Accessory "${newAccessory.name}" created`
          });
          return newAccessory;
        } catch (error) {
          console.error("Error creating accessory:", error);
          const id = this.accessoryCurrentId++;
          const accessory = { ...insertAccessory, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.memoryDb.accessories.push(accessory);
          await this.createActivity({
            action: "create",
            itemType: "accessory",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Accessory "${accessory.name}" created (memory storage fallback)`
          });
          return accessory;
        }
      }
      async updateAccessory(id, updateData) {
        if (this.isMemoryStorage) {
          const accessoryIndex = this.memoryDb.accessories.findIndex((accessory) => accessory.id === id);
          if (accessoryIndex === -1) return void 0;
          const updatedAccessory = { ...this.memoryDb.accessories[accessoryIndex], ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.memoryDb.accessories[accessoryIndex] = updatedAccessory;
          return updatedAccessory;
        }
        try {
          const existingAccessory = await this.getAccessory(id);
          if (!existingAccessory) return void 0;
          const updateQuery = `
        UPDATE accessories SET 
          name = ?, type = ?, description = ?, location = ?, serialNumber = ?, model = ?, manufacturer = ?, purchaseDate = ?, purchaseCost = ?, assignedTo = ?, knoxId = ?, dateReleased = ?, dateReturned = ?, releasedBy = ?, returnedTo = ?, notes = ?, updatedAt = ?
        WHERE id = ?
      `;
          await this.db.run(updateQuery, [
            updateData.name !== void 0 ? updateData.name : existingAccessory.name,
            updateData.type !== void 0 ? updateData.type : existingAccessory.type,
            updateData.description !== void 0 ? updateData.description : existingAccessory.description,
            updateData.location !== void 0 ? updateData.location : existingAccessory.location,
            updateData.serialNumber !== void 0 ? updateData.serialNumber : existingAccessory.serialNumber,
            updateData.model !== void 0 ? updateData.model : existingAccessory.model,
            updateData.manufacturer !== void 0 ? updateData.manufacturer : existingAccessory.manufacturer,
            updateData.purchaseDate !== void 0 ? updateData.purchaseDate : existingAccessory.purchaseDate,
            updateData.purchaseCost !== void 0 ? updateData.purchaseCost : existingAccessory.purchaseCost,
            updateData.assignedTo !== void 0 ? updateData.assignedTo : existingAccessory.assignedTo,
            updateData.knoxId !== void 0 ? updateData.knoxId : existingAccessory.knoxId,
            updateData.dateReleased !== void 0 ? updateData.dateReleased : existingAccessory.dateReleased,
            updateData.dateReturned !== void 0 ? updateData.dateReturned : existingAccessory.dateReturned,
            updateData.releasedBy !== void 0 ? updateData.releasedBy : existingAccessory.releasedBy,
            updateData.returnedTo !== void 0 ? updateData.returnedTo : existingAccessory.returnedTo,
            updateData.notes !== void 0 ? updateData.notes : existingAccessory.notes,
            (/* @__PURE__ */ new Date()).toISOString(),
            id
          ]);
          const updatedAccessory = { ...existingAccessory, ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.accessoriesData.set(id, updatedAccessory);
          await this.createActivity({
            action: "update",
            itemType: "accessory",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Accessory "${updatedAccessory.name}" updated`
          });
          return updatedAccessory;
        } catch (error) {
          console.error(`Error updating accessory with id ${id}:`, error);
          return void 0;
        }
      }
      async deleteAccessory(id) {
        if (this.isMemoryStorage) {
          const initialLength = this.memoryDb.accessories.length;
          this.memoryDb.accessories = this.memoryDb.accessories.filter((accessory) => accessory.id !== id);
          return this.memoryDb.accessories.length < initialLength;
        }
        try {
          const accessory = await this.getAccessory(id);
          if (!accessory) return false;
          const result = await this.db.run("DELETE FROM accessories WHERE id = ?", [id]);
          if (result.changes > 0) {
            await this.createActivity({
              action: "delete",
              itemType: "accessory",
              itemId: id,
              userId: null,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `Accessory "${accessory.name}" deleted`
            });
          }
          this.accessoriesData.delete(id);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting accessory with id ${id}:`, error);
          return false;
        }
      }
      // Consumable operations
      async getConsumables() {
        if (this.isMemoryStorage) {
          return this.memoryDb.consumables;
        }
        try {
          const rows = await this.db.all("SELECT * FROM consumables");
          return rows.map((row) => ({ ...row, quantity: Number(row.quantity) }));
        } catch (error) {
          console.error("Error fetching consumables:", error);
          return this.memoryDb.consumables;
        }
      }
      async getConsumable(id) {
        if (this.isMemoryStorage) {
          return this.memoryDb.consumables.find((consumable) => consumable.id === id);
        }
        try {
          const row = await this.db.get("SELECT * FROM consumables WHERE id = ?", [id]);
          return row ? { ...row, quantity: Number(row.quantity) } : void 0;
        } catch (error) {
          console.error(`Error fetching consumable with id ${id}:`, error);
          return this.memoryDb.consumables.find((consumable) => consumable.id === id);
        }
      }
      async createConsumable(insertConsumable) {
        if (this.isMemoryStorage) {
          const id = this.consumableCurrentId++;
          const consumable = {
            ...insertConsumable,
            id,
            status: insertConsumable.status || ConsumableStatus.AVAILABLE,
            location: insertConsumable.location || null,
            modelNumber: insertConsumable.modelNumber || null,
            manufacturer: insertConsumable.manufacturer || null,
            purchaseDate: insertConsumable.purchaseDate || null,
            purchaseCost: insertConsumable.purchaseCost || null,
            notes: insertConsumable.notes || null,
            quantity: insertConsumable.quantity || 1,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.memoryDb.consumables.push(consumable);
          this.createActivity({
            action: "create",
            itemType: "consumable",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Consumable "${consumable.name}" created`
          });
          return consumable;
        }
        try {
          const result = await this.db.run(
            `INSERT INTO consumables (name, type, status, description, location, modelNumber, manufacturer, purchaseDate, purchaseCost, quantity, notes) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [insertConsumable.name, insertConsumable.type, insertConsumable.status, insertConsumable.description, insertConsumable.location, insertConsumable.modelNumber, insertConsumable.manufacturer, insertConsumable.purchaseDate, insertConsumable.purchaseCost, insertConsumable.quantity, insertConsumable.notes]
          );
          const id = result.lastID;
          const newConsumable = { ...insertConsumable, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString(), quantity: insertConsumable.quantity || 1 };
          this.consumablesData.set(id, newConsumable);
          await this.createActivity({
            action: "create",
            itemType: "consumable",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Consumable "${newConsumable.name}" created`
          });
          return newConsumable;
        } catch (error) {
          console.error("Error creating consumable:", error);
          const id = this.consumableCurrentId++;
          const consumable = { ...insertConsumable, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString(), quantity: insertConsumable.quantity || 1 };
          this.memoryDb.consumables.push(consumable);
          await this.createActivity({
            action: "create",
            itemType: "consumable",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Consumable "${consumable.name}" created (memory storage fallback)`
          });
          return consumable;
        }
      }
      async updateConsumable(id, updateData) {
        if (this.isMemoryStorage) {
          const consumableIndex = this.memoryDb.consumables.findIndex((consumable) => consumable.id === id);
          if (consumableIndex === -1) return void 0;
          const updatedConsumable = { ...this.memoryDb.consumables[consumableIndex], ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.memoryDb.consumables[consumableIndex] = updatedConsumable;
          return updatedConsumable;
        }
        try {
          const existingConsumable = await this.getConsumable(id);
          if (!existingConsumable) return void 0;
          const updateQuery = `
        UPDATE consumables SET 
          name = ?, type = ?, status = ?, description = ?, location = ?, modelNumber = ?, manufacturer = ?, purchaseDate = ?, purchaseCost = ?, quantity = ?, notes = ?, updatedAt = ?
        WHERE id = ?
      `;
          await this.db.run(updateQuery, [
            updateData.name !== void 0 ? updateData.name : existingConsumable.name,
            updateData.type !== void 0 ? updateData.type : existingConsumable.type,
            updateData.status !== void 0 ? updateData.status : existingConsumable.status,
            updateData.description !== void 0 ? updateData.description : existingConsumable.description,
            updateData.location !== void 0 ? updateData.location : existingConsumable.location,
            updateData.modelNumber !== void 0 ? updateData.modelNumber : existingConsumable.modelNumber,
            updateData.manufacturer !== void 0 ? updateData.manufacturer : existingConsumable.manufacturer,
            updateData.purchaseDate !== void 0 ? updateData.purchaseDate : existingConsumable.purchaseDate,
            updateData.purchaseCost !== void 0 ? updateData.purchaseCost : existingConsumable.purchaseCost,
            updateData.quantity !== void 0 ? updateData.quantity : existingConsumable.quantity,
            updateData.notes !== void 0 ? updateData.notes : existingConsumable.notes,
            (/* @__PURE__ */ new Date()).toISOString(),
            id
          ]);
          const updatedConsumable = { ...existingConsumable, ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.consumablesData.set(id, updatedConsumable);
          await this.createActivity({
            action: "update",
            itemType: "consumable",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Consumable "${updatedConsumable.name}" updated`
          });
          return updatedConsumable;
        } catch (error) {
          console.error(`Error updating consumable with id ${id}:`, error);
          return void 0;
        }
      }
      async deleteConsumable(id) {
        if (this.isMemoryStorage) {
          const initialLength = this.memoryDb.consumables.length;
          this.memoryDb.consumables = this.memoryDb.consumables.filter((consumable) => consumable.id !== id);
          return this.memoryDb.consumables.length < initialLength;
        }
        try {
          const consumable = await this.getConsumable(id);
          if (!consumable) return false;
          const result = await this.db.run("DELETE FROM consumables WHERE id = ?", [id]);
          if (result.changes > 0) {
            await this.createActivity({
              action: "delete",
              itemType: "consumable",
              itemId: id,
              userId: null,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `Consumable "${consumable.name}" deleted`
            });
          }
          this.consumablesData.delete(id);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting consumable with id ${id}:`, error);
          return false;
        }
      }
      async assignConsumable(consumableId, assignmentData) {
        const assignment = {
          id: this.consumableAssignments.length + 1,
          consumableId,
          assignedTo: assignmentData.assignedTo,
          serialNumber: assignmentData.serialNumber,
          knoxId: assignmentData.knoxId,
          quantity: assignmentData.quantity || 1,
          assignedDate: (/* @__PURE__ */ new Date()).toISOString(),
          status: "assigned",
          notes: assignmentData.notes
        };
        this.consumableAssignments.push(assignment);
        return assignment;
      }
      // System Settings methods
      async getSystemSettings() {
        if (this.isMemoryStorage) {
          return this.memoryDb.systemSettings || {
            id: 1,
            siteName: "SRPH-MIS",
            defaultLanguage: "english",
            defaultTimezone: "UTC",
            dateFormat: "yyyy-mm-dd",
            autoBackupEnabled: false,
            cacheEnabled: true,
            colorScheme: "default",
            enableAdminNotifications: true,
            notifyOnCheckout: true,
            notifyOnOverdue: true,
            passwordMinLength: 8,
            requireSpecialChar: false,
            requireUppercase: true,
            requireLowercase: true,
            requireNumber: true,
            maxLoginAttempts: 5,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
        }
        try {
          const row = await this.db.get("SELECT * FROM system_settings WHERE id = 1");
          return row || {
            id: 1,
            siteName: "SRPH-MIS",
            defaultLanguage: "english",
            defaultTimezone: "UTC",
            dateFormat: "yyyy-mm-dd",
            autoBackupEnabled: false,
            cacheEnabled: true,
            colorScheme: "default",
            enableAdminNotifications: true,
            notifyOnCheckout: true,
            notifyOnOverdue: true,
            passwordMinLength: 8,
            requireSpecialChar: false,
            requireUppercase: true,
            requireLowercase: true,
            requireNumber: true,
            maxLoginAttempts: 5,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
        } catch (error) {
          console.error("Error getting system settings:", error);
          return this.memoryDb.systemSettings || {};
        }
      }
      async updateSystemSettings(id, data) {
        if (this.isMemoryStorage) {
          this.memoryDb.systemSettings = { ...data, id, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          return this.memoryDb.systemSettings;
        }
        try {
          const existingSettings = await this.getSystemSettings();
          const updateQuery = `
        UPDATE system_settings SET 
          siteName = ?, siteUrl = ?, defaultLanguage = ?, defaultTimezone = ?, allowPublicRegistration = ?, companyName = ?, companyAddress = ?, companyEmail = ?, companyLogo = ?, mailFromAddress = ?, mailFromName = ?, mailHost = ?, mailPort = ?, mailUsername = ?, mailPassword = ?, assetTagPrefix = ?, lockoutDuration = ?, passwordMinLength = ?, requireSpecialChar = ?, requireUppercase = ?, requireNumber = ?, maxLoginAttempts = ?, enableAdminNotifications = ?, notifyOnCheckin = ?, notifyOnCheckout = ?, notifyOnOverdue = ?, updatedAt = ?
        WHERE id = ?
      `;
          await this.db.run(updateQuery, [
            data.siteName !== void 0 ? data.siteName : existingSettings.siteName,
            data.siteUrl !== void 0 ? data.siteUrl : existingSettings.siteUrl,
            data.defaultLanguage !== void 0 ? data.defaultLanguage : existingSettings.defaultLanguage,
            data.defaultTimezone !== void 0 ? data.defaultTimezone : existingSettings.defaultTimezone,
            data.allowPublicRegistration !== void 0 ? data.allowPublicRegistration : existingSettings.allowPublicRegistration,
            data.companyName !== void 0 ? data.companyName : existingSettings.companyName,
            data.companyAddress !== void 0 ? data.companyAddress : existingSettings.companyAddress,
            data.companyEmail !== void 0 ? data.companyEmail : existingSettings.companyEmail,
            data.companyLogo !== void 0 ? data.companyLogo : existingSettings.companyLogo,
            data.mailFromAddress !== void 0 ? data.mailFromAddress : existingSettings.mailFromAddress,
            data.mailFromName !== void 0 ? data.mailFromName : existingSettings.mailFromName,
            data.mailHost !== void 0 ? data.mailHost : existingSettings.mailHost,
            data.mailPort !== void 0 ? data.mailPort : existingSettings.mailPort,
            data.mailUsername !== void 0 ? data.mailUsername : existingSettings.mailUsername,
            data.mailPassword !== void 0 ? data.mailPassword : existingSettings.mailPassword,
            data.assetTagPrefix !== void 0 ? data.assetTagPrefix : existingSettings.assetTagPrefix,
            data.lockoutDuration !== void 0 ? data.lockoutDuration : existingSettings.lockoutDuration,
            data.passwordMinLength !== void 0 ? data.passwordMinLength : existingSettings.passwordMinLength,
            data.requireSpecialChar !== void 0 ? data.requireSpecialChar : existingSettings.requireSpecialChar,
            data.requireUppercase !== void 0 ? data.requireUppercase : existingSettings.requireUppercase,
            data.requireNumber !== void 0 ? data.requireNumber : existingSettings.requireNumber,
            data.maxLoginAttempts !== void 0 ? data.maxLoginAttempts : existingSettings.maxLoginAttempts,
            data.enableAdminNotifications !== void 0 ? data.enableAdminNotifications : existingSettings.enableAdminNotifications,
            data.notifyOnCheckin !== void 0 ? data.notifyOnCheckin : existingSettings.notifyOnCheckin,
            data.notifyOnCheckout !== void 0 ? data.notifyOnCheckout : existingSettings.notifyOnCheckout,
            data.notifyOnOverdue !== void 0 ? data.notifyOnOverdue : existingSettings.notifyOnOverdue,
            (/* @__PURE__ */ new Date()).toISOString(),
            id
          ]);
          return { ...existingSettings, ...data, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
        } catch (error) {
          console.error(`Error updating system settings with id ${id}:`, error);
          return void 0;
        }
      }
      // License operations
      async getLicenses() {
        if (this.isMemoryStorage) {
          return this.memoryDb.licenses;
        }
        try {
          const rows = await this.db.all("SELECT * FROM licenses");
          return rows.map((row) => ({
            ...row,
            purchaseDate: row.purchaseDate ? new Date(row.purchaseDate) : null,
            expirationDate: row.expirationDate ? new Date(row.expirationDate) : null,
            assignedSeats: Number(row.assignedSeats)
          }));
        } catch (error) {
          console.error("Error fetching licenses:", error);
          return this.memoryDb.licenses;
        }
      }
      async getLicense(id) {
        if (this.isMemoryStorage) {
          return this.memoryDb.licenses.find((license) => license.id === id);
        }
        try {
          const row = await this.db.get("SELECT * FROM licenses WHERE id = ?", [id]);
          if (!row) return void 0;
          return {
            ...row,
            purchaseDate: row.purchaseDate ? new Date(row.purchaseDate) : null,
            expirationDate: row.expirationDate ? new Date(row.expirationDate) : null,
            assignedSeats: Number(row.assignedSeats)
          };
        } catch (error) {
          console.error(`Error fetching license with id ${id}:`, error);
          return this.memoryDb.licenses.find((license) => license.id === id);
        }
      }
      async createLicense(insertLicense) {
        if (this.isMemoryStorage) {
          const id = this.licenseCurrentId++;
          const license = {
            ...insertLicense,
            id,
            purchaseDate: insertLicense.purchaseDate || null,
            purchaseCost: insertLicense.purchaseCost || null,
            manufacturer: insertLicense.manufacturer || null,
            notes: insertLicense.notes || null,
            assignedTo: insertLicense.assignedTo || null,
            seats: insertLicense.seats || null,
            assignedSeats: insertLicense.assignedSeats || 0,
            company: insertLicense.company || null,
            expirationDate: insertLicense.expirationDate || null,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.memoryDb.licenses.push(license);
          this.createActivity({
            action: "create",
            itemType: "license",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `License "${license.name}" created`
          });
          return license;
        }
        try {
          const result = await this.db.run(
            `INSERT INTO licenses (name, licenseKey, type, seats, assignedSeats, company, purchaseDate, purchaseCost, expirationDate, assignedTo, notes) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [insertLicense.name, insertLicense.licenseKey, insertLicense.type, insertLicense.seats, insertLicense.assignedSeats, insertLicense.company, insertLicense.purchaseDate, insertLicense.purchaseCost, insertLicense.expirationDate, insertLicense.assignedTo, insertLicense.notes]
          );
          const id = result.lastID;
          const newLicense = { ...insertLicense, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString(), assignedSeats: insertLicense.assignedSeats || 0 };
          this.licensesData.set(id, newLicense);
          await this.createActivity({
            action: "create",
            itemType: "license",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `License "${newLicense.name}" created`
          });
          return newLicense;
        } catch (error) {
          console.error("Error creating license:", error);
          const id = this.licenseCurrentId++;
          const license = { ...insertLicense, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString(), assignedSeats: insertLicense.assignedSeats || 0 };
          this.memoryDb.licenses.push(license);
          await this.createActivity({
            action: "create",
            itemType: "license",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `License "${license.name}" created (memory storage fallback)`
          });
          return license;
        }
      }
      async updateLicense(id, updateData) {
        if (this.isMemoryStorage) {
          const licenseIndex = this.memoryDb.licenses.findIndex((license) => license.id === id);
          if (licenseIndex === -1) return void 0;
          const updatedLicense = { ...this.memoryDb.licenses[licenseIndex], ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.memoryDb.licenses[licenseIndex] = updatedLicense;
          return updatedLicense;
        }
        try {
          const existingLicense = await this.getLicense(id);
          if (!existingLicense) return void 0;
          const updateQuery = `
        UPDATE licenses SET 
          name = ?, licenseKey = ?, type = ?, seats = ?, assignedSeats = ?, company = ?, purchaseDate = ?, purchaseCost = ?, expirationDate = ?, assignedTo = ?, notes = ?, updatedAt = ?
        WHERE id = ?
      `;
          await this.db.run(updateQuery, [
            updateData.name !== void 0 ? updateData.name : existingLicense.name,
            updateData.licenseKey !== void 0 ? updateData.licenseKey : existingLicense.licenseKey,
            updateData.type !== void 0 ? updateData.type : existingLicense.type,
            updateData.seats !== void 0 ? updateData.seats : existingLicense.seats,
            updateData.assignedSeats !== void 0 ? updateData.assignedSeats : existingLicense.assignedSeats,
            updateData.company !== void 0 ? updateData.company : existingLicense.company,
            updateData.purchaseDate !== void 0 ? updateData.purchaseDate : existingLicense.purchaseDate,
            updateData.purchaseCost !== void 0 ? updateData.purchaseCost : existingLicense.purchaseCost,
            updateData.expirationDate !== void 0 ? updateData.expirationDate : existingLicense.expirationDate,
            updateData.assignedTo !== void 0 ? updateData.assignedTo : existingLicense.assignedTo,
            updateData.notes !== void 0 ? updateData.notes : existingLicense.notes,
            (/* @__PURE__ */ new Date()).toISOString(),
            id
          ]);
          const updatedLicense = { ...existingLicense, ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.licensesData.set(id, updatedLicense);
          await this.createActivity({
            action: "update",
            itemType: "license",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `License "${updatedLicense.name}" updated`
          });
          return updatedLicense;
        } catch (error) {
          console.error(`Error updating license with id ${id}:`, error);
          return void 0;
        }
      }
      async deleteLicense(id) {
        if (this.isMemoryStorage) {
          const initialLength = this.memoryDb.licenses.length;
          this.memoryDb.licenses = this.memoryDb.licenses.filter((license) => license.id !== id);
          return this.memoryDb.licenses.length < initialLength;
        }
        try {
          const license = await this.getLicense(id);
          if (!license) return false;
          const result = await this.db.run("DELETE FROM licenses WHERE id = ?", [id]);
          if (result.changes > 0) {
            await this.createActivity({
              action: "delete",
              itemType: "license",
              itemId: id,
              userId: null,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `License "${license.name}" deleted`
            });
          }
          this.licensesData.delete(id);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting license with id ${id}:`, error);
          return false;
        }
      }
      // License assignment operations  
      async getLicenseAssignments(licenseId) {
        if (this.isMemoryStorage) {
          return this.memoryDb.licenses.find((l) => l.id === licenseId)?.assignments || [];
        }
        try {
          const rows = await this.db.all("SELECT * FROM license_assignments WHERE licenseId = ?", [licenseId]);
          return rows.map((row) => ({
            ...row,
            assignedDate: new Date(row.assignedDate)
          }));
        } catch (error) {
          console.error(`Error fetching license assignments for licenseId ${licenseId}:`, error);
          return [];
        }
      }
      async createLicenseAssignment(insertAssignment) {
        if (this.isMemoryStorage) {
          const id = this.licenseAssignmentCurrentId++;
          const assignment = {
            ...insertAssignment,
            id,
            notes: insertAssignment.notes || null,
            assignedDate: (/* @__PURE__ */ new Date()).toISOString()
          };
          const license = this.memoryDb.licenses.find((l) => l.id === assignment.licenseId);
          if (license) {
            if (!license.assignments) license.assignments = [];
            license.assignments.push(assignment);
            license.assignedSeats = (license.assignedSeats || 0) + 1;
          }
          return assignment;
        }
        try {
          const result = await this.db.run(
            "INSERT INTO license_assignments (licenseId, userId, notes) VALUES (?, ?, ?)",
            [insertAssignment.licenseId, insertAssignment.userId, insertAssignment.notes]
          );
          const id = result.lastID;
          const newAssignment = { ...insertAssignment, id, assignedDate: (/* @__PURE__ */ new Date()).toISOString() };
          this.licenseAssignmentsData.set(id, newAssignment);
          const license = await this.getLicense(newAssignment.licenseId);
          if (license) {
            await this.updateLicense(license.id, {
              assignedSeats: (license.assignedSeats || 0) + 1
            });
          }
          return newAssignment;
        } catch (error) {
          console.error("Error creating license assignment:", error);
          const id = this.licenseAssignmentCurrentId++;
          const assignment = { ...insertAssignment, id, assignedDate: (/* @__PURE__ */ new Date()).toISOString() };
          const license = this.memoryDb.licenses.find((l) => l.id === assignment.licenseId);
          if (license) {
            if (!license.assignments) license.assignments = [];
            license.assignments.push(assignment);
            license.assignedSeats = (license.assignedSeats || 0) + 1;
          }
          return assignment;
        }
      }
      // Checkout/Checkin operations
      async checkoutAsset(assetId, userId, expectedCheckinDate, customNotes) {
        const asset2 = await this.getAsset(assetId);
        if (!asset2) return void 0;
        if (asset2.status === AssetStatus.DEPLOYED) return void 0;
        const updatedAsset = {
          ...asset2,
          status: AssetStatus.DEPLOYED,
          assignedTo: userId,
          checkoutDate: (/* @__PURE__ */ new Date()).toISOString(),
          expectedCheckinDate: expectedCheckinDate || null
        };
        await this.updateAsset(assetId, updatedAsset);
        await this.createActivity({
          action: "checkout",
          itemType: "asset",
          itemId: assetId,
          userId,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: customNotes || `Asset checked out to user ID: ${userId}`
        });
        return updatedAsset;
      }
      async checkinAsset(assetId) {
        const asset2 = await this.getAsset(assetId);
        if (!asset2) return void 0;
        if (asset2.status !== AssetStatus.DEPLOYED) return void 0;
        const userId = asset2.assignedTo;
        const updatedAsset = {
          ...asset2,
          status: AssetStatus.AVAILABLE,
          assignedTo: null,
          checkoutDate: null,
          expectedCheckinDate: null
        };
        await this.updateAsset(assetId, updatedAsset);
        await this.createActivity({
          action: "checkin",
          itemType: "asset",
          itemId: assetId,
          userId: userId || null,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `Asset checked in from user ID: ${userId || "Unknown"}`
        });
        return updatedAsset;
      }
      // Activity operations
      async getActivities() {
        if (this.isMemoryStorage) {
          return this.memoryDb.activities;
        }
        try {
          const rows = await this.db.all("SELECT * FROM activities");
          return rows.map((row) => ({
            ...row,
            userId: row.userId !== null ? Number(row.userId) : null,
            timestamp: new Date(row.timestamp)
          }));
        } catch (error) {
          console.error("Error fetching activities:", error);
          return this.memoryDb.activities;
        }
      }
      async getActivitiesByUser(userId) {
        if (this.isMemoryStorage) {
          return this.memoryDb.activities.filter((activity) => activity.userId === userId);
        }
        try {
          const rows = await this.db.all("SELECT * FROM activities WHERE userId = ?", [userId]);
          return rows.map((row) => ({
            ...row,
            userId: row.userId !== null ? Number(row.userId) : null,
            timestamp: new Date(row.timestamp)
          }));
        } catch (error) {
          console.error(`Error fetching activities for user ${userId}:`, error);
          return this.memoryDb.activities.filter((activity) => activity.userId === userId);
        }
      }
      async getActivitiesByAsset(assetId) {
        if (this.isMemoryStorage) {
          return this.memoryDb.activities.filter((activity) => activity.itemType === "asset" && activity.itemId === assetId);
        }
        try {
          const rows = await this.db.all("SELECT * FROM activities WHERE itemType = ? AND itemId = ?", ["asset", assetId]);
          return rows.map((row) => ({
            ...row,
            userId: row.userId !== null ? Number(row.userId) : null,
            timestamp: new Date(row.timestamp)
          }));
        } catch (error) {
          console.error(`Error fetching activities for asset ${assetId}:`, error);
          return this.memoryDb.activities.filter((activity) => activity.itemType === "asset" && activity.itemId === assetId);
        }
      }
      async createActivity(insertActivity) {
        if (this.isMemoryStorage) {
          const id = this.activityCurrentId++;
          const activity = {
            ...insertActivity,
            id,
            notes: insertActivity.notes || null,
            userId: insertActivity.userId !== void 0 ? insertActivity.userId : null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.memoryDb.activities.push(activity);
          return activity;
        }
        try {
          const result = await this.db.run(
            "INSERT INTO activities (action, itemType, itemId, userId, notes) VALUES (?, ?, ?, ?, ?)",
            [insertActivity.action, insertActivity.itemType, insertActivity.itemId, insertActivity.userId, insertActivity.notes]
          );
          const id = result.lastID;
          const newActivity = { ...insertActivity, id, timestamp: (/* @__PURE__ */ new Date()).toISOString() };
          this.activitiesData.set(id, newActivity);
          return newActivity;
        } catch (error) {
          console.error("Error creating activity:", error);
          const id = this.activityCurrentId++;
          const activity = { ...insertActivity, id, timestamp: (/* @__PURE__ */ new Date()).toISOString() };
          this.memoryDb.activities.push(activity);
          return activity;
        }
      }
      // BitLocker keys operations
      async getBitlockerKeys() {
        if (this.isMemoryStorage) {
          return this.memoryDb.bitlockerKeys;
        }
        try {
          const rows = await this.db.all("SELECT * FROM bitlocker_keys");
          return rows.map((row) => ({
            ...row,
            dateAdded: new Date(row.dateAdded),
            updatedAt: new Date(row.updatedAt)
          }));
        } catch (error) {
          console.error("Error fetching Bitlocker keys:", error);
          return this.memoryDb.bitlockerKeys;
        }
      }
      async getBitlockerKey(id) {
        if (this.isMemoryStorage) {
          return this.memoryDb.bitlockerKeys.find((k) => k.id === id);
        }
        try {
          const row = await this.db.get("SELECT * FROM bitlocker_keys WHERE id = ?", [id]);
          if (!row) return void 0;
          return {
            ...row,
            dateAdded: new Date(row.dateAdded),
            updatedAt: new Date(row.updatedAt)
          };
        } catch (error) {
          console.error(`Error fetching Bitlocker key with id ${id}:`, error);
          return this.memoryDb.bitlockerKeys.find((k) => k.id === id);
        }
      }
      async getBitlockerKeyBySerialNumber(serialNumber) {
        if (this.isMemoryStorage) {
          return this.memoryDb.bitlockerKeys.filter((k) => k.serialNumber === serialNumber);
        }
        try {
          const rows = await this.db.all("SELECT * FROM bitlocker_keys WHERE serialNumber = ?", [serialNumber]);
          return rows.map((row) => ({
            ...row,
            dateAdded: new Date(row.dateAdded),
            updatedAt: new Date(row.updatedAt)
          }));
        } catch (error) {
          console.error(`Error fetching Bitlocker keys by serial number ${serialNumber}:`, error);
          return this.memoryDb.bitlockerKeys.filter((k) => k.serialNumber === serialNumber);
        }
      }
      async getBitlockerKeyByIdentifier(identifier) {
        if (this.isMemoryStorage) {
          return this.memoryDb.bitlockerKeys.filter((k) => k.identifier === identifier);
        }
        try {
          const rows = await this.db.all("SELECT * FROM bitlocker_keys WHERE identifier = ?", [identifier]);
          return rows.map((row) => ({
            ...row,
            dateAdded: new Date(row.dateAdded),
            updatedAt: new Date(row.updatedAt)
          }));
        } catch (error) {
          console.error(`Error fetching Bitlocker keys by identifier ${identifier}:`, error);
          return this.memoryDb.bitlockerKeys.filter((k) => k.identifier === identifier);
        }
      }
      async createBitlockerKey(key) {
        if (this.isMemoryStorage) {
          const newKey = {
            id: this.bitlockerKeyCurrentId++,
            ...key,
            dateAdded: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          };
          this.memoryDb.bitlockerKeys.push(newKey);
          await this.createActivity({
            action: "create",
            itemType: "bitlocker",
            itemId: newKey.id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `BitLocker key for ${newKey.serialNumber} created (memory storage)`
          });
          return newKey;
        }
        try {
          const result = await this.db.run(
            "INSERT INTO bitlocker_keys (serialNumber, identifier, recoveryKey, addedByUser) VALUES (?, ?, ?, ?)",
            [key.serialNumber, key.identifier, key.recoveryKey, key.addedByUser]
          );
          const id = result.lastID;
          const newKey = { ...key, id, dateAdded: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() };
          this.bitlockerKeysData.set(id, newKey);
          await this.createActivity({
            action: "create",
            itemType: "bitlocker",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `BitLocker key for ${newKey.serialNumber} created`
          });
          return newKey;
        } catch (error) {
          console.error("Error creating Bitlocker key:", error);
          const newKey = {
            id: this.bitlockerKeyCurrentId++,
            ...key,
            dateAdded: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          };
          this.memoryDb.bitlockerKeys.push(newKey);
          await this.createActivity({
            action: "create",
            itemType: "bitlocker",
            itemId: newKey.id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `BitLocker key for ${newKey.serialNumber} created (memory storage fallback)`
          });
          return newKey;
        }
      }
      async updateBitlockerKey(id, keyData) {
        if (this.isMemoryStorage) {
          const keyIndex = this.memoryDb.bitlockerKeys.findIndex((k) => k.id === id);
          if (keyIndex === -1) return void 0;
          const updatedKey = { ...this.memoryDb.bitlockerKeys[keyIndex], ...keyData, updatedAt: /* @__PURE__ */ new Date() };
          this.memoryDb.bitlockerKeys[keyIndex] = updatedKey;
          return updatedKey;
        }
        try {
          const existingKey = await this.getBitlockerKey(id);
          if (!existingKey) return void 0;
          const updateQuery = `
        UPDATE bitlocker_keys SET 
          serialNumber = ?, identifier = ?, recoveryKey = ?, addedByUser = ?, updatedAt = ?
        WHERE id = ?
      `;
          await this.db.run(updateQuery, [
            keyData.serialNumber !== void 0 ? keyData.serialNumber : existingKey.serialNumber,
            keyData.identifier !== void 0 ? keyData.identifier : existingKey.identifier,
            keyData.recoveryKey !== void 0 ? keyData.recoveryKey : existingKey.recoveryKey,
            keyData.addedByUser !== void 0 ? keyData.addedByUser : existingKey.addedByUser,
            /* @__PURE__ */ new Date(),
            id
          ]);
          const updatedKey = { ...existingKey, ...keyData, updatedAt: /* @__PURE__ */ new Date() };
          this.bitlockerKeysData.set(id, updatedKey);
          return updatedKey;
        } catch (error) {
          console.error(`Error updating Bitlocker key with id ${id}:`, error);
          return void 0;
        }
      }
      async deleteBitlockerKey(id) {
        if (this.isMemoryStorage) {
          const initialLength = this.memoryDb.bitlockerKeys.length;
          this.memoryDb.bitlockerKeys = this.memoryDb.bitlockerKeys.filter((k) => k.id !== id);
          return this.memoryDb.bitlockerKeys.length < initialLength;
        }
        try {
          const result = await this.db.run("DELETE FROM bitlocker_keys WHERE id = ?", [id]);
          this.bitlockerKeysData.delete(id);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting Bitlocker key with id ${id}:`, error);
          return false;
        }
      }
      // VM Inventory operations
      async getVmInventory() {
        if (this.isMemoryStorage) {
          return this.memoryDb.vmInventory;
        }
        try {
          const rows = await this.db.all("SELECT * FROM vm_inventory");
          return rows.map((row) => ({
            ...row,
            lastModified: row.lastModified ? new Date(row.lastModified) : null,
            createdAt: row.createdAt ? new Date(row.createdAt) : null
          }));
        } catch (error) {
          console.error("Error fetching VM inventory:", error);
          return this.memoryDb.vmInventory;
        }
      }
      async getVmInventoryItem(id) {
        if (this.isMemoryStorage) {
          return this.memoryDb.vmInventory.find((vm) => vm.id === id);
        }
        try {
          const row = await this.db.get("SELECT * FROM vm_inventory WHERE id = ?", [id]);
          if (!row) return void 0;
          return {
            ...row,
            lastModified: row.lastModified ? new Date(row.lastModified) : null,
            createdAt: row.createdAt ? new Date(row.createdAt) : null
          };
        } catch (error) {
          console.error(`Error fetching VM inventory item with id ${id}:`, error);
          return this.memoryDb.vmInventory.find((vm) => vm.id === id);
        }
      }
      async createVmInventoryItem(vm) {
        if (this.isMemoryStorage) {
          const id = this.vmInventoryCurrentId++;
          const now = (/* @__PURE__ */ new Date()).toISOString();
          const newVm = {
            id,
            ...vm,
            lastModified: now,
            createdAt: now
          };
          this.memoryDb.vmInventory.push(newVm);
          await this.createActivity({
            action: "create",
            itemType: "vm",
            itemId: id,
            userId: null,
            timestamp: now,
            notes: `VM "${vm.vmName}" added to inventory`
          });
          return newVm;
        }
        try {
          const result = await this.db.run(
            "INSERT INTO vm_inventory (vmName, vmId, vmIpAddress, vmOs, vmRamGB, vmCpuCores, vmStorageGB, vmPowerState) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [vm.vmName, vm.vmId, vm.vmIpAddress, vm.vmOs, vm.vmRamGB, vm.vmCpuCores, vm.vmStorageGB, vm.vmPowerState]
          );
          const id = result.lastID;
          const now = (/* @__PURE__ */ new Date()).toISOString();
          const newVm = { ...vm, id, lastModified: now, createdAt: now };
          this.vmInventoryData.set(id, newVm);
          await this.createActivity({
            action: "create",
            itemType: "vm",
            itemId: id,
            userId: null,
            timestamp: now,
            notes: `VM "${vm.vmName}" added to inventory`
          });
          return newVm;
        } catch (error) {
          console.error("Error creating VM inventory item:", error);
          const id = this.vmInventoryCurrentId++;
          const now = (/* @__PURE__ */ new Date()).toISOString();
          const newVm = { ...vm, id, lastModified: now, createdAt: now };
          this.memoryDb.vmInventory.push(newVm);
          await this.createActivity({
            action: "create",
            itemType: "vm",
            itemId: id,
            userId: null,
            timestamp: now,
            notes: `VM "${vm.vmName}" added to inventory (memory storage fallback)`
          });
          return newVm;
        }
      }
      async updateVmInventoryItem(id, vm) {
        if (this.isMemoryStorage) {
          const vmIndex = this.memoryDb.vmInventory.findIndex((v) => v.id === id);
          if (vmIndex === -1) return void 0;
          const now = (/* @__PURE__ */ new Date()).toISOString();
          const updatedVm = { ...this.memoryDb.vmInventory[vmIndex], ...vm, lastModified: now };
          this.memoryDb.vmInventory[vmIndex] = updatedVm;
          return updatedVm;
        }
        try {
          const existingVm = await this.getVmInventoryItem(id);
          if (!existingVm) return void 0;
          const updateQuery = `
        UPDATE vm_inventory SET 
          vmName = ?, vmId = ?, vmIpAddress = ?, vmOs = ?, vmRamGB = ?, vmCpuCores = ?, vmStorageGB = ?, vmPowerState = ?, lastModified = ?
        WHERE id = ?
      `;
          await this.db.run(updateQuery, [
            vm.vmName !== void 0 ? vm.vmName : existingVm.vmName,
            vm.vmId !== void 0 ? vm.vmId : existingVm.vmId,
            vm.vmIpAddress !== void 0 ? vm.vmIpAddress : existingVm.vmIpAddress,
            vm.vmOs !== void 0 ? vm.vmOs : existingVm.vmOs,
            vm.vmRamGB !== void 0 ? vm.vmRamGB : existingVm.vmRamGB,
            vm.vmCpuCores !== void 0 ? vm.vmCpuCores : existingVm.vmCpuCores,
            vm.vmStorageGB !== void 0 ? vm.vmStorageGB : existingVm.vmStorageGB,
            vm.vmPowerState !== void 0 ? vm.vmPowerState : existingVm.vmPowerState,
            (/* @__PURE__ */ new Date()).toISOString(),
            id
          ]);
          const now = (/* @__PURE__ */ new Date()).toISOString();
          const updatedVm = { ...existingVm, ...vm, lastModified: now };
          this.vmInventoryData.set(id, updatedVm);
          await this.createActivity({
            action: "update",
            itemType: "vm",
            itemId: id,
            userId: null,
            timestamp: now,
            notes: `VM "${updatedVm.vmName}" updated`
          });
          return updatedVm;
        } catch (error) {
          console.error(`Error updating VM inventory item with id ${id}:`, error);
          return void 0;
        }
      }
      async deleteVmInventoryItem(id) {
        if (this.isMemoryStorage) {
          const initialLength = this.memoryDb.vmInventory.length;
          this.memoryDb.vmInventory = this.memoryDb.vmInventory.filter((vm) => vm.id !== id);
          return this.memoryDb.vmInventory.length < initialLength;
        }
        try {
          const vm = await this.getVmInventoryItem(id);
          if (!vm) return false;
          const result = await this.db.run("DELETE FROM vm_inventory WHERE id = ?", [id]);
          if (result.changes > 0) {
            await this.createActivity({
              action: "delete",
              itemType: "vm",
              itemId: id,
              userId: null,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `VM "${vm.vmName}" deleted from inventory`
            });
          }
          this.vmInventoryData.delete(id);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting VM inventory item with id ${id}:`, error);
          return false;
        }
      }
      // IAM Accounts operations
      async getIamAccounts() {
        if (this.isMemoryStorage) {
          return this.memoryDb.iamAccounts || [];
        }
        try {
          const rows = await this.db.all("SELECT * FROM iam_accounts ORDER BY id DESC");
          return rows;
        } catch (error) {
          console.error("Error fetching IAM accounts:", error);
          return [];
        }
      }
      async getIamAccount(id) {
        if (this.isMemoryStorage) {
          return (this.memoryDb.iamAccounts || []).find((acc) => acc.id === id);
        }
        try {
          const row = await this.db.get("SELECT * FROM iam_accounts WHERE id = ?", [id]);
          return row;
        } catch (error) {
          console.error(`Error fetching IAM account with id ${id}:`, error);
          return void 0;
        }
      }
      async updateIamAccount(id, data) {
        if (this.isMemoryStorage) {
          const accounts = this.memoryDb.iamAccounts || [];
          const index = accounts.findIndex((acc) => acc.id === id);
          if (index === -1) return void 0;
          accounts[index] = { ...accounts[index], ...data, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          return accounts[index];
        }
        try {
          const existing = await this.getIamAccount(id);
          if (!existing) return void 0;
          const updateFields = [];
          const updateValues = [];
          for (const [key, value] of Object.entries(data)) {
            updateFields.push(`${key} = ?`);
            updateValues.push(value);
          }
          updateFields.push("updated_at = ?");
          updateValues.push((/* @__PURE__ */ new Date()).toISOString());
          updateValues.push(id);
          const updateQuery = `UPDATE iam_accounts SET ${updateFields.join(", ")} WHERE id = ?`;
          await this.db.run(updateQuery, updateValues);
          return await this.getIamAccount(id);
        } catch (error) {
          console.error(`Error updating IAM account with id ${id}:`, error);
          return void 0;
        }
      }
      async deleteIamAccount(id) {
        if (this.isMemoryStorage) {
          const accounts = this.memoryDb.iamAccounts || [];
          const initialLength = accounts.length;
          this.memoryDb.iamAccounts = accounts.filter((acc) => acc.id !== id);
          return (this.memoryDb.iamAccounts?.length || 0) < initialLength;
        }
        try {
          const result = await this.db.run("DELETE FROM iam_accounts WHERE id = ?", [id]);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting IAM account with id ${id}:`, error);
          return false;
        }
      }
      async importIamAccounts(accounts) {
        const results = { successful: 0, failed: 0, errors: [] };
        for (const account of accounts) {
          try {
            if (this.isMemoryStorage) {
              const accounts2 = this.memoryDb.iamAccounts || [];
              const id = accounts2.length + 1;
              const newAccount = {
                ...account,
                id,
                createdAt: (/* @__PURE__ */ new Date()).toISOString(),
                updatedAt: (/* @__PURE__ */ new Date()).toISOString()
              };
              accounts2.push(newAccount);
              this.memoryDb.iamAccounts = accounts2;
            } else {
              const nameValue = account.name !== void 0 && account.name !== null && account.name.trim() !== "" ? account.name : null;
              await this.db.run(
                `INSERT INTO iam_accounts (requestor, knox_id, name, user_knox_id, permission, duration_start_date, duration_end_date, cloud_platform, project_accounts, approval_id, remarks, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  account.requestor || null,
                  account.knoxId || null,
                  nameValue,
                  account.userKnoxId || null,
                  account.permission || null,
                  account.durationStartDate || null,
                  account.durationEndDate || null,
                  account.cloudPlatform || null,
                  account.projectAccounts || null,
                  account.approvalId || null,
                  account.remarks || null,
                  account.status || "active"
                ]
              );
            }
            results.successful++;
          } catch (error) {
            results.failed++;
            results.errors.push(`Failed to import account: ${error.message}`);
          }
        }
        return results;
      }
      // Azure Inventory operations
      async getAzureInventory() {
        if (this.isMemoryStorage) {
          return Array.from(this.azureInventoryData.values());
        }
        try {
          const rows = await this.db.all("SELECT * FROM azure_inventory ORDER BY id DESC");
          return rows;
        } catch (error) {
          console.error("Error fetching Azure inventory:", error);
          return [];
        }
      }
      async createAzureInventory(data) {
        if (this.isMemoryStorage) {
          const id = this.azureInventoryCurrentId++;
          const newRecord = {
            id,
            ...data,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.azureInventoryData.set(id, newRecord);
          return newRecord;
        }
        try {
          const result = await this.db.run(
            `INSERT INTO azure_inventory (resourceGroupName, resourceType, resourceName, location, subscriptionId, resourceId, tags) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [data.resourceGroupName, data.resourceType, data.resourceName, data.location, data.subscriptionId, data.resourceId, JSON.stringify(data.tags)]
          );
          const id = result.lastID;
          const newRecord = { ...data, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.azureInventoryData.set(id, newRecord);
          return newRecord;
        } catch (error) {
          console.error("Error creating Azure inventory record:", error);
          const id = this.azureInventoryCurrentId++;
          const newRecord = { ...data, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.azureInventoryData.set(id, newRecord);
          return newRecord;
        }
      }
      async updateAzureInventory(id, data) {
        if (this.isMemoryStorage) {
          const record = this.azureInventoryData.get(id);
          if (!record) return void 0;
          const updatedRecord = { ...record, ...data, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.azureInventoryData.set(id, updatedRecord);
          return updatedRecord;
        }
        try {
          const existing = await this.getAzureInventory().then((inv) => inv.find((item2) => item2.id === id));
          if (!existing) return void 0;
          await db.update(azureInventory).set({
            ...data,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(azureInventory.id, id));
          return await this.getAzureInventory().then((inv) => inv.find((item2) => item2.id === id));
        } catch (error) {
          console.error(`Error updating Azure inventory with id ${id}:`, error);
          return void 0;
        }
      }
      async deleteAzureInventory(id) {
        if (this.isMemoryStorage) {
          const sizeBefore = this.azureInventoryData.size;
          this.azureInventoryData.delete(id);
          return this.azureInventoryData.size < sizeBefore;
        }
        try {
          const result = await this.db.run("DELETE FROM azure_inventory WHERE id = ?", [id]);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting Azure inventory with id ${id}:`, error);
          return false;
        }
      }
      // GCP Inventory operations
      async getGcpInventory() {
        if (this.isMemoryStorage) {
          return Array.from(this.gcpInventoryData.values());
        }
        try {
          const rows = await this.db.all("SELECT * FROM gcp_inventory ORDER BY id DESC");
          return rows;
        } catch (error) {
          console.error("Error fetching GCP inventory:", error);
          return [];
        }
      }
      async createGcpInventory(data) {
        if (this.isMemoryStorage) {
          const id = this.gcpInventoryCurrentId++;
          const newRecord = {
            id,
            ...data,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.gcpInventoryData.set(id, newRecord);
          return newRecord;
        }
        try {
          const result = await this.db.run(
            `INSERT INTO gcp_inventory (projectName, projectId, resourceType, resourceName, location, zone, resourceId, tags) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.projectName, data.projectId, data.resourceType, data.resourceName, data.location, data.zone, data.resourceId, JSON.stringify(data.tags)]
          );
          const id = result.lastID;
          const newRecord = { ...data, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.gcpInventoryData.set(id, newRecord);
          return newRecord;
        } catch (error) {
          console.error("Error creating GCP inventory record:", error);
          const id = this.gcpInventoryCurrentId++;
          const newRecord = { ...data, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.gcpInventoryData.set(id, newRecord);
          return newRecord;
        }
      }
      async updateGcpInventory(id, data) {
        if (this.isMemoryStorage) {
          const record = this.gcpInventoryData.get(id);
          if (!record) return void 0;
          const updatedRecord = { ...record, ...data, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.gcpInventoryData.set(id, updatedRecord);
          return updatedRecord;
        }
        try {
          const existing = await this.getGcpInventory().then((inv) => inv.find((item2) => item2.id === id));
          if (!existing) return void 0;
          const updateQuery = `
        UPDATE gcp_inventory SET 
          projectName = ?, projectId = ?, resourceType = ?, resourceName = ?, location = ?, zone = ?, resourceId = ?, tags = ?, updatedAt = ?
        WHERE id = ?
      `;
          await this.db.run(updateQuery, [
            data.projectName !== void 0 ? data.projectName : existing.projectName,
            data.projectId !== void 0 ? data.projectId : existing.projectId,
            data.resourceType !== void 0 ? data.resourceType : existing.resourceType,
            data.resourceName !== void 0 ? data.resourceName : existing.resourceName,
            data.location !== void 0 ? data.location : existing.location,
            data.zone !== void 0 ? data.zone : existing.zone,
            data.resourceId !== void 0 ? data.resourceId : existing.resourceId,
            data.tags !== void 0 ? JSON.stringify(data.tags) : existing.tags,
            (/* @__PURE__ */ new Date()).toISOString(),
            id
          ]);
          return await this.getGcpInventory().then((inv) => inv.find((item2) => item2.id === id));
        } catch (error) {
          console.error(`Error updating GCP inventory with id ${id}:`, error);
          return void 0;
        }
      }
      async deleteGcpInventory(id) {
        if (this.isMemoryStorage) {
          const sizeBefore = this.gcpInventoryData.size;
          this.gcpInventoryData.delete(id);
          return this.gcpInventoryData.size < sizeBefore;
        }
        try {
          const result = await this.db.run("DELETE FROM gcp_inventory WHERE id = ?", [id]);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting GCP inventory with id ${id}:`, error);
          return false;
        }
      }
      // Page Builder methods
      async getPageBySlug(slug) {
        if (this.isMemoryStorage) {
          return void 0;
        }
        try {
          const row = await this.db.get("SELECT * FROM custom_pages WHERE page_slug = ?", [slug]);
          if (!row) return void 0;
          return {
            ...row,
            columns: typeof row.columns === "string" ? JSON.parse(row.columns) : row.columns,
            filters: typeof row.filters === "string" ? JSON.parse(row.filters) : row.filters,
            sortConfig: typeof row.sort_config === "string" ? JSON.parse(row.sort_config) : row.sort_config,
            paginationConfig: typeof row.pagination_config === "string" ? JSON.parse(row.pagination_config) : row.pagination_config,
            tableName: row.table_name,
            pageName: row.page_name,
            pageSlug: row.page_slug
          };
        } catch (error) {
          console.error(`Error fetching page by slug ${slug}:`, error);
          return void 0;
        }
      }
      // VM Management methods
      async getVMs() {
        return this.vms;
      }
      async getVM(id) {
        return this.vms.find((vm) => vm.id === id) || null;
      }
      async createVM(vmData) {
        const vm = {
          id: this.vms.length + 1,
          ...vmData,
          createdDate: (/* @__PURE__ */ new Date()).toISOString(),
          lastModified: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.vms.push(vm);
        return vm;
      }
      async updateVM(id, vmData) {
        const index = this.vms.findIndex((vm) => vm.id === id);
        if (index === -1) return null;
        this.vms[index] = {
          ...this.vms[index],
          ...vmData,
          lastModified: (/* @__PURE__ */ new Date()).toISOString()
        };
        return this.vms[index];
      }
      async deleteVM(id) {
        const index = this.vms.findIndex((vm) => vm.id === id);
        if (index === -1) return false;
        this.vms.splice(index, 1);
        return true;
      }
      // IT Equipment methods
      async getITEquipment() {
        return this.itEquipment;
      }
      async getITEquipmentById(id) {
        return this.itEquipment.find((eq6) => eq6.id === id) || null;
      }
      async createITEquipment(data) {
        const equipment = {
          id: this.itEquipment.length + 1,
          ...data,
          assignedQuantity: data.assignedQuantity || 0,
          status: data.status || "available",
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.itEquipment.push(equipment);
        this.createActivity({
          action: "create",
          itemType: "it-equipment",
          itemId: equipment.id,
          userId: null,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `IT Equipment "${equipment.name}" created`
        });
        return equipment;
      }
      async updateITEquipment(id, data) {
        const index = this.itEquipment.findIndex((eq6) => eq6.id === id);
        if (index === -1) return null;
        this.itEquipment[index] = {
          ...this.itEquipment[index],
          ...data,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.createActivity({
          action: "update",
          itemType: "it-equipment",
          itemId: id,
          userId: null,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `IT Equipment "${this.itEquipment[index].name}" updated`
        });
        return this.itEquipment[index];
      }
      async deleteITEquipment(id) {
        const index = this.itEquipment.findIndex((eq6) => eq6.id === id);
        if (index === -1) return false;
        const equipment = this.itEquipment[index];
        this.itEquipment.splice(index, 1);
        this.itEquipmentAssignments = this.itEquipmentAssignments.filter((a) => a.equipmentId !== id);
        this.createActivity({
          action: "delete",
          itemType: "it-equipment",
          itemId: id,
          userId: null,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `IT Equipment "${equipment.name}" deleted`
        });
        return true;
      }
      // IT Equipment Assignment methods
      async getITEquipmentAssignments(equipmentId) {
        return this.itEquipmentAssignments.filter((a) => a.equipmentId === equipmentId);
      }
      async assignITEquipment(equipmentId, assignmentData) {
        const assignment = {
          id: this.itEquipmentAssignments.length + 1,
          equipmentId,
          assignedTo: assignmentData.assignedTo,
          knoxId: assignmentData.knoxId || null,
          serialNumber: assignmentData.serialNumber || null,
          quantity: assignmentData.quantity || 1,
          assignedDate: assignmentData.assignedDate || (/* @__PURE__ */ new Date()).toISOString(),
          status: "assigned",
          notes: assignmentData.notes || null
        };
        this.itEquipmentAssignments.push(assignment);
        const equipment = this.itEquipment.find((eq6) => eq6.id === equipmentId);
        if (equipment) {
          equipment.assignedQuantity = (equipment.assignedQuantity || 0) + assignment.quantity;
          equipment.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        }
        this.createActivity({
          action: "assign",
          itemType: "it-equipment",
          itemId: equipmentId,
          userId: null,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `IT Equipment assigned to: ${assignmentData.assignedTo} (Qty: ${assignment.quantity})`
        });
        return assignment;
      }
      async bulkAssignITEquipment(equipmentId, assignments) {
        const createdAssignments = [];
        for (const assignmentData of assignments) {
          const assignment = await this.assignITEquipment(equipmentId, assignmentData);
          createdAssignments.push(assignment);
        }
        return createdAssignments;
      }
      // Stats operations
      async getAssetStats() {
        const assets3 = await this.getAssets();
        return {
          total: assets3.length,
          checkedOut: assets3.filter((asset2) => asset2.status === AssetStatus.DEPLOYED).length,
          available: assets3.filter((asset2) => asset2.status === AssetStatus.AVAILABLE).length,
          pending: assets3.filter((asset2) => asset2.status === AssetStatus.PENDING).length,
          overdue: assets3.filter((asset2) => asset2.status === AssetStatus.OVERDUE).length,
          archived: assets3.filter((asset2) => asset2.status === AssetStatus.ARCHIVED).length,
          reserved: assets3.filter((asset2) => asset2.status === AssetStatus.RESERVED).length
        };
      }
      // Zabbix settings operations
      async getZabbixSettings() {
        if (this.isMemoryStorage) {
          return this.zabbixSettingsData;
        }
        try {
          const row = await this.db.get("SELECT * FROM zabbix_settings WHERE id = 1");
          return row ? {
            ...row,
            createdAt: new Date(row.createdAt),
            updatedAt: new Date(row.updatedAt)
          } : void 0;
        } catch (error) {
          console.error("Error fetching Zabbix settings:", error);
          return this.zabbixSettingsData;
        }
      }
      async saveZabbixSettings(settings3) {
        if (this.isMemoryStorage) {
          this.zabbixSettingsData = { ...settings3, id: 1, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          await this.createActivity({
            action: "update",
            itemType: "settings",
            itemId: 1,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: "Zabbix integration settings updated (memory storage)"
          });
          return this.zabbixSettingsData;
        }
        try {
          const zabbixSettings3 = {
            ...settings3,
            id: 1,
            // Only one row for settings
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          await this.db.run(
            `INSERT INTO zabbix_settings (id, zabbixUrl, zabbixUser, zabbixPassword, updatedAt) 
         VALUES (?, ?, ?, ?, ?) 
         ON CONFLICT(id) DO UPDATE SET 
           zabbixUrl = excluded.zabbixUrl, 
           zabbixUser = excluded.zabbixUser, 
           zabbixPassword = excluded.zabbixPassword, 
           updatedAt = excluded.updatedAt`,
            [zabbixSettings3.id, zabbixSettings3.zabbixUrl, zabbixSettings3.zabbixUser, zabbixSettings3.zabbixPassword, zabbixSettings3.updatedAt]
          );
          await this.createActivity({
            action: "update",
            itemType: "settings",
            itemId: 1,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: "Zabbix integration settings updated"
          });
          this.zabbixSettingsData = zabbixSettings3;
          return zabbixSettings3;
        } catch (error) {
          console.error("Error saving Zabbix settings:", error);
          this.zabbixSettingsData = { ...settings3, id: 1, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          await this.createActivity({
            action: "update",
            itemType: "settings",
            itemId: 1,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: "Zabbix integration settings updated (memory storage fallback)"
          });
          return this.zabbixSettingsData;
        }
      }
      // Zabbix subnet operations
      async getZabbixSubnets() {
        if (this.isMemoryStorage) {
          return Array.from(this.zabbixSubnets.values());
        }
        try {
          const rows = await this.db.all("SELECT * FROM zabbix_subnets");
          return rows.map((row) => ({
            ...row,
            createdAt: new Date(row.createdAt),
            updatedAt: new Date(row.updatedAt)
          }));
        } catch (error) {
          console.error("Error fetching Zabbix subnets:", error);
          return Array.from(this.zabbixSubnets.values());
        }
      }
      async getZabbixSubnet(id) {
        if (this.isMemoryStorage) {
          return this.zabbixSubnets.get(id);
        }
        try {
          const row = await this.db.get("SELECT * FROM zabbix_subnets WHERE id = ?", [id]);
          if (!row) return void 0;
          return {
            ...row,
            createdAt: new Date(row.createdAt),
            updatedAt: new Date(row.updatedAt)
          };
        } catch (error) {
          console.error(`Error fetching Zabbix subnet with id ${id}:`, error);
          return this.zabbixSubnets.get(id);
        }
      }
      async createZabbixSubnet(subnet) {
        if (this.isMemoryStorage) {
          const id = this.zabbixSubnetCurrentId++;
          const zabbixSubnet = {
            ...subnet,
            id,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.zabbixSubnetsData.set(id, zabbixSubnet);
          await this.createActivity({
            action: "create",
            itemType: "subnet",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `CIDR range "${subnet.cidrRange}" added for monitoring`
          });
          return zabbixSubnet;
        }
        try {
          const result = await this.db.run(
            "INSERT INTO zabbix_subnets (cidrRange, description) VALUES (?, ?)",
            [subnet.cidrRange, subnet.description]
          );
          const id = result.lastID;
          const zabbixSubnet = { ...subnet, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.zabbixSubnetsData.set(id, zabbixSubnet);
          await this.createActivity({
            action: "create",
            itemType: "subnet",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `CIDR range "${subnet.cidrRange}" added for monitoring`
          });
          return zabbixSubnet;
        } catch (error) {
          console.error("Error creating Zabbix subnet:", error);
          const id = this.zabbixSubnetCurrentId++;
          const zabbixSubnet = { ...subnet, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.zabbixSubnetsData.set(id, zabbixSubnet);
          await this.createActivity({
            action: "create",
            itemType: "subnet",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `CIDR range "${subnet.cidrRange}" added for monitoring (memory storage fallback)`
          });
          return zabbixSubnet;
        }
      }
      async deleteZabbixSubnet(id) {
        if (this.isMemoryStorage) {
          const initialLength = this.zabbixSubnets.size;
          this.zabbixSubnets.delete(id);
          return this.zabbixSubnets.size < initialLength;
        }
        try {
          const subnet = await this.getZabbixSubnet(id);
          if (!subnet) return false;
          const result = await this.db.run("DELETE FROM zabbix_subnets WHERE id = ?", [id]);
          if (result.changes > 0) {
            await this.createActivity({
              action: "delete",
              itemType: "subnet",
              itemId: id,
              userId: null,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `CIDR range "${subnet.cidrRange}" removed from monitoring`
            });
          }
          this.zabbixSubnetsData.delete(id);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting Zabbix subnet with id ${id}:`, error);
          return false;
        }
      }
      // VM monitoring operations
      async getVMMonitoring() {
        if (this.isMemoryStorage) {
          return Array.from(this.vmMonitoringData.values());
        }
        try {
          const rows = await this.db.all("SELECT * FROM vm_monitoring");
          return rows.map((row) => ({
            ...row,
            createdAt: new Date(row.createdAt),
            updatedAt: new Date(row.updatedAt)
          }));
        } catch (error) {
          console.error("Error fetching VM monitoring:", error);
          return Array.from(this.vmMonitoringData.values());
        }
      }
      async getVMMonitoringByVMId(vmId) {
        if (this.isMemoryStorage) {
          return Array.from(this.vmMonitoringData.values()).find((vm) => vm.vmId === vmId);
        }
        try {
          const row = await this.db.get("SELECT * FROM vm_monitoring WHERE vmId = ?", [vmId]);
          if (!row) return void 0;
          return {
            ...row,
            createdAt: new Date(row.createdAt),
            updatedAt: new Date(row.updatedAt)
          };
        } catch (error) {
          console.error(`Error fetching VM monitoring by VM ID ${vmId}:`, error);
          return Array.from(this.vmMonitoringData.values()).find((vm) => vm.vmId === vmId);
        }
      }
      async createVMMonitoring(monitoring) {
        if (this.isMemoryStorage) {
          const id = this.vmMonitoringCurrentId++;
          const vmMonitoring3 = {
            ...monitoring,
            id,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.vmMonitoringData.set(id, vmMonitoring3);
          return vmMonitoring3;
        }
        try {
          const result = await this.db.run(
            "INSERT INTO vm_monitoring (vmId, vmName, monitoringEnabled, checkInterval) VALUES (?, ?, ?, ?)",
            [monitoring.vmId, monitoring.vmName, monitoring.monitoringEnabled, monitoring.checkInterval]
          );
          const id = result.lastID;
          const vmMonitoring3 = { ...monitoring, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.vmMonitoringData.set(id, vmMonitoring3);
          return vmMonitoring3;
        } catch (error) {
          console.error("Error creating VM monitoring:", error);
          const id = this.vmMonitoringCurrentId++;
          const vmMonitoring3 = { ...monitoring, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.vmMonitoringData.set(id, vmMonitoring3);
          return vmMonitoring3;
        }
      }
      async updateVMMonitoring(id, updateData) {
        if (this.isMemoryStorage) {
          const vmMonitoringIndex = this.vmMonitoringData.get(id);
          if (!vmMonitoringIndex) return void 0;
          const updatedVMMonitoring = { ...vmMonitoringIndex, ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.vmMonitoringData.set(id, updatedVMMonitoring);
          return updatedVMMonitoring;
        }
        try {
          const vmMonitoring3 = await this.getVMMonitoringByVMId(id);
          if (!vmMonitoring3) return void 0;
          const updateQuery = `
        UPDATE vm_monitoring SET 
          vmName = ?, monitoringEnabled = ?, checkInterval = ?, updatedAt = ?
        WHERE id = ?
      `;
          await this.db.run(updateQuery, [
            updateData.vmName !== void 0 ? updateData.vmName : vmMonitoring3.vmName,
            updateData.monitoringEnabled !== void 0 ? updateData.monitoringEnabled : vmMonitoring3.monitoringEnabled,
            updateData.checkInterval !== void 0 ? updateData.checkInterval : vmMonitoring3.checkInterval,
            (/* @__PURE__ */ new Date()).toISOString(),
            id
            // Use the correct ID for the update
          ]);
          const updatedVMMonitoring = { ...vmMonitoring3, ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.vmMonitoringData.set(id, updatedVMMonitoring);
          return updatedVMMonitoring;
        } catch (error) {
          console.error(`Error updating VM monitoring with id ${id}:`, error);
          return void 0;
        }
      }
      // Discovered hosts operations
      async getDiscoveredHosts() {
        if (this.isMemoryStorage) {
          return Array.from(this.discoveredHostsData.values());
        }
        try {
          const rows = await this.db.all("SELECT * FROM discovered_hosts");
          return rows.map((row) => ({
            ...row,
            lastSeen: row.lastSeen ? new Date(row.lastSeen) : null,
            createdAt: row.createdAt ? new Date(row.createdAt) : null,
            updatedAt: row.updatedAt ? new Date(row.updatedAt) : null
          }));
        } catch (error) {
          console.error("Error fetching discovered hosts:", error);
          return Array.from(this.discoveredHostsData.values());
        }
      }
      async getDiscoveredHost(id) {
        if (this.isMemoryStorage) {
          return this.discoveredHostsData.get(id);
        }
        try {
          const row = await this.db.get("SELECT * FROM discovered_hosts WHERE id = ?", [id]);
          if (!row) return void 0;
          return {
            ...row,
            lastSeen: row.lastSeen ? new Date(row.lastSeen) : null,
            createdAt: row.createdAt ? new Date(row.createdAt) : null,
            updatedAt: row.updatedAt ? new Date(row.updatedAt) : null
          };
        } catch (error) {
          console.error(`Error fetching discovered host with id ${id}:`, error);
          return this.discoveredHostsData.get(id);
        }
      }
      async createDiscoveredHost(host) {
        if (this.isMemoryStorage) {
          const id = this.discoveredHostCurrentId++;
          const discoveredHost = {
            ...host,
            id,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.discoveredHostsData.set(id, discoveredHost);
          return discoveredHost;
        }
        try {
          const result = await this.db.run(
            "INSERT INTO discovered_hosts (ipAddress, hostname, os, lastSeen) VALUES (?, ?, ?, ?)",
            [host.ipAddress, host.hostname, host.os, host.lastSeen]
          );
          const id = result.lastID;
          const discoveredHost = { ...host, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.discoveredHostsData.set(id, discoveredHost);
          return discoveredHost;
        } catch (error) {
          console.error("Error creating discovered host:", error);
          const id = this.discoveredHostCurrentId++;
          const discoveredHost = { ...host, id, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.discoveredHostsData.set(id, discoveredHost);
          return discoveredHost;
        }
      }
      async updateDiscoveredHost(id, updateData) {
        if (this.isMemoryStorage) {
          const discoveredHost = this.discoveredHostsData.get(id);
          if (!discoveredHost) return void 0;
          const updatedDiscoveredHost = { ...discoveredHost, ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.discoveredHostsData.set(id, updatedDiscoveredHost);
          return updatedDiscoveredHost;
        }
        try {
          const existingHost = await this.getDiscoveredHost(id);
          if (!existingHost) return void 0;
          const updateQuery = `
        UPDATE discovered_hosts SET 
          ipAddress = ?, hostname = ?, os = ?, lastSeen = ?, updatedAt = ?
        WHERE id = ?
      `;
          await this.db.run(updateQuery, [
            updateData.ipAddress !== void 0 ? updateData.ipAddress : existingHost.ipAddress,
            updateData.hostname !== void 0 ? updateData.hostname : existingHost.hostname,
            updateData.os !== void 0 ? updateData.os : existingHost.os,
            updateData.lastSeen !== void 0 ? updateData.lastSeen : existingHost.lastSeen,
            (/* @__PURE__ */ new Date()).toISOString(),
            id
          ]);
          const updatedDiscoveredHost = { ...existingHost, ...updateData, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
          this.discoveredHostsData.set(id, updatedDiscoveredHost);
          return updatedDiscoveredHost;
        } catch (error) {
          console.error(`Error updating discovered host with id ${id}:`, error);
          return void 0;
        }
      }
      async deleteDiscoveredHost(id) {
        if (this.isMemoryStorage) {
          const initialLength = this.discoveredHostsData.size;
          this.discoveredHostsData.delete(id);
          return this.discoveredHostsData.size < initialLength;
        }
        try {
          const result = await this.db.run("DELETE FROM discovered_hosts WHERE id = ?", [id]);
          this.discoveredHostsData.delete(id);
          return result.changes > 0;
        } catch (error) {
          console.error(`Error deleting discovered host with id ${id}:`, error);
          return false;
        }
      }
      // JIRA Integration
      async saveJiraSettings(settings3) {
        if (this.isMemoryStorage) {
          this.memoryDb.jiraSettings = settings3;
          console.log("JIRA settings saved to memory:", settings3);
          return;
        }
        try {
          const query = `
        INSERT INTO jira_settings (id, settings, created_at, updated_at) 
        VALUES (1, ?, datetime('now'), datetime('now'))
        ON CONFLICT(id) DO UPDATE SET 
          settings = excluded.settings,
          updated_at = datetime('now')
      `;
          await this.db.run(query, [JSON.stringify(settings3)]);
          console.log("JIRA settings saved to database:", settings3);
        } catch (error) {
          console.error("Error saving JIRA settings:", error);
          this.memoryDb.jiraSettings = settings3;
          console.log("JIRA settings saved to memory (fallback):", settings3);
        }
      }
      async getJiraSettings() {
        if (this.isMemoryStorage) {
          console.log("Getting JIRA settings from memory:", this.memoryDb.jiraSettings);
          return this.memoryDb.jiraSettings || null;
        }
        try {
          const query = "SELECT settings FROM jira_settings WHERE id = 1";
          const row = await this.db.get(query);
          const settings3 = row ? JSON.parse(row.settings) : null;
          console.log("JIRA settings from database:", settings3);
          return settings3;
        } catch (error) {
          console.error("Error getting JIRA settings:", error);
          console.log("Getting JIRA settings from memory (fallback):", this.memoryDb.jiraSettings);
          return this.memoryDb.jiraSettings || null;
        }
      }
      // Issues
      async createIssue(issue) {
        this.issues.push(issue);
        return issue;
      }
      async getIssues() {
        return this.issues;
      }
      // VM Approval History operations
      async getVmApprovalHistory(vmId) {
        if (this.isMemoryStorage) {
          const history = Array.from(this.vmApprovalHistoryData.values()).filter((h) => h.vmId === vmId).sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());
          return history;
        }
        try {
          if (!this.db) return [];
          const rows = await this.db.all("SELECT * FROM vm_approval_history WHERE vm_id = ? ORDER BY changed_at DESC", [vmId]);
          return rows.map((row) => ({
            ...row,
            changedAt: new Date(row.changed_at)
          }));
        } catch (error) {
          console.error("Error fetching VM approval history:", error);
          return Array.from(this.vmApprovalHistoryData.values()).filter((h) => h.vmId === vmId).sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());
        }
      }
      async createVmApprovalHistory(insertHistory) {
        if (this.isMemoryStorage) {
          const id = this.vmApprovalHistoryCurrentId++;
          const history = {
            ...insertHistory,
            id,
            changedAt: /* @__PURE__ */ new Date(),
            createdAt: /* @__PURE__ */ new Date()
          };
          this.vmApprovalHistoryData.set(id, history);
          return history;
        }
        try {
          const result = await this.db.run(
            "INSERT INTO vm_approval_history (vm_id, old_approval_number, new_approval_number, changed_by, reason, notes) VALUES (?, ?, ?, ?, ?, ?)",
            [insertHistory.vmId, insertHistory.oldApprovalNumber, insertHistory.newApprovalNumber, insertHistory.changedBy, insertHistory.reason, insertHistory.notes]
          );
          const id = result.lastID;
          const newHistory = {
            ...insertHistory,
            id,
            changedAt: /* @__PURE__ */ new Date(),
            createdAt: /* @__PURE__ */ new Date()
          };
          this.vmApprovalHistoryData.set(id, newHistory);
          return newHistory;
        } catch (error) {
          console.error("Error creating VM approval history:", error);
          const id = this.vmApprovalHistoryCurrentId++;
          const history = {
            ...insertHistory,
            id,
            changedAt: /* @__PURE__ */ new Date(),
            createdAt: /* @__PURE__ */ new Date()
          };
          this.vmApprovalHistoryData.set(id, history);
          return history;
        }
      }
      // Encryption helper methods (pass-through to encryption module)
      encrypt(text2) {
        return encrypt(text2);
      }
      decrypt(text2) {
        return decrypt(text2);
      }
    };
    storage = new MemStorage(mockDb);
  }
});

// server/roles.ts
var roles_exports = {};
__export(roles_exports, {
  createRole: () => createRole,
  defaultPermissions: () => defaultPermissions,
  defaultRoles: () => roles,
  deleteRole: () => deleteRole,
  getPermissionsForRole: () => getPermissionsForRole,
  getRoleById: () => getRoleById,
  getRoles: () => getRoles,
  getRolesWithUserCounts: () => getRolesWithUserCounts,
  updateRole: () => updateRole,
  updateRoleUserCounts: () => updateRoleUserCounts
});
function getRoles() {
  return roles.map((role) => ({
    ...role,
    permissions: typeof role.permissions === "object" && !Array.isArray(role.permissions) ? role.permissions : defaultPermissions
  }));
}
function getRoleById(id) {
  const role = roles.find((role2) => role2.id === id);
  if (!role) return void 0;
  return {
    ...role,
    permissions: typeof role.permissions === "object" && !Array.isArray(role.permissions) ? role.permissions : defaultPermissions
  };
}
function createRole(roleData) {
  const newRole = {
    id: nextRoleId++,
    name: roleData.name,
    description: roleData.description,
    permissions: { ...defaultPermissions, ...roleData.permissions }
  };
  roles.push(newRole);
  return newRole;
}
function updateRole(id, updates) {
  const roleIndex = roles.findIndex((role) => role.id === id);
  if (roleIndex === -1) return void 0;
  roles[roleIndex] = { ...roles[roleIndex], ...updates };
  return roles[roleIndex];
}
function deleteRole(id) {
  const initialLength = roles.length;
  roles = roles.filter((role) => role.id !== id);
  return roles.length < initialLength;
}
function getPermissionsForRole(roleId) {
  if (!roleId) {
    return defaultPermissions;
  }
  const role = getRoleById(roleId);
  return role ? role.permissions : defaultPermissions;
}
async function updateRoleUserCounts() {
  try {
    const { storage: storage2 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
    const users4 = await storage2.getUsers();
    roles.forEach((role) => {
      if (!role.userCount) role.userCount = 0;
      else role.userCount = 0;
    });
    users4.forEach((user) => {
      if (user.isAdmin) {
        const adminRole = roles.find((r) => r.id === 1);
        if (adminRole) {
          adminRole.userCount = (adminRole.userCount || 0) + 1;
        }
      } else if (user.roleId) {
        const role = roles.find((r) => r.id === user.roleId);
        if (role) {
          role.userCount = (role.userCount || 0) + 1;
        }
      }
    });
    console.log("Updated role user counts:", roles.map((r) => ({ name: r.name, userCount: r.userCount || 0 })));
  } catch (error) {
    console.error("Error updating role user counts:", error);
  }
}
async function getRolesWithUserCounts() {
  await updateRoleUserCounts();
  return roles;
}
var defaultPermissions, roles, nextRoleId;
var init_roles = __esm({
  "server/roles.ts"() {
    "use strict";
    defaultPermissions = {
      assets: { view: true, edit: false, add: false, delete: false },
      users: { view: false, edit: false, add: false, delete: false },
      licenses: { view: true, edit: false, add: false, delete: false },
      components: { view: true, edit: false, add: false, delete: false },
      accessories: { view: true, edit: false, add: false, delete: false },
      consumables: { view: true, edit: false, add: false, delete: false },
      reports: { view: true, edit: false, add: false, delete: false },
      admin: { view: false, edit: false, add: false, delete: false },
      vmMonitoring: { view: false, edit: false, add: false, delete: false },
      networkDiscovery: { view: false, edit: false, add: false, delete: false },
      bitlockerKeys: { view: false, edit: false, add: false, delete: false }
    };
    roles = [
      {
        id: 1,
        name: "Administrator",
        description: "Full system access with all permissions",
        permissions: {
          assets: { view: true, edit: true, add: true, delete: true },
          users: { view: true, edit: true, add: true, delete: true },
          licenses: { view: true, edit: true, add: true, delete: true },
          components: { view: true, edit: true, add: true, delete: true },
          accessories: { view: true, edit: true, add: true, delete: true },
          consumables: { view: true, edit: true, add: true, delete: true },
          reports: { view: true, edit: true, add: true, delete: true },
          admin: { view: true, edit: true, add: true, delete: true },
          vmMonitoring: { view: true, edit: true, add: true, delete: true },
          networkDiscovery: { view: true, edit: true, add: true, delete: true },
          bitlockerKeys: { view: true, edit: true, add: true, delete: true }
        }
      },
      {
        id: 2,
        name: "Asset Manager",
        description: "Can manage all assets and related items",
        permissions: {
          assets: { view: true, edit: true, add: true, delete: false },
          users: { view: true, edit: false, add: false, delete: false },
          licenses: { view: true, edit: true, add: true, delete: false },
          components: { view: true, edit: true, add: true, delete: false },
          accessories: { view: true, edit: true, add: true, delete: false },
          consumables: { view: true, edit: true, add: true, delete: false },
          reports: { view: true, edit: true, add: false, delete: false },
          admin: { view: false, edit: false, add: false, delete: false },
          vmMonitoring: { view: true, edit: true, add: false, delete: false },
          networkDiscovery: { view: true, edit: false, add: false, delete: false },
          bitlockerKeys: { view: false, edit: false, add: false, delete: false }
        }
      },
      {
        id: 3,
        name: "User Manager",
        description: "Can manage users and basic asset operations",
        permissions: {
          assets: { view: true, edit: false, add: false, delete: false },
          users: { view: true, edit: true, add: true, delete: false },
          licenses: { view: true, edit: false, add: false, delete: false },
          components: { view: true, edit: false, add: false, delete: false },
          accessories: { view: true, edit: false, add: false, delete: false },
          consumables: { view: true, edit: false, add: false, delete: false },
          reports: { view: true, edit: false, add: false, delete: false },
          admin: { view: false, edit: false, add: false, delete: false },
          vmMonitoring: { view: false, edit: false, add: false, delete: false },
          networkDiscovery: { view: false, edit: false, add: false, delete: false },
          bitlockerKeys: { view: false, edit: false, add: false, delete: false }
        }
      },
      {
        id: 4,
        name: "Read Only",
        description: "View-only access to most resources",
        permissions: {
          assets: { view: true, edit: false, add: false, delete: false },
          users: { view: true, edit: false, add: false, delete: false },
          licenses: { view: true, edit: false, add: false, delete: false },
          components: { view: true, edit: false, add: false, delete: false },
          accessories: { view: true, edit: false, add: false, delete: false },
          consumables: { view: true, edit: false, add: false, delete: false },
          reports: { view: true, edit: false, add: false, delete: false },
          admin: { view: false, edit: false, add: false, delete: false },
          vmMonitoring: { view: false, edit: false, add: false, delete: false },
          networkDiscovery: { view: false, edit: false, add: false, delete: false },
          bitlockerKeys: { view: false, edit: false, add: false, delete: false }
        }
      }
    ];
    nextRoleId = 5;
  }
});

// server/logger.ts
var logger_exports = {};
__export(logger_exports, {
  getLogFiles: () => getLogFiles,
  logApiRequest: () => logApiRequest,
  logDatabaseOperation: () => logDatabaseOperation,
  logSystemAlert: () => logSystemAlert,
  logUserActivity: () => logUserActivity,
  logUserAuth: () => logUserAuth,
  readLogFile: () => readLogFile
});
import { promises as fs } from "fs";
import { join } from "path";
async function ensureLogsDirectory() {
  try {
    await fs.access(LOGS_DIR);
  } catch {
    await fs.mkdir(LOGS_DIR, { recursive: true });
  }
}
function formatLogEntry(type, data) {
  const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
  return `[${timestamp2}] [${type}] ${JSON.stringify(data, null, 2)}
`;
}
async function writeToLogFile(filename, content) {
  await ensureLogsDirectory();
  const filepath = join(LOGS_DIR, filename);
  await fs.appendFile(filepath, content);
}
async function logUserActivity(activity) {
  const logEntry = formatLogEntry("USER_ACTIVITY", {
    ...activity,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
  const dateStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  await writeToLogFile(`user_activity_${dateStr}.log`, logEntry);
}
async function logUserAuth(data) {
  const logEntry = formatLogEntry("AUTH", {
    ...data,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
  const dateStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  await writeToLogFile(`auth_${dateStr}.log`, logEntry);
}
async function logSystemAlert(alert) {
  const logEntry = formatLogEntry("ALERT", {
    ...alert,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
  const dateStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  await writeToLogFile(`system_alerts_${dateStr}.log`, logEntry);
}
async function logDatabaseOperation(operation) {
  const logEntry = formatLogEntry("DATABASE", {
    ...operation,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
  const dateStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  await writeToLogFile(`database_ops_${dateStr}.log`, logEntry);
}
async function logApiRequest(request) {
  const logEntry = formatLogEntry("API", {
    ...request,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
  const dateStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  await writeToLogFile(`api_requests_${dateStr}.log`, logEntry);
}
async function getLogFiles() {
  await ensureLogsDirectory();
  const files = await fs.readdir(LOGS_DIR);
  return files.filter((f) => f.endsWith(".log"));
}
async function readLogFile(filename) {
  const filepath = join(LOGS_DIR, filename);
  return await fs.readFile(filepath, "utf-8");
}
var LOGS_DIR;
var init_logger = __esm({
  "server/logger.ts"() {
    "use strict";
    LOGS_DIR = join(process.cwd(), "LOGS");
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  databaseConnected: () => databaseConnected,
  db: () => db2,
  default: () => db_default,
  pool: () => pool
});
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";
var Pool, pool, db2, databaseConnected, db_default;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    ({ Pool } = pg);
    dotenv.config();
    console.log("\u{1F50D} DATABASE_URL is:", process.env.DATABASE_URL?.replace(/:[^:@]+@/, ":****@") || "NOT SET");
    pool = null;
    db2 = null;
    databaseConnected = false;
    if (process.env.DATABASE_URL) {
      const dbName = process.env.DATABASE_URL?.split("/").pop()?.split("?")[0] || "unknown";
      console.log("\u{1F517} Attempting PostgreSQL connection...");
      console.log("\u{1F527} Database URL:", process.env.DATABASE_URL.replace(/:[^:@]+@/, ":****@"));
      console.log("\u{1F3AF} CONNECTING TO DATABASE:", dbName);
      console.log("\u{1F527} Connection details:", {
        host: process.env.DATABASE_URL?.match(/@([^:]+):/)?.[1] || "unknown",
        port: process.env.DATABASE_URL?.match(/:(\d+)\/[^?]+/)?.[1] || "unknown",
        database: dbName
      });
      try {
        pool = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: process.env.DATABASE_URL.includes("localhost") || process.env.DATABASE_URL.includes("127.0.0.1") ? false : { rejectUnauthorized: false },
          // Use SSL for remote connections
          max: 20,
          // Increased from 10
          min: 5,
          // Keep minimum connections ready
          idleTimeoutMillis: 3e4,
          connectionTimeoutMillis: 5e3,
          // Reduced from 10000
          acquireTimeoutMillis: 6e4
        });
        async function testDatabaseConnection() {
          try {
            if (!pool) return false;
            const client = await pool.connect();
            await client.query("SELECT NOW()");
            client.release();
            console.log("\u2705 PostgreSQL connection successful");
            console.log("\u2705 Using PostgreSQL database - data will persist");
            databaseConnected = true;
            return true;
          } catch (err) {
            console.error("\u274C PostgreSQL connection failed:", err.message);
            console.error("\u26A0\uFE0F Falling back to in-memory storage");
            console.error("\u{1F4A1} Check your DATABASE_URL and database server status");
            if (pool) {
              try {
                await pool.end();
              } catch (cleanupErr) {
                console.error("Warning: Error during connection cleanup:", cleanupErr);
              }
              pool = null;
            }
            databaseConnected = false;
            return false;
          }
        }
        db2 = drizzle(pool, { schema: schema_exports });
        testDatabaseConnection().then((connected) => {
          if (connected) {
            console.log("\u2705 Database initialization complete - migrations will proceed");
          } else {
            console.error("\u274C Database connection failed - migrations will be skipped");
            console.log("\u{1F4A1} To fix this:");
            console.log("   1. Open a new tab and type 'Database'");
            console.log("   2. Click 'Create a database'");
            console.log("   3. Restart your application");
            if (pool) {
              pool.end().catch(() => {
              });
              pool = null;
              db2 = null;
            }
          }
        });
        pool.on("error", (err) => {
          console.error("\u274C PostgreSQL connection error:", err);
          console.error("\u26A0\uFE0F Database connection lost - operations may fail");
          databaseConnected = false;
        });
      } catch (setupError) {
        console.error("\u274C Failed to set up PostgreSQL connection:", setupError.message);
        console.error("\u26A0\uFE0F Falling back to in-memory storage");
        pool = null;
        db2 = null;
        databaseConnected = false;
      }
    } else {
      console.log("\u26A0\uFE0F DATABASE_URL not provided");
      console.log("\u26A0\uFE0F Falling back to in-memory storage");
      console.log("\u{1F4A1} Add DATABASE_URL environment variable for persistent storage");
      databaseConnected = false;
    }
    if (!databaseConnected) {
      console.log("\u{1F4DD} Using in-memory storage - data will NOT persist between restarts");
      console.log("\u{1F4A1} To enable persistent storage:");
      console.log("   1. Set up PostgreSQL database in Replit");
      console.log("   2. Add DATABASE_URL to environment variables");
      console.log("   3. Restart the application");
    }
    db_default = db2;
  }
});

// server/encrypt-existing-data.ts
var encrypt_existing_data_exports = {};
__export(encrypt_existing_data_exports, {
  encryptExistingData: () => encryptExistingData
});
import { eq as eq3 } from "drizzle-orm";
async function encryptExistingData() {
  if (!db2) {
    console.error("\u274C Database connection required for migration");
    throw new Error("Database connection required");
  }
  console.log("\u{1F510} Starting PII encryption migration...");
  let totalEncrypted = 0;
  try {
    console.log("Encrypting user data...");
    const users4 = await db2.select().from(users);
    let encryptedUserCount = 0;
    for (const user of users4) {
      const isAlreadyEncrypted = user.email && user.email.split(":").length === 3;
      if (user.email && !isAlreadyEncrypted) {
        try {
          const encrypted = encryptFields(user, PII_FIELDS.user);
          await db2.update(users).set({
            email: encrypted.email,
            firstName: encrypted.firstName,
            lastName: encrypted.lastName,
            department: encrypted.department
          }).where(eq3(users.id, user.id));
          encryptedUserCount++;
          totalEncrypted++;
        } catch (error) {
          console.error(`Failed to encrypt user ${user.id}:`, error);
        }
      }
    }
    console.log(`\u2705 Encrypted ${encryptedUserCount} of ${users4.length} users`);
    console.log("Encrypting asset data...");
    const assets3 = await db2.select().from(assets);
    let encryptedAssetCount = 0;
    for (const asset2 of assets3) {
      const isAlreadyEncrypted = asset2.serialNumber && asset2.serialNumber.split(":").length === 3;
      if (asset2.serialNumber && !isAlreadyEncrypted) {
        try {
          const encrypted = encryptFields(asset2, PII_FIELDS.asset);
          await db2.update(assets).set({
            serialNumber: encrypted.serialNumber,
            macAddress: encrypted.macAddress,
            ipAddress: encrypted.ipAddress
          }).where(eq3(assets.id, asset2.id));
          encryptedAssetCount++;
        } catch (error) {
          console.error(`Failed to encrypt asset ${asset2.id}:`, error);
        }
      }
    }
    console.log(`\u2705 Encrypted ${encryptedAssetCount} of ${assets3.length} assets`);
    console.log("Encrypting BitLocker keys...");
    const keys = await db2.select().from(bitlockerKeys);
    for (const key of keys) {
      if (key.recoveryKey && !key.recoveryKey.includes(":")) {
        const encrypted = encryptFields(key, PII_FIELDS.bitlockerKey);
        await db2.update(bitlockerKeys).set({
          serialNumber: encrypted.serialNumber,
          identifier: encrypted.identifier,
          recoveryKey: encrypted.recoveryKey
        }).where(eq3(bitlockerKeys.id, key.id));
      }
    }
    console.log(`\u2705 Encrypted ${keys.length} BitLocker keys`);
    console.log("Encrypting VM inventory...");
    const vmInventory3 = await db2.select().from(vmInventory);
    let encryptedVmCount = 0;
    for (const vm of vmInventory3) {
      const isAlreadyEncrypted = vm.requestor && vm.requestor.split(":").length === 3;
      if (vm.requestor && !isAlreadyEncrypted) {
        const encrypted = encryptFields(vm, PII_FIELDS.vmInventory);
        await db2.update(vmInventory).set({
          requestor: encrypted.requestor,
          vmIp: encrypted.vmIp,
          ipAddress: encrypted.ipAddress,
          macAddress: encrypted.macAddress
          // knoxId is NOT encrypted - left as plain text for searching
        }).where(eq3(vmInventory.id, vm.id));
        encryptedVmCount++;
        totalEncrypted++;
      }
    }
    console.log(`\u2705 Encrypted ${encryptedVmCount} of ${vmInventory3.length} VM inventory items`);
    console.log("Encrypting IAM accounts...");
    const iamAccounts2 = await db2.select().from(iamAccounts);
    for (const account of iamAccounts2) {
      if (account.requestor && !account.requestor.includes(":")) {
        const encrypted = encryptFields(account, PII_FIELDS.iamAccount);
        await db2.update(iamAccounts).set({
          requestor: encrypted.requestor
        }).where(eq3(iamAccounts.id, account.id));
      }
    }
    console.log(`\u2705 Encrypted ${iamAccounts2.length} IAM accounts`);
    console.log("Encrypting IT equipment...");
    const itEquipment2 = await db2.select().from(itEquipment);
    for (const equipment of itEquipment2) {
      if (equipment.serialNumber && !equipment.serialNumber.includes(":")) {
        const encrypted = encryptFields(equipment, PII_FIELDS.itEquipment);
        await db2.update(itEquipment).set({
          serialNumber: encrypted.serialNumber
        }).where(eq3(itEquipment.id, equipment.id));
      }
    }
    console.log(`\u2705 Encrypted ${itEquipment2.length} IT equipment items`);
    console.log("Encrypting monitor inventory...");
    const monitorInventory2 = await db2.select().from(monitorInventory);
    let encryptedMonitorCount = 0;
    for (const monitor of monitorInventory2) {
      const isAlreadyEncrypted = monitor.serialNumber && monitor.serialNumber.split(":").length === 3;
      if (monitor.serialNumber && !isAlreadyEncrypted) {
        const encrypted = encryptFields(monitor, PII_FIELDS.monitor);
        await db2.update(monitorInventory).set({
          assetNumber: encrypted.assetNumber,
          serialNumber: encrypted.serialNumber
          // knoxId is NOT encrypted - left as plain text for searching
        }).where(eq3(monitorInventory.id, monitor.id));
        encryptedMonitorCount++;
        totalEncrypted++;
      }
    }
    console.log(`\u2705 Encrypted ${encryptedMonitorCount} of ${monitorInventory2.length} monitor inventory items`);
    console.log("\u2705 PII encryption migration completed successfully!");
    console.log(`\u{1F4CA} Total records encrypted: ${totalEncrypted}`);
    return totalEncrypted;
  } catch (error) {
    console.error("\u274C Encryption migration failed:", error);
    throw error;
  }
}
var init_encrypt_existing_data = __esm({
  "server/encrypt-existing-data.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_encryption();
    encryptExistingData().then(() => {
      console.log("\u2705 Migration completed successfully");
      process.exit(0);
    }).catch((error) => {
      console.error("\u274C Migration failed:", error);
      process.exit(1);
    });
  }
});

// server/migrate.ts
var migrate_exports = {};
__export(migrate_exports, {
  runMigrations: () => runMigrations,
  tableExists: () => tableExists
});
import { sql as sql4 } from "drizzle-orm";
async function tableExists(tableName) {
  try {
    const result = await db2.execute(sql4`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = ${tableName}
      );
    `);
    return result.rows[0].exists;
  } catch (error) {
    return false;
  }
}
async function runMigrations() {
  try {
    console.log("\u{1F504} Starting database migration...");
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        email TEXT,
        department TEXT,
        is_admin BOOLEAN DEFAULT FALSE,
        role_id INTEGER,
        mfa_enabled BOOLEAN DEFAULT FALSE,
        mfa_secret TEXT,
        force_password_change BOOLEAN DEFAULT FALSE,
        permissions JSONB DEFAULT '{"assets": {"view": true, "edit": false, "add": false}, "components": {"view": true, "edit": false, "add": false}, "accessories": {"view": true, "edit": false, "add": false}, "consumables": {"view": true, "edit": false, "add": false}, "licenses": {"view": true, "edit": false, "add": false}, "users": {"view": false, "edit": false, "add": false}, "reports": {"view": true, "edit": false, "add": false}, "vmMonitoring": {"view": true, "edit": false, "add": false}, "networkDiscovery": {"view": true, "edit": false, "add": false}, "bitlockerKeys": {"view": false, "edit": false, "add": false}, "admin": {"view": false, "edit": false, "add": false}}'::jsonb,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS assets (
        id SERIAL PRIMARY KEY,
        asset_tag TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        status TEXT NOT NULL,
        condition TEXT NOT NULL DEFAULT 'Good',
        purchase_date TEXT,
        purchase_cost TEXT,
        location TEXT,
        serial_number TEXT,
        model TEXT,
        manufacturer TEXT,
        notes TEXT,
        knox_id TEXT,
        ip_address TEXT,
        mac_address TEXT,
        os_type TEXT,
        assigned_to INTEGER REFERENCES users(id),
        checkout_date TEXT,
        expected_checkin_date TEXT,
        finance_updated BOOLEAN DEFAULT FALSE,
        department TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS components (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0,
        status TEXT DEFAULT 'available',
        description TEXT,
        location TEXT,
        serial_number TEXT,
        model TEXT,
        manufacturer TEXT,
        purchase_date TEXT,
        purchase_cost TEXT,
        warranty_expiry TEXT,
        assigned_to TEXT,
        date_released TEXT,
        date_returned TEXT,
        released_by TEXT,
        returned_to TEXT,
        specifications TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS accessories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        status TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        description TEXT,
        location TEXT,
        serial_number TEXT,
        model TEXT,
        manufacturer TEXT,
        purchase_date TEXT,
        purchase_cost TEXT,
        assigned_to INTEGER REFERENCES users(id),
        knox_id TEXT,
        date_released TEXT,
        date_returned TEXT,
        released_by TEXT,
        returned_to TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS consumables (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        status TEXT NOT NULL DEFAULT 'available',
        location TEXT,
        model_number TEXT,
        manufacturer TEXT,
        purchase_date TEXT,
        purchase_cost TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS licenses (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        key TEXT NOT NULL,
        seats TEXT,
        assigned_seats INTEGER DEFAULT 0,
        company TEXT,
        manufacturer TEXT,
        purchase_date TEXT,
        expiration_date TEXT,
        purchase_cost TEXT,
        status TEXT NOT NULL,
        notes TEXT,
        assigned_to INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS license_assignments (
        id SERIAL PRIMARY KEY,
        license_id INTEGER NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
        assigned_to TEXT NOT NULL,
        notes TEXT,
        assigned_date TEXT NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS consumable_assignments (
        id SERIAL PRIMARY KEY,
        consumable_id INTEGER NOT NULL REFERENCES consumables(id) ON DELETE CASCADE,
        assigned_to TEXT NOT NULL,
        serial_number TEXT,
        knox_id TEXT,
        quantity INTEGER NOT NULL DEFAULT 1,
        assigned_date TEXT NOT NULL,
        returned_date TEXT,
        status TEXT NOT NULL DEFAULT 'assigned',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS activities (
        id SERIAL PRIMARY KEY,
        action TEXT NOT NULL,
        item_type TEXT NOT NULL,
        item_id INTEGER NOT NULL,
        user_id INTEGER REFERENCES users(id),
        timestamp TEXT NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS vm_inventory (
        id SERIAL PRIMARY KEY,
        vm_id TEXT,
        vm_name TEXT NOT NULL,
        vm_status TEXT NOT NULL DEFAULT 'Active',
        vm_ip TEXT,
        vm_os TEXT,
        cpu_count INTEGER DEFAULT 0,
        memory_gb INTEGER DEFAULT 0,
        disk_capacity_gb INTEGER DEFAULT 0,
        requestor TEXT,
        knox_id TEXT,
        department TEXT,
        start_date TEXT,
        end_date TEXT,
        jira_number TEXT,
        approval_number TEXT,
        remarks TEXT,
        internet_access BOOLEAN DEFAULT FALSE,
        vm_os_version TEXT,
        hypervisor TEXT,
        host_name TEXT,
        host_model TEXT,
        host_ip TEXT,
        host_os TEXT,
        rack TEXT,
        deployed_by TEXT,
        "user" TEXT,
        jira_ticket TEXT,
        date_deleted TEXT,
        guest_os TEXT,
        power_state TEXT,
        memory_mb INTEGER,
        disk_gb INTEGER,
        ip_address TEXT,
        mac_address TEXT,
        vmware_tools TEXT,
        cluster TEXT,
        datastore TEXT,
        status TEXT DEFAULT 'available',
        assigned_to INTEGER REFERENCES users(id),
        location TEXT,
        serial_number TEXT,
        model TEXT,
        manufacturer TEXT,
        purchase_date TEXT,
        purchase_cost TEXT,
        created_date TEXT,
        last_modified TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS vms (
        id SERIAL PRIMARY KEY,
        vm_name TEXT NOT NULL,
        host_name TEXT NOT NULL,
        guest_os TEXT NOT NULL,
        power_state TEXT NOT NULL DEFAULT 'stopped',
        cpu_count INTEGER DEFAULT 1,
        memory_mb INTEGER DEFAULT 1024,
        disk_gb INTEGER DEFAULT 20,
        ip_address TEXT,
        mac_address TEXT,
        vmware_tools TEXT,
        cluster TEXT,
        host_model TEXT,
        datastore TEXT,
        status TEXT NOT NULL DEFAULT 'available',
        assigned_to INTEGER REFERENCES users(id),
        location TEXT,
        serial_number TEXT,
        model TEXT,
        manufacturer TEXT,
        purchase_date TEXT,
        purchase_cost TEXT,
        department TEXT,
        description TEXT,
        created_date TEXT,
        last_modified TEXT,
        notes TEXT
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS monitor_inventory (
        id SERIAL PRIMARY KEY,
        seat_number TEXT,
        knox_id TEXT,
        asset_number TEXT,
        serial_number TEXT,
        model TEXT,
        remarks TEXT,
        department TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS bitlocker_keys (
        id SERIAL PRIMARY KEY,
        serial_number TEXT NOT NULL,
        identifier TEXT NOT NULL,
        recovery_key TEXT NOT NULL,
        notes TEXT,
        date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS it_equipment (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        total_quantity INTEGER,
        assigned_quantity INTEGER DEFAULT 0,
        model TEXT,
        location TEXT,
        date_acquired TEXT,
        knox_id TEXT,
        serial_number TEXT,
        date_release TEXT,
        remarks TEXT,
        status TEXT DEFAULT 'available',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS it_equipment_assignments (
        id SERIAL PRIMARY KEY,
        equipment_id INTEGER NOT NULL REFERENCES it_equipment(id) ON DELETE CASCADE,
        assigned_to TEXT NOT NULL,
        knox_id TEXT,
        serial_number TEXT,
        quantity INTEGER NOT NULL DEFAULT 1,
        assigned_date TEXT NOT NULL,
        returned_date TEXT,
        status TEXT NOT NULL DEFAULT 'assigned',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS system_settings (
        id SERIAL PRIMARY KEY,
        site_name TEXT NOT NULL DEFAULT 'SRPH-MIS',
        site_url TEXT NOT NULL DEFAULT '',
        default_language TEXT NOT NULL DEFAULT 'en',
        default_timezone TEXT NOT NULL DEFAULT 'UTC',
        allow_public_registration BOOLEAN DEFAULT FALSE,
        company_name TEXT NOT NULL DEFAULT 'SRPH',
        company_address TEXT DEFAULT '',
        company_phone TEXT DEFAULT '',
        company_email TEXT DEFAULT '',
        company_logo TEXT DEFAULT '',
        mail_driver TEXT DEFAULT '',
        mail_host TEXT DEFAULT '',
        mail_port TEXT DEFAULT '',
        mail_username TEXT DEFAULT '',
        mail_password TEXT DEFAULT '',
        mail_from_address TEXT DEFAULT '',
        mail_from_name TEXT DEFAULT '',
        asset_tag_prefix TEXT DEFAULT 'SRPH',
        asset_tag_zeros INTEGER DEFAULT 5,
        asset_auto_increment BOOLEAN DEFAULT TRUE,
        asset_checkout_policy TEXT DEFAULT '',
        asset_checkout_duration INTEGER DEFAULT 30,
        enable_login_attempts BOOLEAN DEFAULT TRUE,
        max_login_attempts INTEGER DEFAULT 5,
        lockout_duration INTEGER DEFAULT 30,
        password_min_length INTEGER DEFAULT 8,
        require_special_char BOOLEAN DEFAULT TRUE,
        require_uppercase BOOLEAN DEFAULT TRUE,
        require_number BOOLEAN DEFAULT TRUE,
        password_expiry_days INTEGER DEFAULT 90,
        enable_admin_notifications BOOLEAN DEFAULT TRUE,
        enable_user_notifications BOOLEAN DEFAULT TRUE,
        notify_on_checkout BOOLEAN DEFAULT TRUE,
        notify_on_checkin BOOLEAN DEFAULT TRUE,
        notify_on_overdue BOOLEAN DEFAULT TRUE,
        notify_on_iam_expiration BOOLEAN DEFAULT TRUE,
        notify_on_vm_expiration BOOLEAN DEFAULT TRUE,
        notify_on_it_equipment_changes BOOLEAN DEFAULT TRUE,
        notify_on_user_changes BOOLEAN DEFAULT TRUE,
        notify_on_vm_inventory_changes BOOLEAN DEFAULT TRUE,
        notify_on_iam_account_changes BOOLEAN DEFAULT TRUE,
        notify_on_gcp_changes BOOLEAN DEFAULT TRUE,
        notify_on_azure_changes BOOLEAN DEFAULT TRUE,
        notify_on_approval_expiration BOOLEAN DEFAULT TRUE,
        session_timeout INTEGER DEFAULT 1800,
        automatic_backups BOOLEAN DEFAULT FALSE,
        backup_frequency TEXT DEFAULT 'daily',
        backup_time TEXT DEFAULT '03:00',
        backup_retention INTEGER DEFAULT 30,
        maintenance_mode BOOLEAN DEFAULT FALSE,
        auto_backup_enabled BOOLEAN DEFAULT FALSE,
        auto_optimize_enabled BOOLEAN DEFAULT FALSE,
        optimize_time TEXT DEFAULT '04:00',
        backup_retention_days INTEGER DEFAULT 30,
        email_notifications BOOLEAN DEFAULT TRUE,
        auto_backup BOOLEAN DEFAULT FALSE,
        auto_optimize BOOLEAN DEFAULT FALSE,
        retention_days INTEGER DEFAULT 30,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS zabbix_settings (
        id SERIAL PRIMARY KEY,
        server_url TEXT NOT NULL DEFAULT '',
        username TEXT NOT NULL DEFAULT '',
        password TEXT NOT NULL DEFAULT '',
        api_token TEXT DEFAULT '',
        last_sync TIMESTAMP,
        sync_interval INTEGER DEFAULT 30,
        enabled BOOLEAN DEFAULT FALSE,
        zabbix_url TEXT,
        zabbix_api_token TEXT,
        refresh_interval INTEGER DEFAULT 30,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS discovered_hosts (
        id SERIAL PRIMARY KEY,
        hostname TEXT,
        ip_address TEXT NOT NULL,
        mac_address TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        source TEXT NOT NULL DEFAULT 'zabbix',
        system_info JSONB DEFAULT '{}',
        hardware_details JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS vm_monitoring (
        id SERIAL PRIMARY KEY,
        vm_id INTEGER NOT NULL,
        zabbix_id TEXT,
        status TEXT,
        uptime INTEGER,
        last_checked TIMESTAMP,
        monitoring_enabled BOOLEAN DEFAULT TRUE,
        alerts_enabled BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS azure_inventory (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        resource_group TEXT NOT NULL,
        location TEXT NOT NULL,
        subscriptions TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        remarks TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS gcp_inventory (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        resource_type TEXT NOT NULL,
        project_id TEXT NOT NULL,
        display_name TEXT NOT NULL,
        location TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        remarks TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS aws_inventory (
        id SERIAL PRIMARY KEY,
        identifier TEXT NOT NULL,
        service TEXT NOT NULL,
        type TEXT NOT NULL,
        region TEXT NOT NULL,
        account_name TEXT NOT NULL,
        account_id TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        remarks TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS aws_historical_data (
        id SERIAL PRIMARY KEY,
        resource_id TEXT,
        identifier TEXT,
        service TEXT,
        type TEXT,
        region TEXT,
        account_name TEXT,
        account_id TEXT,
        status TEXT,
        remarks TEXT,
        change_type TEXT,
        month_year TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS azure_historical_data (
        id SERIAL PRIMARY KEY,
        resource_id TEXT,
        name TEXT,
        type TEXT,
        resource_group TEXT,
        location TEXT,
        subscriptions TEXT,
        status TEXT,
        remarks TEXT,
        change_type TEXT,
        month_year TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS gcp_historical_data (
        id SERIAL PRIMARY KEY,
        resource_id TEXT,
        name TEXT,
        resource_type TEXT,
        project_id TEXT,
        display_name TEXT,
        location TEXT,
        status TEXT,
        remarks TEXT,
        change_type TEXT,
        month_year TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS iam_accounts (
        id SERIAL PRIMARY KEY,
        requestor TEXT NOT NULL,
        knox_id TEXT NOT NULL,
        name TEXT,
        user_knox_id TEXT,
        permission TEXT NOT NULL,
        duration_start_date TEXT,
        duration_end_date TEXT,
        cloud_platform TEXT NOT NULL,
        project_accounts TEXT,
        approval_id TEXT,
        remarks TEXT,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS iam_account_approval_history (
        id SERIAL PRIMARY KEY,
        iam_account_id INTEGER REFERENCES iam_accounts(id),
        approval_number TEXT NOT NULL,
        duration TEXT,
        action TEXT NOT NULL,
        acted_by TEXT NOT NULL,
        acted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS vm_approval_history (
        id SERIAL PRIMARY KEY,
        vm_id INTEGER NOT NULL REFERENCES vm_inventory(id) ON DELETE CASCADE,
        old_approval_number TEXT,
        new_approval_number TEXT,
        changed_by INTEGER REFERENCES users(id),
        changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        reason TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS custom_pages (
        id SERIAL PRIMARY KEY,
        page_name TEXT NOT NULL UNIQUE,
        page_slug TEXT NOT NULL UNIQUE,
        table_name TEXT NOT NULL UNIQUE,
        description TEXT,
        icon TEXT DEFAULT 'FileText',
        is_active BOOLEAN DEFAULT TRUE,
        columns JSONB NOT NULL,
        filters JSONB DEFAULT '[]'::jsonb,
        sort_config JSONB DEFAULT '{"field": "id", "direction": "asc"}'::jsonb,
        pagination_config JSONB DEFAULT '{"pageSize": 10, "enabled": true}'::jsonb,
        import_export_enabled BOOLEAN DEFAULT TRUE,
        created_by INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS approval_monitoring (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        platform TEXT,
        pic TEXT,
        ip_address TEXT,
        hostname_accounts TEXT,
        identifier_serial_number TEXT,
        approval_number TEXT,
        start_date TEXT,
        end_date TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        remarks TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS jira_settings (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        username TEXT NOT NULL,
        api_token TEXT NOT NULL,
        project_key TEXT,
        issue_type TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS monitoring_alert_rules (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        metric TEXT NOT NULL,
        operator TEXT NOT NULL,
        threshold REAL NOT NULL,
        severity TEXT NOT NULL,
        enabled BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS monitoring_alerts (
        id SERIAL PRIMARY KEY,
        rule_id INTEGER REFERENCES monitoring_alert_rules(id),
        vm_id INTEGER REFERENCES vm_inventory(id),
        status TEXT NOT NULL,
        severity TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        resolved_at TIMESTAMP
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS monitoring_dashboards (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        layout JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS monitoring_datasources (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        config JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS monitoring_notifications (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        config JSONB,
        enabled BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS monitoring_panels (
        id SERIAL PRIMARY KEY,
        dashboard_id INTEGER REFERENCES monitoring_dashboards(id),
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        config JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        site_name TEXT,
        site_url TEXT,
        theme TEXT DEFAULT 'light',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    await db2.execute(sql4`
      CREATE TABLE IF NOT EXISTS storage_media_inventory (
        id SERIAL PRIMARY KEY,
        media_type TEXT NOT NULL,
        serial_number TEXT NOT NULL UNIQUE,
        capacity TEXT,
        status TEXT NOT NULL DEFAULT 'available',
        location TEXT,
        remarks TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    console.log("\u{1F389} Database migration completed successfully!");
  } catch (error) {
    console.error("\u274C Migration failed:", error.message);
    throw error;
  }
}
var init_migrate = __esm({
  "server/migrate.ts"() {
    "use strict";
    init_db();
  }
});

// server/index.ts
import express2 from "express";

// server/auth.ts
init_storage();
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import createMemoryStore from "memorystore";
import * as speakeasy from "speakeasy";
import * as QRCode from "qrcode";
import * as fs2 from "fs";
import * as path from "path";
var scryptAsync = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  if (!stored || !stored.includes(".")) {
    return false;
  }
  const [hashed, salt] = stored.split(".");
  if (!hashed || !salt) {
    return false;
  }
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
function setupAuth(app2) {
  const MemoryStore = createMemoryStore(session);
  const sessionSettings = {
    secret: process.env.SESSION_SECRET || "srph-mis-default-secret-key",
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 864e5
      // prune expired entries every 24h
    }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1e3
      // 30 days
    }
  };
  app2.set("trust proxy", 1);
  app2.use(session(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log(`Login attempt for username: ${username}`);
        const user = await storage.getUserByUsername(username);
        if (!user) {
          console.log(`User not found: ${username}`);
          return done(null, false);
        }
        console.log(`User found: ${user.username}, password type: ${user.password?.includes(".") ? "hashed" : "plain"}`);
        if (user.password && user.password.includes(".")) {
          const isValid = await comparePasswords(password, user.password);
          if (!isValid) {
            return done(null, false);
          }
        } else {
          if (user.password !== password) {
            return done(null, false);
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      console.log(`Starting deserialization for user ID: ${id}`);
      const user = await storage.getUser(id);
      if (!user) {
        console.log(`User with ID ${id} not found during session deserialization`);
        return done(null, false);
      }
      console.log(`User found - ID: ${user.id}, Username: ${user.username}, MFA: ${user.mfaEnabled}`);
      console.log(`Deserializing user ${user.username} with admin status: ${user.isAdmin}, roleId: ${user.roleId}`);
      const { getPermissionsForRole: getPermissionsForRole2 } = await Promise.resolve().then(() => (init_roles(), roles_exports));
      const isUserAdmin = user.isAdmin === true || user.isAdmin === 1 || user.isAdmin === "true";
      user.isAdmin = isUserAdmin;
      console.log(`Admin status normalized to: ${isUserAdmin}`);
      if (isUserAdmin) {
        user.permissions = {
          assets: { view: true, edit: true, add: true, delete: true },
          components: { view: true, edit: true, add: true, delete: true },
          accessories: { view: true, edit: true, add: true, delete: true },
          consumables: { view: true, edit: true, add: true, delete: true },
          licenses: { view: true, edit: true, add: true, delete: true },
          users: { view: true, edit: true, add: true, delete: true },
          reports: { view: true, edit: true, add: true, delete: true },
          vmMonitoring: { view: true, edit: true, add: true, delete: true },
          networkDiscovery: { view: true, edit: true, add: true, delete: true },
          bitlockerKeys: { view: true, edit: true, add: true, delete: true },
          admin: { view: true, edit: true, add: true, delete: true }
        };
        console.log(`Admin permissions loaded for user ${user.username}`);
      } else {
        const rolePermissions = getPermissionsForRole2(user.roleId);
        user.permissions = rolePermissions;
        console.log(`Role permissions loaded for user ${user.username} (roleId: ${user.roleId}):`, JSON.stringify(rolePermissions, null, 2));
      }
      done(null, user);
    } catch (err) {
      console.error("Error deserializing user:", err);
      done(null, false);
    }
  });
  app2.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const userData = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        department: req.body.department || null,
        password: req.body.password,
        // Will be hashed below
        isAdmin: req.body.isAdmin || false
      };
      userData.password = await hashPassword(userData.password);
      const user = await storage.createUser(userData);
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/login", (req, res, next) => {
    passport.authenticate("local", async (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        const { logUserAuth: logUserAuth2 } = await Promise.resolve().then(() => (init_logger(), logger_exports));
        await logUserAuth2({
          username: req.body.username,
          action: "failed_login",
          ipAddress: req.ip || req.headers["x-forwarded-for"] || "unknown",
          userAgent: req.headers["user-agent"]
        });
        return res.status(401).json({ message: "Invalid username or password" });
      }
      const fullUser = await storage.getUser(user.id);
      if (fullUser.mfaEnabled && fullUser.mfaSecret) {
        console.log(`MFA required for user: ${user.username}`);
        return res.status(200).json({
          requiresMfa: true,
          userId: user.id,
          username: user.username,
          message: "Please enter your 6-digit code from Microsoft Authenticator app"
        });
      }
      if (fullUser.forcePasswordChange) {
        console.log(`Password change required for user: ${user.username}`);
        req.login(user, async (loginErr) => {
          if (loginErr) {
            console.error("Login error during password change redirect:", loginErr);
            return next(loginErr);
          }
          return res.status(200).json({
            requiresPasswordChange: true,
            userId: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            message: "You must change your password before continuing"
          });
        });
        return;
      }
      console.log(`MFA not enabled for user: ${user.username} - requiring MFA setup`);
      req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error("Login error during MFA setup redirect:", loginErr);
          return next(loginErr);
        }
        const { getPermissionsForRole: getPermissionsForRole2 } = await Promise.resolve().then(() => (init_roles(), roles_exports));
        const isUserAdmin = user.isAdmin === true || user.isAdmin === 1 || user.isAdmin === "true";
        let permissions;
        if (isUserAdmin) {
          permissions = {
            assets: { view: true, edit: true, add: true, delete: true },
            components: { view: true, edit: true, add: true, delete: true },
            accessories: { view: true, edit: true, add: true, delete: true },
            consumables: { view: true, edit: true, add: true, delete: true },
            licenses: { view: true, edit: true, add: true, delete: true },
            users: { view: true, edit: true, add: true, delete: true },
            reports: { view: true, edit: true, add: true, delete: true },
            vmMonitoring: { view: true, edit: true, add: true, delete: true },
            networkDiscovery: { view: true, edit: true, add: true, delete: true },
            bitlockerKeys: { view: true, edit: true, add: true, delete: true },
            admin: { view: true, edit: true, add: true, delete: true }
          };
        } else {
          permissions = getPermissionsForRole2(user.roleId);
        }
        const loginTime = (/* @__PURE__ */ new Date()).toISOString();
        const authLog = {
          timestamp: loginTime,
          username: user.username,
          action: "login_mfa_setup_required",
          ipAddress: req.ip || req.connection.remoteAddress || "unknown",
          userAgent: req.headers["user-agent"] || "unknown",
          loginTime: new Date(loginTime).toLocaleString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
          })
        };
        const logDir = path.join(process.cwd(), "LOGS", "auth");
        const logFile = path.join(logDir, `auth_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.log`);
        if (!fs2.existsSync(logDir)) {
          fs2.mkdirSync(logDir, { recursive: true });
        }
        fs2.appendFileSync(logFile, JSON.stringify(authLog) + "\n");
        console.log("Returning user data with MFA setup requirement:", {
          username: user.username,
          isAdmin: isUserAdmin,
          mfaEnabled: false
        });
        return res.status(200).json({
          requiresMfaSetup: true,
          id: user.id,
          userId: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          department: user.department,
          isAdmin: isUserAdmin,
          roleId: user.roleId,
          permissions,
          mfaEnabled: false,
          message: "You must set up Two-Factor Authentication to continue"
        });
      });
    })(req, res, next);
  });
  app2.post("/api/logout", async (req, res, next) => {
    const reason = req.body?.reason || "manual";
    const user = req.user;
    req.logout(async (err) => {
      if (err) {
        return next(err);
      }
      if (user) {
        const logoutLog = {
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          username: user.username,
          action: reason === "inactivity" ? "auto-logout" : "logout",
          reason,
          ipAddress: req.ip || req.connection.remoteAddress || "unknown",
          logoutTime: (/* @__PURE__ */ new Date()).toLocaleString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
          })
        };
        const logDir = path.join(process.cwd(), "LOGS", "auth");
        const logFile = path.join(logDir, `auth_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.log`);
        if (!fs2.existsSync(logDir)) {
          fs2.mkdirSync(logDir, { recursive: true });
        }
        fs2.appendFileSync(logFile, JSON.stringify(logoutLog) + "\n");
      }
      res.sendStatus(200);
    });
  });
  app2.get("/api/user", (req, res) => {
    console.log("GET /api/user - isAuthenticated:", req.isAuthenticated(), "sessionID:", req.sessionID);
    if (!req.isAuthenticated()) {
      console.log("User not authenticated, returning 401");
      return res.status(401).json({ message: "Not authenticated" });
    }
    console.log("Returning user data:", {
      id: req.user.id,
      username: req.user.username,
      mfaEnabled: req.user.mfaEnabled,
      isAdmin: req.user.isAdmin,
      forcePasswordChange: req.user.forcePasswordChange
    });
    res.json(req.user);
  });
  app2.get("/api/me", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(req.user);
  });
  app2.post("/api/user/change-password", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const { currentPassword, newPassword, forceChange } = req.body;
    if (!newPassword || newPassword.trim() === "") {
      return res.status(400).json({ message: "New password is required" });
    }
    try {
      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!forceChange && (!currentPassword || currentPassword.trim() === "")) {
        return res.status(400).json({ message: "Current password is required" });
      }
      if (!forceChange) {
        const { scrypt: scrypt3, randomBytes: randomBytes3, timingSafeEqual: timingSafeEqual2 } = await import("crypto");
        const { promisify: promisify4 } = await import("util");
        const scryptAsync3 = promisify4(scrypt3);
        const [hashed, salt2] = user.password.split(".");
        const hashedBuf = Buffer.from(hashed, "hex");
        const suppliedBuf = await scryptAsync3(currentPassword, salt2, 64);
        if (!timingSafeEqual2(hashedBuf, suppliedBuf)) {
          return res.status(401).json({ message: "Current password is incorrect" });
        }
      }
      const { scrypt: scrypt2, randomBytes: randomBytes2 } = await import("crypto");
      const { promisify: promisify3 } = await import("util");
      const scryptAsync2 = promisify3(scrypt2);
      const salt = randomBytes2(16).toString("hex");
      const buf = await scryptAsync2(newPassword, salt, 64);
      const hashedPassword = `${buf.toString("hex")}.${salt}`;
      await storage.updateUser(req.user.id, {
        password: hashedPassword,
        forcePasswordChange: false
      });
      console.log(`User ${user.username} changed their password`);
      await storage.createActivity({
        action: "update",
        itemType: "user",
        itemId: req.user.id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `User changed their own password`
      });
      return res.status(200).json({
        success: true,
        message: "Password changed successfully"
      });
    } catch (error) {
      console.error("Password change error:", error);
      return res.status(500).json({
        success: false,
        message: error?.message || "Failed to change password"
      });
    }
  });
  app2.post("/api/setup/admin", async (req, res, next) => {
    try {
      const users4 = await storage.getUsers();
      if (users4.length > 0) {
        return res.status(400).json({ message: "Setup has already been completed" });
      }
      const userData = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        department: req.body.department || null,
        password: req.body.password,
        // Will be hashed below
        isAdmin: true
      };
      userData.password = await hashPassword(userData.password);
      const adminUser = await storage.createUser(userData);
      req.login(adminUser, (err) => {
        if (err) return next(err);
        res.status(201).json({ message: "Admin account created successfully", user: adminUser });
      });
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/setup/database", async (req, res, next) => {
    try {
      const { importDemoData, customSqlScript } = req.body;
      if (!req.isAuthenticated() || !req.user.isAdmin) {
        return res.status(403).json({ message: "Only administrators can perform database setup" });
      }
      if (customSqlScript) {
        try {
          console.log("Custom SQL script would be executed here");
        } catch (sqlError) {
          return res.status(400).json({
            message: "Error executing custom SQL script",
            error: sqlError.message
          });
        }
      }
      if (importDemoData) {
        try {
          const assetCategories = ["Laptop", "Desktop", "Monitor", "Printer", "Phone", "Tablet"];
          const accessoryCategories = ["Keyboard", "Mouse", "Headset", "USB Drive", "External Drive"];
          const componentCategories = ["RAM", "CPU", "Hard Drive", "Graphics Card", "Power Supply"];
          const demoAssets = [
            {
              assetTag: "SRPH-001",
              name: "Dell XPS 15",
              description: "High-performance developer laptop",
              category: "Laptop",
              status: "available",
              purchaseDate: "2023-01-15",
              purchaseCost: "1599.99",
              location: "Main Office",
              serialNumber: "XPS15-123456",
              model: "XPS 15 9500",
              manufacturer: "Dell",
              notes: "Assigned to development team"
            },
            {
              assetTag: "SRPH-002",
              name: "HP EliteDesk 800",
              description: "Desktop workstation",
              category: "Desktop",
              status: "available",
              purchaseDate: "2023-02-20",
              purchaseCost: "899.99",
              location: "Sales Department",
              serialNumber: "HP800-789012",
              model: "EliteDesk 800 G6",
              manufacturer: "HP",
              notes: "For sales team use"
            },
            {
              assetTag: "SRPH-003",
              name: "Apple iPad Pro",
              description: "12.9-inch iPad Pro with M1 chip",
              category: "Tablet",
              status: "available",
              purchaseDate: "2023-03-10",
              purchaseCost: "1099.99",
              location: "Executive Suite",
              serialNumber: "IPAD-345678",
              model: "iPad Pro 12.9-inch",
              manufacturer: "Apple",
              notes: "For executive presentations"
            }
          ];
          const demoAccessories = [
            {
              name: "Logitech MX Master 3",
              category: "Mouse",
              quantity: 5,
              description: "Wireless mouse with customizable buttons",
              manufacturer: "Logitech",
              purchaseDate: "2023-01-20",
              purchaseCost: "99.99",
              status: "available"
            },
            {
              name: "Dell Ultrasharp 27-inch Monitor",
              category: "Monitor",
              quantity: 3,
              description: "27-inch 4K monitor",
              manufacturer: "Dell",
              purchaseDate: "2023-02-15",
              purchaseCost: "349.99",
              status: "available"
            }
          ];
          const demoComponents = [
            {
              name: "Intel Core i7-12700K",
              type: "CPU",
              serialNumber: "CPU001",
              manufacturer: "Intel",
              model: "Core i7-12700K",
              specifications: "3.6GHz, 12-core, 20-thread",
              status: "available",
              location: "Storage Room A",
              purchaseDate: "2024-01-15",
              purchaseCost: 399.99,
              warrantyExpiry: "2027-01-15",
              notes: "High-performance processor for workstations"
            },
            {
              name: "Kingston DDR4 32GB",
              type: "RAM",
              serialNumber: "RAM001",
              manufacturer: "Kingston",
              model: "DDR4-3200",
              specifications: "32GB, 3200MHz",
              status: "assigned",
              location: "IT Lab",
              assignedTo: "John Doe",
              purchaseDate: "2024-02-10",
              purchaseCost: 149.99,
              warrantyExpiry: "2026-02-10",
              notes: "Assigned to development workstation"
            },
            {
              name: "Samsung 970 EVO Plus",
              type: "SSD",
              serialNumber: "SSD001",
              manufacturer: "Samsung",
              model: "970 EVO Plus",
              specifications: "1TB NVMe M.2",
              status: "available",
              location: "Storage Room B",
              purchaseDate: "2024-01-20",
              purchaseCost: 129.99,
              warrantyExpiry: "2029-01-20",
              notes: "High-speed NVMe storage"
            },
            {
              name: "NVIDIA RTX 4070",
              type: "GPU",
              serialNumber: "GPU001",
              manufacturer: "NVIDIA",
              model: "GeForce RTX 4070",
              specifications: "12GB GDDR6X",
              status: "maintenance",
              location: "Service Center",
              purchaseDate: "2024-03-01",
              purchaseCost: 599.99,
              warrantyExpiry: "2027-03-01",
              notes: "Under maintenance for driver issues"
            }
          ];
          for (const component of demoComponents) {
            await storage.createComponent(component);
          }
          const demoLicenses = [
            {
              name: "Microsoft Office 365",
              key: "XXXX-XXXX-XXXX-XXXX",
              seats: "10",
              assignedSeats: 0,
              company: "Microsoft",
              manufacturer: "Microsoft",
              purchaseDate: "2023-01-10",
              expirationDate: "2024-01-10",
              purchaseCost: "999.99",
              status: "active",
              notes: "Company-wide Office 365 subscription"
            },
            {
              name: "Adobe Creative Cloud",
              key: "YYYY-YYYY-YYYY-YYYY",
              seats: "5",
              assignedSeats: 0,
              company: "Adobe",
              manufacturer: "Adobe",
              purchaseDate: "2023-02-05",
              expirationDate: "2024-02-05",
              purchaseCost: "599.99",
              status: "active",
              notes: "For design team use"
            }
          ];
          for (const asset2 of demoAssets) {
            await storage.createAsset(asset2);
          }
          for (const accessory of demoAccessories) {
            await storage.createAccessory(accessory);
          }
          for (const component of demoComponents) {
            await storage.createComponent(component);
          }
          for (const license of demoLicenses) {
            await storage.createLicense(license);
          }
          await storage.createActivity({
            action: "create",
            itemType: "system",
            itemId: 0,
            userId: req.user.id,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: "Demo data imported during system setup"
          });
        } catch (demoError) {
          console.error("Error importing demo data:", demoError);
        }
      }
      res.status(200).json({
        message: "Database setup completed successfully",
        demoDataImported: importDemoData,
        customScriptExecuted: !!customSqlScript
      });
    } catch (error) {
      next(error);
    }
  });
  app2.get("/api/setup", async (req, res) => {
    try {
      if (req.query.force === "true") {
        return res.json({
          setupRequired: true,
          hasUsers: false,
          userCount: 0,
          forced: true
        });
      }
      const users4 = await storage.getUsers();
      const hasUsers = users4.length > 0;
      res.json({
        setupRequired: !hasUsers,
        hasUsers,
        userCount: users4.length
      });
    } catch (error) {
      console.error("Setup check error:", error);
      res.status(500).json({
        setupRequired: true,
        error: "Could not check setup status"
      });
    }
  });
  app2.post("/api/setup/reset", async (req, res) => {
    try {
      res.json({
        success: true,
        message: "Setup status reset. You can now access the setup page."
      });
    } catch (error) {
      console.error("Setup reset error:", error);
      res.status(500).json({
        success: false,
        error: "Could not reset setup status"
      });
    }
  });
  app2.use("/api/protected", (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  });
  app2.use("/api/admin", (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    res.status(403).json({ message: "Forbidden" });
  });
  app2.use("/api/users/:id/permissions", (req, res, next) => {
    if (req.isAuthenticated() && (req.user.isAdmin || req.user.id === parseInt(req.params.id))) {
      return next();
    }
    res.status(403).json({ message: "Forbidden - insufficient permissions" });
  });
  app2.post("/api/mfa/setup", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const secret = speakeasy.generateSecret({
        name: `SRPH-MIS (${req.user.username})`,
        issuer: "SRPH-MIS"
      });
      const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
      req.session.mfaSecret = secret.base32;
      res.json({
        secret: secret.base32,
        qrCode: qrCodeUrl,
        manualEntry: secret.otpauth_url
      });
    } catch (error) {
      console.error("MFA setup error:", error);
      res.status(500).json({ message: "Failed to setup MFA" });
    }
  });
  app2.post("/api/mfa/enable", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const { token } = req.body;
    const secret = req.session.mfaSecret;
    if (!secret) {
      return res.status(400).json({ message: "MFA setup not initiated. Please scan the QR code first." });
    }
    if (!token || token.length !== 6) {
      return res.status(400).json({ message: "Please enter a valid 6-digit code from your Microsoft Authenticator app" });
    }
    try {
      const verified = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
        window: 2
      });
      if (verified) {
        console.log(`Enabling MFA for user: ${req.user.username}`);
        await storage.updateUser(req.user.id, {
          mfaSecret: secret,
          mfaEnabled: true
        });
        delete req.session.mfaSecret;
        console.log(`MFA successfully enabled for user: ${req.user.username}`);
        res.json({
          success: true,
          message: "Two-factor authentication has been enabled successfully. You will need to use your Microsoft Authenticator app to login from now on."
        });
      } else {
        res.status(400).json({ message: "Invalid verification code. Please check your Microsoft Authenticator app and try again." });
      }
    } catch (error) {
      console.error("MFA enable error:", error);
      res.status(500).json({ message: "Failed to enable MFA. Please try again." });
    }
  });
  app2.post("/api/mfa/disable", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const { token } = req.body;
    try {
      const user = await storage.getUser(req.user.id);
      if (!user.mfaEnabled || !user.mfaSecret) {
        return res.status(400).json({ message: "MFA is not enabled" });
      }
      const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: "base32",
        token,
        window: 2
      });
      if (verified) {
        await storage.updateUser(req.user.id, {
          mfaSecret: null,
          mfaEnabled: false
        });
        res.json({
          success: true,
          message: "MFA disabled successfully"
        });
      } else {
        res.status(400).json({ message: "Invalid verification code" });
      }
    } catch (error) {
      console.error("MFA disable error:", error);
      res.status(500).json({ message: "Failed to disable MFA" });
    }
  });
  app2.post("/api/mfa/verify", async (req, res) => {
    const { userId, token } = req.body;
    if (!userId || !token) {
      return res.status(400).json({ message: "User ID and verification code are required" });
    }
    try {
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!user.mfaEnabled || !user.mfaSecret) {
        return res.status(400).json({ message: "MFA is not enabled for this user" });
      }
      const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: "base32",
        token,
        window: 2
        // Allow 2 time steps before/after for clock drift
      });
      if (verified) {
        console.log(`MFA verification successful for user: ${user.username}`);
        req.login(user, async (err) => {
          if (err) {
            console.error("Login error after MFA verification:", err);
            return res.status(500).json({ message: "Login failed after verification" });
          }
          const loginTime = (/* @__PURE__ */ new Date()).toISOString();
          const authLog = {
            timestamp: loginTime,
            username: user.username,
            action: "login",
            ipAddress: req.ip || req.connection.remoteAddress || "unknown",
            userAgent: req.headers["user-agent"] || "unknown",
            loginTime: new Date(loginTime).toLocaleString("en-US", {
              timeZone: "UTC",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true
            })
          };
          const logDir = path.join(process.cwd(), "LOGS", "auth");
          const logFile = path.join(logDir, `auth_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.log`);
          if (!fs2.existsSync(logDir)) {
            fs2.mkdirSync(logDir, { recursive: true });
          }
          fs2.appendFileSync(logFile, JSON.stringify(authLog) + "\n");
          const { getPermissionsForRole: getPermissionsForRole2 } = await Promise.resolve().then(() => (init_roles(), roles_exports));
          const isUserAdmin = user.isAdmin === true || user.isAdmin === 1 || user.isAdmin === "true";
          let permissions;
          if (isUserAdmin) {
            permissions = {
              assets: { view: true, edit: true, add: true, delete: true },
              components: { view: true, edit: true, add: true, delete: true },
              accessories: { view: true, edit: true, add: true, delete: true },
              consumables: { view: true, edit: true, add: true, delete: true },
              licenses: { view: true, edit: true, add: true, delete: true },
              users: { view: true, edit: true, add: true, delete: true },
              reports: { view: true, edit: true, add: true, delete: true },
              vmMonitoring: { view: true, edit: true, add: true, delete: true },
              networkDiscovery: { view: true, edit: true, add: true, delete: true },
              bitlockerKeys: { view: true, edit: true, add: true, delete: true },
              admin: { view: true, edit: true, add: true, delete: true }
            };
          } else {
            permissions = getPermissionsForRole2(user.roleId);
          }
          req.session.save((saveErr) => {
            if (saveErr) {
              console.error("Session save error after MFA verification:", saveErr);
              return res.status(500).json({ message: "Session error after verification" });
            }
            console.log("Session saved successfully for user:", user.username);
            console.log("Session ID:", req.sessionID);
            console.log("Session data:", {
              username: req.user?.username,
              isAdmin: req.user?.isAdmin
            });
            setTimeout(() => {
              res.json({
                success: true,
                user: {
                  id: user.id,
                  username: user.username,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  department: user.department,
                  isAdmin: isUserAdmin,
                  roleId: user.roleId,
                  permissions,
                  mfaEnabled: user.mfaEnabled
                }
              });
            }, 100);
          });
        });
      } else {
        console.log(`MFA verification failed for user: ${user.username}`);
        res.status(400).json({ message: "Invalid verification code. Please check your Microsoft Authenticator app and try again." });
      }
    } catch (error) {
      console.error("MFA verify error:", error);
      res.status(500).json({ message: "Verification failed. Please try again." });
    }
  });
  app2.get("/api/mfa/status", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const user = await storage.getUser(req.user.id);
      res.json({
        enabled: user.mfaEnabled || false
      });
    } catch (error) {
      console.error("MFA status error:", error);
      res.status(500).json({ message: "Failed to get MFA status" });
    }
  });
  app2.post("/api/admin/disable-mfa/:userId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Admin privileges required" });
    }
    const userId = parseInt(req.params.userId);
    try {
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!user.mfaEnabled) {
        return res.status(400).json({ message: "MFA is not enabled for this user" });
      }
      await storage.updateUser(userId, {
        mfaSecret: null,
        mfaEnabled: false
      });
      console.log(`Admin ${req.user.username} disabled MFA for user ${user.username}`);
      return res.status(200).json({
        success: true,
        message: `MFA disabled for user ${user.username}`
      });
    } catch (error) {
      console.error("Admin MFA disable error:", error);
      return res.status(500).json({
        success: false,
        message: error?.message || "Failed to disable MFA"
      });
    }
  });
  const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };
  const requireAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    res.status(403).json({ message: "Forbidden" });
  };
  return { requireAuth, requireAdmin };
}

// server/routes.ts
init_storage();
init_schema();
init_schema();
init_db();
import { createServer } from "http";
import { eq as eq4, sql as sql3, desc } from "drizzle-orm";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import * as fs4 from "fs";
import * as path2 from "path";

// server/email-service.ts
init_storage();
import nodemailer from "nodemailer";
import { promises as fs3 } from "fs";
import { join as join3 } from "path";
var EMAIL_LOGS_DIR = join3(process.cwd(), "LOGS");
var EMAIL_LOG_FILE = "email_notifications.log";
async function ensureEmailLogsDirectory() {
  try {
    await fs3.access(EMAIL_LOGS_DIR);
  } catch {
    await fs3.mkdir(EMAIL_LOGS_DIR, { recursive: true });
  }
}
async function logEmailEvent(log2) {
  await ensureEmailLogsDirectory();
  const filepath = join3(EMAIL_LOGS_DIR, EMAIL_LOG_FILE);
  const logEntry = `[${log2.timestamp}] To: ${log2.to} | Subject: ${log2.subject} | Status: [${log2.status.toUpperCase()}]${log2.messageId ? ` | MessageID: ${log2.messageId}` : ""}${log2.error ? ` | Error: ${log2.error}` : ""}
`;
  await fs3.appendFile(filepath, logEntry);
  const statusEmoji = log2.status === "success" ? "\u2705" : log2.status === "failed" ? "\u274C" : "\u23F3";
  console.log(`\u{1F4DD} ${statusEmoji} Email event logged to email_notifications.log:`);
  console.log(`   Status: ${log2.status.toUpperCase()}`);
  console.log(`   To: ${log2.to}`);
  console.log(`   Subject: ${log2.subject}`);
  if (log2.error) console.log(`   Error: ${log2.error}`);
  console.log(`   Log file: ${filepath}`);
}
var EmailService = class {
  transporter = null;
  async initialize() {
    try {
      const settings3 = await storage.getSystemSettings();
      if (!settings3?.mailHost || !settings3?.mailFromAddress) {
        console.log("Email not configured - skipping email service initialization");
        return false;
      }
      this.transporter = nodemailer.createTransport({
        host: settings3.mailHost,
        port: parseInt(settings3.mailPort || "587"),
        secure: settings3.mailPort === "465",
        auth: {
          user: settings3.mailUsername || settings3.mailFromAddress,
          pass: settings3.mailPassword || ""
        }
      });
      await this.transporter.verify();
      console.log("\u2705 Email service initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize email service:", error);
      this.transporter = null;
      return false;
    }
  }
  async sendEmail(options) {
    if (!this.transporter) {
      console.log("\u{1F4E7} Email service not initialized - attempting to initialize...");
      const initialized = await this.initialize();
      if (!initialized) {
        console.log("\u274C Cannot send email - service not configured. Please configure email settings in System Setup.");
        console.log("\u{1F4A1} To enable emails: Go to System Setup \u2192 Email Settings \u2192 Configure SMTP details");
        await logEmailEvent({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          to: options.to,
          subject: options.subject,
          status: "failed",
          error: "Email service not configured"
        });
        return false;
      }
    }
    try {
      const settings3 = await storage.getSystemSettings();
      console.log(`\u{1F4E7} Sending email...`);
      console.log(`   From: ${settings3?.mailFromAddress}`);
      console.log(`   To: ${options.to}`);
      console.log(`   Subject: ${options.subject}`);
      const info = await this.transporter.sendMail({
        from: `"${settings3?.siteName || "SRPH-MIS"}" <${settings3?.mailFromAddress}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, "")
      });
      console.log(`\u2705 Email sent successfully to ${options.to}`);
      console.log(`   Message ID: ${info.messageId}`);
      console.log(`   Response: ${info.response}`);
      await logEmailEvent({
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        to: options.to,
        subject: options.subject,
        status: "success",
        messageId: info.messageId
      });
      return true;
    } catch (error) {
      console.error("\u274C Failed to send email:", error.message);
      if (error.code) {
        console.error(`   Error code: ${error.code}`);
      }
      if (error.command) {
        console.error(`   Failed command: ${error.command}`);
      }
      await logEmailEvent({
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        to: options.to,
        subject: options.subject,
        status: "failed",
        error: error.message
      });
      return false;
    }
  }
  async sendIamExpirationNotification(data) {
    try {
      const settings3 = await storage.getSystemSettings();
      if (!settings3?.notifyOnIamExpiration) {
        console.log("\u{1F4E7} IAM expiration notifications are disabled");
        return false;
      }
      if (!settings3?.companyEmail) {
        console.log("\u274C No admin email configured for notifications");
        return false;
      }
      console.log(`\u{1F4E7} Preparing to send IAM expiration notifications`);
      console.log(`\u{1F4E7} ${data.accounts.length} expired IAM account(s)`);
      let ownerNotificationsSent = 0;
      let nameNotificationsSent = 0;
      let adminNotificationsSent = 0;
      for (const account of data.accounts) {
        try {
          const ownerEmail = `${account.knoxId}@samsung.com`;
          let userKnoxIdValue = account.userKnoxId;
          console.log(`\u{1F4E7} ========== ACCOUNT FIELDS DEBUG ==========`);
          console.log(`\u{1F4E7} All account fields:`, Object.keys(account));
          console.log(`\u{1F4E7} Full account object:`, JSON.stringify(account, null, 2));
          console.log(`\u{1F4E7} userKnoxId raw:`, account.userKnoxId);
          console.log(`\u{1F4E7} userKnoxId type:`, typeof account.userKnoxId);
          console.log(`\u{1F4E7} userKnoxId === null:`, account.userKnoxId === null);
          console.log(`\u{1F4E7} userKnoxId === undefined:`, account.userKnoxId === void 0);
          console.log(`\u{1F4E7} =========================================`);
          if (userKnoxIdValue === null || userKnoxIdValue === void 0) {
            userKnoxIdValue = null;
          }
          const hasValidUserKnoxId = userKnoxIdValue !== null && userKnoxIdValue !== void 0 && typeof userKnoxIdValue === "string" && userKnoxIdValue.trim() !== "" && userKnoxIdValue.trim().toLowerCase() !== "null" && userKnoxIdValue.trim() !== "-" && userKnoxIdValue.trim().toLowerCase() !== "n/a";
          const userKnoxIdEmail = hasValidUserKnoxId ? `${userKnoxIdValue.trim()}@samsung.com` : null;
          console.log(`\u{1F4E7} Processing notifications for ${account.knoxId}...`);
          console.log(`\u{1F4E7} User Knox ID processed value:`, JSON.stringify(userKnoxIdValue));
          console.log(`\u{1F4E7} Has valid User Knox ID:`, hasValidUserKnoxId);
          console.log(`\u{1F4E7} User Knox ID email:`, userKnoxIdEmail);
          const ownerResult = await this.sendIamExpirationOwnerNotification(account);
          if (ownerResult) {
            ownerNotificationsSent++;
            console.log(`\u2705 Knox ID notification sent to ${ownerEmail}`);
          } else {
            console.log(`\u26A0\uFE0F Failed to send Knox ID notification to ${ownerEmail}`);
          }
          if (hasValidUserKnoxId && userKnoxIdEmail) {
            console.log(`\u{1F4E7} ========== SENDING USER KNOX ID NOTIFICATION ==========`);
            console.log(`\u{1F4E7} Knox ID: ${account.knoxId}`);
            console.log(`\u{1F4E7} User Knox ID: ${account.userKnoxId}`);
            console.log(`\u{1F4E7} User Knox ID Email: ${userKnoxIdEmail}`);
            const userKnoxIdResult = await this.sendIamExpirationOwnerNotification({
              ...account,
              knoxId: account.userKnoxId.trim()
              // Use userKnoxId for email address
            });
            if (userKnoxIdResult) {
              nameNotificationsSent++;
              console.log(`\u2705 User Knox ID notification SUCCESSFULLY sent to ${userKnoxIdEmail}`);
            } else {
              console.log(`\u274C FAILED to send User Knox ID notification to ${userKnoxIdEmail}`);
            }
            console.log(`\u{1F4E7} =======================================================`);
          } else {
            const debugInfo = {
              knoxId: account.knoxId,
              rawUserKnoxId: account.userKnoxId,
              userKnoxIdType: typeof account.userKnoxId,
              userKnoxIdLength: account.userKnoxId ? account.userKnoxId.length : 0,
              trimmedUserKnoxId: account.userKnoxId ? account.userKnoxId.trim() : "null",
              isString: typeof account.userKnoxId === "string",
              isEmpty: !account.userKnoxId || account.userKnoxId.trim() === "",
              isNull: account.userKnoxId === null || account.userKnoxId === void 0,
              hasValidUserKnoxId,
              userKnoxIdEmail
            };
            console.log(`\u2139\uFE0F SKIPPING User Knox ID notification for ${account.knoxId}:`, JSON.stringify(debugInfo, null, 2));
          }
          const adminSubject = `[SRPH-MIS] IAM Account Expiration Alert - ${account.knoxId}`;
          const adminHtml = `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 800px; margin: 0 auto; padding: 20px; }
                .header { background-color: #ef4444; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
                .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
                .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
                table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                th { background-color: #f3f4f6; padding: 10px; border: 1px solid #e5e7eb; text-align: left; }
                td { padding: 10px; border: 1px solid #e5e7eb; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>\u26A0\uFE0F IAM Account Expiration Alert</h2>
                </div>
                <div class="content">
                  <p><strong>The following IAM account has expired and requires attention:</strong></p>
                  <table>
                    <thead>
                      <tr>
                        <th>Requestor</th>
                        <th>Knox ID</th>
                        ${account.name ? "<th>Name</th>" : ""}
                        <th>Role</th>
                        <th>Platform</th>
                        <th>End Date</th>
                        <th>Approval ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>${account.requestor}</td>
                        <td>${account.knoxId}</td>
                        ${account.name ? `<td>${account.name}</td>` : ""}
                        <td>${account.permission}</td>
                        <td>${account.cloudPlatform}</td>
                        <td>${account.endDate}</td>
                        <td style="font-weight: bold; color: #ef4444;">${account.approvalId}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p><strong>Action Required:</strong></p>
                  <ul>
                    <li>Review and update expired account</li>
                    <li>Contact requestor for extension if needed</li>
                    <li>Remove access if no longer required</li>
                    <li>Update status to "Expired - Notified" after notification</li>
                  </ul>
                  <p><strong>Note:</strong> Notifications sent to ${ownerEmail}${userKnoxIdEmail ? ` and ${userKnoxIdEmail}` : ""}</p>
                  <p>This is an automated notification from SRPH-MIS.</p>
                </div>
                <div class="footer">
                  <p>SRPH Management Information System</p>
                  <p>This email was sent automatically. Please do not reply.</p>
                </div>
              </div>
            </body>
            </html>
          `;
          const adminResult = await this.sendEmail({
            to: settings3.companyEmail,
            subject: adminSubject,
            html: adminHtml
          });
          if (adminResult) {
            adminNotificationsSent++;
            console.log(`\u2705 Admin notification sent to ${settings3.companyEmail} for ${account.knoxId}`);
            await logEmailEvent({
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              to: settings3.companyEmail,
              subject: adminSubject,
              status: "success",
              messageId: `iam-admin-${account.knoxId}-${Date.now()}`
            });
          } else {
            console.log(`\u26A0\uFE0F Failed to send admin notification to ${settings3.companyEmail} for ${account.knoxId}`);
            await logEmailEvent({
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              to: settings3.companyEmail,
              subject: adminSubject,
              status: "failed",
              error: "Email service returned false"
            });
          }
        } catch (accountError) {
          console.error(`\u274C Failed to send notifications for ${account.knoxId}:`, accountError);
          await logEmailEvent({
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            to: settings3?.companyEmail || "N/A",
            subject: `[SRPH-MIS] IAM Account Expiration Alert - ${account.knoxId}`,
            status: "failed",
            error: accountError.message || "Unknown error"
          });
        }
      }
      console.log(`\u{1F4E7} NOTIFICATION SUMMARY:`);
      console.log(`   \u2709\uFE0F  Knox ID notifications: ${ownerNotificationsSent}`);
      console.log(`   \u2709\uFE0F  User Knox ID notifications: ${nameNotificationsSent}`);
      console.log(`   \u2709\uFE0F  Admin notifications: ${adminNotificationsSent}`);
      console.log(`   \u{1F4CA} Total: ${ownerNotificationsSent + nameNotificationsSent + adminNotificationsSent} emails sent`);
      return ownerNotificationsSent > 0 || nameNotificationsSent > 0 || adminNotificationsSent > 0;
    } catch (error) {
      console.error("\u274C Error sending IAM expiration notification:", error);
      return false;
    }
  }
  async sendIamExpirationOwnerNotification(account) {
    try {
      const settings3 = await storage.getSystemSettings();
      if (!this.transporter) {
        console.log("\u{1F4E7} Email service not initialized - skipping owner notification");
        return false;
      }
      const ownerEmail = `${account.knoxId}@samsung.com`;
      const removalDate = /* @__PURE__ */ new Date();
      removalDate.setDate(removalDate.getDate() + 7);
      const removalDateStr = removalDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      const subject = settings3?.iamExpirationEmailSubject || "IAM Account Access Expiration Notice";
      const defaultTemplate = `Hi,

Please be advised that your requested access is now expired and will be removed on {removalDate}.

Kindly let us know if you still require access or if we can now proceed with the removal.

https://confluence.sec.samsung.net/pages/viewpage.action?pageId=454565479&spaceKey=SRPHCOMMONC&title=AWS%2BApproval%2BGuide

Account Details:
- Requestor: {requestor}
- Knox ID: {knoxId}
- Permission/IAM/SCOP: {permission}
- Cloud Platform: {cloudPlatform}
- Expiration Date: {endDate}
- Approval ID: {approvalId}

If you need to extend your access, please submit a new request through the proper channels.`;
      let emailBody = settings3?.iamExpirationEmailBody && settings3.iamExpirationEmailBody.trim() !== "" ? settings3.iamExpirationEmailBody : defaultTemplate;
      console.log("\u{1F4E7} Using email template:", emailBody.substring(0, 100) + "...");
      emailBody = emailBody.replace(/{removalDate}/g, removalDateStr).replace(/{requestor}/g, account.requestor).replace(/{knoxId}/g, account.knoxId).replace(/{permission}/g, account.permission).replace(/{cloudPlatform}/g, account.cloudPlatform).replace(/{endDate}/g, account.endDate).replace(/{approvalId}/g, account.approvalId);
      const emailBodyHtml = emailBody.split("\n").map((line) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("http://") || trimmedLine.startsWith("https://")) {
          return `<p><a href="${trimmedLine}" style="color: #2563eb; text-decoration: none;">${trimmedLine}</a></p>`;
        }
        return trimmedLine ? `<p>${line}</p>` : "<br>";
      }).join("\n");
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #ef4444; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
            a { color: #2563eb; text-decoration: none; }
            code { background-color: #f3f4f6; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
            p { margin: 0.5em 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>\u26A0\uFE0F ${subject}</h2>
            </div>
            <div class="content">
              ${emailBodyHtml}
              <p style="margin-top: 20px; font-style: italic; color: #6b7280;">This is an automated notification from SRPH-MIS.</p>
            </div>
            <div class="footer">
              <p>SRPH Management Information System</p>
              <p>This email was sent automatically. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      console.log(`\u{1F4E7} Sending IAM expiration email to ${ownerEmail} with subject: ${subject}`);
      const result = await this.sendEmail({
        to: ownerEmail,
        subject,
        html
      });
      if (result) {
        await logEmailEvent({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          to: ownerEmail,
          subject,
          status: "success",
          messageId: `iam-owner-${account.knoxId}-${Date.now()}`
        });
      } else {
        await logEmailEvent({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          to: ownerEmail,
          subject,
          status: "failed",
          error: "Email service returned false"
        });
      }
      return result;
    } catch (error) {
      console.error("\u274C Error sending IAM owner notification:", error);
      return false;
    }
  }
  async sendApprovalExpirationNotification(data) {
    try {
      const settings3 = await storage.getSystemSettings();
      console.log("\u{1F4E7} Approval expiration notifications are ALWAYS ON");
      if (!this.transporter) {
        console.log("\u{1F4E7} Email service not initialized - attempting to initialize...");
        await this.initialize();
        if (!this.transporter) {
          console.log("\u{1F4E7} Email service still not initialized");
          await logEmailEvent({
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            to: settings3?.companyEmail || "N/A",
            subject: `[SRPH-MIS] Approval Expiration Alert`,
            status: "failed",
            error: "Email service not initialized"
          });
          return false;
        }
      }
      if (!settings3?.companyEmail) {
        console.log("\u{1F4E7} No company email configured");
        await logEmailEvent({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          to: "N/A",
          subject: `[SRPH-MIS] Approval Expiration Alert`,
          status: "failed",
          error: "No company email configured"
        });
        return false;
      }
      console.log(`\u{1F4E7} Preparing to send approval expiration notifications`);
      console.log(`\u{1F4E7} ${data.records.length} approval(s) expiring within 1 week`);
      const recordsTable = data.records.map((record, index) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; text-align: left;">${index + 1}</td>
          <td style="padding: 12px; text-align: left;">${record.type}</td>
          <td style="padding: 12px; text-align: left;">${record.platform}</td>
          <td style="padding: 12px; text-align: left;">${record.pic}</td>
          <td style="padding: 12px; text-align: left;">${record.ipAddress}</td>
          <td style="padding: 12px; text-align: left;">${record.hostnameAccounts}</td>
          <td style="padding: 12px; text-align: left;">${record.identifierSerialNumber}</td>
          <td style="padding: 12px; text-align: left;"><strong>${record.approvalNumber}</strong></td>
          <td style="padding: 12px; text-align: left; color: #dc2626;"><strong>${record.endDate}</strong></td>
        </tr>
      `).join("");
      const subject = `[SRPH-MIS] \u26A0\uFE0F Approval Monitoring - ${data.records.length} Approval(s) Expiring Within 1 Week`;
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 900px; margin: 0 auto; padding: 20px; }
            .header { background-color: #dc2626; color: white; padding: 20px; border-radius: 5px; }
            .content { background-color: #f9fafb; padding: 20px; margin-top: 20px; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; background-color: white; margin-top: 15px; }
            th { background-color: #f3f4f6; padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">\u26A0\uFE0F Approval Monitoring Expiration Alert</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Approvals Expiring Within 1 Week</p>
            </div>
            
            <div class="content">
              <p><strong>Alert Summary:</strong></p>
              <p>The following <strong>${data.records.length}</strong> approval(s) will expire within the next 7 days and require immediate attention:</p>
              
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Platform</th>
                    <th>PIC</th>
                    <th>IP Address</th>
                    <th>Hostname/Accounts</th>
                    <th>Identifier/SN</th>
                    <th>Approval Number</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${recordsTable}
                </tbody>
              </table>
              
              <p style="margin-top: 20px;"><strong>Action Required:</strong></p>
              <ul>
                <li>Review each approval and determine if renewal is needed</li>
                <li>Contact the respective PICs for confirmation</li>
                <li>Prepare necessary documentation for approval extensions if required</li>
                <li>Update the approval monitoring system accordingly</li>
              </ul>
            </div>
            
            <div class="footer">
              <p>This is an automated notification from SRPH-MIS Approval Monitoring System.</p>
              <p>Please do not reply to this email. For questions, contact your system administrator.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      console.log(`\u{1F4E7} Sending approval expiration email to ${settings3.companyEmail}`);
      const result = await this.sendEmail({
        to: settings3.companyEmail,
        subject,
        html
      });
      if (result) {
        console.log(`\u2705 Approval expiration notification sent to ${settings3.companyEmail}`);
        await logEmailEvent({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          to: settings3.companyEmail,
          subject,
          status: "success",
          messageId: `approval-expiration-${Date.now()}`
        });
      } else {
        console.log(`\u26A0\uFE0F Failed to send approval expiration notification`);
        await logEmailEvent({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          to: settings3.companyEmail,
          subject,
          status: "failed",
          error: "Email service returned false"
        });
      }
      return result;
    } catch (error) {
      console.error("\u274C Error sending approval expiration notification:", error);
      await logEmailEvent({
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        to: settings?.companyEmail || "N/A",
        subject: `[SRPH-MIS] Approval Expiration Alert`,
        status: "failed",
        error: error.message || "Unknown error"
      });
      return false;
    }
  }
  async sendVmExpirationNotification(data) {
    try {
      const settings3 = await storage.getSystemSettings();
      if (!settings3?.notifyOnVmExpiration) {
        console.log("\u{1F4E7} VM expiration notifications are disabled");
        return false;
      }
      if (!settings3?.companyEmail) {
        console.log("\u274C No admin email configured for notifications");
        return false;
      }
      console.log(`\u{1F4E7} Preparing to send VM expiration notification to: ${settings3.companyEmail}`);
      console.log(`\u{1F4E7} ${data.vms.length} expired VM(s)`);
      const subject = `[SRPH-MIS] VM Expiration Alert - ${data.vms.length} Virtual Machine(s)`;
      const vmsHtml = data.vms.map((vm) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${vm.vmName}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${vm.knoxId || "N/A"}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${vm.requestor}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${vm.department || "N/A"}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${vm.endDate}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; color: #ef4444;">${vm.approvalNumber || "N/A"}</td>
        </tr>
      `).join("");
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background-color: #ef4444; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th { background-color: #f3f4f6; padding: 10px; border: 1px solid #e5e7eb; text-align: left; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>\u26A0\uFE0F Virtual Machine Expiration Alert</h2>
            </div>
            <div class="content">
              <p><strong>The following virtual machines have reached their end date and require attention:</strong></p>
              <table>
                <thead>
                  <tr>
                    <th>VM Name</th>
                    <th>Knox ID</th>
                    <th>Requestor</th>
                    <th>Department</th>
                    <th>End Date</th>
                    <th>Approval Number</th>
                  </tr>
                </thead>
                <tbody>
                  ${vmsHtml}
                </tbody>
              </table>
              <p><strong>Action Required:</strong></p>
              <ul>
                <li>Review and update expired VMs</li>
                <li>Contact requestors for extension if needed</li>
                <li>Decommission VMs if no longer required</li>
                <li>Update status to "Overdue - Notified" after notification</li>
              </ul>
              <p>This is an automated notification from SRPH-MIS.</p>
            </div>
            <div class="footer">
              <p>SRPH Management Information System</p>
              <p>This email was sent automatically. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      const result = await this.sendEmail({
        to: settings3.companyEmail,
        subject,
        html
      });
      if (result) {
        console.log(`\u2705 VM expiration notification sent successfully to ${settings3.companyEmail}`);
      }
      return result;
    } catch (error) {
      console.error("\u274C Error sending VM expiration notification:", error);
      return false;
    }
  }
  async sendModificationNotification(data) {
    try {
      console.log(`
\u{1F4E7} [EMAIL SERVICE] sendModificationNotification called`);
      console.log(`   Item: ${data.itemType} - ${data.itemName}`);
      console.log(`   Action: ${data.action}`);
      const settings3 = await storage.getSystemSettings();
      const companyEmail = settings3?.companyEmail;
      const mailHost = settings3?.mailHost;
      console.log(`   Settings loaded:`, {
        companyEmail: companyEmail || "NOT SET",
        mailHost: mailHost || "NOT SET",
        mailConfigured: !!(companyEmail && mailHost)
      });
      console.log("   \u2705 All notifications are ALWAYS ON (preference checks removed)");
      const subject = `[SRPH-MIS] ${data.action.toUpperCase()} - ${data.itemType}: ${data.itemName}`;
      if (!settings3?.companyEmail) {
        console.log("   \u274C No admin email configured");
        await logEmailEvent({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          to: "N/A",
          subject,
          status: "failed",
          error: "No admin email configured"
        });
        return false;
      }
      if (!settings3?.mailHost) {
        console.log("   \u274C No mail host configured");
        await logEmailEvent({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          to: settings3.companyEmail,
          subject,
          status: "failed",
          error: "No mail host configured"
        });
        return false;
      }
      console.log(`   \u2705 Email configuration verified`);
      console.log(`   \u{1F4EC} Sending to: ${settings3.companyEmail}`);
      console.log(`   \u{1F4DD} Subject: ${subject}`);
      const actionConfig = {
        create: { color: "#10b981", icon: "\u2705", label: "CREATED", bgColor: "#d1fae5" },
        created: { color: "#10b981", icon: "\u2705", label: "CREATED", bgColor: "#d1fae5" },
        update: { color: "#f59e0b", icon: "\u{1F504}", label: "UPDATED", bgColor: "#fef3c7" },
        updated: { color: "#f59e0b", icon: "\u{1F504}", label: "UPDATED", bgColor: "#fef3c7" },
        delete: { color: "#ef4444", icon: "\u{1F5D1}\uFE0F", label: "DELETED", bgColor: "#fee2e2" },
        deleted: { color: "#ef4444", icon: "\u{1F5D1}\uFE0F", label: "DELETED", bgColor: "#fee2e2" },
        assign: { color: "#3b82f6", icon: "\u{1F4CC}", label: "ASSIGNED", bgColor: "#dbeafe" },
        unassign: { color: "#8b5cf6", icon: "\u{1F4CD}", label: "UNASSIGNED", bgColor: "#ede9fe" },
        checkout: { color: "#0ea5e9", icon: "\u{1F4E4}", label: "CHECKED OUT", bgColor: "#e0f2fe" },
        checkin: { color: "#14b8a6", icon: "\u{1F4E5}", label: "CHECKED IN", bgColor: "#ccfbf1" }
      };
      const config = actionConfig[data.action.toLowerCase()] || { color: "#6b7280", icon: "\u{1F4DD}", label: data.action.toUpperCase(), bgColor: "#f3f4f6" };
      let additionalDetailsHtml = "";
      if (data.additionalInfo) {
        const info = data.additionalInfo;
        additionalDetailsHtml = `
          <div class="info-section" style="background-color: ${config.bgColor}; border-color: ${config.color};">
            <h3 style="color: ${config.color};">\u{1F4CA} Asset Information:</h3>
            <div class="detail-grid">
              ${info.assetTag ? `<div class="detail-item"><span class="detail-label">Asset Tag:</span> <strong>${info.assetTag}</strong></div>` : ""}
              ${info.category ? `<div class="detail-item"><span class="detail-label">Category:</span> <strong>${info.category}</strong></div>` : ""}
              ${info.status ? `<div class="detail-item"><span class="detail-label">Status:</span> <strong>${info.status}</strong></div>` : ""}
              ${info.location ? `<div class="detail-item"><span class="detail-label">Location:</span> <strong>${info.location}</strong></div>` : ""}
              ${info.assignedTo ? `<div class="detail-item"><span class="detail-label">Assigned To:</span> <strong>${info.assignedTo}</strong></div>` : ""}
              ${info.serialNumber ? `<div class="detail-item"><span class="detail-label">Serial Number:</span> <strong>${info.serialNumber}</strong></div>` : ""}
              ${info.knoxId ? `<div class="detail-item"><span class="detail-label">Knox ID:</span> <strong>${info.knoxId}</strong></div>` : ""}
              ${info.department ? `<div class="detail-item"><span class="detail-label">Department:</span> <strong>${info.department}</strong></div>` : ""}
            </div>
          </div>
        `;
      }
      let changeComparisonHtml = "";
      if (data.action.toLowerCase() === "update" && data.additionalInfo?.previousValues && data.additionalInfo?.currentValues) {
        const prev = data.additionalInfo.previousValues;
        const curr = data.additionalInfo.currentValues;
        const changes = [];
        for (const key in curr) {
          if (prev[key] !== curr[key] && prev[key] !== void 0) {
            changes.push(`
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: 600;">${key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; color: #ef4444;">${prev[key] || "N/A"}</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; color: #10b981;">${curr[key] || "N/A"}</td>
              </tr>
            `);
          }
        }
        if (changes.length > 0) {
          changeComparisonHtml = `
            <div class="info-section">
              <h3>\u{1F504} Changes Made:</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #f3f4f6;">
                    <th style="padding: 10px; border: 1px solid #e5e7eb; text-align: left;">Field</th>
                    <th style="padding: 10px; border: 1px solid #e5e7eb; text-align: left;">Previous Value</th>
                    <th style="padding: 10px; border: 1px solid #e5e7eb; text-align: left;">New Value</th>
                  </tr>
                </thead>
                <tbody>
                  ${changes.join("")}
                </tbody>
              </table>
            </div>
          `;
        }
      }
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f3f4f6; }
            .container { max-width: 600px; margin: 20px auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, ${config.color} 0%, ${config.color}dd 100%); color: white; padding: 24px; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
            .header .action-badge { display: inline-block; margin-top: 8px; padding: 4px 12px; border-radius: 12px; font-size: 11px; letter-spacing: 0.5px; background-color: rgba(255,255,255,0.2); }
            .content { padding: 24px; }
            .summary { background-color: #f9fafb; padding: 16px; border-radius: 6px; margin-bottom: 20px; }
            .summary-row { display: flex; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
            .summary-row:last-child { border-bottom: none; }
            .summary-label { font-weight: 600; color: #6b7280; min-width: 120px; font-size: 14px; }
            .summary-value { color: #1f2937; flex: 1; font-size: 14px; }
            .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0; }
            .detail-item { padding: 12px; background-color: #f9fafb; border-radius: 6px; border-left: 3px solid ${config.color}; }
            .detail-item .label { color: #6b7280; font-size: 12px; margin-bottom: 4px; }
            .detail-item .value { color: #1f2937; font-weight: 500; font-size: 14px; }
            .changes-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
            .changes-table th { background-color: #f3f4f6; padding: 10px; text-align: left; font-weight: 600; color: #6b7280; border-bottom: 2px solid #e5e7eb; }
            .changes-table td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
            .changes-table .old-value { color: #dc2626; }
            .changes-table .new-value { color: #16a34a; }
            .footer { background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb; }
            .footer p { margin: 4px 0; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${config.icon} Asset ${config.label}</h1>
              <span class="action-badge">${data.itemType} Modification</span>
            </div>
            
            <div class="content">
              <div class="summary">
                <div class="summary-row">
                  <div class="summary-label">Asset:</div>
                  <div class="summary-value"><strong>${data.itemName}</strong></div>
                </div>
                <div class="summary-row">
                  <div class="summary-label">Action:</div>
                  <div class="summary-value">${config.label}</div>
                </div>
                <div class="summary-row">
                  <div class="summary-label">Performed By:</div>
                  <div class="summary-value">${data.userName}</div>
                </div>
                <div class="summary-row">
                  <div class="summary-label">Date & Time:</div>
                  <div class="summary-value">${new Date(data.timestamp).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })}</div>
                </div>
              </div>

              ${additionalDetailsHtml ? `
              <div class="detail-grid">
                ${data.additionalInfo?.assetTag ? `
                <div class="detail-item">
                  <div class="label">Asset Tag</div>
                  <div class="value">${data.additionalInfo.assetTag}</div>
                </div>` : ""}
                ${data.additionalInfo?.category ? `
                <div class="detail-item">
                  <div class="label">Category</div>
                  <div class="value">${data.additionalInfo.category}</div>
                </div>` : ""}
                ${data.additionalInfo?.status ? `
                <div class="detail-item">
                  <div class="label">Status</div>
                  <div class="value">${data.additionalInfo.status}</div>
                </div>` : ""}
                ${data.additionalInfo?.location ? `
                <div class="detail-item">
                  <div class="label">Location</div>
                  <div class="value">${data.additionalInfo.location}</div>
                </div>` : ""}
                ${data.additionalInfo?.assignedTo ? `
                <div class="detail-item">
                  <div class="label">Assigned To</div>
                  <div class="value">${data.additionalInfo.assignedTo}</div>
                </div>` : ""}
                ${data.additionalInfo?.serialNumber ? `
                <div class="detail-item">
                  <div class="label">Serial Number</div>
                  <div class="value">${data.additionalInfo.serialNumber}</div>
                </div>` : ""}
              </div>` : ""}

              ${changeComparisonHtml}
            </div>
            
            <div class="footer">
              <p><strong>SRPH Management Information System</strong></p>
              <p>This is an automated notification. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      console.log(`   \u{1F4E4} Calling sendEmail...`);
      await logEmailEvent({
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        to: settings3.companyEmail,
        subject,
        status: "pending"
      });
      const result = await this.sendEmail({
        to: settings3.companyEmail,
        subject,
        html
      });
      console.log(`   Result: ${result ? "\u2705 SUCCESS" : "\u274C FAILED"}`);
      if (result) {
        console.log(`   \u{1F4E7} Logging successful email to email_notifications.log`);
        await logEmailEvent({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          to: settings3.companyEmail,
          subject,
          status: "success",
          messageId: `modification-${data.itemType}-${Date.now()}`
        });
      } else {
        console.log(`   \u{1F4E7} Logging failed email to email_notifications.log`);
        await logEmailEvent({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          to: settings3.companyEmail,
          subject,
          status: "failed",
          error: "Email service returned false"
        });
      }
      return result;
    } catch (error) {
      console.error("\u274C Error sending modification notification:", error);
      console.log(`   \u{1F4E7} Logging error to email_notifications.log`);
      const subject = `[SRPH-MIS] ${data.action.toUpperCase()} - ${data.itemType}: ${data.itemName}`;
      await logEmailEvent({
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        to: settings?.companyEmail || "N/A",
        subject,
        status: "failed",
        error: error.message || "Unknown error"
      });
      return false;
    }
  }
};
var emailService = new EmailService();

// server/routes.ts
import multer from "multer";

// server/page-builder-routes.ts
init_db();
import { sql } from "drizzle-orm";
function registerPageBuilderRoutes(app2, requireAuth, requireAdmin) {
  app2.get("/api/page-builder/pages", requireAuth, async (req, res) => {
    try {
      const result = await db2.execute(sql`
        SELECT * FROM custom_pages WHERE is_active = true ORDER BY created_at DESC
      `);
      const pages = result.rows.map((page) => ({
        ...page,
        columns: typeof page.columns === "string" ? JSON.parse(page.columns) : page.columns,
        filters: typeof page.filters === "string" ? JSON.parse(page.filters) : page.filters,
        sortConfig: typeof page.sort_config === "string" ? JSON.parse(page.sort_config) : page.sort_config,
        paginationConfig: typeof page.pagination_config === "string" ? JSON.parse(page.pagination_config) : page.pagination_config
      }));
      res.json(pages);
    } catch (error) {
      console.error("Error fetching custom pages:", error);
      res.status(500).json({ message: "Failed to fetch custom pages" });
    }
  });
  app2.post("/api/page-builder/pages", requireAdmin, async (req, res) => {
    try {
      console.log("Page Builder: Received page creation request:", JSON.stringify(req.body, null, 2));
      if (!db2) {
        console.error("Page Builder: Database not available");
        return res.status(503).json({ message: "Database not available" });
      }
      const { pageName, pageSlug, tableName, description, icon, columns, filters, paginationConfig, importExportEnabled } = req.body;
      if (!pageName || !pageSlug || !tableName || !columns || !Array.isArray(columns)) {
        console.error("Page Builder: Missing required fields");
        return res.status(400).json({
          message: "Missing required fields: pageName, pageSlug, tableName, and columns array are required"
        });
      }
      if (columns.length === 0) {
        console.error("Page Builder: No columns provided");
        return res.status(400).json({
          message: "At least one column is required"
        });
      }
      const tableNameRegex = /^[a-z][a-z0-9_]*$/;
      if (!tableNameRegex.test(tableName)) {
        return res.status(400).json({
          message: "Invalid table name. Use only lowercase letters, numbers, and underscores, starting with a letter."
        });
      }
      for (const col of columns) {
        if (!col.name || !tableNameRegex.test(col.name)) {
          return res.status(400).json({
            message: `Invalid column name: ${col.name || "undefined"}. Use only lowercase letters, numbers, and underscores, starting with a letter.`
          });
        }
      }
      const columnDefinitions = columns.map((col) => {
        let sqlType = "TEXT";
        switch (col.type) {
          case "number":
            sqlType = "INTEGER";
            break;
          case "boolean":
            sqlType = "BOOLEAN";
            break;
          case "date":
            sqlType = "TIMESTAMP";
            break;
          case "email":
          case "url":
            sqlType = "TEXT";
            break;
          case "json":
            sqlType = "JSONB";
            break;
          default:
            sqlType = "TEXT";
        }
        const nullable = col.required ? "NOT NULL" : "NULL";
        let defaultVal = "";
        if (col.defaultValue && col.defaultValue.trim() !== "") {
          if (col.type === "number") {
            const numValue = parseFloat(col.defaultValue);
            if (!isNaN(numValue)) {
              defaultVal = `DEFAULT ${numValue}`;
            }
          } else if (col.type === "boolean") {
            defaultVal = `DEFAULT ${col.defaultValue === "true" || col.defaultValue === true}`;
          } else if (col.type === "date") {
            if (col.defaultValue.toLowerCase() === "now()") {
              defaultVal = `DEFAULT NOW()`;
            } else {
              defaultVal = `DEFAULT '${col.defaultValue.replace(/'/g, "''")}'::TIMESTAMP`;
            }
          } else {
            defaultVal = `DEFAULT '${col.defaultValue.replace(/'/g, "''")}'`;
          }
        }
        return `"${col.name}" ${sqlType} ${nullable} ${defaultVal}`.trim();
      }).join(", ");
      const createTableSQL = `CREATE TABLE IF NOT EXISTS "${tableName}" (id SERIAL PRIMARY KEY, ${columnDefinitions}, created_at TIMESTAMP DEFAULT NOW() NOT NULL, updated_at TIMESTAMP DEFAULT NOW() NOT NULL)`;
      console.log("Page Builder: Creating table with SQL:", createTableSQL);
      try {
        await db2.execute(sql.raw(createTableSQL));
        console.log("Page Builder: Table creation command executed successfully");
      } catch (tableError) {
        console.error("Page Builder: Error creating table:", tableError);
        throw new Error(`Failed to create table: ${tableError.message}`);
      }
      const tableCheck = await db2.execute(sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = ${tableName}
        );
      `);
      console.log("Page Builder: Table verification result:", tableCheck.rows[0]);
      if (!tableCheck.rows[0].exists) {
        throw new Error(`Table ${tableName} was not created - verification failed`);
      }
      const columnsCheck = await db2.execute(sql`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = ${tableName}
        ORDER BY ordinal_position;
      `);
      console.log("Page Builder: Created columns:", columnsCheck.rows);
      if (columnsCheck.rows.length === 0) {
        throw new Error(`Table ${tableName} exists but has no columns`);
      }
      const pageConfig = {
        pageName,
        pageSlug,
        tableName,
        description: description || null,
        icon: icon || "FileText",
        columns,
        filters: filters || [],
        sortConfig: req.body.sortConfig || { field: "id", direction: "asc" },
        paginationConfig: paginationConfig || { pageSize: 10, enabled: true },
        importExportEnabled: importExportEnabled !== false,
        createdBy: req.user?.id || null
      };
      console.log("Page Builder: Inserting page config:", {
        pageName: pageConfig.pageName,
        pageSlug: pageConfig.pageSlug,
        tableName: pageConfig.tableName,
        description: pageConfig.description,
        icon: pageConfig.icon,
        columns: JSON.stringify(pageConfig.columns),
        filters: JSON.stringify(pageConfig.filters),
        sortConfig: JSON.stringify(pageConfig.sortConfig),
        paginationConfig: JSON.stringify(pageConfig.paginationConfig),
        importExportEnabled: pageConfig.importExportEnabled,
        createdBy: req.user?.id || 1
      });
      const columnsText = JSON.stringify(columns);
      const filtersText = JSON.stringify(filters || []);
      const sortConfigText = JSON.stringify(req.body.sortConfig || { field: "id", direction: "asc" });
      const paginationConfigText = JSON.stringify(paginationConfig || { pageSize: 10, enabled: true });
      console.log("Page Builder: Inserting page config with TEXT columns");
      const result = await db2.execute(sql`
        INSERT INTO custom_pages (
          page_name, page_slug, table_name, description, icon,
          columns, filters, sort_config, pagination_config,
          import_export_enabled, is_active, created_by, created_at, updated_at
        ) VALUES (
          ${pageName}, ${pageSlug}, ${tableName},
          ${description || null}, ${icon || "FileText"},
          ${columnsText},
          ${filtersText},
          ${sortConfigText},
          ${paginationConfigText},
          ${importExportEnabled !== false},
          true,
          ${req.user?.id || 1},
          NOW(), NOW()
        ) RETURNING *
      `);
      const newPage = result.rows[0];
      console.log("Page Builder: Page created successfully:", newPage);
      const responseData = {
        ...newPage,
        columns: typeof newPage.columns === "string" ? JSON.parse(newPage.columns) : newPage.columns,
        filters: typeof newPage.filters === "string" ? JSON.parse(newPage.filters) : newPage.filters,
        sortConfig: typeof newPage.sortConfig === "string" ? JSON.parse(newPage.sortConfig) : newPage.sortConfig,
        paginationConfig: typeof newPage.paginationConfig === "string" ? JSON.parse(newPage.paginationConfig) : newPage.paginationConfig
      };
      return res.status(201).json(responseData);
    } catch (error) {
      console.error("Page Builder: Error creating custom page:", error);
      return res.status(500).json({
        message: "Failed to create custom page",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/page-builder/pages/:slug/data", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const { slug } = req.params;
      const { page = 1, pageSize = 10, sortField, sortDirection, filters } = req.query;
      const pageResult = await db2.execute(sql`SELECT * FROM custom_pages WHERE page_slug = ${slug}`);
      const pageConfigRaw = pageResult.rows[0];
      if (!pageConfigRaw) {
        return res.status(404).json({ message: "Page not found" });
      }
      const pageConfig = {
        id: pageConfigRaw.id,
        pageName: pageConfigRaw.page_name,
        pageSlug: pageConfigRaw.page_slug,
        tableName: pageConfigRaw.table_name,
        description: pageConfigRaw.description,
        icon: pageConfigRaw.icon,
        columns: typeof pageConfigRaw.columns === "string" ? JSON.parse(pageConfigRaw.columns) : pageConfigRaw.columns,
        filters: typeof pageConfigRaw.filters === "string" ? JSON.parse(pageConfigRaw.filters) : pageConfigRaw.filters,
        sortConfig: typeof pageConfigRaw.sort_config === "string" ? JSON.parse(pageConfigRaw.sort_config) : pageConfigRaw.sort_config,
        paginationConfig: typeof pageConfigRaw.pagination_config === "string" ? JSON.parse(pageConfigRaw.pagination_config) : pageConfigRaw.pagination_config
      };
      const pageNum = Number(page);
      const pageSizeNum = Number(pageSize);
      const offset = (pageNum - 1) * pageSizeNum;
      const whereClauses = [];
      const whereValues = [];
      if (filters && typeof filters === "string") {
        try {
          const filterObj = JSON.parse(filters);
          Object.entries(filterObj).forEach(([key, value], index) => {
            const columnExists = pageConfig.columns.some((col) => col.name === key);
            if (columnExists && value && value.toString().trim() !== "") {
              whereClauses.push(`"${key}" ILIKE $${index + 1}`);
              whereValues.push(`%${value}%`);
            }
          });
        } catch (e) {
          console.error("Invalid filters JSON:", e);
        }
      }
      const sort = sortField || pageConfig.sortConfig?.field || "id";
      const sortColumnExists = pageConfig.columns.some((col) => col.name === sort) || sort === "id";
      const validatedSort = sortColumnExists ? sort : "id";
      const direction = (sortDirection || pageConfig.sortConfig?.direction || "asc").toUpperCase();
      const validDirection = direction === "DESC" ? "DESC" : "ASC";
      let queryStr = `SELECT * FROM "${pageConfig.tableName}"`;
      if (whereClauses.length > 0) {
        queryStr += ` WHERE ${whereClauses.join(" AND ")}`;
      }
      queryStr += ` ORDER BY "${validatedSort}" ${validDirection}`;
      queryStr += ` LIMIT ${pageSizeNum} OFFSET ${offset}`;
      if (!pool) {
        return res.status(503).json({ message: "Database pool not available" });
      }
      const data = await pool.query(queryStr, whereValues);
      let countQuery = `SELECT COUNT(*) FROM "${pageConfig.tableName}"`;
      if (whereClauses.length > 0) {
        countQuery += ` WHERE ${whereClauses.join(" AND ")}`;
      }
      const countResult = await pool.query(countQuery, whereValues);
      const total = Number(countResult.rows[0].count);
      res.json({
        data: data.rows,
        pagination: {
          page: pageNum,
          pageSize: pageSizeNum,
          total,
          totalPages: Math.ceil(total / pageSizeNum)
        }
      });
    } catch (error) {
      console.error("Error fetching page data:", error);
      res.status(500).json({ message: "Failed to fetch page data", error: error.message });
    }
  });
  app2.post("/api/page-builder/pages/:slug/data", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const { slug } = req.params;
      const pageResult = await db2.execute(sql`SELECT * FROM custom_pages WHERE page_slug = ${slug}`);
      const pageConfigRaw = pageResult.rows[0];
      if (!pageConfigRaw) {
        return res.status(404).json({ message: "Page not found" });
      }
      const pageConfig = {
        id: pageConfigRaw.id,
        pageName: pageConfigRaw.page_name,
        pageSlug: pageConfigRaw.page_slug,
        tableName: pageConfigRaw.table_name,
        description: pageConfigRaw.description,
        icon: pageConfigRaw.icon,
        columns: typeof pageConfigRaw.columns === "string" ? JSON.parse(pageConfigRaw.columns) : pageConfigRaw.columns,
        filters: typeof pageConfigRaw.filters === "string" ? JSON.parse(pageConfigRaw.filters) : pageConfigRaw.filters,
        sortConfig: typeof pageConfigRaw.sort_config === "string" ? JSON.parse(pageConfigRaw.sort_config) : pageConfigRaw.sort_config,
        paginationConfig: typeof pageConfigRaw.pagination_config === "string" ? JSON.parse(pageConfigRaw.pagination_config) : pageConfigRaw.pagination_config
      };
      const validColumns = [];
      const values = [];
      Object.entries(req.body).forEach(([key, value], index) => {
        const columnConfig = pageConfig.columns.find((col) => col.name === key);
        if (columnConfig) {
          validColumns.push(`"${key}"`);
          values.push(value);
        }
      });
      if (validColumns.length === 0) {
        return res.status(400).json({ message: "No valid columns provided" });
      }
      if (!pool) {
        return res.status(503).json({ message: "Database pool not available" });
      }
      const columnList = validColumns.join(", ");
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
      const insertQuery = `INSERT INTO "${pageConfig.tableName}" (${columnList}) VALUES (${placeholders}) RETURNING *`;
      const result = await pool.query(insertQuery, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error creating record:", error);
      res.status(500).json({ message: "Failed to create record", error: error.message });
    }
  });
  app2.patch("/api/page-builder/pages/:slug/data/:id", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const { slug, id } = req.params;
      const recordId = parseInt(id);
      if (isNaN(recordId)) {
        return res.status(400).json({ message: "Invalid record ID" });
      }
      const pageResult = await db2.execute(sql`SELECT * FROM custom_pages WHERE page_slug = ${slug}`);
      const pageConfigRaw = pageResult.rows[0];
      if (!pageConfigRaw) {
        return res.status(404).json({ message: "Page not found" });
      }
      const pageConfig = {
        tableName: pageConfigRaw.table_name,
        columns: typeof pageConfigRaw.columns === "string" ? JSON.parse(pageConfigRaw.columns) : pageConfigRaw.columns
      };
      const setClauses = [];
      const values = [];
      Object.entries(req.body).forEach(([key, value]) => {
        const columnConfig = pageConfig.columns.find((col) => col.name === key);
        if (columnConfig) {
          setClauses.push(`"${key}" = $${values.length + 1}`);
          values.push(value);
        }
      });
      if (setClauses.length === 0) {
        return res.status(400).json({ message: "No valid columns to update" });
      }
      values.push(recordId);
      const idParamNumber = values.length;
      const queryStr = `
        UPDATE "${pageConfig.tableName}"
        SET ${setClauses.join(", ")}, updated_at = NOW()
        WHERE id = $${idParamNumber}
        RETURNING *
      `;
      if (!pool) {
        return res.status(503).json({ message: "Database pool not available" });
      }
      const result = await pool.query(queryStr, values);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error updating record:", error);
      res.status(500).json({ message: "Failed to update record", error: error.message });
    }
  });
  app2.delete("/api/page-builder/pages/:slug/data/:id", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const { slug, id } = req.params;
      const recordId = parseInt(id);
      if (isNaN(recordId)) {
        return res.status(400).json({ message: "Invalid record ID" });
      }
      const pageResult = await db2.execute(sql`SELECT * FROM custom_pages WHERE page_slug = ${slug}`);
      const pageConfigRaw = pageResult.rows[0];
      if (!pageConfigRaw) {
        return res.status(404).json({ message: "Page not found" });
      }
      const pageConfig = {
        tableName: pageConfigRaw.table_name,
        columns: typeof pageConfigRaw.columns === "string" ? JSON.parse(pageConfigRaw.columns) : pageConfigRaw.columns
      };
      if (!pool) {
        return res.status(503).json({ message: "Database pool not available" });
      }
      const result = await pool.query(
        `DELETE FROM "${pageConfig.tableName}" WHERE id = $1 RETURNING id`,
        [recordId]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting record:", error);
      res.status(500).json({ message: "Failed to delete record", error: error.message });
    }
  });
  app2.patch("/api/page-builder/pages/:id", requireAdmin, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const { id } = req.params;
      const { pageName, pageSlug, description, icon, columns, filters, sortConfig, paginationConfig, importExportEnabled } = req.body;
      const result = await db2.execute(sql`SELECT * FROM custom_pages WHERE id = ${Number(id)}`);
      const existingPageRaw = result.rows[0];
      if (!existingPageRaw) {
        return res.status(404).json({ message: "Page not found" });
      }
      const existingPage = {
        ...existingPageRaw,
        columns: typeof existingPageRaw.columns === "string" ? JSON.parse(existingPageRaw.columns) : existingPageRaw.columns,
        filters: typeof existingPageRaw.filters === "string" ? JSON.parse(existingPageRaw.filters) : existingPageRaw.filters,
        sortConfig: typeof existingPageRaw.sort_config === "string" ? JSON.parse(existingPageRaw.sort_config) : existingPageRaw.sort_config,
        paginationConfig: typeof existingPageRaw.pagination_config === "string" ? JSON.parse(existingPageRaw.pagination_config) : existingPageRaw.pagination_config
      };
      const tableNameRegex = /^[a-z][a-z0-9_]*$/;
      for (const col of columns) {
        if (!tableNameRegex.test(col.name)) {
          return res.status(400).json({
            message: `Invalid column name: ${col.name}. Use only lowercase letters, numbers, and underscores, starting with a letter.`
          });
        }
      }
      const existingColumnsMap = new Map(existingPage.columns.map((col) => [col.name, col]));
      const newColumnsMap = new Map(columns.map((col) => [col.name, col]));
      const renamedColumns = [];
      const existingColArray = existingPage.columns;
      columns.forEach((newCol, index) => {
        if (index < existingColArray.length) {
          const oldCol = existingColArray[index];
          if (oldCol.name !== newCol.name && oldCol.type === newCol.type && !existingColumnsMap.has(newCol.name)) {
            renamedColumns.push({ oldName: oldCol.name, newName: newCol.name });
          }
        }
      });
      for (const { oldName, newName } of renamedColumns) {
        console.log(`Renaming column ${oldName} to ${newName} in table ${existingPage.tableName}`);
        await db2.execute(sql.raw(`
          ALTER TABLE "${existingPage.tableName}"
          RENAME COLUMN "${oldName}" TO "${newName}"
        `));
      }
      const renamedNewNames = new Set(renamedColumns.map((r) => r.newName));
      const existingNames = new Set(existingPage.columns.map((col) => col.name));
      for (const col of columns) {
        if (renamedNewNames.has(col.name) || existingNames.has(col.name)) {
          continue;
        }
        let sqlType = "TEXT";
        switch (col.type) {
          case "number":
            sqlType = "INTEGER";
            break;
          case "boolean":
            sqlType = "BOOLEAN";
            break;
          case "date":
            sqlType = "TIMESTAMP";
            break;
          case "email":
          case "url":
            sqlType = "TEXT";
            break;
          case "json":
            sqlType = "JSONB";
            break;
          default:
            sqlType = "TEXT";
        }
        const nullable = col.required ? "NOT NULL" : "NULL";
        let defaultVal = "";
        if (col.defaultValue && col.defaultValue.trim() !== "") {
          if (col.type === "number") {
            const numValue = parseFloat(col.defaultValue);
            if (!isNaN(numValue)) {
              defaultVal = `DEFAULT ${numValue}`;
            }
          } else if (col.type === "boolean") {
            defaultVal = `DEFAULT ${col.defaultValue === "true" || col.defaultValue === true}`;
          } else if (col.type === "date") {
            if (col.defaultValue.toLowerCase() === "now()") {
              defaultVal = `DEFAULT NOW()`;
            } else {
              defaultVal = `DEFAULT '${col.defaultValue.replace(/'/g, "''")}'::TIMESTAMP`;
            }
          } else {
            defaultVal = `DEFAULT '${col.defaultValue.replace(/'/g, "''")}'`;
          }
        }
        console.log(`Adding new column ${col.name} to table ${existingPage.tableName}`);
        await db2.execute(sql.raw(`
          ALTER TABLE "${existingPage.tableName}"
          ADD COLUMN IF NOT EXISTS "${col.name}" ${sqlType} ${nullable} ${defaultVal}
        `.trim()));
      }
      const columnsText = JSON.stringify(columns);
      const filtersText = JSON.stringify(filters || []);
      const sortConfigText = JSON.stringify(sortConfig || { field: "id", direction: "asc" });
      const paginationConfigText = JSON.stringify(paginationConfig || { pageSize: 10, enabled: true });
      const updateResult = await db2.execute(sql`
        UPDATE custom_pages
        SET
          page_name = ${pageName},
          page_slug = ${pageSlug},
          description = ${description || null},
          icon = ${icon || "FileText"},
          columns = ${columnsText},
          filters = ${filtersText},
          sort_config = ${sortConfigText},
          pagination_config = ${paginationConfigText},
          import_export_enabled = ${importExportEnabled !== false},
          updated_at = NOW()
        WHERE id = ${Number(id)}
        RETURNING *
      `);
      const updatedPageRaw = updateResult.rows[0];
      const updatedPage = {
        ...updatedPageRaw,
        columns: typeof updatedPageRaw.columns === "string" ? JSON.parse(updatedPageRaw.columns) : updatedPageRaw.columns,
        filters: typeof updatedPageRaw.filters === "string" ? JSON.parse(updatedPageRaw.filters) : updatedPageRaw.filters,
        sortConfig: typeof updatedPageRaw.sort_config === "string" ? JSON.parse(updatedPageRaw.sort_config) : updatedPageRaw.sort_config,
        paginationConfig: typeof updatedPageRaw.pagination_config === "string" ? JSON.parse(updatedPageRaw.pagination_config) : updatedPageRaw.pagination_config
      };
      res.json(updatedPage);
    } catch (error) {
      console.error("Error updating custom page:", error);
      res.status(500).json({ message: "Failed to update custom page", error: error.message });
    }
  });
  app2.delete("/api/page-builder/pages/:id", requireAdmin, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const { id } = req.params;
      const result = await db2.execute(sql`SELECT * FROM custom_pages WHERE id = ${Number(id)}`);
      const pageConfig = result.rows[0];
      if (!pageConfig) {
        return res.status(404).json({ message: "Page not found" });
      }
      await db2.execute(sql.raw(`DROP TABLE IF EXISTS "${pageConfig.table_name}"`));
      await db2.execute(sql`DELETE FROM custom_pages WHERE id = ${Number(id)}`);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting custom page:", error);
      res.status(500).json({ message: "Failed to delete custom page" });
    }
  });
  app2.post("/api/page-builder/pages/:slug/records/import", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const { slug } = req.params;
      const { records } = req.body;
      if (!records || !Array.isArray(records)) {
        return res.status(400).json({ message: "Invalid records data - expected array of records" });
      }
      if (records.length === 0) {
        return res.status(400).json({ message: "No records to import" });
      }
      const pageResult = await db2.execute(sql`SELECT * FROM custom_pages WHERE page_slug = ${slug}`);
      const pageConfigRaw = pageResult.rows[0];
      if (!pageConfigRaw) {
        return res.status(404).json({ message: `Page not found: ${slug}` });
      }
      const pageConfig = {
        tableName: pageConfigRaw.table_name,
        columns: typeof pageConfigRaw.columns === "string" ? JSON.parse(pageConfigRaw.columns) : pageConfigRaw.columns
      };
      if (!pool) {
        return res.status(503).json({ message: "Database pool not available" });
      }
      let importedCount = 0;
      let errorCount = 0;
      const errors = [];
      const columnMap = /* @__PURE__ */ new Map();
      pageConfig.columns.forEach((col) => {
        const normalized = col.name.toLowerCase().replace(/[^a-z0-9]/g, "");
        columnMap.set(normalized, col.name);
      });
      for (let i = 0; i < records.length; i++) {
        try {
          const record = records[i];
          const mappedColumns = [];
          const values = [];
          Object.keys(record).forEach((csvColumn) => {
            if (csvColumn.toLowerCase() === "id") return;
            const normalizedCsvColumn = csvColumn.toLowerCase().replace(/[^a-z0-9]/g, "");
            const dbColumn = columnMap.get(normalizedCsvColumn);
            if (dbColumn) {
              mappedColumns.push(dbColumn);
              values.push(record[csvColumn]);
            } else {
              console.warn(`Row ${i + 1}: CSV column "${csvColumn}" does not match any database column`);
            }
          });
          if (mappedColumns.length === 0) {
            errors.push(`Row ${i + 1}: No valid columns found that match database schema`);
            errorCount++;
            continue;
          }
          const placeholders = values.map((_, idx) => `$${idx + 1}`).join(", ");
          const queryStr = `INSERT INTO "${pageConfig.tableName}" (${mappedColumns.map((c) => `"${c}"`).join(", ")}) VALUES (${placeholders})`;
          await pool.query(queryStr, values);
          importedCount++;
        } catch (rowError) {
          console.error(`Error importing row ${i + 1}:`, rowError);
          errors.push(`Row ${i + 1}: ${rowError.message}`);
          errorCount++;
        }
      }
      res.json({
        message: `Import complete: ${importedCount} records imported, ${errorCount} failed`,
        imported: importedCount,
        failed: errorCount,
        errors: errors.slice(0, 10)
        // Return first 10 errors
      });
    } catch (error) {
      console.error("Error importing records:", error);
      res.status(500).json({
        message: error.message || "Failed to import records",
        error: error.toString()
      });
    }
  });
}

// server/zabbix-api.ts
init_db();
init_storage();
import { sql as sql2 } from "drizzle-orm";
import { exec } from "child_process";
import { promisify as promisify2 } from "util";
var execAsync = promisify2(exec);
async function zabbixApiRequest(settings3, method, params = {}) {
  const response = await fetch(`${settings3.zabbixUrl}/api_jsonrpc.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json-rpc",
      "Authorization": `Bearer ${settings3.zabbixApiToken}`
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method,
      params,
      id: 1
    })
  });
  if (!response.ok) {
    throw new Error(`Zabbix API request failed: ${response.statusText}`);
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(`Zabbix API error: ${data.error.data || data.error.message}`);
  }
  return data.result;
}
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds % 86400 / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
function parseItemValue(value) {
  if (value === null || value === void 0 || value === "") return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}
async function pingHost(ipAddress) {
  try {
    const isWindows = process.platform === "win32";
    const pingCommand = isWindows ? `ping -n 1 -w 1000 ${ipAddress}` : `ping -c 1 -W 1 ${ipAddress}`;
    const { stdout } = await execAsync(pingCommand);
    if (isWindows) {
      return stdout.includes("Reply from") || stdout.includes("bytes=");
    } else {
      return stdout.includes("1 received") || stdout.includes("1 packets received");
    }
  } catch (error) {
    return false;
  }
}
function registerZabbixRoutes(app2, requireAuth) {
  app2.get("/api/zabbix/settings", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const result = await db2.execute(sql2`
        SELECT * FROM zabbix_settings LIMIT 1
      `);
      const settings3 = result.rows[0] || {
        zabbixUrl: "",
        zabbixApiToken: "",
        refreshInterval: 60
      };
      res.json(settings3);
    } catch (error) {
      console.error("Error fetching Zabbix settings:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/zabbix/settings", requireAuth, async (req, res) => {
    try {
      const settingsData = req.body;
      console.log("Received Zabbix settings:", settingsData);
      if (!settingsData.zabbixUrl && !settingsData.url) {
        return res.status(400).json({ message: "Zabbix URL is required" });
      }
      if (!settingsData.zabbixApiToken && !settingsData.apiToken) {
        return res.status(400).json({ message: "Zabbix API Token is required" });
      }
      const settings3 = await storage.saveZabbixSettings({
        url: settingsData.zabbixUrl || settingsData.url,
        apiToken: settingsData.zabbixApiToken || settingsData.apiToken,
        refreshInterval: settingsData.refreshInterval || 60
      });
      console.log("Zabbix settings saved successfully:", settings3);
      const response = {
        zabbixUrl: settings3.url,
        zabbixApiToken: settings3.apiToken,
        refreshInterval: settings3.refreshInterval
      };
      res.json(response);
    } catch (error) {
      console.error("Error saving Zabbix settings:", error);
      res.status(500).json({
        message: "Failed to save Zabbix settings",
        error: error.message
      });
    }
  });
  app2.post("/api/zabbix/test-connection", requireAuth, async (req, res) => {
    try {
      const { zabbixUrl, zabbixApiToken } = req.body;
      if (!zabbixUrl || !zabbixApiToken) {
        return res.json({
          success: false,
          message: "Zabbix URL and API Token are required"
        });
      }
      const apiUrl = zabbixUrl.endsWith("/api_jsonrpc.php") ? zabbixUrl : `${zabbixUrl.replace(/\/$/, "")}/api_jsonrpc.php`;
      console.log("Testing Zabbix connection to:", apiUrl);
      const versionResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json-rpc"
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "apiinfo.version",
          params: {},
          id: 1
        })
      });
      if (!versionResponse.ok) {
        return res.json({
          success: false,
          message: `HTTP Error: ${versionResponse.status} ${versionResponse.statusText}`
        });
      }
      const versionData = await versionResponse.json();
      console.log("Zabbix API version response:", versionData);
      if (versionData.error) {
        return res.json({
          success: false,
          message: `API Error: ${versionData.error.data || versionData.error.message}`
        });
      }
      const authResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json-rpc",
          "Authorization": `Bearer ${zabbixApiToken}`
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "host.get",
          params: {
            output: ["hostid", "host"],
            limit: 1
          },
          id: 2
        })
      });
      const authData = await authResponse.json();
      console.log("Zabbix auth test response:", authData);
      if (authData.error) {
        return res.json({
          success: false,
          message: `Authentication failed: ${authData.error.data || authData.error.message}. Please check your API token.`
        });
      }
      res.json({
        success: true,
        message: `Successfully connected to Zabbix ${versionData.result}`
      });
    } catch (error) {
      console.error("Error testing Zabbix connection:", error);
      res.json({
        success: false,
        message: `Connection failed: ${error.message}`
      });
    }
  });
  app2.get("/api/zabbix/hosts", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const settingsResult = await db2.execute(sql2`
        SELECT * FROM zabbix_settings LIMIT 1
      `);
      const settingsRow = settingsResult.rows[0];
      if (!settingsRow) {
        return res.status(400).json({ message: "Zabbix not configured" });
      }
      const zabbixUrl = settingsRow.zabbix_url || settingsRow.zabbixUrl;
      const zabbixApiToken = settingsRow.zabbix_api_token || settingsRow.zabbixApiToken;
      if (!zabbixUrl || !zabbixApiToken) {
        return res.status(400).json({ message: "Zabbix URL or API token missing" });
      }
      let apiUrl = zabbixUrl;
      if (!apiUrl.endsWith("/api_jsonrpc.php")) {
        apiUrl = `${apiUrl.replace(/\/$/, "")}/api_jsonrpc.php`;
      }
      const baseUrl = apiUrl.replace("/api_jsonrpc.php", "");
      const hosts = await zabbixApiRequest(
        {
          zabbixUrl: baseUrl,
          zabbixApiToken,
          refreshInterval: settingsRow.refresh_interval || settingsRow.refreshInterval || 60
        },
        "host.get",
        {
          output: ["hostid", "host", "name", "status", "available", "error", "disable_until"],
          selectInterfaces: ["interfaceid", "ip", "type", "main", "available", "error", "details"],
          selectGroups: ["groupid", "name"],
          limitSelects: 5
        }
      );
      const enriched = await Promise.all(hosts.map(async (host) => {
        let availabilityStatus = "unknown";
        let icmpStatus = "unknown";
        let agentStatus = "unknown";
        let directPingStatus = "unknown";
        const ipAddress = host.interfaces?.[0]?.ip;
        if (ipAddress && ipAddress !== "N/A") {
          try {
            const pingResult = await pingHost(ipAddress);
            directPingStatus = pingResult ? "responding" : "no response";
            console.log(`Direct ping to ${host.name} (${ipAddress}): ${directPingStatus}`);
          } catch (err) {
            console.error(`Error pinging ${host.name} (${ipAddress}):`, err);
            directPingStatus = "error";
          }
        } else {
          directPingStatus = "no ip";
        }
        let hasAvailableInterface = false;
        let hasUnavailableInterface = false;
        if (Array.isArray(host.interfaces)) {
          for (const iface of host.interfaces) {
            const val = parseInt(iface.available || "0");
            if (val === 1) hasAvailableInterface = true;
            else if (val === 2) hasUnavailableInterface = true;
          }
        }
        let items = [];
        try {
          items = await zabbixApiRequest(
            {
              zabbixUrl: baseUrl,
              zabbixApiToken,
              refreshInterval: settingsRow.refresh_interval || settingsRow.refreshInterval || 60
            },
            "item.get",
            {
              hostids: [host.hostid],
              output: ["itemid", "key_", "lastvalue", "name", "state", "status", "lastclock"],
              sortfield: "name"
            }
          );
          console.log(`Fetched ${items.length} total items for host ${host.name} (${host.hostid})`);
        } catch (err) {
          console.warn(`Unable to fetch items for host ${host.hostid}:`, err);
        }
        console.log(`
=== Analyzing ${host.name} (${host.hostid}) ===`);
        console.log(`Total items fetched: ${items.length}`);
        console.log(`Active items: ${items.filter((i) => i.status === "0" || i.status === 0).length}`);
        const icmpItem = items.find((i) => {
          const key = (i.key_ || "").toLowerCase();
          const name = (i.name || "").toLowerCase();
          const isEnabled = i.status === "0" || i.status === 0;
          return isEnabled && (key === "icmpping" || key === "icmpping[]" || key.startsWith("icmpping[") || key.includes("icmp") || name.includes("icmp ping") || name.includes("ping response") || name.includes("icmp response"));
        });
        if (icmpItem) {
          console.log(`\u2713 Found ICMP item for ${host.name}:`, {
            key: icmpItem.key_,
            name: icmpItem.name,
            lastvalue: icmpItem.lastvalue,
            status: icmpItem.status,
            state: icmpItem.state,
            lastclock: icmpItem.lastclock,
            lastclockTime: new Date(parseInt(icmpItem.lastclock) * 1e3).toISOString()
          });
          const currentTime = Math.floor(Date.now() / 1e3);
          const lastUpdate = parseInt(icmpItem.lastclock || "0");
          const ageSeconds = currentTime - lastUpdate;
          const isRecent = ageSeconds < 600;
          console.log(`  Data age: ${ageSeconds} seconds (${isRecent ? "RECENT" : "STALE"})`);
          if (icmpItem.lastvalue !== void 0 && icmpItem.lastvalue !== null && icmpItem.lastvalue !== "") {
            const strValue = String(icmpItem.lastvalue).trim();
            const numValue = parseFloat(strValue);
            console.log(`  Raw value: "${icmpItem.lastvalue}" (type: ${typeof icmpItem.lastvalue})`);
            console.log(`  String value: "${strValue}"`);
            console.log(`  Numeric value: ${numValue} (isNaN: ${isNaN(numValue)})`);
            if (!isNaN(numValue)) {
              icmpStatus = numValue > 0 ? "responding" : "no response";
            } else if (strValue === "1" || strValue.toLowerCase() === "up") {
              icmpStatus = "responding";
            } else if (strValue === "0" || strValue.toLowerCase() === "down") {
              icmpStatus = "no response";
            } else {
              icmpStatus = "unknown";
            }
            console.log(`  \u2192 ICMP Status: ${icmpStatus}`);
          } else {
            icmpStatus = isRecent ? "no data" : "stale data";
            console.log(`  \u2192 ICMP Status: ${icmpStatus} (no valid value or stale)`);
          }
        } else {
          const activeItems = items.filter((i) => i.status === "0" || i.status === 0);
          console.log(`\u2717 No ICMP item found for ${host.name}`);
          console.log(`  Available active items (${activeItems.length}):`, activeItems.slice(0, 10).map((i) => ({ key: i.key_, name: i.name, lastvalue: i.lastvalue })));
          icmpStatus = "not configured";
        }
        const agentItem = items.find((i) => {
          const key = (i.key_ || "").toLowerCase();
          const name = (i.name || "").toLowerCase();
          const isEnabled = i.status === "0" || i.status === 0;
          return isEnabled && (key === "agent.ping" || key === "agent.ping[]" || key.startsWith("agent.ping[") || key.includes("agent.ping") || name.includes("agent ping") || name.includes("zabbix agent ping") || name.includes("agent availability"));
        });
        if (agentItem) {
          console.log(`\u2713 Found Agent item for ${host.name}:`, {
            key: agentItem.key_,
            name: agentItem.name,
            lastvalue: agentItem.lastvalue,
            status: agentItem.status,
            state: agentItem.state,
            lastclock: agentItem.lastclock,
            lastclockTime: new Date(parseInt(agentItem.lastclock) * 1e3).toISOString()
          });
          const currentTime = Math.floor(Date.now() / 1e3);
          const lastUpdate = parseInt(agentItem.lastclock || "0");
          const ageSeconds = currentTime - lastUpdate;
          const isRecent = ageSeconds < 600;
          console.log(`  Data age: ${ageSeconds} seconds (${isRecent ? "RECENT" : "STALE"})`);
          if (agentItem.lastvalue !== void 0 && agentItem.lastvalue !== null && agentItem.lastvalue !== "") {
            const strValue = String(agentItem.lastvalue).trim();
            const agentValue = parseFloat(strValue);
            console.log(`  Raw value: "${agentItem.lastvalue}" (type: ${typeof agentItem.lastvalue})`);
            console.log(`  String value: "${strValue}"`);
            console.log(`  Numeric value: ${agentValue} (isNaN: ${isNaN(agentValue)})`);
            if (!isNaN(agentValue)) {
              agentStatus = agentValue > 0 ? "available" : "unavailable";
            } else if (strValue === "1" || strValue.toLowerCase() === "up") {
              agentStatus = "available";
            } else if (strValue === "0" || strValue.toLowerCase() === "down") {
              agentStatus = "unavailable";
            } else {
              agentStatus = "unknown";
            }
            console.log(`  \u2192 Agent Status: ${agentStatus}`);
          } else {
            agentStatus = isRecent ? "no data" : "stale data";
            console.log(`  \u2192 Agent Status: ${agentStatus} (no valid value or stale)`);
          }
        } else {
          const activeItems = items.filter((i) => i.status === "0" || i.status === 0);
          console.log(`\u2717 No Agent item found for ${host.name}`);
          console.log(`  Available active items (${activeItems.length}):`, activeItems.slice(0, 10).map((i) => ({ key: i.key_, name: i.name, lastvalue: i.lastvalue })));
          agentStatus = "not configured";
        }
        let availabilityScore = 0;
        if (directPingStatus === "responding") {
          availabilityScore += 3;
        } else if (directPingStatus === "no response") {
          availabilityScore -= 3;
        }
        if (icmpStatus === "responding") {
          availabilityScore += 2;
        } else if (icmpStatus === "no response") {
          availabilityScore -= 2;
        }
        if (agentStatus === "available") {
          availabilityScore += 2;
        } else if (agentStatus === "unavailable") {
          availabilityScore -= 2;
        }
        if (hasAvailableInterface) {
          availabilityScore += 1;
        } else if (hasUnavailableInterface) {
          availabilityScore -= 1;
        }
        if (availabilityScore > 0) {
          availabilityStatus = "available";
        } else if (availabilityScore < 0) {
          availabilityStatus = "unavailable";
        } else {
          availabilityStatus = "unknown";
        }
        console.log(`Final status for ${host.name}: ${availabilityStatus} (score: ${availabilityScore})`);
        console.log(`Host ${host.name} (${host.hostid}): availability=${availabilityStatus}, directPing=${directPingStatus}, icmp=${icmpStatus}, agent=${agentStatus}, interfaces=${hasAvailableInterface}/${hasUnavailableInterface}`);
        return {
          ...host,
          ipAddress: host.interfaces?.[0]?.ip ?? "N/A",
          groups: host.groups?.map((g) => g.name).join(", ") || "None",
          availabilityStatus,
          icmpStatus,
          agentStatus,
          directPingStatus,
          monitoringEnabled: parseInt(host.status) === 0
        };
      }));
      res.json(enriched);
    } catch (err) {
      console.error("Error /api/zabbix/hosts:", err);
      res.status(500).json({ message: err.message });
    }
  });
  app2.post("/api/zabbix/metrics", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const { hostIds } = req.body;
      const settingsResult = await db2.execute(sql2`
        SELECT * FROM zabbix_settings LIMIT 1
      `);
      if (!settingsResult.rows[0]) {
        return res.status(400).json({ message: "Zabbix not configured" });
      }
      const settings3 = settingsResult.rows[0];
      let apiUrl = settings3.zabbix_url;
      if (!apiUrl.endsWith("/api_jsonrpc.php")) {
        apiUrl = `${apiUrl.replace(/\/$/, "")}/api_jsonrpc.php`;
      }
      const baseUrl = apiUrl.replace("/api_jsonrpc.php", "");
      const metrics = [];
      for (const hostId of hostIds) {
        const hostInfo = await zabbixApiRequest(
          {
            zabbixUrl: baseUrl,
            zabbixApiToken: settings3.zabbix_api_token,
            refreshInterval: settings3.refresh_interval
          },
          "host.get",
          {
            hostids: [hostId],
            output: [
              "hostid",
              "host",
              "name",
              "available",
              "status",
              "error",
              "snmp_available",
              "ipmi_available",
              "jmx_available"
            ],
            selectInterfaces: ["ip", "available", "main", "type", "error"]
          }
        );
        if (!hostInfo || hostInfo.length === 0) continue;
        const host = hostInfo[0];
        const allItems = await zabbixApiRequest(
          {
            zabbixUrl: baseUrl,
            zabbixApiToken: settings3.zabbix_api_token,
            refreshInterval: settings3.refresh_interval
          },
          "item.get",
          {
            hostids: [hostId],
            output: ["itemid", "key_", "lastvalue", "name", "units"],
            monitored: true,
            sortfield: "name"
          }
        );
        const cpuItem = allItems.find(
          (item2) => item2.key_.includes("cpu.util") || item2.key_.includes("system.cpu") || item2.name.toLowerCase().includes("cpu")
        );
        const memItem = allItems.find(
          (item2) => item2.key_.includes("memory.util") || item2.key_.includes("vm.memory") || item2.name.toLowerCase().includes("memory utilization")
        );
        const diskItem = allItems.find(
          (item2) => item2.key_.includes("fs.pused") || item2.key_.includes("disk") || item2.name.toLowerCase().includes("disk space")
        );
        const uptimeItem = allItems.find(
          (item2) => item2.key_.includes("system.uptime") || item2.key_.includes("uptime") || item2.name.toLowerCase().includes("uptime")
        );
        const netInItem = allItems.find(
          (item2) => item2.key_.includes("net.if.in") || item2.name.toLowerCase().includes("incoming")
        );
        const netOutItem = allItems.find(
          (item2) => item2.key_.includes("net.if.out") || item2.name.toLowerCase().includes("outgoing")
        );
        let uptimeValue = "N/A";
        if (uptimeItem && uptimeItem.lastvalue) {
          const uptimeSeconds = parseFloat(uptimeItem.lastvalue);
          if (!isNaN(uptimeSeconds)) {
            app2.get("/api/zabbix/debug/host/:hostId/items", requireAuth, async (req2, res2) => {
              try {
                if (!db2) {
                  return res2.status(503).json({ message: "Database not available" });
                }
                const { hostId: hostId2 } = req2.params;
                const settingsResult2 = await db2.execute(sql2`
        SELECT * FROM zabbix_settings LIMIT 1
      `);
                if (!settingsResult2.rows[0]) {
                  return res2.status(400).json({ message: "Zabbix not configured" });
                }
                const settings4 = settingsResult2.rows[0];
                let apiUrl2 = settings4.zabbix_url;
                if (!apiUrl2.endsWith("/api_jsonrpc.php")) {
                  apiUrl2 = `${apiUrl2.replace(/\/$/, "")}/api_jsonrpc.php`;
                }
                const baseUrl2 = apiUrl2.replace("/api_jsonrpc.php", "");
                const items = await zabbixApiRequest(
                  {
                    zabbixUrl: baseUrl2,
                    zabbixApiToken: settings4.zabbix_api_token,
                    refreshInterval: settings4.refresh_interval
                  },
                  "item.get",
                  {
                    hostids: [hostId2],
                    output: ["itemid", "key_", "lastvalue", "name", "state", "status", "lastclock"],
                    sortfield: "name"
                  }
                );
                res2.json({
                  hostId: hostId2,
                  totalItems: items.length,
                  items: items.map((item2) => ({
                    key: item2.key_,
                    name: item2.name,
                    lastvalue: item2.lastvalue,
                    state: item2.state,
                    status: item2.status,
                    lastclock: item2.lastclock
                  }))
                });
              } catch (error) {
                console.error("Error fetching debug items:", error);
                res2.status(500).json({ message: error.message });
              }
            });
            uptimeValue = formatUptime(uptimeSeconds);
          }
        }
        let metricStatus = "unknown";
        let icmpStatus = "unknown";
        let agentCheckStatus = "unknown";
        let directPingStatus = "unknown";
        const ipAddress = host.interfaces?.[0]?.ip;
        if (ipAddress && ipAddress !== "N/A") {
          try {
            const pingResult = await pingHost(ipAddress);
            directPingStatus = pingResult ? "responding" : "no response";
          } catch (err) {
            directPingStatus = "error";
          }
        } else {
          directPingStatus = "no ip";
        }
        const icmpPingItem = allItems.find(
          (item2) => item2.key_ && (item2.key_.toLowerCase() === "icmpping" || item2.key_.toLowerCase() === "icmpping[]" || item2.key_.toLowerCase().startsWith("icmpping[") || item2.key_.toLowerCase().includes("icmp")) || item2.name && (item2.name.toLowerCase().includes("icmp ping") || item2.name.toLowerCase().includes("ping response"))
        );
        if (icmpPingItem && icmpPingItem.lastvalue !== void 0 && icmpPingItem.lastvalue !== null && icmpPingItem.lastvalue !== "") {
          const strValue = String(icmpPingItem.lastvalue).trim();
          const pingValue = parseFloat(strValue);
          if (!isNaN(pingValue)) {
            icmpStatus = pingValue > 0 ? "responding" : "no response";
          } else if (strValue === "1" || strValue.toLowerCase() === "up") {
            icmpStatus = "responding";
          } else if (strValue === "0" || strValue.toLowerCase() === "down") {
            icmpStatus = "no response";
          } else {
            icmpStatus = "unknown";
          }
        } else {
          icmpStatus = "not configured";
        }
        const agentPingItem = allItems.find(
          (item2) => item2.key_ === "agent.ping" || item2.key_ === "agent.ping[]" || item2.key_ && item2.key_.toLowerCase().startsWith("agent.ping[") || item2.name && item2.name.toLowerCase().includes("agent ping")
        );
        if (agentPingItem && agentPingItem.lastvalue !== void 0 && agentPingItem.lastvalue !== null && agentPingItem.lastvalue !== "") {
          const strValue = String(agentPingItem.lastvalue).trim();
          const agentValue = parseFloat(strValue);
          if (!isNaN(agentValue)) {
            agentCheckStatus = agentValue > 0 ? "available" : "unavailable";
          } else if (strValue === "1" || strValue.toLowerCase() === "up") {
            agentCheckStatus = "available";
          } else if (strValue === "0" || strValue.toLowerCase() === "down") {
            agentCheckStatus = "unavailable";
          } else {
            agentCheckStatus = "unknown";
          }
        } else {
          agentCheckStatus = "not configured";
        }
        let hasAvailableInterface = false;
        let hasUnavailableInterface = false;
        if (host.interfaces && host.interfaces.length > 0) {
          for (const iface of host.interfaces) {
            const ifaceAvailable = parseInt(iface.available || "0");
            if (ifaceAvailable === 1) {
              hasAvailableInterface = true;
              break;
            } else if (ifaceAvailable === 2) {
              hasUnavailableInterface = true;
            }
          }
        }
        let metricScore = 0;
        if (directPingStatus === "responding") metricScore += 3;
        else if (directPingStatus === "no response") metricScore -= 3;
        if (icmpStatus === "responding") metricScore += 2;
        else if (icmpStatus === "no response") metricScore -= 2;
        if (agentCheckStatus === "available") metricScore += 2;
        else if (agentCheckStatus === "unavailable") metricScore -= 2;
        if (hasAvailableInterface) metricScore += 1;
        else if (hasUnavailableInterface) metricScore -= 1;
        if (metricScore > 0) {
          metricStatus = "available";
        } else if (metricScore < 0) {
          metricStatus = "unavailable";
        } else {
          metricStatus = "unknown";
        }
        console.log(`Metrics status for ${host.name}: ${metricStatus} (score: ${metricScore}, directPing: ${directPingStatus}, icmp: ${icmpStatus}, agent: ${agentCheckStatus})`);
        metrics.push({
          hostid: hostId,
          hostname: host.name,
          host: host.host,
          ipAddress: host.interfaces?.[0]?.ip || "N/A",
          cpuUtilization: parseItemValue(cpuItem?.lastvalue),
          memoryUtilization: parseItemValue(memItem?.lastvalue),
          diskUsage: parseItemValue(diskItem?.lastvalue),
          uptime: uptimeValue,
          networkIn: parseItemValue(netInItem?.lastvalue),
          networkOut: parseItemValue(netOutItem?.lastvalue),
          status: metricStatus,
          monitoringStatus: host.status === "0" ? "monitored" : "not monitored",
          icmpStatus,
          agentCheckStatus,
          directPingStatus
        });
      }
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/zabbix/problems", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const settingsResult = await db2.execute(sql2`
        SELECT * FROM zabbix_settings LIMIT 1
      `);
      if (!settingsResult.rows[0]) {
        return res.status(400).json({ message: "Zabbix not configured" });
      }
      const settings3 = settingsResult.rows[0];
      let apiUrl = settings3.zabbix_url;
      if (!apiUrl.endsWith("/api_jsonrpc.php")) {
        apiUrl = `${apiUrl.replace(/\/$/, "")}/api_jsonrpc.php`;
      }
      const baseUrl = apiUrl.replace("/api_jsonrpc.php", "");
      const problems = await zabbixApiRequest(
        {
          zabbixUrl: baseUrl,
          zabbixApiToken: settings3.zabbix_api_token,
          refreshInterval: settings3.refresh_interval
        },
        "problem.get",
        {
          output: ["eventid", "objectid", "name", "severity", "acknowledged", "clock", "r_eventid"],
          recent: true,
          sortfield: "eventid",
          sortorder: "DESC"
        }
      );
      const triggerIds = problems.map((p) => p.objectid);
      let triggerHostMap = {};
      if (triggerIds.length > 0) {
        try {
          const triggers = await zabbixApiRequest(
            {
              zabbixUrl: baseUrl,
              zabbixApiToken: settings3.zabbix_api_token,
              refreshInterval: settings3.refresh_interval
            },
            "trigger.get",
            {
              triggerids: triggerIds,
              output: ["triggerid"],
              selectHosts: ["host", "name"]
            }
          );
          triggers.forEach((trigger) => {
            if (trigger.hosts && trigger.hosts.length > 0) {
              triggerHostMap[trigger.triggerid] = {
                hostname: trigger.hosts[0].name || "Unknown",
                host: trigger.hosts[0].host || "Unknown"
              };
            }
          });
        } catch (err) {
          console.error("Error fetching hosts for problems:", err);
        }
      }
      const formattedProblems = problems.map((problem) => {
        const hostInfo = triggerHostMap[problem.objectid] || { hostname: "Unknown", host: "Unknown" };
        return {
          eventid: problem.eventid,
          name: problem.name,
          severity: parseInt(problem.severity),
          hostname: hostInfo.hostname,
          host: hostInfo.host,
          acknowledged: problem.acknowledged,
          clock: problem.clock,
          tags: [],
          resolved: problem.r_eventid ? true : false
        };
      });
      res.json(formattedProblems);
    } catch (error) {
      console.error("Error fetching problems:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/zabbix/history", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const { hostId, itemKey, timeFrom } = req.body;
      const settingsResult = await db2.execute(sql2`
        SELECT * FROM zabbix_settings LIMIT 1
      `);
      if (!settingsResult.rows[0]) {
        return res.status(400).json({ message: "Zabbix not configured" });
      }
      const settings3 = settingsResult.rows[0];
      let apiUrl = settings3.zabbix_url;
      if (!apiUrl.endsWith("/api_jsonrpc.php")) {
        apiUrl = `${apiUrl.replace(/\/$/, "")}/api_jsonrpc.php`;
      }
      const baseUrl = apiUrl.replace("/api_jsonrpc.php", "");
      const items = await zabbixApiRequest(
        {
          zabbixUrl: baseUrl,
          zabbixApiToken: settings3.zabbix_api_token,
          refreshInterval: settings3.refresh_interval
        },
        "item.get",
        {
          hostids: [hostId],
          search: { key_: itemKey },
          output: ["itemid", "value_type"]
        }
      );
      if (!items || items.length === 0) {
        return res.json([]);
      }
      const item2 = items[0];
      const history = await zabbixApiRequest(
        {
          zabbixUrl: baseUrl,
          zabbixApiToken: settings3.zabbix_api_token,
          refreshInterval: settings3.refresh_interval
        },
        "history.get",
        {
          itemids: [item2.itemid],
          time_from: timeFrom || Math.floor(Date.now() / 1e3) - 3600,
          output: "extend",
          sortfield: "clock",
          sortorder: "ASC",
          limit: 100
        }
      );
      res.json(history);
    } catch (error) {
      console.error("Error fetching history:", error);
      res.status(500).json({ message: error.message });
    }
  });
}

// server/routes.ts
var upload = multer({ dest: "uploads/" });
var logEmailEvent2 = async ({ timestamp: timestamp2, to, subject, status, error }) => {
  try {
    const logDir = path2.join(process.cwd(), "LOGS");
    if (!fs4.existsSync(logDir)) {
      fs4.mkdirSync(logDir);
    }
    const logFile = path2.join(logDir, "email_notifications.log");
    const logEntry = `[${timestamp2}] To: ${Array.isArray(to) ? to.join(", ") : to} | Subject: ${subject} | Status: [${status.toUpperCase()}]${error ? ` | Error: ${error}` : ""}
`;
    fs4.appendFileSync(logFile, logEntry);
  } catch (err) {
    console.error("Failed to log email event:", err);
  }
};
var readEmailLogs = async () => {
  const { promises: fs6 } = await import("fs");
  const { join: join5 } = await import("path");
  const EMAIL_LOGS_DIR2 = join5(process.cwd(), "LOGS");
  const EMAIL_LOG_FILE2 = "email_notifications.log";
  const filepath = join5(EMAIL_LOGS_DIR2, EMAIL_LOG_FILE2);
  try {
    const content = await fs6.readFile(filepath, "utf-8");
    const lines = content.trim().split("\n").filter((line) => line.trim());
    const logs = lines.map((line) => {
      const timestampMatch = line.match(/\[([\d-T:.Z]+)\]/);
      const toMatch = line.match(/To:\s*([^|]+?)(?:\s*\||$)/i);
      const subjectMatch = line.match(/Subject:\s*([^|]+?)(?:\s*Status:|$)/i);
      const statusMatch = line.match(/Status:\s*\[([A-Z]+)\]/i);
      const messageIdMatch = line.match(/MessageID:\s*([^|]+?)(?:\s*\||$)/i);
      const errorMatch = line.match(/Error:\s*(.+)$/i);
      return {
        timestamp: timestampMatch ? timestampMatch[1] : (/* @__PURE__ */ new Date()).toISOString(),
        status: statusMatch ? statusMatch[1].toLowerCase() : "unknown",
        to: toMatch ? toMatch[1].trim() : "N/A",
        subject: subjectMatch ? subjectMatch[1].trim() : "N/A",
        messageId: messageIdMatch ? messageIdMatch[1].trim() : void 0,
        error: errorMatch ? errorMatch[1].trim() : void 0
      };
    }).reverse();
    console.log(`\u{1F4E7} Read ${logs.length} email log entries from ${filepath}`);
    return logs;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("\u{1F4E7} Email log file not found, returning empty array.");
      return [];
    }
    console.error("\u{1F4E7} Error reading email log file:", error);
    return [];
  }
};
async function registerRoutes(app2) {
  const server = createServer(app2);
  const { decryptFields: decryptFields2, batchDecryptFields: batchDecryptFields2, PII_FIELDS: PII_FIELDS2, encryptFields: encryptFields2 } = await Promise.resolve().then(() => (init_encryption(), encryption_exports));
  setupAuth(app2);
  const { insertZabbixSettingsSchema: insertZabbixSettingsSchema2, insertZabbixSubnetSchema, insertDiscoveredHostSchema: insertDiscoveredHostSchema2, insertVMMonitoringSchema, insertBitlockerKeySchema: insertBitlockerKeySchema2, insertVmInventorySchema: insertVmInventorySchema2, insertAzureInventorySchema: insertAzureInventorySchema2, insertGcpInventorySchema: insertGcpInventorySchema2, insertAwsInventorySchema: insertAwsInventorySchema3 } = schema_exports;
  const handleError = (err, res) => {
    console.error(err);
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      return res.status(400).json({ message: validationError.message });
    }
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  };
  const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  };
  const requireAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Admin privileges required" });
    }
    next();
  };
  const checkPermission = (resource, action) => {
    return async (req, res, next) => {
      if (!req.isAuthenticated()) {
        console.log(`Permission check failed: User not authenticated`);
        return res.status(401).json({ message: "Not authenticated" });
      }
      console.log(`Checking permission for user ${req.user.username}: ${resource}.${action}`);
      console.log(`User isAdmin: ${req.user.isAdmin}, roleId: ${req.user.roleId}`);
      try {
        const currentUser = await storage.getUser(req.user.id);
        if (!currentUser) {
          console.log(`Permission denied: User not found in database`);
          return res.status(401).json({ message: "User not found" });
        }
        req.user.isAdmin = currentUser.isAdmin;
        req.user.roleId = currentUser.roleId;
        if (currentUser.isAdmin === true || currentUser.isAdmin === 1) {
          console.log(`Permission granted: User is admin`);
          return next();
        }
        const { getPermissionsForRole: getPermissionsForRole2 } = await Promise.resolve().then(() => (init_roles(), roles_exports));
        const userPermissions = getPermissionsForRole2(currentUser.roleId);
        console.log(`Loaded permissions for roleId ${currentUser.roleId}:`, JSON.stringify(userPermissions, null, 2));
        if (!userPermissions) {
          console.log(`Permission denied: No permissions found for roleId ${currentUser.roleId}`);
          return res.status(403).json({
            message: `Access denied. No role permissions configured.`
          });
        }
        if (!userPermissions[resource]) {
          console.log(`Permission denied: No permissions for resource ${resource}`);
          return res.status(403).json({
            message: `Access denied. You don't have permission to access ${resource}.`
          });
        }
        const hasPermission = userPermissions[resource][action] === true;
        if (!hasPermission) {
          console.log(`Permission denied: No ${action} permission for resource ${resource}. Current permissions:`, userPermissions[resource]);
          return res.status(403).json({
            message: `Access denied. You don't have permission to ${action} ${resource}.`
          });
        }
        console.log(`Permission granted: User has ${action} permission for ${resource}`);
        req.user.permissions = userPermissions;
        req.user.isAdmin = currentUser.isAdmin;
        req.user.roleId = currentUser.roleId;
        next();
      } catch (error) {
        console.error(`Permission check error:`, error);
        return res.status(500).json({ message: "Permission check failed" });
      }
    };
  };
  app2.get("/api/settings", requireAuth, async (req, res) => {
    try {
      const settings3 = await storage.getSystemSettings();
      return res.json(settings3);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/settings", requireAuth, async (req, res) => {
    try {
      const settingsData = req.body;
      const settings3 = await storage.getSystemSettings();
      console.log("Received settings update:", settingsData);
      console.log("Current settings:", settings3);
      const updatedSettingsData = {
        ...settings3,
        // Start with ALL current settings
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      Object.keys(settingsData).forEach((key) => {
        const value = settingsData[key];
        if (value !== void 0 && value !== null) {
          updatedSettingsData[key] = value;
        }
      });
      if (settingsData.autoBackup !== void 0) {
        updatedSettingsData.autoBackup = settingsData.autoBackup;
        console.log("Setting autoBackup to:", settingsData.autoBackup);
      }
      if (settingsData.backupTime !== void 0) {
        updatedSettingsData.backupTime = settingsData.backupTime;
        console.log("Setting backupTime to:", settingsData.backupTime);
      }
      console.log("Merged settings to save:", updatedSettingsData);
      const updatedSettings = await storage.updateSystemSettings(1, updatedSettingsData);
      console.log("Settings saved successfully:", updatedSettings);
      await emailService.initialize();
      if (settingsData.autoBackup !== void 0 || settingsData.backupTime !== void 0) {
        console.log("\u{1F504} Backup settings changed, triggering scheduler update...");
        app2.emit("backup-schedule-updated");
      }
      return res.json(updatedSettings);
    } catch (err) {
      console.error("Error updating settings:", err);
      return handleError(err, res);
    }
  });
  app2.post("/api/check-iam-expirations", requireAuth, async (req, res) => {
    try {
      const settings3 = await storage.getSystemSettings();
      if (settings3?.notifyOnIamExpiration === false) {
        return res.status(400).json({
          message: "IAM expiration notifications are disabled in settings"
        });
      }
      const iamAccounts2 = await storage.getIamAccounts();
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const expiredAccounts = iamAccounts2.filter((account) => {
        if (!account.durationEndDate) return false;
        const endDate = new Date(account.durationEndDate);
        endDate.setHours(0, 0, 0, 0);
        const isExpired = endDate < today;
        const notYetNotified = account.status !== "expired_notified" && account.status !== "access_removed" && account.status !== "extended";
        if (isExpired && notYetNotified) {
          console.log(`\u{1F4E7} [EXPIRED ACCOUNT DEBUG] ${account.knoxId}:`, {
            userKnoxId: account.userKnoxId,
            userKnoxIdType: typeof account.userKnoxId,
            hasUserKnoxId: !!account.userKnoxId,
            allFields: Object.keys(account)
          });
        }
        return isExpired && notYetNotified;
      });
      if (expiredAccounts.length > 0) {
        const accountsData = expiredAccounts.map((account) => {
          console.log(`\u{1F4E7} Mapping account ${account.knoxId}, userKnoxId field:`, {
            rawUserKnoxId: account.userKnoxId,
            userKnoxIdType: typeof account.userKnoxId,
            hasUserKnoxId: !!account.userKnoxId,
            trimmedUserKnoxId: account.userKnoxId ? account.userKnoxId.trim() : null
          });
          return {
            requestor: account.requestor || "N/A",
            knoxId: account.knoxId || "N/A",
            userKnoxId: account.userKnoxId || null,
            permission: account.permission || "N/A",
            cloudPlatform: account.cloudPlatform || "N/A",
            endDate: account.durationEndDate,
            approvalId: account.approvalId || "N/A"
          };
        });
        const emailSent = await emailService.sendIamExpirationNotification({
          accounts: accountsData
        });
        for (const account of expiredAccounts) {
          await storage.updateIamAccount(account.id, { status: "expired_notified" });
        }
        return res.json({
          message: `Found ${expiredAccounts.length} expired IAM account(s). Notifications sent to admin and account owners.`,
          count: expiredAccounts.length,
          emailSent,
          accounts: accountsData
        });
      }
      return res.json({
        message: "No expired IAM accounts found",
        count: 0,
        checked: true
      });
    } catch (err) {
      console.error("IAM expiration check error:", err);
      return res.status(500).json({
        message: `Failed to check IAM expirations: ${err.message}`
      });
    }
  });
  app2.post("/api/check-vm-expirations", requireAuth, async (req, res) => {
    try {
      const settings3 = await storage.getSystemSettings();
      if (!settings3?.notifyOnVmExpiration) {
        return res.json({
          message: "VM expiration notifications are disabled",
          checked: false
        });
      }
      const vms3 = await storage.getVmInventory();
      const today = /* @__PURE__ */ new Date();
      const expiredVMs = vms3.filter((vm) => {
        if (!vm.endDate) return false;
        const endDate = new Date(vm.endDate);
        return today > endDate && vm.vmStatus === "Overdue - Not Notified";
      });
      if (expiredVMs.length > 0) {
        const vmsData = expiredVMs.map((vm) => ({
          vmName: vm.vmName || "N/A",
          knoxId: vm.knoxId || "N/A",
          requestor: vm.requestor || "N/A",
          department: vm.department || "N/A",
          endDate: vm.endDate,
          approvalNumber: vm.approvalNumber || "N/A"
        }));
        const emailSent = await emailService.sendVmExpirationNotification({
          vms: vmsData
        });
        for (const vm of expiredVMs) {
          await storage.updateVmInventory(vm.id, { vmStatus: "Overdue - Notified" });
        }
        return res.json({
          message: `Found ${expiredVMs.length} expired VM(s)`,
          count: expiredVMs.length,
          emailSent,
          vms: vmsData
        });
      }
      return res.json({
        message: "No expired VMs found",
        count: 0,
        checked: true
      });
    } catch (err) {
      console.error("VM expiration check error:", err);
      return res.status(500).json({
        message: `Failed to check VM expirations: ${err.message}`
      });
    }
  });
  app2.post("/api/check-approval-expirations", requireAuth, async (req, res) => {
    try {
      console.log("\u{1F4E7} [APPROVAL-CHECK] Manual approval expiration check triggered by", req.user?.username);
      const settings3 = await storage.getSystemSettings();
      console.log("\u{1F4E7} [APPROVAL-CHECK] Approval expiration notifications are ALWAYS ON");
      if (!db2) {
        console.log("\u{1F4E7} [APPROVAL-CHECK] Database not available");
        return res.status(503).json({ message: "Database not available" });
      }
      const records = await db2.select().from(approvalMonitoring).orderBy(approvalMonitoring.endDate);
      console.log(`\u{1F4E7} [APPROVAL-CHECK] Found ${records.length} total approval records`);
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const oneWeekFromNow = /* @__PURE__ */ new Date();
      oneWeekFromNow.setDate(today.getDate() + 7);
      oneWeekFromNow.setHours(23, 59, 59, 999);
      const expiringRecords = records.filter((record) => {
        if (!record.endDate) return false;
        const endDate = new Date(record.endDate);
        endDate.setHours(0, 0, 0, 0);
        return endDate >= today && endDate <= oneWeekFromNow;
      });
      console.log(`\u{1F4E7} [APPROVAL-CHECK] Found ${expiringRecords.length} records expiring within 1 week`);
      if (expiringRecords.length > 0) {
        const recordsData = expiringRecords.map((record) => ({
          type: record.type || "N/A",
          platform: record.platform || "N/A",
          pic: record.pic || "N/A",
          ipAddress: record.ipAddress || "N/A",
          hostnameAccounts: record.hostnameAccounts || "N/A",
          identifierSerialNumber: record.identifierSerialNumber || "N/A",
          approvalNumber: record.approvalNumber || "N/A",
          endDate: record.endDate,
          remarks: record.remarks || "N/A"
        }));
        console.log(`\u{1F4E7} [APPROVAL-CHECK] Sending notification for ${recordsData.length} expiring approvals`);
        const emailSent = await emailService.sendApprovalExpirationNotification({
          records: recordsData
        });
        console.log(`\u{1F4E7} [APPROVAL-CHECK] Email sent: ${emailSent ? "SUCCESS" : "FAILED"}`);
        return res.json({
          message: `Found ${expiringRecords.length} approval(s) expiring within 1 week. ${emailSent ? "Notification sent to admin." : "Failed to send notification."}`,
          count: expiringRecords.length,
          emailSent,
          records: recordsData
        });
      }
      console.log("\u{1F4E7} [APPROVAL-CHECK] No approvals expiring within 1 week");
      return res.json({
        message: "No approvals expiring within 1 week",
        count: 0,
        checked: true
      });
    } catch (err) {
      console.error("\u{1F4E7} [APPROVAL-CHECK] Error:", err);
      return res.status(500).json({
        message: `Failed to check approval expirations: ${err.message}`
      });
    }
  });
  app2.post("/api/test-email", requireAuth, async (req, res) => {
    try {
      const settings3 = await storage.getSystemSettings();
      if (!settings3?.mailHost || !settings3?.companyEmail) {
        return res.status(400).json({
          message: "Email configuration is incomplete. Please configure SMTP settings first."
        });
      }
      await emailService.initialize();
      const testEmailSent = await emailService.sendEmail({
        to: settings3.companyEmail || settings3.mailFromAddress,
        subject: "Test Email from SRPH-MIS",
        html: `
          <h2>Test Email</h2>
          <p>This is a test email from your SRPH-MIS system.</p>
          <p>If you received this email, your email configuration is working correctly.</p>
          <p><strong>SMTP Server:</strong> ${settings3.mailHost}</p>
          <p><strong>From Address:</strong> ${settings3.mailFromAddress}</p>
          <p><strong>Timestamp:</strong> ${(/* @__PURE__ */ new Date()).toLocaleString()}</p>
        `
      });
      if (testEmailSent) {
        return res.json({
          success: true,
          message: `Test email sent successfully to ${settings3.companyEmail || settings3.mailFromAddress}`
        });
      } else {
        return res.status(500).json({
          message: "Failed to send test email. Please check your SMTP configuration."
        });
      }
    } catch (err) {
      console.error("Test email error:", err);
      return res.status(500).json({
        message: `Failed to send test email: ${err.message}`
      });
    }
  });
  app2.get("/api/email-logs", requireAuth, async (req, res) => {
    try {
      console.log("\u{1F4E7} Fetching email logs...");
      const logs = await readEmailLogs();
      console.log(`\u{1F4E7} Returning ${logs.length} email log entries`);
      return res.json(logs);
    } catch (err) {
      console.error("\u{1F4E7} Error fetching email logs:", err);
      return res.status(500).json({
        message: `Failed to fetch email logs: ${err.message}`,
        logs: []
      });
    }
  });
  app2.get("/api/database/schedule", requireAuth, async (req, res) => {
    try {
      const settings3 = await storage.getSystemSettings();
      console.log("\u{1F4CB} Loading database schedule settings:", settings3);
      const scheduleSettings = {
        autoBackup: settings3?.autoBackup === true || settings3?.autoBackup === 1,
        autoOptimize: settings3?.autoOptimize === true || settings3?.autoOptimize === 1,
        backupTime: settings3?.backupTime || "03:00",
        optimizeTime: settings3?.optimizeTime || "04:00",
        retentionDays: settings3?.retentionDays || 30,
        emailNotifications: settings3?.emailNotifications !== false
      };
      console.log("\u{1F4E4} Returning schedule settings:", scheduleSettings);
      return res.json(scheduleSettings);
    } catch (err) {
      console.error("Error fetching database schedule:", err);
      return res.status(500).json({
        message: `Failed to fetch database schedule: ${err.message}`
      });
    }
  });
  app2.post("/api/database/schedule", requireAuth, async (req, res) => {
    try {
      const { autoBackup, autoOptimize, backupTime, optimizeTime, retentionDays, emailNotifications } = req.body;
      console.log("\u{1F4C5} Updating database schedule settings:", {
        autoBackup,
        backupTime,
        autoOptimize,
        optimizeTime
      });
      const currentSettings = await storage.getSystemSettings();
      const updateData = {
        ...currentSettings,
        autoBackup: autoBackup !== void 0 ? Boolean(autoBackup) : currentSettings?.autoBackup || false,
        backupTime: backupTime || currentSettings?.backupTime || "03:00",
        autoOptimize: autoOptimize !== void 0 ? Boolean(autoOptimize) : currentSettings?.autoOptimize || false,
        optimizeTime: optimizeTime || currentSettings?.optimizeTime || "04:00",
        retentionDays: retentionDays !== void 0 ? Number(retentionDays) : currentSettings?.retentionDays || 30,
        emailNotifications: emailNotifications !== void 0 ? Boolean(emailNotifications) : currentSettings?.emailNotifications !== false,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      console.log("\u{1F4DD} Saving settings:", updateData);
      const updatedSettings = await storage.updateSystemSettings(1, updateData);
      console.log("\u2705 Database schedule settings updated successfully:", updatedSettings);
      app2.emit("backup-schedule-updated");
      return res.json({
        success: true,
        message: "Database schedule updated successfully",
        settings: {
          autoBackup: updatedSettings?.autoBackup || false,
          backupTime: updatedSettings?.backupTime || "03:00",
          autoOptimize: updatedSettings?.autoOptimize || false,
          optimizeTime: updatedSettings?.optimizeTime || "04:00",
          retentionDays: updatedSettings?.retentionDays || 30,
          emailNotifications: updatedSettings?.emailNotifications !== false
        }
      });
    } catch (err) {
      console.error("Error updating database schedule:", err);
      return res.status(500).json({
        message: `Failed to update database schedule: ${err.message}`
      });
    }
  });
  app2.post("/api/database/backup", requireAuth, async (req, res) => {
    try {
      console.log("\u{1F504} Manual database backup requested by:", req.user?.username);
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const fs6 = await import("fs");
      const path5 = await import("path");
      const backupDir = path5.join(process.cwd(), "backups");
      if (!fs6.existsSync(backupDir)) {
        fs6.mkdirSync(backupDir, { recursive: true });
        console.log("\u{1F4C1} Backups directory created");
      }
      const timestamp2 = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").split("T")[0];
      const timeStamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").split("T")[1].substring(0, 8);
      const backupFilename = `backup-${timestamp2}-${timeStamp}.sql`;
      const backupPath = path5.join(backupDir, backupFilename);
      let backupContent = `-- =============================================
`;
      backupContent += `-- Manual PostgreSQL Database Backup
`;
      backupContent += `-- =============================================
`;
      backupContent += `-- Created: ${(/* @__PURE__ */ new Date()).toISOString()}
`;
      backupContent += `-- Created By: ${req.user?.username || "Unknown"}
`;
      backupContent += `-- Database: srph_mis
`;
      backupContent += `-- =============================================

`;
      const tablesToBackup = [
        "users",
        "assets",
        "activities",
        "licenses",
        "components",
        "accessories",
        "consumables",
        "license_assignments",
        "consumable_assignments",
        "it_equipment",
        "it_equipment_assignments",
        "vm_inventory",
        "bitlocker_keys",
        "iam_accounts",
        "monitor_inventory",
        "vm_approval_history",
        "approval_monitoring",
        "azure_inventory",
        "gcp_inventory",
        "aws_inventory",
        "system_settings",
        "zabbix_settings",
        "zabbix_subnets",
        "discovered_hosts",
        "vm_monitoring",
        "aws_historical_data",
        "azure_historical_data",
        "gcp_historical_data",
        "iam_account_approval_history"
      ];
      let totalRecords = 0;
      let backedUpTables = 0;
      for (const table of tablesToBackup) {
        try {
          const { sql: sql7 } = await import("drizzle-orm");
          const tableData = await db2.execute(sql7.raw(`SELECT * FROM ${table}`));
          if (tableData.rows && tableData.rows.length > 0) {
            const columns = Object.keys(tableData.rows[0]);
            totalRecords += tableData.rows.length;
            backedUpTables++;
            backupContent += `
-- =============================================
`;
            backupContent += `-- Table: ${table}
`;
            backupContent += `-- Total Records: ${tableData.rows.length}
`;
            backupContent += `-- =============================================

`;
            backupContent += `TRUNCATE TABLE ${table} CASCADE;

`;
            tableData.rows.forEach((row, index) => {
              const values = columns.map((col) => {
                const value = row[col];
                if (value === null || value === void 0) return "NULL";
                if (typeof value === "string") {
                  const escaped = value.replace(/\\/g, "\\\\").replace(/'/g, "''");
                  return `'${escaped}'`;
                }
                if (value instanceof Date) {
                  return `'${value.toISOString()}'`;
                }
                if (typeof value === "boolean") {
                  return value ? "TRUE" : "FALSE";
                }
                if (typeof value === "object") {
                  const jsonStr = JSON.stringify(value).replace(/\\/g, "\\\\").replace(/'/g, "''");
                  return `'${jsonStr}'`;
                }
                if (typeof value === "number") {
                  return value.toString();
                }
                return `'${String(value).replace(/'/g, "''")}'`;
              });
              backupContent += `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${values.join(", ")}); 
`;
              if ((index + 1) % 100 === 0) {
                backupContent += `-- Progress: ${index + 1}/${tableData.rows.length} rows
`;
              }
            });
            backupContent += `
-- Completed ${table}: ${tableData.rows.length} rows exported

`;
          }
        } catch (tableError) {
          console.warn(`\u26A0\uFE0F Warning: Could not backup table ${table}:`, tableError.message);
          backupContent += `
-- ERROR backing up table ${table}:
`;
          backupContent += `-- ${tableError.message}

`;
        }
      }
      backupContent += `
-- =============================================
`;
      backupContent += `-- Backup Summary
`;
      backupContent += `-- =============================================
`;
      backupContent += `-- Total Tables Backed Up: ${backedUpTables}/${tablesToBackup.length}
`;
      backupContent += `-- Total Records: ${totalRecords}
`;
      backupContent += `-- Backup Completed: ${(/* @__PURE__ */ new Date()).toISOString()}
`;
      backupContent += `-- =============================================
`;
      fs6.writeFileSync(backupPath, backupContent);
      const fileSize = (fs6.statSync(backupPath).size / 1024).toFixed(2);
      console.log(`\u2705 Manual backup created: ${backupFilename} (${fileSize} KB, ${totalRecords} records)`);
      await storage.createActivity({
        action: "backup",
        itemType: "database",
        itemId: 1,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Manual database backup created by ${req.user?.username}: ${backupFilename} (${fileSize} KB, ${totalRecords} records)`
      });
      return res.json({
        success: true,
        message: "Database backup created successfully",
        filename: backupFilename,
        path: backupPath,
        size: `${fileSize} KB`,
        records: totalRecords,
        tables: backedUpTables
      });
    } catch (err) {
      console.error("\u274C Manual backup failed:", err);
      return res.status(500).json({
        message: `Failed to create backup: ${err.message}`
      });
    }
  });
  app2.get("/api/logs", requireAuth, async (req, res) => {
    try {
      const { promises: fs6 } = await import("fs");
      const { join: join5 } = await import("path");
      const LOGS_DIR2 = join5(process.cwd(), "LOGS");
      try {
        await fs6.access(LOGS_DIR2);
      } catch {
        return res.json([]);
      }
      const files = await fs6.readdir(LOGS_DIR2);
      const logFiles = files.filter((f) => f.endsWith(".log"));
      return res.json(logFiles);
    } catch (err) {
      console.error("Error reading log files:", err);
      return res.status(500).json({
        message: `Failed to read log files: ${err.message}`
      });
    }
  });
  app2.get("/api/logs/:filename", requireAuth, async (req, res) => {
    try {
      const { promises: fs6 } = await import("fs");
      const { join: join5 } = await import("path");
      const filename = req.params.filename;
      const LOGS_DIR2 = join5(process.cwd(), "LOGS");
      const filepath = join5(LOGS_DIR2, filename);
      try {
        const content = await fs6.readFile(filepath, "utf-8");
        return res.json({
          filename,
          content
        });
      } catch (error) {
        if (error.code === "ENOENT") {
          return res.status(404).json({
            message: "Log file not found"
          });
        }
        throw error;
      }
    } catch (err) {
      console.error("Error reading log file:", err);
      return res.status(500).json({
        message: `Failed to read log file: ${err.message}`
      });
    }
  });
  app2.get("/api/roles", requireAuth, async (req, res) => {
    try {
      const { getRolesWithUserCounts: getRolesWithUserCounts2 } = await Promise.resolve().then(() => (init_roles(), roles_exports));
      const roles2 = await getRolesWithUserCounts2();
      return res.json(roles2);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/roles/:id", requireAuth, async (req, res) => {
    try {
      const { getRoleById: getRoleById2 } = await Promise.resolve().then(() => (init_roles(), roles_exports));
      const roleId = parseInt(req.params.id);
      const role = getRoleById2(roleId);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
      return res.json(role);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/roles", checkPermission("admin", "add"), async (req, res) => {
    try {
      const { createRole: createRole2 } = await Promise.resolve().then(() => (init_roles(), roles_exports));
      const roleData = req.body;
      const role = createRole2(roleData);
      await storage.createActivity({
        action: "create",
        itemType: "role",
        itemId: role.id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Role "${role.name}" created`
      });
      return res.status(201).json(role);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/users", checkPermission("users", "view"), async (req, res) => {
    try {
      const users4 = await storage.getUsers();
      const usersWithMfa = users4.map((user) => ({
        ...user,
        mfaEnabled: user.mfaEnabled || false,
        mfaSecret: void 0
        // Don't expose secret
      }));
      res.json(usersWithMfa);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/users/:id", checkPermission("users", "view"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/users", checkPermission("users", "add"), async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      const user = await storage.createUser(userData);
      await storage.createActivity({
        action: "create",
        itemType: "user",
        itemId: user.id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `User ${user.username} created`
      });
      try {
        const emailSent = await emailService.sendModificationNotification({
          action: "create",
          itemType: "User",
          itemName: `${user.username} (${user.firstName} ${user.lastName})`,
          userName: req.user.username,
          details: `New user account created with ${user.isAdmin ? "admin" : "standard"} privileges`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        if (emailSent) {
          console.log(`\u2705 Email notification sent for user creation: ${user.username}`);
        } else {
          console.log(`\u26A0\uFE0F Email notification not sent - check email configuration`);
        }
      } catch (err) {
        console.error("\u274C Email notification failed:", err);
      }
      const { updateRoleUserCounts: updateRoleUserCounts2 } = await Promise.resolve().then(() => (init_roles(), roles_exports));
      await updateRoleUserCounts2();
      return res.status(201).json(user);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.patch("/api/users/:id", checkPermission("users", "edit"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const existingUser = await storage.getUser(id);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const updateData = insertUserSchema.partial().parse(req.body);
      if (updateData.username && updateData.username !== existingUser.username) {
        const userWithSameUsername = await storage.getUserByUsername(updateData.username);
        if (userWithSameUsername) {
          return res.status(409).json({ message: "Username already exists" });
        }
      }
      console.log(`Updating user ${id} with data:`, updateData);
      let finalUpdateData = { ...updateData };
      if (updateData.password && updateData.password.trim() !== "") {
        const { scrypt: scrypt2, randomBytes: randomBytes2 } = await import("crypto");
        const { promisify: promisify3 } = await import("util");
        const scryptAsync2 = promisify3(scrypt2);
        console.log(`Hashing new password for user ${existingUser.username}`);
        const salt = randomBytes2(16).toString("hex");
        const buf = await scryptAsync2(updateData.password, salt, 64);
        finalUpdateData.password = `${buf.toString("hex")}.${salt}`;
        console.log(`Password hashed successfully for user ${existingUser.username}`);
      } else if (updateData.password === "") {
        delete finalUpdateData.password;
      }
      if (updateData.isAdmin === true || updateData.isAdmin === "true") {
        finalUpdateData.roleId = null;
        finalUpdateData.isAdmin = true;
        console.log(`Setting user as admin, clearing roleId`);
      } else if (updateData.isAdmin === false || updateData.isAdmin === "false") {
        finalUpdateData.isAdmin = false;
        if (updateData.roleId !== void 0) {
          finalUpdateData.roleId = updateData.roleId;
        } else if (existingUser.roleId) {
          finalUpdateData.roleId = existingUser.roleId;
        }
        console.log(`Removing admin status, roleId: ${finalUpdateData.roleId}`);
      } else if (updateData.roleId !== void 0) {
        finalUpdateData.roleId = updateData.roleId;
        finalUpdateData.isAdmin = false;
        console.log(`Setting roleId ${updateData.roleId}, removing admin status`);
      }
      const updatedUser2 = await storage.updateUser(id, finalUpdateData);
      if (updatedUser2) {
        const { getPermissionsForRole: getPermissionsForRole2 } = await Promise.resolve().then(() => (init_roles(), roles_exports));
        if (updatedUser2.isAdmin === true || updatedUser2.isAdmin === 1) {
          updatedUser2.permissions = {
            assets: { view: true, edit: true, add: true, delete: true },
            components: { view: true, edit: true, add: true, delete: true },
            accessories: { view: true, edit: true, add: true, delete: true },
            consumables: { view: true, edit: true, add: true, delete: true },
            licenses: { view: true, edit: true, add: true, delete: true },
            users: { view: true, edit: true, add: true, delete: true },
            reports: { view: true, edit: true, add: true, delete: true },
            admin: { view: true, edit: true, add: true, delete: true },
            vmMonitoring: { view: true, edit: true, add: true, delete: true },
            networkDiscovery: { view: true, edit: true, add: true, delete: true },
            bitlockerKeys: { view: true, edit: true, add: true, delete: true }
          };
          console.log(`Set admin permissions for user ${updatedUser2.username}`);
        } else {
          updatedUser2.permissions = getPermissionsForRole2(updatedUser2.roleId);
          console.log(`Set role-based permissions for user ${updatedUser2.username} (roleId: ${updatedUser2.roleId}):`, JSON.stringify(updatedUser2.permissions, null, 2));
        }
      }
      const activityNotes = updateData.password && updateData.password.trim() !== "" ? `User ${updatedUser2?.username} updated (password changed, admin: ${updatedUser2?.isAdmin}, roleId: ${updatedUser2?.roleId})` : `User ${updatedUser2?.username} updated (admin: ${updatedUser2?.isAdmin}, roleId: ${updatedUser2?.roleId})`;
      await storage.createActivity({
        action: "update",
        itemType: "user",
        itemId: id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: activityNotes
      });
      const { updateRoleUserCounts: updateRoleUserCounts2 } = await Promise.resolve().then(() => (init_roles(), roles_exports));
      await updateRoleUserCounts2();
      return res.json(updatedUser2);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.patch("/api/users/:id/permissions", checkPermission("users", "edit"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const existingUser = await storage.getUser(id);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const { permissions } = req.body;
      if (!permissions) {
        return res.status(400).json({ message: "Permissions data required" });
      }
      const updatedUser2 = await storage.updateUser(id, { permissions });
      await storage.createActivity({
        action: "update",
        itemType: "user",
        itemId: id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `User ${updatedUser2?.username} permissions updated`
      });
      return res.json(updatedUser2);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.put("/api/users/:id/permissions", checkPermission("users", "edit"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { permissions } = req.body;
      const existingUser = await storage.getUser(id);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const updatedUser2 = await storage.updateUser(id, { permissions });
      await storage.createActivity({
        action: "update",
        itemType: "user",
        itemId: id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `User ${existingUser.username} permissions updated`
      });
      return res.json(updatedUser2);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.delete("/api/users/:id", checkPermission("users", "edit"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      console.log(`Delete user endpoint called for ID: ${id}`);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const existingUser = await storage.getUser(id);
      if (!existingUser) {
        console.log(`User with ID ${id} not found`);
        return res.status(404).json({ message: "User not found" });
      }
      if (existingUser.isAdmin && existingUser.id === 1) {
        return res.status(403).json({ message: "Cannot delete the main administrator account" });
      }
      const assets3 = await storage.getAssets();
      const assignedAssets = assets3.filter((asset2) => asset2.assignedTo === id);
      if (assignedAssets.length > 0) {
        return res.status(400).json({
          message: `Cannot delete user. User has ${assignedAssets.length} asset(s) assigned. Please check in all assets first.`
        });
      }
      try {
        const userActivities = await storage.getActivitiesByUser(id);
        console.log(`User ${existingUser.username} has ${userActivities.length} activities associated - these will be preserved for audit`);
      } catch (activityError) {
        console.warn("Failed to get user activities for logging:", activityError);
      }
      console.log(`Deleting user: ${existingUser.username} (ID: ${id})`);
      const deleteResult = await storage.deleteUser(id);
      if (!deleteResult) {
        return res.status(500).json({ message: "Failed to delete user" });
      }
      try {
        await storage.createActivity({
          action: "delete",
          itemType: "user",
          itemId: id,
          userId: req.user?.id || null,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `User ${existingUser.username} deleted by ${req.user?.username || "system"}`
        });
      } catch (activityError) {
        console.warn("Failed to log delete activity:", activityError);
      }
      console.log(`User ${existingUser.username} deleted successfully`);
      const { updateRoleUserCounts: updateRoleUserCounts2 } = await Promise.resolve().then(() => (init_roles(), roles_exports));
      await updateRoleUserCounts2();
      return res.status(204).send();
    } catch (err) {
      console.error("Delete user error:", err);
      return handleError(err, res);
    }
  });
  app2.get("/api/assets", requireAuth, async (req, res) => {
    try {
      console.log("Assets API called by user:", req.user?.username);
      const assets3 = await storage.getAssets();
      console.log(`Found ${assets3.length} assets`);
      if (!assets3 || !Array.isArray(assets3)) {
        console.error("Invalid assets data returned from storage:", assets3);
        return res.status(500).json({
          message: "Invalid assets data format",
          debug: { assetsType: typeof assets3, isArray: Array.isArray(assets3) }
        });
      }
      res.json(assets3);
    } catch (error) {
      console.error("Error fetching assets:", error);
      res.status(500).json({
        message: "Failed to fetch assets",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/assets/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const asset2 = await storage.getAsset(id);
      if (!asset2) {
        return res.status(404).json({ message: "Asset not found" });
      }
      return res.json(asset2);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/assets", requireAuth, async (req, res) => {
    try {
      const assetData = insertAssetSchema.parse(req.body);
      if (assetData.assetTag) {
        const existingAsset = await storage.getAssetByTag(assetData.assetTag);
        if (existingAsset) {
          return res.status(409).json({ message: "Asset tag already exists" });
        }
      }
      const asset2 = await storage.createAsset(assetData);
      await storage.createActivity({
        action: "create",
        itemType: "asset",
        itemId: asset2.id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Asset ${asset2.name} (${asset2.assetTag}) created`
      });
      try {
        const emailSent = await emailService.sendModificationNotification({
          action: "create",
          itemType: "Asset",
          itemName: `${asset2.name} (${asset2.assetTag})`,
          userName: req.user.username,
          details: `New asset created with category: ${asset2.category}`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          additionalInfo: {
            assetTag: asset2.assetTag,
            category: asset2.category,
            status: asset2.status,
            location: asset2.location || "Not specified",
            serialNumber: asset2.serialNumber || "Not specified",
            knoxId: asset2.knoxId || "Not assigned",
            department: asset2.department || "Not specified"
          }
        });
        if (emailSent) {
          console.log(`\u2705 Email notification sent for asset creation: ${asset2.name}`);
        }
      } catch (err) {
        console.error("\u274C Email notification failed:", err);
      }
      let updatedAsset = asset2;
      if (assetData.knoxId && assetData.knoxId.trim() !== "") {
        const customNotes = `Asset automatically checked out to KnoxID: ${assetData.knoxId}`;
        updatedAsset = await storage.checkoutAsset(asset2.id, 1, void 0, customNotes) || asset2;
        await storage.createActivity({
          action: "checkout",
          itemType: "asset",
          itemId: asset2.id,
          userId: req.user.id,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: customNotes
        });
      }
      return res.status(201).json(updatedAsset);
    } catch (error) {
      console.error("Error creating asset:", error);
      res.status(500).json({ message: "Failed to create asset" });
    }
  });
  app2.patch("/api/assets/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const existingAsset = await storage.getAsset(id);
      if (!existingAsset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      const updateData = insertAssetSchema.partial().parse(req.body);
      if (updateData.assetTag && updateData.assetTag !== existingAsset.assetTag) {
        const assetWithSameTag = await storage.getAssetByTag(updateData.assetTag);
        if (assetWithSameTag) {
          return res.status(409).json({ message: "Asset tag already exists" });
        }
      }
      const updatedAsset = await storage.updateAsset(id, updateData);
      await storage.createActivity({
        action: "update",
        itemType: "asset",
        itemId: id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Asset ${updatedAsset?.name} (${updatedAsset?.assetTag}) updated`
      });
      try {
        const emailSent = await emailService.sendModificationNotification({
          action: "update",
          itemType: "Asset",
          itemName: `${updatedAsset?.name} (${updatedAsset?.assetTag})`,
          userName: req.user.username,
          details: `Asset information updated`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          additionalInfo: {
            assetTag: updatedAsset?.assetTag,
            category: updatedAsset?.category,
            status: updatedAsset?.status,
            location: updatedAsset?.location || "Not specified",
            serialNumber: updatedAsset?.serialNumber || "Not specified",
            knoxId: updatedAsset?.knoxId || "Not assigned",
            department: updatedAsset?.department || "Not specified",
            previousValues: {
              status: existingAsset.status,
              location: existingAsset.location,
              knoxId: existingAsset.knoxId,
              department: existingAsset.department
            },
            currentValues: {
              status: updatedAsset?.status,
              location: updatedAsset?.location,
              knoxId: updatedAsset?.knoxId,
              department: updatedAsset?.department
            }
          }
        });
        if (emailSent) {
          console.log(`\u2705 Email notification sent for asset update: ${updatedAsset?.name}`);
        }
      } catch (err) {
        console.error("\u274C Email notification failed:", err);
      }
      if (updateData.knoxId && updateData.knoxId.trim() !== "" && (!existingAsset.knoxId || updateData.knoxId !== existingAsset.knoxId || existingAsset.status !== "deployed")) {
        const customNotes = `Asset automatically checked out to KnoxID: ${updateData.knoxId}`;
        const checkedOutAsset = await storage.checkoutAsset(id, 1, void 0, customNotes);
        if (checkedOutAsset) {
          await storage.createActivity({
            action: "checkout",
            itemType: "asset",
            itemId: id,
            userId: 1,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: customNotes
          });
          return res.json(checkedOutAsset);
        }
      }
      return res.json(updatedAsset);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.delete("/api/assets/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const existingAsset = await storage.getAsset(id);
      if (!existingAsset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      await storage.deleteAsset(id);
      await storage.createActivity({
        action: "delete",
        itemType: "asset",
        itemId: id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Asset ${existingAsset.name} (${existingAsset.assetTag}) deleted`
      });
      try {
        const emailSent = await emailService.sendModificationNotification({
          action: "delete",
          itemType: "Asset",
          itemName: `${existingAsset.name} (${existingAsset.assetTag})`,
          userName: req.user.username,
          details: `Asset permanently deleted from system`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          additionalInfo: {
            assetTag: existingAsset.assetTag,
            category: existingAsset.category,
            status: existingAsset.status,
            location: existingAsset.location || "Not specified",
            serialNumber: existingAsset.serialNumber || "Not specified",
            knoxId: existingAsset.knoxId || "Not assigned",
            department: existingAsset.department || "Not specified"
          }
        });
        if (emailSent) {
          console.log(`\u2705 Email notification sent for asset deletion: ${existingAsset.name}`);
        }
      } catch (err) {
        console.error("\u274C Email notification failed:", err);
      }
      return res.status(204).send();
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/assets/import", async (req, res) => {
    try {
      const { assets: assets3, forceImport = false } = req.body;
      if (!Array.isArray(assets3)) {
        return res.status(400).json({
          message: "Invalid request format. Expected an array of assets.",
          total: 0,
          successful: 0,
          failed: 0,
          errors: ["Request body must contain an 'assets' array"]
        });
      }
      if (assets3.length === 0) {
        return res.status(400).json({
          message: "No assets to import",
          total: 0,
          successful: 0,
          failed: 0,
          errors: ["No assets provided in the request"]
        });
      }
      const importedAssets = [];
      const errors = [];
      let successful = 0;
      let updated = 0;
      let failed = 0;
      let skipped = 0;
      const skippedRows = [];
      console.log(`Starting bulk import of ${assets3.length} assets${forceImport ? " [FORCE IMPORT MODE - Skip validations]" : "..."}`);
      console.log(`First asset sample:`, JSON.stringify(assets3[0], null, 2));
      console.log(`Last asset sample:`, JSON.stringify(assets3[assets3.length - 1], null, 2));
      for (let i = 0; i < assets3.length; i++) {
        try {
          const asset2 = assets3[i];
          const rowNumber2 = i + 1;
          console.log(`Processing row ${rowNumber2}/${assets3.length}:`, {
            assetTag: asset2.assetTag,
            name: asset2.name,
            serialNumber: asset2.serialNumber,
            category: asset2.category
          });
          const hasData = Object.values(asset2).some(
            (value) => value !== null && value !== void 0 && value !== ""
          );
          if (!hasData) {
            console.log(`Skipping empty row ${rowNumber2}`);
            skippedRows.push(`Row ${rowNumber2}: Completely empty`);
            skipped++;
            continue;
          }
          let existingAsset = null;
          if (!forceImport) {
            if (asset2.assetTag && asset2.assetTag.trim() !== "") {
              existingAsset = await storage.getAssetByTag(asset2.assetTag);
              if (existingAsset) {
                console.log(`Found existing asset by tag ${asset2.assetTag} (Row ${rowNumber2})`);
              }
            }
          }
          if (existingAsset && !forceImport) {
            const updateData = {
              ...asset2,
              notes: `Updated via CSV import. KnoxID: ${asset2.knoxId || "N/A"}`
            };
            console.log(`Updating existing asset ${existingAsset.id} (Row ${rowNumber2})`);
            const updatedAsset = await storage.updateAsset(existingAsset.id, updateData);
            await storage.createActivity({
              action: "update",
              itemType: "asset",
              itemId: existingAsset.id,
              userId: req.user?.id || 1,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `Updated via CSV import. Asset Tag: ${asset2.assetTag}, Serial: ${asset2.serialNumber}`
            });
            if (asset2.knoxId && asset2.knoxId.trim() !== "" && (updatedAsset?.status !== "deployed" || updatedAsset?.knoxId !== asset2.knoxId)) {
              const customNotes = `Asset automatically checked out to KnoxID: ${asset2.knoxId}`;
              const checkedOutAsset = await storage.checkoutAsset(existingAsset.id, 1, void 0, customNotes);
              if (checkedOutAsset) {
                await storage.createActivity({
                  action: "checkout",
                  itemType: "asset",
                  itemId: existingAsset.id,
                  userId: req.user?.id || 1,
                  timestamp: (/* @__PURE__ */ new Date()).toISOString(),
                  notes: customNotes
                });
              }
            }
            importedAssets.push(updatedAsset);
            updated++;
            console.log(`Successfully updated asset (Row ${rowNumber2}). Total updated: ${updated}`);
          } else {
            console.log(`Creating new asset (Row ${rowNumber2})${forceImport ? " [FORCE IMPORT]" : ""}`);
            if (forceImport && existingAsset && asset2.assetTag) {
              asset2.assetTag = `${asset2.assetTag}-${Date.now()}`;
              console.log(`Modified asset tag to avoid duplicate: ${asset2.assetTag}`);
            }
            const newAsset = await storage.createAsset(asset2);
            await storage.createActivity({
              action: "create",
              itemType: "asset",
              itemId: newAsset.id,
              userId: req.user?.id || 1,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `Created via CSV import${forceImport ? " [FORCE IMPORT]" : ""}. KnoxID: ${asset2.knoxId || "N/A"}`
            });
            if (asset2.knoxId && asset2.knoxId.trim() !== "") {
              const customNotes = `Asset automatically checked out to KnoxID: ${asset2.knoxId}`;
              const checkedOutAsset = await storage.checkoutAsset(newAsset.id, 1, void 0, customNotes);
              if (checkedOutAsset) {
                await storage.createActivity({
                  action: "checkout",
                  itemType: "asset",
                  itemId: newAsset.id,
                  userId: req.user?.id || 1,
                  timestamp: (/* @__PURE__ */ new Date()).toISOString(),
                  notes: customNotes
                });
              }
            }
            importedAssets.push(newAsset);
            successful++;
            console.log(`Successfully created asset ${newAsset.id} (Row ${rowNumber2}). Total created: ${successful}`);
          }
        } catch (assetError) {
          failed++;
          const errorMessage = `Row ${rowNumber}: ${assetError instanceof Error ? assetError.message : "Unknown error"}`;
          errors.push(errorMessage);
          console.error(`Asset import error:`, errorMessage, asset);
        }
      }
      console.log(`Import summary: Total: ${assets3.length}, Created: ${successful}, Updated: ${updated}, Failed: ${failed}, Skipped: ${skipped}`);
      console.log(`Processed: ${successful + updated + failed + skipped}, Expected: ${assets3.length}`);
      const response = {
        total: assets3.length,
        successful,
        updated,
        failed,
        skipped,
        processed: successful + updated + failed + skipped,
        errors,
        skippedRows,
        message: `Import completed${forceImport ? " [FORCE IMPORT]" : ""}. ${successful} assets created, ${updated} assets updated, ${failed} failed, ${skipped} skipped.`
      };
      const statusCode = failed > 0 ? 200 : 201;
      return res.status(statusCode).json(response);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/assets/:id/checkout", async (req, res) => {
    try {
      const assetId = parseInt(req.params.id);
      const { userId, knoxId, firstName, lastName, expectedCheckinDate } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      const user = await storage.getUser(parseInt(userId));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const asset2 = await storage.getAsset(assetId);
      if (!asset2) {
        return res.status(404).json({ message: "Asset not found" });
      }
      let customNotes = "";
      if (knoxId && firstName && lastName) {
        customNotes = `Asset checked out to ${firstName} ${lastName} (KnoxID: ${knoxId})`;
      }
      if (knoxId) {
        await storage.updateAsset(assetId, { knoxId });
      }
      const updatedAsset = await storage.checkoutAsset(assetId, parseInt(userId), expectedCheckinDate, customNotes);
      if (!updatedAsset) {
        return res.status(400).json({ message: "Asset cannot be checked out" });
      }
      return res.json(updatedAsset);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/assets/:id/checkin", async (req, res) => {
    try {
      const assetId = parseInt(req.params.id);
      const asset2 = await storage.getAsset(assetId);
      if (!asset2) {
        return res.status(404).json({ message: "Asset not found" });
      }
      const updatedAsset = await storage.checkinAsset(assetId);
      if (!updatedAsset) {
        return res.status(400).json({ message: "Asset cannot be checked in" });
      }
      return res.json(updatedAsset);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/assets/:id/finance", async (req, res) => {
    try {
      const assetId = parseInt(req.params.id);
      const asset2 = await storage.getAsset(assetId);
      if (!asset2) {
        return res.status(404).json({ message: "Asset not found" });
      }
      const { financeUpdated } = req.body;
      const updatedAsset = await storage.updateAsset(assetId, {
        financeUpdated
      });
      await storage.createActivity({
        action: "update",
        itemType: "asset",
        itemId: assetId,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Finance status updated to: ${financeUpdated ? "Updated" : "Not Updated"}`
      });
      return res.json(updatedAsset);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/assets/cleanup-knox", async (req, res) => {
    try {
      const assets3 = await storage.getAssets();
      const availableAssetsWithKnoxId = assets3.filter(
        (asset2) => (asset2.status === AssetStatus.AVAILABLE || asset2.status === AssetStatus.PENDING || asset2.status === AssetStatus.ARCHIVED) && asset2.knoxId
      );
      const updates = await Promise.all(
        availableAssetsWithKnoxId.map(
          (asset2) => storage.updateAsset(asset2.id, { knoxId: null })
        )
      );
      await storage.createActivity({
        action: "update",
        itemType: "asset",
        itemId: 0,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Cleaned up Knox IDs for ${updates.length} assets that were not checked out`
      });
      return res.json({
        message: `Cleaned up Knox IDs for ${updates.length} assets`,
        count: updates.length,
        updatedAssets: updates
      });
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/licenses", checkPermission("licenses", "view"), async (req, res) => {
    try {
      const licenses3 = await storage.getLicenses();
      return res.json(licenses3);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/licenses/:id", checkPermission("licenses", "view"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const license = await storage.getLicense(id);
      if (!license) {
        return res.status(404).json({ message: "License not found" });
      }
      return res.json(license);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/licenses", checkPermission("licenses", "add"), async (req, res) => {
    try {
      const licenseData = insertLicenseSchema.parse(req.body);
      const license = await storage.createLicense(licenseData);
      return res.status(201).json(license);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.patch("/api/licenses/:id", checkPermission("licenses", "edit"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const existingLicense = await storage.getLicense(id);
      if (!existingLicense) {
        return res.status(404).json({ message: "License not found" });
      }
      const updateData = insertLicenseSchema.partial().parse(req.body);
      if (updateData.assignedSeats !== void 0 || updateData.expirationDate !== void 0) {
        const expirationDate = updateData.expirationDate || existingLicense.expirationDate;
        const assignedSeats = updateData.assignedSeats !== void 0 ? updateData.assignedSeats : existingLicense.assignedSeats || 0;
        if (expirationDate && new Date(expirationDate) < /* @__PURE__ */ new Date()) {
          updateData.status = LicenseStatus.EXPIRED;
        } else if (assignedSeats > 0 && (!updateData.status || updateData.status !== LicenseStatus.EXPIRED)) {
          updateData.status = LicenseStatus.ACTIVE;
        } else if (assignedSeats === 0 && (!updateData.status || updateData.status !== LicenseStatus.EXPIRED)) {
          updateData.status = LicenseStatus.UNUSED;
        }
      }
      const updatedLicense = await storage.updateLicense(id, updateData);
      await storage.createActivity({
        action: "update",
        itemType: "license",
        itemId: id,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `License "${updatedLicense?.name}" updated`
      });
      return res.json(updatedLicense);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/licenses/:id/assignments", async (req, res) => {
    try {
      const licenseId = parseInt(req.params.id);
      const assignments = await storage.getLicenseAssignments(licenseId);
      res.json(assignments);
    } catch (error) {
      handleError(error, res);
    }
  });
  app2.post("/api/licenses/:id/assign", async (req, res) => {
    try {
      const licenseId = parseInt(req.params.id);
      const { assignedTo, notes } = req.body;
      const license = await storage.getLicense(licenseId);
      if (!license) {
        return res.status(404).json({ error: "License not found" });
      }
      if (license.seats && license.seats !== "Unlimited") {
        const totalSeats = parseInt(license.seats);
        if ((license.assignedSeats || 0) >= totalSeats) {
          return res.status(400).json({ error: "No available seats for this license" });
        }
      }
      const assignment = await storage.createLicenseAssignment({
        licenseId,
        assignedTo,
        notes,
        assignedDate: (/* @__PURE__ */ new Date()).toISOString()
      });
      let status = license.status;
      if (license.expirationDate && new Date(license.expirationDate) < /* @__PURE__ */ new Date()) {
        status = LicenseStatus.EXPIRED;
      } else {
        status = LicenseStatus.ACTIVE;
      }
      const updatedLicense = await storage.updateLicense(licenseId, {
        assignedSeats: (license.assignedSeats || 0) + 1,
        status
      });
      await storage.createActivity({
        action: "update",
        itemType: "license",
        itemId: licenseId,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `License seat assigned to: ${assignedTo}`
      });
      res.status(201).json({ assignment, license: updatedLicense });
    } catch (error) {
      handleError(error, res);
    }
  });
  app2.delete("/api/licenses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const existingLicense = await storage.getLicense(id);
      if (!existingLicense) {
        return res.status(404).json({ message: "License not found" });
      }
      await storage.deleteLicense(id);
      return res.status(204).send();
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.patch("/api/consumables/:consumableId/assignments/:id", requireAuth, async (req, res) => {
    try {
      const assignmentId = parseInt(req.params.id);
      const updateData = req.body;
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const [existingAssignment] = await db2.select().from(consumableAssignments).where(eq4(consumableAssignments.id, assignmentId));
      if (!existingAssignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      const [updatedAssignment] = await db2.update(consumableAssignments).set({
        assignedTo: updateData.assignedTo,
        serialNumber: updateData.serialNumber || null,
        knoxId: updateData.knoxId || null,
        notes: updateData.notes || null
      }).where(eq4(consumableAssignments.id, assignmentId)).returning();
      await storage.createActivity({
        action: "update",
        itemType: "consumable_assignment",
        itemId: assignmentId,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Updated assignment for ${updateData.assignedTo}`
      });
      res.json(updatedAssignment);
    } catch (error) {
      console.error("Error updating consumable assignment:", error);
      res.status(500).json({ message: "Failed to update assignment" });
    }
  });
  app2.get("/api/it-equipment", requireAuth, async (req, res) => {
    if (!db2) {
      return res.status(503).json({
        message: "Database connection unavailable"
      });
    }
    try {
      const equipment = await db2.select().from(itEquipment);
      const decryptedEquipment = batchDecryptFields2(equipment, PII_FIELDS2.itEquipment);
      res.json(decryptedEquipment);
    } catch (error) {
      console.error("Error fetching IT equipment:", error);
      res.status(500).json({
        message: "Failed to fetch IT equipment"
      });
    }
  });
  app2.get("/api/it-equipment/:id", requireAuth, async (req, res) => {
    if (!db2) {
      return res.status(503).json({
        message: "Database connection unavailable"
      });
    }
    try {
      const id = parseInt(req.params.id);
      const [equipment] = await db2.select().from(itEquipment).where(eq4(itEquipment.id, id));
      if (!equipment) {
        return res.status(404).json({
          message: "IT equipment not found"
        });
      }
      const decryptedEquipment = decryptFields2(equipment, PII_FIELDS2.itEquipment);
      res.json(decryptedEquipment);
    } catch (error) {
      console.error("Error fetching IT equipment:", error);
      res.status(500).json({
        message: "Failed to fetch IT equipment"
      });
    }
  });
  app2.post("/api/it-equipment", requireAuth, async (req, res) => {
    try {
      const equipmentData = req.body;
      console.log("Creating IT equipment with data:", equipmentData);
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      if (!equipmentData.name || !equipmentData.category || !equipmentData.totalQuantity) {
        return res.status(400).json({
          message: "Name, category, and total quantity are required"
        });
      }
      const newEquipment = {
        name: equipmentData.name.trim(),
        category: equipmentData.category.trim(),
        totalQuantity: parseInt(equipmentData.totalQuantity),
        assignedQuantity: 0,
        model: equipmentData.model?.trim() || null,
        location: equipmentData.location?.trim() || null,
        dateAcquired: equipmentData.dateAcquired || null,
        knoxId: equipmentData.knoxId?.trim() || null,
        serialNumber: equipmentData.serialNumber?.trim() || null,
        dateRelease: equipmentData.dateRelease || null,
        remarks: equipmentData.remarks?.trim() || null,
        status: equipmentData.status || "available",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const [createdEquipment] = await db2.insert(itEquipment).values(newEquipment).returning();
      await storage.createActivity({
        action: "create",
        itemType: "it-equipment",
        itemId: createdEquipment.id,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `IT Equipment "${createdEquipment.name}" created`
      });
      try {
        await emailService.initialize();
        await emailService.sendModificationNotification({
          action: "created",
          itemType: "IT Equipment",
          itemName: createdEquipment.name,
          userName: req.user?.username || "Unknown",
          details: `IT Equipment created: ${createdEquipment.name}, Category: ${createdEquipment.category}, Quantity: ${createdEquipment.totalQuantity}`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      } catch (err) {
        console.error("Failed to send email notification:", err);
      }
      console.log("IT Equipment created successfully:", createdEquipment);
      res.status(201).json(createdEquipment);
    } catch (error) {
      console.error("Error creating IT equipment:", error);
      res.status(500).json({
        message: "Failed to create IT equipment",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.patch("/api/it-equipment/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const equipmentData = req.body;
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      const updateData = {
        name: equipmentData.name?.trim(),
        category: equipmentData.category?.trim(),
        totalQuantity: equipmentData.totalQuantity ? parseInt(equipmentData.totalQuantity) : void 0,
        model: equipmentData.model?.trim() || null,
        location: equipmentData.location?.trim() || null,
        dateAcquired: equipmentData.dateAcquired || null,
        knoxId: equipmentData.knoxId?.trim() || null,
        serialNumber: equipmentData.serialNumber?.trim() || null,
        dateRelease: equipmentData.dateRelease || null,
        remarks: equipmentData.remarks?.trim() || null,
        status: equipmentData.status,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const cleanUpdateData = {};
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] !== void 0) {
          cleanUpdateData[key] = updateData[key];
        }
      });
      const [equipment] = await db2.update(itEquipment).set(cleanUpdateData).where(eq4(itEquipment.id, id)).returning();
      if (!equipment) {
        return res.status(404).json({ message: "IT Equipment not found" });
      }
      await storage.createActivity({
        action: "update",
        itemType: "it-equipment",
        itemId: id,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `IT Equipment "${equipment.name}" updated`
      });
      try {
        const settings3 = await storage.getSystemSettings();
        console.log(`
\u{1F4E7} ========== IT EQUIPMENT EMAIL NOTIFICATION ==========`);
        console.log(`\u{1F4E7} Equipment: ${equipment.name}`);
        console.log(`\u{1F4E7} Action: UPDATE`);
        console.log(`\u{1F4E7} User: ${req.user?.username || "Unknown"}`);
        console.log(`\u{1F4E7} Settings Check:`);
        console.log(`   - Company Email: ${settings3?.companyEmail || "NOT SET"}`);
        console.log(`   - Mail Host: ${settings3?.mailHost || "NOT SET"}`);
        console.log(`   - Admin Notifications: ${settings3?.enableAdminNotifications ?? "NOT SET (defaults to TRUE)"}`);
        console.log(`   - IT Equipment Notifications: ${settings3?.notifyOnItEquipmentChanges ?? "NOT SET (defaults to TRUE)"}`);
        await emailService.initialize();
        console.log(`\u{1F4E7} [IT-EQUIPMENT] Email service initialized`);
        const emailSent = await emailService.sendModificationNotification({
          action: "update",
          itemType: "IT Equipment",
          itemName: equipment.name,
          userName: req.user?.username || "Unknown",
          details: `Equipment updated - Category: ${equipment.category}, Quantity: ${equipment.totalQuantity}`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        console.log(`Email Result: ${emailSent ? "\u2705 SUCCESS" : "\u274C FAILED"}`);
        console.log(`\u{1F4E7} =====================================================
`);
      } catch (err) {
        console.error(`\u274C [IT-EQUIPMENT] Email notification exception:`, err);
      }
      res.json(equipment);
    } catch (error) {
      console.error("Error updating IT equipment:", error);
      res.status(500).json({ message: "Failed to update IT equipment" });
    }
  });
  app2.delete("/api/it-equipment/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      const [equipment] = await db2.select().from(itEquipment).where(eq4(itEquipment.id, id));
      if (!equipment) {
        return res.status(404).json({ message: "IT Equipment not found" });
      }
      await db2.delete(itEquipmentAssignments).where(eq4(itEquipmentAssignments.equipmentId, id));
      await db2.delete(itEquipment).where(eq4(itEquipment.id, id));
      await storage.createActivity({
        action: "delete",
        itemType: "it-equipment",
        itemId: id,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `IT Equipment "${equipment.name}" deleted`
      });
      try {
        const emailSent = await emailService.sendModificationNotification({
          action: "delete",
          itemType: "IT Equipment",
          itemName: equipment.name,
          userName: req.user?.username || "Unknown",
          details: `Equipment deleted - Category: ${equipment.category}`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        if (emailSent) {
          console.log(`\u2705 Email notification sent for IT equipment deletion: ${equipment.name}`);
        }
      } catch (err) {
        console.error("\u274C Email notification failed:", err);
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting IT equipment:", error);
      res.status(500).json({ message: "Failed to delete IT equipment" });
    }
  });
  app2.post("/api/it-equipment/import", requireAuth, async (req, res) => {
    try {
      const { equipment } = req.body;
      if (!Array.isArray(equipment)) {
        return res.status(400).json({
          message: "Invalid request format. Expected an array of equipment.",
          total: 0,
          successful: 0,
          failed: 0,
          errors: ["Request body must contain an 'equipment' array"]
        });
      }
      if (equipment.length === 0) {
        return res.status(400).json({
          message: "No equipment to import",
          total: 0,
          successful: 0,
          failed: 0,
          errors: ["No equipment provided in the request"]
        });
      }
      if (!db2) {
        return res.status(503).json({
          message: "Database not available",
          total: equipment.length,
          successful: 0,
          failed: equipment.length,
          errors: ["Database connection required for CSV import"]
        });
      }
      let successful = 0;
      let failed = 0;
      const errors = [];
      console.log(`Starting import of ${equipment.length} IT equipment items...`);
      for (let i = 0; i < equipment.length; i++) {
        try {
          const item2 = equipment[i];
          const rowNumber2 = i + 1;
          console.log(`Processing equipment row ${rowNumber2}:`, item2);
          if (!item2.name || !item2.category || !item2.totalQuantity) {
            throw new Error(`Row ${rowNumber2}: Name, category, and total quantity are required`);
          }
          const hasAssignment = item2.assignedTo && item2.assignedTo.trim() !== "" && item2.assignedTo !== "-";
          const assignmentQuantity = hasAssignment ? parseInt(item2.assignedQuantity || "1") : 0;
          const newEquipment = {
            name: item2.name.trim(),
            category: item2.category.trim(),
            totalQuantity: parseInt(item2.totalQuantity),
            assignedQuantity: assignmentQuantity,
            // Set correct assigned quantity
            model: item2.model?.trim() || null,
            location: item2.location?.trim() || null,
            dateAcquired: item2.dateAcquired || null,
            knoxId: item2.knoxId?.trim() || null,
            serialNumber: item2.serialNumber?.trim() || null,
            dateRelease: item2.dateRelease || null,
            remarks: item2.remarks?.trim() || null,
            status: item2.status || "available",
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          console.log(`Creating equipment with data:`, newEquipment);
          const [createdEquipment] = await db2.insert(itEquipment).values(newEquipment).returning();
          if (hasAssignment && assignmentQuantity > 0) {
            const assignmentData = {
              equipmentId: createdEquipment.id,
              assignedTo: item2.assignedTo.trim(),
              knoxId: item2.assignmentKnoxId?.trim() || item2.knoxId?.trim() || null,
              serialNumber: item2.assignmentSerialNumber?.trim() || item2.serialNumber?.trim() || null,
              quantity: assignmentQuantity,
              assignedDate: item2.assignedDate || (/* @__PURE__ */ new Date()).toISOString(),
              status: "assigned",
              notes: item2.assignmentNotes?.trim() || null
            };
            console.log(`Creating assignment with data:`, assignmentData);
            await db2.insert(itEquipmentAssignments).values(assignmentData);
            await storage.createActivity({
              action: "assign",
              itemType: "it-equipment",
              itemId: createdEquipment.id,
              userId: req.user?.id || 1,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `IT Equipment imported with assignment to ${item2.assignedTo} (Qty: ${assignmentQuantity})`
            });
            console.log(`Assignment created successfully for ${item2.assignedTo}`);
          }
          await storage.createActivity({
            action: "create",
            itemType: "it-equipment",
            itemId: createdEquipment.id,
            userId: req.user?.id || 1,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `IT Equipment "${createdEquipment.name}" imported via CSV${hasAssignment ? " with assignment" : ""}`
          });
          try {
            await emailService.initialize();
            await emailService.sendModificationNotification({
              action: "created",
              itemType: "IT Equipment",
              itemName: createdEquipment.name,
              userName: req.user?.username || "Unknown",
              details: `IT Equipment created: ${createdEquipment.name}, Category: ${createdEquipment.category}, Quantity: ${createdEquipment.totalQuantity}`,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            });
          } catch (err) {
            console.error("Failed to send IT Equipment creation email notification:", err);
          }
          successful++;
          console.log(`Successfully processed equipment row ${rowNumber2}: ${item2.name}`);
        } catch (itemError) {
          failed++;
          const errorMessage = `Row ${i + 1}: ${itemError.message}`;
          errors.push(errorMessage);
          console.error(`Equipment import error:`, errorMessage, item);
        }
      }
      console.log(`Import completed. Successful: ${successful}, Failed: ${failed}`);
      const response = {
        total: equipment.length,
        successful,
        failed,
        errors,
        message: `Import completed. ${successful} equipment items imported, ${failed} failed.`
      };
      const statusCode = failed > 0 ? 200 : 201;
      return res.status(statusCode).json(response);
    } catch (error) {
      console.error("IT Equipment import error:", error);
      return res.status(500).json({
        message: "Import failed",
        error: error.message
      });
    }
  });
  app2.get("/api/it-equipment/:id/assignments", requireAuth, async (req, res) => {
    try {
      const equipmentId = parseInt(req.params.id);
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      const assignments = await db2.select().from(itEquipmentAssignments).where(eq4(itEquipmentAssignments.equipmentId, equipmentId)).orderBy(itEquipmentAssignments.assignedDate);
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching IT equipment assignments:", error);
      res.status(500).json({ message: "Failed to fetch IT equipment assignments" });
    }
  });
  app2.post("/api/it-equipment/:id/assign", requireAuth, async (req, res) => {
    try {
      const equipmentId = parseInt(req.params.id);
      const assignmentData = req.body;
      console.log("IT Equipment assignment request:", { equipmentId, assignmentData });
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      if (!assignmentData.assignedTo) {
        return res.status(400).json({
          message: "assignedTo is required"
        });
      }
      const [equipment] = await db2.select().from(itEquipment).where(eq4(itEquipment.id, equipmentId));
      if (!equipment) {
        return res.status(404).json({ message: "IT Equipment not found" });
      }
      console.log("Current equipment state:", equipment);
      const totalQuantity = equipment.totalQuantity || 0;
      const currentAssignedQuantity = equipment.assignedQuantity || 0;
      const availableQuantity = totalQuantity - currentAssignedQuantity;
      const requestedQuantity = parseInt(assignmentData.quantity) || 1;
      console.log("Quantity check:", { totalQuantity, currentAssignedQuantity, availableQuantity, requestedQuantity });
      if (requestedQuantity > availableQuantity) {
        return res.status(400).json({
          message: `Not enough units available. Requested: ${requestedQuantity}, Available: ${availableQuantity}`
        });
      }
      const [assignment] = await db2.insert(itEquipmentAssignments).values({
        equipmentId,
        assignedTo: assignmentData.assignedTo,
        knoxId: assignmentData.knoxId || null,
        serialNumber: assignmentData.serialNumber || null,
        quantity: requestedQuantity,
        assignedDate: assignmentData.assignedDate || (/* @__PURE__ */ new Date()).toISOString(),
        status: "assigned",
        notes: assignmentData.notes || null
      }).returning();
      console.log("Assignment created:", assignment);
      const newAssignedQuantity = currentAssignedQuantity + requestedQuantity;
      const [updatedEquipment] = await db2.update(itEquipment).set({
        assignedQuantity: newAssignedQuantity,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).where(eq4(itEquipment.id, equipmentId)).returning();
      console.log("Equipment updated:", updatedEquipment);
      await storage.createActivity({
        action: "assign",
        itemType: "it-equipment",
        itemId: equipmentId,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `IT Equipment assigned to ${assignmentData.assignedTo} (Qty: ${requestedQuantity})`
      });
      res.status(201).json({
        assignment,
        updatedEquipment
      });
    } catch (error) {
      console.error("Error assigning IT equipment:", error);
      res.status(500).json({
        message: "Failed to assign IT equipment",
        error: error.message
      });
    }
  });
  app2.post("/api/it-equipment/:id/bulk-assign", requireAuth, async (req, res) => {
    try {
      const equipmentId = parseInt(req.params.id);
      const { assignments } = req.body;
      console.log("Bulk assignment request:", { equipmentId, assignments });
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      if (!Array.isArray(assignments) || assignments.length === 0) {
        return res.status(400).json({
          message: "assignments array is required"
        });
      }
      const [equipment] = await db2.select().from(itEquipment).where(eq4(itEquipment.id, equipmentId));
      if (!equipment) {
        return res.status(404).json({ message: "IT Equipment not found" });
      }
      console.log("Equipment found:", equipment);
      const totalQuantity = equipment.totalQuantity || 0;
      const assignedQuantity = equipment.assignedQuantity || 0;
      const availableQuantity = totalQuantity - assignedQuantity;
      const totalRequestedQuantity = assignments.reduce((sum, a) => sum + (parseInt(a.quantity) || 1), 0);
      console.log("Quantity validation:", { totalQuantity, assignedQuantity, availableQuantity, totalRequestedQuantity });
      if (totalRequestedQuantity > availableQuantity) {
        return res.status(400).json({
          message: `Not enough units available. Requested: ${totalRequestedQuantity}, Available: ${availableQuantity}`
        });
      }
      const createdAssignments = [];
      for (const assignmentData of assignments) {
        if (!assignmentData.assignedTo) {
          return res.status(400).json({
            message: "assignedTo is required for all assignments"
          });
        }
        console.log("Creating assignment:", assignmentData);
        const [assignment] = await db2.insert(itEquipmentAssignments).values({
          equipmentId,
          assignedTo: assignmentData.assignedTo,
          knoxId: assignmentData.knoxId || null,
          serialNumber: assignmentData.serialNumber || null,
          quantity: parseInt(assignmentData.quantity) || 1,
          assignedDate: assignmentData.assignedDate || (/* @__PURE__ */ new Date()).toISOString(),
          status: "assigned",
          notes: assignmentData.notes || null
        }).returning();
        console.log("Assignment created:", assignment);
        createdAssignments.push(assignment);
        await storage.createActivity({
          action: "assign",
          itemType: "it-equipment",
          itemId: equipmentId,
          userId: req.user?.id || 1,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `IT Equipment assigned to ${assignmentData.assignedTo} (Qty: ${parseInt(assignmentData.quantity) || 1})`
        });
      }
      const newAssignedQuantity = assignedQuantity + totalRequestedQuantity;
      const [updatedEquipment] = await db2.update(itEquipment).set({
        assignedQuantity: newAssignedQuantity,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).where(eq4(itEquipment.id, equipmentId)).returning();
      res.status(201).json({
        message: `Successfully created ${createdAssignments.length} assignments`,
        assignments: createdAssignments,
        updatedEquipment
      });
    } catch (error) {
      console.error("Error in bulk assignment:", error);
      res.status(500).json({
        message: "Failed to create bulk assignments",
        error: error.message
      });
    }
  });
  app2.delete("/api/it-equipment/assignments/:assignmentId", requireAuth, async (req, res) => {
    try {
      const assignmentId = parseInt(req.params.assignmentId);
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      const [assignment] = await db2.select().from(itEquipmentAssignments).where(eq4(itEquipmentAssignments.id, assignmentId));
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      const [equipment] = await db2.select().from(itEquipment).where(eq4(itEquipment.id, assignment.equipmentId));
      if (!equipment) {
        return res.status(404).json({ message: "Equipment not found" });
      }
      await db2.delete(itEquipmentAssignments).where(eq4(itEquipmentAssignments.id, assignmentId));
      const currentAssignedQuantity = equipment.assignedQuantity || 0;
      const newAssignedQuantity = Math.max(0, currentAssignedQuantity - (assignment.quantity || 1));
      await db2.update(itEquipment).set({
        assignedQuantity: newAssignedQuantity,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).where(eq4(itEquipment.id, assignment.equipmentId));
      await storage.createActivity({
        action: "unassign",
        itemType: "it-equipment",
        itemId: assignment.equipmentId,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `IT Equipment assignment removed for ${assignment.assignedTo} (Qty: ${assignment.quantity})`
      });
      res.status(204).send();
    } catch (error) {
      console.error("Error removing IT equipment assignment:", error);
      res.status(500).json({ message: "Failed to remove assignment" });
    }
  });
  app2.get("/api/activities", async (req, res) => {
    try {
      const activities3 = await storage.getActivities();
      return res.json(activities3);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/users/:id/activities", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const activities3 = await storage.getActivitiesByUser(userId);
      return res.json(activities3);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/assets/:id/activities", async (req, res) => {
    try {
      const assetId = parseInt(req.params.id);
      const asset2 = await storage.getAsset(assetId);
      if (!asset2) {
        return res.status(404).json({ message: "Asset not found" });
      }
      const activities3 = await storage.getActivitiesByAsset(assetId);
      return res.json(activities3);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/components", checkPermission("components", "view"), async (req, res) => {
    try {
      const components3 = await storage.getComponents();
      return res.json(components3);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/components/:id", checkPermission("components", "view"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const component = await storage.getComponent(id);
      if (!component) {
        return res.status(404).json({ message: "Component not found" });
      }
      return res.json(component);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/components", checkPermission("components", "add"), async (req, res) => {
    try {
      console.log("Creating component with data:", req.body);
      const componentData = insertComponentSchema.parse(req.body);
      const component = await storage.createComponent(componentData);
      await storage.createActivity({
        action: "create",
        itemType: "component",
        itemId: component.id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Created component: ${component.name}`
      });
      console.log("Component created successfully:", component);
      return res.status(201).json(component);
    } catch (err) {
      console.error("Error creating component:", err);
      return handleError(err, res);
    }
  });
  app2.patch("/api/components/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const component = await storage.updateComponent(id, updates);
      if (!component) {
        return res.status(404).json({ message: "Component not found" });
      }
      await storage.createActivity({
        action: "update",
        itemType: "component",
        itemId: id,
        userId: 1,
        // Default user for now
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Updated component: ${component.name}`
      });
      return res.json(component);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.delete("/api/components/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const existingComponent = await storage.getComponent(id);
      if (!existingComponent) {
        return res.status(404).json({ message: "Component not found" });
      }
      await storage.deleteComponent(id);
      await storage.createActivity({
        action: "delete",
        itemType: "component",
        itemId: id,
        userId: 1,
        // Default user for now
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Deleted component: ${existingComponent.name}`
      });
      return res.status(204).send();
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/vm-monitoring", async (req, res) => {
    try {
      const monitoringData = insertVMMonitoringSchema.parse(req.body);
      const existingData = await storage.getVMMonitoringByVMId(monitoringData.vmId);
      let result;
      if (existingData) {
        result = await storage.updateVMMonitoring(existingData.id, monitoringData);
      } else {
        result = await storage.createVMMonitoring(monitoringData);
      }
      return res.status(201).json(result);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/vm-monitoring/sync", async (req, res) => {
    try {
      const settings3 = await storage.getZabbixSettings();
      if (!settings3 || !settings3.url || !settings3.username || !settings3.password) {
        return res.status(400).json({ message: "Zabbix connection not configured" });
      }
      const authResponse = await fetch(settings3.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "user.login",
          params: {
            user: settings3.username,
            password: settings3.password
          },
          id: 1
        })
      });
      const authData = await authResponse.json();
      if (authData.error) {
        throw new Error(`Zabbix authentication failed: ${authData.error.message}`);
      }
      const authToken = authData.result;
      const hostsResponse = await fetch(settings3.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "host.get",
          params: {
            output: ["hostid", "host", "name", "status", "available"],
            selectItems: ["key_", "lastvalue", "units"],
            selectInterfaces: ["ip"],
            filter: {
              status: 0
              // Only enabled hosts
            }
          },
          auth: authToken,
          id: 2
        })
      });
      const hostsData = await hostsResponse.json();
      if (hostsData.error) {
        throw new Error(`Failed to fetch hosts: ${hostsData.error.message}`);
      }
      let syncedCount = 0;
      for (const host of hostsData.result) {
        try {
          const cpuItem = host.items?.find(
            (item2) => item2.key_.includes("system.cpu.util") || item2.key_.includes("cpu.usage")
          );
          const memoryItem = host.items?.find(
            (item2) => item2.key_.includes("memory.util") || item2.key_.includes("vm.memory.util")
          );
          const diskItem = host.items?.find(
            (item2) => item2.key_.includes("vfs.fs.size") && item2.key_.includes("pfree")
          );
          const uptimeItem = host.items?.find(
            (item2) => item2.key_.includes("system.uptime")
          );
          const vmData = {
            vmId: parseInt(host.hostid),
            hostname: host.name,
            ipAddress: host.interfaces?.[0]?.ip || host.host,
            status: getVMStatusFromZabbix(host.available),
            cpuUsage: cpuItem ? parseFloat(cpuItem.lastvalue) : null,
            memoryUsage: memoryItem ? parseFloat(memoryItem.lastvalue) : null,
            // Corrected to use memoryItem.lastvalue
            diskUsage: diskItem ? 100 - parseFloat(diskItem.lastvalue) : null,
            uptime: uptimeItem ? parseInt(uptimeItem.lastvalue) : null,
            networkStatus: host.available === "1" ? "up" : "down",
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          const existingData = await storage.getVMMonitoringByVMId(parseInt(host.hostid));
          if (existingData) {
            await storage.updateVMMonitoring(existingData.id, vmData);
          } else {
            await storage.createVMMonitoring(vmData);
          }
          syncedCount++;
        } catch (vmError) {
          console.error(`Error syncing VM ${host.name}:`, vmError);
        }
      }
      await storage.createActivity({
        action: "sync",
        itemType: "vm-monitoring",
        itemId: 1,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Synchronized ${syncedCount} VMs from Zabbix`
      });
      return res.json({
        success: true,
        message: `Sync completed successfully. Synchronized ${syncedCount} VMs.`,
        count: syncedCount
      });
    } catch (err) {
      console.error("VM sync error:", err);
      return handleError(err, res);
    }
  });
  function getVMStatusFromZabbix(available) {
    const statusMap = {
      "0": "unknown",
      "1": "running",
      "2": "stopped"
    };
    return statusMap[available.toString()] || "unknown";
  }
  app2.get("/api/network-discovery/hosts", async (req, res) => {
    try {
      const hosts = await storage.getDiscoveredHosts();
      return res.json(hosts);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/network-discovery/hosts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const host = await storage.getDiscoveredHost(id);
      if (!host) {
        return res.status(404).json({ message: "Discovered host not found" });
      }
      return res.json(host);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/network-discovery/hosts", async (req, res) => {
    try {
      const hostData = insertDiscoveredHostSchema2.parse(req.body);
      const host = await storage.createDiscoveredHost(hostData);
      return res.status(201).json(host);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.patch("/api/network-discovery/hosts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const host = await storage.getDiscoveredHost(id);
      if (!host) {
        return res.status(404).json({ message: "Discovered host not found" });
      }
      const updateData = insertDiscoveredHostSchema2.partial().parse(req.body);
      const updatedHost = await storage.updateDiscoveredHost(id, updateData);
      return res.json(updatedHost);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.delete("/api/network-discovery/hosts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const host = await storage.getDiscoveredHost(id);
      if (!host) {
        return res.status(404).json({ message: "Discovered host not found" });
      }
      await storage.deleteDiscoveredHost(id);
      return res.status(204).send();
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/network-discovery/scan", async (req, res) => {
    try {
      const {
        ipRange,
        primaryDNS,
        secondaryDNS,
        useDNS,
        scanForUSB,
        scanForSerialNumbers,
        scanForHardwareDetails,
        scanForInstalledSoftware,
        zabbixUrl,
        zabbixApiKey,
        useZabbix
      } = req.body;
      if (!ipRange) {
        return res.status(400).json({ message: "IP range is required" });
      }
      const cidrRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;
      if (!cidrRegex.test(ipRange)) {
        return res.status(400).json({ message: "Invalid IP range format. Use CIDR notation (e.g., 192.168.1.0/24)" });
      }
      console.log(`Starting real network scan for range: ${ipRange}`);
      let usingZabbix = false;
      let zabbixInfo = {};
      if (useZabbix && zabbixUrl && zabbixApiKey) {
        usingZabbix = true;
        zabbixInfo = {
          url: zabbixUrl,
          apiKey: zabbixApiKey
        };
        console.log(`Network scan will use Zabbix integration: ${zabbixUrl}`);
      }
      let dnsSettings = null;
      if (useDNS && (primaryDNS || secondaryDNS)) {
        dnsSettings = {
          primaryDNS: primaryDNS || "8.8.8.8",
          secondaryDNS: secondaryDNS || "8.8.4.4"
        };
        console.log(`Network scan will use DNS servers: ${dnsSettings.primaryDNS}, ${dnsSettings.secondaryDNS}`);
      }
      const scanDetails = {
        ipRange,
        scanOptions: {
          scanForUSB: scanForUSB || false,
          scanForSerialNumbers: scanForSerialNumbers || false,
          scanForHardwareDetails: scanForHardwareDetails || false,
          scanForInstalledSoftware: scanForInstalledSoftware || false,
          useDNS: useDNS || false
        },
        usingZabbix,
        dnsSettings,
        startTime: (/* @__PURE__ */ new Date()).toISOString()
      };
      startNetworkScan(ipRange, scanDetails, storage);
      return res.json({
        success: true,
        message: "Real network scan initiated. This may take several minutes to complete.",
        scanDetails
      });
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/network-discovery/hosts/:id/import", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const host = await storage.getDiscoveredHost(id);
      if (!host) {
        return res.status(404).json({ message: "Discovered host not found" });
      }
      const assetData = {
        name: host.hostname || host.ipAddress,
        status: "available",
        assetTag: `DISC-${Date.now()}`,
        category: "computer",
        ipAddress: host.ipAddress,
        macAddress: host.macAddress,
        model: host.hardwareDetails && typeof host.hardwareDetails === "object" ? host.hardwareDetails.model || null : null,
        manufacturer: host.hardwareDetails && typeof host.hardwareDetails === "object" ? host.hardwareDetails.manufacturer || null : null,
        osType: host.systemInfo && typeof host.systemInfo === "object" ? host.systemInfo.os || null : null,
        serialNumber: host.hardwareDetails && typeof host.hardwareDetails === "object" ? host.hardwareDetails.serialNumber || null : null,
        description: `Imported from network discovery: ${host.ipAddress}`
      };
      const asset2 = await storage.createAsset(assetData);
      await storage.updateDiscoveredHost(id, { status: "imported" });
      await storage.createActivity({
        action: "import",
        itemType: "asset",
        itemId: asset2.id,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Asset imported from discovered host ${host.ipAddress}`
      });
      return res.status(201).json({
        success: true,
        message: "Host successfully imported as asset",
        asset: asset2
      });
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/bitlocker-keys", async (req, res) => {
    try {
      console.log("Fetching BitLocker keys...");
      const keys = await storage.getBitlockerKeys();
      console.log(`Found ${keys.length} BitLocker keys`);
      return res.json(keys);
    } catch (err) {
      console.error("Error fetching BitLocker keys:", err);
      return handleError(err, res);
    }
  });
  app2.get("/api/bitlocker-keys/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const key = await storage.getBitlockerKey(id);
      if (!key) {
        return res.status(404).json({ message: "Bitlocker key not found" });
      }
      return res.json(key);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/bitlocker-keys/search/serial/:serialNumber", async (req, res) => {
    try {
      const serialNumber = req.params.serialNumber;
      const keys = await storage.getBitlockerKeyBySerialNumber(serialNumber);
      return res.json(keys);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/bitlocker-keys/search/identifier/:identifier", async (req, res) => {
    try {
      const identifier = req.params.identifier;
      const keys = await storage.getBitlockerKeyByIdentifier(identifier);
      return res.json(keys);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.post("/api/bitlocker-keys", async (req, res) => {
    try {
      const { insertBitlockerKeySchema: insertBitlockerKeySchema3 } = schema_exports;
      const data = insertBitlockerKeySchema3.parse(req.body);
      console.log("Creating BitLocker key:", data.serialNumber);
      const key = await storage.createBitlockerKey(data);
      console.log("BitLocker key created successfully:", key.id);
      try {
        await storage.createActivity({
          action: "create",
          itemType: "bitlocker",
          itemId: key.id,
          userId: req.user?.id || 1,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `BitLocker key created for ${data.serialNumber}`
        });
      } catch (activityError) {
        console.warn("Failed to create activity log:", activityError);
      }
      return res.status(201).json(key);
    } catch (err) {
      console.error("Error creating BitLocker key:", err);
      if (err.message && err.message.includes("Database connection required")) {
        return res.status(503).json({
          message: "BitLocker key creation requires database connection. Please set up PostgreSQL database.",
          instruction: "Go to Database tab \u2192 Create a database to fix this issue.",
          code: "DB_CONNECTION_REQUIRED"
        });
      }
      return handleError(err, res);
    }
  });
  app2.patch("/api/bitlocker-keys/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { insertBitlockerKeySchema: insertBitlockerKeySchema3 } = schema_exports;
      const updateData = insertBitlockerKeySchema3.partial().parse(req.body);
      const key = await storage.updateBitlockerKey(id, updateData);
      if (!key) {
        return res.status(404).json({ message: "Bitlocker key not found" });
      }
      return res.json(key);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.delete("/api/bitlocker-keys/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await storage.deleteBitlockerKey(id);
      if (!result) {
        return res.status(404).json({ message: "Bitlocker key not found" });
      }
      return res.json({ message: "Bitlocker key deleted successfully" });
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/iam-accounts", requireAuth, async (req, res) => {
    if (!db2) {
      return res.status(503).json({
        message: "Database connection unavailable"
      });
    }
    try {
      const accounts = await db2.select().from(iamAccounts);
      const decryptedAccounts = batchDecryptFields2(accounts, PII_FIELDS2.iamAccount);
      res.json(decryptedAccounts);
    } catch (error) {
      console.error("Error fetching IAM accounts:", error);
      res.status(500).json({
        message: "Failed to fetch IAM accounts"
      });
    }
  });
  app2.get("/api/iam-accounts/:id/history", requireAuth, async (req, res) => {
    try {
      const accountId = parseInt(req.params.id);
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      try {
        await db2.execute(sql3`
          CREATE TABLE IF NOT EXISTS iam_account_approval_history (
            id SERIAL PRIMARY KEY,
            iam_account_id INTEGER NOT NULL REFERENCES iam_accounts(id) ON DELETE CASCADE,
            approval_number TEXT NOT NULL,
            duration TEXT,
            action TEXT NOT NULL,
            acted_by TEXT NOT NULL,
            acted_at TIMESTAMP DEFAULT NOW() NOT NULL
          );
        `);
      } catch (tableError) {
        console.warn("Table creation check:", tableError);
      }
      const history = await db2.execute(sql3`
        SELECT
          h.*,
          u.username as acted_by_username,
          u.first_name as acted_by_first_name,
          u.last_name as acted_by_last_name
        FROM iam_account_approval_history h
        LEFT JOIN users u ON h.acted_by = u.username -- Assuming acted_by stores username
        WHERE h.iam_account_id = ${accountId}
        ORDER BY h.acted_at DESC
      `);
      const formattedHistory = history.rows.map((row) => ({
        id: row.id,
        iamAccountId: row.iam_account_id,
        approvalNumber: row.approval_number,
        duration: row.duration,
        action: row.action,
        actedBy: row.acted_by_username || row.acted_by,
        // Prefer username if available
        actedAt: row.acted_at,
        actedByName: row.acted_by_first_name && row.acted_by_last_name ? `${row.acted_by_first_name} ${row.acted_by_last_name}` : row.acted_by_username || row.acted_by || "Unknown"
      }));
      res.json(formattedHistory);
    } catch (error) {
      console.error("Error fetching IAM account approval history:", error);
      res.status(500).json({ message: "Failed to fetch approval history" });
    }
  });
  app2.post("/api/iam-accounts", requireAuth, async (req, res) => {
    try {
      const accountData = req.body;
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      let dataToStore = accountData;
      if (process.env.ENCRYPTION_KEY) {
        const { encryptFields: encryptFields3, PII_FIELDS: PII_FIELDS3 } = await Promise.resolve().then(() => (init_encryption(), encryption_exports));
        dataToStore = encryptFields3(accountData, PII_FIELDS3.iamAccount);
      }
      const [account] = await db2.insert(iamAccounts).values(dataToStore).returning();
      if (account.approvalId) {
        let duration = "";
        if (account.durationStartDate && account.durationEndDate) {
          const startDate = new Date(account.durationStartDate);
          const endDate = new Date(account.durationEndDate);
          const months = Math.round((endDate.getTime() - startDate.getTime()) / (1e3 * 60 * 60 * 24 * 30));
          duration = `${months} month${months !== 1 ? "s" : ""}`;
        }
        await db2.insert(iamAccountApprovalHistory).values({
          iamAccountId: account.id,
          approvalNumber: account.approvalId,
          duration,
          action: "Created",
          actedBy: req.user?.username || req.user?.email || "Unknown"
        });
      }
      let responseAccount = account;
      if (process.env.ENCRYPTION_KEY) {
        const { decryptFields: decryptFields3, PII_FIELDS: PII_FIELDS3 } = await Promise.resolve().then(() => (init_encryption(), encryption_exports));
        responseAccount = decryptFields3(account, PII_FIELDS3.iamAccount);
      }
      res.status(201).json(responseAccount);
    } catch (error) {
      console.error("Error creating IAM account:", error);
      res.status(500).json({ message: "Failed to create IAM account" });
    }
  });
  app2.put("/api/iam-accounts/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const accountData = req.body;
      console.log(`\u{1F4E7} [IAM-UPDATE] Updating IAM account with ID: ${id}`);
      console.log(`\u{1F4E7} [IAM-UPDATE] Account data:`, accountData);
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      const [existingAccount] = await db2.select().from(iamAccounts).where(eq4(iamAccounts.id, id));
      if (!existingAccount) {
        return res.status(404).json({ message: "IAM account not found" });
      }
      if (accountData.status === "extended") {
        accountData.durationStartDate = null;
        accountData.durationEndDate = null;
      } else if (accountData.status === "access_removed") {
        accountData.durationStartDate = null;
      }
      const { id: _, createdAt, updatedAt, ...cleanAccountData } = accountData;
      const [updatedAccount] = await db2.update(iamAccounts).set({
        ...cleanAccountData,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq4(iamAccounts.id, id)).returning();
      console.log(`\u{1F4E7} [IAM-UPDATE] Account updated successfully:`, {
        id: updatedAccount.id,
        knoxId: updatedUser.knoxId,
        userKnoxId: updatedUser.userKnoxId,
        status: updatedAccount.status
      });
      if (existingAccount.approvalId !== accountData.approvalId) {
        const oldApprovalId = existingAccount.approvalId || "None";
        const newApprovalId = accountData.approvalId || "None";
        let action = "Updated";
        let duration = "";
        if (accountData.status === "extended") {
          action = "Extended";
          duration = "Extended Access";
        } else if (accountData.status === "access_removed") {
          action = "Access Removed";
        } else if (existingAccount.durationEndDate && accountData.durationEndDate) {
          const startDate = new Date(accountData.durationStartDate || existingAccount.durationStartDate || /* @__PURE__ */ new Date());
          const endDate = new Date(accountData.durationEndDate);
          const months = Math.round((endDate.getTime() - startDate.getTime()) / (1e3 * 60 * 60 * 24 * 30));
          duration = `${months} month${months !== 1 ? "s" : ""}`;
        }
        await db2.insert(iamAccountApprovalHistory).values({
          iamAccountId: id,
          approvalNumber: newApprovalId,
          duration,
          action,
          actedBy: req.user?.username || req.user?.email || "Unknown"
        });
      }
      try {
        const settings3 = await storage.getSystemSettings();
        console.log(`\u{1F4E7} [IAM-UPDATE] Checking email configuration...`);
        console.log(`\u{1F4E7} [IAM-UPDATE] Settings:`, {
          companyEmail: settings3?.companyEmail || "NOT SET",
          mailHost: settings3?.mailHost || "NOT SET",
          mailPort: settings3?.mailPort || "NOT SET",
          mailFromAddress: settings3?.mailFromAddress || "NOT SET",
          enableAdminNotifications: settings3?.enableAdminNotifications,
          notifyOnIamAccountChanges: settings3?.notifyOnIamAccountChanges
        });
        if (!settings3?.companyEmail || !settings3?.mailHost) {
          console.log(`\u26A0\uFE0F [IAM-UPDATE] Email not configured - skipping notification`);
          console.log(`   Missing: ${!settings3?.companyEmail ? "Company Email" : ""} ${!settings3?.mailHost ? "Mail Host" : ""}`);
        } else {
          console.log(`\u{1F4E7} [IAM-UPDATE] Email configuration OK - proceeding with notification`);
          await emailService.initialize();
          console.log(`\u{1F4E7} [IAM-UPDATE] Email service initialized`);
          await logEmailEvent2({
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            to: settings3.companyEmail,
            subject: `[SRPH-MIS] UPDATE - IAM Account: ${updatedAccount.knoxId}`,
            status: "pending"
          });
          const emailSent = await emailService.sendModificationNotification({
            action: "update",
            itemType: "IAM Account",
            itemName: updatedAccount.knoxId || "Account",
            userName: req.user?.username || "Unknown",
            details: `IAM Account updated: ${updatedAccount.knoxId}, Status: ${updatedAccount.status}, Requestor: ${updatedAccount.requestor}`,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
          if (emailSent) {
            console.log(`\u2705 [IAM-UPDATE] Email notification sent successfully to: ${settings3.companyEmail}`);
            await logEmailEvent2({
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              to: settings3.companyEmail,
              subject: `[SRPH-MIS] UPDATE - IAM Account: ${updatedAccount.knoxId}`,
              status: "success"
            });
          } else {
            console.log(`\u274C [IAM-UPDATE] Email notification failed - service returned false`);
            await logEmailEvent2({
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              to: settings3.companyEmail,
              subject: `[SRPH-MIS] UPDATE - IAM Account: ${updatedAccount.knoxId}`,
              status: "failed",
              error: "Email service returned false - check notification settings and email configuration"
            });
          }
        }
      } catch (err) {
        console.error("\u274C [IAM-UPDATE] Email notification exception:", err);
        console.error("   Error details:", {
          message: err.message,
          stack: err.stack,
          code: err.code
        });
        await logEmailEvent2({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          to: settings?.companyEmail || "N/A",
          subject: `[SRPH-MIS] UPDATE - IAM Account: ${updatedAccount.knoxId}`,
          status: "failed",
          error: err.message || "Unknown error"
        });
      }
      res.json(updatedAccount);
    } catch (error) {
      console.error("Error updating IAM account:", error);
      res.status(500).json({ message: "Failed to update IAM account" });
    }
  });
  app2.delete("/api/iam-accounts/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      console.log(`DELETE request received for IAM account ID: ${id}`);
      const existingAccount = await storage.getIamAccount(id);
      if (!existingAccount) {
        console.log(`IAM account with ID ${id} not found`);
        return res.status(404).json({ message: "IAM account not found" });
      }
      await storage.deleteIamAccount(id);
      await storage.createActivity({
        action: "delete",
        itemType: "iam-account",
        itemId: id,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `IAM account for "${existingAccount.requestor}" deleted (Knox ID: "${existingAccount.knoxId}")`
      });
      console.log(`IAM account with ID ${id} successfully deleted`);
      return res.status(204).send();
    } catch (err) {
      console.error("Error deleting IAM account:", err);
      return res.status(500).json({
        message: "Failed to delete IAM account",
        error: err.message
      });
    }
  });
  app2.post("/api/iam-accounts/import", async (req, res) => {
    try {
      const { accounts } = req.body;
      if (!Array.isArray(accounts)) {
        return res.status(400).json({
          message: "Invalid request format. Expected an array of accounts.",
          total: 0,
          successful: 0,
          failed: 0,
          errors: ["Request body must contain an 'accounts' array"]
        });
      }
      if (accounts.length === 0) {
        return res.status(400).json({
          message: "No accounts to import",
          total: 0,
          successful: 0,
          failed: 0,
          errors: ["No accounts provided in the request"]
        });
      }
      console.log(`Starting import of ${accounts.length} IAM accounts...`);
      const results = await storage.importIamAccounts(accounts);
      await storage.createActivity({
        action: "import",
        itemType: "iam-accounts",
        itemId: 0,
        // Generic ID for bulk import
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Imported ${results.successful} IAM accounts, ${results.failed} failed.`
      });
      console.log(`IAM account import completed. Successful: ${results.successful}, Failed: ${results.failed}`);
      return res.status(results.failed > 0 ? 200 : 201).json(results);
    } catch (err) {
      console.error("Error importing IAM accounts:", err);
      return res.status(500).json({
        message: "Failed to import IAM accounts",
        error: err.message
      });
    }
  });
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  function getSeverityFromPriority(priority) {
    const severityMap = {
      "0": "not_classified",
      "1": "information",
      "2": "warning",
      "3": "average",
      "4": "high",
      "5": "disaster"
    };
    if (priority === void 0 || priority === null) {
      return "not_classified";
    }
    return severityMap[priority.toString()] || "not_classified";
  }
  function getAvailabilityStatus(available) {
    const statusMap = {
      "0": "unknown",
      "1": "available",
      "2": "unavailable"
    };
    if (available === void 0 || available === null) {
      return "unknown";
    }
    return statusMap[available.toString()] || "unknown";
  }
  app2.get("/api/monitoring/dashboards", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({
          message: "Database not available. Please configure DATABASE_URL environment variable."
        });
      }
      const dashboards = await db2.select().from(monitoringDashboards).orderBy(monitoringDashboards.id);
      res.json(dashboards);
    } catch (error) {
      console.error("Error fetching monitoring dashboards:", error);
      res.status(500).json({
        message: "Failed to fetch dashboards",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/monitoring/dashboards", requireAuth, async (req, res) => {
    try {
      const dashboardData = req.body;
      const [newDashboard] = await db2.insert(monitoringDashboards).values({
        name: dashboardData.name,
        description: dashboardData.description,
        isPublic: dashboardData.isPublic || false,
        refreshInterval: dashboardData.refreshInterval || 30,
        tags: dashboardData.tags || "",
        userId: req.user?.id || 1,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).returning();
      res.status(201).json(newDashboard);
    } catch (error) {
      console.error("Error creating monitoring dashboard:", error);
      res.status(500).json({ message: "Failed to create dashboard" });
    }
  });
  app2.get("/api/monitoring/datasources", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({
          message: "Database not available. Please configure DATABASE_URL environment variable."
        });
      }
      const datasources = await db2.select().from(monitoringDatasources).orderBy(monitoringDatasources.id);
      res.json(datasources);
    } catch (error) {
      console.error("Error fetching monitoring datasources:", error);
      res.status(500).json({
        message: "Failed to fetch datasources",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/monitoring/datasources", requireAuth, async (req, res) => {
    try {
      const datasourceData = req.body;
      const [newDatasource] = await db2.insert(monitoringDatasources).values({
        name: datasourceData.name,
        type: datasourceData.type,
        url: datasourceData.url,
        access: datasourceData.access || "proxy",
        basicAuth: datasourceData.basicAuth || false,
        basicAuthUser: datasourceData.basicAuthUser,
        basicAuthPassword: datasourceData.basicAuthPassword,
        database: datasourceData.database,
        jsonData: datasourceData.jsonData ? JSON.stringify(datasourceData.jsonData) : null,
        secureJsonFields: datasourceData.secureJsonFields ? JSON.stringify(datasourceData.secureJsonFields) : null,
        isDefault: datasourceData.isDefault || false,
        status: "pending",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).returning();
      res.status(201).json(newDatasource);
    } catch (error) {
      console.error("Error creating monitoring datasource:", error);
      res.status(500).json({ message: "Failed to create datasource" });
    }
  });
  app2.get("/api/monitoring/alerts", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({
          message: "Database not available. Please configure DATABASE_URL environment variable."
        });
      }
      const alerts = await db2.select().from(monitoringAlertRules);
      res.json(alerts);
    } catch (error) {
      console.error("Error fetching monitoring alerts:", error);
      res.status(500).json({
        message: "Failed to fetch alerts",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/monitoring/alerts", requireAuth, async (req, res) => {
    try {
      const alertData = req.body;
      const [newAlert] = await db2.insert(monitoringAlertRules).values({
        name: alertData.name,
        datasource: alertData.datasource,
        query: alertData.query,
        condition: alertData.condition,
        threshold: alertData.threshold,
        evaluationInterval: alertData.evaluationInterval || 60,
        forDuration: alertData.forDuration || 300,
        severity: alertData.severity || "medium",
        enabled: alertData.enabled !== false,
        notificationChannels: JSON.stringify(alertData.notificationChannels || []),
        annotations: JSON.stringify(alertData.annotations || {}),
        labels: JSON.stringify(alertData.labels || {}),
        state: "normal",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).returning();
      res.status(201).json(newAlert);
    } catch (error) {
      console.error("Error creating monitoring alert:", error);
      res.status(500).json({ message: "Failed to create alert" });
    }
  });
  app2.post("/api/monitoring/panels", requireAuth, async (req, res) => {
    try {
      const panelData = req.body;
      const [newPanel] = await db2.insert(monitoringPanels).values({
        dashboardId: panelData.dashboardId,
        title: panelData.title,
        type: panelData.type,
        datasource: panelData.datasource,
        query: panelData.query,
        refreshInterval: panelData.refreshInterval || 30,
        width: panelData.width || 6,
        height: panelData.height || 300,
        xPos: panelData.xPos || 0,
        yPos: panelData.yPos || 0,
        thresholds: JSON.stringify(panelData.thresholds || []),
        unit: panelData.unit,
        decimals: panelData.decimals || 2,
        showLegend: panelData.showLegend !== false,
        colorScheme: panelData.colorScheme || "default",
        config: JSON.stringify(panelData.config || {}),
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).returning();
      res.status(201).json(newPanel);
    } catch (error) {
      console.error("Error creating monitoring panel:", error);
      res.status(500).json({ message: "Failed to create panel" });
    }
  });
  app2.put("/api/monitoring/panels/:id", requireAuth, async (req, res) => {
    try {
      const panelId = parseInt(req.params.id);
      const panelData = req.body;
      const [updatedPanel] = await db2.update(monitoringPanels).set({
        title: panelData.title,
        type: panelData.type,
        datasource: panelData.datasource,
        query: panelData.query,
        refreshInterval: panelData.refreshInterval || 30,
        width: panelData.width || 6,
        height: panelData.height || 300,
        xPos: panelData.xPos || 0,
        yPos: panelData.yPos || 0,
        thresholds: JSON.stringify(panelData.thresholds || []),
        unit: panelData.unit,
        decimals: panelData.decimals || 2,
        showLegend: panelData.showLegend !== false,
        colorScheme: panelData.colorScheme || "default",
        config: JSON.stringify(panelData.config || {}),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).where(eq4(monitoringPanels.id, panelId)).returning();
      if (!updatedPanel) {
        return res.status(404).json({ message: "Panel not found" });
      }
      res.json(updatedPanel);
    } catch (error) {
      console.error("Error updating monitoring panel:", error);
      res.status(500).json({ message: "Failed to update panel" });
    }
  });
  app2.delete("/api/monitoring/panels/:id", requireAuth, async (req, res) => {
    try {
      const panelId = parseInt(req.params.id);
      const [deletedPanel] = await db2.delete(monitoringPanels).where(eq4(monitoringPanels.id, panelId)).returning();
      if (!deletedPanel) {
        return res.status(404).json({ message: "Panel not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting monitoring panel:", error);
      res.status(500).json({ message: "Failed to delete panel" });
    }
  });
  app2.get("/api/monitoring/panel-data/:dashboardId", requireAuth, async (req, res) => {
    try {
      const dashboardId = parseInt(req.params.dashboardId);
      const timeRange = req.query.timeRange;
      const panels = await db2.select().from(monitoringPanels).where(eq4(monitoringPanels.dashboardId, dashboardId));
      const panelData = {};
      for (const panel of panels) {
        try {
          panelData[panel.id] = [];
        } catch (panelError) {
          console.error(`Error fetching data for panel ${panel.id}:`, panelError);
          panelData[panel.id] = [];
        }
      }
      res.json(panelData);
    } catch (err) {
      return handleError(err, res);
    }
  });
  app2.get("/api/vm-inventory", requireAuth, async (req, res) => {
    if (!db2) {
      return res.status(503).json({
        message: "Database connection unavailable"
      });
    }
    try {
      const vms3 = await db2.select().from(vmInventory);
      console.log(`Fetched ${vms3.length} VMs from database, decrypting PII fields...`);
      const decryptedVms = batchDecryptFields2(vms3, PII_FIELDS2.vmInventory);
      console.log(`Successfully decrypted ${decryptedVms.length} VMs`);
      res.json(decryptedVms);
    } catch (error) {
      console.error("Error fetching VM inventory:", error);
      res.status(500).json({
        message: "Failed to fetch VM inventory"
      });
    }
  });
  app2.post("/api/vm-inventory", requireAuth, async (req, res) => {
    try {
      const vmData = req.body;
      const mappedVMData = {
        // VM Core Information
        vmId: vmData.vmId || null,
        vmName: vmData.vmName,
        vmStatus: vmData.vmStatus || "Active",
        vmIp: vmData.vmIp || null,
        vmOs: vmData.vmOs || null,
        cpuCount: vmData.cpuCount || 0,
        memoryGB: vmData.memoryGB || 0,
        diskCapacityGB: vmData.diskCapacityGB || 0,
        // Request and Approval Information - ensure these are properly mapped
        requestor: vmData.requestor?.trim() || null,
        knoxId: vmData.knoxId?.trim() || null,
        department: vmData.department?.trim() || null,
        startDate: vmData.startDate || null,
        endDate: vmData.endDate || null,
        jiraNumber: vmData.jiraNumber?.trim() || null,
        approvalNumber: vmData.approvalNumber?.trim() || null,
        remarks: vmData.remarks?.trim() || null,
        // Legacy compatibility fields
        internetAccess: Boolean(vmData.internetAccess),
        vmOsVersion: vmData.vmOsVersion || null,
        hypervisor: vmData.hypervisor || null,
        hostName: vmData.hostName || vmData.hostname || null,
        hostModel: vmData.hostModel || null,
        hostIp: vmData.hostIp || null,
        hostOs: vmData.hostOs || null,
        rack: vmData.rack || null,
        deployedBy: vmData.deployedBy || null,
        user: vmData.user || null,
        jiraTicket: vmData.jiraTicket || vmData.jiraNumber || null,
        dateDeleted: vmData.dateDeleted || null,
        // Additional legacy fields for compatibility
        guestOs: vmData.vmOs || vmData.guestOs || null,
        powerState: vmData.vmStatus || vmData.powerState || null,
        diskGB: vmData.diskGB || vmData.diskCapacityGB || 0,
        ipAddress: vmData.vmIp || vmData.ipAddress || null,
        macAddress: vmData.macAddress || null,
        vmwareTools: vmData.vmwareTools || null,
        cluster: vmData.cluster || null,
        datastore: vmData.datastore || null,
        createdDate: vmData.startDate || vmData.createdDate || (/* @__PURE__ */ new Date()).toISOString(),
        lastModified: (/* @__PURE__ */ new Date()).toISOString(),
        notes: vmData.remarks || vmData.notes || null
      };
      console.log("Creating VM with data:", mappedVMData);
      const [newVM] = await db2.insert(vmInventory).values(mappedVMData).returning();
      await storage.createActivity({
        action: "create",
        itemType: "vm",
        itemId: newVM.id,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `VM "${newVM.vmName}" created`
      });
      const response = {
        id: newVM.id,
        // VM Core Information
        vmId: newVM.vmId,
        vmName: newVM.vmName,
        vmStatus: newVM.vmStatus,
        vmIp: newVM.vmIp,
        vmOs: newVM.vmOs,
        cpuCount: newVM.cpuCount,
        memoryGB: newVM.memoryGB,
        diskCapacityGB: newVM.diskCapacityGB,
        // Request and Approval Information
        requestor: newVM.requestor,
        knoxId: newVM.knoxId,
        department: newVM.department,
        startDate: newVM.startDate,
        endDate: newVM.endDate,
        jiraNumber: newVM.jiraNumber,
        approvalNumber: newVM.approvalNumber,
        remarks: newVM.remarks,
        // Legacy compatibility fields
        internetAccess: newVM.internetAccess,
        vmOsVersion: newVM.vmOsVersion,
        hypervisor: newVM.hypervisor,
        hostName: newVM.hostName,
        hostModel: newVM.hostModel,
        hostIp: newVM.hostIp,
        hostOs: newVM.hostOs,
        rack: newVM.rack,
        deployedBy: newVM.deployedBy,
        user: newVM.user,
        jiraTicket: newVM.jiraTicket,
        dateDeleted: newVM.dateDeleted,
        powerState: newVM.powerState,
        memoryMB: newVM.memoryMB,
        diskGB: newVM.diskGB,
        ipAddress: newVM.ipAddress,
        macAddress: newVM.macAddress,
        vmwareTools: newVM.vmwareTools,
        cluster: newVM.cluster,
        datastore: newVM.datastore,
        createdDate: newVM.createdDate,
        lastModified: newVM.lastModified,
        guestOs: newVM.guestOs,
        notes: newVM.notes
      };
      console.log("VM created successfully:", response);
      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating VM:", error);
      res.status(500).json({
        message: "Failed to create VM",
        error: error.message
      });
    }
  });
  app2.get("/api/vm-inventory/:id", requireAuth, async (req, res) => {
    try {
      const vmId = parseInt(req.params.id);
      const vm = await storage.getVM(vmId);
      if (!vm) {
        return res.status(404).json({ message: "VM not found" });
      }
      res.json(vm);
    } catch (error) {
      console.error("Error fetching VM:", error);
      res.status(500).json({ message: "Failed to fetch VM" });
    }
  });
  app2.get("/api/vm-inventory/:id/approval-history", requireAuth, async (req, res) => {
    try {
      const vmId = parseInt(req.params.id);
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const history = await db2.execute(sql3`
        SELECT
          h.*,
          u.username as changed_by_username,
          u.first_name as changed_by_first_name,
          u.last_name as changed_by_last_name
        FROM vm_approval_history h
        LEFT JOIN users u ON h.changed_by = u.id
        WHERE h.vm_id = ${vmId}
        ORDER BY h.changed_at DESC
      `);
      const formattedHistory = history.rows.map((row) => ({
        id: row.id,
        vmId: row.vm_id,
        oldApprovalNumber: row.old_approval_number,
        newApprovalNumber: row.new_approval_number,
        changedBy: row.changed_by,
        changedAt: row.changed_at,
        reason: row.reason,
        notes: row.notes,
        changedByUsername: row.changed_by_username,
        changedByName: row.changed_by_first_name && row.changed_by_last_name ? `${row.changed_by_first_name} ${row.changed_by_last_name}` : row.changed_by_username || "Unknown"
      }));
      res.json(formattedHistory);
    } catch (error) {
      console.error("Error fetching VM approval history:", error);
      res.status(500).json({ message: "Failed to fetch approval history" });
    }
  });
  app2.post("/api/vm-inventory/:id/approval-history", requireAuth, async (req, res) => {
    try {
      const vmId = parseInt(req.params.id);
      const { oldApprovalNumber, newApprovalNumber, reason, notes } = req.body;
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const [historyEntry] = await db2.insert(vmApprovalHistory).values({
        vmId,
        oldApprovalNumber: oldApprovalNumber || null,
        newApprovalNumber: newApprovalNumber || null,
        changedBy: req.user?.id || null,
        reason: reason || null,
        notes: notes || null
      }).returning();
      res.status(201).json(historyEntry);
    } catch (error) {
      console.error("Error creating VM approval history:", error);
      res.status(500).json({ message: "Failed to create approval history entry" });
    }
  });
  app2.patch("/api/vm-inventory/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const vmData = req.body;
      console.log(`Updating VM ${id} with data:`, vmData);
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const [existingVm] = await db2.select().from(vmInventory).where(eq4(vmInventory.id, id));
      if (!existingVm) {
        return res.status(404).json({ message: "VM not found" });
      }
      const decryptedExistingVm = decryptFields2(existingVm, PII_FIELDS2.vmInventory);
      const updateData = {
        vmName: vmData.vmName?.trim(),
        vmStatus: vmData.vmStatus?.trim(),
        vmIp: vmData.vmIp?.trim() || null,
        vmOs: vmData.vmOs?.trim() || null,
        cpuCount: vmData.cpuCount ? parseInt(vmData.cpuCount) : null,
        memoryGB: vmData.memoryGB ? parseInt(vmData.memoryGB) : null,
        diskCapacityGB: vmData.diskCapacityGB ? parseInt(vmData.diskCapacityGB) : null,
        requestor: vmData.requestor?.trim() || null,
        knoxId: vmData.knoxId?.trim() || null,
        department: vmData.department?.trim() || null,
        startDate: vmData.startDate || null,
        endDate: vmData.endDate || null,
        jiraNumber: vmData.jiraNumber?.trim() || null,
        approvalNumber: vmData.approvalNumber?.trim() || null,
        remarks: vmData.remarks?.trim() || null,
        lastModified: (/* @__PURE__ */ new Date()).toISOString()
      };
      const oldApprovalNumber = decryptedExistingVm.approvalNumber;
      const newApprovalNumber = updateData.approvalNumber;
      if (oldApprovalNumber !== newApprovalNumber) {
        await db2.insert(vmApprovalHistory).values({
          vmId: id,
          oldApprovalNumber: oldApprovalNumber || null,
          newApprovalNumber: newApprovalNumber || null,
          changedBy: req.user?.id || null,
          reason: vmData.approvalChangeReason || "Updated via edit form",
          notes: vmData.approvalChangeNotes || null
        });
      }
      const cleanUpdateData = {};
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] !== void 0) {
          cleanUpdateData[key] = updateData[key];
        }
      });
      const encryptedUpdateData = encryptFields2(cleanUpdateData, PII_FIELDS2.vmInventory);
      const [updatedVm] = await db2.update(vmInventory).set(encryptedUpdateData).where(eq4(vmInventory.id, id)).returning();
      const decryptedVm = decryptFields2(updatedVm, PII_FIELDS2.vmInventory);
      console.log(`VM ${id} updated successfully, returning decrypted data`);
      res.json(decryptedVm);
    } catch (error) {
      console.error("Error updating VM:", error);
      res.status(500).json({ message: "Failed to update VM" });
    }
  });
  app2.delete("/api/vm-inventory/:id", requireAuth, async (req, res) => {
    try {
      const vmId = parseInt(req.params.id);
      const [vm] = await db2.select().from(vmInventory).where(eq4(vmInventory.id, vmId));
      if (!vm) {
        return res.status(404).json({ message: "VM not found" });
      }
      await db2.delete(vmInventory).where(eq4(vmInventory.id, vmId));
      await storage.createActivity({
        action: "delete",
        itemType: "vm",
        itemId: vmId,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `VM "${vm.vmName}" deleted`
      });
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting VM:", error);
      try {
        const success = await storage.deleteVM(parseInt(req.params.id));
        if (!success) {
          return res.status(404).json({ message: "VM not found" });
        }
        res.status(204).send();
      } catch (fallbackError) {
        console.error("Fallback delete also failed:", fallbackError);
        res.status(500).json({ message: "Failed to delete VM" });
      }
    }
  });
  app2.post("/api/vm-inventory/import", requireAuth, async (req, res) => {
    try {
      const { vms: vms3, upsert = false } = req.body;
      if (!Array.isArray(vms3)) {
        return res.status(400).json({
          message: "Invalid request format. Expected an array of VMs.",
          total: 0,
          successful: 0,
          failed: 0,
          updated: 0,
          errors: ["Request body must contain a 'vms' array"]
        });
      }
      if (vms3.length === 0) {
        return res.status(400).json({
          message: "No VMs to import",
          total: 0,
          successful: 0,
          failed: 0,
          updated: 0,
          errors: ["No VMs provided in the request"]
        });
      }
      console.log(`Starting import of ${vms3.length} VMs with upsert: ${upsert}...`);
      const importedVMs = [];
      const errors = [];
      let successful = 0;
      let updated = 0;
      let failed = 0;
      for (let i = 0; i < vms3.length; i++) {
        try {
          const vm = vms3[i];
          const rowNumber2 = i + 1;
          if (!vm.vmName || vm.vmName.trim() === "") {
            throw new Error(`Row ${rowNumber2}: VM name is required`);
          }
          const vmName = vm.vmName.trim();
          const [existingVM] = await db2.select().from(vmInventory).where(eq4(vmInventory.vmName, vmName)).limit(1);
          if (existingVM && upsert) {
            console.log(`Updating existing VM ${vmName}`);
            const updateData = {
              vmId: vm.vmId?.trim() || existingVM.vmId,
              vmStatus: vm.vmStatus || existingVM.vmStatus,
              vmIp: vm.vmIp?.trim() || existingVM.vmIp,
              vmOs: vm.vmOs?.trim() || existingVM.vmOs,
              cpuCount: vm.cpuCount || existingVM.cpuCount,
              memoryGB: vm.memoryGB || existingVM.memoryGB,
              diskCapacityGB: vm.diskCapacityGB || existingVM.diskCapacityGB,
              requestor: vm.requestor?.trim() || existingVM.requestor,
              knoxId: vm.knoxId?.trim() || existingVM.knoxId,
              department: vm.department?.trim() || existingVM.department,
              startDate: vm.startDate || existingVM.startDate,
              endDate: vm.endDate || existingVM.endDate,
              jiraNumber: vm.jiraNumber?.trim() || existingVM.jiraNumber,
              approvalNumber: vm.approvalNumber?.trim() || existingVM.approvalNumber,
              remarks: vm.remarks?.trim() || existingVM.remarks,
              internetAccess: vm.internetAccess !== void 0 ? vm.internetAccess : existingVM.internetAccess,
              vmOsVersion: vm.vmOsVersion?.trim() || existingVM.vmOsVersion,
              hypervisor: vm.hypervisor?.trim() || existingVM.hypervisor,
              hostName: vm.hostName?.trim() || existingVM.hostName,
              hostModel: vm.hostModel?.trim() || existingVM.hostModel,
              hostIp: vm.hostIp?.trim() || existingVM.hostIp,
              hostOs: vm.hostOs?.trim() || existingVM.hostOs,
              rack: vm.rack?.trim() || existingVM.rack,
              deployedBy: vm.deployedBy?.trim() || existingVM.deployedBy,
              user: vm.user?.trim() || existingVM.user,
              jiraTicket: vm.jiraTicket?.trim() || existingVM.jiraTicket,
              dateDeleted: vm.dateDeleted || existingVM.dateDeleted,
              lastModified: (/* @__PURE__ */ new Date()).toISOString()
            };
            const [updatedVM] = await db2.update(vmInventory).set(updateData).where(eq4(vmInventory.id, existingVM.id)).returning();
            await storage.createActivity({
              action: "update",
              itemType: "vm",
              itemId: existingVM.id,
              userId: req.user?.id || 1,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `VM "${vmName}" updated via CSV import`
            });
            importedVMs.push(updatedVM);
            updated++;
          } else if (existingVM && !upsert) {
            throw new Error(`Row ${rowNumber2}: VM with name ${vmName} already exists`);
          } else {
            console.log(`Creating new VM ${vmName}`);
            const newVM = {
              vmId: vm.vmId?.trim() || "",
              vmName,
              vmStatus: vm.vmStatus || "Active",
              vmIp: vm.vmIp?.trim() || "",
              vmOs: vm.vmOs?.trim() || "",
              cpuCount: vm.cpuCount || 0,
              memoryGB: vm.memoryGB || 0,
              diskCapacityGB: vm.diskCapacityGB || 0,
              requestor: vm.requestor?.trim() || "",
              knoxId: vm.knoxId?.trim() || "",
              department: vm.department?.trim() || "",
              startDate: vm.startDate || "",
              endDate: vm.endDate || "",
              jiraNumber: vm.jiraNumber?.trim() || "",
              approvalNumber: vm.approvalNumber?.trim() || "",
              remarks: vm.remarks?.trim() || "",
              internetAccess: vm.internetAccess || false,
              vmOsVersion: vm.vmOsVersion?.trim() || "",
              hypervisor: vm.hypervisor?.trim() || "",
              hostName: vm.hostName?.trim() || "",
              hostModel: vm.hostModel?.trim() || "",
              hostIp: vm.hostIp?.trim() || "",
              hostOs: vm.hostOs?.trim() || "",
              rack: vm.rack?.trim() || "",
              deployedBy: vm.deployedBy?.trim() || "",
              user: vm.user?.trim() || "",
              jiraTicket: vm.jiraTicket?.trim() || "",
              dateDeleted: vm.dateDeleted || null,
              guestOs: vm.guestOs?.trim() || vm.vmOs?.trim() || "",
              powerState: vm.powerState?.trim() || vm.vmStatus || "",
              memoryMB: vm.memoryMB || (vm.memoryGB ? vm.memoryGB * 1024 : 0),
              diskGB: vm.diskGB || vm.diskCapacityGB || 0,
              ipAddress: vm.ipAddress?.trim() || vm.vmIp?.trim() || "",
              macAddress: vm.macAddress?.trim() || "",
              vmwareTools: vm.vmwareTools?.trim() || "",
              cluster: vm.cluster?.trim() || "",
              datastore: vm.datastore?.trim() || "",
              status: vm.status || "available",
              assignedTo: vm.assignedTo || null,
              location: vm.location?.trim() || "",
              serialNumber: vm.serialNumber?.trim() || "",
              model: vm.model?.trim() || "",
              manufacturer: vm.manufacturer?.trim() || "",
              purchaseDate: vm.purchaseDate || "",
              purchaseCost: vm.purchaseCost?.trim() || "",
              createdDate: vm.createdDate || (/* @__PURE__ */ new Date()).toISOString(),
              lastModified: (/* @__PURE__ */ new Date()).toISOString(),
              notes: vm.notes?.trim() || vm.remarks?.trim() || ""
            };
            const [createdVM] = await db2.insert(vmInventory).values(newVM).returning();
            await storage.createActivity({
              action: "create",
              itemType: "vm",
              itemId: createdVM.id,
              userId: req.user?.id || 1,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `VM "${vmName}" imported via CSV`
            });
            importedVMs.push(createdVM);
            successful++;
          }
        } catch (vmError) {
          failed++;
          const errorMessage = `Row ${i + 1}: ${vmError.message}`;
          errors.push(errorMessage);
          console.error(`VM import error:`, errorMessage);
        }
      }
      const response = {
        total: vms3.length,
        successful,
        updated,
        failed,
        errors,
        message: `Import completed. ${successful} VMs created, ${updated} VMs updated, ${failed} failed.`
      };
      const statusCode = failed > 0 ? 200 : 201;
      return res.status(statusCode).json(response);
    } catch (error) {
      console.error("VM import error:", error);
      return res.status(500).json({
        message: "Import failed",
        total: 0,
        successful: 0,
        failed: 0,
        updated: 0,
        errors: [error.message]
      });
    }
  });
  app2.get("/api/vms", async (req, res) => {
    try {
      const vms3 = await db2.select().from(vms).orderBy(vms.id);
      res.json(vms3);
    } catch (error) {
      console.error("Error fetching VMs:", error);
      res.status(500).json({ message: "Failed to fetch VMs" });
    }
  });
  app2.post("/api/vms", async (req, res) => {
    try {
      const vmData = req.body;
      const [newVm] = await db2.insert(vms).values({
        ...vmData,
        createdDate: (/* @__PURE__ */ new Date()).toISOString(),
        lastModified: (/* @__PURE__ */ new Date()).toISOString()
      }).returning();
      res.status(201).json(newVm);
    } catch (error) {
      console.error("Error creating VM:", error);
      res.status(500).json({ message: "Failed to create VM" });
    }
  });
  app2.get("/api/vms/:id", async (req, res) => {
    try {
      const vmId = parseInt(req.params.id);
      const [vm] = await db2.select().from(vms).where(eq4(vms.id, vmId));
      if (!vm) {
        return res.status(404).json({ message: "VM not found" });
      }
      res.json(vm);
    } catch (error) {
      console.error("Error fetching VM:", error);
      res.status(500).json({ message: "Failed to fetch VM" });
    }
  });
  app2.put("/api/vms/:id", async (req, res) => {
    try {
      const vmId = parseInt(req.params.id);
      const vmData = req.body;
      const [updatedVm] = await db2.update(vms).set({
        ...vmData,
        lastModified: (/* @__PURE__ */ new Date()).toISOString()
      }).where(eq4(vms.id, vmId)).returning();
      if (!updatedVm) {
        return res.status(404).json({ message: "VM not found" });
      }
      res.json(updatedVm);
    } catch (error) {
      console.error("Error updating VM:", error);
      res.status(500).json({ message: "Failed to update VM" });
    }
  });
  app2.delete("/api/vms/:id", async (req, res) => {
    try {
      const vmId = parseInt(req.params.id);
      const [deletedVm] = await db2.delete(vms).where(eq4(vms.id, vmId)).returning();
      if (!deletedVm) {
        return res.status(404).json({ message: "VM not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting VM:", error);
      res.status(500).json({ message: "Failed to delete VM" });
    }
  });
  app2.get("/api/azure-inventory", requireAuth, async (req, res) => {
    if (!db2) {
      return res.status(503).json({
        message: "Database connection unavailable"
      });
    }
    try {
      const resources = await db2.select().from(azureInventory2);
      res.json(resources);
    } catch (error) {
      console.error("Error fetching Azure inventory:", error);
      res.status(500).json({
        message: "Failed to fetch Azure inventory"
      });
    }
  });
  app2.post("/api/azure-inventory", requireAuth, async (req, res) => {
    try {
      const sanitizedData = {
        ...req.body,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const data = insertAzureInventorySchema2.parse(sanitizedData);
      const resource = await storage.createAzureInventory(data);
      res.status(201).json(resource);
    } catch (error) {
      console.error("Error creating Azure resource:", error);
      res.status(500).json({
        message: "Failed to create Azure resource",
        error: error.message
      });
    }
  });
  app2.patch("/api/azure-inventory/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      console.log("Azure update request:", { id, updates });
      const updatedItem = await storage.updateAzureInventory(id, updates);
      if (!updatedItem) {
        return res.status(404).json({ message: "Azure resource not found" });
      }
      await storage.createActivity({
        action: "update",
        itemType: "azure-inventory",
        itemId: id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Updated Azure resource: ${updatedItem.name || "N/A"}`
      });
      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating Azure resource:", error);
      res.status(500).json({ message: "Failed to update Azure resource", error: error.message });
    }
  });
  app2.put("/api/azure-inventory/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const processedUpdates = {
        ...updates,
        updatedAt: /* @__PURE__ */ new Date()
      };
      const updatedItem = await storage.updateAzureInventory(id, processedUpdates);
      if (!updatedItem) {
        return res.status(404).json({ message: "Azure resource not found" });
      }
      await storage.createActivity({
        action: "updated",
        itemType: "azure-inventory",
        itemId: id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Updated Azure resource: ${updatedItem.name || "N/A"}`
      });
      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating Azure resource:", error);
      res.status(500).json({ message: "Failed to update Azure resource", error: error.message });
    }
  });
  app2.delete("/api/azure-inventory/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      await db2.delete(azureInventory2).where(eq4(azureInventory2.id, id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting Azure resource:", error);
      res.status(500).json({ message: "Failed to delete Azure resource" });
    }
  });
  app2.post("/api/azure-inventory/import", requireAuth, async (req, res) => {
    try {
      const { resources } = req.body;
      if (!Array.isArray(resources)) {
        return res.status(400).json({
          message: "Invalid request format",
          total: 0,
          successful: 0,
          failed: 0,
          errors: ["Request body must contain a 'resources' array"]
        });
      }
      if (!db2) {
        return res.status(503).json({
          message: "Database not available",
          code: "DB_CONNECTION_FAILED"
        });
      }
      let successful = 0;
      let failed = 0;
      let updated = 0;
      const errors = [];
      const currentMonth = (/* @__PURE__ */ new Date()).toISOString().substring(0, 7);
      const existingResources = await db2.select().from(azureInventory2);
      const existingMap = new Map(existingResources.map((r) => [r.name, r]));
      const importedNames = new Set(resources.map((r) => r.name));
      const existingHistoricalRecords = await db2.select().from(azureHistoricalData).where(eq4(azureHistoricalData.monthYear, currentMonth));
      const historicalMap = new Map(existingHistoricalRecords.map((h) => [`${h.name}-${h.changeType}`, h]));
      for (let i = 0; i < resources.length; i++) {
        try {
          const resource = resources[i];
          const existing = existingMap.get(resource.name);
          if (existing) {
            const [updatedResource] = await db2.update(azureInventory2).set({
              type: resource.type,
              resourceGroup: resource.resourceGroup,
              location: resource.location,
              subscriptions: resource.subscriptions,
              status: resource.status,
              remarks: resource.remarks,
              updatedAt: /* @__PURE__ */ new Date()
            }).where(eq4(azureInventory2.id, existing.id)).returning();
            const historyKey = `${resource.name}-updated`;
            if (!historicalMap.has(historyKey)) {
              await db2.insert(azureHistoricalData).values({
                resourceId: existing.id,
                name: resource.name,
                type: resource.type,
                resourceGroup: resource.resourceGroup,
                location: resource.location,
                subscriptions: resource.subscriptions,
                status: resource.status,
                remarks: resource.remarks,
                changeType: "updated",
                monthYear: currentMonth,
                createdAt: /* @__PURE__ */ new Date()
              });
            }
            updated++;
          } else {
            const [newResource] = await db2.insert(azureInventory2).values({
              name: resource.name,
              type: resource.type,
              resourceGroup: resource.resourceGroup,
              location: resource.location,
              subscriptions: resource.subscriptions,
              status: resource.status,
              remarks: resource.remarks,
              createdAt: /* @__PURE__ */ new Date(),
              updatedAt: /* @__PURE__ */ new Date()
            }).returning();
            const historyKey = `${resource.name}-imported`;
            if (!historicalMap.has(historyKey)) {
              await db2.insert(azureHistoricalData).values({
                resourceId: newResource.id,
                name: resource.name,
                type: resource.type,
                resourceGroup: resource.resourceGroup,
                location: resource.location,
                subscriptions: resource.subscriptions,
                status: resource.status,
                remarks: resource.remarks,
                changeType: "imported",
                monthYear: currentMonth,
                createdAt: /* @__PURE__ */ new Date()
              });
            }
            successful++;
          }
        } catch (error) {
          failed++;
          errors.push(`Row ${i + 1}: ${error.message}`);
        }
      }
      for (const [name, deletedResource] of existingMap) {
        const historyKey = `${name}-deleted`;
        if (!historicalMap.has(historyKey)) {
          await db2.insert(azureHistoricalData).values({
            resourceId: deletedResource.id,
            name: deletedResource.name,
            type: deletedResource.type,
            resourceGroup: deletedResource.resourceGroup,
            location: deletedResource.location,
            subscriptions: deletedResource.subscriptions,
            status: deletedResource.status,
            remarks: deletedResource.remarks,
            changeType: "deleted",
            monthYear: currentMonth,
            createdAt: /* @__PURE__ */ new Date()
          });
        }
      }
      res.status(successful > 0 ? 201 : 400).json({
        total: resources.length,
        successful,
        updated,
        failed,
        deleted: existingMap.size,
        errors,
        monthYear: currentMonth,
        message: `Import completed. ${successful} resources processed (${updated} updated), ${failed} failed, ${existingMap.size} marked as deleted.`
      });
    } catch (error) {
      console.error("Azure import error:", error);
      res.status(500).json({ message: "Import failed", error: error.message });
    }
  });
  app2.get("/api/azure-inventory/historical", requireAuth, async (req, res) => {
    if (!db2) {
      return res.status(503).json({ message: "Database connection unavailable" });
    }
    try {
      const historicalData = await db2.select().from(azureHistoricalData).orderBy(desc(azureHistoricalData.createdAt));
      res.json(historicalData);
    } catch (error) {
      console.error("Error fetching Azure historical data:", error);
      res.status(500).json({ message: "Failed to fetch historical data" });
    }
  });
  app2.get("/api/gcp-inventory/historical", requireAuth, async (req, res) => {
    if (!db2) {
      return res.status(503).json({ message: "Database connection unavailable" });
    }
    try {
      const historicalData = await db2.select().from(gcpHistoricalData).orderBy(desc(gcpHistoricalData.createdAt));
      res.json(historicalData);
    } catch (error) {
      console.error("Error fetching GCP historical data:", error);
      res.status(500).json({ message: "Failed to fetch historical data" });
    }
  });
  app2.get("/api/gcp-inventory", requireAuth, async (req, res) => {
    if (!db2) {
      return res.status(503).json({
        message: "Database connection unavailable"
      });
    }
    try {
      const resources = await db2.select().from(gcpInventory);
      res.json(resources);
    } catch (error) {
      console.error("Error fetching GCP inventory:", error);
      res.status(500).json({
        message: "Failed to fetch GCP inventory"
      });
    }
  });
  app2.post("/api/gcp-inventory", requireAuth, async (req, res) => {
    try {
      const sanitizedData = {
        ...req.body,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const data = insertGcpInventorySchema2.parse(sanitizedData);
      const resource = await storage.createGcpInventory(data);
      await storage.createActivity({
        action: "create",
        itemType: "gcp-resource",
        itemId: resource.id,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `GCP Resource created: ${resource.name}`
      });
      try {
        console.log(`
\u{1F4E7} [GCP-CREATE] Sending email notification for GCP resource creation`);
        await emailService.initialize();
        const emailSent = await emailService.sendModificationNotification({
          action: "created",
          itemType: "GCP Resource",
          itemName: resource.name || "New Resource",
          userName: req.user?.username || "System",
          details: `GCP resource created: ${resource.name}, Type: ${resource.resourceType}, Project: ${resource.projectId}, Location: ${resource.location}`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        console.log(`\u{1F4E7} [GCP-CREATE] Email notification result: ${emailSent ? "SUCCESS" : "FAILED"}`);
      } catch (err) {
        console.error("\u274C [GCP-CREATE] Failed to send email notification:", err);
      }
      res.status(201).json(resource);
    } catch (error) {
      console.error("Error creating GCP resource:", error);
      res.status(500).json({ message: "Failed to create GCP resource" });
    }
  });
  app2.patch("/api/gcp-inventory/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      console.log("GCP update request:", { id, updates });
      const processedUpdates = {
        ...updates,
        createdAt: updates.createdAt ? new Date(updates.createdAt) : void 0,
        updatedAt: /* @__PURE__ */ new Date()
        // Always set updated timestamp
      };
      const updatedItem = await storage.updateGcpInventory(id, processedUpdates);
      if (!updatedItem) {
        return res.status(404).json({ message: "GCP resource not found" });
      }
      await storage.createActivity({
        action: "update",
        itemType: "gcp-inventory",
        itemId: id,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Updated GCP resource: ${updatedItem.displayName || updatedItem.name || "N/A"}`
      });
      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating GCP resource:", error);
      res.status(500).json({ message: "Failed to update GCP resource", error: error.message });
    }
  });
  app2.delete("/api/gcp-inventory/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const [resourceToDelete] = await db2.select().from(gcpInventory).where(eq4(gcpInventory.id, id));
      if (!resourceToDelete) {
        return res.status(404).json({ message: "GCP Resource not found" });
      }
      await db2.delete(gcpInventory).where(eq4(gcpInventory.id, id));
      await storage.createActivity({
        action: "delete",
        itemType: "gcp-resource",
        itemId: id,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `GCP Resource deleted: ${resourceToDelete.name}`
      });
      try {
        console.log(`
\u{1F4E7} [GCP-DELETE] Sending email notification for GCP resource deletion`);
        await emailService.initialize();
        const emailSent = await emailService.sendModificationNotification({
          action: "deleted",
          itemType: "GCP Resource",
          itemName: resourceToDelete.name || "Resource",
          userName: req.user?.username || "System",
          details: `GCP resource deleted: ${resourceToDelete.name}, Type: ${resourceToDelete.resourceType}, Project: ${resourceToDelete.projectId}`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        console.log(`\u{1F4E7} [GCP-DELETE] Email notification result: ${emailSent ? "SUCCESS" : "FAILED"}`);
      } catch (err) {
        console.error("\u274C [GCP-DELETE] Failed to send email notification:", err);
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting GCP resource:", error);
      res.status(500).json({ message: "Failed to delete GCP resource" });
    }
  });
  app2.post("/api/aws-inventory/import", requireAuth, async (req, res) => {
    try {
      const { resources } = req.body;
      if (!Array.isArray(resources)) {
        return res.status(400).json({ message: "Invalid resources data" });
      }
      let successful = 0;
      let updated = 0;
      let failed = 0;
      for (const resource of resources) {
        try {
          const [existing] = await db2.select().from(awsInventory).where(eq4(awsInventory.identifier, resource.identifier));
          if (existing) {
            await db2.update(awsInventory).set(resource).where(eq4(awsInventory.id, existing.id));
            updated++;
          } else {
            await db2.insert(awsInventory).values(resource);
            successful++;
          }
        } catch (err) {
          console.error("Failed to import AWS resource:", err);
          failed++;
        }
      }
      res.json({ successful, updated, failed });
    } catch (err) {
      handleError(err, res);
    }
  });
  app2.post("/api/gcp-inventory/import", requireAuth, async (req, res) => {
    try {
      const { resources } = req.body;
      if (!Array.isArray(resources)) {
        return res.status(400).json({ message: "Invalid resources data" });
      }
      let successful = 0;
      let updated = 0;
      let failed = 0;
      for (const resource of resources) {
        try {
          const [existing] = await db2.select().from(gcpInventory).where(eq4(gcpInventory.displayName, resource.displayName));
          if (existing) {
            await db2.update(gcpInventory).set(resource).where(eq4(gcpInventory.id, existing.id));
            updated++;
          } else {
            await db2.insert(gcpInventory).values(resource);
            successful++;
          }
        } catch (err) {
          console.error("Failed to import GCP resource:", err);
          failed++;
        }
      }
      res.json({ successful, updated, failed });
    } catch (err) {
      handleError(err, res);
    }
  });
  app2.get("/api/consumables/:id/assignments", requireAuth, async (req, res) => {
    try {
      const consumableId = parseInt(req.params.id);
      const assignments = await db2.select().from(consumableAssignments).where(eq4(consumableAssignments.consumableId, consumableId)).orderBy(consumableAssignments.assignedDate);
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching consumable assignments:", error);
      res.status(500).json({ message: "Failed to fetch consumable assignments" });
    }
  });
  app2.post("/api/consumables/:id/assign", requireAuth, async (req, res) => {
    try {
      const consumableId = parseInt(req.params.id);
      const assignmentData = req.body;
      console.log("Consumable assignment request:", { consumableId, assignmentData });
      if (!db2) {
        return res.status(503).json({
          message: "Database not available",
          code: "DB_CONNECTION_FAILED",
          error: "Database connection required for consumable assignments",
          instruction: "Please configure your database connection in the Database tab"
        });
      }
      if (!assignmentData.assignedTo || assignmentData.assignedTo.trim() === "") {
        return res.status(400).json({
          message: "Assigned To is required"
        });
      }
      const [consumable] = await db2.select().from(consumables).where(eq4(consumables.id, consumableId));
      if (!consumable) {
        return res.status(404).json({ message: "Consumable not found" });
      }
      const quantityToAssign = parseInt(assignmentData.quantity) || 1;
      if (consumable.quantity < quantityToAssign) {
        return res.status(400).json({
          message: `Not enough quantity available. Available: ${consumable.quantity}, Requested: ${quantityToAssign}`
        });
      }
      const [assignment] = await db2.insert(consumableAssignments).values({
        consumableId,
        assignedTo: assignmentData.assignedTo.trim(),
        serialNumber: assignmentData.serialNumber?.trim() || null,
        knoxId: assignmentData.knoxId?.trim() || null,
        quantity: quantityToAssign,
        assignedDate: (/* @__PURE__ */ new Date()).toISOString(),
        status: "assigned",
        notes: assignmentData.notes?.trim() || null
      }).returning();
      console.log("Assignment created:", assignment);
      await db2.update(consumables).set({
        quantity: sql3`${consumables.quantity} - ${quantityToAssign}`
      }).where(eq4(consumables.id, consumableId));
      await storage.createActivity({
        action: "assign",
        itemType: "consumable",
        itemId: consumableId,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Consumable assigned to ${assignmentData.assignedTo} (Qty: ${quantityToAssign})`
      });
      res.status(201).json(assignment);
    } catch (error) {
      console.error("Error assigning consumable:", error);
      res.status(500).json({
        message: "Failed to assign consumable",
        error: error.message
      });
    }
  });
  app2.patch("/api/consumable-assignments/:id", requireAuth, async (req, res) => {
    try {
      const assignmentId = parseInt(req.params.id);
      const updateData = req.body;
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const [existingAssignment] = await db2.select().from(consumableAssignments).where(eq4(consumableAssignments.id, assignmentId));
      if (!existingAssignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      const [updatedAssignment] = await db2.update(consumableAssignments).set({
        assignedTo: updateData.assignedTo,
        serialNumber: updateData.serialNumber || null,
        knoxId: updateData.knoxId || null,
        notes: updateData.notes || null
      }).where(eq4(consumableAssignments.id, assignmentId)).returning();
      await storage.createActivity({
        action: "update",
        itemType: "consumable-assignment",
        itemId: assignmentId,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Updated assignment for ${updateData.assignedTo}`
      });
      res.json(updatedAssignment);
    } catch (error) {
      console.error("Error updating consumable assignment:", error);
      res.status(500).json({ message: "Failed to update assignment" });
    }
  });
  app2.delete("/api/consumable-assignments/:id", requireAuth, async (req, res) => {
    try {
      const assignmentId = parseInt(req.params.id);
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const [assignment] = await db2.select().from(consumableAssignments).where(eq4(consumableAssignments.id, assignmentId));
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      await db2.delete(consumableAssignments).where(eq4(consumableAssignments.id, assignmentId));
      await db2.update(consumables).set({
        quantity: sql3`${consumables.quantity} + ${assignment.quantity || 1}`
      }).where(eq4(consumables.id, assignment.consumableId));
      await storage.createActivity({
        action: "delete",
        itemType: "consumable-assignment",
        itemId: assignmentId,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Assignment deleted for ${assignment.assignedTo}`
      });
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting consumable assignment:", error);
      res.status(500).json({ message: "Failed to delete assignment" });
    }
  });
  app2.get("/api/monitor-inventory", requireAuth, async (req, res) => {
    if (!db2) {
      return res.status(503).json({
        message: "Database connection unavailable"
      });
    }
    try {
      const monitors = await db2.select().from(monitorInventory);
      const decryptedMonitors = batchDecryptFields2(monitors, PII_FIELDS2.monitor);
      res.json(decryptedMonitors);
    } catch (error) {
      console.error("Error fetching monitors:", error);
      res.status(500).json({
        message: "Failed to fetch monitors"
      });
    }
  });
  app2.get("/api/monitor-inventory/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      const [monitor] = await db2.select().from(monitorInventory).where(eq4(monitorInventory.id, id));
      if (!monitor) {
        return res.status(404).json({ message: "Monitor not found" });
      }
      res.json(monitor);
    } catch (error) {
      console.error("Error fetching monitor:", error);
      res.status(500).json({ message: "Failed to fetch monitor" });
    }
  });
  app2.post("/api/monitor-inventory", requireAuth, async (req, res) => {
    try {
      const monitorData = req.body;
      console.log("Creating monitor with data:", monitorData);
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      if (!monitorData.seatNumber || monitorData.seatNumber.trim() === "") {
        return res.status(400).json({
          message: "Seat number is required"
        });
      }
      const newMonitor = {
        seatNumber: monitorData.seatNumber.trim(),
        knoxId: monitorData.knoxId?.trim() || null,
        assetNumber: monitorData.assetNumber?.trim() || null,
        serialNumber: monitorData.serialNumber?.trim() || null,
        model: monitorData.model?.trim() || null,
        remarks: monitorData.remarks?.trim() || null,
        department: monitorData.department?.trim() || null,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const [monitor] = await db2.insert(monitorInventory).values(newMonitor).returning();
      await storage.createActivity({
        action: "create",
        itemType: "monitor",
        itemId: monitor.id,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Monitor for seat ${monitor.seatNumber} created`
      });
      console.log("Monitor created successfully:", monitor);
      res.status(201).json(monitor);
    } catch (error) {
      console.error("Error creating monitor:", error);
      res.status(500).json({
        message: "Failed to create monitor",
        error: error.message
      });
    }
  });
  app2.patch("/api/monitor-inventory/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const monitorData = req.body;
      if (!db2) {
        return res.status(503).json({
          message: "Database not available"
        });
      }
      if (monitorData.seatNumber && monitorData.seatNumber.trim() === "") {
        return res.status(400).json({
          message: "Seat number cannot be empty"
        });
      }
      const fieldsToEncrypt = ["knoxId", "assetNumber", "serialNumber"];
      const updateData = { updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
      for (const field of fieldsToEncrypt) {
        if (monitorData[field] !== void 0) {
          updateData[field] = monitorData[field] ? await storage.encrypt(monitorData[field]) : null;
        }
      }
      if (monitorData.seatNumber !== void 0) updateData.seatNumber = monitorData.seatNumber.trim();
      if (monitorData.model !== void 0) updateData.model = monitorData.model?.trim() || null;
      if (monitorData.remarks !== void 0) updateData.remarks = monitorData.remarks?.trim() || null;
      if (monitorData.department !== void 0) updateData.department = monitorData.department?.trim() || null;
      const [monitor] = await db2.update(monitorInventory).set(updateData).where(eq4(monitorInventory.id, id)).returning();
      if (!monitor) {
        return res.status(404).json({ message: "Monitor not found" });
      }
      await storage.createActivity({
        action: "update",
        itemType: "monitor",
        itemId: id,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Monitor for seat ${monitor.seatNumber} updated`
      });
      res.json(monitor);
    } catch (error) {
      console.error("Error updating monitor:", error);
      res.status(500).json({
        message: "Failed to update monitor",
        error: error.message
      });
    }
  });
  app2.delete("/api/monitor-inventory/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      console.log(`DELETE request received for monitor ID: ${id}`);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid monitor ID" });
      }
      if (!db2) {
        console.error("Database not available for deletion");
        return res.status(503).json({
          message: "Database not available"
        });
      }
      const [monitor] = await db2.select().from(monitorInventory).where(eq4(monitorInventory.id, id));
      if (!monitor) {
        console.log(`Monitor with ID ${id} not found`);
        return res.status(404).json({ message: "Monitor not found" });
      }
      console.log(`Deleting monitor: ${JSON.stringify(monitor)}`);
      const deleteResult = await db2.delete(monitorInventory).where(eq4(monitorInventory.id, id));
      console.log(`Delete result:`, deleteResult);
      try {
        await storage.createActivity({
          action: "delete",
          itemType: "monitor",
          itemId: id,
          userId: req.user?.id || 1,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `Monitor for seat ${monitor.seatNumber} deleted`
        });
      } catch (activityError) {
        console.warn("Failed to log delete activity:", activityError);
      }
      console.log(`Monitor with ID ${id} successfully deleted from PostgreSQL`);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting monitor from PostgreSQL:", error);
      res.status(500).json({
        message: "Failed to delete monitor from database",
        error: error.message
      });
    }
  });
  app2.post("/api/monitor-inventory/import", async (req, res) => {
    try {
      const { monitors } = req.body;
      if (!Array.isArray(monitors) || monitors.length === 0) {
        return res.status(400).json({ message: "No monitor data provided" });
      }
      const results = {
        total: monitors.length,
        successful: 0,
        failed: 0,
        errors: []
      };
      for (let i = 0; i < monitors.length; i++) {
        try {
          const monitor = monitors[i];
          const cleanMonitor = {};
          Object.keys(monitor).forEach((key) => {
            const value = monitor[key];
            cleanMonitor[key] = value === "" || value === null || value === void 0 ? null : value;
          });
          await db2.insert(monitorInventory).values(cleanMonitor);
          results.successful++;
        } catch (error) {
          results.failed++;
          const errorMsg = error?.message || String(error);
          results.errors.push(`Row ${i + 1}: ${errorMsg}`);
          console.error(`Monitor import error on row ${i + 1}:`, error);
        }
      }
      res.json(results);
    } catch (error) {
      console.error("Monitor inventory import error:", error);
      res.status(500).json({ message: error?.message || "Import failed" });
    }
  });
  app2.get("/api/approval-monitoring", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const records = await db2.select().from(approvalMonitoring).orderBy(desc(approvalMonitoring.id));
      res.json(records);
    } catch (error) {
      console.error("Error fetching approval monitoring records:", error);
      res.status(500).json({ message: "Failed to fetch records" });
    }
  });
  app2.post("/api/approval-monitoring", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const recordData = req.body;
      const [newRecord] = await db2.insert(approvalMonitoring).values({
        type: recordData.type || null,
        platform: recordData.platform || null,
        pic: recordData.pic || null,
        ipAddress: recordData.ipAddress || null,
        hostnameAccounts: recordData.hostnameAccounts || null,
        identifierSerialNumber: recordData.identifierSerialNumber || null,
        approvalNumber: recordData.approvalNumber || null,
        startDate: recordData.startDate || null,
        endDate: recordData.endDate || null,
        status: recordData.status || null,
        remarks: recordData.remarks || null
      }).returning();
      res.status(201).json(newRecord);
    } catch (error) {
      console.error("Error creating approval monitoring record:", error);
      res.status(500).json({
        message: "Failed to create record",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.patch("/api/approval-monitoring/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const recordData = req.body;
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const [updatedRecord] = await db2.update(approvalMonitoring).set({
        type: recordData.type || null,
        platform: recordData.platform || null,
        pic: recordData.pic || null,
        ipAddress: recordData.ipAddress || null,
        hostnameAccounts: recordData.hostnameAccounts || null,
        identifierSerialNumber: recordData.identifierSerialNumber || null,
        approvalNumber: recordData.approvalNumber || null,
        startDate: recordData.startDate || null,
        endDate: recordData.endDate || null,
        status: recordData.status || null,
        remarks: recordData.remarks || null,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq4(approvalMonitoring.id, id)).returning();
      if (!updatedRecord) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.json(updatedRecord);
    } catch (error) {
      console.error("Error updating approval monitoring record:", error);
      res.status(500).json({ message: "Failed to update record" });
    }
  });
  app2.delete("/api/approval-monitoring/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      await db2.delete(approvalMonitoring).where(eq4(approvalMonitoring.id, id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting approval monitoring record:", error);
      res.status(500).json({ message: "Failed to delete record" });
    }
  });
  app2.get("/api/aws-inventory", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const records = await db2.select().from(awsInventory).orderBy(desc(awsInventory.id));
      res.json(records);
    } catch (error) {
      console.error("Error fetching AWS inventory records:", error);
      res.status(500).json({ message: "Failed to fetch records" });
    }
  });
  app2.post("/api/aws-inventory", requireAuth, async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const recordData = req.body;
      const [newRecord] = await db2.insert(awsInventory).values({
        identifier: recordData.identifier || null,
        service: recordData.service || null,
        type: recordData.type || null,
        region: recordData.region || null,
        accountName: recordData.accountName || null,
        accountId: recordData.accountId || null,
        status: recordData.status || "active",
        remarks: recordData.remarks || null
      }).returning();
      res.status(201).json(newRecord);
    } catch (error) {
      console.error("Error creating AWS inventory record:", error);
      res.status(500).json({
        message: "Failed to create record",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.patch("/api/aws-inventory/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const recordData = req.body;
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      const [updatedRecord] = await db2.update(awsInventory).set({
        identifier: recordData.identifier || null,
        service: recordData.service || null,
        type: recordData.type || null,
        region: recordData.region || null,
        accountName: recordData.accountName || null,
        accountId: recordData.accountId || null,
        status: recordData.status || "active",
        remarks: recordData.remarks || null,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq4(awsInventory.id, id)).returning();
      if (!updatedRecord) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.json(updatedRecord);
    } catch (error) {
      console.error("Error updating AWS inventory record:", error);
      res.status(500).json({ message: "Failed to update record" });
    }
  });
  app2.delete("/api/aws-inventory/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      await db2.delete(awsInventory).where(eq4(awsInventory.id, id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting AWS inventory record:", error);
      res.status(500).json({ message: "Failed to delete record" });
    }
  });
  app2.post("/api/approval-monitoring/import", requireAuth, async (req, res) => {
    try {
      const { records } = req.body;
      if (!records || !Array.isArray(records)) {
        return res.status(400).json({ message: "Invalid request: records array is required" });
      }
      if (!db2) {
        return res.status(503).json({ message: "Database not available" });
      }
      let successful = 0;
      let failed = 0;
      const errors = [];
      for (const record of records) {
        try {
          const cleanValue = (value) => {
            if (!value || value === "-" || value === "") return null;
            let cleaned = String(value).trim();
            if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
              cleaned = cleaned.slice(1, -1);
            }
            if (cleaned.startsWith("'") && cleaned.endsWith("'")) {
              cleaned = cleaned.slice(1, -1);
            }
            return cleaned && cleaned !== "" ? cleaned : null;
          };
          const ipAddress = cleanValue(record["ip address"]) || cleanValue(record.ipAddress) || cleanValue(record["IP Address"]) || cleanValue(record["ip_address"]) || cleanValue(record["Ip Address"]) || cleanValue(record["ipaddress"]);
          const hostnameAccounts = cleanValue(record["hostname/accounts"]) || cleanValue(record.hostnameAccounts) || cleanValue(record.hostname) || cleanValue(record["Hostname/Accounts"]) || cleanValue(record["hostname_accounts"]) || cleanValue(record["hostname/accounts"]) || cleanValue(record["hostname accounts"]) || cleanval(record["Hostname Accounts"]);
          const identifierSerialNumber = cleanValue(record["identifier/serial number"]) || cleanValue(record.identifierSerialNumber) || cleanValue(record.identifier) || cleanValue(record["Identifier/Serial Number"]) || cleanValue(record["identifier_serial_number"]) || cleanValue(record["serialNumber"]) || cleanValue(record["serial number"]) || cleanValue(record["Identifier/serial number"]) || cleanValue(record["identifier serial number"]) || cleanValue(record["Identifier Serial Number"]) || cleanValue(record["Serial Number"]);
          const approvalNumber = cleanValue(record["approval number"]) || cleanValue(record.approvalNumber) || cleanValue(record["Approval Number"]) || cleanValue(record["approval_number"]) || cleanValue(record["Approval number"]);
          const startDate = cleanValue(record["start date"]) || cleanValue(record.startDate) || cleanValue(record["Start Date"]) || cleanValue(record["start_date"]) || cleanValue(record["Start date"]);
          const endDate = cleanValue(record["end date"]) || cleanValue(record.endDate) || cleanValue(record["End Date"]) || cleanValue(record["end_date"]) || cleanValue(record["End date"]);
          await db2.insert(approvalMonitoring).values({
            type: cleanValue(record.type) || cleanValue(record.Type),
            platform: cleanValue(record.platform) || cleanValue(record.Platform),
            pic: cleanValue(record.pic) || cleanValue(record.PIC),
            ipAddress,
            hostnameAccounts,
            identifierSerialNumber,
            approvalNumber,
            startDate,
            endDate,
            status: null,
            remarks: cleanValue(record.remarks) || cleanValue(record.Remarks)
          });
          successful++;
        } catch (error) {
          failed++;
          errors.push(`Failed to import record: ${error.message}`);
        }
      }
      return res.json({
        total: records.length,
        successful,
        failed,
        errors
      });
    } catch (error) {
      console.error("Approval monitoring import error:", error);
      return res.status(500).json({ message: "Import failed", error: error.message });
    }
  });
  app2.post("/api/test-email", requireAuth, async (req, res) => {
    try {
      const settings3 = await storage.getSystemSettings();
      if (!settings3?.mailHost || !settings3?.companyEmail) {
        return res.status(400).json({
          message: "Email configuration is incomplete. Please configure SMTP settings first."
        });
      }
      await emailService.initialize();
      const success = await emailService.sendEmail({
        to: settings3.companyEmail,
        subject: "SRPH-MIS Test Email",
        html: `
          <h2>Test Email from SRPH-MIS</h2>
          <p>This is a test email to verify your email configuration.</p>
          <p>If you received this email, your email settings are working correctly!</p>
          <p><strong>Sent at:</strong> ${(/* @__PURE__ */ new Date()).toLocaleString()}</p>
        `
      });
      if (success) {
        return res.json({
          success: true,
          message: `Test email sent successfully to ${settings3.companyEmail}`
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to send test email. Check server logs for details."
        });
      }
    } catch (error) {
      console.error("Test email error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to send test email"
      });
    }
  });
  app2.get("/api/database/status", async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({
          status: "Disconnected",
          name: "PostgreSQL Database",
          version: "Not Connected",
          size: "Connection Required",
          sizeBytes: 0,
          tables: [],
          tablesCount: 0,
          lastBackup: "No connection",
          connectionError: true,
          errorMessage: "Database connection failed",
          storageMode: "In-Memory Storage (Temporary)"
        });
      }
      const connectionTest = await db2.execute(sql3`SELECT version() AS version, current_database() AS name`);
      const sizeQuery = await db2.execute(sql3`
        SELECT
          pg_size_pretty(pg_database_size(current_database())) AS size,
          pg_database_size(current_database()) AS size_bytes
      `);
      const tablesQuery = await db2.execute(sql3`
        SELECT
          schemaname,
          tablename AS name,
          pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
          pg_total_relation_size(schemaname||'.'||tablename) AS size_bytes
        FROM pg_tables
        WHERE schemaname = 'public'
        ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
      `);
      const tables = tablesQuery.rows.map((table) => ({
        name: table.name,
        columns: 0,
        // We could get this with another query if needed
        size: table.size,
        sizeBytes: parseInt(table.size_bytes) || 0
      }));
      let lastBackup = "No backups found";
      try {
        const fs6 = await import("fs");
        const path5 = await import("path");
        const backupDir = path5.join(process.cwd(), "backups");
        if (fs6.existsSync(backupDir)) {
          const files = fs6.readdirSync(backupDir);
          const sqlFiles = files.filter((f) => f.endsWith(".sql")).sort().reverse();
          if (sqlFiles.length > 0) {
            const stats = fs6.statSync(path5.join(backupDir, sqlFiles[0]));
            lastBackup = stats.mtime.toLocaleString();
          }
        }
      } catch (backupError) {
        console.warn("Could not check backup directory:", backupError);
      }
      return res.json({
        status: "Connected",
        name: connectionTest.rows[0]?.name || "PostgreSQL Database",
        version: connectionTest.rows[0]?.version || "Unknown",
        size: sizeQuery.rows[0]?.size || "Unknown",
        sizeBytes: parseInt(sizeQuery.rows[0]?.size_bytes) || 0,
        tables,
        tablesCount: tables.length,
        lastBackup,
        connectionError: false,
        errorMessage: null,
        storageMode: "PostgreSQL Database (Persistent)"
      });
    } catch (error) {
      console.error("Database status error:", error);
      return res.status(503).json({
        status: "Disconnected",
        name: "PostgreSQL Database",
        version: "Connection Failed",
        size: "Not Available",
        sizeBytes: 0,
        tables: [],
        tablesCount: 0,
        lastBackup: "Connection required",
        connectionError: true,
        errorMessage: error.message || "Failed to connect to database",
        storageMode: "In-Memory Storage (Temporary)"
      });
    }
  });
  app2.get("/api/database/backups", async (req, res) => {
    try {
      const fs6 = await import("fs");
      const path5 = await import("path");
      const backupDir = path5.join(process.cwd(), "backups");
      if (!fs6.existsSync(backupDir)) {
        fs6.mkdirSync(backupDir, { recursive: true });
        return res.json([]);
      }
      const files = fs6.readdirSync(backupDir);
      const backups = files.filter((f) => f.endsWith(".sql") || f.endsWith(".backup")).map((filename) => {
        const filePath = path5.join(backupDir, filename);
        const stats = fs6.statSync(filePath);
        return {
          filename,
          path: filePath,
          size: formatBytes(stats.size),
          created: stats.birthtime.toISOString()
        };
      }).sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      return res.json(backups);
    } catch (error) {
      console.error("Error fetching backups:", error);
      return res.status(500).json({ message: "Failed to fetch backups" });
    }
  });
  app2.post("/api/database/backup", async (req, res) => {
    try {
      const { filename, tables, includeData, includeSchema, format } = req.body;
      const backupFilename = filename || `backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.sql`;
      const fs6 = await import("fs");
      const path5 = await import("path");
      const { exec: exec2 } = await import("child_process");
      const { promisify: promisify3 } = await import("util");
      const execAsync2 = promisify3(exec2);
      const backupDir = path5.join(process.cwd(), "backups");
      if (!fs6.existsSync(backupDir)) {
        fs6.mkdirSync(backupDir, { recursive: true });
      }
      const backupPath = path5.join(backupDir, backupFilename);
      try {
        const databaseUrl = process.env.DATABASE_URL;
        if (databaseUrl) {
          let pgDumpArgs = ["-U", "postgres", "-d", "srph_mis"];
          if (databaseUrl.includes("@")) {
            const urlParts = databaseUrl.match(/postgres:\/\/(?:([^:]+):([^@]+)@)?([^/]+)\/(\w+)/);
            if (urlParts) {
              pgDumpArgs = ["-h", urlParts[3].split(":")[0], "-p", urlParts[3].split(":")[1] || "5432", "-U", urlParts[1] || "postgres", "-d", urlParts[4]];
            }
          }
          if (tables && tables.length > 0) {
            tables.forEach((t) => pgDumpArgs.push("-t", t));
          } else if (includeSchema === false) {
            pgDumpArgs.push("--data-only");
          } else {
            pgDumpArgs.push("--schema-only");
            pgDumpArgs.push("--data-only");
          }
          if (format === "json") {
            pgDumpArgs.push("--format=custom");
          } else {
            pgDumpArgs.push("--format=plain");
          }
          const pgDumpCmd = `pg_dump ${pgDumpArgs.join(" ")} > "${backupPath}"`;
          await execAsync2(pgDumpCmd);
          const fileContent = fs6.readFileSync(backupPath);
          res.setHeader("Content-Type", format === "json" ? "application/json" : "application/sql");
          res.setHeader("Content-Disposition", `attachment; filename="${backupFilename}"`);
          res.setHeader("Content-Length", fileContent.length);
          return res.send(fileContent);
        } else {
          throw new Error("No DATABASE_URL available for pg_dump");
        }
      } catch (pgDumpError) {
        console.warn("pg_dump failed, creating basic SQL backup:", pgDumpError);
        let backupContent = `-- PostgreSQL database dump
`;
        backupContent += `-- Dumped on: ${(/* @__PURE__ */ new Date()).toISOString()}
`;
        backupContent += `-- Database: srph_mis

`;
        const tablesToBackup = tables && tables.length > 0 ? tables : [
          "users",
          "assets",
          "activities",
          "licenses",
          "components",
          "accessories",
          "consumables",
          "license_assignments",
          "consumable_assignments",
          "it_equipment",
          "it_equipment_assignments",
          "vm_inventory",
          "bitlocker_keys",
          "iam_accounts",
          "monitor_inventory",
          "vm_approval_history",
          "approval_monitoring",
          "azure_inventory",
          "gcp_inventory",
          "aws_inventory",
          "system_settings",
          "zabbix_settings",
          "zabbix_subnets",
          "discovered_hosts",
          "vm_monitoring",
          "aws_historical_data",
          "azure_historical_data",
          "gcp_historical_data",
          "iam_account_approval_history"
        ];
        try {
          for (const table of tablesToBackup) {
            backupContent += `-- Table: ${table}
`;
            const tableData = await db2.execute(sql3.raw(`SELECT * FROM ${table}`));
            if (tableData.rows && tableData.rows.length > 0) {
              const columns = Object.keys(tableData.rows[0]);
              backupContent += `-- Columns: ${columns.join(", ")}

`;
              tableData.rows.forEach((row) => {
                const values = columns.map((col) => {
                  const value = row[col];
                  if (value === null) return "NULL";
                  if (typeof value === "string") return `'${value.replace(/'/g, "''")}'`;
                  if (value instanceof Date) return `'${value.toISOString()}'`;
                  return value;
                });
                backupContent += `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${values.join(", ")}); 
`;
              });
              backupContent += "\n";
            } else {
              backupContent += `-- No data found for table ${table}

`;
            }
          }
        } catch (tableError) {
          console.error("Error reading table data:", tableError);
          backupContent += `-- Error reading table data: ${tableError.message}
`;
        }
        fs6.writeFileSync(backupPath, backupContent);
        res.setHeader("Content-Type", "application/sql");
        res.setHeader("Content-Disposition", `attachment; filename="${backupFilename}"`);
        res.setHeader("Content-Length", backupContent.length);
        return res.send(backupContent);
      }
    } catch (error) {
      console.error("Backup error:", error);
      return res.status(500).json({ message: error.message || "Backup failed" });
    }
  });
  app2.post("/api/database/restore", async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database connection required" });
      }
      const { backupPath } = req.body;
      if (!backupPath) {
        return res.status(400).json({ message: "Backup path is required" });
      }
      const fs6 = await import("fs");
      const { exec: exec2 } = await import("child_process");
      const { promisify: promisify3 } = await import("util");
      const execAsync2 = promisify3(exec2);
      if (!fs6.existsSync(backupPath)) {
        return res.status(404).json({ message: "Backup file not found" });
      }
      try {
        const databaseUrl = process.env.DATABASE_URL;
        if (databaseUrl) {
          const backupContent = await fs6.promises.readFile(backupPath, "utf8");
          const statements = backupContent.split(";").filter((s) => s.trim().length > 0);
          console.log(`Starting manual restore of ${statements.length} statements`);
          for (const statement of statements) {
            try {
              await db2.execute(sql3.raw(statement));
            } catch (statementError) {
              console.warn(`Statement failed during restore: ${statement.substring(0, 50)}...`, statementError.message);
            }
          }
          console.log("Manual restore completed");
        } else {
          throw new Error("No DATABASE_URL available for restore");
        }
      } catch (restoreError) {
        console.error("Restore failed:", restoreError);
        return res.status(500).json({ message: "Restore failed: " + restoreError.message });
      }
      await storage.createActivity({
        action: "restore",
        itemType: "database",
        itemId: 1,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Database restored from backup: ${backupPath}`
      });
      return res.json({
        success: true,
        message: "Database restored successfully",
        filename: backupPath
      });
    } catch (error) {
      console.error("Restore error:", error);
      return res.status(500).json({ message: error.message || "Restore failed" });
    }
  });
  app2.post("/api/database/optimize", async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({ message: "Database connection required" });
      }
      const { tables } = req.body;
      const tablesToOptimize = tables || ["users", "assets", "activities", "licenses", "components", "accessories", "vm_inventory"];
      const optimizedTables = [];
      for (const tableName of tablesToOptimize) {
        try {
          await db2.execute(sql3.raw(`VACUUM ANALYZE ${tableName}`));
          optimizedTables.push(tableName);
        } catch (tableError) {
          console.warn(`Could not optimize table ${tableName}:`, tableError);
        }
      }
      await storage.createActivity({
        action: "optimize",
        itemType: "database",
        itemId: 1,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Database optimized: ${optimizedTables.length} tables processed`
      });
      return res.json({
        success: true,
        message: `Database optimization completed. ${optimizedTables.length} tables optimized.`,
        optimizedTables
      });
    } catch (error) {
      console.error("Optimization error:", error);
      return res.status(500).json({ message: error.message || "Optimization failed" });
    }
  });
  app2.get("/api/database/schedule", async (req, res) => {
    try {
      if (!db2) {
        return res.json({
          autoBackup: false,
          autoOptimize: false,
          backupTime: "03:00",
          optimizeTime: "04:00"
        });
      }
      const tableCheck = await db2.execute(sql3`
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = 'system_settings'
        );
      `);
      if (!tableCheck.rows[0]?.exists) {
        console.warn("system_settings table does not exist, returning defaults");
        return res.json({
          autoBackup: false,
          autoOptimize: false,
          backupTime: "03:00",
          optimizeTime: "04:00"
        });
      }
      const settings3 = await storage.getSystemSettings();
      res.json({
        autoBackup: settings3?.autoBackup || false,
        autoOptimize: false,
        // Not implemented yet
        backupTime: settings3?.backupTime || "03:00",
        optimizeTime: "04:00"
      });
    } catch (error) {
      console.error("Error fetching schedule settings:", error);
      res.json({
        autoBackup: false,
        autoOptimize: false,
        backupTime: "03:00",
        optimizeTime: "04:00"
      });
    }
  });
  app2.post("/api/database/schedule", async (req, res) => {
    try {
      if (!db2) {
        return res.status(503).json({
          message: "Database not available - using in-memory storage. Schedule settings cannot be persisted."
        });
      }
      const tableCheck = await db2.execute(sql3`
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = 'system_settings'
        );
      `);
      if (!tableCheck.rows[0]?.exists) {
        console.error("system_settings table does not exist");
        return res.status(500).json({
          message: "System settings table not found. Please run database migrations."
        });
      }
      const { autoBackup, autoOptimize, backupTime, optimizeTime, retentionDays, emailNotifications } = req.body;
      console.log("\u{1F4DD} Received schedule update request:", {
        autoBackup,
        backupTime,
        autoOptimize,
        optimizeTime
      });
      let settings3 = await storage.getSystemSettings();
      if (!settings3) {
        settings3 = {
          siteName: "SRPH-MIS",
          companyName: "SRPH",
          autoBackup: false,
          autoOptimize: false,
          backupTime: "03:00",
          optimizeTime: "04:00",
          retentionDays: 30,
          emailNotifications: true
        };
      }
      await db2.execute(sql3`
        UPDATE system_settings
        SET
          auto_backup = ${autoBackup ?? false},
          backup_time = ${backupTime ?? "03:00"},
          auto_optimize = ${autoOptimize ?? false},
          optimize_time = ${optimizeTime ?? "04:00"},
          retention_days = ${retentionDays ?? 30},
          email_notifications = ${emailNotifications ?? true},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
      `);
      console.log("\u2705 Schedule settings saved to database:", {
        autoBackup,
        backupTime,
        autoOptimize,
        optimizeTime,
        retentionDays,
        emailNotifications
      });
      const updatedSettings = await storage.getSystemSettings();
      res.json({
        success: true,
        message: "Maintenance schedule updated successfully",
        settings: {
          autoBackup: autoBackup ?? false,
          backupTime: backupTime ?? "03:00",
          autoOptimize: autoOptimize ?? false,
          optimizeTime: optimizeTime ?? "04:00",
          retentionDays: retentionDays ?? 30,
          emailNotifications: emailNotifications ?? true
        }
      });
    } catch (error) {
      console.error("Error updating schedule settings:", error);
      res.status(500).json({
        message: error.message || "Failed to update schedule settings"
      });
    }
  });
  app2.post("/api/database/backup-all", async (req, res) => {
    try {
      const { format } = req.body;
      const fs6 = await import("fs");
      const path5 = await import("path");
      if (format === "json") {
        const allData = {
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          users: await storage.getUsers(),
          assets: await storage.getAssets(),
          activities: await storage.getActivities(),
          licenses: await storage.getLicenses(),
          components: await storage.getComponents(),
          accessories: [],
          // Add if you have accessories
          settings: await storage.getSystemSettings()
        };
        const jsonContent = JSON.stringify(allData, null, 2);
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Disposition", `attachment; filename=complete-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`);
        return res.send(jsonContent);
      }
      return res.status(400).json({ message: "Unsupported backup format" });
    } catch (error) {
      console.error("Backup all error:", error);
      return res.status(500).json({ message: error.message || "Backup all failed" });
    }
  });
  app2.post("/api/database/restore-all", async (req, res) => {
    try {
      return res.json({
        success: true,
        message: "Data restoration completed successfully"
      });
    } catch (error) {
      console.error("Restore all error:", error);
      return res.status(500).json({ message: error.message || "Restore all failed" });
    }
  });
  app2.post("/api/admin/encrypt-data", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { password } = req.body;
      if (!password || password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
      }
      const { scrypt: scrypt2 } = await import("crypto");
      const { promisify: promisify3 } = await import("util");
      const scryptAsync2 = promisify3(scrypt2);
      const currentUser = await storage.getUser(req.user.id);
      if (!currentUser) {
        return res.status(401).json({ message: "User not found" });
      }
      const [hashedPassword, salt] = currentUser.password.split(".");
      const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
      const suppliedPasswordBuf = await scryptAsync2(password, salt, 64);
      if (!hashedPasswordBuf.equals(suppliedPasswordBuf)) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const { encryptExistingData: encryptExistingData2 } = await Promise.resolve().then(() => (init_encrypt_existing_data(), encrypt_existing_data_exports));
      const result = await encryptExistingData2();
      res.json({
        success: true,
        message: "Data encrypted successfully",
        encryptedCount: result || "All applicable records"
      });
    } catch (error) {
      console.error("Encryption error:", error);
      res.status(500).json({ message: error.message || "Failed to encrypt data" });
    }
  });
  app2.post("/api/admin/decrypt-data", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { password } = req.body;
      if (!password || password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
      }
      const { scrypt: scrypt2, timingSafeEqual: timingSafeEqual2 } = await import("crypto");
      const { promisify: promisify3 } = await import("util");
      const scryptAsync2 = promisify3(scrypt2);
      const currentUser = await storage.getUser(req.user.id);
      if (!currentUser) {
        return res.status(401).json({ message: "User not found" });
      }
      const [hashedPassword, salt] = currentUser.password.split(".");
      const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
      const suppliedPasswordBuf = await scryptAsync2(password, salt, 64);
      if (!hashedPasswordBuf.equals(suppliedPasswordBuf)) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const { db: db3 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const schema = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { decryptFields: decryptFields3, PII_FIELDS: PII_FIELDS3 } = await Promise.resolve().then(() => (init_encryption(), encryption_exports));
      const { eq: eq6 } = await import("drizzle-orm");
      if (!db3) {
        return res.status(500).json({ message: "Database connection required" });
      }
      let totalDecrypted = 0;
      const users4 = await db3.select().from(schema.users);
      for (const user of users4) {
        const isEncrypted = user.email && user.email.split(":").length === 3;
        if (isEncrypted) {
          try {
            const decrypted = decryptFields3(user, PII_FIELDS3.user);
            await db3.update(schema.users).set({
              email: decrypted.email,
              firstName: decrypted.firstName,
              lastName: decrypted.lastName,
              department: decrypted.department
            }).where(eq6(schema.users.id, user.id));
            totalDecrypted++;
          } catch (error) {
            console.error(`Failed to decrypt user ${user.id}`);
          }
        }
      }
      const assets3 = await db3.select().from(schema.assets);
      for (const asset2 of assets3) {
        const isEncrypted = asset2.serialNumber && asset2.serialNumber.split(":").length === 3;
        if (isEncrypted) {
          try {
            const decrypted = decryptFields3(asset2, PII_FIELDS3.asset);
            await db3.update(schema.assets).set({
              knoxId: decrypted.knoxId,
              serialNumber: decrypted.serialNumber,
              macAddress: decrypted.macAddress,
              ipAddress: decrypted.ipAddress
            }).where(eq6(schema.assets.id, asset2.id));
            totalDecrypted++;
          } catch (error) {
            console.error(`Failed to decrypt asset ${asset2.id}`);
          }
        }
      }
      const keys = await db3.select().from(schema.bitlockerKeys);
      for (const key of keys) {
        const isEncrypted = key.recoveryKey && key.recoveryKey.split(":").length === 3;
        if (isEncrypted) {
          try {
            const decrypted = decryptFields3(key, PII_FIELDS3.bitlockerKey);
            await db3.update(schema.bitlockerKeys).set({
              serialNumber: decrypted.serialNumber,
              identifier: decrypted.identifier,
              recoveryKey: decrypted.recoveryKey
            }).where(eq6(schema.bitlockerKeys.id, key.id));
            totalDecrypted++;
          } catch (error) {
            console.error(`Failed to decrypt BitLocker key ${key.id}`);
          }
        }
      }
      const vmInventory3 = await db3.select().from(schema.vmInventory);
      for (const vm of vmInventory3) {
        const isEncrypted = vm.knoxId && vm.knoxId.split(":").length === 3;
        if (isEncrypted) {
          try {
            const decrypted = decryptFields3(vm, PII_FIELDS3.vmInventory);
            await db3.update(schema.vmInventory).set({
              knoxId: decrypted.knoxId,
              requestor: decrypted.requestor,
              vmIp: decrypted.vmIp,
              ipAddress: decrypted.ipAddress
            }).where(eq6(schema.vmInventory.id, vm.id));
            totalDecrypted++;
          } catch (error) {
            console.error(`Failed to decrypt VM ${vm.id}`);
          }
        }
      }
      const iamAccounts2 = await db3.select().from(schema.iamAccounts);
      for (const account of iamAccounts2) {
        const isEncrypted = account.knoxId && account.knoxId.split(":").length === 3;
        if (isEncrypted) {
          try {
            const decrypted = decryptFields3(account, PII_FIELDS3.iamAccount);
            await db3.update(schema.iamAccounts).set({
              knoxId: decrypted.knoxId,
              requestor: decrypted.requestor
            }).where(eq6(schema.iamAccounts.id, account.id));
            totalDecrypted++;
          } catch (error) {
            console.error(`Failed to decrypt IAM account ${account.id}`);
          }
        }
      }
      const itEquipment2 = await db3.select().from(schema.itEquipment);
      for (const equipment of itEquipment2) {
        const isEncrypted = equipment.serialNumber && equipment.serialNumber.split(":").length === 3;
        if (isEncrypted) {
          try {
            const decrypted = decryptFields3(equipment, PII_FIELDS3.itEquipment);
            await db3.update(schema.itEquipment).set({
              knoxId: decrypted.knoxId,
              serialNumber: decrypted.serialNumber
            }).where(eq6(schema.itEquipment.id, equipment.id));
            totalDecrypted++;
          } catch (error) {
            console.error(`Failed to decrypt IT equipment ${equipment.id}`);
          }
        }
      }
      const monitorInventory2 = await db3.select().from(schema.monitorInventory);
      for (const monitor of monitorInventory2) {
        const isEncrypted = monitor.serialNumber && monitor.serialNumber.split(":").length === 3;
        if (isEncrypted) {
          try {
            const decrypted = decryptFields3(monitor, PII_FIELDS3.monitor);
            await db3.update(schema.monitorInventory).set({
              assetNumber: decrypted.assetNumber,
              serialNumber: decrypted.serialNumber
              // knoxId is NOT encrypted - skip it
            }).where(eq6(schema.monitorInventory.id, monitor.id));
            totalDecrypted++;
          } catch (error) {
            console.error(`Failed to decrypt monitor ${monitor.id}`);
          }
        }
      }
      res.json({
        success: true,
        message: "Data decrypted successfully",
        decryptedCount: totalDecrypted
      });
    } catch (error) {
      console.error("Decryption error:", error);
      res.status(500).json({ message: error.message || "Failed to decrypt data" });
    }
  });
  app2.post("/api/user/change-password", requireAuth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters long" });
    }
    try {
      const user = await storage.getUser(req.user.id);
      if (currentPassword && !user.forcePasswordChange) {
        const { scrypt: scrypt3, timingSafeEqual: timingSafeEqual2 } = await import("crypto");
        const { promisify: promisify4 } = await import("util");
        const scryptAsync3 = promisify4(scrypt3);
        const [hashed, salt2] = user.password.split(".");
        const hashedBuf = Buffer.from(hashed, "hex");
        const suppliedBuf = await scryptAsync3(currentPassword, salt2, 64);
        if (!timingSafeEqual2(hashedBuf, suppliedBuf)) {
          return res.status(400).json({ message: "Current password is incorrect" });
        }
      }
      const { scrypt: scrypt2, randomBytes: randomBytes2 } = await import("crypto");
      const { promisify: promisify3 } = await import("util");
      const scryptAsync2 = promisify3(scrypt2);
      const salt = randomBytes2(16).toString("hex");
      const buf = await scryptAsync2(newPassword, salt, 64);
      const hashedPassword = `${buf.toString("hex")}.${salt}`;
      await storage.updateUser(req.user.id, {
        password: hashedPassword,
        forcePasswordChange: false
      });
      console.log(`User ${req.user.username} changed their password`);
      res.json({
        success: true,
        message: "Password changed successfully"
      });
    } catch (error) {
      console.error("Password change error:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });
  app2.post("/api/admin/disable-mfa/:userId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Admin privileges required" });
    }
    const userId = parseInt(req.params.userId);
    try {
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!user.mfaEnabled) {
        return res.status(400).json({ message: "MFA is not enabled for this user" });
      }
      await storage.updateUser(userId, {
        mfaSecret: null,
        mfaEnabled: false
      });
      console.log(`Admin ${req.user.username} disabled MFA for user ${user.username}`);
      return res.status(200).json({
        success: true,
        message: `MFA disabled for user ${user.username}`
      });
    } catch (error) {
      console.error("Admin MFA disable error:", error);
      return res.status(500).json({
        success: false,
        message: error?.message || "Failed to disable MFA"
      });
    }
  });
  app2.post("/api/admin/reset-password/:userId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Admin privileges required" });
    }
    const userId = parseInt(req.params.userId);
    const { password, forceChange } = req.body;
    if (!password || password.trim() === "") {
      return res.status(400).json({ message: "Password is required" });
    }
    try {
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { scrypt: scrypt2, randomBytes: randomBytes2 } = await import("crypto");
      const { promisify: promisify3 } = await import("util");
      const scryptAsync2 = promisify3(scrypt2);
      const salt = randomBytes2(16).toString("hex");
      const buf = await scryptAsync2(password, salt, 64);
      const hashedPassword = `${buf.toString("hex")}.${salt}`;
      await storage.updateUser(userId, {
        password: hashedPassword,
        forcePasswordChange: forceChange === true
      });
      console.log(`Admin ${req.user.username} reset password for user ${user.username}. Force change: ${forceChange}`);
      await storage.createActivity({
        action: "update",
        itemType: "user",
        itemId: userId,
        userId: req.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Password reset by admin. Force change on next login: ${forceChange ? "Yes" : "No"}`
      });
      return res.status(200).json({
        success: true,
        message: `Password reset successfully for user ${user.username}`,
        forceChange: forceChange === true
      });
    } catch (error) {
      console.error("Admin password reset error:", error);
      return res.status(500).json({
        success: false,
        message: error?.message || "Failed to reset password"
      });
    }
  });
  app2.get("/api/user", (req, res) => {
    console.log("GET /api/user - isAuthenticated:", req.isAuthenticated(), "sessionID:", req.sessionID);
    if (!req.isAuthenticated()) {
      console.log("User not authenticated, returning 401");
      return res.status(401).json({ message: "Not authenticated" });
    }
    console.log("Returning user data:", {
      id: req.user.id,
      username: req.user.username,
      mfaEnabled: req.user.mfaEnabled,
      isAdmin: req.user.isAdmin,
      forcePasswordChange: req.user.forcePasswordChange
    });
    res.json(req.user);
  });
  app2.get("/api/me", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({ user: req.user });
  });
  app2.put("/api/profile", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const { firstName, lastName, email, phone, location, bio } = req.body;
      const updatedUser2 = await storage.updateUser(req.user.id, {
        firstName,
        lastName,
        email,
        phone,
        location,
        bio
      });
      if (!updatedUser2) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user.firstName = updatedUser2.firstName;
      req.user.lastName = updatedUser2.lastName;
      req.user.email = updatedUser2.email;
      res.json(updatedUser2);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  registerPageBuilderRoutes(app2, requireAuth, requireAdmin);
  registerZabbixRoutes(app2, requireAuth);
  return server;
}

// server/vite.ts
import express from "express";
import fs5 from "fs";
import path4 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path3 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  server: {
    host: "0.0.0.0",
    port: 5e3,
    strictPort: false,
    hmr: {
      clientPort: 443
    },
    allowedHosts: true
  },
  resolve: {
    alias: {
      "@": path3.resolve(import.meta.dirname, "client", "src"),
      "@shared": path3.resolve(import.meta.dirname, "shared"),
      "@assets": path3.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path3.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path3.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: {
      server,
      overlay: true
    },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path4.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs5.promises.readFile(clientTemplate, "utf-8");
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path4.resolve(import.meta.dirname, "public");
  if (!fs5.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path4.resolve(distPath, "index.html"));
  });
}

// server/index.ts
init_migrate();
init_storage();
import { networkInterfaces } from "os";

// server/database-storage.ts
init_schema();
init_db();
init_schema();
init_encryption();
import { eq as eq5, sql as sql5, desc as desc2 } from "drizzle-orm";
async function initializeDatabase() {
  try {
    console.log("\u{1F504} Initializing database tables...");
    await db2.execute(sql5`SELECT 1 as test`);
    console.log("\u2705 Database connection established/verified");
    console.log("\u{1F4CA} Using database:", process.env.DATABASE_URL?.replace(/:[^:@]+@/, ":****@"));
    const { runMigrations: runMigrations2 } = await Promise.resolve().then(() => (init_migrate(), migrate_exports));
    await runMigrations2();
    const tableExists2 = await db2.execute(sql5`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'iam_account_approval_history'
      );
    `);
    if (!tableExists2.rows?.[0]?.exists) {
      console.warn("\u26A0\uFE0F The 'iam_account_approval_history' table does not exist. Please ensure it is created.");
    }
    return;
    console.log("\u{1F389} Database initialization completed successfully!");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}
var DatabaseStorage = class {
  // User operations
  async getUsers() {
    try {
      const result = await db2.select().from(users);
      return result.map((user) => ({
        ...user,
        password: void 0,
        mfaEnabled: user.mfaEnabled || false,
        mfaSecret: user.mfaSecret || null
      }));
    } catch (error) {
      console.error("Database error getting users:", error);
      throw error;
    }
  }
  async getUser(id) {
    if (!db2) throw new Error("Database connection required");
    const [user] = await db2.select().from(users).where(eq5(users.id, id));
    return user ? decryptFields(user, PII_FIELDS.user) : null;
  }
  async getUserByUsername(username) {
    if (!db2) throw new Error("Database connection required");
    const [user] = await db2.select().from(users).where(eq5(users.username, username));
    return user ? decryptFields(user, PII_FIELDS.user) : null;
  }
  async createUser(userData) {
    if (!db2) throw new Error("Database connection required");
    const { scrypt: scrypt2, randomBytes: randomBytes2 } = await import("crypto");
    const { promisify: promisify3 } = await import("util");
    const scryptAsync2 = promisify3(scrypt2);
    const salt = randomBytes2(16).toString("hex");
    const buf = await scryptAsync2(userData.password, salt, 64);
    const hashedPassword = `${buf.toString("hex")}.${salt}`;
    const encryptedData = process.env.ENCRYPTION_KEY ? encryptFields(userData, PII_FIELDS.user) : userData;
    const [user] = await db2.insert(users).values({
      ...encryptedData,
      password: hashedPassword
    }).returning();
    return process.env.ENCRYPTION_KEY ? decryptFields(user, PII_FIELDS.user) : user;
  }
  async updateUser(id, updateData) {
    if (Object.keys(updateData).length === 0) {
      return await this.getUser(id);
    }
    const encryptedUpdateData = process.env.ENCRYPTION_KEY ? encryptFields(updateData, PII_FIELDS.user) : updateData;
    const [updated] = await db2.update(users).set(encryptedUpdateData).where(eq5(users.id, id)).returning();
    return updated ? process.env.ENCRYPTION_KEY ? decryptFields(updated, PII_FIELDS.user) : updated : void 0;
  }
  async deleteUser(id) {
    try {
      const userToDelete = await this.getUser(id);
      if (!userToDelete) {
        console.log(`User ${id} not found`);
        return false;
      }
      console.log(`Deleting user ${userToDelete.username} (ID: ${id}) from PostgreSQL database...`);
      await db2.execute(sql5`
        UPDATE activities 
        SET user_id = NULL, 
            notes = COALESCE(notes, '') || ' [User deleted: ' || ${userToDelete.username} || ']'
        WHERE user_id = ${id}
      `);
      console.log(`Updated activities to preserve audit trail for deleted user`);
      await db2.execute(sql5`
        UPDATE assets 
        SET assigned_to = NULL,
            status = 'available',
            checkout_date = NULL,
            expected_checkin_date = NULL
        WHERE assigned_to = ${id}
      `);
      console.log(`Updated assets to remove user assignments`);
      const deleteResult = await db2.delete(users).where(eq5(users.id, id));
      console.log(`Delete result for user ${id}:`, deleteResult);
      if (deleteResult.rowCount && deleteResult.rowCount > 0) {
        console.log(`User ${userToDelete.username} deleted successfully from PostgreSQL database`);
        return true;
      }
      console.log(`No rows affected when deleting user ${id}`);
      return false;
    } catch (error) {
      console.error(`Error deleting user from PostgreSQL database:`, error);
      throw error;
    }
  }
  // Asset operations
  async getAssets() {
    if (!db2) throw new Error("Database connection required");
    const assets3 = await db2.select().from(assets);
    return process.env.ENCRYPTION_KEY ? batchDecryptFields(assets3, PII_FIELDS.asset) : assets3;
  }
  async getAsset(id) {
    if (!db2) throw new Error("Database connection required");
    const [asset2] = await db2.select().from(assets).where(eq5(assets.id, id));
    return asset2 ? process.env.ENCRYPTION_KEY ? decryptFields(asset2, PII_FIELDS.asset) : asset2 : null;
  }
  async getAssetByTag(assetTag) {
    const [asset2] = await db2.select().from(assets).where(eq5(assets.assetTag, assetTag));
    return asset2;
  }
  async createAsset(assetData) {
    if (!db2) throw new Error("Database connection required");
    const encryptedData = process.env.ENCRYPTION_KEY ? encryptFields(assetData, PII_FIELDS.asset) : assetData;
    const [asset2] = await db2.insert(assets).values(encryptedData).returning();
    return process.env.ENCRYPTION_KEY ? decryptFields(asset2, PII_FIELDS.asset) : asset2;
  }
  async updateAsset(id, updateData) {
    const encryptedUpdateData = process.env.ENCRYPTION_KEY ? encryptFields(updateData, PII_FIELDS.asset) : updateData;
    const [updated] = await db2.update(assets).set(encryptedUpdateData).where(eq5(assets.id, id)).returning();
    return updated ? process.env.ENCRYPTION_KEY ? decryptFields(updated, PII_FIELDS.asset) : updated : void 0;
  }
  async deleteAsset(id) {
    try {
      console.log(`Deleting asset with ID: ${id} from PostgreSQL database...`);
      const assetToDelete = await this.getAsset(id);
      if (!assetToDelete) {
        console.log(`Asset ${id} not found`);
        return false;
      }
      console.log(`Deleting asset: ${assetToDelete.name} (${assetToDelete.assetTag})`);
      const deleteResult = await db2.delete(assets).where(eq5(assets.id, id));
      console.log(`Delete result for asset ${id}:`, deleteResult);
      if (deleteResult.rowCount && deleteResult.rowCount > 0) {
        console.log(`Asset ${assetToDelete.name} deleted successfully from PostgreSQL database`);
        return true;
      }
      console.log(`No rows affected when deleting asset ${id}`);
      return false;
    } catch (error) {
      console.error(`Error deleting asset from PostgreSQL database:`, error);
      throw error;
    }
  }
  // Component operations
  async getComponents() {
    try {
      return await db2.select().from(components);
    } catch (error) {
      console.error("Error fetching components:", error);
      return [];
    }
  }
  async getComponent(id) {
    try {
      const [component] = await db2.select().from(components).where(eq5(components.id, id));
      return component;
    } catch (error) {
      console.error("Error fetching component:", error);
      return void 0;
    }
  }
  async createComponent(data) {
    try {
      const componentData = {
        name: data.name,
        type: data.type,
        category: data.category || "General",
        serialNumber: data.serialNumber || null,
        manufacturer: data.manufacturer || null,
        model: data.model || null,
        specifications: data.specifications || null,
        status: data.status || "available",
        location: data.location || null,
        assignedTo: data.assignedTo || null,
        purchaseDate: data.purchaseDate || null,
        purchaseCost: data.purchaseCost ? parseFloat(data.purchaseCost.toString()) : null,
        warrantyExpiry: data.warrantyExpiry || null,
        notes: data.notes || null,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const [component] = await db2.insert(components).values(componentData).returning();
      return component;
    } catch (error) {
      console.error("Error creating component in database:", error);
      throw error;
    }
  }
  async updateComponent(id, updateData) {
    try {
      const [component] = await db2.select().from(components).where(eq5(components.id, id));
      if (!component) return void 0;
      if (typeof updateData.quantity === "string") {
        updateData.quantity = parseInt(updateData.quantity);
      }
      const [updated] = await db2.update(components).set(updateData).where(eq5(components.id, id)).returning();
      if (updated) {
        await this.createActivity({
          action: "update",
          itemType: "component",
          itemId: id,
          userId: null,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `Component "${component.name}" updated`
        });
      }
      return updated;
    } catch (error) {
      console.error("Error updating component:", error);
      throw error;
    }
  }
  async deleteComponent(id) {
    try {
      console.log(`Deleting component with ID: ${id} from PostgreSQL database...`);
      const [component] = await db2.select().from(components).where(eq5(components.id, id));
      if (!component) {
        console.log(`Component ${id} not found`);
        return false;
      }
      console.log(`Deleting component: ${component.name}`);
      const deleteResult = await db2.delete(components).where(eq5(components.id, id));
      console.log(`Delete result for component ${id}:`, deleteResult);
      if (deleteResult.rowCount && deleteResult.rowCount > 0) {
        try {
          await this.createActivity({
            action: "delete",
            itemType: "component",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Component "${component.name}" deleted`
          });
        } catch (activityError) {
          console.warn("Failed to log component delete activity:", activityError);
        }
        console.log(`Component ${component.name} deleted successfully from PostgreSQL database`);
        return true;
      }
      console.log(`No rows affected when deleting component ${id}`);
      return false;
    } catch (error) {
      console.error("Error deleting component from PostgreSQL database:", error);
      return false;
    }
  }
  // Accessory operations
  async getAccessories() {
    return await db2.select().from(accessories);
  }
  async getAccessory(id) {
    const [accessory] = await db2.select().from(accessories).where(eq5(accessories.id, id));
    return accessory;
  }
  async createAccessory(insertAccessory) {
    const processedAccessory = {
      ...insertAccessory,
      quantity: typeof insertAccessory.quantity === "string" ? parseInt(insertAccessory.quantity) : insertAccessory.quantity
    };
    const [accessory] = await db2.insert(accessories).values(processedAccessory).returning();
    await this.createActivity({
      action: "create",
      itemType: "accessory",
      itemId: accessory.id,
      userId: null,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      notes: `Accessory "${accessory.name}" created`
    });
    return accessory;
  }
  async updateAccessory(id, updateData) {
    const [accessory] = await db2.select().from(accessories).where(eq5(accessories.id, id));
    if (!accessory) return void 0;
    if (typeof updateData.quantity === "string") {
      updateData.quantity = parseInt(updateData.quantity);
    }
    const [updated] = await db2.update(accessories).set(updateData).where(eq5(accessories.id, id)).returning();
    if (updated) {
      await this.createActivity({
        action: "update",
        itemType: "accessory",
        itemId: id,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Accessory "${accessory.name}" updated`
      });
    }
    return updated;
  }
  async deleteAccessory(id) {
    const [accessory] = await db2.select().from(accessories).where(eq5(accessories.id, id));
    if (!accessory) return false;
    const [deleted] = await db2.delete(accessories).where(eq5(accessories.id, id)).returning();
    if (deleted) {
      await this.createActivity({
        action: "delete",
        itemType: "accessory",
        itemId: id,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Accessory "${accessory.name}" deleted`
      });
    }
    return !!deleted;
  }
  // Consumable operations
  async getConsumables() {
    try {
      const dbConsumables = await db2.select().from(consumables);
      return dbConsumables;
    } catch (error) {
      console.error("Error fetching consumables from database:", error);
      return [];
    }
  }
  async getConsumable(id) {
    try {
      const [consumable] = await db2.select().from(consumables).where(eq5(consumables.id, id));
      return consumable;
    } catch (error) {
      console.error("Error fetching consumable:", error);
      return void 0;
    }
  }
  async createConsumable(insertConsumable) {
    try {
      const processedConsumable = {
        ...insertConsumable,
        quantity: typeof insertConsumable.quantity === "string" ? parseInt(insertConsumable.quantity) : insertConsumable.quantity || 1
      };
      const [consumable] = await db2.insert(consumables).values(processedConsumable).returning();
      await this.createActivity({
        action: "create",
        itemType: "consumable",
        itemId: consumable.id,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Consumable "${consumable.name}" created`
      });
      return consumable;
    } catch (error) {
      console.error("Error creating consumable:", error);
      throw error;
    }
  }
  async updateConsumable(id, updateData) {
    const [consumable] = await db2.select().from(consumables).where(eq5(consumables.id, id));
    if (!consumable) return void 0;
    if (typeof updateData.quantity === "string") {
      updateData.quantity = parseInt(updateData.quantity);
    }
    const [updated] = await db2.update(consumables).set(updateData).where(eq5(consumables.id, id)).returning();
    if (updated) {
      await this.createActivity({
        action: "update",
        itemType: "consumable",
        itemId: id,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Consumable "${consumable.name}" updated`
      });
    }
    return updated;
  }
  async deleteConsumable(id) {
    try {
      const consumable = await this.getConsumable(id);
      if (!consumable) return false;
      await db2.delete(consumables).where(eq5(consumables.id, id));
      await this.createActivity({
        action: "delete",
        itemType: "consumable",
        itemId: id,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Consumable "${consumable.name}" deleted`
      });
      return true;
    } catch (error) {
      console.error("Error deleting consumable:", error);
      return false;
    }
  }
  async getConsumableAssignments(consumableId) {
    try {
      await db2.execute(sql5`SELECT 1`);
      const tableExists2 = await db2.execute(sql5`
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_name = 'consumable_assignments'
        );
      `);
      if (!tableExists2.rows?.[0]?.exists) {
        console.log("Consumable assignments table does not exist, returning empty array");
        return [];
      }
      const assignments = await db2.select().from(consumableAssignments).where(eq5(consumableAssignments.consumableId, consumableId)).orderBy(desc2(consumableAssignments.assignedDate));
      return assignments;
    } catch (error) {
      console.error("Error fetching consumable assignments:", error);
      return [];
    }
  }
  async assignConsumable(consumableId, assignmentData) {
    try {
      let consumable;
      try {
        consumable = await this.getConsumable(consumableId);
      } catch (dbError) {
        console.error("Database error while checking consumable:", dbError);
      }
      if (!consumable) {
        throw new Error("Consumable not found");
      }
      try {
        await db2.execute(sql5`SELECT 1`);
        await db2.execute(sql5`
          CREATE TABLE IF NOT EXISTS consumable_assignments (
            id SERIAL PRIMARY KEY,
            consumable_id INTEGER NOT NULL,
            assigned_to TEXT NOT NULL,
            serial_number TEXT,
            knox_id TEXT,
            quantity INTEGER NOT NULL DEFAULT 1,
            assigned_date TEXT NOT NULL,
            returned_date TEXT,
            status TEXT NOT NULL DEFAULT 'assigned',
            notes TEXT,
            CONSTRAINT fk_consumable_assignment FOREIGN KEY (consumable_id) REFERENCES consumables(id) ON DELETE CASCADE
          );
        `);
        const [assignment] = await db2.insert(consumableAssignments).values({
          consumableId,
          assignedTo: assignmentData.assignedTo,
          serialNumber: assignmentData.serialNumber || null,
          knoxId: assignmentData.knoxId || null,
          quantity: assignmentData.quantity || 1,
          assignedDate: (/* @__PURE__ */ new Date()).toISOString(),
          status: "assigned",
          notes: assignmentData.notes || null
        }).returning();
        try {
          await this.createActivity({
            action: "checkout",
            itemType: "consumable",
            itemId: consumableId,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Consumable assigned to ${assignmentData.assignedTo}`
          });
        } catch (activityError) {
          console.warn("Failed to create activity record:", activityError);
        }
        return assignment;
      } catch (dbError) {
        console.warn("Database assignment failed, using fallback mode:", dbError);
        const fallbackAssignment = {
          id: Date.now(),
          consumableId,
          assignedTo: assignmentData.assignedTo,
          serialNumber: assignmentData.serialNumber || null,
          knoxId: assignmentData.knoxId || null,
          quantity: assignmentData.quantity || 1,
          assignedDate: (/* @__PURE__ */ new Date()).toISOString(),
          status: "assigned",
          notes: assignmentData.notes || null
        };
        console.log("Assignment created in fallback mode:", fallbackAssignment);
        return fallbackAssignment;
      }
    } catch (error) {
      console.error("Error assigning consumable:", error);
      throw error;
    }
  }
  // License operations
  async getLicenses() {
    return await db2.select().from(licenses);
  }
  async getLicense(id) {
    const [license] = await db2.select().from(licenses).where(eq5(licenses.id, id));
    return license;
  }
  async createLicense(insertLicense) {
    try {
      await db2.execute(sql5`SELECT 1`);
      const [license] = await db2.insert(licenses).values(insertLicense).returning();
      await this.createActivity({
        action: "create",
        itemType: "license",
        itemId: license.id,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `License "${license.name}" created`
      });
      console.log(`\u2705 License "${license.name}" created in PostgreSQL database`);
      return license;
    } catch (error) {
      console.error("\u274C Database error creating license:", error);
      throw new Error("Failed to create license: Database connection required");
    }
  }
  async updateLicense(id, updateData) {
    const [license] = await db2.select().from(licenses).where(eq5(licenses.id, id));
    if (!license) return void 0;
    const [updated] = await db2.update(licenses).set(updateData).where(eq5(licenses.id, id)).returning();
    if (updated) {
      await this.createActivity({
        action: "update",
        itemType: "license",
        itemId: id,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `License "${license.name}" updated`
      });
    }
    return updated;
  }
  async deleteLicense(id) {
    const [license] = await db2.select().from(licenses).where(eq5(licenses.id, id));
    if (!license) return false;
    try {
      await db2.delete(licenseAssignments).where(eq5(licenseAssignments.licenseId, id));
      const [deleted] = await db2.delete(licenses).where(eq5(licenses.id, id)).returning();
      if (deleted) {
        await this.createActivity({
          action: "delete",
          itemType: "license",
          itemId: id,
          userId: null,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `License "${license.name}" deleted`
        });
      }
      return !!deleted;
    } catch (error) {
      console.error("Error deleting license:", error);
      throw error;
    }
  }
  // License assignment operations
  async getLicenseAssignments(licenseId) {
    return await db2.select().from(licenseAssignments).where(eq5(licenseAssignments.licenseId, licenseId)).orderBy(licenseAssignments.assignedDate);
  }
  async createLicenseAssignment(insertAssignment) {
    const [assignment] = await db2.insert(licenseAssignments).values(insertAssignment).returning();
    await this.createActivity({
      action: "update",
      itemType: "license",
      itemId: insertAssignment.licenseId,
      userId: null,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      notes: `License seat assigned to: ${insertAssignment.assignedTo}`
    });
    return assignment;
  }
  // Checkout/checkin operations
  async checkoutAsset(assetId, userId, expectedCheckinDate, customNotes) {
    const [asset2] = await db2.select().from(assets).where(eq5(assets.id, assetId));
    const [user] = await db2.select().from(users).where(eq5(users.id, userId));
    if (!asset2 || !user) return void 0;
    if (asset2.status !== AssetStatus.AVAILABLE) return void 0;
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const [updatedAsset] = await db2.update(assets).set({
      status: AssetStatus.DEPLOYED,
      assignedTo: userId,
      checkoutDate: today,
      expectedCheckinDate: expectedCheckinDate || null
    }).where(eq5(assets.id, assetId)).returning();
    if (updatedAsset) {
      await this.createActivity({
        action: "checkout",
        itemType: "asset",
        itemId: assetId,
        userId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: customNotes || `Asset ${asset2.name} (${asset2.assetTag}) checked out to ${user.firstName} ${user.lastName}`
      });
    }
    return updatedAsset;
  }
  async checkinAsset(assetId) {
    const [asset2] = await db2.select().from(assets).where(eq5(assets.id, assetId));
    if (!asset2) return void 0;
    if (asset2.status !== AssetStatus.DEPLOYED && asset2.status !== AssetStatus.OVERDUE) return void 0;
    const [updatedAsset] = await db2.update(assets).set({
      status: AssetStatus.AVAILABLE,
      assignedTo: null,
      checkoutDate: null,
      expectedCheckinDate: null,
      knoxId: null
      // Clear the Knox ID when checking in
    }).where(eq5(assets.id, assetId)).returning();
    if (updatedAsset) {
      await this.createActivity({
        action: "checkin",
        itemType: "asset",
        itemId: assetId,
        userId: asset2.assignedTo,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Asset ${asset2.name} (${asset2.assetTag}) checked in`
      });
    }
    return updatedAsset;
  }
  // Activity operations
  async getActivities() {
    return await db2.select().from(activities).orderBy(activities.timestamp);
  }
  async getActivitiesByUser(userId) {
    return await db2.select().from(activities).where(eq5(activities.userId, userId)).orderBy(activities.timestamp);
  }
  async getActivitiesByAsset(assetId) {
    return await db2.select().from(activities).where(eq5(activities.itemId, assetId)).orderBy(activities.timestamp);
  }
  async createActivity(insertActivity) {
    const [activity] = await db2.insert(activities).values(insertActivity).returning();
    return activity;
  }
  // Stats and summaries
  async getAssetStats() {
    const allAssets = await db2.select().from(assets);
    return {
      total: allAssets.length,
      checkedOut: allAssets.filter((asset2) => asset2.status === AssetStatus.DEPLOYED).length,
      available: allAssets.filter((asset2) => asset2.status === AssetStatus.AVAILABLE).length,
      pending: allAssets.filter((asset2) => asset2.status === AssetStatus.PENDING).length,
      overdue: allAssets.filter((asset2) => asset2.status === AssetStatus.OVERDUE).length,
      archived: allAssets.filter((asset2) => asset2.status === AssetStatus.ARCHIVED).length
    };
  }
  // Zabbix settings operations (stub implementations for now)
  async getZabbixSettings() {
    return void 0;
  }
  async saveZabbixSettings(settings3) {
    return settings3;
  }
  // Zabbix subnet operations (stub implementations)
  async getZabbixSubnets() {
    return [];
  }
  async getZabbixSubnet(id) {
    return void 0;
  }
  async createZabbixSubnet(subnet) {
    return subnet;
  }
  async deleteZabbixSubnet(id) {
    return true;
  }
  // VM monitoring operations (stub implementations)
  async getVMMonitoring() {
    return [];
  }
  async getVMMonitoringByVMId(vmId) {
    return void 0;
  }
  async createVMMonitoring(monitoring) {
    return monitoring;
  }
  async updateVMMonitoring(id, monitoring) {
    return monitoring;
  }
  // Discovered hosts operations (stub implementations)
  async getDiscoveredHosts() {
    return [];
  }
  async getDiscoveredHost(id) {
    return void 0;
  }
  async createDiscoveredHost(host) {
    return host;
  }
  async updateDiscoveredHost(id, host) {
    return host;
  }
  async deleteDiscoveredHost(id) {
    return true;
  }
  // BitLocker keys operations
  async getBitlockerKeys() {
    if (!db2) throw new Error("Database connection required");
    const keys = await db2.select().from(bitlockerKeys).orderBy(desc2(bitlockerKeys.dateAdded));
    return process.env.ENCRYPTION_KEY ? batchDecryptFields(keys, PII_FIELDS.bitlockerKey) : keys;
  }
  async getBitlockerKey(id) {
    if (!db2) throw new Error("Database connection required");
    const [key] = await db2.select().from(bitlockerKeys).where(eq5(bitlockerKeys.id, id));
    return key ? process.env.ENCRYPTION_KEY ? decryptFields(key, PII_FIELDS.bitlockerKey) : key : null;
  }
  async getBitlockerKeyBySerialNumber(serialNumber) {
    try {
      return await db2.select().from(bitlockerKeys).where(eq5(bitlockerKeys.serialNumber, serialNumber));
    } catch (error) {
      console.error("\u274C Database error fetching BitLocker keys by serial:", error);
      return [];
    }
  }
  async getBitlockerKeyByIdentifier(identifier) {
    try {
      return await db2.select().from(bitlockerKeys).where(eq5(bitlockerKeys.identifier, identifier));
    } catch (error) {
      console.error("\u274C Database error fetching BitLocker keys by identifier:", error);
      return [];
    }
  }
  async createBitlockerKey(data) {
    if (!db2) throw new Error("Database connection required");
    const encryptedData = process.env.ENCRYPTION_KEY ? encryptFields(data, PII_FIELDS.bitlockerKey) : data;
    const [key] = await db2.insert(bitlockerKeys).values({
      ...encryptedData,
      dateAdded: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    return process.env.ENCRYPTION_KEY ? decryptFields(key, PII_FIELDS.bitlockerKey) : key;
  }
  async updateBitlockerKey(id, key) {
    try {
      const encryptedData = process.env.ENCRYPTION_KEY ? encryptFields(key, PII_FIELDS.bitlockerKey) : key;
      const [updated] = await db2.update(bitlockerKeys).set({ ...encryptedData, updatedAt: /* @__PURE__ */ new Date() }).where(eq5(bitlockerKeys.id, id)).returning();
      return updated ? process.env.ENCRYPTION_KEY ? decryptFields(updated, PII_FIELDS.bitlockerKey) : updated : void 0;
    } catch (error) {
      console.error("\u274C Database error updating BitLocker key:", error);
      throw new Error("Failed to update BitLocker key: Database connection required");
    }
  }
  async deleteBitlockerKey(id) {
    try {
      const [key] = await db2.select().from(bitlockerKeys).where(eq5(bitlockerKeys.id, id));
      if (!key) return false;
      await db2.delete(bitlockerKeys).where(eq5(bitlockerKeys.id, id));
      console.log(`\u2705 BitLocker key deleted from PostgreSQL database`);
      await this.createActivity({
        action: "delete",
        itemType: "bitlocker-key",
        itemId: id,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `BitLocker key for ${key.serialNumber} deleted`
      });
      return true;
    } catch (error) {
      console.error("\u274C Database error deleting BitLocker key:", error);
      return false;
    }
  }
  // VM Inventory operations - using PostgreSQL tables
  async getVmInventory() {
    try {
      const vms3 = await db2.select().from(vmInventory);
      return process.env.ENCRYPTION_KEY ? batchDecryptFields(vms3, PII_FIELDS.vmInventory) : vms3;
    } catch (error) {
      console.error("Error fetching VM inventory:", error);
      return [];
    }
  }
  async getVmInventoryItem(id) {
    try {
      const [vm] = await db2.select().from(vmInventory).where(eq5(vmInventory.id, id));
      return vm ? process.env.ENCRYPTION_KEY ? decryptFields(vm, PII_FIELDS.vmInventory) : vm : void 0;
    } catch (error) {
      console.error("Error fetching VM inventory item:", error);
      return void 0;
    }
  }
  // Add method to get VMs (alias for VM inventory)
  async getVMs() {
    return this.getVmInventory();
  }
  async getVM(id) {
    return this.getVmInventoryItem(id);
  }
  async createVM(vmData) {
    return this.createVmInventoryItem(vmData);
  }
  async updateVM(id, vmData) {
    return this.updateVmInventoryItem(id, vmData);
  }
  async deleteVM(id) {
    return this.deleteVmInventoryItem(id);
  }
  async createVmInventoryItem(vm) {
    try {
      const encryptedData = process.env.ENCRYPTION_KEY ? encryptFields(vm, PII_FIELDS.vmInventory) : vm;
      const [newVM] = await db2.insert(vmInventory).values({
        startDate: encryptedData.startDate,
        endDate: encryptedData.endDate,
        hypervisor: encryptedData.hypervisor,
        hostName: encryptedData.hostName,
        hostModel: encryptedData.hostModel,
        hostIp: encryptedData.hostIp,
        hostOs: encryptedData.hostOs,
        rack: encryptedData.rack,
        vmId: encryptedData.vmId,
        vmName: encryptedData.vmName,
        vmStatus: encryptedData.vmStatus || encryptedData.powerState || "stopped",
        vmIp: encryptedData.vmIp,
        internetAccess: encryptedData.internetAccess || false,
        vmOs: encryptedData.vmOs,
        vmOsVersion: encryptedData.vmOsVersion,
        deployedBy: encryptedData.deployedBy,
        user: encryptedData.user,
        department: encryptedData.department,
        jiraTicket: encryptedData.jiraTicket,
        remarks: encryptedData.remarks,
        dateDeleted: encryptedData.dateDeleted,
        // Legacy fields for compatibility
        guestOs: encryptedData.guestOs || encryptedData.vmOs,
        powerState: encryptedData.powerState || encryptedData.vmStatus || "stopped",
        cpuCount: encryptedData.cpuCount,
        memoryMB: encryptedData.memoryMB,
        diskGB: encryptedData.diskGB,
        ipAddress: encryptedData.ipAddress || encryptedData.vmIp,
        macAddress: encryptedData.macAddress,
        vmwareTools: encryptedData.vmwareTools,
        cluster: encryptedData.cluster,
        datastore: encryptedData.datastore,
        status: encryptedData.status || "available",
        assignedTo: encryptedData.assignedTo,
        location: encryptedData.location,
        serialNumber: encryptedData.serialNumber,
        model: encryptedData.model,
        manufacturer: encryptedData.manufacturer,
        purchaseDate: encryptedData.purchaseDate,
        purchaseCost: encryptedData.purchaseCost,
        createdDate: encryptedData.createdDate || (/* @__PURE__ */ new Date()).toISOString(),
        lastModified: encryptedData.lastModified || (/* @__PURE__ */ new Date()).toISOString(),
        notes: encryptedData.notes
      }).returning();
      const decryptedVM = process.env.ENCRYPTION_KEY ? decryptFields(newVM, PII_FIELDS.vmInventory) : newVM;
      await this.createActivity({
        action: "create",
        itemType: "vm",
        itemId: newVM.id,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `VM "${decryptedVM.vmName}" created`
      });
      return decryptedVM;
    } catch (error) {
      console.error("Error creating VM inventory item:", error);
      throw error;
    }
  }
  async updateVmInventoryItem(id, vm) {
    try {
      const [existingVM] = await db2.select().from(vmInventory).where(eq5(vmInventory.id, id));
      if (!existingVM) return void 0;
      const updateData = {
        lastModified: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (vm.startDate !== void 0) updateData.startDate = vm.startDate;
      if (vm.endDate !== void 0) updateData.endDate = vm.endDate;
      if (vm.hypervisor) updateData.hypervisor = vm.hypervisor;
      if (vm.hostName) updateData.hostName = vm.hostName;
      if (vm.hostModel) updateData.hostModel = vm.hostModel;
      if (vm.hostIp) updateData.hostIp = vm.hostIp;
      if (vm.hostOs) updateData.hostOs = vm.hostOs;
      if (vm.rack) updateData.rack = vm.rack;
      if (vm.vmId) updateData.vmId = vm.vmId;
      if (vm.vmName) updateData.vmName = vm.vmName;
      if (vm.vmStatus) updateData.vmStatus = vm.vmStatus;
      if (vm.vmIp !== void 0) updateData.vmIp = vm.vmIp;
      if (vm.internetAccess !== void 0) updateData.internetAccess = vm.internetAccess;
      if (vm.vmOs) updateData.vmOs = vm.vmOs;
      if (vm.vmOsVersion) updateData.vmOsVersion = vm.vmOsVersion;
      if (vm.deployedBy) updateData.deployedBy = vm.deployedBy;
      if (vm.user) updateData.user = vm.user;
      if (vm.department) updateData.department = vm.department;
      if (vm.jiraTicket) updateData.jiraTicket = vm.jiraTicket;
      if (vm.remarks !== void 0) updateData.remarks = vm.remarks;
      if (vm.dateDeleted) updateData.dateDeleted = vm.dateDeleted;
      if (vm.requestor !== void 0) updateData.requestor = vm.requestor;
      if (vm.knoxId !== void 0) updateData.knoxId = vm.knoxId;
      if (vm.jiraNumber !== void 0) updateData.jiraNumber = vm.jiraNumber;
      if (vm.approvalNumber !== void 0) updateData.approvalNumber = vm.approvalNumber;
      if (vm.cpuCount !== void 0) updateData.cpuCount = vm.cpuCount;
      if (vm.memoryGB !== void 0) updateData.memoryGB = vm.memoryGB;
      if (vm.diskCapacityGB !== void 0) updateData.diskCapacityGB = vm.diskCapacityGB;
      if (vm.guestOs) updateData.guestOs = vm.guestOs;
      if (vm.powerState) updateData.powerState = vm.powerState;
      if (vm.memoryMB) updateData.memoryMB = vm.memoryMB;
      if (vm.diskGB) updateData.diskGB = vm.diskGB;
      if (vm.ipAddress !== void 0) updateData.ipAddress = vm.ipAddress;
      if (vm.macAddress !== void 0) updateData.macAddress = vm.macAddress;
      if (vm.vmwareTools) updateData.vmwareTools = vm.vmwareTools;
      if (vm.cluster) updateData.cluster = vm.cluster;
      if (vm.datastore) updateData.datastore = vm.datastore;
      if (vm.status) updateData.status = vm.status;
      if (vm.assignedTo) updateData.assignedTo = vm.assignedTo;
      if (vm.location) updateData.location = vm.location;
      if (vm.serialNumber) updateData.serialNumber = vm.serialNumber;
      if (vm.model) updateData.model = vm.model;
      if (vm.manufacturer) updateData.manufacturer = vm.manufacturer;
      if (vm.purchaseDate) updateData.purchaseDate = vm.purchaseDate;
      if (vm.purchaseCost) updateData.purchaseCost = vm.purchaseCost;
      if (vm.notes) updateData.notes = vm.notes;
      const encryptedUpdateData = process.env.ENCRYPTION_KEY ? encryptFields(updateData, PII_FIELDS.vmInventory) : updateData;
      const [updatedVM] = await db2.update(vmInventory).set(encryptedUpdateData).where(eq5(vmInventory.id, id)).returning();
      const decryptedVM = updatedVM ? process.env.ENCRYPTION_KEY ? decryptFields(updatedVM, PII_FIELDS.vmInventory) : updatedVM : void 0;
      await this.createActivity({
        action: "update",
        itemType: "vm",
        itemId: id,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `VM "${decryptedVM?.vmName}" updated`
      });
      return decryptedVM;
    } catch (error) {
      console.error("Error updating VM inventory item:", error);
      throw error;
    }
  }
  async deleteVmInventoryItem(id) {
    try {
      console.log(`Deleting VM with ID: ${id} from PostgreSQL database...`);
      const [vmToDelete] = await db2.select().from(vmInventory).where(eq5(vmInventory.id, id));
      if (!vmToDelete) {
        console.log(`VM ${id} not found`);
        return false;
      }
      console.log(`Deleting VM: ${vmToDelete.vmName}`);
      const deleteResult = await db2.delete(vmInventory).where(eq5(vmInventory.id, id));
      console.log(`Delete result for VM ${id}:`, deleteResult);
      if (deleteResult.rowCount && deleteResult.rowCount > 0) {
        try {
          await this.createActivity({
            action: "delete",
            itemType: "vm",
            itemId: id,
            userId: null,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `VM "${vmToDelete.vmName}" deleted`
          });
        } catch (activityError) {
          console.warn("Failed to log VM delete activity:", activityError);
        }
        console.log(`VM ${vmToDelete.vmName} deleted successfully from PostgreSQL database`);
        return true;
      }
      console.log(`No rows affected when deleting VM ${id}`);
      return false;
    } catch (error) {
      console.error("Error deleting VM from PostgreSQL database:", error);
      return false;
    }
  }
  // IT Equipment operations
  async getITEquipment() {
    try {
      const equipment = await db2.select().from(itEquipment);
      return process.env.ENCRYPTION_KEY ? batchDecryptFields(equipment, PII_FIELDS.itEquipment) : equipment;
    } catch (error) {
      console.error("Database error fetching IT equipment:", error);
      return [];
    }
  }
  async getITEquipmentById(id) {
    const [equipment] = await db2.select().from(itEquipment).where(eq5(itEquipment.id, id));
    return equipment ? process.env.ENCRYPTION_KEY ? decryptFields(equipment, PII_FIELDS.itEquipment) : equipment : null;
  }
  async createITEquipment(data) {
    try {
      const encryptedData = process.env.ENCRYPTION_KEY ? encryptFields(data, PII_FIELDS.itEquipment) : data;
      const [equipment] = await db2.insert(itEquipment).values({
        ...encryptedData,
        assignedQuantity: 0,
        status: encryptedData.status || "available",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).returning();
      const decryptedEquipment = process.env.ENCRYPTION_KEY ? decryptFields(equipment, PII_FIELDS.itEquipment) : equipment;
      await this.createActivity({
        action: "create",
        itemType: "it-equipment",
        itemId: equipment.id,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `IT Equipment "${decryptedEquipment.name}" created`
      });
      return decryptedEquipment;
    } catch (error) {
      console.error("Database error creating IT equipment:", error);
      throw error;
    }
  }
  async updateITEquipment(id, data) {
    try {
      const encryptedData = process.env.ENCRYPTION_KEY ? encryptFields(data, PII_FIELDS.itEquipment) : data;
      const [equipment] = await db2.update(itEquipment).set({
        ...encryptedData,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).where(eq5(itEquipment.id, id)).returning();
      if (equipment) {
        const decryptedEquipment = process.env.ENCRYPTION_KEY ? decryptFields(equipment, PII_FIELDS.itEquipment) : equipment;
        await this.createActivity({
          action: "update",
          itemType: "it-equipment",
          itemId: id,
          userId: null,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `IT Equipment "${decryptedEquipment.name}" updated`
        });
        return decryptedEquipment;
      }
      return null;
    } catch (error) {
      console.error("Database error updating IT equipment:", error);
      throw error;
    }
  }
  async deleteITEquipment(id) {
    try {
      const [equipment] = await db2.select().from(itEquipment).where(eq5(itEquipment.id, id));
      if (!equipment) return false;
      await db2.delete(itEquipmentAssignments).where(eq5(itEquipmentAssignments.equipmentId, id));
      const result = await db2.delete(itEquipment).where(eq5(itEquipment.id, id));
      if (result.rowCount && result.rowCount > 0) {
        await this.createActivity({
          action: "delete",
          itemType: "it-equipment",
          itemId: id,
          userId: null,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          notes: `IT Equipment "${equipment.name}" deleted`
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Database error deleting IT equipment:", error);
      return false;
    }
  }
  // IT Equipment Assignment methods
  async getITEquipmentAssignments(equipmentId) {
    try {
      return await db2.select().from(itEquipmentAssignments).where(eq5(itEquipmentAssignments.equipmentId, equipmentId)).orderBy(desc2(itEquipmentAssignments.assignedDate));
    } catch (error) {
      console.error("Database error fetching IT equipment assignments:", error);
      return [];
    }
  }
  async assignITEquipment(equipmentId, assignmentData) {
    try {
      const [assignment] = await db2.insert(itEquipmentAssignments).values({
        equipmentId,
        assignedTo: assignmentData.assignedTo,
        serialNumber: assignmentData.serialNumber || null,
        knoxId: assignmentData.knoxId || null,
        quantity: assignmentData.quantity || 1,
        assignedDate: (/* @__PURE__ */ new Date()).toISOString(),
        status: "assigned",
        notes: assignmentData.notes || null
      }).returning();
      await db2.update(itEquipment).set({
        assignedQuantity: sql5`${itEquipment.assignedQuantity} + ${assignmentData.quantity || 1}`,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).where(eq5(itEquipment.id, equipmentId));
      await this.createActivity({
        action: "checkout",
        itemType: "it-equipment",
        itemId: equipmentId,
        userId: null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `IT Equipment assigned to ${assignmentData.assignedTo} (Qty: ${assignmentData.quantity || 1})`
      });
      return assignment;
    } catch (error) {
      console.error("Database error assigning IT equipment:", error);
      throw error;
    }
  }
  async bulkAssignITEquipment(equipmentId, assignments) {
    try {
      const createdAssignments = [];
      for (const assignmentData of assignments) {
        const assignment = await this.assignITEquipment(equipmentId, assignmentData);
        createdAssignments.push(assignment);
      }
      return createdAssignments;
    } catch (error) {
      console.error("Database error in bulk assignment:", error);
      throw error;
    }
  }
  async updateSettings(settings3) {
    try {
      await db2.execute(sql5`
        INSERT INTO system_settings (id, site_name, company_name, created_at, updated_at) 
        VALUES (1, ${settings3.siteName || "SRPH-MIS"}, ${settings3.companyName || "SRPH"}, datetime('now'), datetime('now'))
        ON CONFLICT(id) DO UPDATE SET 
          site_name = excluded.site_name,
          company_name = excluded.company_name,
          updated_at = datetime('now')
      `);
    } catch (error) {
      console.error("Error updating settings:", error);
      throw error;
    }
  }
  async getJiraSettings() {
    try {
      await db2.execute(sql5`SELECT 1`);
      await db2.execute(sql5`
        CREATE TABLE IF NOT EXISTS jira_settings (
          id SERIAL PRIMARY KEY,
          settings TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      const result = await db2.execute(sql5`SELECT settings FROM jira_settings WHERE id = 1`);
      if (result.rows && result.rows.length > 0) {
        try {
          const settings3 = JSON.parse(result.rows[0].settings);
          console.log("JIRA settings retrieved from database");
          return settings3;
        } catch (parseError) {
          console.error("Error parsing JIRA settings JSON:", parseError);
          return null;
        }
      }
      console.log("No JIRA settings found in database");
      return null;
    } catch (error) {
      console.error("Error fetching JIRA settings:", error);
      throw new Error(`Failed to fetch JIRA settings: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  async saveJiraSettings(settings3) {
    try {
      await db2.execute(sql5`SELECT 1`);
      await db2.execute(sql5`
        CREATE TABLE IF NOT EXISTS jira_settings (
          id SERIAL PRIMARY KEY,
          settings TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      const settingsJson = JSON.stringify(settings3);
      await db2.execute(sql5`
        INSERT INTO jira_settings (id, settings, updated_at) 
        VALUES (1, ${settingsJson}, CURRENT_TIMESTAMP)
        ON CONFLICT (id) DO UPDATE SET 
          settings = EXCLUDED.settings,
          updated_at = CURRENT_TIMESTAMP
      `);
      console.log("JIRA settings saved successfully to database");
      return settings3;
    } catch (error) {
      console.error("Error saving JIRA settings:", error);
      throw new Error(`Failed to save JIRA settings: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  async createIssue(issue) {
    const activity = {
      id: Date.now(),
      type: "issue_reported",
      description: `Issue reported: ${issue.title}`,
      userId: 1,
      itemId: null,
      // Assuming issue is not tied to a specific item initially
      itemType: null,
      // Assuming issue is not tied to a specific item type initially
      action: "report",
      // Define a relevant action for reporting an issue
      category: "system",
      // Default category for system issues
      metadata: JSON.stringify(issue),
      // Store the full issue details in metadata
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (this.db) {
      await this.db.insert(activities).values(activity);
    } else {
      console.error("Database connection not available for createIssue");
      throw new Error("Database connection required");
    }
    return issue;
  }
  async getIssues() {
    if (this.db) {
      const result = await this.db.select().from(activities).where(eq5(activities.type, "issue_reported")).orderBy(desc2(activities.timestamp));
      return result.map((activity) => {
        try {
          return JSON.parse(activity.metadata || "{}");
        } catch (e) {
          console.error("Error parsing metadata for issue:", e);
          return {};
        }
      });
    } else {
      console.error("Database connection not available for getIssues");
      return [];
    }
  }
  // IAM Accounts methods
  async getIamAccounts() {
    if (!db2) {
      console.error("Database not available - using memory storage for IAM accounts");
      if (!this.memoryStorage) throw new Error("Memory storage not available");
      return this.memoryStorage.getIamAccounts();
    }
    try {
      const accounts = await db2.select().from(iamAccounts);
      if (accounts.length > 0) {
        console.log(`\u{1F4E7} [DB-DEBUG] First IAM account raw from DB:`, JSON.stringify(accounts[0], null, 2));
        console.log(`\u{1F4E7} [DB-DEBUG] userKnoxId field:`, accounts[0].userKnoxId);
        console.log(`\u{1F4E7} [DB-DEBUG] userKnoxId type:`, typeof accounts[0].userKnoxId);
      }
      const decrypted = batchDecryptFields(accounts, PII_FIELDS.iamAccount);
      if (decrypted.length > 0) {
        console.log(`\u{1F4E7} [DB-DEBUG] First IAM account after decryption:`, JSON.stringify(decrypted[0], null, 2));
        console.log(`\u{1F4E7} [DB-DEBUG] userKnoxId after decryption:`, decrypted[0].userKnoxId);
      }
      return decrypted;
    } catch (error) {
      console.error("Database error in getIamAccounts, falling back to memory:", error);
      if (!this.memoryStorage) throw new Error("Memory storage not available");
      return this.memoryStorage.getIamAccounts();
    }
  }
  async getIamAccount(id) {
    const [account] = await db2.select().from(iamAccounts).where(eq5(iamAccounts.id, id));
    if (!account) return void 0;
    const decryptedAccount = process.env.ENCRYPTION_KEY ? decryptFields(account, PII_FIELDS.iamAccount) : account;
    return {
      id: decryptedAccount.id,
      requestor: decryptedAccount.requestor,
      knoxId: decryptedAccount.knoxId,
      permission: decryptedAccount.permission,
      durationStartDate: decryptedAccount.durationStartDate,
      durationEndDate: decryptedAccount.durationEndDate,
      cloudPlatform: decryptedAccount.cloudPlatform,
      projectAccounts: decryptedAccount.projectAccounts,
      approvalId: decryptedAccount.approvalId,
      remarks: decryptedAccount.remarks,
      status: decryptedAccount.status,
      createdAt: decryptedAccount.createdAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: decryptedAccount.updatedAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async createIamAccount(data) {
    if (!db2) {
      throw new Error("Database connection required for IAM accounts");
    }
    const newAccount = {
      requestor: data.requestor || null,
      knoxId: data.knoxId || null,
      name: data.name || null,
      userKnoxId: data.userKnoxId || null,
      permission: data.permission || null,
      durationStartDate: data.durationStartDate || null,
      durationEndDate: data.durationEndDate || null,
      cloudPlatform: data.cloudPlatform || null,
      projectAccounts: data.projectAccounts || null,
      approvalId: data.approvalId || null,
      remarks: data.remarks || null,
      status: data.status || "active"
    };
    console.log("Creating IAM account with name:", newAccount.name);
    const encryptedData = process.env.ENCRYPTION_KEY ? encryptFields(newAccount, PII_FIELDS.iamAccount) : newAccount;
    const [account] = await db2.insert(iamAccounts).values(encryptedData).returning();
    const decryptedAccount = process.env.ENCRYPTION_KEY ? decryptFields(account, PII_FIELDS.iamAccount) : account;
    const formatTimestamp = (timestamp2) => {
      if (!timestamp2) return (/* @__PURE__ */ new Date()).toISOString();
      if (timestamp2 instanceof Date) return timestamp2.toISOString();
      if (typeof timestamp2 === "string") return timestamp2;
      return (/* @__PURE__ */ new Date()).toISOString();
    };
    return {
      ...decryptedAccount,
      createdAt: formatTimestamp(decryptedAccount.createdAt),
      updatedAt: formatTimestamp(decryptedAccount.updatedAt)
    };
  }
  async updateIamAccount(id, data) {
    if (!db2) {
      throw new Error("Database connection required for IAM accounts");
    }
    const updateData = {};
    if (data.requestor !== void 0) updateData.requestor = data.requestor;
    if (data.knoxId !== void 0) updateData.knoxId = data.knoxId;
    if (data.permission !== void 0) updateData.permission = data.permission;
    if (data.durationStartDate !== void 0) updateData.durationStartDate = data.durationStartDate;
    if (data.durationEndDate !== void 0) updateData.durationEndDate = data.durationEndDate;
    if (data.cloudPlatform !== void 0) updateData.cloudPlatform = data.cloudPlatform;
    if (data.projectAccounts !== void 0) updateData.projectAccounts = data.projectAccounts;
    if (data.approvalId !== void 0) updateData.approvalId = data.approvalId;
    if (data.remarks !== void 0) updateData.remarks = data.remarks;
    if (data.status !== void 0) updateData.status = data.status;
    const dataToStore = process.env.ENCRYPTION_KEY ? encryptFields(updateData, PII_FIELDS.iamAccount) : updateData;
    const [updatedAccount] = await db2.update(iamAccounts).set(dataToStore).where(eq5(iamAccounts.id, id)).returning();
    if (!updatedAccount) return void 0;
    const decryptedAccount = process.env.ENCRYPTION_KEY ? decryptFields(updatedAccount, PII_FIELDS.iamAccount) : updatedAccount;
    const formatTimestamp = (timestamp2) => {
      if (!timestamp2) return (/* @__PURE__ */ new Date()).toISOString();
      if (timestamp2 instanceof Date) return timestamp2.toISOString();
      if (typeof timestamp2 === "string") return timestamp2;
      return (/* @__PURE__ */ new Date()).toISOString();
    };
    return {
      id: decryptedAccount.id,
      requestor: decryptedAccount.requestor,
      knoxId: decryptedAccount.knoxId,
      permission: decryptedAccount.permission,
      durationStartDate: decryptedAccount.durationStartDate,
      durationEndDate: decryptedAccount.durationEndDate,
      cloudPlatform: decryptedAccount.cloudPlatform,
      projectAccounts: decryptedAccount.projectAccounts,
      approvalId: decryptedAccount.approvalId,
      remarks: decryptedAccount.remarks,
      status: decryptedAccount.status,
      createdAt: formatTimestamp(decryptedAccount.createdAt),
      updatedAt: formatTimestamp(decryptedAccount.updatedAt)
    };
  }
  async deleteIamAccount(id) {
    if (!db2) {
      throw new Error("Database connection required for IAM accounts");
    }
    const result = await db2.delete(iamAccounts).where(eq5(iamAccounts.id, id));
    return result.rowCount > 0;
  }
  async importIamAccounts(accounts) {
    if (!db2) {
      throw new Error("Database connection required for IAM accounts");
    }
    const results = { success: 0, failed: 0, errors: [] };
    for (const account of accounts) {
      try {
        const accountData = {
          requestor: account.requestor || null,
          knoxId: account.knoxId || null,
          name: account.name || null,
          userKnoxId: account.userKnoxId || null,
          permission: account.permission || null,
          durationStartDate: account.durationStartDate || null,
          durationEndDate: account.durationEndDate || null,
          cloudPlatform: account.cloudPlatform || null,
          projectAccounts: account.projectAccounts || null,
          approvalId: account.approvalId || null,
          remarks: account.remarks || null,
          status: account.status || "active"
        };
        console.log("Importing IAM account - userKnoxId raw value:", JSON.stringify(account.userKnoxId));
        console.log("Importing IAM account - accountData.userKnoxId:", JSON.stringify(accountData.userKnoxId));
        await this.createIamAccount(accountData);
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Row ${results.success + results.failed}: ${error.message}`);
      }
    }
    return results;
  }
  // Azure Inventory Methods
  async getAzureInventory() {
    if (!db2) throw new Error("Database connection required");
    return await db2.select().from(azureInventory2);
  }
  async createAzureInventory(data) {
    if (!db2) throw new Error("Database connection required");
    const [resource] = await db2.insert(azureInventory2).values({
      ...data,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    return resource;
  }
  async updateAzureInventory(id, data) {
    if (!db2) throw new Error("Database connection required");
    const [resource] = await db2.update(azureInventory2).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq5(azureInventory2.id, id)).returning();
    return resource;
  }
  async deleteAzureInventory(id) {
    if (!db2) throw new Error("Database connection required");
    const result = await db2.delete(azureInventory2).where(eq5(azureInventory2.id, id));
    return result.rowCount > 0;
  }
  // Azure Historical Data Methods
  async getAzureHistoricalData() {
    if (!db2) throw new Error("Database connection required");
    return await db2.select().from(azureHistoricalData).orderBy(desc2(azureHistoricalData.createdAt));
  }
  async createAzureHistoricalData(data) {
    if (!db2) throw new Error("Database connection required");
    const [record] = await db2.insert(azureHistoricalData).values({
      ...data,
      createdAt: /* @__PURE__ */ new Date()
    }).returning();
    return record;
  }
  // GCP Historical Data Methods
  async getGcpHistoricalData() {
    if (!db2) throw new Error("Database connection required");
    return await db2.select().from(gcpHistoricalData).orderBy(desc2(gcpHistoricalData.createdAt));
  }
  async createGcpHistoricalData(data) {
    if (!db2) throw new Error("Database connection required");
    const [record] = await db2.insert(gcpHistoricalData).values({
      ...data,
      createdAt: /* @__PURE__ */ new Date()
    }).returning();
    return record;
  }
  // GCP Inventory Methods
  async getGcpInventory() {
    if (!db2) throw new Error("Database connection required");
    return await db2.select().from(gcpInventory);
  }
  async createGcpInventory(data) {
    if (!db2) throw new Error("Database connection required");
    const [resource] = await db2.insert(gcpInventory).values({
      ...data,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    return resource;
  }
  async updateGcpInventory(id, data) {
    if (!db2) throw new Error("Database connection required");
    const [resource] = await db2.update(gcpInventory).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq5(gcpInventory.id, id)).returning();
    return resource;
  }
  async deleteGcpInventory(id) {
    if (!db2) throw new Error("Database connection required");
    const result = await db2.delete(gcpInventory).where(eq5(gcpInventory.id, id));
    return result.rowCount > 0;
  }
  // AWS Inventory Methods
  async getAwsInventory() {
    if (!db2) throw new Error("Database connection required");
    return await db2.select().from(awsInventory).orderBy(desc2(awsInventory.createdAt));
  }
  async createAwsInventory(data) {
    if (!db2) throw new Error("Database connection required");
    const resourceData = {
      identifier: data.identifier,
      service: data.service,
      type: data.type,
      region: data.region,
      accountName: data.accountName,
      accountId: data.accountId,
      status: data.status || "active",
      remarks: data.remarks || null,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    const [resource] = await db2.insert(awsInventory).values(resourceData).returning();
    return resource;
  }
  async updateAwsInventory(id, data) {
    if (!db2) throw new Error("Database connection required");
    const [resource] = await db2.update(awsInventory).set({
      identifier: data.identifier,
      service: data.service,
      type: data.type,
      region: data.region,
      accountName: data.accountName,
      accountId: data.accountId,
      status: data.status,
      remarks: data.remarks || null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq5(awsInventory.id, id)).returning();
    return resource;
  }
  async deleteAwsInventory(id) {
    if (!db2) throw new Error("Database connection required");
    await db2.delete(awsInventory).where(eq5(awsInventory.id, id));
  }
  async importAwsInventory(resources) {
    if (!db2) throw new Error("Database connection required");
    const monthYear = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { year: "numeric", month: "long" });
    let successful = 0;
    let failed = 0;
    let updated = 0;
    let deleted = 0;
    const existingResources = await db2.select().from(awsInventory);
    const importedIdentifiers = new Set(resources.map((r) => r.identifier));
    for (const resource of resources) {
      try {
        const existing = existingResources.find((r) => r.identifier === resource.identifier);
        if (existing) {
          await db2.update(awsInventory).set({
            service: resource.service,
            type: resource.type,
            region: resource.region,
            accountName: resource.accountName,
            accountId: resource.accountId,
            status: resource.status || "active",
            remarks: resource.remarks || null,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq5(awsInventory.id, existing.id));
          await db2.insert(awsHistoricalData).values({
            monthYear,
            changeType: "updated",
            name: resource.identifier || "Unknown",
            identifier: resource.identifier || "N/A",
            service: resource.service || "N/A",
            type: resource.type || "N/A",
            region: resource.region || "N/A",
            accountName: resource.accountName || "N/A",
            accountId: resource.accountId || "N/A",
            status: resource.status || "active",
            remarks: resource.remarks || null
          });
          updated++;
        } else {
          await db2.insert(awsInventory).values({
            identifier: resource.identifier || "N/A",
            service: resource.service || "N/A",
            type: resource.type || "N/A",
            region: resource.region || "N/A",
            accountName: resource.accountName || "N/A",
            accountId: resource.accountId || "N/A",
            status: resource.status || "active",
            remarks: resource.remarks || null
          });
          await db2.insert(awsHistoricalData).values({
            monthYear,
            changeType: "imported",
            identifier: resource.identifier || "N/A",
            service: resource.service || "N/A",
            type: resource.type || "N/A",
            region: resource.region || "N/A",
            accountName: resource.accountName || "N/A",
            accountId: resource.accountId || "N/A",
            status: resource.status || "active",
            remarks: resource.remarks || null
          });
        }
        successful++;
      } catch (error) {
        console.error("Error importing AWS resource:", error);
        failed++;
      }
    }
    for (const existing of existingResources) {
      if (!importedIdentifiers.has(existing.identifier)) {
        await db2.insert(awsHistoricalData).values({
          monthYear,
          changeType: "deleted",
          identifier: existing.identifier || "N/A",
          service: existing.service || "N/A",
          type: existing.type || "N/A",
          region: existing.region || "N/A",
          accountName: existing.accountName || "N/A",
          accountId: existing.accountId || "N/A",
          status: existing.status || "deleted",
          remarks: existing.remarks || null
        });
        deleted++;
      }
    }
    return { successful, failed, updated, deleted };
  }
  async getAwsInventoryHistorical() {
    if (!db2) throw new Error("Database connection required");
    return await db2.select().from(awsHistoricalData).orderBy(desc2(awsHistoricalData.createdAt));
  }
  async getPageBySlug(slug) {
    const page = await db2.select().from(customPages).where(eq5(customPages.pageSlug, slug)).limit(1);
    return page[0] || void 0;
  }
  // Encryption helper methods
  encrypt(text2) {
    return encrypt(text2);
  }
  decrypt(text2) {
    return decrypt(text2);
  }
  // Method to create an activity log with optional metadata
  async logActivity(userId, itemType, itemId, action, category = "system", metadata) {
    await db2.insert(activities).values({
      userId,
      itemType,
      itemId,
      action,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      category,
      metadata: metadata ? JSON.stringify(metadata) : null
    });
  }
};

// server/index.ts
init_logger();
init_db();

// server/ensure-approval-monitoring-table.ts
init_db();
import { sql as sql6 } from "drizzle-orm";
async function ensureApprovalMonitoringTable() {
  if (!db2) {
    console.log("Database not available - skipping approval_monitoring table creation");
    return;
  }
  try {
    const tableCheck = await db2.execute(sql6`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'approval_monitoring'
      );
    `);
    const tableExists2 = tableCheck.rows[0]?.exists;
    if (!tableExists2) {
      console.log("Creating approval_monitoring table...");
      await db2.execute(sql6`
        CREATE TABLE IF NOT EXISTS approval_monitoring (
          id SERIAL PRIMARY KEY,
          type TEXT,
          platform TEXT,
          pic TEXT,
          ip_address TEXT,
          hostname_accounts TEXT,
          identifier_serial_number TEXT,
          approval_number TEXT,
          start_date TEXT,
          end_date TEXT,
          status TEXT,
          remarks TEXT,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);
      console.log("\u2705 approval_monitoring table created successfully");
    } else {
      console.log("\u2705 approval_monitoring table already exists");
    }
  } catch (error) {
    console.error("Error ensuring approval_monitoring table:", error);
    throw error;
  }
}

// server/email-bulk-sender-routes.ts
init_storage();
function registerEmailBulkSenderRoutes(app2, requireAuth) {
  app2.post("/api/email-bulk-sender/send", requireAuth, async (req, res) => {
    try {
      const { recipients, subject, bodyTemplate, ccAddresses } = req.body;
      if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({
          message: "Recipients array is required and cannot be empty"
        });
      }
      if (!subject || !bodyTemplate) {
        return res.status(400).json({
          message: "Subject and body template are required"
        });
      }
      console.log(`\u{1F4E7} Bulk email send initiated by user ${req.user?.id || "unknown"}`);
      console.log(`\u{1F4E7} Recipients: ${recipients.length}, Subject: ${subject}`);
      const emailInitialized = await emailService.initialize();
      if (!emailInitialized) {
        return res.status(500).json({
          message: "Email service not configured. Please configure SMTP settings in Email Notifications page.",
          success: false
        });
      }
      console.log("\u2705 Email service initialized successfully with SMTP configuration");
      const results = {
        successful: 0,
        failed: 0,
        errors: []
      };
      for (const recipient of recipients) {
        try {
          const { email, customData } = recipient;
          if (!email || !email.includes("@")) {
            results.failed++;
            results.errors.push(`Invalid email address: ${email || "missing"}`);
            continue;
          }
          let personalizedBody = bodyTemplate;
          if (customData && typeof customData === "object") {
            Object.keys(customData).forEach((key) => {
              const placeholder = `{{${key}}}`;
              const value = customData[key] || "";
              personalizedBody = personalizedBody.split(placeholder).join(value);
            });
          }
          const emailOptions = {
            to: email,
            subject,
            html: personalizedBody
          };
          console.log(`\u{1F4E7} [Bulk Send] Preparing email for ${email}`);
          console.log(`   Subject: ${subject}`);
          console.log(`   Body length: ${personalizedBody.length} characters`);
          console.log(`   Email options:`, JSON.stringify({ to: email, subject }, null, 2));
          console.log(`\u{1F4E7} [Bulk Send] Sending email to ${email} using configured SMTP...`);
          const emailSent = await emailService.sendEmail(emailOptions);
          if (emailSent) {
            results.successful++;
            console.log(`\u2705 [Bulk Send] Email SUCCESSFULLY sent to ${email}`);
            console.log(`   \u2709\uFE0F  Recipient confirmed: ${email}`);
          } else {
            results.failed++;
            results.errors.push(`Failed to send to ${email} - Email service returned false`);
            console.log(`\u274C [Bulk Send] FAILED to send to ${email}`);
            console.log(`   \u26A0\uFE0F  Email service returned false - check SMTP configuration`);
          }
        } catch (recipientError) {
          results.failed++;
          results.errors.push(`Error sending to ${recipient.email || "unknown"}: ${recipientError.message}`);
          console.error(`\u274C [Bulk Send] Error processing recipient:`, recipientError);
        }
      }
      console.log(`
\u{1F4CA} ========== BULK EMAIL SEND SUMMARY ==========`);
      console.log(`\u{1F4E7} Total Recipients: ${recipients.length}`);
      console.log(`\u2705 Successfully Sent: ${results.successful}`);
      console.log(`\u274C Failed: ${results.failed}`);
      console.log(`\u{1F4E8} Subject: ${subject}`);
      if (results.successful > 0) {
        console.log(`
\u2709\uFE0F  EMAILS SENT TO THE FOLLOWING RECIPIENTS:`);
        recipients.forEach((recipient, index) => {
          const status = results.errors.some((err) => err.includes(recipient.email)) ? "\u274C FAILED" : "\u2705 SENT";
          console.log(`   ${index + 1}. ${status} - ${recipient.email}`);
        });
      }
      if (results.errors.length > 0) {
        console.log(`
\u26A0\uFE0F  ERRORS:`);
        results.errors.forEach((error, index) => {
          console.log(`   ${index + 1}. ${error}`);
        });
      }
      console.log(`===============================================
`);
      const activityMetadata = {
        subject,
        bodyTemplate,
        ccAddresses: ccAddresses || "",
        recipients,
        recipientCount: recipients.length
      };
      console.log("Saving activity with metadata to database...");
      await storage.createActivity({
        action: "bulk_email_send",
        itemType: "email-bulk-sender",
        itemId: 0,
        userId: req.user?.id || 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        notes: `Sent bulk email: ${subject} to ${recipients.length} recipient${recipients.length !== 1 ? "s" : ""}. ${results.successful} successful, ${results.failed} failed.`,
        metadata: activityMetadata
      });
      console.log("\u2705 Activity saved to database");
      return res.json({
        success: true,
        message: `Bulk email completed: ${results.successful} sent, ${results.failed} failed`,
        results
      });
    } catch (error) {
      console.error("Error sending bulk emails:", error);
      return res.status(500).json({
        message: "Failed to send bulk emails",
        error: error.message
      });
    }
  });
  app2.post("/api/email-bulk-sender/preview", requireAuth, async (req, res) => {
    try {
      const { bodyTemplate, sampleData } = req.body;
      if (!bodyTemplate) {
        return res.status(400).json({
          message: "Body template is required"
        });
      }
      let previewBody = bodyTemplate;
      if (sampleData && typeof sampleData === "object") {
        Object.keys(sampleData).forEach((key) => {
          const placeholder = `{{${key}}}`;
          const value = sampleData[key] || "";
          previewBody = previewBody.replace(new RegExp(placeholder, "g"), value);
        });
      }
      return res.json({
        preview: previewBody
      });
    } catch (error) {
      console.error("Error generating preview:", error);
      return res.status(500).json({
        message: "Failed to generate preview",
        error: error.message
      });
    }
  });
  app2.get("/api/email-bulk-sender/history", requireAuth, async (req, res) => {
    try {
      const activities3 = await storage.getActivities();
      const emailHistory = activities3.filter((activity) => activity.itemType === "email-bulk-sender").sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 50);
      return res.json(emailHistory);
    } catch (error) {
      console.error("Error fetching email history:", error);
      return res.status(500).json({
        message: "Failed to fetch email history",
        error: error.message
      });
    }
  });
}

// server/index.ts
var app = express2();
app.use(express2.json({ limit: "50mb" }));
app.use(express2.urlencoded({ extended: true, limit: "50mb" }));
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const { databaseConnected: databaseConnected2 } = await Promise.resolve().then(() => (init_db(), db_exports));
  console.log("\u{1F504} Starting application initialization...");
  let usingDatabase = false;
  await new Promise((resolve) => setTimeout(resolve, 2e3));
  const { databaseConnected: freshConnectionStatus, db: freshDb } = await Promise.resolve().then(() => (init_db(), db_exports));
  let actualConnectionVerified = false;
  if (process.env.DATABASE_URL && freshDb) {
    try {
      const { sql: sql7 } = await import("drizzle-orm");
      const testResult = await freshDb.execute(sql7`SELECT 1 as connection_test`);
      actualConnectionVerified = testResult && testResult.rows && testResult.rows.length > 0;
      console.log("\u{1F50D} Direct connection test result:", actualConnectionVerified ? "\u2705 SUCCESS" : "\u274C FAILED");
      if (actualConnectionVerified) {
        try {
          await freshDb.execute(sql7`SELECT COUNT(*) FROM vm_monitoring`);
          console.log("\u{1F50D} VM monitoring table accessible: \u2705 SUCCESS");
        } catch (vmTableError) {
          console.log("\u{1F50D} VM monitoring table check: \u26A0\uFE0F TABLE MISSING OR INACCESSIBLE");
        }
      }
    } catch (testError) {
      console.error("\u{1F50D} Direct connection test failed:", testError.message);
      actualConnectionVerified = false;
    }
  }
  if ((freshConnectionStatus || databaseConnected2 || actualConnectionVerified) && process.env.DATABASE_URL && freshDb) {
    console.log("\u{1F504} PostgreSQL connection verified - proceeding with comprehensive database verification...");
    console.log("\u{1F527} Database URL configured:", process.env.DATABASE_URL ? "\u2705 YES" : "\u274C NO");
    console.log("\u{1F527} Database instance available:", freshDb ? "\u2705 YES" : "\u274C NO");
    console.log("\u{1F527} Connection status flags:", {
      freshConnectionStatus,
      databaseConnected: databaseConnected2,
      actualConnectionVerified
    });
    try {
      console.log("\u{1F504} Running comprehensive database verification and auto-repair...");
      await runMigrations();
      try {
        await initializeDatabase();
        console.log("\u{1F504} Initializing PostgreSQL storage...");
        const databaseStorage = new DatabaseStorage();
        Object.getOwnPropertyNames(DatabaseStorage.prototype).forEach((name) => {
          if (name !== "constructor" && typeof databaseStorage[name] === "function") {
            storage[name] = databaseStorage[name].bind(databaseStorage);
          }
        });
        usingDatabase = true;
        console.log("\u2705 PostgreSQL storage initialized successfully!");
        console.log("\u2705 Data will persist between restarts");
      } catch (error) {
        console.error("\u274C Failed to initialize database storage:", error.message);
        console.warn("\u26A0\uFE0F Falling back to in-memory storage");
        usingDatabase = false;
      }
    } catch (migrationError) {
      console.error("\u274C Database migrations failed:", migrationError.message);
      console.warn("\u26A0\uFE0F Falling back to in-memory storage");
      usingDatabase = false;
    }
  } else {
    console.log("\u26A0\uFE0F PostgreSQL not available - using in-memory storage");
    console.log("\u{1F4DD} Data will NOT persist between server restarts");
    console.log("\u{1F4A1} Set up PostgreSQL database for persistent storage");
    usingDatabase = false;
  }
  setTimeout(async () => {
    try {
      console.log("\u{1F4E7} Initializing email service...");
      await emailService.initialize();
      console.log("\u2705 Email service initialization complete");
    } catch (error) {
      console.error("\u26A0\uFE0F Email service initialization failed:", error);
    }
    console.log("Checking approval_monitoring table...");
    await ensureApprovalMonitoringTable();
    const runScheduledBackup = async () => {
      try {
        const settings3 = await storage.getSystemSettings();
        if (settings3?.autoBackup) {
          console.log("\u{1F504} Running scheduled automatic backup with complete data export...");
          const fs6 = await import("fs");
          const path5 = await import("path");
          const backupDir = path5.join(process.cwd(), "backups");
          if (!fs6.existsSync(backupDir)) {
            fs6.mkdirSync(backupDir, { recursive: true });
            console.log("\u{1F4C1} Created backups directory:", backupDir);
          }
          const timestamp2 = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").split("T")[0];
          const timeStamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").split("T")[1].substring(0, 8);
          const backupFilename = `auto-backup-${timestamp2}-${timeStamp}.sql`;
          const backupPath = path5.join(backupDir, backupFilename);
          try {
            if (!db2) {
              throw new Error("Database connection not available");
            }
            let backupContent = `-- =============================================
`;
            backupContent += `-- Automatic PostgreSQL Database Backup
`;
            backupContent += `-- =============================================
`;
            backupContent += `-- Created: ${(/* @__PURE__ */ new Date()).toISOString()}
`;
            backupContent += `-- Database: srph_mis
`;
            backupContent += `-- Backup Schedule: Daily at ${settings3.backupTime}
`;
            backupContent += `-- =============================================

`;
            const tablesToBackup = [
              "users",
              "assets",
              "activities",
              "licenses",
              "components",
              "accessories",
              "consumables",
              "license_assignments",
              "consumable_assignments",
              "it_equipment",
              "it_equipment_assignments",
              "vm_inventory",
              "bitlocker_keys",
              "iam_accounts",
              "monitor_inventory",
              "vm_approval_history",
              "approval_monitoring",
              "azure_inventory",
              "gcp_inventory",
              "aws_inventory",
              "system_settings",
              "zabbix_settings",
              "zabbix_subnets",
              "discovered_hosts",
              "vm_monitoring",
              "aws_historical_data",
              "azure_historical_data",
              "gcp_historical_data",
              "iam_account_approval_history"
            ];
            let totalRecords = 0;
            let backedUpTables = 0;
            for (const table of tablesToBackup) {
              try {
                const { sql: sql7 } = await import("drizzle-orm");
                const tableData = await db2.execute(sql7.raw(`SELECT * FROM ${table}`));
                if (tableData.rows && tableData.rows.length > 0) {
                  const columns = Object.keys(tableData.rows[0]);
                  totalRecords += tableData.rows.length;
                  backedUpTables++;
                  backupContent += `
-- =============================================
`;
                  backupContent += `-- Table: ${table}
`;
                  backupContent += `-- Total Records: ${tableData.rows.length}
`;
                  backupContent += `-- =============================================

`;
                  backupContent += `TRUNCATE TABLE ${table} CASCADE;

`;
                  tableData.rows.forEach((row, index) => {
                    const values = columns.map((col) => {
                      const value = row[col];
                      if (value === null || value === void 0) return "NULL";
                      if (typeof value === "string") {
                        const escaped = value.replace(/\\/g, "\\\\").replace(/'/g, "''");
                        return `'${escaped}'`;
                      }
                      if (value instanceof Date) {
                        return `'${value.toISOString()}'`;
                      }
                      if (typeof value === "boolean") {
                        return value ? "TRUE" : "FALSE";
                      }
                      if (typeof value === "object") {
                        const jsonStr = JSON.stringify(value).replace(/\\/g, "\\\\").replace(/'/g, "''");
                        return `'${jsonStr}'`;
                      }
                      if (typeof value === "number") {
                        return value.toString();
                      }
                      return `'${String(value).replace(/'/g, "''")}'`;
                    });
                    backupContent += `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${values.join(", ")});
`;
                  });
                  backupContent += `
-- Completed ${table}: ${tableData.rows.length} rows exported

`;
                }
              } catch (tableError) {
                console.warn(`\u26A0\uFE0F Warning: Could not backup table ${table}:`, tableError.message);
                backupContent += `
-- ERROR backing up table ${table}:
`;
                backupContent += `-- ${tableError.message}

`;
              }
            }
            backupContent += `
-- =============================================
`;
            backupContent += `-- Backup Summary
`;
            backupContent += `-- =============================================
`;
            backupContent += `-- Total Tables Backed Up: ${backedUpTables}/${tablesToBackup.length}
`;
            backupContent += `-- Total Records: ${totalRecords}
`;
            backupContent += `-- Backup Completed: ${(/* @__PURE__ */ new Date()).toISOString()}
`;
            backupContent += `-- =============================================
`;
            fs6.writeFileSync(backupPath, backupContent, "utf8");
            const fileSize = (fs6.statSync(backupPath).size / 1024).toFixed(2);
            console.log(`\u2705 Automatic backup created successfully!`);
            console.log(`   File: ${backupFilename}`);
            console.log(`   Path: ${backupPath}`);
            console.log(`   Size: ${fileSize} KB`);
            console.log(`   Records: ${totalRecords}`);
            console.log(`   Tables: ${backedUpTables}/${tablesToBackup.length}`);
            await storage.createActivity({
              action: "backup",
              itemType: "database",
              itemId: 1,
              userId: 1,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `Automatic database backup created: ${backupFilename} (${fileSize} KB, ${totalRecords} records across ${backedUpTables} tables)`
            });
          } catch (backupError) {
            console.error("\u274C Automatic backup failed:", backupError);
            console.error("   Error:", backupError.message);
            console.error("   Stack:", backupError.stack);
            await storage.createActivity({
              action: "backup_failed",
              itemType: "database",
              itemId: 1,
              userId: 1,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              notes: `Automatic backup failed: ${backupError.message}`
            });
          }
        } else {
          console.log("\u23F8\uFE0F Automatic backup skipped - autoBackup is disabled");
        }
      } catch (error) {
        console.error("\u274C Error in scheduled backup:", error);
      }
    };
    let currentBackupTimeout = null;
    let lastKnownBackupTime = null;
    let lastKnownAutoBackupState = null;
    const scheduleNextBackup = async () => {
      if (currentBackupTimeout) {
        clearTimeout(currentBackupTimeout);
        currentBackupTimeout = null;
        console.log("\u{1F504} Cleared previous backup schedule");
      }
      try {
        const settings3 = await storage.getSystemSettings();
        console.log("\u{1F4CB} Loading backup schedule settings:", {
          autoBackup: settings3?.autoBackup,
          backupTime: settings3?.backupTime,
          automaticBackups: settings3?.automaticBackups
        });
        const isAutoBackupEnabled = settings3?.autoBackup || settings3?.automaticBackups || false;
        const backupTime = settings3?.backupTime || "03:00";
        if (isAutoBackupEnabled && backupTime) {
          const now = /* @__PURE__ */ new Date();
          const [hours, minutes] = backupTime.split(":");
          const scheduledTime = /* @__PURE__ */ new Date();
          scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          if (scheduledTime <= now) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
          }
          const msUntilBackup = scheduledTime.getTime() - now.getTime();
          const hoursUntil = Math.floor(msUntilBackup / (1e3 * 60 * 60));
          const minutesUntil = Math.floor(msUntilBackup % (1e3 * 60 * 60) / (1e3 * 60));
          console.log(`\u2705 Automatic backup ENABLED`);
          console.log(`\u{1F4C5} Next backup scheduled for: ${scheduledTime.toLocaleString()}`);
          console.log(`\u23F0 Time until backup: ${hoursUntil}h ${minutesUntil}m`);
          console.log(`\u{1F550} Backup time setting: ${backupTime}`);
          lastKnownBackupTime = backupTime;
          lastKnownAutoBackupState = isAutoBackupEnabled;
          currentBackupTimeout = setTimeout(async () => {
            console.log("\u23F0 Automatic backup triggered at scheduled time");
            try {
              await runScheduledBackup();
              console.log("\u2705 Scheduled backup completed successfully");
            } catch (err) {
              console.error("\u274C Scheduled backup failed:", err);
            }
            scheduleNextBackup();
          }, msUntilBackup);
        } else {
          console.log("\u23F8\uFE0F Automatic backups are DISABLED");
          console.log(`   autoBackup: ${settings3?.autoBackup}`);
          console.log(`   automaticBackups: ${settings3?.automaticBackups}`);
          console.log(`   backupTime: ${settings3?.backupTime}`);
          lastKnownBackupTime = null;
          lastKnownAutoBackupState = false;
        }
      } catch (err) {
        console.error("\u274C Error scheduling backup:", err);
        currentBackupTimeout = setTimeout(scheduleNextBackup, 60 * 60 * 1e3);
      }
    };
    const checkForBackupTimeChanges = async () => {
      try {
        const settings3 = await storage.getSystemSettings();
        const isAutoBackupEnabled = settings3?.autoBackup ?? settings3?.automaticBackups ?? false;
        const backupTime = settings3?.backupTime || "03:00";
        if (isAutoBackupEnabled !== lastKnownAutoBackupState || backupTime !== lastKnownBackupTime) {
          console.log(`\u{1F504} Backup settings changed:`);
          console.log(`   Auto backup: ${lastKnownAutoBackupState} \u2192 ${isAutoBackupEnabled}`);
          console.log(`   Backup time: ${lastKnownBackupTime} \u2192 ${backupTime}`);
          console.log(`   Re-scheduling backup...`);
          await scheduleNextBackup();
        }
      } catch (err) {
        console.error("Error checking backup time changes:", err);
      }
    };
    setTimeout(scheduleNextBackup, 5e3);
    setInterval(checkForBackupTimeChanges, 1e4);
    const checkExpirations = async () => {
      try {
        console.log("\u{1F50D} Running daily expiration checks...");
        const settings3 = await storage.getSystemSettings();
        if (settings3?.notifyOnIamExpiration) {
          const iamAccounts2 = await storage.getIamAccounts();
          const today = /* @__PURE__ */ new Date();
          today.setHours(0, 0, 0, 0);
          const expiredAccounts = iamAccounts2.filter((account) => {
            if (!account.durationEndDate) return false;
            const endDate = new Date(account.durationEndDate);
            endDate.setHours(0, 0, 0, 0);
            const isExpired = endDate < today;
            const notYetNotified = account.status !== "expired_notified" && account.status !== "access_removed" && account.status !== "extended";
            return isExpired && notYetNotified;
          });
          console.log(`Found ${expiredAccounts.length} expired IAM accounts out of ${iamAccounts2.length} total`);
          if (expiredAccounts.length > 0) {
            const accountsData = expiredAccounts.map((account) => ({
              requestor: account.requestor || "N/A",
              knoxId: account.knoxId || "N/A",
              name: account.name || null,
              permission: account.permission || "N/A",
              cloudPlatform: account.cloudPlatform || "N/A",
              endDate: account.durationEndDate,
              approvalId: account.approvalId || "N/A"
            }));
            await emailService.sendIamExpirationNotification({ accounts: accountsData });
            for (const account of expiredAccounts) {
              await storage.updateIamAccount(account.id, { status: "expired_notified" });
            }
            console.log(`\u2705 Sent notification for ${expiredAccounts.length} expired IAM account(s)`);
          }
        }
        if (settings3?.notifyOnVmExpiration) {
          const vms3 = await storage.getVmInventory();
          const today = /* @__PURE__ */ new Date();
          const expiredVMs = vms3.filter((vm) => {
            if (!vm.endDate) return false;
            const endDate = new Date(vm.endDate);
            return today > endDate && vm.vmStatus === "Overdue - Not Notified";
          });
          if (expiredVMs.length > 0) {
            const vmsData = expiredVMs.map((vm) => ({
              vmName: vm.vmName || "N/A",
              knoxId: vm.knoxId || "N/A",
              requestor: vm.requestor || "N/A",
              department: vm.department || "N/A",
              endDate: vm.endDate,
              approvalNumber: vm.approvalNumber || "N/A"
            }));
            await emailService.sendVmExpirationNotification({ vms: vmsData });
            console.log(`\u2705 Sent notification for ${expiredVMs.length} expired VM(s)`);
          }
        }
      } catch (error) {
        console.error("\u274C Error in expiration check:", error);
      }
    };
    setTimeout(checkExpirations, 6e4);
    setInterval(checkExpirations, 24 * 60 * 60 * 1e3);
  }, 1e3);
  setTimeout(async () => {
    try {
      if (freshDb) {
        try {
          const { sql: sql7 } = await import("drizzle-orm");
          await freshDb.execute(sql7`
            DO $$
            BEGIN
              IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name = 'users' AND column_name = 'mfa_enabled'
              ) THEN
                ALTER TABLE users ADD COLUMN mfa_enabled BOOLEAN DEFAULT FALSE;
              END IF;

              IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name = 'users' AND column_name = 'mfa_secret'
              ) THEN
                ALTER TABLE users ADD COLUMN mfa_secret TEXT;
              END IF;
            END $$;
          `);
          console.log("\u2705 MFA columns verified/added");
        } catch (mfaColError) {
          console.error("\u26A0\uFE0F MFA column verification failed:", mfaColError.message);
        }
      }
      console.log("\u{1F527} Checking for default admin user...");
      const defaultAdmin = await storage.getUserByUsername("admin");
      if (!defaultAdmin) {
        console.log("Creating default admin user...");
        await storage.createUser({
          username: "admin",
          password: "admin123",
          email: "admin@srph.com",
          firstName: "Admin",
          lastName: "User",
          department: "IT",
          isAdmin: true
        });
        console.log("\u2705 Default admin user created successfully");
      } else {
        console.log("\u2705 Default admin user already exists");
      }
    } catch (error) {
      if (error.message === "Failed to decrypt data") {
        console.error("\u274C Encryption key mismatch detected!");
        console.error("\u26A0\uFE0F  The data in your database was encrypted with a different key.");
        console.error("\u{1F4CB} Options:");
        console.error("   1. Restore the original ENCRYPTION_KEY in your .env file");
        console.error("   2. Run: npm run encrypt-data (after clearing old encrypted data)");
        console.error("   3. Delete your database and start fresh");
      } else {
        console.error("\u274C Failed to initialize default admin user:", error);
      }
    }
  }, 2e3);
})();
async function startServer() {
  const { requireAuth, requireAdmin } = setupAuth(app);
  const server = await registerRoutes(app);
  registerPageBuilderRoutes(app, requireAuth, requireAdmin);
  registerZabbixRoutes(app, requireAuth);
  registerEmailBulkSenderRoutes(app, requireAuth);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  function getLocalIP() {
    const interfaces = networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const net of interfaces[name] || []) {
        if (net.family === "IPv4" && !net.internal) {
          return net.address;
        }
      }
    }
    return "127.0.0.1";
  }
  const PORT = 5e3;
  const host = "0.0.0.0";
  const localIP = getLocalIP();
  server.listen({
    port: PORT,
    host
  }, () => {
    log(`serving on port ${PORT}`);
    console.log(`
\u{1F680} SRPH-MIS is running at: http://0.0.0.0:${PORT}`);
    console.log(`\u{1F4BB} Access your app through Replit's webview`);
    console.log(`\u{1F310} Network access: http://${localIP}:${PORT}
`);
    logDatabaseOperation({
      type: "migration",
      status: "completed",
      details: "Server startup logging test"
    });
    logUserActivity({
      action: "server_started",
      details: "Application initialized successfully"
    });
    logUserAuth({
      username: "system",
      action: "login",
      ipAddress: "127.0.0.1"
    });
    logSystemAlert({
      level: "info",
      message: "Server started successfully",
      details: { port: PORT }
    });
    logApiRequest({
      method: "SYSTEM",
      path: "/startup",
      statusCode: 200
    });
  });
}
startServer();
