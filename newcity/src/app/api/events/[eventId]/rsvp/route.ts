import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const currentUserData = await currentUser();
    if (!currentUserData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { eventId } = await params;
    const body = await request.json();
    const { status } = body;

    // Get the user from our database
    const user = await prisma.user.findUnique({
      where: { clerkId: currentUserData.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check if RSVP already exists
    const existingRSVP = await prisma.rSVP.findUnique({
      where: {
        userId_eventId: {
          userId: user.id,
          eventId: eventId,
        },
      },
    });

    if (existingRSVP) {
      // Update existing RSVP
      const updatedRSVP = await prisma.rSVP.update({
        where: {
          userId_eventId: {
            userId: user.id,
            eventId: eventId,
          },
        },
        data: { status },
        include: {
          user: true,
          event: true,
        },
      });

      return NextResponse.json({ rsvp: updatedRSVP });
    } else {
      // Create new RSVP
      const newRSVP = await prisma.rSVP.create({
        data: {
          userId: user.id,
          eventId: eventId,
          status,
        },
        include: {
          user: true,
          event: true,
        },
      });

      return NextResponse.json({ rsvp: newRSVP }, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating/updating RSVP:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const currentUserData = await currentUser();
    if (!currentUserData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { eventId } = await params;

    // Get the user from our database
    const user = await prisma.user.findUnique({
      where: { clerkId: currentUserData.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete RSVP
    await prisma.rSVP.delete({
      where: {
        userId_eventId: {
          userId: user.id,
          eventId: eventId,
        },
      },
    });

    return NextResponse.json({ message: "RSVP removed" });
  } catch (error) {
    console.error("Error removing RSVP:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 