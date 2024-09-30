import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secretKey = searchParams.get("secret");

  if (secretKey !== process.env.WEBHOOK_REGISTRATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiUrl = "https://api.calendly.com/webhook_subscriptions";
  const apiKey = process.env.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    console.log("response:", response);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Error fetching webhooks:", errorBody);
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorBody}`
      );
    }

    const webhooks = await response.json();
    console.log("Existing webhooks:", JSON.stringify(webhooks, null, 2));

    return NextResponse.json({
      message: "Webhooks retrieved successfully",
      data: webhooks,
    });
  } catch (error: any) {
    console.error("Error fetching webhooks:", error);
    return NextResponse.json(
      { error: "Failed to fetch webhooks", details: error.message },
      { status: 500 }
    );
  }
}
