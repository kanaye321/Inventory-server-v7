import { db } from "./db";
import { sql } from "drizzle-orm";

export async function tableExists(tableName: string): Promise<boolean> {
  try {
    const result = await db.execute(sql`
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

export async function runMigrations() {
  try {
    console.log("🔄 Starting database migration...");

    // 1. Create Users
    await db.execute(sql`
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

    // 2. Create Assets
    await db.execute(sql`
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

    // 3. Create Components
    await db.execute(sql`
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

    // 4. Create Accessories
    await db.execute(sql`
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

    // 5. Create Consumables
    await db.execute(sql`
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

    // 6. Create Licenses
    await db.execute(sql`
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

    // 7. Create License Assignments
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS license_assignments (
        id SERIAL PRIMARY KEY,
        license_id INTEGER NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
        assigned_to TEXT NOT NULL,
        notes TEXT,
        assigned_date TEXT NOT NULL
      )
    `);

    // 8. Create Consumable Assignments
    await db.execute(sql`
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

    // 9. Create Activities
    await db.execute(sql`
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

    // 10. Create VM Inventory
    await db.execute(sql`
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

    // 11. Create VMS
    await db.execute(sql`
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

    // 12. Create Monitor Inventory
    await db.execute(sql`
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

    // 13. Create Bitlocker Keys
    await db.execute(sql`
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

    // 14. Create IT Equipment
    await db.execute(sql`
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

    // 15. Create IT Equipment Assignments
    await db.execute(sql`
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

    // 16. Create System Settings
    await db.execute(sql`
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

    // 17. Create Zabbix Settings
    await db.execute(sql`
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

    // 18. Create Discovered Hosts
    await db.execute(sql`
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

    // 19. Create VM Monitoring
    await db.execute(sql`
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

    // 20. Create Cloud Inventories
    await db.execute(sql`
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

    await db.execute(sql`
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

    await db.execute(sql`
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

    // 21. Create Historical Data
    await db.execute(sql`
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

    await db.execute(sql`
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

    await db.execute(sql`
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

    // 22. Create IAM Accounts
    await db.execute(sql`
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

    // 23. Create IAM Approval History
    await db.execute(sql`
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

    // 24. Create VM Approval History
    await db.execute(sql`
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

    // 25. Create Custom Pages
    await db.execute(sql`
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

    // 26. Create Approval Monitoring
    await db.execute(sql`
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

    // 27. Create Jira Settings
    await db.execute(sql`
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

    // 28. Create Monitoring System
    await db.execute(sql`
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

    await db.execute(sql`
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

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS monitoring_dashboards (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        layout JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS monitoring_datasources (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        config JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);

    await db.execute(sql`
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

    await db.execute(sql`
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

    // 29. Create Notifications
    await db.execute(sql`
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

    // 30. Create Settings
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        site_name TEXT,
        site_url TEXT,
        theme TEXT DEFAULT 'light',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);

    // 31. Create Storage Media
    await db.execute(sql`
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

    console.log("🎉 Database migration completed successfully!");
  } catch (error: any) {
    console.error("❌ Migration failed:", error.message);
    throw error;
  }
}
