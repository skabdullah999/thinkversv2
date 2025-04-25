"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, MoreHorizontal, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { fetchData, insertData, updateData, deleteData } from "@/lib/api/admin"
import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "contributor",
    status: "active",
  })
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    async function fetchUsersData() {
      try {
        setIsLoading(true)

        // Fetch users from auth.users and join with profiles
        const { data: authUsers, error } = await supabase.auth.admin.listUsers()

        if (error) throw error

        // Get profiles for each user
        const profiles = await fetchData("profiles")

        // Combine auth users with profiles
        const usersWithProfiles = authUsers.users.map((user) => {
          const profile = profiles.find((p) => p.id === user.id) || null
          return {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
            profile,
          }
        })

        setUsers(usersWithProfiles)
      } catch (error) {
        console.error("Error fetching users:", error)

        // Fallback to just profiles if auth admin API fails
        try {
          const profiles = await fetchData("profiles", {
            select: "*",
          })

          setUsers(
            profiles.map((profile) => ({
              id: profile.id,
              email: profile.email || "user@example.com",
              created_at: profile.created_at,
              profile,
            })),
          )
        } catch (fallbackError) {
          console.error("Fallback error:", fallbackError)
          toast({
            title: "Error",
            description: "Failed to load users. Please try again.",
            variant: "destructive",
          })
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsersData()
  }, [supabase, toast])

  // Filter users based on search
  const filteredUsers = users.filter((user) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        user.email.toLowerCase().includes(query) ||
        (user.profile?.full_name && user.profile.full_name.toLowerCase().includes(query)) ||
        (user.profile?.role && user.profile.role.toLowerCase().includes(query))
      )
    }
    return true
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddUser = async () => {
    try {
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        email_confirm: true,
      })

      if (authError) throw authError

      // Create profile
      await insertData("profiles", {
        id: authData.user.id,
        full_name: formData.full_name,
        role: formData.role,
        email: formData.email,
      })

      // Refresh user list
      const { data: authUsers } = await supabase.auth.admin.listUsers()
      const profiles = await fetchData("profiles")

      // Combine auth users with profiles
      const usersWithProfiles = authUsers.users.map((user) => {
        const profile = profiles.find((p) => p.id === user.id) || null
        return {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          profile,
        }
      })

      setUsers(usersWithProfiles)

      setFormData({ full_name: "", email: "", password: "", role: "contributor", status: "active" })
      setIsAddDialogOpen(false)

      toast({
        title: "Success",
        description: "User created successfully!",
      })
    } catch (error) {
      console.error("Error creating user:", error)
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditClick = (user: any) => {
    setCurrentUser(user)
    setFormData({
      full_name: user.profile?.full_name || "",
      email: user.email,
      password: "",
      role: user.profile?.role || "contributor",
      status: user.profile?.status || "active",
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateUser = async () => {
    if (!currentUser) return

    try {
      // Update profile
      await updateData("profiles", currentUser.id, {
        full_name: formData.full_name,
        role: formData.role,
      })

      // Update local state
      setUsers(
        users.map((user) => {
          if (user.id === currentUser.id) {
            return {
              ...user,
              profile: {
                ...user.profile,
                full_name: formData.full_name,
                role: formData.role,
              },
            }
          }
          return user
        }),
      )

      setFormData({ full_name: "", email: "", password: "", role: "contributor", status: "active" })
      setIsEditDialogOpen(false)

      toast({
        title: "Success",
        description: "User updated successfully!",
      })
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        // Delete user from Supabase Auth
        const { error: authError } = await supabase.auth.admin.deleteUser(userId)

        if (authError) throw authError

        // Delete profile
        await deleteData("profiles", userId)

        // Update local state
        setUsers(users.filter((user) => user.id !== userId))

        toast({
          title: "Success",
          description: "User deleted successfully!",
        })
      } catch (error) {
        console.error("Error deleting user:", error)
        toast({
          title: "Error",
          description: "Failed to delete user. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with specific permissions.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="writer">Writer</SelectItem>
                    <SelectItem value="contributor">Contributor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user details and permissions.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  disabled
                />
                <p className="text-xs text-slate-500">Email cannot be changed</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="writer">Writer</SelectItem>
                    <SelectItem value="contributor">Contributor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateUser}>Update User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-200">
                        <img
                          src={user.profile?.avatar_url || "/placeholder.svg?height=40&width=40"}
                          alt={user.profile?.full_name || user.email}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="font-medium">{user.profile?.full_name || user.email.split("@")[0]}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.profile?.role === "admin" ? "default" : "outline"} className="capitalize">
                      {user.profile?.role === "admin" && <Shield className="h-3 w-3 mr-1" />}
                      {user.profile?.role || "user"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-slate-500 text-sm">
                    {formatDate(user.profile?.last_login)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(user)}
                        className="hidden sm:inline-flex"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(user.id)}
                        className="hidden sm:inline-flex text-destructive hover:text-destructive"
                        disabled={user.profile?.role === "admin"}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>

                      {/* Mobile dropdown menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="sm:hidden">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditClick(user)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={user.profile?.role === "admin"}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
