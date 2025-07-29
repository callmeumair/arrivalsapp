import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const currentUserData = await currentUser();
    if (!currentUserData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { clerkId, email, name, age, profession, city, bio, selectedInterests, selectedTags } = body;

    // Create user
    const user = await prisma.user.create({
      data: {
        clerkId,
        email,
        name,
        age: age ? parseInt(age) : null,
        profession,
        city,
        bio,
      },
    });

    // Create interests if they don't exist and connect them
    for (const interestId of selectedInterests) {
      // First, ensure the interest exists
      let interest = await prisma.interest.findUnique({
        where: { name: interestId },
      });

      if (!interest) {
        interest = await prisma.interest.create({
          data: { name: interestId },
        });
      }

      // Connect user to interest
      await prisma.userInterest.create({
        data: {
          userId: user.id,
          interestId: interest.id,
        },
      });
    }

    // Create tags if they don't exist and connect them
    for (const tagName of selectedTags) {
      let tag = await prisma.tag.findUnique({
        where: { name: tagName },
      });

      if (!tag) {
        tag = await prisma.tag.create({
          data: { name: tagName },
        });
      }

      await prisma.userTag.create({
        data: {
          userId: user.id,
          tagId: tag.id,
        },
      });
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const currentUserData = await currentUser();
    if (!currentUserData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: currentUserData.id },
      include: {
        interests: {
          include: {
            interest: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 