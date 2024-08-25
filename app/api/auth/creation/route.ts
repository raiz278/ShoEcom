import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name ?? "",
          lastname: user.family_name ?? "",
          email: user.email ?? "",
          profileImage:
            user.picture ?? `https://avatar.vercel.sh/rauchg${user.given_name}`,
        },
      });
    }

    const redirectUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error("Error in GET /api/auth/creation:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}