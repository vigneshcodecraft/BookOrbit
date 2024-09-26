import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secretKey = searchParams.get("secret");

  if (secretKey !== process.env.WEBHOOK_REGISTRATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiUrl = "https://api.calendly.com/webhook_subscriptions";
  const apiKey = process.env.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN;
  const organizationUrl = `https://api.calendly.com/organizations/${process.env.CALENDLY_ORGANIZATION_ID}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `${process.env.NEXT_PUBLIC_APP_URL}/api/calendly-webhook`,
        events: ["invitee.created"],
        organization: organizationUrl,
        scope: "organization",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Webhook registered:", data);
    return NextResponse.json({
      message: "Webhook registered successfully",
      data,
    });
  } catch (error) {
    console.error("Error registering webhook:", error);
    return NextResponse.json(
      { error: "Failed to register webhook" },
      { status: 500 }
    );
  }
}
