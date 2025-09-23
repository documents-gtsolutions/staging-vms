"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GridLayoutIcon } from "@/icon";
import CheckBoxInput from "@/components/Inputs/CheckBoxInput";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { TabButton } from "@/components/tabs";

type AddPackageData = {
  package_name: string;
  package_description: string;
  number_of_users: number;
  number_of_locations: number;
  remarks_notes: string;
  active: boolean;
  select_all: boolean;
  // Dynamic permission fields
  [key: string]: any;
};

// Dynamic Permission Configuration System
interface PermissionAction {
  label: string;
  id: string;
}

interface PermissionModule {
  label: string;
  id: string;
  icon?: React.ComponentType<any>;
  actions?: PermissionAction[];
  subModules?: PermissionModule[];
  hasSubModules?: boolean;
}

interface PermissionCategory {
  label: string;
  id: string;
  icon: React.ComponentType<any>;
  modules: PermissionModule[];
}

// Default actions - can be customized per module if needed
const defaultPermissionActions: PermissionAction[] = [
  { label: "Add", id: "add" },
  { label: "Edit", id: "edit" },
  { label: "Delete", id: "delete" },
  { label: "All", id: "all" },
];

// Dynamic Permission Configuration
const permissionConfig: PermissionCategory[] = [
  {
    label: "Admin Panel",
    id: "admin_panel",
    icon: GridLayoutIcon,
    modules: [
      {
        label: "Dashboard",
        id: "dashboard",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
      {
        label: "Setup Configuration",
        id: "setup_configuration",
        icon: GridLayoutIcon,
        hasSubModules: true,
        actions: defaultPermissionActions,
        subModules: [
          {
            label: "User Management",
            id: "user_management",
            actions: defaultPermissionActions,
          },
          {
            label: "School/Branch Management",
            id: "school_branch_management",
            actions: defaultPermissionActions,
          },
          {
            label: "Classroom Setup",
            id: "classroom_setup",
            actions: defaultPermissionActions,
          },
          {
            label: "Month Closing",
            id: "month_closing",
            actions: defaultPermissionActions,
          },
        ],
      },
      {
        label: "Log Reports",
        id: "log_reports",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
      {
        label: "Backup",
        id: "backup",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
    ],
  },
  {
    label: "Employee Data & Payroll",
    id: "employee_data",
    icon: GridLayoutIcon,
    modules: [
      {
        label: "Employee Management",
        id: "employee_management",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
      {
        label: "Payroll Processing",
        id: "payroll_processing",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
    ],
  },
  {
    label: "Payment Gateways",
    id: "payment_gateways",
    icon: GridLayoutIcon,
    modules: [
      {
        label: "Gateway Configuration",
        id: "gateway_config",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
      {
        label: "Transaction Management",
        id: "transaction_management",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
    ],
  },
  {
    label: "Expenses & Ledger",
    id: "expenses_ledger",
    icon: GridLayoutIcon,
    modules: [
      {
        label: "Expense Tracking",
        id: "expense_tracking",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
      {
        label: "Ledger Management",
        id: "ledger_management",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
    ],
  },
  {
    label: "Messaging",
    id: "messaging",
    icon: GridLayoutIcon,
    modules: [
      {
        label: "Message Center",
        id: "message_center",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
      {
        label: "Notifications",
        id: "notifications",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
    ],
  },
  {
    label: "Learning",
    id: "learning",
    icon: GridLayoutIcon,
    modules: [
      {
        label: "Course Management",
        id: "course_management",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
      {
        label: "Student Progress",
        id: "student_progress",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
    ],
  },
  {
    label: "Admissions",
    id: "admissions",
    icon: GridLayoutIcon,
    modules: [
      {
        label: "Application Processing",
        id: "application_processing",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
      {
        label: "Enrollment Management",
        id: "enrollment_management",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
    ],
  },
  {
    label: "Paper Work",
    id: "paper_work",
    icon: GridLayoutIcon,
    modules: [
      {
        label: "Document Management",
        id: "document_management",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
      {
        label: "Form Processing",
        id: "form_processing",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
    ],
  },
  {
    label: "Reporting",
    id: "reporting",
    icon: GridLayoutIcon,
    modules: [
      {
        label: "Analytics Dashboard",
        id: "analytics_dashboard",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
      {
        label: "Custom Reports",
        id: "custom_reports",
        icon: GridLayoutIcon,
        actions: defaultPermissionActions,
      },
    ],
  },
];

const RoleAdd = () => {
  const router = useRouter();
  const [selectedPermission, setSelectedPermission] =
    useState<string>("admin_panel");
  const [selectedModule, setSelectedModule] = useState<string>("dashboard");

  // Per-tab state management
  const [tabPermissions, setTabPermissions] = useState<
    Record<string, Record<string, boolean>>
  >({});
  const [tabSelectAllStates, setTabSelectAllStates] = useState<
    Record<string, boolean>
  >({});

  // Legacy support - computed from tabPermissions
  const modulePermissions = tabPermissions[selectedModule] || {};

  // Helper function to get all permissions for a specific tab/module
  const getTabPermissions = (tabId: string) => {
    return tabPermissions[tabId] || {};
  };

  // Helper function to update permissions for a specific tab
  const updateTabPermissions = (
    tabId: string,
    permissions: Record<string, boolean>
  ) => {
    setTabPermissions((prev) => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        ...permissions,
      },
    }));
  };

  // Dynamic helper function to get all permission field names for any module
  const getTabPermissionFields = (moduleId: string) => {
    const fields: string[] = [];

    // Find the module in the permission config
    const module = findModuleInConfig(moduleId);
    if (!module) return fields;

    if (module.hasSubModules && module.subModules) {
      // Handle modules with sub-modules
      module.subModules.forEach((subModule) => {
        const subModuleField = `${moduleId}_${subModule.id}`;
        fields.push(subModuleField);

        // Add action fields for each sub-module
        const actions = subModule.actions || defaultPermissionActions;
        actions.forEach((action) => {
          fields.push(`${subModuleField}_${action.id}`);
        });
      });
    } else {
      // Handle regular modules
      fields.push(moduleId);
      const actions = module.actions || defaultPermissionActions;
      actions.forEach((action) => {
        fields.push(`${moduleId}_${action.id}`);
      });
    }

    return fields;
  };

  // Helper function to find a module in the permission config
  const findModuleInConfig = (moduleId: string): PermissionModule | null => {
    for (const category of permissionConfig) {
      const module = category.modules.find((m) => m.id === moduleId);
      if (module) return module;
    }
    return null;
  };

  // Helper function to get current category and module
  const getCurrentCategoryAndModule = () => {
    const category = permissionConfig.find(
      (cat) => cat.id === selectedPermission
    );
    const module = category?.modules.find((mod) => mod.id === selectedModule);
    return { category, module };
  };

  // Helper function to check if all permissions in a tab are selected
  const areAllTabPermissionsSelected = (tabId: string) => {
    const tabPerms = getTabPermissions(tabId);
    const allFields = getTabPermissionFields(tabId);
    return (
      allFields.length > 0 &&
      allFields.every((field) => tabPerms[field] === true)
    );
  };

  // Helper function to update Select All state for a tab
  const updateTabSelectAll = (tabId: string) => {
    const allSelected = areAllTabPermissionsSelected(tabId);
    setTabSelectAllStates((prev) => ({
      ...prev,
      [tabId]: allSelected,
    }));
    return allSelected;
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AddPackageData>({
    defaultValues: {
      package_name: "",
      package_description: "",
      number_of_users: 0,
      number_of_locations: 0,
      remarks_notes: "",
      active: true,
      select_all: false,
    },
  });
  // Handle Select All checkbox with per-tab logic
  const handleSelectAll = (checked: boolean) => {
    console.log("✅ Checked state:", checked);
    console.log("📍 Current module:", selectedModule);
    console.log(
      "📦 Current tab permissions before:",
      getTabPermissions(selectedModule)
    );

    const updatedPermissions: Record<string, boolean> = {};
    const fieldsUpdated: string[] = [];

    // Get all permission fields for current tab only
    const tabFields = getTabPermissionFields(selectedModule);

    // Update all fields in current tab
    tabFields.forEach((fieldName) => {
      updatedPermissions[fieldName] = checked;
      setValue(fieldName as any, checked);
      fieldsUpdated.push(fieldName);
    });

    console.log("🎯 Fields updated in current tab:", fieldsUpdated);
    console.log("📦 Tab permissions after update:", updatedPermissions);

    // Update only the current tab's permissions
    updateTabPermissions(selectedModule, updatedPermissions);

    // Update the Select All state for current tab only
    setTabSelectAllStates((prev) => ({
      ...prev,
      [selectedModule]: checked,
    }));

    console.log("🔍 All tab permissions:", tabPermissions);
    console.log("🔍 All Select All states:", tabSelectAllStates);
  };

  // Helper function to update individual permissions with per-tab logic
  const updatePermission = (fieldName: string, checked: boolean) => {
    console.log("📝 Field name:", fieldName);
    console.log("✅ Checked state:", checked);
    console.log("📍 Current module:", selectedModule);
    console.log(
      "📦 Current tab permissions before:",
      getTabPermissions(selectedModule)
    );

    // Update the specific permission in current tab
    const updatedPermissions = { [fieldName]: checked };
    updateTabPermissions(selectedModule, updatedPermissions);
    setValue(fieldName as any, checked);

    // Check if all permissions in current tab are now selected and update Select All state
    setTimeout(() => {
      const allSelected = updateTabSelectAll(selectedModule);
      console.log(
        "🔄 Auto-sync Select All for tab:",
        selectedModule,
        "→",
        allSelected
      );
    }, 0);

    console.log("📦 Tab permissions after update:", {
      ...getTabPermissions(selectedModule),
      ...updatedPermissions,
    });
  };

  const onSubmit = (data: AddPackageData) => {
    try {
      console.log("📋 Raw form data:", data);
      console.log("🔐 All tab permissions:", tabPermissions);

      // Flatten all permissions from all tabs
      const allPermissions: Record<string, boolean> = {};
      Object.values(tabPermissions).forEach((tabPerms) => {
        Object.entries(tabPerms).forEach(([key, value]) => {
          if (value) {
            // Only include true permissions
            allPermissions[key] = value;
          }
        });
      });

      console.log("🎯 Flattened permissions:", allPermissions);

      // Validate that at least one permission is selected across all tabs
      const hasPermissions = Object.values(allPermissions).some(
        (value) => value === true
      );
      console.log("✅ Has permissions across all tabs:", hasPermissions);

      if (!hasPermissions) {
        console.log(
          "❌ No permissions selected in any tab - aborting submission"
        );
        alert("Please select at least one permission for the package");
        return;
      }

      // Combine form data with all permissions from all tabs
      const formData = {
        ...data,
        permissions: allPermissions,
        tabPermissions: tabPermissions, // Keep tab structure for reference
        tabSelectAllStates: tabSelectAllStates, // Keep Select All states
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      console.log("📦 Final package data:", formData);
      console.log(
        "🎯 Total permission count:",
        Object.keys(allPermissions).length
      );
      console.log(
        "✅ Active permissions:",
        Object.keys(allPermissions).filter((key) => allPermissions[key])
      );
      console.log("📊 Permissions by tab:");
      Object.entries(tabPermissions).forEach(([tab, perms]) => {
        const activePerms = Object.keys(perms).filter((key) => perms[key]);
        console.log(`  ${tab}: ${activePerms.length} permissions`, activePerms);
      });

      // Here you would typically send to an API
      // await createPackage(formData);

      alert("Package created successfully!");
      reset();
      setTabPermissions({});
      setTabSelectAllStates({});
    } catch (error) {
      console.error("❌ Error creating package:", error);
      alert("Error creating package. Please try again.");
    }
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
    alert("Please fix the errors in the form before submitting");
  };

  // Dynamic permission renderer with fallback for empty states
  const renderDynamicPermissions = () => {
    const { category, module } = getCurrentCategoryAndModule();

    // No category selected
    if (!category) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Category Selected
          </h3>
          <p className="text-gray-500 max-w-sm">
            Please select a permission category from the left sidebar to
            configure package permissions.
          </p>
        </div>
      );
    }

    // No modules in category
    if (!category.modules || category.modules.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Modules Available
          </h3>
          <p className="text-gray-500 max-w-sm">
            The "{category.label}" category doesn't have any modules configured
            yet. New modules will appear here when they're added to the system.
          </p>
        </div>
      );
    }

    // No module selected
    if (!module) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Module Selected
          </h3>
          <p className="text-gray-500 max-w-sm">
            Please select a module from the "{category.label}" category to
            configure its permissions.
          </p>
        </div>
      );
    }

    // Check if module has no actions configured
    const hasActions = module.actions && module.actions.length > 0;
    const hasSubModules =
      module.hasSubModules && module.subModules && module.subModules.length > 0;

    if (!hasActions && !hasSubModules) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Permissions Configured
          </h3>
          <p className="text-gray-500 max-w-sm">
            The "{module.label}" module doesn't have any permissions configured
            yet. Contact your administrator to set up permissions for this
            module.
          </p>
        </div>
      );
    }

    // Render permissions normally
    return (
      <>
        <div className="flex items-center justify-between">
          <h4 className="text-gray-950 font-medium text-sm">{module.label}</h4>
          <h5 className="text-[#667085] text-sm">{module.id}</h5>
        </div>
        <div className="border-b-2 border-indigo-600 w-full mt-3 mb-6" />

        {hasSubModules ? (
          // Render sub-modules dynamically
          <div className="flex flex-col gap-5">
            {module.subModules!.map((subModule) => {
              const subModuleActions =
                subModule.actions || defaultPermissionActions;

              return (
                <div
                  key={subModule.id}
                  className="flex flex-row justify-between items-center"
                >
                  <CheckBoxInput
                    id={`${selectedModule}_${subModule.id}`}
                    label={subModule.label}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    className="gap-1"
                    onChange={(checked) =>
                      updatePermission(
                        `${selectedModule}_${subModule.id}`,
                        checked
                      )
                    }
                    defaultChecked={
                      getTabPermissions(selectedModule)[
                        `${selectedModule}_${subModule.id}`
                      ] || false
                    }
                  />
                  <div className="flex items-center gap-4">
                    {subModuleActions.length > 0 ? (
                      subModuleActions.map((action) => (
                        <CheckBoxInput
                          key={action.id}
                          id={`${selectedModule}_${subModule.id}_${action.id}`}
                          label={action.label}
                          register={register}
                          setValue={setValue}
                          watch={watch}
                          errors={errors}
                          className="gap-1"
                          onChange={(checked) =>
                            updatePermission(
                              `${selectedModule}_${subModule.id}_${action.id}`,
                              checked
                            )
                          }
                          defaultChecked={
                            getTabPermissions(selectedModule)[
                              `${selectedModule}_${subModule.id}_${action.id}`
                            ] || false
                          }
                        />
                      ))
                    ) : (
                      <span className="text-sm text-gray-400 italic">
                        No actions available
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Render regular module permissions
          <div className="flex flex-row justify-between items-center">
            <CheckBoxInput
              id={selectedModule}
              label={module.label}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              className="gap-1"
              onChange={(checked) => updatePermission(selectedModule, checked)}
              defaultChecked={
                getTabPermissions(selectedModule)[selectedModule] || false
              }
            />
            <div className="flex items-center gap-4">
              {hasActions ? (
                module.actions!.map((action) => (
                  <CheckBoxInput
                    key={action.id}
                    id={`${selectedModule}_${action.id}`}
                    label={action.label}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    className="gap-1"
                    onChange={(checked) =>
                      updatePermission(
                        `${selectedModule}_${action.id}`,
                        checked
                      )
                    }
                    defaultChecked={
                      getTabPermissions(selectedModule)[
                        `${selectedModule}_${action.id}`
                      ] || false
                    }
                  />
                ))
              ) : (
                <span className="text-sm text-gray-400 italic">
                  No actions available
                </span>
              )}
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="flex items-start gap-4 xl:flex-row flex-col">
        <div className="min-w-[270px] bg-white rounded-lg shadow p-6">
          <div className="flex xl:flex-col flex-row flex-wrap items-center xl:justify-start justify-center gap-4">
            {permissionConfig.map((category) => (
              <TabButton
                key={category.id}
                icon={category.icon}
                label={category.label}
                className="w-fit"
                variant="default"
                onClick={() => {
                  setSelectedPermission(category.id);
                  // Auto-select first module when switching categories
                  if (category.modules.length > 0) {
                    setSelectedModule(category.modules[0].id);
                  }
                }}
                isActive={selectedPermission === category.id}
              />
            ))}
          </div>
        </div>
        <div className="w-full bg-white rounded-lg shadow p-6 flex flex-col lg:flex-row items-start  gap-4">
          <div className="w-full lg:w-[230px] flex flex-col gap-4">
            {permissionConfig
              .find((category) => category.id === selectedPermission)
              ?.modules?.map((module) => (
                <TabButton
                  key={module.id}
                  icon={module.icon}
                  label={module.label}
                  variant={"gradient"}
                  onClick={() => setSelectedModule(module.id)}
                  isActive={selectedModule === module.id}
                />
              ))}
          </div>
          <div className="w-full xl:w-2/3 px-6 mt-4 xl:mt-0">
            <div className="flex flex-col justify-between">
              <div className="min-h-[200px]">{renderDynamicPermissions()}</div>
              <div className="flex gap-4 items-center justify-center mt-8">
                <Button type="submit" className="h-[54px] w-[225px] rounded-md">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RoleAdd;
