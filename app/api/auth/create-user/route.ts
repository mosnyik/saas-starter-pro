import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { uid, email, firstName, lastName } = await request.json()

    // Create user in database
    const user = await prisma.user.create({
      data: {
        id: uid,
        email,
        firstName,
        lastName,
        role: "USER",
        // Create default tenant for the user
        tenants: {
          create: {
            name: `${firstName}'s Organization`,
            slug: `${firstName.toLowerCase()}-org-${Date.now()}`,
            plan: "STARTER",
            members: {
              create: {
                userId: uid,
                role: "OWNER",
              },
            },
          },
        },
      },
      include: {
        tenants: true,
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
