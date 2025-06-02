"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Users, UserPlus, MoreHorizontal, Mail, Shield, Crown, User } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "OWNER" | "ADMIN" | "MEMBER" | "GUEST"
  status: "active" | "pending" | "inactive"
  joinedAt: string
  avatar?: string
}

export default function TeamPage() {
  const { toast } = useToast()
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<"ADMIN" | "MEMBER" | "GUEST">("MEMBER")
  const [isLoading, setIsLoading] = useState(false)

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "OWNER",
      status: "active",
      joinedAt: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "ADMIN",
      status: "active",
      joinedAt: "2024-01-20",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "MEMBER",
      status: "active",
      joinedAt: "2024-02-01",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "GUEST",
      status: "pending",
      joinedAt: "2024-02-10",
    },
  ])

  const handleInviteMember = async () => {
    if (!inviteEmail) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: inviteEmail.split("@")[0],
        email: inviteEmail,
        role: inviteRole,
        status: "pending",
        joinedAt: new Date().toISOString().split("T")[0],
      }

      setTeamMembers((prev) => [...prev, newMember])
      setInviteEmail("")
      setInviteRole("MEMBER")
      setIsInviteOpen(false)

      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${inviteEmail}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    try {
      setTeamMembers((prev) => prev.filter((member) => member.id !== memberId))
      toast({
        title: "Member removed",
        description: "Team member has been removed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove team member",
        variant: "destructive",
      })
    }
  }

  const handleUpdateRole = async (memberId: string, newRole: TeamMember["role"]) => {
    try {
      setTeamMembers((prev) => prev.map((member) => (member.id === memberId ? { ...member, role: newRole } : member)))
      toast({
        title: "Role updated",
        description: "Team member role has been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update team member role",
        variant: "destructive",
      })
    }
  }

  const getRoleIcon = (role: TeamMember["role"]) => {
    switch (role) {
      case "OWNER":
        return <Crown className="h-4 w-4" />
      case "ADMIN":
        return <Shield className="h-4 w-4" />
      case "MEMBER":
        return <User className="h-4 w-4" />
      case "GUEST":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: TeamMember["role"]) => {
    switch (role) {
      case "OWNER":
        return "default"
      case "ADMIN":
        return "secondary"
      case "MEMBER":
        return "outline"
      case "GUEST":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: TeamMember["status"]) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "inactive":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-gray-600">Manage your team members and their permissions</p>
        </div>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>Send an invitation to add a new member to your team.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={inviteRole} onValueChange={(value: any) => setInviteRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="MEMBER">Member</SelectItem>
                    <SelectItem value="GUEST">Guest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteMember} disabled={isLoading || !inviteEmail}>
                {isLoading ? "Sending..." : "Send Invitation"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              {teamMembers.filter((m) => m.status === "active").length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter((m) => m.role === "ADMIN" || m.role === "OWNER").length}
            </div>
            <p className="text-xs text-muted-foreground">Including owner</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.filter((m) => m.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting acceptance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guests</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.filter((m) => m.role === "GUEST").length}</div>
            <p className="text-xs text-muted-foreground">Limited access</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage your team members and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{member.name}</p>
                      <Badge variant={getStatusColor(member.status)}>{member.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{member.email}</p>
                    <p className="text-xs text-gray-500">Joined {new Date(member.joinedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getRoleColor(member.role)} className="flex items-center space-x-1">
                    {getRoleIcon(member.role)}
                    <span>{member.role}</span>
                  </Badge>
                  {member.role !== "OWNER" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUpdateRole(member.id, "ADMIN")}>
                          Make Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateRole(member.id, "MEMBER")}>
                          Make Member
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateRole(member.id, "GUEST")}>
                          Make Guest
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleRemoveMember(member.id)}>
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Understanding what each role can do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Crown className="h-4 w-4" />
                <h4 className="font-medium">Owner</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Full access to all features</li>
                <li>• Manage billing and subscription</li>
                <li>• Add/remove team members</li>
                <li>• Delete organization</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <h4 className="font-medium">Admin</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Manage team members</li>
                <li>• Access all projects</li>
                <li>• Modify settings</li>
                <li>• View analytics</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <h4 className="font-medium">Member</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Access assigned projects</li>
                <li>• Create and edit content</li>
                <li>• View team activity</li>
                <li>• Basic reporting</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <h4 className="font-medium">Guest</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• View-only access</li>
                <li>• Limited project access</li>
                <li>• Cannot modify settings</li>
                <li>• Basic collaboration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
