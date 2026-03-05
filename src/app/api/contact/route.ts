import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(1, "1 h"),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const { success: limitOk } = await ratelimit.limit(ip);
  if (!limitOk) {
    return NextResponse.json(
      { success: false, message: "Too many requests, try again in 1 hour." },
      { status: 429 }
    );
  }
  try {
    const formData = await request.formData();
    const captchaToken = formData.get("h-captcha-response");
    const verifyCaptcha = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY!,
        response: captchaToken as string,
      }),
    });
    const captchaResult = await verifyCaptcha.json();
    if (!captchaResult.success) {
      return NextResponse.json(
        { success: false, message: "Invalid Captcha" },
        { status: 400 }
      );
    }
    formData.append("access_key", process.env.WEB3FORMS_ACCESS_KEY!);
    formData.delete("h-captcha-response");
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal error server." },
      { status: 500 }
    );
  }
}