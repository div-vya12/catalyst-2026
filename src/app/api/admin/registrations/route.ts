import { NextRequest, NextResponse } from "next/server";
import { getAllRegistrations, deleteRegistration } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
  const cookieToken = req.cookies.get("catalyst_admin_token")?.value;

  return verifyAdminToken(bearerToken || cookieToken);
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json(
      { error: "Unauthorized. Super Admin root token required." },
      { status: 401 }
    );
  }

  try {
    const { records, source } = await getAllRegistrations();
    return NextResponse.json(
      {
        success: true,
        source,
        total: records.length,
        data: records,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to retrieve registrations", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json(
      { error: "Unauthorized. Super Admin root token required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const ticketId = searchParams.get("ticketId");

    if (!ticketId) {
      return NextResponse.json({ error: "ticketId parameter required" }, { status: 400 });
    }

    const success = await deleteRegistration(ticketId);

    if (success) {
      return NextResponse.json({ success: true, message: `Registration ${ticketId} deleted.` });
    }

    return NextResponse.json({ error: `Registration ${ticketId} not found.` }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete registration", details: error.message },
      { status: 500 }
    );
  }
}
