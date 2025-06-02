"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Download, Calendar, DollarSign, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function BillingPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [subscription, setSubscription] = useState({
    plan: "Professional",
    status: "active",
    amount: 29,
    interval: "month",
    nextBilling: "2024-02-15",
    trialEnds: null,
  })

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "pm_1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
  ])

  const [invoices, setInvoices] = useState([
    {
      id: "inv_1",
      date: "2024-01-15",
      amount: 29,
      status: "paid",
      description: "Professional Plan - January 2024",
      downloadUrl: "#",
    },
    {
      id: "inv_2",
      date: "2023-12-15",
      amount: 29,
      status: "paid",
      description: "Professional Plan - December 2023",
      downloadUrl: "#",
    },
    {
      id: "inv_3",
      date: "2023-11-15",
      amount: 29,
      status: "paid",
      description: "Professional Plan - November 2023",
      downloadUrl: "#",
    },
  ])

  const handleManageSubscription = async () => {
    setIsLoading(true)
    try {
      // Create Stripe customer portal session
      const response = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: user?.uid, // In real app, you'd have the Stripe customer ID
        }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open billing portal",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpgradePlan = async () => {
    setIsLoading(true)
    try {
      // Create Stripe checkout session for upgrade
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "price_enterprise", // Enterprise plan price ID
          customerId: user?.uid,
        }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start upgrade process",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "trialing":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "past_due":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-gray-600">Manage your subscription, payment methods, and billing history</p>
      </div>

      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Current Subscription
          </CardTitle>
          <CardDescription>Your current plan and billing information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold">{subscription.plan} Plan</h3>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(subscription.status)}
                  <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                    {subscription.status}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                ${subscription.amount}/{subscription.interval}
              </p>
            </div>
            <div className="text-right space-y-2">
              <Button onClick={handleManageSubscription} disabled={isLoading}>
                {isLoading ? "Loading..." : "Manage Subscription"}
              </Button>
              <Button variant="outline" onClick={handleUpgradePlan} disabled={isLoading}>
                Upgrade to Enterprise
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="font-medium">Next billing date:</span>
              </div>
              <p className="text-sm text-gray-600 ml-6">{new Date(subscription.nextBilling).toLocaleDateString()}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                <span className="font-medium">Next charge:</span>
              </div>
              <p className="text-sm text-gray-600 ml-6">${subscription.amount}.00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods and billing information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-medium uppercase">{method.brand}</span>
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• {method.last4}</p>
                    <p className="text-sm text-gray-600">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                  </div>
                  {method.isDefault && <Badge variant="secondary">Default</Badge>}
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Download your invoices and view payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{invoice.description}</p>
                  <p className="text-sm text-gray-600">{new Date(invoice.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${invoice.amount}.00</p>
                    <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage & Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Usage & Limits</CardTitle>
          <CardDescription>Current usage for your Professional plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">8,547</p>
              <p className="text-sm text-gray-600">API Calls</p>
              <p className="text-xs text-gray-500">10,000 limit</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">2.1 GB</p>
              <p className="text-sm text-gray-600">Storage Used</p>
              <p className="text-xs text-gray-500">5 GB limit</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-gray-600">Team Members</p>
              <p className="text-xs text-gray-500">15 limit</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
