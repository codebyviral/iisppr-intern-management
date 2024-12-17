import { useState } from "react";
import { Pencil } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function Settings() {
  const [accountInfo, setAccountInfo] = useState({
    FullName: "John Doe",
    CompanyName: "InternHub, Inc.",
    CompanyEmail: "j.doe@internhub.com",
    EmployeeId: "IH-1234",
    CurrentRole: "Manager",
  });

  const [editField, setEditField] = useState({
    isOpen: false,
    field: "",
    value: "",
    label: "",
  });

  const roles = [
    { name: "Manager", action: "Delete" },
    { name: "Admin", action: "Remove" },
    { name: "Add Supplier", action: "Delete Task" },
    { name: "Add Employer", action: "Remove" },
    { name: "Admin Tasks", action: "Delete" },
    { name: "Finance Tasks", action: "Remove" },
  ];

  const permissions = [
    { name: "Add Customer", actions: ["view", "edit", "create", "approval"] },
    { name: "Manage Orders", actions: ["view", "edit", "delete", "approval"] },
    { name: "View Reports", actions: ["view", "download"] },
    { name: "Manage Users", actions: ["view", "edit", "create"] },
    { name: "Edit Settings", actions: ["edit", "update"] },
  ];

  const [roleChecked, setRoleChecked] = useState(roles.map(() => false));
  const [permissionChecked, setPermissionChecked] = useState(
    permissions.map(() => false)
  );

  const handleEdit = (field, value, label) => {
    setEditField({
      isOpen: true,
      field,
      value,
      label,
    });
  };

  const handleSave = () => {
    setAccountInfo((prev) => ({
      ...prev,
      [editField.field]: editField.value,
    }));
    setEditField({ isOpen: false, field: "", value: "", label: "" });
  };

  const EditModal = () => (
    <Dialog
      open={editField.isOpen}
      onOpenChange={(open) =>
        !open && setEditField((prev) => ({ ...prev, isOpen: false }))
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {editField.label}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="value">{editField.label}</Label>
          <Input
            id="value"
            value={editField.value}
            onChange={(e) =>
              setEditField((prev) => ({ ...prev, value: e.target.value }))
            }
            className="mt-2"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              setEditField({ isOpen: false, field: "", value: "", label: "" })
            }
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Account Settings
        </h1>

        {/* Account Information Card */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">
              Personal Information
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(accountInfo).map(([key, value]) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, " $1").trim()}*
                  </label>
                  <div className="flex items-center justify-between p-2 rounded bg-gray-50">
                    <span className="text-gray-900">{value}</span>
                    <button
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      onClick={() =>
                        handleEdit(
                          key,
                          accountInfo[key],
                          key.replace(/([A-Z])/g, " $1").trim()
                        )
                      }
                    >
                      <Pencil className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Roles Section */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Roles</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={roleChecked[index]}
                        onChange={() => {
                          const newChecked = [...roleChecked];
                          newChecked[index] = !newChecked[index];
                          setRoleChecked(newChecked);
                        }}
                      />
                      <span className="text-gray-900">{role.name}</span>
                    </div>
                    <button className="text-sm text-red-600 hover:text-red-700">
                      {role.action}
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Permissions Section */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Permissions
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={permissionChecked[index]}
                        onChange={() => {
                          const newChecked = [...permissionChecked];
                          newChecked[index] = !newChecked[index];
                          setPermissionChecked(newChecked);
                        }}
                      />
                      <span className="text-gray-900">{permission.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {permission.actions.join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      {EditModal()}
    </div>
  );
}
